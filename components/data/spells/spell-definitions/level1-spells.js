import {BaseSpell, CAST_TIME, COMPONENTS, DURATION, RANGE, SPELL_LEVEL} from "../base-spell.js";
import {CLASSES} from "../../enums/classes.js";

export class SpellDetectMagic extends BaseSpell{
    constructor() {
        super({
            spellName: "Detect Magic",
            description: `
            For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any.<br />
<br />
The spell can penetrate most barriers, but is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.<br />
            `,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            isRitual: true,
            components: COMPONENTS.VS(),
            classes: [CLASSES.ARTIFICER, CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.PALADIN, CLASSES.RANGER, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.SELF,
            concentration: true,
            duration: DURATION.MINUTES10,
        });
    }
}

export class SpellBeastBond extends BaseSpell{
    constructor() {
        super({
            spellName: "Beast Bond",
            description: `
            You establish a telepathic link with one beast you touch that is friendly to you or charmed by you. The spell fails if the beast’s Intelligence is 4 or higher. Until the spell ends, the link is active while you and the beast are within line of sight of each other. Through the link, the beast can understand your telepathic messages to it, and it can telepathically communicate simple emotions and concepts back to you. While the link is active, the beast gains advantage on attack rolls against any creature within 5 feet of you that you can see.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            isRitual: true,
            componentMaterial: 'a bit of fur wrapped in cloth',
            classes: [CLASSES.DRUID, CLASSES.RANGER],
            concentration: true,
            duration: DURATION.MINUTES10,
        });
    }
}

export class SpellCureWounds extends BaseSpell{
    constructor() {
        super({
            spellName: "Cure Wounds",
            description: `
A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.
            `,
            upcastDescription: `When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st.`,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.VS(),
            classes: [CLASSES.ARTIFICER, CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.PALADIN, CLASSES.RANGER],
        });
    }
}

export class SpellGoodberry extends BaseSpell{
    constructor() {
        super({
            spellName: "Goodberry",
            description: `
Up to ten berries appear in your hand and are infused with magic for the duration. A creature can use its action to eat one berry. Eating a berry restores 1 hit point, and the berry provides enough nourishment to sustain a creature for one day.<br />
<br />
The berries lose their potency if they have not been consumed within 24 hours of the casting of this spell.<br />
            `,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            componentMaterial: 'a spring of mistletoe',
            classes: [CLASSES.DRUID, CLASSES.RANGER],
        });
    }
}

export class SpellHealingWord extends BaseSpell{
    constructor() {
        super({
            spellName: "Healing Word",
            description: `
A creature of your choice that you can see within range regains hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs.
            `,
            upcastDescription: `When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d4 for each slot level above 1st.`,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: [COMPONENTS.VERBAL],
            classes: [CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID],
            range: RANGE.FEET60,
        });
    }
}

export class SpellSpeakWithAnimals extends BaseSpell{
    constructor() {
        super({
            spellName: "Speak with Animals",
            description: `
You gain the ability to comprehend and verbally communicate with beasts for the duration. The knowledge and awareness of many beasts is limited by their intelligence, but at minimum, beasts can give you information about nearby locations and monsters, including whatever they can perceive or have perceived within the past day. You might be able to persuade a beast to perform a small favor for you, at the DM’s discretion.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.VS(),
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.SELF,
            duration: DURATION.MINUTES10,
            isRitual: true,
        });
    }
}

export class SpellSilveryBarbs extends BaseSpell{
    constructor() {
        super({
            spellName: "Silvery Barbs",
            description: `
            You magically distract the triggering creature and turn its momentary uncertainty into encouragement for another creature. The triggering creature must reroll the d20 and use the lower roll.

You can then choose a different creature you can see within range (you can choose yourself). The chosen creature has advantage on the next attack roll, ability check, or saving throw it makes within 1 minute. A creature can be empowered by only one use of this spell at a time.
            `,
            castingTime: `${CAST_TIME.REACTION}, which you take when a creature you can see within 60 feet of yourself succeeds on an attack roll, an ability check, or a saving throw`,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: [COMPONENTS.VERBAL],
            classes: [CLASSES.BARD, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET60,
        });
    }
}
