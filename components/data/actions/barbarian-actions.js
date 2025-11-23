import {ACTION_TYPES, BaseAction} from "../actions/base-action.js";
import {ACTION_MANAGER} from "./action-manager.js";

export class RageAction extends BaseAction {
    constructor() {
        super({ type: ACTION_TYPES.BONUS_ACTION });
        this.displayName = "Rage";
    }

    act() {
        // Implement the effects of Rage here
        // You may want to handle duration, damage resistance, etc. here
        pccsConsole.log('Barbarian is now raging!');
    }

    getPopupContent() {
        return `<div><strong>Rage</strong><br>Enter a furious rage, gaining damage resistance and bonus damage for 1 minute or until incapacitated.</div>`;
    }
}

// You can add more Barbarian-specific actions here as needed
