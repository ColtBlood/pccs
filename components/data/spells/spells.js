import * as CANTRIPS from './spell-definitions/cantrips.js';
import * as LEVEL1_SPELLS from './spell-definitions/level1-spells.js';
import * as LEVEL2_SPELLS from './spell-definitions/level2-spells.js';
import * as LEVEL3_SPELLS from './spell-definitions/level3-spells.js';
import * as LEVEL4_SPELLS from './spell-definitions/level4-spells.js';
import * as LEVEL5_SPELLS from './spell-definitions/level5-spells.js';
import * as LEVEL6_SPELLS from './spell-definitions/level6-spells.js';

export const FULL_SPELL_LIST = [
    ...Object.entries(CANTRIPS).map(arr => new arr[1]()),
    ...Object.entries(LEVEL1_SPELLS).map(arr => new arr[1]()),
    ...Object.entries(LEVEL2_SPELLS).map(arr => new arr[1]()),
    ...Object.entries(LEVEL3_SPELLS).map(arr => new arr[1]()),
    ...Object.entries(LEVEL4_SPELLS).map(arr => new arr[1]()),
    ...Object.entries(LEVEL5_SPELLS).map(arr => new arr[1]()),
    ...Object.entries(LEVEL6_SPELLS).map(arr => new arr[1]()),
];

// Sort by spell level, then alphabetically by name

FULL_SPELL_LIST.sort((spell, otherSpell) => {
    const sorting = spell.spellLevel - otherSpell.spellLevel
    if(sorting === 0){
        return spell.spellName.localeCompare(otherSpell.spellName)
    }
    return sorting;
});
