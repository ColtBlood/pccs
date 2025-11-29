import {defaultCloseAction, openPopup} from "../popup/popup-manager.js";
import {bindOnClick} from "../utils/ui.js";
import {greyHintBackground, greyLine} from "../style/basics.js";
import {PopupRadio} from "../popup/components/popup-radio.js";
import {DiceRoll} from "../dice/dice-roll.js";
import {characterMapping} from "../data/preload/characters.js";

class PccsMenu extends HTMLElement{
    isCollapsed = true;
    menuItems = [
        {
            id: 'roll-dice',
            itemText: 'Roll dice',
            funct: () => this.rollDice(),
        },
        {
            id: 'empty-db',
            itemText: 'Empty database',
            funct: () => this.emptyDatabase(),
        },
        {
            id: 'void',
            itemText: '&nbsp;',
            funct: () => {},
        },
        {
            id: 'void2',
            itemText: 'Swap characters',
            funct: () => {},
        },
        ...Object.keys(characterMapping).map(key => {
            return {
                id: key,
                itemText: `- ${key}`,
                funct: () => {
                    window.sessionStorage.setItem('character', key);
                    window.location.reload();
                },
            }
        })
    ]



    constructor() {
        super();
        this.attachShadow({mode: 'open'})
    }

    connectedCallback(){
        this.render();
        pccsConsole.log('menu loaded')
    }

    render(){
        this.shadowRoot.innerHTML = `
            <style>
                .pccs-menu{
                    width: ${this.isCollapsed ? '20px' : '200px'};
                    border-right: 1px solid grey;
                    padding-left: 5px;
                    padding-right: 5px;
                    height: 100%;
                }
                .spacer{
                    height: 30px;
                }
                .width170{
                    width: 170px;
                }
                .menu-item{
                    border-bottom: 1px solid ${greyLine()};
                    padding: 5px;
                    background-color: ${greyHintBackground()};
                    cursor: pointer;
                }
            </style>
            <div class="pccs-menu">
                <div class="spacer"></div>
                <div id='toggle-menu' class="menu-item ${this.isCollapsed ? '': 'width170'}" >${this.isCollapsed ? '>>' : '<<'}</div>
                ${this.isCollapsed ? '' : 
                    this.menuItems.map((item) => `
                        <div class='menu-item width170' id='${item.id}'>${item.itemText}</div>
                    `).join('')}
            </div>
        `;
        this.shadowRoot.getElementById('toggle-menu').onclick = () => this.toggleMenu();
        if(!this.isCollapsed){
            bindOnClick(this, this.menuItems);
        }
    }

    toggleMenu(){
        this.isCollapsed = !this.isCollapsed;
        this.render();
    }

    rollDice(){
        const options = [
            {
                value: '4',
                displayName: 'd4',
            },
            {
                value: '6',
                displayName: 'd6',
            },
            {
                value: '8',
                displayName: 'd8',
            },
            {
                value: '10',
                displayName: 'd10',
            },
            {
                value: '12',
                displayName: 'd12',
            },
            {
                value: '20',
                displayName: 'd20',
            },
            {
                value: '100',
                displayName: 'd100',
            },
        ]
        const radioGroupName = 'd-type';
        openPopup({
            title: `Roll Dice`,
            content: `
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
                        <label>Amount</label>
                        <input type="number" name="amount" value="1"/>
                    </div>
                <popup-radio  options='${JSON.stringify(options)}' name="${radioGroupName}"></popup-radio>
                
                    <div class="amount-box">
                        <label>Modifier</label>
                        <input type="number" name="modifier" value="0"/>
                    </div>
            `,
            mainAction: () => {
                const selectedDice = PopupRadio.getSelectedValueFromPopupRadio();
                const amount = Number(document
                    .querySelector('popup-box')
                    .shadowRoot
                    .querySelector('input[name=amount]').value);
                const modifier = Number(document
                    .querySelector('popup-box')
                    .shadowRoot
                    .querySelector('input[name=modifier]').value);
                const diceRoll = new DiceRoll({
                    dice: `${amount}d${selectedDice}`,
                })
                diceRoll.addModifier(modifier);
                diceRoller.rollDiceObject(diceRoll);
                defaultCloseAction()
            }
        })
    }

    emptyDatabase() {
        openPopup({
            title: 'Confirm Database Empty',
            content: `
                <div style="padding:10px;">
                    Are you sure you want to empty the database?<br>This action cannot be undone.
                </div>
            `,
            mainAction: () => {
                ds.emptyDatabase(() => {
                    pccsConsole.log('Database emptied successfully.');
                    window.location.reload();
                });
                defaultCloseAction();
            },
            mainActionText: 'Empty Database',
            secondaryAction: defaultCloseAction,
            secondaryActionText: 'Cancel',
        });
    }
}

customElements.define('pccs-menu', PccsMenu);