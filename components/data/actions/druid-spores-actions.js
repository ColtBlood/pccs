import {ACTION_TYPES, BaseAction} from "../actions/base-action.js";
import {CLASSES} from "../enums/classes.js";
import {DiceRoll} from "../../dice/dice-roll.js";
import {DATA_MANAGER_FIELDS} from "../data-manager.js";

let isSymbioticEntityActive = false;

function deactivateSymbioticEntityIfNoTempHP(tempHP) {
    console.log('subscriber triggered', tempHP);
    if (isSymbioticEntityActive && tempHP <= 0) {
        isSymbioticEntityActive = false;
        pccsConsole.log('Symbiotic Entity deactivated: Temporary hit points reduced to 0.');
    }
}

export class SymbioticEntityAction extends BaseAction {
    constructor() {
        super({ type: ACTION_TYPES.BONUS_ACTION });
        this.displayName = "Symbiotic Entity";
        if (typeof dm !== 'undefined' && typeof DATA_MANAGER_FIELDS !== 'undefined') {
            dm.subscribe(DATA_MANAGER_FIELDS.TEMPORARY_HIT_POINTS, deactivateSymbioticEntityIfNoTempHP);
        }
    }
    act() {
        // Calculate and set temporary hit points for Symbiotic Entity
        // Example: 4 x druid level (adjust as needed for your rules)
        const druidLevel = dm.getAllCharacterLevels()[CLASSES.DRUID];
        // const druidLevel = typeof dm.getClassLevel === 'function' ? dm.getClassLevel('DRUID') : 1;
        const tempHP = 4 * druidLevel;
        if (typeof dm.setTemporaryHitPoints === 'function') {
            dm.setTemporaryHitPoints(tempHP);
        }
        isSymbioticEntityActive = true;
        pccsConsole.log(`Druid activates Symbiotic Entity, gaining ${tempHP} temporary hit points and enhanced melee damage.`);
    }
    getPopupContent() {
        return `<div><strong>Symbiotic Entity</strong><br>Gain temporary hit points and deal extra damage with melee attacks while active.</div>`;
    }
}

export class HaloOfSporesAction extends BaseAction {
    constructor() {
        super({ type: ACTION_TYPES.REACTION });
        this.displayName = "Halo of Spores";
    }
    act() {
        const diceType = 4 + (dm.getCharacterLevel()-2)/2;
        const diceAmount = isSymbioticEntityActive ? 2 : 1;
        const diceRoll = new DiceRoll({dice: `${diceAmount}d${diceType}`, purpose:'Halo of spores damage'})
        diceRoller.rollDiceObject(diceRoll);
    }
    getPopupContent() {
        return `<div><strong>Halo of Spores</strong><br>Use your reaction to deal necrotic damage to a creature within 10 feet.</div>`;
    }
}

export class FungalInfestationAction extends BaseAction {
    constructor() {
        super({ type: ACTION_TYPES.REACTION });
        this.displayName = "Fungal Infestation";
    }
    act() {
        pccsConsole.log('Druid animates a corpse as a zombie using Fungal Infestation.');
    }
    getPopupContent() {
        return `<div><strong>Fungal Infestation</strong><br>When a creature dies near you, use your reaction to animate it as a zombie.</div>`;
    }
}

export class SpreadingSporesAction extends BaseAction {
    constructor() {
        super({ type: ACTION_TYPES.REACTION });
        this.displayName = "Spreading Spores";
    }
    act() {
        new HaloOfSporesAction().act()
    }
    getPopupContent() {
        return `<div>
<strong>Spreading Spores</strong><br>
At 10th level, you gain the ability to seed an area with deadly spores. As a bonus action while your Symbiotic Entity feature is active, you can hurl spores up to 30 feet away, where they swirl in a 10-foot cube for 1 minute. The spores disappear early if you use this feature again, if you dismiss them as a bonus action, or if your Symbiotic Entity feature is no longer active.<br>
<br>
Whenever a creature moves into the cube or starts its turn there, that creature takes your Halo of Spores damage, unless the creature succeeds on a Constitution saving throw against your spell save DC. A creature can take this damage no more than once per turn.<br>
<br>
While the cube of spores persists, you can't use your Halo of Spores reaction.<br>
</div>`;
    }
}

// Removed registration from this file. Actions will be registered in classes.js at the appropriate Druid levels.
