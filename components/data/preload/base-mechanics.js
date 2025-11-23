import {
    BaseSelectableEnhancer,
    InitiativeEnhancer,
    SavingThrowEnhancer,
    SkillCheckEnhancer
} from "../enhancements/enhancer.js";
import {VantageFormElement} from "../enhancements/ui/components/vantage-form-element.js";

export class BaseVantage extends BaseSelectableEnhancer{
    constructor() {
        super(
            SavingThrowEnhancer,
            SkillCheckEnhancer,
            InitiativeEnhancer,
        );
        this.forced = false;
        this.description = 'Base vantage: by choice allow for advantage or disadvantage'
        this.formElement = new VantageFormElement();
    }
}