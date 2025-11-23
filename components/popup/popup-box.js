import {greyLine} from "../style/basics.js";
import {bindOnClick} from "../utils/ui.js";

class PopupBox extends HTMLElement{
    missingImplementation = () => alert('Missing implementation')
    mainAction = this.missingImplementation;
    closeAction = this.missingImplementation;
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this.render();
    }
    render(){
        const title = this.getAttribute('title') || 'Missing popup title';
        const content = this.getAttribute('content') || 'Missing popup content'
        this.shadowRoot.innerHTML=  `
            <style>
                #popup-box{
                    position: absolute;
                    margin: auto;
                    top: 150px;
                    left: 50%;
                    width: 600px;
                    margin-left: -300px;
                    z-index: 999999;
                }
                #popup-styling{
                    padding: 20px;
                    background-color: white;
                    border: 1px solid ${greyLine()};
                    border-radius: 10px;
                }
                .popup-title{
                    font-weight: bold;
                    text-align: center;
                    padding-bottom: 20px;
                }
                .popup-actions{
                    text-align: center;
                    padding-top: 20px;
                }
                .popup-actions button{
                    border: none;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    border-radius: 5px;
                    margin: 10px;
                }
            </style>
            <div id="popup-box">
                <div id="popup-styling">
                    <div class="popup-title">${title}</div>
                    <div class="popup-content">${content}</div>
                    <div class="popup-actions">
                        <button id="main-action">Hit it!</button>
                        <button id="close-action">Close</button>
                    </div>
                </div>
            </div>
        `;
        const mapping = [
            {id: 'main-action', funct: this.mainAction},
            {id: 'close-action', funct: this.closeAction}
        ]
        bindOnClick(this, mapping);
    }
}

customElements.define('popup-box', PopupBox)