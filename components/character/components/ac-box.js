import {singleFieldBoxSquare} from "../../style/boxes.js";

class ACBox extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <style>
                ${singleFieldBoxSquare()}
            </style>
            <div class="single-cs-box-square">
                <div class="main">${dm.getArmorClass()}</div>
                <div class="title">Armor Class</div>
            </div>
        `;
    }
}

customElements.define('armor-class', ACBox)