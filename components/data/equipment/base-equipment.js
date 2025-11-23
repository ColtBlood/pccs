// Base Equipment class to support enhancers and actions
import {Enhancer} from "../enhancements/enhancer.js";
import {ACTION_MANAGER} from "../actions/action-manager.js";

export class Equipment {
    constructor({ name, description, enhancers = [], actions = [], reactions = [] } = {}) {
        this.name = name;
        this.description = description;
        this.enhancers = enhancers; // Array of enhancer instances
        this.actions = actions;     // Array of action instances
        this.reactions = reactions; // Array of reaction instances
    }

    equip(){
        // Register enhancers with the global Enhancer system if available
        this.enhancers.forEach(enhancer => {
            Enhancer.getInstance().registerEnhancer(enhancer);
        });
        // Register actions with a global ActionManager if available
        this.actions.forEach(action => {
            ACTION_MANAGER.registerAction(action);
        });
        // Register actions with a global ActionManager if available
        this.reactions.forEach(reaction => {
            ACTION_MANAGER.registerReaction(reaction);
        });
    }

    addEnhancer(enhancer) {
        this.enhancers.push(enhancer);
    }

    addAction(action) {
        this.actions.push(action);
    }
}
