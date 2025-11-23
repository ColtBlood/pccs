class ActionManager {
    actions = [];
    bonusActions = [];
    reactions = [];

    #register(action, list) {
        if (!list.some(a => a.constructor === action.constructor)) {
            list.push(action);
        }
    }

    registerAction(action) {
        console.log(action);
        this.#register(action, this.actions);
    }

    registerBonusAction(action) {
        this.#register(action, this.bonusActions);
    }

    registerReaction(action) {
        this.#register(action, this.reactions);
    }

    getActions() {
        return this.actions;
    }

    getBonusActions() {
        return this.bonusActions;
    }

    getReactions() {
        return this.reactions;
    }
}

export const ACTION_MANAGER = new ActionManager();
