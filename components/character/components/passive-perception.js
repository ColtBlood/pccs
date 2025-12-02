import {singleFieldBox} from "../../style/boxes.js";
import {SKILLS} from "../../data/enums/skills.js";
import {Enhancer, PassivePerceptionEnhancer} from "../../data/enhancements/enhancer.js";

class PassivePerception extends HTMLElement{
    connectedCallback(){
        const perception = dm.getSkillModifier({skillName: SKILLS.PERCEPTION});
console.log('***************************')
        const passivePerception = Enhancer.getInstance().enhance(PassivePerceptionEnhancer, {value: 10+ perception, isProficient: dm.isProficient(SKILLS.PERCEPTION), isExpert: dm.isExpert(SKILLS.PERCEPTION)});
console.log('***************************')
        this.innerHTML = `
            <style>
                ${singleFieldBox()}
            </style>
            <div class="single-cs-box">
                <div class="value">${passivePerception}</div>
                <div class="title">Passive Perception</div>
            </div>
        `;
    }
}

customElements.define('passive-perception-box', PassivePerception)