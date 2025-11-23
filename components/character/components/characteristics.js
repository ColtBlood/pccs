import {greyBackground, greyLine, greyLineHint, mediumLetters, smallLetters} from "../../style/basics.js";

class Characteristics extends HTMLElement{
    connectedCallback(){
        const charLevelString = Object.entries(dm.getAllCharacterLevels())
            .map(([clazz, level]) => ` ${clazz}(${level})`)

        this.innerHTML = `
        <style>
            .char-block{
                display:flex;
            }
            .name-block{
                background-color: ${greyBackground()};
                border-radius: 15px;
                border: 1px solid ${greyLine()};
                padding: 10px 75px 10px 30px;
                margin-top: auto;
                margin-bottom: auto;
                ${mediumLetters()}
            }
            .char-name{
                background-color: white;
                border-radius: 5px;
                padding: 5px;
                width: 150px;
                ${mediumLetters()}
            }
            .char-details{
                background-color: white;
                border-radius: 15px;
                border: 1px solid ${greyLine()};
                margin-left: -20px;
                height: 100px;
                width: 400px;
                padding: 5px 10px;
                display:flex;
                flex-wrap: wrap;
                align-items: center;
                
            }
            .alignment{
                text-transform: capitalize;
            }
            .row{
                display:flex;
                justify-content: space-around;
                flex-grow: 1;
                gap:10px;
            }
            .char-detail-block{
                width: 125px
            }
            .char-val{
                border-bottom: 1px solid ${greyLineHint()};
                ${mediumLetters()}
            }
            .char-key{
                text-transform: uppercase;
                ${smallLetters()}
            }
        </style>
        <div class="char-block">
            <div class="name-block">
                <div class="char-name">${dm.getCharacterName()}</div>
                <div class="char-key">character name</div>    
            </div>
            <div class="char-details">
                <div class="row">
                    <div class="char-detail-block">
                        <div class="char-val">${charLevelString}</div>
                        <div class="char-key">CLASS &amp; LEVEL</div>
                    </div>
                    <div class="char-detail-block">
                        <div class="char-val">${dm.getBackground()}</div>
                        <div class="char-key">background</div>
                    </div>
                    <div class="char-detail-block">
                        <div class="char-val">${dm.getPlayerName()}</div>
                        <div class="char-key">player name</div>
                    </div>
                </div>
                <div class="row">
                    <div class="char-detail-block">
                        <div class="char-val">${dm.getRace()}</div>
                        <div class="char-key">race</div>
                    </div>
                    <div class="char-detail-block">
                        <div class="char-val alignment">${dm.getAlignment().replaceAll('_', ' ').toLowerCase()}</div>
                        <div class="char-key">alignment</div>
                    </div>
                    <div class="char-detail-block">
                        <div class="char-val">${dm.getExperiencePoints()}</div>
                        <div class="char-key">experience points</div>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}

customElements.define('dnd-characteristics', Characteristics);