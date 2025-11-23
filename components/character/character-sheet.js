import './components/stats.js'
import './components/characteristics.js'
import './components/skill-checks.js'
import './components/saving-throws.js'
import './components/proficiency-bonus.js'
import './components/passive-perception.js'
import './components/ac-box.js'
import './components/movement-speed.js'
import './components/initiative-box.js'
import './components/hit-points.js'
import './components/action-economy.js'
import './components/prepared-spells.js'
import {greyBackground} from "../style/basics.js";

class CharacterSheet extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <style>
                 .flexy {
                    display: flex;
                 }
                 
                 .divide{
                    align-items: stretch;
                 }
                 
                 .divide > *{
                    width: 33%
                 }
                 
                 .battle-block {
                    background-color: ${greyBackground()};
                 }
                 
                 .cs-content {
                    margin-bottom: 200px;
                 }
            </style>
            <div>
                <dnd-characteristics></dnd-characteristics>
            </div>
            
            <div class="cs-content flexy">
                <div>
                    <div class="flexy">
                        <stat-list></stat-list>
                        <div>
                            <proficiency-bonus-box></proficiency-bonus-box>
                            <saving-throws></saving-throws>
                            <skill-checks></skill-checks>
                        </div>
                    </div>
                    <passive-perception-box></passive-perception-box>
                </div>
                <div class="battle-block">
                    <div class="flexy divide">
                        <armor-class></armor-class>
                        <initiative-box></initiative-box>
                        <movement-speed></movement-speed>
                    </div>
                    <hit-points></hit-points>
                    <action-economy></action-economy>
                </div>
                <div>
                    <prepared-spells></prepared-spells>
                </div>
            </div>
        `;
    }
}

customElements.define('character-sheet', CharacterSheet);