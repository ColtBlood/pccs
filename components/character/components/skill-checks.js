import {characterSheetBox} from "../../style/boxes.js";
import {greyLineHint, mediumLetters} from "../../style/basics.js";
import {defaultCloseAction, getOpenPopup, openPopup} from "../../popup/popup-manager.js";
import {bindOnClick} from "../../utils/ui.js";
import {PopupRadio} from '../../popup/components/popup-radio.js'
import {Enhancer, SkillCheckEnhancer} from "../../data/enhancements/enhancer.js";
import {DiceRoll} from "../../dice/dice-roll.js";
import {prependModifiers} from "../../utils/converters.js";
import {VANTAGE_TYPES} from "../../data/preload/base-mechanics.js";

class SkillChecks extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this.shadowRoot.innerHTML = `
            <style>
                ${characterSheetBox()}
                .skill-check {
                    text-transform: capitalize;
                }
                .skill_normal {
                    list-style-type: circle;
                }
                li .skill-content {
                    ${mediumLetters()}
                }
                .modifier{
                    display: inline-block;
                    width: 35px;
                    text-align: center;
                    border-bottom: 2px solid ${greyLineHint()};
                }
            </style>
            <div class="cs-box" id="skill-check" onclick="this.openSkillCheckPopup()">
                <ul>
                    ${dm.getSkills().map(({skillName, modifier, proficient}) => `
                            <li class="skill-check ${proficient ? 'skill_proficient' : 'skill_normal'}">
                                <span class="skill-content">
                                    <span class="modifier">${prependModifiers(modifier, true)}</span>
                                    ${skillName.replaceAll('_', ' ').toLowerCase()}
                                </span>
                            </li>
                        `).join('')}
                </ul>
                <span class="title">Skills</span>
            </div>
        `;

        const mapping = [
            {id: 'skill-check', funct: this.openSkillCheckPopup},
        ]
        bindOnClick(this, mapping);
    }


    openSkillCheckPopup(){
        const radioGroupName = 'skill-type-selection';
        const options = dm.getSkills().map(
            ({skillName, modifier, proficient}) =>
            {return {
                value: skillName,
                displayName: skillName.toLowerCase().replaceAll('_', ' ')
            }}
        );
        const enhancers = Enhancer.getInstance().getEnhancersByClass(SkillCheckEnhancer)
        openPopup({
            title: 'Roll skill check',
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
                    ${enhancer.formElement.render({vantageType: VANTAGE_TYPES.SKILL_CHECK})}
                `).join('')}
            `,
            mainAction: () => {
                const selectedSkill = PopupRadio.getSelectedValueFromPopupRadio();
                const skillModifier = dm.getSkillModifier({skillName: selectedSkill});
                const enhancedModifier = Enhancer.getInstance().enhance(SkillCheckEnhancer, {value: skillModifier});
                const diceRoll = new DiceRoll({purpose: `Skill check for ${selectedSkill}`})
                    .addModifier(enhancedModifier);
                Enhancer.getInstance()
                    .getEnhancersByClass(SkillCheckEnhancer)
                    .filter(enhancer => enhancer.formElement)
                    .forEach(enhancer => enhancer.formElement.fetchValue({diceRoll}))
                diceRoller.rollDiceObject(diceRoll);
                defaultCloseAction();
            },
        });
    }
}

customElements.define('skill-checks', SkillChecks)