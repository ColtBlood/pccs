import './dice-string.js';
import {DiceRoll, RollOutcome} from "./dice-roll.js";

const randomizer = (max) => {
    const randomPick = Math.floor(Math.random() * 20);
    const randomSequence = crypto.getRandomValues(new Uint32Array(20))
    return (randomSequence[randomPick] % max ) +1;
}

class diceRoller{
    resolveVantageDice(initialResult, diceRoll, result){
        if(diceRoll.advantage !== diceRoll.disadvantage){
            const secondRoll = randomizer(this.getDiceType(diceRoll.dice));
            result.allDice.push(secondRoll);
            const secondResult = secondRoll+Number(diceRoll.modifier);
            return new RollOutcome(diceRoll, initialResult, secondResult);
        }

        return new RollOutcome(diceRoll, initialResult)
    }

    rollDiceObject(diceRoll){
        const result = {
            mainResult: undefined,
            allDice: [],
            additionalResults: 0,
            total: 0
        }

        let initialResult = diceRoll.modifier;

        for(let i = 0; i < this.getDiceAmount(diceRoll.dice); i++){
            const intermediateResult = randomizer(this.getDiceType(diceRoll.dice));
            result.allDice.push(intermediateResult);
            initialResult =  intermediateResult + initialResult;
        }

        result.mainResult = this.resolveVantageDice(initialResult, diceRoll, result)
        let additionalResults = 0
        diceRoll.additionalDice.forEach( diceType => {
                const additionalDiceOutcome = randomizer(diceType);
                result.allDice.push(additionalDiceOutcome);
                additionalResults += additionalDiceOutcome;
        });
        result.additionalResults = additionalResults;
        result.total = result.mainResult.getResult() + result.additionalResults;
        diceRoll.logOutcome(result);
        return result;
    }

    interprete(diceString){
        return diceString.split(' ').map(singleDS => {
            const singleDSSplit = singleDS.split(/[+-]/)

            const diceArray = Array.from(Array(this.getDiceAmount(singleDSSplit[0])))
                .map(init => this.getDiceType(singleDSSplit[0]));
            const outcomeModifier = singleDSSplit[1] || 0;

            return {
                diceArray,
                outcomeModifier
            }
        })
    }

    getDiceAmount(diceString){
        return Number(diceString.split(/d/)[0]);
    }
    getDiceType(diceString){
        return Number(diceString.split(/d/)[1]);
    }
}

window.diceRoller = window.diceRoller || new diceRoller();