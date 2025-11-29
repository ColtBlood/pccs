import {buttonBoxes, characterSheetBox} from "../../style/boxes.js";
import {greyHintBackground, mediumLetters, tableStyles} from "../../style/basics.js";
import {bindOnClick} from "../../utils/ui.js";
import {defaultCloseAction, openPopup} from "../../popup/popup-manager.js";
import {CONDITION_DESCRIPTIONS, CONDITIONS} from "../../data/conditions/base-condition.js";
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
                .exhaustion-controls {
                    display: inline-flex;
                    align-items: center;
                    margin-left: 10px;
                }
                .exhaustion-btn {
                    width: 20px;
                    height: 20px;
                    margin: 0 2px;
                    text-align: center;
                    background: #ccc;
                    border-radius: 3px;
                    cursor: pointer;
                    font-size: 14px;
                }
                
                ${buttonBoxes()}
            </style>
            <div class="cs-box padding5">
                <div>
                    ${dm.getActiveConditions().map(cond => {
                        const infoId = `condition-info-${cond}`;
                        mapping.push({id: infoId, funct: () => {this.openConditionInfoBoxPopup(cond)}});
                        if(cond === CONDITIONS.EXHAUSTION) {
                            const exhaustionLevel = dm.getExhaustionLevel ? dm.getExhaustionLevel() : 1;
                            const incId = 'exhaustion-inc';
                            const decId = 'exhaustion-dec';
                            mapping.push({id: incId, funct: () => {this.changeExhaustionLevel(exhaustionLevel + 1)}});
                            mapping.push({id: decId, funct: () => {this.changeExhaustionLevel(exhaustionLevel - 1)}});
                            return `
                            <li class="medium-text padding5 uppercase">
                                exhaustion (level ${exhaustionLevel})
                                <span class="exhaustion-controls">
                                    <span class="exhaustion-btn" id="${decId}">-</span>
                                    <span class="exhaustion-btn" id="${incId}">+</span>
                                </span>
                                <span class="info-button" id="${infoId}">?</span>
                            </li>
                            `
                        }
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
                if(dm.isConditionActive(selectedCondition)){
                    this.openConditionInfoBoxPopup(selectedCondition);
                }
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
    changeExhaustionLevel(newLevel) {
        if(newLevel < 1) newLevel = 1;
        if(newLevel > 6) newLevel = 6;
        dm.setExhaustionLevel(newLevel);
    }

}

customElements.define('active-conditions', ActiveConditions);