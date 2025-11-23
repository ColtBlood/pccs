// Example melee attack action for equipment
import {BaseAction} from "../../actions/base-action.js";
import {DiceRoll} from "../../../dice/dice-roll.js";
import {defaultCloseAction} from "../../../popup/popup-manager.js";
import {STATS} from "../../enums/stats.js";

export class MeleeAttackAction extends BaseAction {
    constructor({ name = 'Melee Attack', damage = '1d8', description = '' } = {}) {
        super();
        this.displayName = name;
        this.damage = damage;
        this.description = description || `Deal ${damage} damage`;
    }

    act() {
        // Implement actual attack logic here
        // console.log(`${this.displayName} used on ${target}. Damage: ${this.damage}`);
        pccsConsole.startGroup();
        pccsConsole.log(`Performing melee attack: ${this.displayName}`);
        const toHitRoll = new DiceRoll({dice: '1d20', purpose: `To Hit`});
        toHitRoll.addModifier(dm.getStatModifier(STATS.STRENGTH));
        toHitRoll.addModifier(dm.getProficiencyBonus());
        diceRoller.rollDiceObject(toHitRoll);
        const damageRoll = new DiceRoll({dice: this.damage, purpose: `Damage`});
        damageRoll.addModifier(dm.getStatModifier(STATS.STRENGTH));
        diceRoller.rollDiceObject(damageRoll);
        pccsConsole.endGroup();

        defaultCloseAction();
    }

    getPopupContent() {
        return this.description;
    }
}

export class MeleeAttackReaction extends MeleeAttackAction {
    constructor({name = 'Melee Attack Reaction', damage = '1d8', description = ''} = {}) {
        super({name, damage, description});
        this.type = 'REACTION';
    }
}
