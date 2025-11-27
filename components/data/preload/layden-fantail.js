import '../data-manager.js';
import {CharacterBuilder} from "../character/char-builder.js";
import {CLASSES} from "../enums/classes.js";
import {STATS} from "../enums/stats.js";
import {ALIGNMENTS} from "../enums/alignments.js";
import {SKILLS} from "../enums/skills.js";
import {RACES} from "../enums/races.js";
import {LeatherArmor} from "../equipment";

export const LaydenFantail = new CharacterBuilder()
    .setCharacterName('Layden Fantail')
    .setPlayerName('Arnout')
    .setRace(RACES.OWLIN)
    .setBackground('Feylost')
    .setAlignment(ALIGNMENTS.CHAOTIC_NEUTRAL)
    .setStat({stat: STATS.STRENGTH, value: 9})
    .setStat({stat: STATS.DEXTERITY, value: 16})
    .setStat({stat: STATS.CONSTITUTION, value: 14})
    .setStat({stat: STATS.INTELLIGENCE, value: 12})
    .setStat({stat: STATS.WISDOM, value: 14})
    .setStat({stat: STATS.CHARISMA, value: 18})
    .addLevel({clazz: CLASSES.BARD})
    .addLevel({clazz: CLASSES.BARD})
    .addLevel({clazz: CLASSES.BARD})
    .addLevel({clazz: CLASSES.BARD})
    .addLevel({clazz: CLASSES.BARD})
    .addLevel({clazz: CLASSES.BARD})
    .addLevel({clazz: CLASSES.BARD})
    .addLevel({clazz: CLASSES.CLERIC})
    .addProficiency(SKILLS.DECEPTION) // background: feylost
    .addProficiency(SKILLS.INSIGHT) // cleric - peace domain: implement of peace
    .addProficiency(SKILLS.STEALTH) //species: owlin
    .addProficiency(SKILLS.SURVIVAL) // background: feylost
    .addProficiency(SKILLS.INTIMIDATION) // bard
    .addProficiency(SKILLS.PERFORMANCE) // bard
    .addProficiency(SKILLS.PERSUASION) // bard
    .addProficiency(STATS.DEXTERITY)
    .addProficiency(STATS.CHARISMA)
    // .addFeat(new FeatLucky()
    .addEquipment(LeatherArmor.name)
