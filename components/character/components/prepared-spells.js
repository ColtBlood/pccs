import {buttonBoxes, characterSheetBox} from "../../style/boxes.js";
import {castTime2ActionTypeMapper, determineSpellSlots, SPELL_LEVEL} from "../../data/spells/base-spell.js";
import {
    boldClass,
    greyBackground,
    greyHintBackground,
    italicClass,
    mediumLetters,
    tableStyles
} from "../../style/basics.js";
import {bindOnClick} from "../../utils/ui.js";
import {defaultCloseAction, getOpenPopup, openPopup} from "../../popup/popup-manager.js";
import {FULL_SPELL_LIST} from "../../data/spells/spells.js";
import {DATA_MANAGER_FIELDS} from '../../data/data-manager.js';
import {ACTION_MANAGER, ACTION_TYPES} from "../../data/actions/action-manager.js";

class PreparedSpells extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this._unsubPreparedSpells = null;
        this._unsubConcentration = null;
        this._unsubUsedSpellSlots = null;
        this._unsubActionsAvailable = null; // Add unsubscribe for actions
    }
    connectedCallback(){
        this.render();
        // Subscribe to relevant DataManager fields
        this._unsubPreparedSpells = dm.subscribe(DATA_MANAGER_FIELDS.PREPARED_SPELLS, this.render.bind(this));
        this._unsubConcentration = dm.subscribe(DATA_MANAGER_FIELDS.CONCENTRATION, this.render.bind(this));
        this._unsubUsedSpellSlots = dm.subscribe(DATA_MANAGER_FIELDS.USED_SPELL_SLOTS, this.render.bind(this));
        this._unsubActionsAvailable = dm.subscribe(DATA_MANAGER_FIELDS.ACTIONS_AVAILABLE, this.render.bind(this)); // Subscribe to actions
    }
    disconnectedCallback(){
        if (this._unsubPreparedSpells) this._unsubPreparedSpells();
        if (this._unsubConcentration) this._unsubConcentration();
        if (this._unsubUsedSpellSlots) this._unsubUsedSpellSlots();
        if (this._unsubActionsAvailable) this._unsubActionsAvailable(); // Unsubscribe actions
    }
    render(){
        let spellLevelIteration = undefined;
        const spellSlots = determineSpellSlots();
        const usedSpellSlots = dm.getUsedSpellSlots();

        // Get available action types
        const availableActionTypes = Object.keys(ACTION_TYPES).filter(type => ACTION_MANAGER.isActionTypeAvailable(type));

        const mapping = [
            {id: 'edit-prepared-spells', funct: this.openEditPreparedSpellsPopup},
        ]
        if(dm.getSpellConcentration()){
            mapping.push({id: 'drop-concentration', funct: () => {dm.dropConcentration(); this.render()}})
        }

        this.shadowRoot.innerHTML = `
            <style>
                ${characterSheetBox()}
                .prepared-spells{
                    padding: 10px 10px 0 10px;
                }
                .spell-slot {
                    height: 10px;
                    width: 10px;
                    border-radius: 50%;
                    display: block;
                    border: 1px solid black;
                    margin-left: 3px;
                }
                .used {
                    background-color: ${greyBackground()};
                    border: 4px solid ${greyHintBackground()};
                    height: 5px;
                    width: 5px;
                }
                .spell-slot-row {
                    display:flex;
                    align-items: center;
                }
                .spell-level-name{
                    padding-top: 10px;
                    padding-bottom: 0;
                }
                .currently-prepared-spells{
                    margin-bottom: 20px;
                }
                .edit-button{
                    width: 60px;
                    text-align: center;
                    margin: auto;
                    margin-bottom: 10px;
                }
                .center {
                    text-align: center;
                }
                .grey-background {
                    display: block;
                    background-color: ${greyHintBackground()}
                }
                .medium-text {
                    ${mediumLetters()}
                }
                .padding5{
                    padding: 5px;
                }
                #drop-concentration{
                    padding: 2px;
                    width: 50%;
                    margin: auto;
                    background-color: white;
                }
                .concentration{
                    padding-bottom: 10px;
                }
                ${buttonBoxes()}
            </style>
            <div class="cs-box prepared-spells">
                ${dm.getSpellConcentration() ? `
                    <div class="center concentration">
                        <div class="title">-- Concentrating --</div>
                        <span class="grey-background medium-text padding5">
                            ${dm.getSpellConcentration()}
                            <div class="button-box" id="drop-concentration">Drop</div>
                        </span>
                        
                    </div>
                ` : ''}
                <div class="spell-slots">
                    <div class="title">-- Spell slots --</div>
                    ${Object.entries(spellSlots).filter(([level, slots]) => slots !== 0).map(([level, slots]) => `
                        <div class="spell-slot-row">L${level}: ${Array.from(Array(slots)).map((slot, index) => `<span class="spell-slot ${index<usedSpellSlots[level]?'used':''}"></span>`).join(' ')}</div>
                    `).join('')}
                </div>
                
                <div class="currently-prepared-spells">
                    ${dm.getPreparedSpells()
                        .filter(spell => availableActionTypes.includes(castTime2ActionTypeMapper(spell.castingTime))) // Filter spells by available actions
                        .map((spell) => {
                            let shouldListSpellLevel = false;
                            if(spellLevelIteration !== spell.spellLevel){
                                shouldListSpellLevel = true;
                                spellLevelIteration = spell.spellLevel;
                            }
                            const elementId = `ps-${spell.spellName.replaceAll(' ', '')}`;
                            mapping.push({id:elementId, funct:this.openSpellPopup.bind(this, spell)})
                            return `
                                ${shouldListSpellLevel ? `
                                    <div class="title spell-level-name">-- ${SPELL_LEVEL.levelNames[spell.spellLevel]} --</div>
                                ` : ''}
                        <div class="button-box" id="${elementId}">${spell.spellName}</div>
                        `}).join('')}
                </div>
                <div class="button-box edit-button" id="edit-prepared-spells">Edit</div>
                <span class="title">prepared spells</span>
            </div>
        `;

        bindOnClick(this, mapping);
    }

    openSpellPopup(spellInfo){
        const spellSlots = determineSpellSlots();
        const usedSpellSlots = dm.getUsedSpellSlots();
        const availableSlots = Object.entries(spellSlots)
            .filter(([level, slots]) => level >= spellInfo.spellLevel && slots !== usedSpellSlots[level]);
        const isUnableToCast = availableSlots.length === 0;
        const lowestAvailableLevel = !isUnableToCast ? availableSlots.find(() => true)[0] : spellInfo.spellLevel;
        const highestAvailableLevel = !isUnableToCast ? availableSlots.findLast(() => true)[0] : 9;



        openPopup({
            title: spellInfo.spellName,
            content: `
                <style>
                    .spacing{
                        display: inline-block;
                        margin-bottom: 5px;
                        ${mediumLetters()}
                    }
                    input[type=range]{
                        width: 300px;
                    }
                    datalist {
                      display: flex;
                      flex-direction: row;
                      justify-content: space-between;
                      padding-left: 3px;
                      width: 297px;
                    }
                    #popup-styling{
                        background-color: #fefcf2;
                    }
                    ${tableStyles()}
                    ${boldClass()}
                    ${italicClass()}
                </style>
                <span class="italic spacing">${SPELL_LEVEL.levelNames[spellInfo.spellLevel]} ${spellInfo.isRitual ? ` (ritual)`: ''}</span><br />
                ${spellInfo.castingTime? `
                    <span class="bold">Casting Time:</span> ${spellInfo.castingTime}<br />
                `: ''}
                ${spellInfo.range? `
                    <span class="bold">Range:</span> ${spellInfo.range}<br />
                `: ''}
                ${spellInfo.target? `
                    <span class="bold">Target:</span> ${spellInfo.target}<br />
                `: ''}
                ${spellInfo.components? `
                    <span class="bold">Components:</span> ${spellInfo.components.join(', ')}${spellInfo.componentMaterial ? ` (${spellInfo.componentMaterial})`: ''}<br />
                `: ''}
                ${spellInfo.duration? `
                    <span class="bold">Duration:</span> ${spellInfo.concentration ? 'Concentration, ' : ''}${spellInfo.duration}<br />
                `: ''}
                
                <p>
                    ${spellInfo.description}
                </p>
                
                ${spellInfo.upcastDescription? `
                    <p>
                        <span class="bold">At Higher Levels:</span> ${spellInfo.upcastDescription}
                    </p>
                `: ''}
                
                ${spellInfo.classes? `
                    <span class="bold">Classes:</span> ${spellInfo.classes.map(clazz => String(clazz).charAt(0).toUpperCase() + String(clazz).slice(1).toLowerCase()).join(', ')}<br />
                `: ''}
                <span class="bold">url: </span><a href="https://dnd5e.wikidot.com/spell:${spellInfo.spellName.toLowerCase().replaceAll("'", '').replaceAll(/[ /]/g, '-')}" target="_blank">wikidot</a>
                
                ${spellInfo.spellLevel !== 0 ? `
                    <p>
                        ${isUnableToCast ? `
                            &#10060; Unable to cast spell, no more spell slots left
                            `: `
                            <label for="spellLevel" class="bold">Spell level: </label> <output id="spellLevelSelected"></output><br />
                            <input type="range" id="spellLevel" name="spellLevel" list="spellLevelsAvailable" min="${spellInfo.spellLevel}" max="${highestAvailableLevel}" value="${lowestAvailableLevel}"/>
                            
                            <datalist id="spellLevelsAvailable">
                                ${Object.entries(spellSlots).filter(([level, slots]) => lowestAvailableLevel <= level && highestAvailableLevel >= level).map(([level, slots]) => `
                                    <option  
                                        value="${level}" 
                                        label="${slots > usedSpellSlots[level] ? level : 'x'}"
                                        ${slots > usedSpellSlots[level] ? '' : 'disabled=disabled'}
                                        onclick="document.querySelector('popup-box').shadowRoot.querySelector('input[name=spellLevel]').value = ${level}"
                                        ></option>
                                `).join('')}
                            </datalist>
                        `}
                    </p>
                `: ''}
            `,
            mainAction: () => {
                const spellLevelSelected = document
                    .querySelector('popup-box')
                    .shadowRoot
                    .querySelector('input[name=spellLevel]')?.value;
                spellInfo.castSpell(spellLevelSelected);
                defaultCloseAction();
            }
        })
    }

    openEditPreparedSpellsPopup() {
        const highestSpellLevel = Object.entries(determineSpellSlots()).findLast(([level, slots]) => slots !== 0)[0];
        const allEligibleSpells = FULL_SPELL_LIST.filter(spell => (spell.isAlwaysPrepared || spell.classes.some(classes => dm.getAllCharacterLevels()[classes])) && spell.spellLevel <= highestSpellLevel);

        let spellLevelIteration = undefined;
        const mapping = [];
        openPopup({
            title: 'Edit prepared spells',
            content: `
                <style>
                    .spell-level-name{
                        font-weight: bold;
                        display: inline-block;
                        width: 100%;
                        text-transform: uppercase;
                        margin: 20px 0 10px 0;
                        font-size: 9px;
                    }
                    .spell-button{
                        margin-right: 10px;
                        display: inline-block;
                        text-align: center;
                        min-width: 125px;
                    }
                    ${buttonBoxes()}
                </style>
                <div>
                    ${allEligibleSpells.map(spell => {
                        let shouldListSpellLevel = false;
                        if(spellLevelIteration !== spell.spellLevel){
                            shouldListSpellLevel = true;
                            spellLevelIteration = spell.spellLevel;
                        }
                        
                        const elementId = `psb-${spell.spellName.replaceAll(' ', '')}`;
                        if(!spell.isAlwaysPrepared) {
                            mapping.push({id: elementId, funct: this.togglePrepareSpell.bind(this, spell)})
                        }
                
                        return`
                         ${shouldListSpellLevel ? `
                                    <div class="spell-level-name">-- ${SPELL_LEVEL.levelNames[spell.spellLevel]} --</div>
                        ` : ''}
                        <div id="${elementId}" class="button-box spell-button ${spell.isPrepared ? ' active': ''} ${spell.isAlwaysPrepared ? ' active disabled': ''}">
                            ${spell.spellName}
                        </div>
                    `}).join('')}
                </div>
            `,
            mainAction: () => {
                dm.persistCharacter();
                dm.triggerPreparedSpellsPublish()
                defaultCloseAction();
            }
        })

        bindOnClick(getOpenPopup(), mapping);
    }

    togglePrepareSpell(spellInfo){
        const preparableSpells = dm.getPreparedSpells().filter(spell => spell.spellLevel !== SPELL_LEVEL.CANTRIP && !spell.isAlwaysPrepared);
        // console.log(preparableSpells);
        if(spellInfo.spellLevel === SPELL_LEVEL.CANTRIP || spellInfo.isPrepared || preparableSpells.length < dm.getMaxAmountOfPreparedSpellAmount()){
            spellInfo.isPrepared = !spellInfo.isPrepared;
        }
        this.openEditPreparedSpellsPopup();
    }
}

customElements.define('prepared-spells', PreparedSpells);