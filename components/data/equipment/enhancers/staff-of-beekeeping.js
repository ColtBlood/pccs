import { Equipment } from '../base-equipment.js';
import {MeleeAttackAction, MeleeAttackReaction} from '../actions/melee-attack.js';
import {BaseAction} from "../../actions/base-action.js";

let beeCharges = 9;
// Action: Summon Swarm of Bees (once per day)
class SummonBeesAction extends BaseAction {
    constructor() {
        super()
        this.displayName = 'Summon Bees';
        this.description = 'While holding the staff, you can use an action to expend 3 charges to summon 3 giant bees. The bees remain for 10 minutes or until you use this property again. The bees take their turn immediately after yours and you may command the bees on your turn as a bonus action as long as they are within 120 feet of you.';
        this.chargeCost = 3;
    }

    act() {
        if (beeCharges <= this.chargeCost) {
            console.log('Staff of Beekeeping: not enough charges');
            return false;
        }
        beeCharges = beeCharges - this.chargeCost;
        console.log(`Staff of Beekeeping: Summoned 3 giant bees.`);
    }

    getPopupContent() {
        return this.description;
    }
}
// Action: Summon Swarm of Bees (once per day)
class SummonBeeSwarmAction extends BaseAction {
    constructor() {
        super()
        this.displayName = 'Swarm of Bees';
        this.description = 'While holding the staff, you can use an action and expend 1 charge to cause a swarm of bees to spread out in a 30-foot radius from you. The bees remain for 10 minutes, making the area heavily obscured for creatures other than you. The swarm moves with you, remaining centered on you. A wind of at least 10 miles per hour disperses the swarm and ends the effect.';
        this.chargeCost = 1;
    }

    act() {
        if (beeCharges <= this.chargeCost) {
            console.log('Staff of Beekeeping: not enough charges');
            return false;
        }
        beeCharges = beeCharges - this.chargeCost;
        console.log(`Staff of Beekeeping: Summoned 3 giant bees.`);
    }

    getPopupContent() {
        return this.description;
    }
}


export const StaffOfBeekeeping = new Equipment({
    name: 'Staff of Beekeeping',
    description: 'A magical staff that allows the wielder to summon bees, speak with bees, and resist bee poison/stings.',
    actions: [
        new SummonBeesAction(),
        new SummonBeeSwarmAction(),
        new MeleeAttackAction({ name: 'Melee Attack(staff of beekeeping)', damage: '1d6', description: 'Strike with the staff' }),
    ],
    reactions: [
        new MeleeAttackReaction({ name: 'Melee Attack reaction(staff of beekeeping)', damage: '1d6', description: 'Strike with the staff' }),
    ]
});

