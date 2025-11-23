import {prependModifiers} from "../utils/converters.js";
import {greyBackground, greyHintBackground, greyLine, smallLetters} from "../style/basics.js";
import {bindOnClick} from "../utils/ui.js";

export class DiceRoll {
    dice;
    purpose;
    modifier = 0;
    additionalDice = []; // filling with dicetype, eg: [4, 4, 8, 20, 4]
    disadvantage = false;
    advantage = false;

    constructor({dice = '1d20', purpose = 'Rolling'} = {}) {
        this.dice = dice;
        this.purpose = purpose
        return this;
    }

    setDice(dice){
        this.dice = dice;
        return this;
    }

    addModifier(modification){
        this.modifier = this.modifier + modification;
        return this;
    }

    setDisadvantage(value){
        this.disadvantage = value;
        return this;
    }

    addDisadvantage(){
        this.disadvantage = true;
        return this;
    }
    removeDisadvantage(){
        this.disadvantage = false;
        return this;
    }

    setAdvantage(value){
        this.advantage = value;
        return this;
    }

    addAdvantage(){
        this.advantage = true;
        return this;
    }

    removeAdvantage(){
        this.advantage = false;
        return this;
    }

    addAdditionalDice(dice){
        this.additionalDice.push(dice);
        return this;
    }

    logOutcome(rollOutcome){
        const groupedDice = {};
        const randomId = `id-${Math.random()}`;
        this.additionalDice.forEach((diceType, index) => {
            if(!groupedDice[diceType]){
                groupedDice[diceType] = 0;
            }
            groupedDice[diceType]++;
        })
        const additionalDiceString = Object.entries(groupedDice).map(([diceType, amount]) => `${amount}d${diceType} `);
        const toggleVisibility = () => {
            const visibility = window.pccsConsole._renderer.shadowRoot.getElementById(randomId).style.display;
            if(visibility === 'block'){
                window.pccsConsole._renderer.shadowRoot.getElementById(randomId).style.display = 'none';
            }
            else{
                window.pccsConsole._renderer.shadowRoot.getElementById(randomId).style.display = 'block';
            }
        }
        pccsConsole.log(`
            <style>
                .diceRollResults{
                    background-color: lightgoldenrodyellow;
                    border: 1px solid #ffd446;
                    width: 200px;
                    padding: 5px;
                    padding-left: 20px;
                    margin: 5px;
                    margin-left: 7em;
                }
                .discard{
                    color: darkgrey;
                }
                .smallGrey{
                    ${smallLetters()}
                }
                .hidden{
                    display: none;
                }
                .meta-results{
                    background-color: #fafad24d;
                    color: ${greyLine()}
                }
            </style>
            ${this.purpose}: <dice-string>${this.dice}${prependModifiers(this.modifier)}${this.advantage ? ' Advantage' : ''}${this.disadvantage ? ' Disadvantage' : ''} ${additionalDiceString.join(' ')}</dice-string>
            <ul class="diceRollResults">
                <li>
                    ${this.dice}${prependModifiers(this.modifier)}: ${rollOutcome.mainResult.getResult()}
                    ${this.advantage !== this.disadvantage ? `<span class='discard'>${rollOutcome.mainResult.getDiscard()}</span>` : ''}
                </li>
                ${this.additionalDice.length > 0 ? `
                    <li>
                        ${additionalDiceString}<br />
                        outcome: ${rollOutcome.additionalResults}
                    </li>
                    <li>
                        Total: ${rollOutcome.total}
                    </li>
                `: ''}
            </ul>
            <div class="smallGrey" id="${randomId}-button">Raw dice roll(s)</div>
            <ul class="diceRollResults hidden meta-results" id="${randomId}">
                <li>
                    ${rollOutcome.allDice.join(" ")}
                </li>
            </ul>
        `,
        [{id:`${randomId}-button`, funct: toggleVisibility}])
    }

}

export class RollOutcome{
    diceRoll;
    highest;
    lowest;

    constructor(diceRoll, result1, result2 = -1000) {
        this.diceRoll = diceRoll;
        this.highest = Math.max(result1, result2);
        this.lowest = Math.min(result1, result2)
    }

    getResult(){
        if(this.diceRoll.disadvantage && !this.diceRoll.advantage){
            return this.lowest;
        }
        return this.highest;
    }

    getDiscard(){
        if(!this.diceRoll.disadvantage){
            return this.lowest;
        }
        return this.highest;
    }
}