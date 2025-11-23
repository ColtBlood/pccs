class diceString extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <style>
                .diceString{
                    background-color: lightgrey;
                    padding: 1px 5px;
                }
            </style>
            <span class="diceString">${this.textContent.trim().split(' ').join(' - ')}</span>
        `;
    }
}

customElements.define('dice-string', diceString);