import {buttonBoxes, characterSheetBox} from "../../style/boxes.js";
import {greyHintBackground, mediumLetters, tableStyles} from "../../style/basics.js";
import {bindOnClick} from "../../utils/ui.js";
import {defaultCloseAction, openPopup} from "../../popup/popup-manager.js";
import {CONDITION_DESCRIPTIONS, CONDITIONS} from "../../data/conditions/base-condtion.js";
import {PopupRadio} from "../../popup/components/popup-radio.js";
import {DATA_MANAGER_FIELDS} from "../../data/data-manager.js";

class ActiveConditions extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this._unsubscribeActiveConditons = null;
    }
    connectedCallback(){
        this._unsubscribeActiveConditons = dm.subscribe(DATA_MANAGER_FIELDS.ACTIVE_CONDITIONS, this.render.bind(this));
        this.render();
    }
    disconnectedCallback(){
        if(this._unsubscribeActiveConditons) this._unsubscribeActiveConditons();
    }
    render(){
        const mapping = [
            {id: 'edit-conditions', funct: this.openEditConditionsPopup},
        ]

        this.shadowRoot.innerHTML = `
            <style>
                ${characterSheetBox()}
                .edit-button{
                    width: 60px;
                    text-align: center;
                    margin: auto;
                    margin-bottom: 10px;
                }
                .center {
                    text-align: center;
                    margin: auto;
                }
                .grey-background {
                    display: block;
                    background-color: ${greyHintBackground()}
                }
                .medium-text {
                    ${mediumLetters()}
                }
                .padding5{
                    padding: 5px;
                }
                .uppercase {
                    text-transform: capitalize;
                }
                .info-button {
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    background-color: grey;
                    color: white;
                    text-align: center;
                    line-height: 15px;
                    font-size: 12px;
                    cursor: pointer;
                    margin-left: 5px;
                }
                
                ${buttonBoxes()}
            </style>
            <div class="cs-box padding5">
                <div>
                    ${dm.getActiveConditions().map(cond => {
                        const infoId = `condition-info-${cond}`;
                        mapping.push({id: infoId, funct: () => {this.openConditionInfoBoxPopup(cond)}});
                        return `
                        <li class="medium-text padding5 uppercase">
                            ${cond.toLowerCase()}
                            <span class="info-button" id="${infoId}">?</span>
                        </li>
                    `
        }).join('')}
</div>
                <div class="button-box center" id="edit-conditions">Toggle</div>
                <div class="title">Conditons</div>
            </div>
        `;

        bindOnClick(this, mapping);
    }

    openEditConditionsPopup() {
        openPopup({
            title: 'Edit Conditions',
            content: `
                <style>
                    ${buttonBoxes()}
                </style>
                <div>
                    <popup-radio 
                        options='${JSON.stringify(Object.keys(CONDITIONS).map(cond => {
                            return {
                                value: cond,
                                displayName: cond.toLowerCase()
                            }
                        }))}' 
                        name="condition-selection" 
                        selected='${JSON.stringify(dm.getActiveConditions())}'
                        multiple="true"
                    ></popup-radio>
                </div>
                
            `,
            mainAction: () => {
                dm.persistCharacter();
                const selectedCondition = PopupRadio.getSelectedValueFromPopupRadio();
                dm.toggleCondition(selectedCondition);
                defaultCloseAction();
                this.openConditionInfoBoxPopup(selectedCondition);
            }
        })
    }
    openConditionInfoBoxPopup(condition) {
        openPopup({
            title: `${condition.toLowerCase()} - info`,
            content: `
                <style>
                    ${buttonBoxes()}
                    ${tableStyles()}
                </style>
                <div>
                    ${CONDITION_DESCRIPTIONS[condition]}
                </div>
                
            `,
            mainAction: defaultCloseAction
        })
    }

}

customElements.define('active-conditions', ActiveConditions);