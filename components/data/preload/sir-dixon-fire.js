import '../data-manager.js';
import {CharacterBuilder} from "../character/char-builder.js";
import {CLASSES} from "../enums/classes.js";
import {STATS} from "../enums/stats.js";
import {ALIGNMENTS} from "../enums/alignments.js";
import {SKILLS} from "../enums/skills.js";
import {FeatObservant, FeatResilient, FeatSkillExpert} from "./feat.js";
import {RACES} from "../enums/races.js";
import {IronLeafOakenShield, LeatherArmor, LuckStone, StaffOfBeekeeping} from "../equipment";

export const SirDixonFire = new CharacterBuilder()
    .setCharacterName('Sir Dixon Fire')
    .setPlayerName('Arnout')
    .setRace(RACES.HUMAN_VARIANT)
    .setBackground('Quartermaster(Soldier)')
    .setAlignment(ALIGNMENTS.CHAOTIC_NEUTRAL)
    .setStat({stat: STATS.STRENGTH, value: 14})
    .setStat({stat: STATS.DEXTERITY, value: 14})
    .setStat({stat: STATS.CONSTITUTION, value: 18})
    .setStat({stat: STATS.INTELLIGENCE, value: 10})
    .setStat({stat: STATS.WISDOM, value: 18})
    .setStat({stat: STATS.CHARISMA, value: 8})
    .addLevel({clazz: CLASSES.DRUID})
    .addLevel({clazz: CLASSES.DRUID})
    .addLevel({clazz: CLASSES.DRUID})
    .addLevel({clazz: CLASSES.DRUID})
    .addLevel({clazz: CLASSES.DRUID})
    .addLevel({clazz: CLASSES.DRUID})
    .addLevel({clazz: CLASSES.DRUID})
    .addLevel({clazz: CLASSES.DRUID})
    .addLevel({clazz: CLASSES.DRUID})
    .addLevel({clazz: CLASSES.DRUID})
    .addProficiency(SKILLS.ARCANA)
    .addProficiency(SKILLS.ATHLETICS)
    .addProficiency(SKILLS.INTIMIDATION)
    .addProficiency(SKILLS.NATURE)
    .addProficiency(STATS.WISDOM)
    .addProficiency(STATS.INTELLIGENCE)
    .addFeat({name: 'FeatObservant', params: {asi: STATS.WISDOM}})
    .addFeat({name: 'FeatSkillExpert', params: {asi: STATS.WISDOM, proficiencySkill: SKILLS.PERSUASION, expertiseSkill: SKILLS.PERCEPTION}})
    .addFeat({name: 'FeatResilient', params: {asi: STATS.CONSTITUTION}})
    .addEquipment(LuckStone.name)
    .addEquipment(IronLeafOakenShield.name)
    .addEquipment(LeatherArmor.name)
    .addEquipment(StaffOfBeekeeping.name);