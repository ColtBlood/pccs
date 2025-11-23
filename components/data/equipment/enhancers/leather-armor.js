import { Equipment } from '../base-equipment.js';
import { ArmorClassEnhancer, ArmorTrait, BaseEnhancer } from '../../enhancements/enhancer.js';
import { STATS } from '../../enums/stats.js';

class LeatherArmorEnhancer extends BaseEnhancer {
    constructor() {
        super(ArmorClassEnhancer);
        this.traits.push(ArmorTrait);
        this.description = 'Leather armor: AC: 11 + Dex modifier';
    }
    enhanceArmorClass(value) {
        return value + 11 + dm.getStatModifier(STATS.DEXTERITY);
    }
}

export const LeatherArmor = new Equipment({
    name: 'Leather Armor',
    description: 'Leather armor: AC: 11 + Dex modifier',
    enhancers: [new LeatherArmorEnhancer()],
    actions: []
});

