import {getStatNameForSkill, SKILLS} from "./enums/skills.js";
import {
    ArmorClassEnhancer,
    BaseEnhancer,
    Enhancer,
    InitiativeEnhancer, MovementSpeedEnhancer,
    SavingThrowEnhancer
} from "./enhancements/enhancer.js";
import {STATS} from "./enums/stats.js";
import {SPELL_LEVEL} from "./spells/base-spell.js";
import {CLASSES, CLAZZ_2_CLASS_MAP} from "./enums/classes.js";
import {FULL_SPELL_LIST} from "./preload/spells.js";
import {ACTION_TYPES} from "./actions/base-action.js";
import {EQUIPMENT_CATALOG} from "./equipment";
import {
    CONDITION_EFFECTS_END,
    CONDITION_EFFECTS_START,
    CONDITIONS
} from "./conditions/base-condition.js";

export const DATA_MANAGER_FIELDS = {
    CURRENT_HIT_POINTS: 'currentHitPoints',
    TEMPORARY_HIT_POINTS: 'temporaryHitPoints',
    CONCENTRATION: 'concentration',
    USED_SPELL_SLOTS: 'usedSpellSlots',
    PREPARED_SPELLS: 'preparedSpells',
    ACTIONS_AVAILABLE: 'actionsAvailable',
    ACTIVE_CONDITIONS: 'activeConditions',
    SPEED: 'speed',
};

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

class DataManager{
    character= {
        baseChar: {
            details: {
            },
            stats: {
                proficiencies: [],
                expertise: []
            },
            leveling: [],
            equipment: [] // Add equipment array to character model
        },
        actionsAvailable: {
          [ACTION_TYPES.ACTION]: true,
          [ACTION_TYPES.BONUS_ACTION]: true,
          [ACTION_TYPES.REACTION]: true,
        },
        activeConditions: {

        }
    }

    // --- Publisher/Subscriber System ---
    _fieldSubscribers = {};

    /**
     * Subscribe to changes for a specific field (e.g., 'currentHitPoints', 'temporaryHitPoints').
     * @param {string} field - The field to subscribe to.
     * @param {function} callback - The callback to invoke on change.
     * @returns {function} Unsubscribe function.
     */
    subscribe(field, callback) {
        if (typeof callback !== 'function') throw new Error('Callback must be a function');
        if (!this._fieldSubscribers[field]) this._fieldSubscribers[field] = [];
        this._fieldSubscribers[field].push(callback);
        return () => {
            this._fieldSubscribers[field] = this._fieldSubscribers[field].filter(cb => cb !== callback);
        };
    }

    /**
     * Publish a change to a specific field.
     * @param {string} field - The field that changed.
     * @param {*} value - The new value.
     */
    _publish(field, value) {
        if (this._fieldSubscribers[field]) {
            this._fieldSubscribers[field].forEach(cb => {
                try { cb(value); } catch (e) { pccsConsole.log(`[DataManager] Error in subscriber for ${field}:`, e); }
            });
        }
    }

    loadCharacter(char){
        this.character = mergeDeep(this.character, char);
        this.character.usedSpellSlots = {
            [SPELL_LEVEL.LEVEL_1]: 0,
            [SPELL_LEVEL.LEVEL_2]: 0,
            [SPELL_LEVEL.LEVEL_3]: 0,
            [SPELL_LEVEL.LEVEL_4]: 0,
            [SPELL_LEVEL.LEVEL_5]: 0,
            [SPELL_LEVEL.LEVEL_6]: 0,
            [SPELL_LEVEL.LEVEL_7]: 0,
            [SPELL_LEVEL.LEVEL_8]: 0,
            [SPELL_LEVEL.LEVEL_9]: 0,
        };

        this.character.baseChar.equipment?.forEach(item => {
            console.log(`Equipping item from load: ${item}`);
            EQUIPMENT_CATALOG[item].equip();
        })
        this.resetActionsAvailable()
        this.character.currentHitPoints = this.getHitPointMax();
        this.character.temporaryHitPoints = 0;
        const characterClasses = [...new Set(this.character.baseChar.leveling.map(level => level.clazz))];
        this.character.spellList = FULL_SPELL_LIST.filter(spell => spell.classes.some(c => characterClasses))
        Object.entries(this.getAllCharacterLevels()).forEach(([clazz, level]) => {
            CLAZZ_2_CLASS_MAP[clazz].decorateClassImprovements(level);
        })
    }

    persistCharacter(){
        ds.saveCharacter(this.serialize())
    }

    serialize() {
        // Only include plain data, matching CharacterBuilder.build() output
        return {
            name: this.getCharacterName(),
            baseChar: this.character.baseChar,
            // usedSpellSlots: {...this.character.usedSpellSlots},
            currentHitPoints: this.getCurrentHitPoints(),
            temporaryHitPoints: this.getTemporaryHitPoints(),
            preparedSpells: this.getSpells().filter(spell => spell.isPrepared).map(spell => spell.spellName),
            concentration: this.character.concentration,
        };
    }

    deserialize(data) {
        // Restore base character structure
        const character = {
            baseChar: {
                ...data.baseChar
            },
            // usedSpellSlots: data.usedSpellSlots || {
            //     1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
            // },
            currentHitPoints: data.currentHitPoints,
            temporaryHitPoints: data.temporaryHitPoints,
            concentration: data.concentration,
            spellList: data.spellList,
        };
        this.loadCharacter(character);
        this.getSpells().forEach((spell) => {spell.isPrepared = data.preparedSpells.includes(spell.spellName);})
        this.setCurrentHitPoints(data.currentHitPoints);
        this.setTemporaryHitPoints(data.temporaryHitPoints);
    }

    getStat(statType){
        return this.character.baseChar?.stats?.[statType];
    }
    setStat(statType, value){
        this.character.baseChar.stats[statType] = value;
    }
    getStatModifier(statType){
        const stat = this.getStat(statType);
        return typeof stat === 'number' ? Math.floor((stat - 10) / 2) : 0;
    }
    getSavingThrowModifier(statType){
        const modifier = this.getStatModifier(statType);
        const isProficient = this.isProficient(statType);
        const multiplier = (isProficient) ? 1 : 0;
        const result = modifier + (this.getProficiencyBonus() * multiplier);
        return Enhancer.getInstance().enhance(SavingThrowEnhancer, result)
    }
    getCharacterName(){
        return this.character.baseChar?.details?.name;
    }
    getBackground(){
        return this.character.baseChar?.details?.background;
    }
    getPlayerName(){
        return this.character.baseChar?.details?.playerName;
    }
    getRace(){
        return this.character.baseChar?.details?.race?.name;
    }
    getAlignment(){
        return this.character.baseChar?.details?.alignment;
    }
    getExperiencePoints(){
        return this.character.baseChar?.details?.experiencePoints;
    }
    getAllCharacterLevels(){
        const result = {}
        this.character.baseChar.leveling.forEach(({clazz}) => {
            result[clazz] = result[clazz] ? result[clazz]+1 : 1;
        })
        return result;
    }
    isConditionActive(conditionName){
        return this.character.activeConditions[conditionName] || false;
    }
    toggleCondition(conditionName){
        if(CONDITIONS[conditionName] === undefined){
            throw new Error(`Unknown condition: ${conditionName}`);
        }
        this.character.activeConditions[conditionName] = !this.character.activeConditions[conditionName];
        if(this.character.activeConditions[conditionName]){
            CONDITION_EFFECTS_START[conditionName]();
        }
        else{
            CONDITION_EFFECTS_END[conditionName]();
        }
        this._publish(DATA_MANAGER_FIELDS.ACTIVE_CONDITIONS, {...this.character.activeConditions});
    }
    getActiveConditions(){
        return Object.keys(this.character.activeConditions).filter(cond => this.character.activeConditions[cond]);
    }
    useAction(actionType){
        if(this.character.actionsAvailable[actionType]){
            this.character.actionsAvailable[actionType] = false;
            this._publish(DATA_MANAGER_FIELDS.ACTIONS_AVAILABLE, {...this.character.actionsAvailable});
            return true;
        }
        return false;
    }
    isActionTypeAvailable(actionType){
        return this.character.actionsAvailable[actionType] || false;
    }

    resetActionsAvailable(){
        this.character.actionsAvailable = {
            [ACTION_TYPES.ACTION]: true,
            [ACTION_TYPES.BONUS_ACTION]: true,
            [ACTION_TYPES.REACTION]: true,
        }
        this._publish(DATA_MANAGER_FIELDS.ACTIONS_AVAILABLE, {...this.character.actionsAvailable});
    }

    getCharacterLevel(){
        return this.character.baseChar.leveling.length;
    }

    getProficiencyBonus(){
        return Math.floor((this.character.baseChar.leveling.length - 1) / 4) + 2;
    }

    isProficient(skillName){
        return this.character.baseChar.stats.proficiencies.includes(skillName);
    }
    addProficiency(skillName){
        if(!this.isProficient(skillName)){
            this.character.baseChar.stats.proficiencies.push(skillName);
        }
    }

    isExpert(skillName){
        return this.character.baseChar.stats.expertise.includes(skillName);
    }

    addExpertise(skillName){
        if(!this.isExpert(skillName)){
            this.character.baseChar.stats.expertise.push(skillName);
            this.addProficiency(skillName);
        }
    }

    getSkillModifier({skillName, statBase} = {}){
        const statName = statBase || getStatNameForSkill(skillName);
        const isProficient = this.isProficient(skillName);
        const isExpert = this.isExpert(skillName);
        const multiplier = (isExpert) ? 2 : (isProficient) ? 1 : 0;
        return this.getStatModifier(statName) + (this.getProficiencyBonus() * multiplier);
    }

    getSkills(){
        return Object.keys(SKILLS).map(skill => {
            const skillValue = this.getSkillModifier({skillName:skill})

            const enhancedResult = Enhancer.getInstance().enhance(SavingThrowEnhancer, skillValue)
            return {skillName: skill, modifier: enhancedResult, proficient: this.isProficient(skill) || this.isExpert(skill)}
        })
    }

    getArmorClass(){
        return Enhancer.getInstance().enhance(ArmorClassEnhancer, 0);
    }

    getInitiative(){
        return Enhancer.getInstance().enhance(InitiativeEnhancer, this.getStatModifier(STATS.DEXTERITY));
    }

    getSpeed(){
        const baseSpeed = this.character.baseChar.details.race.speed;
        return Enhancer.getInstance().enhance(MovementSpeedEnhancer, baseSpeed);
    }

    triggerSpeedPublish(){
        this._publish(DATA_MANAGER_FIELDS.SPEED, this.getSpeed());
    }

    getHitPointMax(){
        return this.character.baseChar.leveling
            .map(classLevel => classLevel.hitPointIncrease)
            .reduce((result, hitPointIncrease) => result + hitPointIncrease, 0)
    }

    getCurrentHitPoints() {
        return this.character.currentHitPoints;
    }

    setCurrentHitPoints(newHitPoints) {
        this.character.currentHitPoints = newHitPoints;
        this._publish(DATA_MANAGER_FIELDS.CURRENT_HIT_POINTS, newHitPoints);
    }

    getTemporaryHitPoints() {
        return this.character.temporaryHitPoints;
    }

    setTemporaryHitPoints(newHitPoints) {
        this.character.temporaryHitPoints = newHitPoints;
        this._publish(DATA_MANAGER_FIELDS.TEMPORARY_HIT_POINTS, newHitPoints);
    }

    setSpellConcentration(spellName){
        if(this.character.concentration){
            this.dropConcentration();
        }
        pccsConsole.log(`Concentrating on ${spellName}`);
        this.character.concentration = spellName;
        this._publish(DATA_MANAGER_FIELDS.CONCENTRATION, spellName);
        dm.persistCharacter();
    }

    dropConcentration() {
        this.getPreparedSpells().find(spell => spell.spellName ===this.character.concentration).dropConcentration();
        pccsConsole.log(`<span style="color: darkred">Concentration dropped for ${this.character.concentration}</span>`);
        this.character.concentration = undefined;
        this._publish(DATA_MANAGER_FIELDS.CONCENTRATION, undefined);
        dm.persistCharacter();
    }

    setAlwaysPreparedSpells(alwaysPreparedSpells) {
        for (const spell of this.character.spellList) {
            spell.isAlwaysPrepared = alwaysPreparedSpells.includes(spell.spellName);
        }
        this._publish(DATA_MANAGER_FIELDS.PREPARED_SPELLS, this.getPreparedSpells());
    }

    getPreparedSpells(){
        return this.character
            .spellList
            .filter(spell => spell.isPrepared || spell.isAlwaysPrepared);
    }

    getSpells() {
        return this.character.spellList;
    }

    getUsedSpellSlots(){
        return this.character.usedSpellSlots;
    }

    getMaxAmountOfPreparedSpellAmount(){
        // TODO: hardcoded for druids for now
        return this.getAllCharacterLevels()[CLASSES.DRUID] + this.getStatModifier(STATS.WISDOM);
    }

    getSpellConcentration(){
        return this.character.concentration;
    }

    setUsedSpellSlots(slotsObj) {
        this.character.usedSpellSlots = {...slotsObj};
        this._publish(DATA_MANAGER_FIELDS.USED_SPELL_SLOTS, {...this.character.usedSpellSlots});
    }

    triggerPreparedSpellsPublish() {
        this._publish(DATA_MANAGER_FIELDS.PREPARED_SPELLS, this.getPreparedSpells());
    }
}

window.dm = window.dm || new DataManager();