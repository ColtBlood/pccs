import {STATS} from "./stats.js";
import {
    ArmorClassEnhancer,
    ArmorTrait,
    BaseEnhancer,
    Enhancer,
    InitiativeEnhancer, PassivePerceptionEnhancer,
    SkillCheckEnhancer
} from "../enhancements/enhancer.js";
import {RageAction} from "../actions/barbarian-actions.js";
import {ACTION_MANAGER} from "../actions/action-manager.js";
import {
    SymbioticEntityAction,
    HaloOfSporesAction,
    FungalInfestationAction,
    SpreadingSporesAction
} from "../actions/druid-spores-actions.js";
import {SKILLS} from "./skills.js";

export const CLASSES = {
    'ARTIFICER':'ARTIFICER',
    'BARBARIAN':'BARBARIAN',
    'BARD':'BARD',
    'CLERIC':'CLERIC',
    'DRUID':'DRUID',
    'FIGHTER':'FIGHTER',
    'MONK':'MONK',
    'PALADIN':'PALADIN',
    'RANGER':'RANGER',
    'ROGUE':'ROGUE',
    'SORCERER':'SORCERER',
    'WARLOCK':'WARLOCK',
    'WIZARD':'WIZARD',
}

class DndClassBase {
    mainStat;
    hitDice;
    spellList = [];
    spellCasterWeight = ''; // full or half caster for spell slot calc
    subClasses = [];
}


export class BarbarianClass extends DndClassBase {
    constructor() {
        super();
        this.mainStat = STATS.STRENGTH;
        this.hitDice = 'd12'
    }

    decorateClassImprovements(level) {
        const classFeatures = [];
        if (level >= 1) {
            Enhancer.getInstance().registerEnhancer(new SkillUnarmoredDefense());
            ACTION_MANAGER.registerBonusAction(new RageAction());
        }
        if (level >= 2) {
            classFeatures.push('Reckless Attack', 'Danger Sense');
        }
        if (level >= 5) {
            classFeatures.push('Extra Attack', 'Fast Movement');
        }
        if (level >= 7) {
            classFeatures.push('Feral Instinct');
        }
        if (level >= 9) {
            classFeatures.push('Brutal Critical');
        }
        if (level >= 11) {
            classFeatures.push('Relentless Rage');
        }
        if (level >= 15) {
            classFeatures.push('Persistent Rage');
        }
        if (level >= 18) {
            classFeatures.push('Indomitable Might');
        }
        if (level >= 20) {
            classFeatures.push('Primal Champion');
        }
        if (typeof dm.setClassFeatures === 'function') {
            dm.setClassFeatures(classFeatures);
        } else {
            // Fallback: log or handle features as needed
            console.log('Barbarian features:', classFeatures);
        }
    }
}

export class SkillUnarmoredDefense extends BaseEnhancer{
    constructor() {
        super(ArmorClassEnhancer);
    }

    enhanceArmorClass(value){
        if(Enhancer.getInstance().enhancers.find(enhancer => enhancer.traits.includes(ArmorTrait))){
            return value;
        }
        return value + 10 + dm.getStatModifier(STATS.DEXTERITY) + dm.getStatModifier(STATS.CONSTITUTION);
    }
}

export class JackOfAllTradesEnhancer extends BaseEnhancer {
    constructor() {
        super(SkillCheckEnhancer, InitiativeEnhancer, PassivePerceptionEnhancer);
        this.description = 'Bard: Jack of All Trades - Add half your proficiency bonus, rounded down, to any ability check you make that doesn\'t already include your proficiency bonus.'
    }



    enhanceAbilityCheck(value) {
        if (!abilityCheck.proficient) {
            return value + Math.floor(dm.getProficiencyBonus() / 2);
        }
        return value;
    }
}

export class BardClass extends DndClassBase {
    constructor() {
        super();
        this.mainStat = STATS.CHARISMA;
        this.hitDice = 'd8'
    }

    decorateClassImprovements(level) {
        // jack of all traits

        //expertise
        if(level >= 2){
            // Enhancer.getInstance().registerEnhancer(new JackOfAllTradesEnhancer());x
        }
        if(level >= 3){
            dm.addExpertise(SKILLS.PERSUASION);
            dm.addExpertise(SKILLS.INTIMIDATION);
            // choose two skills
        }
    }
}

export class ClericClass extends DndClassBase {
    constructor() {
        super();
        this.mainStat = STATS.WISDOM;
        this.hitDice = 'd8'
    }

    decorateClassImprovements(level) {
    }
}

export class DruidClass extends DndClassBase {
    subclass = 'Circle of the Spores';
    spellCasterWeight = 'full';
    constructor() {
        super();
        this.mainStat = STATS.WISDOM;
        this.hitDice = 'd8'
    }

    decorateClassImprovements(level){
        const alwaysPreparedSpells = [];
        // Register Circle of Spores actions at appropriate levels
        if (level >= 2) {
            ACTION_MANAGER.registerReaction(new HaloOfSporesAction());
            ACTION_MANAGER.registerBonusAction(new SymbioticEntityAction());
            alwaysPreparedSpells.push('Chill Touch');
        }
        if (level >= 3) {
            alwaysPreparedSpells.push('Blindness/Deafness', 'Gentle Repose');
        }
        if (level >= 5) {
            alwaysPreparedSpells.push('Animate Dead', 'Gaseous Form');
        }
        if (level >= 6) {
            ACTION_MANAGER.registerReaction(new FungalInfestationAction());
        }
        if (level >= 7) {
            alwaysPreparedSpells.push('Blight', 'Confusion');
        }
        if (level >= 9) {
            alwaysPreparedSpells.push('Cloudkill', 'Contagion');
        }
        if (level >= 10) {
            ACTION_MANAGER.registerReaction(new SpreadingSporesAction());
        }
        dm.setAlwaysPreparedSpells(alwaysPreparedSpells);
    }

}

export const CLAZZ_2_CLASS_MAP = {
    [CLASSES.BARBARIAN]: new BarbarianClass(),
    [CLASSES.DRUID]: new DruidClass(),
    [CLASSES.BARD]: new BardClass(),
    [CLASSES.CLERIC]: new ClericClass(),
}