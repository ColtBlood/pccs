import {BaseSpell, COMPONENTS, DURATION, RANGE, SPELL_LEVEL} from "../base-spell.js";
import {CLASSES} from "../../enums/classes.js";

export class SpellAnimateDead extends BaseSpell{
    constructor() {
        super({
            spellName: "Animate Dead",
            description: `
            This spell creates an undead servant. Choose a pile of bones or a corpse of a Medium or Small humanoid within range. Your spell imbues the target with a foul mimicry of life, raising it as an undead creature. The target becomes a skeleton if you chose bones or a zombie if you chose a corpse (the DM has the creature’s game statistics).<br />
<br />
On each of your turns, you can use a bonus action to mentally command any creature you made with this spell if the creature is within 60 feet of you (if you control multiple creatures, you can command any or all of them at the same time, issuing the same command to each one). You decide what action the creature will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the creature only defends itself against hostile creatures. Once given an order, the creature continues to follow it until its task is complete.<br />
<br />
The creature is under your control for 24 hours, after which it stops obeying any command you’ve given it. To maintain the control of the creature for another 24 hours, you must cast this spell on the creature again before the current 24-hour period ends. This use of the spell reasserts your control over up to four creatures you have animated with this spell, rather than animating a new one.
            `,
            upcastDescription: `When you cast this spell using a spell slot of 4th level or higher, you animate or reassert control over two additional undead creatures for each slot level above 3rd. Each of the creatures must come from a different corpse or pile of bones.`,
            castingTime: DURATION.ONE_MINUTE,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            componentMaterial: 'a drop of blood, a piece of flesh, and a pinch of bone dust',
            classes: [CLASSES.CLERIC, CLASSES.WIZARD],
            range: RANGE.FEET10,
        });
    }
}

export class SpellCallLightning extends BaseSpell{
    constructor() {
        super({
            spellName: "Call Lightning",
            description: `
            A storm cloud appears in the shape of a cylinder that is 10 feet tall with a 60-foot radius, centered on a point you can see within range directly above you. The spell fails if you can’t see a point in the air where the storm cloud could appear (for example, if you are in a room that can’t accommodate the cloud).<br />
<br />
When you cast the spell, choose a point you can see under the cloud. A bolt of lightning flashes down from the cloud to that point. Each creature within 5 feet of that point must make a Dexterity saving throw. A creature takes 3d10 lightning damage on a failed save, or half as much damage on a successful one. On each of your turns until the spell ends, you can use your action to call down lightning in this way again, targeting the same point or a different one.<br />
<br />
If you are outdoors in stormy conditions when you cast this spell, the spell gives you control over the existing storm instead of creating a new one. Under such conditions, the spell’s damage increases by 1d10.<br />
            `,
            upcastDescription: `When you cast this spell using a spell slot of 4th or higher level, the damage increases by 1d10 for each slot level above 3rd.`,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID],
            range: RANGE.FEET120,
            duration: DURATION.MINUTES10,
            concentration: true,
        });
    }
}

export class SpellDaylight extends BaseSpell{
    constructor() {
        super({
            spellName: "Daylight",
            description: `
            A 60-foot-radius sphere of light spreads out from a point you choose within range. The sphere is bright light and sheds dim light for an additional 60 feet.<br />
<br />
If you chose a point on an object you are holding or one that isn’t being worn or carried, the light shines from the object with and moves with it. Completely covering the affected object with an opaque object, such as a bowl or a helm, blocks the light.<br />
<br />
If any of this spell’s area overlaps with an area of darkness created by a spell of 3rd level or lower, the spell that created the darkness is dispelled.<br />
            `,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            range: RANGE.FEET60,
            components: COMPONENTS.VS(),
            duration: DURATION.ONE_HOUR,
            classes: [CLASSES.CLERIC, CLASSES.DRUID, CLASSES.PALADIN, CLASSES.RANGER, CLASSES.SORCERER],
        });
    }
}

export class SpellConjureAnimals extends BaseSpell{
    constructor() {
        super({
            spellName: "Conjure Animals",
            description: `
            You summon fey spirits that take the form of beasts and appear in unoccupied spaces that you can see within range.<br />
<br />
Choose one of the following options for what appears:<br />
<br />
<li>One beast of challenge rating 2 or lower</li>
<li>Two beasts of challenge rating 1 or lower</li>
<li>Four beasts of challenge rating 1/2 or lower</li>
<li>Eight beasts of challenge rating 1/4 or lower</li>
Each beast is also considered fey, and it disappears when it drops to 0 hit points or when the spell ends.<br />
<br />
The summoned creatures are friendly to you and your companions. Roll initiative for the summoned creatures as a group, which has its own turns. They obey any verbal commands that you issue to them (no action required by you). If you don’t issue any commands to them, they defend themselves from hostile creatures, but otherwise take no actions. The DM has the creatures’ statistics.<br />
            `,
            upcastDescription: 'When you cast this spell using certain higher-level spell slots, you choose one of the summoning options above, and more creatures appear: twice as many with a 5th-level slot, three times as many with a 7th-level slot, and four times as many with a 9th-level slot.',
            spellLevel: SPELL_LEVEL.LEVEL_3,
            range: RANGE.FEET60,
            components: COMPONENTS.VS(),
            concentration: true,
            duration: DURATION.ONE_HOUR,
            classes: [CLASSES.CLERIC, CLASSES.RANGER],
        });
    }
}

export class SpellGaseousForm extends BaseSpell{
    constructor() {
        super({
            spellName: "Gaseous Form",
            description: `
You transform a willing creature you touch, along with everything it’s wearing and carrying, into a misty cloud for the duration. The spell ends if the creature drops to 0 hit points. An incorporeal creature isn’t affected.<br />
<br />
While in this form, the target’s only method of movement is a flying speed of 10 feet. The target can enter and occupy the space of another creature. The target has resistance to nonmagical damage, and it has advantage on Strength, Dexterity, and Constitution saving throws. The target can pass through small holes, narrow openings, and even mere cracks, though it treats liquids as though they were solid surfaces. The target can’t fall and remains hovering in the air even when stunned or otherwise incapacitated.<br />
<br />
While in the form of a misty cloud, the target can’t talk or manipulate objects, and any objects it was carrying or holding can’t be dropped, used, or otherwise interacted with. The target can’t attack or cast spells.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            componentMaterial: 'a bit of gauze and a wisp of smoke',
            concentration: true,
            classes: [CLASSES.SORCERER, CLASSES.WARLOCK, CLASSES.WIZARD],
            duration: DURATION.ONE_HOUR,
        });
    }
}

export class SpellDispelMagic extends BaseSpell{
    constructor() {
        super({
            spellName: "Dispel Magic",
            description: `
Choose any creature, object, or magical effect within range. Any spell of 3rd level or lower on the target ends. For each spell of 4th level or higher on the target, make an ability check using your spellcasting ability. The DC equals 10 + the spell's level. On a successful check, the spell ends.
            `,
            upcastDescription: `When you cast this spell using a spell slot of 4th level or higher, you automatically end the effects of a spell on the target if the spell's level is equal to or less than the level of the spell slot you used.`,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            components: COMPONENTS.VS(),
            classes: [CLASSES.ARTIFICER, CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.PALADIN, CLASSES.SORCERER, CLASSES.WARLOCK, CLASSES.WIZARD],
            range: RANGE.FEET120,
        });
    }
}

export class SpellRevivify extends BaseSpell{
    constructor() {
        super({
            spellName: "Revivify",
            description: `
You touch a creature that has died within the last minute. That creature returns to life with 1 hit point. This spell can’t return to life a creature that has died of old age, nor can it restore any missing body parts.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            componentMaterial: 'diamonds worth 300 gp, which the spell consumes',
            classes: [CLASSES.ARTIFICER, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.PALADIN, CLASSES.RANGER],
        });
    }
}