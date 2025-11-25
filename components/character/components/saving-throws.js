import {characterSheetBox} from "../../style/boxes.js";
import {STATS} from "../../data/enums/stats.js";
import {greyLineHint, mediumLetters} from "../../style/basics.js";
import {Enhancer, SavingThrowEnhancer, SkillCheckEnhancer} from "../../data/enhancements/enhancer.js";
import {defaultCloseAction, openPopup} from "../../popup/popup-manager.js";
import {PopupRadio} from "../../popup/components/popup-radio.js";
import {DiceRoll} from "../../dice/dice-roll.js";
import {bindOnClick} from "../../utils/ui.js";
import {prependModifiers} from "../../utils/converters.js";
import {VANTAGE_TYPES} from "../../data/preload/base-mechanics.js";

class SavingThrows extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this.shadowRoot.innerHTML = `
            <style>
                ${characterSheetBox()}
                .saving-throw {
                    text-transform: capitalize;
                }
                .saving-throw-normal {
                    list-style-type: circle;
                }
                li .saving-throw-content {
                    ${mediumLetters()}
                }
                .modifier{
                    display: inline-block;
                    width: 35px;
                    text-align: center;
                    border-bottom: 2px solid ${greyLineHint()};
                }
            </style>
            <div class="cs-box" id="saving-throw">
                <ul>
                    ${Object.keys(STATS).map(stat => {
                        const modifier = dm.getSavingThrowModifier(stat);
                        return `
                        <li class="saving-throw ${dm.isProficient(stat) ? 'saving-throw-proficient' : 'saving-throw-normal'}">
                            <span class="saving-throw-content">
                                <span class="modifier">${prependModifiers(modifier, true)}</span>
                                ${stat.toLowerCase()}
                            </span>
                        </li>
                    `
                    }).join('')}
                </ul>
                <span class="title">Saving throws</span>
            </div>
        `
        const mapping = [
            {id: 'saving-throw', funct: this.openSavingThrowPopup},
        ]
        bindOnClick(this, mapping);
    }

    openSavingThrowPopup(){
        const radioGroupName = 'Saving-type-selection';
        const options = Object.keys(STATS).map(
            (stat) =>
            {return {
                value: stat,
                displayName: stat.toLowerCase().replaceAll('_', ' ')
            }}
        );
        const enhancers = Enhancer.getInstance().getEnhancersByClass(SavingThrowEnhancer)
        openPopup({
            title: 'Roll saving throw',
            content: `
                <popup-radio options='${JSON.stringify(options)}' name="${radioGroupName}"></popup-radio>
                <hr />
                <ul>
                    ${enhancers.filter(enhancer => enhancer.forced === true)
                    .map(enhancer => `
                            <li>${enhancer.description}</li>
                        `).join('')}
                </ul>
                <hr>
                ${enhancers.filter(enhancer => enhancer.formElement).map(enhancer => `
                    ${enhancer.formElement.render({vantageType: VANTAGE_TYPES.SAVING_THROW})}
                `).join('')}
            `,
            mainAction: () => {
                const selectedStat = PopupRadio.getSelectedValueFromPopupRadio();
                const savingThrowModifier = dm.getSavingThrowModifier(selectedStat);
                const diceRoll = new DiceRoll({purpose: `Saving throw for ${selectedStat}`})
                    .addModifier(savingThrowModifier);
                Enhancer.getInstance()
                    .getEnhancersByClass(SavingThrowEnhancer)
                    .filter(enhancer => enhancer.formElement)
                    .forEach(enhancer => enhancer.formElement.fetchValue({diceRoll}))
                diceRoller.rollDiceObject(diceRoll);
                defaultCloseAction();
            },
        });
    }
}

customElements.define('saving-throws', SavingThrows)