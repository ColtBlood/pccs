
export const ACTION_TYPES = {
    ACTION: 'ACTION',
    BONUS_ACTION: 'BONUS_ACTION',
    REACTION: 'REACTION',
}

class ActionManager {
    actions = [];
    bonusActions = [];
    reactions = [];
    actionsAvailable = {
        [ACTION_TYPES.ACTION]: true,
        [ACTION_TYPES.BONUS_ACTION]: true,
        [ACTION_TYPES.REACTION]: true,
    }
    actionsDisabled = {
        [ACTION_TYPES.ACTION]: false,
        [ACTION_TYPES.BONUS_ACTION]: false,
        [ACTION_TYPES.REACTION]: false,
    }

    #register(action, list) {
        if (!list.some(a => a.constructor === action.constructor)) {
            list.push(action);
        }
    }

    registerAction(action) {
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

    useAction(actionType){
        if(this.actionsAvailable[actionType]){
            this.actionsAvailable[actionType] = false;
            dm.publishActionsAvailable(this.actionsAvailable);
            return true;
        }
        return false;
    }
    isActionTypeAvailable(actionType){
        return !this.isActionTypeDisabled(actionType) && this.actionsAvailable[actionType] || false;
    }

    resetActionsAvailable(){
        this.actionsAvailable = {
            [ACTION_TYPES.ACTION]: true,
            [ACTION_TYPES.BONUS_ACTION]: true,
            [ACTION_TYPES.REACTION]: true,
        }
        dm.publishActionsAvailable(this.actionsAvailable);
    }

    disableActionType(actionType){
        this.actionsDisabled[actionType] = true;
        dm.publishActionsAvailable(this.actionsAvailable);
    }

    enableActionType(actionType){
        this.actionsDisabled[actionType] = false;
        dm.publishActionsAvailable(this.actionsAvailable);
    }

    isActionTypeDisabled(actionType){
        return this.actionsDisabled[actionType] || false;
    }
}

export const ACTION_MANAGER = new ActionManager();
