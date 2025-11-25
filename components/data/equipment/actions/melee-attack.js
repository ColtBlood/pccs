// Example melee attack action for equipment
import {BaseAction} from "../../actions/base-action.js";
import {DiceRoll} from "../../../dice/dice-roll.js";
import {defaultCloseAction} from "../../../popup/popup-manager.js";
import {STATS} from "../../enums/stats.js";
import {AttackEnhancer, Enhancer, SkillCheckEnhancer} from "../../enhancements/enhancer.js";
import {VANTAGE_TYPES} from "../../preload/base-mechanics.js";

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
        const toHitRoll = new DiceRoll({dice: '1d20', purpose: `To Hit`})
            .addModifier(dm.getStatModifier(STATS.STRENGTH))
            .addModifier(dm.getProficiencyBonus());
        Enhancer.getInstance()
            .getEnhancersByClass(AttackEnhancer)
            .filter(enhancer => enhancer.formElement)
            .forEach(enhancer => enhancer.formElement.fetchValue({diceRoll: toHitRoll}));
        const toHitRollResult = diceRoller.rollDiceObject(toHitRoll);

        const rawResult = toHitRollResult.mainResult.getResult() - toHitRollResult.mainResult.diceRoll.modifier;

        if (rawResult === 20) {
            pccsConsole.log(`<span class="bold">Critical hit! (natural 20)</span>`);
            // Double the damage dice on critical hit
            // If damage is in the form 'XdY', double X
            const damageMatch = this.damage.match(/^(\d+)d(\d+)$/);
            if (damageMatch) {
                const diceCount = parseInt(damageMatch[1], 10) * 2;
                const diceType = damageMatch[2];
                this.damage = `${diceCount}d${diceType}`;
            }
        }

        if(rawResult === 1) {
            pccsConsole.log(`<span class="bold">Attack missed (natural 1).</span>`);
        }
        else{
            const damageRoll = new DiceRoll({dice: this.damage, purpose: `Damage`})
                .addModifier(dm.getStatModifier(STATS.STRENGTH));
            diceRoller.rollDiceObject(damageRoll);
        }
        pccsConsole.endGroup();

        defaultCloseAction();
    }

    getPopupContent() {
        const enhancers = Enhancer.getInstance().getEnhancersByClass(AttackEnhancer)
        const forcedEnhancers = enhancers.filter(enhancer => enhancer.forced === true);
        return `
            ${this.description}
            ${(forcedEnhancers.length > 0) ? `
                <hr />
                <ul>
                    ${forcedEnhancers.map(enhancer => `
                            <li>${enhancer.description}</li>
                        `).join('')}
                </ul>
            ` : ''}
            <hr>
            ${enhancers.filter(enhancer => enhancer.formElement).map(enhancer => `
                ${enhancer.formElement.render({vantageType: VANTAGE_TYPES.ATTACK_ROLL})}
            `).join('')}
        `;
    }
}

export class MeleeAttackReaction extends MeleeAttackAction {
    constructor({name = 'Melee Attack Reaction', damage = '1d8', description = ''} = {}) {
        super({name, damage, description});
        this.type = 'REACTION';
    }
}
