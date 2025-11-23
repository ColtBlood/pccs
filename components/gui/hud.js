import '../character/character-sheet.js'

class Hud extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <hotbar></hotbar>
            <character-sheet></character-sheet>
            <combat-hud></combat-hud>
        `
    }
}

customElements.define('pccs-hud', Hud);