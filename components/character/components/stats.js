import {STATS} from "../../data/enums/stats.js";
import {mediumLetters, greyBackground, smallLetters} from "../../style/basics.js";
import {bindOnClick} from "../../utils/ui.js";
import {DiceRoll} from "../../dice/dice-roll.js";

class StatBlock extends HTMLElement{
    statType
    statValue
    statModifier
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        const statType = this.getAttribute('stat-type');
        this.statType = statType;
        const statValue = this.getAttribute('value');
        this.statValue = statValue;
        const statModifier = Math.floor((statValue - 10) / 2);
        this.statModifier = statModifier;
        this.shadowRoot.innerHTML = `
            <style>
                .stat-type{
                    text-transform: uppercase;
                    ${smallLetters()}
                }
                .stat-block{
                    border: 1px solid black;
                    text-align: center;
                    margin: 5px;
                    margin-bottom: 30px;
                    padding-top: 5px;
                    border-radius: 10px;
                    background-color: white;
                }
                .stat-modifier{
                    ${mediumLetters()}
                    border: 1px solid black;
                    margin:auto;
                    margin-bottom: -5px;
                    position: relative;
                    width: 50%;
                    background-color: white;
                }
                .stat-value{
                    padding-top: 5px;
                    padding-bottom: 10px;
                }
            </style>
            <div class="stat-block" id="stat-${statType}">
                <div class="stat-type">${statType}</div>
                <div class="stat-value">${statValue}</div>
                <div class="stat-modifier">${ statModifier > 0 ? '+' + statModifier : statModifier}</div>
            </div>
        `;
        const mapping = [
            {id: `stat-${statType}`, funct: this.rollStat},
        ]
        bindOnClick(this, mapping);
    }

    rollStat(){
        const diceRoll = new DiceRoll({purpose:`Rolling ${this.statType}`})
            .addModifier(this.statModifier);
        diceRoller.rollDiceObject(diceRoll);
    }
}

class StatList extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <style>
                .stats{
                    background-color: ${greyBackground()};
                    margin-top: 5px;
                    padding: 30px 5px 10px 5px;
                    width: 80px;
                }
            </style>
            <div class="stats">
                ${Object.keys(STATS).map( stat => `<stat-block stat-type="${stat}" value="${dm.getStat(stat)}"></stat-block>`).join('')}
            </div>
        `
    }
}

customElements.define('stat-block', StatBlock)
customElements.define('stat-list', StatList)