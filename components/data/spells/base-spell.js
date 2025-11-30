import {CLASSES} from "../enums/classes.js";
import {DiceRoll} from "../../dice/dice-roll.js";
import {ACTION_MANAGER, ACTION_TYPES} from '../actions/action-manager.js';

export const SPELL_LEVEL = {
    CANTRIP: 0,
    LEVEL_1: 1,
    LEVEL_2: 2,
    LEVEL_3: 3,
    LEVEL_4: 4,
    LEVEL_5: 5,
    LEVEL_6: 6,
    LEVEL_7: 7,
    LEVEL_8: 8,
    LEVEL_9: 9,
    levelNames: [
        'Cantrip',
        '1st-level spell',
        '2nd-level spell',
        '3th-level spell',
        '4th-level spell',
        '5th-level spell',
        '6th-level spell',
        '7th-level spell',
        '8th-level spell',
        '9th-level spell',
    ],
}


export const CAST_TIME = {
    ACTION: '1 Action',
    BONUS_ACTION: '1 Bonus Action',
    REACTION: '1 Reaction',
    MINUTE1: '1 Minute',
}
export const COMPONENTS = {
    VERBAL: 'V',
    SOMATIC: 'S',
    MATERIAL: 'M',
    VSM: () => [COMPONENTS.VERBAL, COMPONENTS.SOMATIC, COMPONENTS.MATERIAL],
    VS: () => [COMPONENTS.VERBAL, COMPONENTS.SOMATIC],
    SM: () => [COMPONENTS.SOMATIC, COMPONENTS.MATERIAL],
    VM: () => [COMPONENTS.VERBAL, COMPONENTS.MATERIAL],
}
export const TARGET= {
    SELF: 'Self',
    WILLING: 'One willing creature',
}
export const RANGE = {
    TOUCH: 'Touch',
    FEET10: '10 feet',
    FEET30: '30 feet',
    FEET60: '60 feet',
    FEET90: '90 feet',
    FEET120: '120 feet',
    FEET150: '150 feet',
    FEET300: '300 feet',
    MILES1: '1 mile',
    MILES6: '6 miles',
    MILES12: '12 miles',
    SELF: 'Self',
    SIGHT: 'Sight',
}
export const DURATION = {
    ONE_MINUTE: 'up to 1 minute',
    MINUTES10: 'up to 10 minutes',
    ONE_HOUR: 'up to 1 hour',
    INSTANTANEOUS: 'Instantaneous',
    ONE_ROUND: '1 round',
    HOURS8: '8 hours',
    HOURS24: '24 hours',
    DAYS1: '1 day',
    DAYS7: '7 days',
    DAYS10: '10 days',
}


export const CANT_CAST = 'Cant cast spell'

const defaultConfig = {
    isPrepared: false,
    alwaysPrepared: false,
    spellLevel: SPELL_LEVEL.CANTRIP,
    components: COMPONENTS.VSM(),
    isRitual: false,
    isOnlyRitual: false,
    castingTime: CAST_TIME.ACTION,
    range: RANGE.TOUCH,
    concentration: false,
    duration: DURATION.INSTANTANEOUS,
}


// Utility to map castingTime to action type
export const castTime2ActionTypeMapper = (castingTime) => {
    switch (castingTime) {
        case CAST_TIME.ACTION:
            return ACTION_TYPES.ACTION;
        case CAST_TIME.BONUS_ACTION:
            return ACTION_TYPES.BONUS_ACTION;
        case CAST_TIME.REACTION:
            return ACTION_TYPES.REACTION;
        default:
            return null;
    }
}

// Reverse mapper: maps action type to casting time
export const actionType2CastTimeMapper = (actionType) => {
    switch (actionType) {
        case ACTION_TYPES.ACTION:
            return CAST_TIME.ACTION;
        case ACTION_TYPES.BONUS_ACTION:
            return CAST_TIME.BONUS_ACTION;
        case ACTION_TYPES.REACTION:
            return CAST_TIME.REACTION;
        default:
            return null;
    }
}

export class BaseSpell{
    spellName;
    description;
    isPrepared;
    isAlwaysPrepared;
    isRitual;
    isOnlyRitual;
    spellLevel;
    components;
    componentMaterial;
    classes;
    castingTime;
    range;
    target;
    concentration;
    duration;
    relatedEnhancer;
    upcastDescription;


    constructor({
                    spellName,
                    description,
                    isPrepared,
                    alwaysPrepared,
                    spellLevel,
                    components,
                    isRitual,
                    isOnlyRitual,
                    componentMaterial,
                    classes = [],
                    castingTime,
                    range,
                    target ,
                    concentration,
                    duration,
                    relatedEnhancer,
                    upcastDescription
                }) {


        const receivedConfig = {
            spellName,
            description,
            isPrepared,
            alwaysPrepared,
            spellLevel,
            components,
            isRitual,
            isOnlyRitual,
            componentMaterial,
            classes,
            castingTime,
            range,
            target,
            concentration,
            duration,
            relatedEnhancer,
            upcastDescription
        };

        Object.keys(defaultConfig).forEach(key => {
            // console.log(`[${this.constructor.name}] Property '${key}'`);
            if (receivedConfig[key] && receivedConfig[key] === defaultConfig[key]) {
                console.log(`[${this.constructor.name}] Property '${key}' containts default values ${receivedConfig[key]} (duplicate code).`);
            }
            if(!receivedConfig[key]) {
                // console.log(`[${this.constructor.name}] Setting default property '${key}':${defaultConfig[key]}`);
                receivedConfig[key] = defaultConfig[key];
            }
        });
        this.spellName = receivedConfig.spellName;
        this.description = receivedConfig.description;
        this.isPrepared = receivedConfig.isPrepared;
        this.isAlwaysPrepared = receivedConfig.alwaysPrepared;
        this.spellLevel = receivedConfig.spellLevel;
        this.components = receivedConfig.components;
        this.isRitual = receivedConfig.isRitual;
        this.isOnlyRitual = receivedConfig.isOnlyRitual;
        this.componentMaterial = receivedConfig.componentMaterial;
        this.classes = receivedConfig.classes;
        this.castingTime = receivedConfig.castingTime;
        this.range = receivedConfig.range;
        this.target = receivedConfig.target;
        this.concentration = receivedConfig.concentration;
        this.duration = receivedConfig.duration;
        this.relatedEnhancer = receivedConfig.relatedEnhancer;
        this.upcastDescription = receivedConfig.upcastDescription;
    }

    // Utility to map castingTime to action type
    getActionTypeForCastTime(castingTime) {
        return castTime2ActionTypeMapper(castingTime);
    }

    baseSpellCast(spellLevel) {
        let actionType = this.getActionTypeForCastTime(this.castingTime);
        let actionUsed = false;
        if (actionType) {
            actionUsed = ACTION_MANAGER.useAction(actionType);
            if (!actionUsed) {
                pccsConsole.log(`<span style="color: darkred">${actionType} already used this turn, cannot cast ${this.spellName}</span>`);
                return CANT_CAST;
            }
        }
        if(spellLevel !== SPELL_LEVEL.CANTRIP){
            const usedSpellSlots = dm.getUsedSpellSlots();
            const spellSlotAvailability = determineSpellSlots();
            if(usedSpellSlots[spellLevel] < spellSlotAvailability[spellLevel]){
                usedSpellSlots[spellLevel]++
                dm.setUsedSpellSlots(usedSpellSlots);
                pccsConsole.log(`Cast ${this.spellName} at level ${spellLevel}`);
                if(this.concentration){
                    dm.setSpellConcentration(this.spellName);
                }
            }
            else{
                pccsConsole.log(`<span style="color: darkred">Couldn't cast ${this.spellName} at level ${spellLevel}, no spell slots available</span>`);
                return CANT_CAST;
            }
        }
        else{
            if(this.concentration){
                dm.setSpellConcentration(this.spellName);
            }
            pccsConsole.log(`Cast cantrip: ${this.spellName}`);
        }
    }

    castSpell(spellLevel = this.spellLevel){
        return this.baseSpellCast(spellLevel);
    }

    dropConcentration() {
        console.log(`drop concentration ${this.spellName}`);
    }

    castCantripMechanics(diceType){
        let diceAmount = Math.floor((dm.getCharacterLevel() + 7) / 6);
        const roll = new DiceRoll({dice: `${diceAmount}d${diceType}`, purpose: `Casting ${this.spellName}`});
        diceRoller.rollDiceObject(roll);
    }

    castGenericSpellMechanics({spellLevel, diceType, baseDiceAmount}){
        const isCastable = this.baseSpellCast(spellLevel);
        if(isCastable === CANT_CAST){
            return;
        }
        const diceAmount = baseDiceAmount + (spellLevel-this.spellLevel);
        diceRoller.rollDiceObject(new DiceRoll({dice: `${diceAmount}d${diceType}`, purpose: `Damage roll for ${this.spellName} spell`}));
    }
}

const spellSlotTable = {
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

const fullSpellCasters = [CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD];
const halfSpellCasters = [CLASSES.PALADIN, CLASSES.RANGER];
let isSpellSlotsDetermined = false;

export const determineSpellSlots = () => {
    if(isSpellSlotsDetermined){
        return spellSlotTable;
    }
    const levels = dm.getAllCharacterLevels();
    let spellCasterLevel = 0;
    Object.entries(levels).forEach(([clazz, level]) => {
       if(fullSpellCasters.includes(clazz)){
           spellCasterLevel = spellCasterLevel+level;
       }
       else if(halfSpellCasters.includes(clazz)){
           spellCasterLevel = spellCasterLevel+(level/2);
       }
    });
    spellCasterLevel = Math.floor(spellCasterLevel);

    for(let i = 0; i <= spellCasterLevel; i++ ){
        switch(i){
            case 1:
                spellSlotTable[SPELL_LEVEL.LEVEL_1]++;
                spellSlotTable[SPELL_LEVEL.LEVEL_1]++;
                break;
            case 2:
                spellSlotTable[SPELL_LEVEL.LEVEL_1]++;
                break;
            case 3:
                spellSlotTable[SPELL_LEVEL.LEVEL_1]++;
                spellSlotTable[SPELL_LEVEL.LEVEL_2]++;
                spellSlotTable[SPELL_LEVEL.LEVEL_2]++;
                break;
            case 4:
                spellSlotTable[SPELL_LEVEL.LEVEL_2]++;
                break;
            case 5:
                spellSlotTable[SPELL_LEVEL.LEVEL_3]++;
                spellSlotTable[SPELL_LEVEL.LEVEL_3]++;
                break;
            case 6:
                spellSlotTable[SPELL_LEVEL.LEVEL_3]++;
                break;
            case 7:
                spellSlotTable[SPELL_LEVEL.LEVEL_4]++;
                break;
            case 8:
                spellSlotTable[SPELL_LEVEL.LEVEL_4]++;
                break;
            case 9:
                spellSlotTable[SPELL_LEVEL.LEVEL_4]++;
                spellSlotTable[SPELL_LEVEL.LEVEL_5]++;
                break;
            case 10:
                spellSlotTable[SPELL_LEVEL.LEVEL_5]++;
                break;
            case 11:
                spellSlotTable[SPELL_LEVEL.LEVEL_6]++;
                break;
            case 13:
                spellSlotTable[SPELL_LEVEL.LEVEL_7]++;
                break;
            case 15:
                spellSlotTable[SPELL_LEVEL.LEVEL_8]++;
                break;
            case 17:
                spellSlotTable[SPELL_LEVEL.LEVEL_9]++;
                break;
            case 18:
                spellSlotTable[SPELL_LEVEL.LEVEL_5]++;
                break;
            case 19:
                spellSlotTable[SPELL_LEVEL.LEVEL_6]++;
                break;
            case 20:
                spellSlotTable[SPELL_LEVEL.LEVEL_7]++;
                break;
            default:
                break;
        }
    }

    isSpellSlotsDetermined = true;
    return spellSlotTable;
}