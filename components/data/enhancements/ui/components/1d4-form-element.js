import {EnhancementFormElement} from "../enhancement-form-element.js";
import {bigLetters, greyBackground, greyLine} from "../../../../style/basics.js";


export class d4FormElement extends EnhancementFormElement{
    static expMatcher = '1d4FormElement';
    uniqueMatcher;
    label;
    constructor({uniqueMatcher = '', label = 'Additional 1d4'}) {
        super(`${d4FormElement.expMatcher}${uniqueMatcher}`);
        this.uniqueMatcher = uniqueMatcher;
        this.label = label;
    }

    render(){
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
                <label for="additionalD4${this.uniqueMatcher}"><input type="checkbox" name="additionalD4${this.uniqueMatcher}" id="additionalD4${this.uniqueMatcher}"> ${this.label}</label>
            </div>
        `
    }

    fetchValue({diceRoll}){
        const addAdditionalD4 = document
            .querySelector('popup-box')
            .shadowRoot
            .querySelector(`input[id="additionalD4${this.uniqueMatcher}"]`)
            .checked;
        if(addAdditionalD4){
            diceRoll.addAdditionalDice(4)
        }
    }
}
