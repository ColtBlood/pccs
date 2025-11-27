import {ALIGNMENTS} from "../enums/alignments.js";
import {CLASSES, CLAZZ_2_CLASS_MAP} from "../enums/classes.js";
import {STATS} from "../enums/stats.js";
import {SKILLS} from "../enums/skills.js";
import {Enhancer} from "../enhancements/enhancer.js";
import {FULL_SPELL_LIST} from "../preload/spells.js";

class Character {
    baseChar= {
        details: {
        },
        stats: {
            proficiencies: [],
            expertise: [],
        },
        leveling: [],
        equipment: [] // Add equipment array to character model
    }
}

export class CharacterBuilder{
    char;
    constructor() {
        this.char = new Character();
        this.char.baseChar.details.experiencePoints = 'unknown';
    }

    setCharacterName(name){
        this.char.baseChar.details.name = name;
        return this;
    }

    setRace(race){
        this.char.baseChar.details.race = race;
        return this;
    }

    setAlignment(alignment){
        this.char.baseChar.details.alignment = ALIGNMENTS[alignment] || ALIGNMENTS.TRUE_NEUTRAL;
        return this;
    }

    setBackground(background){
        this.char.baseChar.details.background = background
        return this;
    }

    addLevel({clazz = CLASSES.BARBARIAN, manualHitRoll = 'default'} = {}){
        const conModifier = this.char.baseChar.stats[STATS.CONSTITUTION];
        if(!conModifier){
            throw new Error('Set Constitution before leveling up');
        }
        const classLevel = {
            clazz
        }
        if(manualHitRoll !== 'default'){
            classLevel.hitPointIncrease = manualHitRoll;
        }
        else{
            let hitPointIncrease = Number(CLAZZ_2_CLASS_MAP[clazz].hitDice.slice(1));
            if(this.char.baseChar.leveling.length > 0){
                hitPointIncrease = Math.floor(hitPointIncrease / 2) + 1;
            }
            classLevel.hitPointIncrease = hitPointIncrease + Math.floor((conModifier - 10) / 2)
        }

        this.char.baseChar.leveling.push(classLevel);
        return this;
    }

    setPlayerName(playerName){
        this.char.baseChar.details.playerName = playerName;
        return this;
    }

    getStat(stat){
        const statType = STATS[stat];
        if(!statType){
            throw new Error(`unknown stat given: ${stat}`);
        }
        return this.char.baseChar.stats[statType];
    }

    setStat({stat, value}){
        const statType = STATS[stat];
        if(!statType){
            throw new Error(`unknown stat given: ${stat}`);
        }
        this.char.baseChar.stats[statType] = value;
        return this;
    }

    addProficiency(skill){
        const skillType = SKILLS[skill] || STATS[skill];
        if(!skillType){
            throw new Error(`unknown skill/stat proficiency given: ${skill}`);
        }
        this.char.baseChar.stats.proficiencies.push(skillType);
        return this;
    }

    addExpertise(skill){
        const skillType = SKILLS[skill];
        if(!skillType){
            throw new Error(`unknown skill expertise given: ${skill}`);
        }
        this.char.baseChar.stats.expertise.push(skillType);
        return this;
    }

    addEnhancer(enhancer){
        if (!this._pendingEnhancers) this._pendingEnhancers = [];
        this._pendingEnhancers.push(enhancer);
        return this;
    }

    addFeat(feat){
        if (!this._pendingFeats) this._pendingFeats = [];
        this._pendingFeats.push(feat);
        return this;
    }

    addEquipment(equipment){
        this.char.baseChar.equipment.push(equipment);
        return this;
    }

    build(){
        if (this._pendingEnhancers && this._pendingEnhancers.length > 0) {
            this._pendingEnhancers.forEach(enhancer => {
                Enhancer.getInstance().registerEnhancer(enhancer);
            });
            this._pendingEnhancers = [];
        }
        if (this._pendingFeats && this._pendingFeats.length > 0) {
            this._pendingFeats.forEach(feat => {
                feat.register(this);
            });
            this._pendingFeats = [];
        }
        return this.char;
    }
}
