import {bindOnClick} from "../utils/ui.js";
import {greyHintBackground} from "../style/basics.js";

let groupStartEntry = undefined;

class pccsConsoleManager{
    _entries = []
    _bindings = []
    _renderer;

    log(entry, bindings = []){
        // console.log('logging entry:', entry)
        this._bindings = [...this._bindings, ...bindings];
        this._entries.push({log:entry, time: new Date()});
        if(!groupStartEntry){
            this._renderer?.render();
        }
    }

    startGroup(){
        groupStartEntry = this._entries.at(-1);
    }

    endGroup(){
        const startIndex = this._entries.indexOf(groupStartEntry)+1;
        if (startIndex > 0) {
            // Merge all entries from 0 up to startIndex (not including startIndex)
            const mergedLogs = this._entries.slice(startIndex)
                .map(e => e.log)
                .join('<br>');
            // Use the time of the last merged entry
            const mergedTime = this._entries[startIndex].time;
            // Push the merged entry
            this._entries = [
                ...this._entries.slice(0, startIndex),
                { log: `<div class="group">${mergedLogs}</div>`, time: mergedTime }
            ];
            this._renderer?.render();
        }
        groupStartEntry = undefined;
    }
}

window.pccsConsole = window.pccsConsole || new pccsConsoleManager();

class pccsConsoleRenderer extends HTMLElement{
    logLength= 40;
    mngr = window.pccsConsole

    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        window.pccsConsole._renderer = this;
    }

    connectedCallback(){
        this.render();
    }

    render(){
        const entries = this.mngr._entries;
        const displayed = entries.length > this.logLength ? entries.slice(entries.length-this.logLength, entries.length) : entries;
        this.shadowRoot.innerHTML = `
            <style>
                .pccs-console {
                    /*background-color: green;*/
                    border-top: 1px solid grey;
                    position: fixed;
                    display: block;
                    width: 100%;
                    font-family: monospace;
                    overflow: scroll;
                    height: 15em;
                    background-color: white;
                }
                
                ol {
                    list-style-type: '> '
                }
                .group {
                    background-color: ${greyHintBackground()};
                    padding: 20px 10px 10px 15px;
                    margin-top: -17px;
                    margin-bottom: 7px;
                }
            </style>
            <div class="pccs-console">
                <ol>
                    ${Array.from(displayed).reverse().map(entry => `
                    <li>[${this.timePrint(entry.time)}] ${entry.log}</li>
                    `).join('')}
                </ol>
            </div>
        `;
        bindOnClick(this, this.mngr._bindings)
    }

    timePrint(time){
        return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    }
}


customElements.define('pccs-console', pccsConsoleRenderer);