import {characterSheetBox} from "../../style/boxes.js";
import {greyBackground, greyHintBackground, greyLine, greyLineHint, mediumLetters} from "../../style/basics.js";
import {bindOnClick} from "../../utils/ui.js";
import {defaultCloseAction, openPopup} from "../../popup/popup-manager.js";
import {PopupRadio} from '../../popup/components/popup-radio.js'
import { DATA_MANAGER_FIELDS } from '../../data/data-manager.js';

class HitPoints extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this._unsubHp = null;
        this._unsubTempHp = null;
    }
    connectedCallback() {
        this.render();
        // Subscribe to HP and Temp HP changes
        this._unsubHp = dm.subscribe(DATA_MANAGER_FIELDS.CURRENT_HIT_POINTS, this.render.bind(this));
        this._unsubTempHp = dm.subscribe(DATA_MANAGER_FIELDS.TEMPORARY_HIT_POINTS, this.render.bind(this));
    }
    disconnectedCallback() {
        if (this._unsubHp) this._unsubHp();
        if (this._unsubTempHp) this._unsubTempHp();
    }
    render(){
        this.shadowRoot.innerHTML = `
            <style>
                ${characterSheetBox()}
                .center{
                    text-align: center;
                }
                .hit-point-main{
                    padding: 10px;
                }
                .hit-point-max{
                    color: ${greyLine()};
                    ${mediumLetters()};
                    padding-left: 10px;
                }
                .hit-point-max-value{
                    display: inline-block;
                    width: 100px;
                    text-align: center;
                    border-bottom: 1px solid ${greyLineHint()};
                }
            </style>
            <div class="cs-box" id="hit-points">
                <div class="hit-point-max">
                    Hit Point Maximum
                    <span class="hit-point-max-value">${dm.getHitPointMax()}</span>
                </div>
                <div class="center hit-point-main">
                    ${dm.getCurrentHitPoints()}
                </div>
                <span class="title">Current Hit Points</span>
            </div>
            <div class="cs-box" id="temp-hit-points">
                <div class="center hit-point-main">${dm.getTemporaryHitPoints()}</div>
                <span class="title">Temporary Hit Points</span>
            </div>
        `;

        const mapping = [
            {id: 'hit-points', funct: this.openHitPointPopup},
            {id: 'temp-hit-points', funct: this.openTempHitPointPopup},
        ]
        bindOnClick(this, mapping);
    }

    openHitPointPopup(){
        this.openGenericHitPointPopup({title:'Adjust Current Hit Points', healthVar:'CurrentHitPoints'});
    }

    openTempHitPointPopup(){
        this.openGenericHitPointPopup({title:'Adjust Temporary Hit Points', healthVar:'TemporaryHitPoints'});
    }

    openGenericHitPointPopup({title, healthVar}){
        const radioGroupName = 'health-point-action';
        const options = [
            {value:'add', displayName:'Add health points'},
            {value:'deduct', displayName:'Deduct health points', selected: true}
        ]
        openPopup({
            title,
            content:
                `
                    <style>
                        input[type=number]{
                            font-size: xx-large;
                            text-align: center;
                            border: 1px solid ${greyLine()};
                            background-color: ${greyHintBackground()};
                        }
                        .amount-box{
                            display:flex;
                            justify-content: center;
                            padding: 10px;
                        }
                    </style>
                    <div class="amount-box">
                        <input type="number" name="amount" />
                    </div>
                    <popup-radio options='${JSON.stringify(options)}' name="${radioGroupName}" size="small"></popup-radio>
                `,
            mainAction: () => {
                const funcNameSet = `set${healthVar}`;
                const funcNameGet = `get${healthVar}`;
                const amount = Number(document
                    .querySelector('popup-box')
                    .shadowRoot
                    .querySelector('input[name=amount]').value);
                const modification = PopupRadio.getSelectedValueFromPopupRadio();
                const currentHp = dm[funcNameGet]();
                let newHp = currentHp;
                if(modification === 'add'){
                    newHp = currentHp + amount;
                }
                else {
                    newHp = currentHp - amount;
                }
                dm[funcNameSet](newHp);
                defaultCloseAction();
                // Remove manual render, subscription will handle rerender
                dm.persistCharacter();
            }
        })
    }
}

customElements.define('hit-points', HitPoints)