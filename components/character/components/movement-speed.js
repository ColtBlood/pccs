import {singleFieldBoxSquare} from "../../style/boxes.js";
import {DATA_MANAGER_FIELDS} from "../../data/data-manager.js";

class MovementSpeed extends HTMLElement{
    constructor() {
        super();
        this._unsubMovementSpeed = null;
    }

    connectedCallback(){
        this._unsubMovementSpeed = dm.subscribe(DATA_MANAGER_FIELDS.SPEED, this.render.bind(this))
        this.render();
    }

    disconnectedCallback(){
        if(this._unsubMovementSpeed){
            this._unsubMovementSpeed();
        }
    }

    render(){

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