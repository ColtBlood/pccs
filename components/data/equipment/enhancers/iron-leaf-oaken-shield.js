import { Equipment } from '../base-equipment.js';
import { ArmorClassEnhancer, BaseEnhancer } from '../../enhancements/enhancer.js';

class IronLeafOakenShieldEnhancer extends BaseEnhancer {
    constructor() {
        super(ArmorClassEnhancer);
        this.description = 'Iron Leaf Oaken Shield: AC: +2 bonus +1 AC also applicable in Wild shape';
    }
    enhanceArmorClass({value}) {
        // conditional for wild shape
        return value + 2 + 1;
    }
}

export const IronLeafOakenShield = new Equipment({
    name: 'Iron Leaf Oaken Shield',
    description: 'Iron Leaf Oaken Shield: AC: +2 bonus +1 AC also applicable in Wild shape',
    enhancers: [new IronLeafOakenShieldEnhancer()],
    actions: []
});

