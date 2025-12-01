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

export class SpellAbsorbElements extends BaseSpell {
    constructor() {
        super({
            spellName: "Absorb Elements",
            description: `The spell captures some of the incoming energy, lessening its effect on you and storing it for your next melee attack. You have resistance to the triggering damage type until the start of your next turn. Also, the first time you hit with a melee attack on your next turn, the target takes an extra 1d6 damage of the triggering type, and the spell ends.`,
            upcastDescription: `When you cast this spell using a spell slot of 2nd level or higher, the extra damage increases by 1d6 for each slot level above 1st.`,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.S(),
            duration: DURATION.ONE_ROUND,
            classes: [CLASSES.DRUID, CLASSES.RANGER, CLASSES.SORCERER, CLASSES.WIZARD],
        });
    }
}

export class SpellAnimalFriendship extends BaseSpell {
    constructor() {
        super({
            spellName: "Animal Friendship",
            description: `This spell lets you convince a beast that you mean it no harm. Choose a beast that you can see within range. It must see and hear you. If the beast’s Intelligence is 4 or higher, the spell fails. Otherwise, the beast must succeed on a Wisdom saving throw or be charmed by you for the spell’s duration. If you or one of your companions harms the target, the spell ends.`,
            upcastDescription: `When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional beast for each slot level above 1st.`,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a morsel of food',
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.FEET30,
            duration: DURATION.HOURS24,
        });
    }
}

export class SpellCharmPerson extends BaseSpell {
    constructor() {
        super({
            spellName: "Charm Person",
            description: `You attempt to charm a humanoid you can see within range. It must make a Wisdom saving throw, and does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is charmed by you until the spell ends or until you or your companions do anything harmful to it. The charmed creature regards you as a friendly acquaintance. When the spell ends, the creature knows it was charmed by you.`,
            upcastDescription: `When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.`,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.VS(),
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WARLOCK, CLASSES.WIZARD],
            range: RANGE.FEET30,
            duration: DURATION.ONE_HOUR,
        });
    }
}

export class SpellCreateOrDestroyWater extends BaseSpell {
    constructor() {
        super({
            spellName: "Create or Destroy Water",
            description: `
            You either create or destroy water.
<br />
<br /><span class="bold">Create Water.</span> You create up to 10 gallons of clean water within range in an open container. Alternatively, the water falls as rain in a 30-foot cube within range, extinguishing exposed flames in the area.
<br />
<br /><span class="bold">Destroy Water.</span> You destroy up to 10 gallons of water in an open container within range. Alternatively, you destroy fog in a 30-foot cube within range.
            `,
            upcastDescription: `When you cast this spell using a spell slot of 2nd level or higher, you create or destroy 10 additional gallons of water, or the size of the cube increases by 5 feet, for each slot level above 1st.`,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.VSM(),
            componentMaterial: `'a drop of water if creating water or a few grains of sand if destroying it'`,
            classes: [CLASSES.CLERIC, CLASSES.DRUID],
            range: RANGE.FEET30,
            duration: DURATION.INSTANTANEOUS,
        });
    }
}

export class SpellEntangle extends BaseSpell {
    constructor() {
        super({
            spellName: "Entangle",
            description: `
            Grasping weeds and vines sprout from the ground in a 20-foot square starting from a point within range. For the duration, these plants turn the ground in the area into difficult terrain.
<br />
<br />A creature in the area when you cast the spell must succeed on a Strength saving throw or be restrained by the entangling plants until the spell ends. A creature restrained by the plants can use its action to make a Strength check against your spell save DC. On a success, it frees itself.
<br />
<br />When the spell ends, the conjured plants wilt away.


            `,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID],
            range: RANGE.FEET90,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}

export class SpellFaerieFire extends BaseSpell {
    constructor() {
        super({
            spellName: "Faerie Fire",
            description: `
            Each object in a 20-foot cube within range is outlined in blue, green, or violet light (your choice).
<br />
<br />Any creature in the area when the spell is cast is also outlined in light if it fails a Dexterity saving throw. For the duration, objects and affected creatures shed dim light in a 10-foot radius.
<br />
<br />Any attack roll against an affected creature or object has advantage if the attacker can see it, and the affected creature or object can’t benefit from being invisible.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.V(),
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.ARTIFICER],
            range: RANGE.FEET60,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}

export class SpellFogCloud extends BaseSpell {
    constructor() {
        super({
            spellName: "Fog Cloud",
            description: `You create a 20-foot-radius sphere of fog centered on a point within range. The sphere spreads around corners, and its area is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.`,
            upcastDescription: 'When you cast this spell using a spell slot of 2nd level or higher, the radius of the fog increases by 20 feet for each slot level above 1st.',
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a bit of fleece',
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET120,
            duration: DURATION.ONE_HOUR,
            concentration: true,
        });
    }
}

export class SpellJump extends BaseSpell {
    constructor() {
        super({
            spellName: "Jump",
            description: `You touch a creature. The creature’s jump distance is tripled until the spell ends.`,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a grasshopper’s hind leg',
            classes: [CLASSES.DRUID, CLASSES.RANGER, CLASSES.SORCERER, CLASSES.WIZARD, CLASSES.ARTIFICER],
            range: RANGE.TOUCH,
            duration: DURATION.ONE_MINUTE,
        });
    }
}

export class SpellLongstrider extends BaseSpell {
    constructor() {
        super({
            spellName: "Longstrider",
            description: `You touch a creature. The target’s speed increases by 10 feet until the spell ends.`,
            upcastDescription: 'When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.',
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a pinch of dirt',
            classes: [CLASSES.DRUID, CLASSES.RANGER, CLASSES.WIZARD, CLASSES.ARTIFICER, CLASSES.BARD],
            range: RANGE.TOUCH,
            duration: DURATION.ONE_HOUR,
        });
    }
}

export class SpellPurifyFoodAndDrink extends BaseSpell {
    constructor() {
        super({
            spellName: "Purify Food and Drink",
            description: `All nonmagical food and drink within a 5-foot radius sphere centered on a point of your choice within range is purified and rendered free of poison and disease.`,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.VS(),
            classes: [CLASSES.CLERIC, CLASSES.DRUID, CLASSES.PALADIN, CLASSES.ARTIFICER],
            range: RANGE.FEET10,
            duration: DURATION.INSTANTANEOUS,
        });
    }
}

export class SpellThunderwave extends BaseSpell {
    constructor() {
        super({
            spellName: "Thunderwave",
            description: `
            A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much damage and isn’t pushed.
<br />
<br />In addition, unsecured objects that are completely within the area of effect are automatically pushed 10 feet away from you by the spell’s effect, and the spell emits a thunderous boom audible out to 300 feet.
            `,
            upcastDescription: 'When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.',
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.VS(),
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: `${RANGE.SELF} (15-foot cube)`,
            duration: DURATION.INSTANTANEOUS,
        });
    }
}

export class SpellSnare extends BaseSpell {
    constructor() {
        super({
            spellName: "Snare",
            description: `
            As you cast this spell, you use the rope to create a circle with a 5-foot radius on the ground or the floor. When you finish casting, the rope disappears and the circle becomes a magic trap.
<br />
<br />This trap is nearly invisible, requiring a successful Intelligence (Investigation) check against your spell save DC to be discerned.
<br />
<br />The trap triggers when a Small, Medium, or Large creature moves onto the ground or the floor in the spell’s radius. That creature must succeed on a Dexterity saving throw or be magically hoisted into the air, leaving it hanging upside down 3 feet above the ground or the floor. The creature is restrained there until the spell ends.
<br />
<br />A restrained creature can make a Dexterity saving throw at the end of each of its turns, ending the effect on itself on a success. Alternatively, the creature or someone else who can reach it can use an action to make an Intelligence (Arcana) check against your spell save DC. On a success, the restrained effect ends.
<br />
<br />After the trap is triggered, the spell ends when no creature is restrained by it.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.SM(),
            componentMaterial: '25 feet of rope, which the spell consumes',
            classes: [CLASSES.ARTIFICER, CLASSES.DRUID, CLASSES.RANGER, CLASSES.WIZARD],
            range: RANGE.TOUCH,
            duration: DURATION.HOURS8,
            castingTime: CAST_TIME.MINUTE1,
        });
    }
}

export class SpellEarthTremor extends BaseSpell {
    constructor() {
        super({
            spellName: "Earth Tremor",
            description: `You cause a tremor in the ground in a 10-foot radius. Each creature other than you in that area must make a Dexterity saving throw. On a failed save, a creature takes 1d6 bludgeoning damage and is knocked prone. If the ground in that area is loose earth or stone, it becomes difficult terrain until cleared.`,
            upcastDescription: `When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.`,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.VS(),
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: `${RANGE.SELF} (10-foot radius)`,
            duration: DURATION.INSTANTANEOUS,
        });
    }
}

export class SpellDetectPoisonAndDisease extends BaseSpell {
    constructor() {
        super({
            spellName: "Detect Poison and Disease",
            description: `
            For the duration, you can sense the presence and location of poisons, poisonous creatures, and diseases within 30 feet of you. You also identify the kind of poison, poisonous creature, or disease in each case.
<br />
<br />The spell can penetrate most barriers, but is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.`,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a yew leaf',
            classes: [CLASSES.CLERIC, CLASSES.DRUID, CLASSES.PALADIN, CLASSES.RANGER],
            range: RANGE.SELF,
            duration: DURATION.MINUTES10,
            concentration: true,
            isRitual: true,
        });
    }
}

export class SpellIceKnife extends BaseSpell {
    constructor() {
        super({
            spellName: "Ice Knife",
            description: `
You create a shard of ice and fling it at one creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 piercing damage. Hit or miss, the shard then explodes. The target and each creature within 5 feet of the point where the ice exploded must succeed on a Dexterity saving throw or take 2d6 cold damage.
            `,
            upcastDescription: `When you cast this spell using a spell slot of 2nd level or higher, the cold damage increases by 1d6 for each slot level above 1st.`,
            spellLevel: SPELL_LEVEL.LEVEL_1,
            components: COMPONENTS.SM(),
            componentMaterial: 'a drop of water or piece of ice',
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET60,
            duration: DURATION.INSTANTANEOUS,
        });
    }
}
