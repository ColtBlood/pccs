import {
    AttackEnhancer,
    BaseSelectableEnhancer,
    InitiativeEnhancer,
    SavingThrowEnhancer,
    SkillCheckEnhancer
} from "../enhancements/enhancer.js";
import {VantageFormElement} from "../enhancements/ui/components/vantage-form-element.js";

export const VANTAGE_TYPES = {
    SAVING_THROW: 'savingThrow',
    SKILL_CHECK: 'skillCheck',
    ATTACK_ROLL: 'attackRoll',
}

export const vantageManager = {
    _enforcedAdvantages: {
        savingThrow: [],
        skillCheck: [],
        attackRoll: []
    },
    _enforcedDisadvantages: {
        savingThrow: [],
        skillCheck: [],
        attackRoll: []
    },
    _suggestedAdvantages: {
        savingThrow: [],
        skillCheck: [],
        attackRoll: []
    },
    _suggestedDisadvantages: {
        savingThrow: [],
        skillCheck: [],
        attackRoll: []
    },

    addEnforcedAdvantage(type, source){
        this._enforcedAdvantages[type].push(source);
    },
    addEnforcedDisadvantage(type, source){
        this._enforcedDisadvantages[type].push(source);
    },
    addSuggestedAdvantage(type, source){
        this._suggestedAdvantages[type].push(source);
    },
    addSuggestedDisadvantage(type, source){
        console.log('suggesting disadvantage', type, source);
        this._suggestedDisadvantages[type].push(source);
    },
    removeEnforcedAdvantage(type, source){
        this._enforcedAdvantages[type] = this._enforcedAdvantages[type].filter(s => s !== source);
    },
    removeEnforcedDisadvantage(type, source){
        this._enforcedDisadvantages[type] = this._enforcedDisadvantages[type].filter(s => s !== source);
    },
    removeSuggestedAdvantage(type, source) {
        this._suggestedAdvantages[type] = this._suggestedAdvantages[type].filter(s => s !== source);
    },
    removeSuggestedDisadvantage(type, source) {
        this._suggestedDisadvantages[type] = this._suggestedDisadvantages[type].filter(s => s !== source);
    },
    hasEnforcedAdvantage(type){
        return this._enforcedAdvantages[type].length > 0;
    },
    hasEnforcedDisadvantage(type){
        return this._enforcedDisadvantages[type].length > 0;
    },
    hasSuggestedAdvantage(type){
        return this._suggestedAdvantages[type].length > 0;
    },
    hasSuggestedDisadvantage(type){
        console.log(JSON.stringify(this._suggestedDisadvantages));
        return this._suggestedDisadvantages[type].length > 0;
    },

    clearAll(){
        this._enforcedAdvantages = { savingThrow: [], skillCheck: [], attackRoll: [] };
        this._enforcedDisadvantages = { savingThrow: [], skillCheck: [], attackRoll: [] };
        this._suggestedAdvantages = { savingThrow: [], skillCheck: [], attackRoll: [] };
        this._suggestedDisadvantages = { savingThrow: [], skillCheck: [], attackRoll: [] };
    }
}

export class BaseVantage extends BaseSelectableEnhancer{
    constructor() {
        super(
            SavingThrowEnhancer,
            SkillCheckEnhancer,
            InitiativeEnhancer,
            AttackEnhancer,
        );
        this.forced = false;
        this.description = 'Base vantage: by choice allow for advantage or disadvantage'
        this.formElement = new VantageFormElement();
    }
}