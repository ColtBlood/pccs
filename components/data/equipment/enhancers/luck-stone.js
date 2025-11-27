import { Equipment } from '../base-equipment.js';
import { SavingThrowEnhancer, SkillCheckEnhancer, InitiativeEnhancer, PassivePerceptionEnhancer } from '../../enhancements/enhancer.js';
import { BaseEnhancer } from '../../enhancements/enhancer.js';

class LuckStoneEnhancer extends BaseEnhancer {
    constructor() {
        super(
            SavingThrowEnhancer,
            SkillCheckEnhancer,
            InitiativeEnhancer,
            PassivePerceptionEnhancer,
        );
        this.description = 'Luckstone: +1 bonus to ability checks and saving throws';
    }
    equipmentEffect = ({value}) => value + 1;
    enhanceSavingThrow = this.equipmentEffect;
    enhanceSkillCheck = this.equipmentEffect;
    enhanceInitiative = this.equipmentEffect;
    enhancePassivePerception = this.equipmentEffect;
}

export const LuckStone = new Equipment({
    name: 'Luckstone',
    description: 'Luckstone: +1 bonus to ability checks and saving throws',
    enhancers: [new LuckStoneEnhancer()],
    actions: []
});

