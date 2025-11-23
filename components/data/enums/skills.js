import {STATS} from "./stats.js";

export const SKILLS = {
    "ACROBATICS": "ACROBATICS",
    "ANIMAL_HANDLING": "ANIMAL_HANDLING",
    "ARCANA": "ARCANA",
    "ATHLETICS": "ATHLETICS",
    "DECEPTION": "DECEPTION",
    "HISTORY": "HISTORY",
    "INSIGHT": "INSIGHT",
    "INTIMIDATION": "INTIMIDATION",
    "INVESTIGATION": "INVESTIGATION",
    "MEDICINE": "MEDICINE",
    "NATURE": "NATURE",
    "PERCEPTION": "PERCEPTION",
    "PERFORMANCE": "PERFORMANCE",
    "PERSUASION": "PERSUASION",
    "RELIGION": "RELIGION",
    "SLEIGHT_OF_HAND": "SLEIGHT_OF_HAND",
    "STEALTH": "STEALTH",
    "SURVIVAL": "SURVIVAL",
}

const skillsPerStat = {
    [STATS.STRENGTH]: [
        SKILLS.ATHLETICS,
    ],
    [STATS.DEXTERITY]: [
        SKILLS.ACROBATICS,
        SKILLS.SLEIGHT_OF_HAND,
        SKILLS.STEALTH,
    ],
    [STATS.CONSTITUTION]: [

    ],
    [STATS.INTELLIGENCE]: [
        SKILLS.ARCANA,
        SKILLS.HISTORY,
        SKILLS.INVESTIGATION,
        SKILLS.NATURE,
        SKILLS.RELIGION,
    ],
    [STATS.WISDOM]: [
        SKILLS.ANIMAL_HANDLING,
        SKILLS.INSIGHT,
        SKILLS.MEDICINE,
        SKILLS.PERCEPTION,
        SKILLS.SURVIVAL,
    ],
    [STATS.CHARISMA]: [
        SKILLS.DECEPTION,
        SKILLS.INTIMIDATION,
        SKILLS.PERFORMANCE,
        SKILLS.PERSUASION,
    ],
}

export const getStatNameForSkill = (skillName) => {
    return Object.keys(skillsPerStat).find(stat => skillsPerStat[stat].includes(skillName));
}