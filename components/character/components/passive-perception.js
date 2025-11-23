import {singleFieldBox} from "../../style/boxes.js";
import {SKILLS} from "../../data/enums/skills.js";
import {Enhancer, PassivePerceptionEnhancer} from "../../data/enhancements/enhancer.js";

class PassivePerception extends HTMLElement{
    connectedCallback(){
        const perception = dm.getSkillModifier({skillName: SKILLS.PERCEPTION});
        const passivePerception = 10 + Enhancer.getInstance().getEnhancersByClass(PassivePerceptionEnhancer).reduce((result, enhancer) => enhancer.enhancePassivePerception(result), perception)
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