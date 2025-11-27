import {defaultCloseAction, openPopup} from "../../popup/popup-manager.js";
import {ACTION_MANAGER, ACTION_TYPES} from "./action-manager.js";

export class BaseAction {
    displayName = 'Base Action';
    type;
    constructor({
        type= ACTION_TYPES.ACTION,
                } = {}) {
        this.type = ACTION_TYPES[type];
    }

    execute(){
        const result = this.act();
        // if(result) {
        ACTION_MANAGER.useAction(this.type);
        // }
        defaultCloseAction();
    }

    // Abstract method for popup content
    getPopupContent() {
        throw new Error('getPopupContent() must be implemented by subclasses');
    }
    // Abstract method for action effect
    openActionPopup(callback) {
        openPopup({
            content: this.getPopupContent(),
            title: this.displayName,
            mainAction: () => {
                this.execute();
                if(callback) callback();
            },
        });
    }
}