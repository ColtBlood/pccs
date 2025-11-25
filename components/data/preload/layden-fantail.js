import '../data-manager.js';
import {CharacterBuilder} from "../character/char-builder.js";
import {CLASSES, SkillUnarmoredDefense} from "../enums/classes.js";
import {STATS} from "../enums/stats.js";
import {ALIGNMENTS} from "../enums/alignments.js";
import {SKILLS} from "../enums/skills.js";
// import {ItemIronLeafOakenShield, ItemLuckStone} from "./equipment.js";
import {FeatObservant, FeatResilient, FeatSkillExpert} from "./feat.js";
import {RACES} from "../enums/races.js";
import {IronLeafOakenShield, LeatherArmor, LuckStone, StaffOfBeekeeping} from "../equipment";

export const LaydenFantail = new CharacterBuilder()
    .setCharacterName('Layden Fantail')
    .setPlayerName('Arnout')
    .setRace(RACES.OWLIN)
    .setBackground('Quartermaster(Soldier)')
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
    .addProficiency(SKILLS.INTIMIDATION)
    .addProficiency(SKILLS.PERFORMANCE)
    .addProficiency(SKILLS.PERSUASION)
    .addProficiency(SKILLS.STEALTH)
    .addProficiency(SKILLS.SURVIVAL) // background: feylost
    .addProficiency(STATS.DEXTERITY)
    .addProficiency(STATS.CHARISMA)
    // .addFeat(new FeatObservant({asi: STATS.WISDOM}))
    // .addFeat(new FeatSkillExpert({asi: STATS.CHARISMA, proficiencySkill: SKILLS.INTIMIDATION, expertiseSkill: SKILLS.PERCEPTION}))
    // .addFeat(new FeatResilient({asi: STATS.CONSTITUTION}))
    // .addEquipment(LuckStone.name)
    // .addEquipment(IronLeafOakenShield.name)
    // .addEquipment(LeatherArmor.name)
    // .addEquipment(StaffOfBeekeeping.name)
    .build();

