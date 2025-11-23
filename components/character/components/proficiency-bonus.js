import {singleFieldBox} from "../../style/boxes.js";

class ProficiencyBonus extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <style>
                ${singleFieldBox()}
            </style>
            <div class="single-cs-box">
                <div class="value">${dm.getProficiencyBonus()}</div>
                <div class="title">Proficiency Bonus</div>
            </div>
        `;
    }
}

customElements.define('proficiency-bonus-box', ProficiencyBonus)