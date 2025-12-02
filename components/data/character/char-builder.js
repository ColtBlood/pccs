import {ALIGNMENTS} from "../enums/alignments.js";
import {CLASSES, CLAZZ_2_CLASS_MAP} from "../enums/classes.js";
import {STATS} from "../enums/stats.js";
import {SKILLS} from "../enums/skills.js";
import {Enhancer} from "../enhancements/enhancer.js";
import {FEATS_CATALOG} from "../preload/feat.js";

class Character {
    baseChar= {
        details: {
        },
        stats: {
            proficiencies: [],
            expertise: [],
        },
        leveling: [],
        equipment: [], // Add equipment array to character model
        feats: [],
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

    addFeat(feat = {name, params}){
        this.char.baseChar.feats.push(feat);
        new FEATS_CATALOG[feat.name](feat.params).register(this);
        return this;
    }

    addEquipment(equipment){
        this.char.baseChar.equipment.push(equipment);
        return this;
    }

    build(){
        return this.char;
    }
}
