import {greyBackground, greyLine, mediumLetters, smallLetters} from "../../style/basics.js";

export class PopupRadio extends HTMLElement{
    static name;
    constructor() {
        super();
        this.attachShadow({mode: 'open'}) //to select values
    }

    connectedCallback(){
        const options = JSON.parse(this.getAttribute('options'));
        PopupRadio.name = this.getAttribute('name');
        const size = this.getAttribute('size');
        this.shadowRoot.innerHTML = `
            <style>
                .radio-option{
                    display:flex;
                    flex-direction: column;
                    text-align: center;
                    width: 75px;
                    margin: 0 10px 20px 10px;
                }
                .radio-option label{
                    border-radius: 5px;
                    height: 80px;
                    border: 1px solid ${greyLine()};
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-transform: capitalize;
                    box-shadow: inset 0 0 10px ${greyBackground()};
                    ${mediumLetters()}
                }
                .radio-option.small{
                    flex-direction: row-reverse;
                    align-content: baseline;
                    width: 150px;
                    margin: 0;
                }
                .radio-option.small label{
                    height: 40px;
                    padding: 0 10px;
                    min-width: 100px;
                }
                .popup-radio{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                }
                .popup-radio.small{
                    justify-content: center;
                }
            </style>
            
            <div class="popup-radio ${size}">
                ${options.map(({value, displayName, selected}) => {
                    const id= value.replaceAll(' ', '')
                    return `
                        <div class="radio-option ${size}">
                            <label for="${id}"><div>${displayName}</div></label>
                            <input type="radio" value="${value}" id="${id}" name="${PopupRadio.name}" ${selected ? `checked` : ''}/>
                        </div>
                        `
                    }).join('')
                }
            </div>
        `;
    }

    static getSelectedValueFromPopupRadio() {
        return document
            .querySelector('popup-box')
            .shadowRoot
            .querySelector('popup-radio')
            .shadowRoot
            .querySelector(`input[name="${PopupRadio.name}"]:checked`)
            .value
    }
}

customElements.define('popup-radio', PopupRadio);