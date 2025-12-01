import {BaseSpell, CAST_TIME, COMPONENTS, DURATION, RANGE, SPELL_LEVEL} from "../base-spell.js";
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

export class SpellWallOfWater extends BaseSpell{
    constructor() {
        super({
            spellName: "Wall of Water",
            description: `
You conjure up a wall of water on the ground at a point you can see within range. You can make the wall up to 30 feet long, 10 feet high, and 1 foot thick, or you can make a ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thick. The wall vanishes when the spell ends. The wall’s space is difficult terrain.<br />
<br />
Any ranged weapon attack that enters the wall’s space has disadvantage on the attack roll, and fire damage is halved if the fire effect passes through the wall to reach its target. Spells that deal cold damage that pass through the wall cause the area of the wall they pass through to freeze solid (at least a 5-foot square section is frozen). Each 5-foot-square frozen section has AC 5 and 15 hit points. Reducing a frozen section to 0 hit points destroys it. When a section is destroyed, the wall’s water doesn’t fill it.<br />
            `,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            componentMaterial: 'a drop of water',
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET60,
            concentration: true,
            duration: DURATION.MINUTES10,
        });
    }
}

export class SpellMeldIntoStone extends BaseSpell {
    constructor() {
        super({
            spellName: "Meld into Stone",
            description: `
            You step into a stone object or surface large enough to fully contain your body, melding yourself and all the equipment you carry with the stone for the duration. Using your movement, you step into the stone at a point you can touch. Nothing of your presence remains visible or otherwise detectable by nonmagical senses.
<br />
<br />While merged with the stone, you can’t see what occurs outside it, and any Wisdom (Perception) checks you make to hear sounds outside it are made with disadvantage. You remain aware of the passage of time and can cast spells on yourself while merged in the stone. You can use your movement to leave the stone where you entered it, which ends the spell. You otherwise can’t move.
<br />
<br />Minor physical damage to the stone doesn’t harm you, but its partial destruction or a change in its shape (to the extent that you no longer fit within it) expels you and deals 6d6 bludgeoning damage to you. The stone’s complete destruction (or transmutation into a different substance) expels you and deals 50 bludgeoning damage to you. If expelled, you fall prone in an unoccupied space closest to where you first entered.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.CLERIC],
            range: RANGE.TOUCH,
            duration: DURATION.HOURS8,
        });
    }
}

export class SpellPlantGrowth extends BaseSpell {
    constructor() {
        super({
            spellName: "Plant Growth",
            description: `This spell channels vitality into plants within a specific area. There are two possible uses for the spell, granting either immediate or long-term benefits.
<br />
<br />If you cast this spell using 1 action, choose a point within range. All normal plants in a 100-foot radius centered on that point become thick and overgrown. A creature moving through the area must spend 4 feet of movement for every 1 foot it moves.
<br />
<br />You can exclude one or more areas of any size within the spell’s area from being affected.
<br />
<br />If you cast this spell over 8 hours, you enrich the land. All plants in a half-mile radius centered on a point within range become enriched for 1 year. The plants yield twice the normal amount of food when harvested.`,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.RANGER, CLASSES.BARD],
            range: RANGE.FEET150,
            castingTime: CAST_TIME.ACTION
        });
    }
}

export class SpellProtectionFromEnergy extends BaseSpell {
    constructor() {
        super({
            spellName: "Protection from Energy",
            description: `For the duration, the willing creature you touch has resistance to one damage type of your choice: acid, cold, fire, lightning, or thunder.`,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.RANGER, CLASSES.ARTIFICER, CLASSES.CLERIC, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.TOUCH,
            duration: DURATION.ONE_HOUR,
            concentration: true,
        });
    }
}

export class SpellSleetStorm extends BaseSpell {
    constructor() {
        super({
            spellName: "Sleet Storm",
            description: `
            Until the spell ends, freezing rain and sleet fall in a 20-foot-tall cylinder with a 40-foot radius centered on a point you choose within range. The area is heavily obscured, and exposed flames in the area are doused.
<br />
<br />The ground in the area is covered with slick ice, making it difficult terrain. When a creature enters the spell’s area for the first time on a turn or starts its turn there, it must make a Dexterity saving throw. On a failed save, it falls prone.
<br />
<br />If a creature starts its turn in the spell's area and is concentrating on a spell, the creature must make a successful Constitution saving throw against your spell save DC or lose concentration.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a pinch of dust and a few drops of water',
            classes: [CLASSES.DRUID, CLASSES.WIZARD, CLASSES.SORCERER],
            range: RANGE.FEET150,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}

export class SpellSpeakWithPlants extends BaseSpell {
    constructor() {
        super({
            spellName: "Speak with Plants",
            description: `
            You imbue plants within 30 feet of you with limited sentience and animation, giving them the ability to communicate with you and follow your simple commands. You can question plants about events in the spell’s area within the past day, gaining information about creatures that have passed, weather, and other circumstances.
<br />
<br />You can also turn difficult terrain caused by plant growth (such as thickets and undergrowth) into ordinary terrain that lasts for the duration. Or you can turn ordinary terrain where plants are present into difficult terrain that lasts for the duration, causing vines and branches to hinder pursuers, for example.
<br />
<br />Plants might be able to perform other tasks on your behalf, at the DM’s discretion. The spell doesn’t enable plants to uproot themselves and move about, but they can freely move branches, tendrils, and stalks.
<br />
<br />If a plant creature is in the area, you can communicate with it as if you share a common language, but you gain no magical ability to influence it.
<br />
<br />This spell can cause the plants created by the entangle spell to release a restrained creature.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            components: COMPONENTS.VS(),
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.RANGER],
            range: `${RANGE.SELF} (30-foot radius)`,
            duration: DURATION.MINUTES10,
        });
    }
}

export class SpellWaterBreathing extends BaseSpell {
    constructor() {
        super({
            spellName: "Water Breathing",
            description: `This spell grants up to ten willing creatures you can see within range the ability to breathe underwater until the spell ends. Affected creatures also retain their normal mode of respiration.`,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a short reed or piece of straw',
            classes: [CLASSES.ARTIFICER, CLASSES.DRUID, CLASSES.RANGER, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET30,
            duration: DURATION.HOURS24,
            isRitual: true,
        });
    }
}

export class SpellWaterWalk extends BaseSpell {
    constructor() {
        super({
            spellName: "Water Walk",
            description: `This spell grants the ability to move across any liquid surface – such as water, acid, mud, snow, quicksand, or lava – as if it were harmless solid ground (creatures crossing molten lava can still take damage from the heat). Up to ten willing creatures you can see within range gain this ability for the duration.
<br />
<br />If you target a creature submerged in a liquid, the spell carries the target to the surface of the liquid at a rate of 60 feet per round.`,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a piece of cork',
            classes: [CLASSES.ARTIFICER, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.RANGER, CLASSES.SORCERER],
            range: RANGE.FEET30,
            duration: DURATION.ONE_HOUR,
        });
    }
}

export class SpellWindWall extends BaseSpell {
    constructor() {
        super({
            spellName: "Wind Wall",
            description: `
            A wall of strong wind rises from the ground at a point you choose within range. You can make the wall up to 50 feet long, 15 feet high, and 1 foot thick. You can shape the wall in any way you choose so long as it makes one continuous path along the ground. The wall lasts for the duration.
<br />
<br />When the wall appears, each creature within its area must make a Strength saving throw. A creature takes 3d8 bludgeoning damage on a failed save, or half as much damage on a successful one.
<br />
<br />The strong wind keeps fog, smoke, and other gases at bay. Small or smaller flying creatures or objects can’t pass through the wall. Loose, lightweight materials brought into the wall fly upward. Arrows, bolts, and other ordinary projectiles launched at targets behind the wall are deflected upward and automatically miss. (Boulders hurled by giants or siege engines, and similar projectiles, are unaffected.) Creatures in gaseous form can’t pass through it.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a tiny fan and a feather of exotic origin',
            classes: [CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.FEET120,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}

export class SpellEruptingEarth extends BaseSpell {
    constructor() {
        super({
            spellName: "Erupting Earth",
            description: `Choose a point you can see on the ground within range. A fountain of churned earth and stone erupts in a 20-foot cube centered on that point. Each creature in that area must make a Dexterity saving throw. A creature takes 3d12 bludgeoning damage on a failed save, or half as much damage on a successful one. Additionally, the ground in that area becomes difficult terrain until cleared away. Each 5-foot-square portion of the area requires at least 1 minute to clear by hand.`,
            upcastDescription: `When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d12 for each slot level above 3rd.`,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a piece of obsidian',
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET120,
            duration: DURATION.INSTANTANEOUS,
        });
    }
}

export class SpellFeignDeath extends BaseSpell {
    constructor() {
        super({
            spellName: "Feign Death",
            description: `
            You touch a willing creature and put it into a cataleptic state that is indistinguishable from death.
<br />
<br />For the spell’s duration, or until you use an action to touch the target and dismiss the spell, the target appears dead to all outward inspection and to spells used to determine the target’s status. The target is blinded and incapacitated, and its speed drops to 0. The target has resistance to all damage except psychic damage. If the target is diseased or poisoned when you cast the spell, or becomes diseased or poisoned while under the spell’s effect, the disease and poison have no effect until the spell ends.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a pinch of graveyard dirt',
            classes: [CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.WIZARD],
            range: RANGE.TOUCH,
            duration: DURATION.ONE_HOUR,
            isRitual: true,
        });
    }
}

export class SpellTidalWave extends BaseSpell {
    constructor() {
        super({
            spellName: "Tidal Wave",
            description: `You conjure up a wave of water that crashes down on an area within range. The area can be up to 30 feet long, up to 10 feet wide, and up to 10 feet tall. Each creature in that area must make a Dexterity saving throw. On a failure, a creature takes 4d8 bludgeoning damage and is knocked prone. On a success, a creature takes half as much damage and isn’t knocked prone. The water then spreads out across the ground in all directions, extinguishing unprotected flames in its area and within 30 feet of it.`,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a drop of water',
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET120,
            duration: DURATION.INSTANTANEOUS,
        });
    }
}

export class SpellFlameArrows extends BaseSpell {
    constructor() {
        super({
            spellName: "Flame Arrows",
            description: `You touch a quiver containing arrows or bolts. When a target is hit by a ranged weapon attack using a piece of ammunition drawn from the quiver, the target takes an extra 1d6 fire damage. The spell’s magic ends on the piece of ammunition when it hits or misses, and the spell ends when twelve pieces of ammunition have been drawn from the quiver.`,
            upcastDescription: `When you cast this spell using a spell slot of 4th level or higher, the number of pieces of ammunition you can affect with this spell increases by two for each slot level above 3rd.`,
            spellLevel: SPELL_LEVEL.LEVEL_3,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.RANGER, CLASSES.SORCERER, CLASSES.WIZARD, CLASSES.ARTIFICER],
            range: RANGE.TOUCH,
            duration: DURATION.ONE_HOUR,
            concentration: true,
        });
    }
}
