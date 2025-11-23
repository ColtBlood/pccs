import {singleFieldBoxSquare} from "../../style/boxes.js";

class MovementSpeed extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <style>
                ${singleFieldBoxSquare()}
            </style>
            <div class="single-cs-box-square">
                <div class="main">${dm.getSpeed()}</div>
                <div class="title">speed</div>
            </div>
        `;
    }
}

customElements.define('movement-speed', MovementSpeed)