import {EnhancementFormElement} from "../enhancement-form-element.js";
import {bigLetters, greyBackground, greyLine} from "../../../../style/basics.js";
import {VANTAGE_TYPES, vantageManager} from "../../../preload/base-mechanics.js";


export class VantageFormElement extends EnhancementFormElement{
    static expMatcher = 'vantageFormElement';
    constructor() {
        super(VantageFormElement.expMatcher);
    }

    render({vantageType = VANTAGE_TYPES.SKILL_CHECK} = {}){
        console.log('====>', vantageType);
        return `
            <style>
                .vantage-option{
                    margin: 5px;
                }
                .vantage-option label{
                    border-radius: 5px;
                    height: 30px;
                    width: 100px;
                    padding: 0 5px;
                    margin-right: 10px;
                    border: 1px solid ${greyLine()};
                    display: inline-flex;
                    justify-content: left;
                    align-items: center;
                    text-transform: capitalize;
                    box-shadow: inset 0 0 10px ${greyBackground()};
                    ${bigLetters()}
                }
            </style>
            <div class="vantage-option">
                <label for="adv"><input type="checkbox" name="advantage" id="adv" ${vantageManager.hasEnforcedAdvantage(vantageType) || vantageManager.hasSuggestedAdvantage(vantageType) ? `checked` : ''} ${vantageManager.hasEnforcedAdvantage(vantageType) ? `disabled` : ''} > Advantage</label>
                <label for="disadv"><input type="checkbox" name="disadvantage" id="disadv" ${vantageManager.hasEnforcedDisadvantage(vantageType) || vantageManager.hasSuggestedDisadvantage(vantageType) ? `checked` : ''} ${vantageManager.hasEnforcedDisadvantage(vantageType) ? `disabled` : ''} > Disadvantage</label>
            </div>
        `
    }

    fetchValue({diceRoll}){
        diceRoll.setAdvantage(document
            .querySelector('popup-box')
            .shadowRoot
            .querySelector('input[id="adv"]')
            .checked)
        diceRoll.setDisadvantage(document
            .querySelector('popup-box')
            .shadowRoot
            .querySelector('input[id="disadv"]')
            .checked)
    }
}
