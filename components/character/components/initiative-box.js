import {singleFieldBoxSquare} from "../../style/boxes.js";

class InitiativeBox extends HTMLElement{
    connectedCallback(){
        const initiative = dm.getInitiative();
        this.innerHTML = `
            <style>
                ${singleFieldBoxSquare()}
            </style>
            <div class="single-cs-box-square">
                <div class="main">${initiative >= 0 ? '+': ''}${initiative}</div>
                <div class="title">Initiative</div>
            </div>
        `;
    }
}

customElements.define('initiative-box', InitiativeBox)