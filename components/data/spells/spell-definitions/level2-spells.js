import {BaseSpell, COMPONENTS, DURATION, RANGE, SPELL_LEVEL} from "../base-spell.js";
import {CLASSES} from "../../enums/classes.js";


export class SpellSpikeGrowth extends BaseSpell{
    constructor() {
        super({
            spellName: "Spike Growth",
            description: `
            The ground in a 20-foot radius centered on a point within range twists and sprouts hard spikes and thorns. The area becomes difficult terrain for the duration. When a creature moves into or within the area, it takes 2d4 piercing damage for every 5 feet it travels.<br />
<br />
The transformation of the ground is camouflaged to look natural. Any creature that can’t see the area at the time the spell is cast must make a Wisdom (Perception) check against your spell save DC to recognize the terrain as hazardous before entering it.<br />
            `,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            componentMaterial: 'seven sharp thorns or seven small twigs, each sharpened to a point',
            classes: [CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.FEET150,
            concentration: true,
            duration: DURATION.MINUTES10,
        });
    }
}

export class SpellGustOfWind extends BaseSpell{
    constructor() {
        super({
            spellName: "Gust of Wind",
            description: `
            A line of strong wind 60 feet long and 10 feet wide blasts from you in a direction you choose for the spell’s duration. Each creature that starts its turn in the line must succeed on a Strength saving throw or be pushed 15 feet away from you in a direction following the line.<br />
<br />
Any creature in the line must spend 2 feet of movement for every 1 foot it moves when moving closer to you.<br />
<br />
The gust disperses gas or vapor, and it extinguishes candles, torches, and similar unprotected flames in the area. It causes protected flames, such as those of lanterns, to dance wildly and has a 50 percent chance to extinguish them.<br />
<br />
As a bonus action on each of your turns before the spell ends, you can change the direction in which the line blasts from you.<br />
            `,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            componentMaterial: 'a legume seed',
            classes: [CLASSES.DRUID, CLASSES.RANGER, CLASSES.SORCERER, CLASSES.WIZARD],
            range: `${RANGE.SELF} (60-foot line)`,
            concentration: true,
            duration: DURATION.ONE_MINUTE,
        });
    }
}

export class SpellMoonbeam extends BaseSpell{
    constructor() {
        super({
            spellName: "Moonbeam",
            description: `A silvery beam of pale light shines down in a 5-foot radius, 40-foot-high cylinder centered on a point within range. Until the spell ends, dim light fills the cylinder.<br />
<br />
When a creature enters the spell’s area for the first time on a turn or starts its turn there, it is engulfed in ghostly flames that cause searing pain, and it must make a Constitution saving throw. It takes 2d10 radiant damage on a failed save, or half as much damage on a successful one.<br />
<br />
A shapechanger makes its saving throw with disadvantage. If it fails, it also instantly reverts to its original form and can’t assume a different form until it leaves the spell’s light.<br />
<br />
On each of your turns after you cast this spell, you can use an action to move the beam up to 60 feet in any direction.<br />
            `,
            upcastDescription: 'When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d10 for each slot level above 2nd.',
            spellLevel: SPELL_LEVEL.LEVEL_2,
            componentMaterial: 'several seeds of any moonseed plant and a piece of opalescent feldspar',
            classes: [CLASSES.DRUID],
            range: RANGE.FEET120,
            concentration: true,
            duration: DURATION.ONE_MINUTE,
        });
    }
    castSpell(spellLevel = this.spellLevel) {
        super.castGenericSpellMechanics({
            spellLevel,
            diceType: 10,
            baseDiceAmount: 2,
        });
    }
}

export class SpellLesserRestoration extends BaseSpell{
    constructor() {
        super({
            spellName: "Lesser Restoration",
            description: `
You touch a creature and can end either one disease or one condition afflicting it. The condition can be blinded, deafened, paralyzed, or poisoned.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VS(),
            classes: [CLASSES.ARTIFICER, CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.PALADIN, CLASSES.RANGER],
        });
    }
}

export class SpellHoldPerson extends BaseSpell{
    constructor() {
        super({
            spellName: "Hold Person",
            description: `
Choose a humanoid that you can see within range. The target must succeed on a Wisdom saving throw or be paralyzed for the duration. At the end of each of its turns, the target can make another Wisdom saving throw. On a success, the spell ends on the target.
            `,
            upcastDescription: 'When you cast this spell using a spell slot of 3rd level or higher, you can target one additional humanoid for each slot level above 2nd. The humanoids must be within 30 feet of each other when you target them.',
            spellLevel: SPELL_LEVEL.LEVEL_2,
            componentMaterial: 'a small, straight piece of iron',
            classes: [CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WARLOCK, CLASSES.WIZARD],
            range: RANGE.FEET60,
            concentration: true,
            duration: DURATION.ONE_MINUTE,
        });
    }
}

export class SpellBlindnessDeafness extends BaseSpell{
    constructor() {
        super({
            spellName: "Blindness/Deafness",
            description: `
            You can blind or deafen a foe. Choose one creature that you can see within range to make a Constitution saving throw. If it fails, the target is either blinded or deafened (your choice) for the duration. At the end of each of its turns, the target can make a Constitution saving throw. On a success, the spell ends.
            `,
            upcastDescription:`When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.`,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: [COMPONENTS.VERBAL],
            classes: [CLASSES.BARD, CLASSES.CLERIC, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET30,
            duration: DURATION.ONE_MINUTE,
        });
    }
}

export class SpellGentleRepose extends BaseSpell{
    constructor() {
        super({
            spellName: "Gentle Repose",
            description: `
            You touch a corpse or other remains. For the duration, the target is protected from decay and can’t become undead.<br />
<br />
The spell also effectively extends the time limit on raising the target from the dead, since days spent under the influence of this spell don’t count against the time limit of spells such as raise dead.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            componentMaterial: 'a pinch of salt and one copper piece placed on each of the corpse’s eyes, which must remain there for the duration',
            classes: [CLASSES.CLERIC, CLASSES.WIZARD],
            duration: DURATION.DAYS10,
            isRitual: true,
        });
    }
}

export class SpellHealingSpirit extends BaseSpell{
    constructor() {
        super({
            spellName: "Healing Spirit",
            description: `
You call forth a nature spirit to soothe the wounded. The intangible spirit appears in a space that is a 5-foot cube you can see within range. The spirit looks like a transparent beast or fey (your choice).<br />
<br />
Until the spell ends, whenever you or a creature you can see moves into the spirit's space for the first time on a turn or starts its turn there, you can cause the spirit to restore 1d6 hit points to that creature (no action required). The spirit can’t heal constructs or undead.<br />
<br />
As a bonus action on your turn, you can move the Spirit up to 30 feet to a space you can see. The spirit can heal a number of times equal to 1 + your spellcasting ability modifier (minimum of twice). After healing that number of times, the spirit disappears.<br />
            `,
            upcastDescription: `When you cast this spell using a spell slot of 3rd level or higher, the healing increases 1d6 for each slot level above 2nd.`,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.FEET60,
            concentration: true,
            duration: DURATION.ONE_MINUTE,
        });
    }
}