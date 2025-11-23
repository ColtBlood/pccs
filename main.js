import './components/gui/console.js';
import './components/data/storage/data-store.js'
import './components/dice/dice-roller.js';
import './components/data/data-manager.js';
import './components/gui/menu.js';
import './components/gui/hud.js';
import './components/popup/popup-manager.js';


import {SirDixonFire} from "./components/data/preload/sir-dixon-fire.js";
import {Enhancer} from "./components/data/enhancements/enhancer.js";
import {BaseVantage} from "./components/data/preload/base-mechanics.js";


class PccsApp extends HTMLElement{
    connectedCallback() {
        window.pccs = {};
        ds.onReady(() => {
            ds.loadCharacter('Sir Dixon Fire', (storedChar) => {
                console.log('stored char', storedChar);
                if (storedChar?.baseChar) {
                    dm.deserialize(storedChar);
                } else {
                    dm.loadCharacter(SirDixonFire);
                    dm.persistCharacter();
                }
                Enhancer.getInstance().registerEnhancer(new BaseVantage());

                this.innerHTML = `
                    <style>
                        .main-hud{
                            display:flex;
                        }
                        .footer{
                            position: fixed;
                            display: block;
                            bottom: 20%;
                            background-color: white;
                        }
                        .menu{
                            position: fixed;
                            background-color: white;
                            height: 80%;
                            z-index: 999;
                        }
                        .content{
                            padding-left: 40px;
                            padding-top: 10px
                        }
                    </style>
                    <div class="main-hud">
                        <pccs-menu class="menu"></pccs-menu>
                        <pccs-hud class="content"></pccs-hud>
                    </div>
                    <div class="footer">
                        <pccs-console></pccs-console>
                    </div>
                `;
            });
        });
    }
}

customElements.define('pccs-app', PccsApp);