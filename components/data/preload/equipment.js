import {
    ArmorClassEnhancer, ArmorTrait,
    BaseEnhancer,
    InitiativeEnhancer, PassivePerceptionEnhancer,
    SavingThrowEnhancer,
    SkillCheckEnhancer
} from "../enhancements/enhancer.js";
import {STATS} from "../enums/stats.js";
// Import equipment from new modular structure
/*
export class ItemLuckStone extends BaseEnhancer{
    constructor() {
        super(
            SavingThrowEnhancer,
            SkillCheckEnhancer,
            InitiativeEnhancer,
            PassivePerceptionEnhancer,
        );
        this.description = 'Luckstone: +1 bonus to ability checks and saving throws'
    }

    equipmentEffect = (input) => input+1;

    enhanceSavingThrow = this.equipmentEffect;

    enhanceSkillCheck = this.equipmentEffect;

    enhanceInitiative = this.equipmentEffect;

    enhancePassivePerception = this.equipmentEffect;
}

export class ItemLeatherArmor extends BaseEnhancer{
    constructor() {
        super(ArmorClassEnhancer);
        this.traits.push(ArmorTrait);
        this.description = 'Leather armor: AC: 11 + Dex modifier'
    }

    enhanceArmorClass(value){
        return value + 11 + dm.getStatModifier(STATS.DEXTERITY);
    }
}

export class ItemIronLeafOakenShield extends BaseEnhancer{
    constructor() {
        super(ArmorClassEnhancer);
        this.description = 'Iron Leaf Oaken Shield: AC: +2 bonus +1 AC also applicable in Wild shape'
    }

    enhanceArmorClass(value){
        // conditional for wild shape
        return value + 2 + 1;
    }
}*/

// Example usage:
// const sword = new Equipment({ name: 'Sword', description: 'A sharp blade', actions: [new MeleeAttackAction({ damage: '1d8+2' })] });
// character.baseChar.equipment.push(sword);
