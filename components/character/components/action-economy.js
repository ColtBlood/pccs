import {buttonBoxes, characterSheetBox} from "../../style/boxes.js";
import {mediumLetters} from "../../style/basics.js";
import {bindOnClick} from "../../utils/ui.js";
import {ACTION_MANAGER, ACTION_TYPES} from "../../data/actions/action-manager.js";
import {DATA_MANAGER_FIELDS} from '../../data/data-manager.js';

class ActionEconomy extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._unsubscribe = null;
    }
    connectedCallback() {
        this.render();
        // Subscribe to actionsAvailable changes
        this._unsubscribe = dm.subscribe(DATA_MANAGER_FIELDS.ACTIONS_AVAILABLE, this.render.bind(this));
    }
    disconnectedCallback() {
        if (this._unsubscribe) this._unsubscribe();
    }
    render() {
        const mapping = [];
        const sections = [
            { title: 'Actions', list: ACTION_MANAGER.getActions(), actionAvailable: ACTION_MANAGER.isActionTypeAvailable(ACTION_TYPES.ACTION), actionDisabled: ACTION_MANAGER.isActionTypeDisabled(ACTION_TYPES.ACTION)},
            { title: 'Bonus Actions', list: ACTION_MANAGER.getBonusActions(), actionAvailable: ACTION_MANAGER.isActionTypeAvailable(ACTION_TYPES.BONUS_ACTION), actionDisabled: ACTION_MANAGER.isActionTypeDisabled(ACTION_TYPES.BONUS_ACTION)},
            { title: 'Reactions', list: ACTION_MANAGER.getReactions(), actionAvailable: ACTION_MANAGER.isActionTypeAvailable(ACTION_TYPES.REACTION), actionDisabled: ACTION_MANAGER.isActionTypeDisabled(ACTION_TYPES.REACTION)},
        ];
        this.shadowRoot.innerHTML = `
            <style>
                ${characterSheetBox()}
                ${buttonBoxes()}
                .action-slot {
                    height: 10px;
                    width: 10px;
                    border-radius: 50%;
                    display: block;
                    border: 1px solid black;
                    margin-left: 3px;
                }
                .used, .disabled {
                    height: 5px;
                    width: 5px;
                }
                .used {
                    background-color: rgba(158,158,158,0.5);
                    border: 4px solid rgba(255,255,255,0.5);
                }
                .disabled {
                    background-color: rgba(147,11,39,0.5);
                    border: 4px solid rgba(253,4,51,0.5);
                }
                .action-slot-row {
                    display:flex;
                    align-items: center;
                    ${mediumLetters()}
                }
                .action-wrapper {
                    display: flex;
                    justify-content: space-between;
                }
                .actions-list {
                    padding: 5px 5px 0 5px;
                }
                .center {
                    text-align: center;
                    margin: auto;
                }
                #reset-actions {
                    margin-top: 5px;
                    margin-bottom: 5px;
            </style>
            <div class="cs-box actions-list">
                <div class="action-wrapper">
                    ${sections.map(section => `
                        <div class="action-slot-row">${section.title}: <div class="action-slot ${section.actionAvailable ? '' : 'used'} ${section.actionDisabled ? 'disabled' : ''}"></div></div>
                    `).join('')}
                </div>
                <div class="button-box center" id="reset-actions">Reset</div>
                <div>
                    ${sections.filter(section => section.actionAvailable)
                        .map(section => `
                        <div class="title">-- ${section.title} --</div>
                        <div>
                            ${section.list.map((action, idx) => {
                                const elementId = `${section.title.toLowerCase().replace(/ /g, '-')}-action-${idx}`;
                                mapping.push({id: elementId, funct: () => action.openActionPopup()});
                                return `<div class="button-box" id="${elementId}">${action.displayName}</div>`;
                            }).join('')}
                        </div>
                    `).join('')}
                </div>
                <span class="title">Action Economy</span>
            </div>
        `;
        bindOnClick(this, [
            {id: 'reset-actions', funct: () => { ACTION_MANAGER.resetActionsAvailable(); this.render(); }},
            ...mapping
        ]);
    }
}

customElements.define('action-economy', ActionEconomy)