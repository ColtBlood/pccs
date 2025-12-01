import {BaseSpell, CAST_TIME, COMPONENTS, DURATION, RANGE, SPELL_LEVEL} from "../base-spell.js";
import {CLASSES} from "../../enums/classes.js";

export class SpellBlight extends BaseSpell{
    constructor() {
        super({
            spellName: "Blight",
            description: `
Necromantic energy washes over a creature of your choice that you can see within range, draining moisture and vitality from it. The target must make a Constitution saving throw. The target takes 8d8 necrotic damage on a failed save, or half as much damage on a successful one. This spell has no effect on undead or constructs.<br />
<br />
If you target a plant creature or a magical plant, it makes the saving throw with disadvantage, and the spell deals maximum damage to it. If you target a nonmagical plant that isn’t a creature, such as a tree or shrub, it doesn’t make a saving throw; it simply withers and dies.
            `,
            upcastDescription: `When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d8 for each slot level above 4th.`,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WARLOCK, CLASSES.WIZARD],
            range: RANGE.FEET30,
        });
    }
    castSpell(spellLevel = this.spellLevel) {
        super.castGenericSpellMechanics({
            spellLevel,
            diceType: 8,
            baseDiceAmount: 8,
        });
    }

}

export class SpellConfusion extends BaseSpell{
    constructor() {
        super({
            spellName: "Confusion",
            description: `
This spell assaults and twists creatures’ minds, spawning delusions and provoking uncontrolled actions. Each creature in a 10-foot-radius sphere centered on a point you choose within range must succeed on a Wisdom saving throw when you cast this spell or be affected by it.

An affected target can’t take reactions and must roll a d10 at the start of each of its turns to determine its behavior for that turn.
<table>
<tr>
<th>d10</th>
<th>Behavior</th>
</tr>
<tr>
<td>1</td>
<td>The creature uses all its movement to move in a random direction. To determine the direction, roll a d8 and assign a direction to each die face. The creature doesn’t take an action this turn.</td>
</tr>
<tr>
<td>2-6</td>
<td>The creature doesn’t move or take actions this turn.</td>
</tr>
<tr>
<td>7-8</td>
<td>The creature uses its action to make a melee attack against a randomly determined creature within its reach. If there is no creature within its reach, the creature does nothing this turn.</td>
</tr>
<tr>
<td>9-10</td>
<td>The creature can act and move normally.</td>
</tr>
</table>
At the end of its turns, an affected target can make a Wisdom saving throw. If it succeeds, this effect ends for that target.
            `,
            upcastDescription: `When you cast this spell using a spell slot of 5th level or higher, the radius of the sphere increases by 5 feet for each slot level above 4th.`,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            componentMaterial: 'three nut shells',
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET90,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}

export class SpellPolymorph extends BaseSpell{
    constructor() {
        super({
            spellName: "Polymorph",
            description: `
This spell transforms a creature that you can see within range into a new form. An unwilling creature must make a Wisdom saving throw to avoid the effect. A shapechanger automatically succeeds on this saving throw.<br />
<br />
The transformation lasts for the duration, or until the target drops to 0 hit points or dies. The new form can be any beast whose challenge rating is equal to or less than the target’s (or the target’s level, if it doesn’t have a challenge rating). The target’s game statistics, including mental ability scores, are replaced by the statistics of the chosen beast. It retains its alignment and personality.<br />
<br />
The target assumes the hit points of its new form. When it reverts to its normal form, the creature returns to the number of hit points it had before it transformed. If it reverts as a result of dropping to 0 hit points, any excess damage carries over to its normal form. As long as the excess damage doesn’t reduce the creature’s normal form to 0 hit points, it isn’t knocked unconscious.<br />
<br />
The creature is limited in the actions it can perform by the nature of its new form, and it can’t speak, cast spells, or take any other action that requires hands or speech.<br />
<br />
The target’s gear melds into the new form. The creature can’t activate, use, wield, or otherwise benefit from any of its equipment. This spell can’t affect a target that has 0 hit points.<br />
            `,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            componentMaterial: 'a caterpillar cocoon',
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET60,
            concentration: true,
            duration: DURATION.ONE_HOUR,
        });
    }
}

export class SpellConjureMinorElementals extends BaseSpell {
    constructor() {
        super({
            spellName: "Conjure Minor Elementals",
            description: `
            You summon elementals that appear in unoccupied spaces that you can see within range. You choose one the following options for what appears:
<li>One elemental of challenge rating 2 or lower</li>
<li>Two elementals of challenge rating 1 or lower</li>
<li>Four elementals of challenge rating 1/2 or lower</li>
<li>Eight elementals of challenge rating 1/4 or lower</li>
An elemental summoned by this spell disappears when it drops to 0 hit points or when the spell ends.
<br />
<br />The summoned creatures are friendly to you and your companions. Roll initiative for the summoned creatures as a group, which has its own turns. They obey any verbal commands that you issue to them (no action required by you). If you don’t issue any commands to them, they defend themselves from hostile creatures, but otherwise take no actions. The DM has the creatures’ statistics.
            `,
            upcastDescription: 'When you cast this spell using certain higher-level spell slots, you choose one of the summoning options above, and more creatures appear: twice as many with a 6th-level slot and three times as many with an 8th-level slot.',
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.WIZARD],
            range: RANGE.FEET90,
            duration: DURATION.ONE_HOUR,
            concentration: true,
        });
    }
}

export class SpellConjureWoodlandBeings extends BaseSpell {
    constructor() {
        super({
            spellName: "Conjure Woodland Beings",
            description: `
            You summon fey creatures that appear in unoccupied spaces that you can see within range. Choose one of the following options for what appears:
<li>One fey creature of challenge rating 2 or lower</li>
<li>Two fey creatures of challenge rating 1 or lower</li>
<li>Four fey creatures of challenge rating 1/2 or lower</li>
<li>Eight fey creatures of challenge rating 1/4 or lower</li>
A summoned creature disappears when it drops to 0 hit points or when the spell ends.
<br />
<br />The summoned creatures are friendly to you and your companions. Roll initiative for the summoned creatures as a group, which have their own turns. They obey any verbal commands that you issue to them (no action required by you). If you don’t issue any commands to them, they defend themselves from hostile creatures, but otherwise take no actions. The DM has the creatures’ statistics.
            `,
            upcastDescription: 'When you cast this spell using certain higher-level spell slots, you choose one of the summoning options above, and more creatures appear: twice as many with a 6th-level slot, and three times as many with an 8th-level slot.',
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VSM(),
            componentMaterial: 'one holly berry per creature summoned',
            classes: [CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.FEET60,
            duration: DURATION.ONE_HOUR,
            concentration: true,
        });
    }
}

export class SpellDominateBeast extends BaseSpell {
    constructor() {
        super({
            spellName: "Dominate Beast",
            description: `You attempt to beguile a beast that you can see within range. It must succeed on a Wisdom saving throw or be charmed by you for the duration. If you or creatures that are friendly to you are fighting it, it has advantage on the saving throw.
<br />
<br />While the beast is charmed, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the creature while you are conscious (no action required), which it does its best to obey. You can specify a simple and general course of action, such as “Attack that creature,” “Run over there,” or “Fetch that object.” If the creature completes the order and doesn’t receive further direction from you, it defends and preserves itself to the best of its ability.
<br />
<br />You can use your action to take total and precise control of the target. Until the end of your next turn, the creature takes only the actions you choose, and doesn’t do anything that you don’t allow it to do. During this time, you can also cause the creature to use a reaction, but this requires you to use your own reaction as well.
<br />
<br />Each time the target takes damage, it makes a new Wisdom saving throw against the spell. If the saving throw succeeds, the spell ends.`,
            upcastDescription: 'When you cast this spell with a 5th-level spell slot, the duration is concentration, up to 10 minutes. When you use a 6th-level spell slot, the duration is concentration, up to 1 hour. When you use a spell slot of 7th level or higher, the duration is concentration, up to 8 hours',
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.SORCERER],
            range: RANGE.FEET60,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}

export class SpellFreedomOfMovement extends BaseSpell {
    constructor() {
        super({
            spellName: "Freedom of Movement",
            description: `You touch a willing creature. For the duration, the target’s movement is unaffected by difficult terrain, and spells and other magical effects can neither reduce the target’s speed nor cause the target to be paralyzed or restrained.
<br />
<br />The target can also spend 5 feet of movement to automatically escape from nonmagical restraints, such as manacles or a creature that has it grappled. Finally, being underwater imposes no penalties on the target’s movement or attacks.`,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a leather strap, bound around the arm or a similar appendage',
            classes: [CLASSES.ARTIFICER, CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.TOUCH,
            duration: DURATION.ONE_HOUR,
        });
    }
}

export class SpellGiantInsect extends BaseSpell {
    constructor() {
        super({
            spellName: "Giant Insect",
            description: `You transform up to ten centipedes, three spiders, five wasps, or one scorpion within range into giant versions of their natural forms for the duration. A centipede becomes a giant centipede, a spider becaomes a giant spider, a wasp becomes a giant wasp, and a scorpion becomes a giant scorpion.
<br />
<br />Each creature obeys your verbal commands, and in combat, they act on your turn each round. The DM has the statistics for these creatures and resolves their actions and movement.
<br />
<br />A creature remains in its giant size for the duration, until it drops to 0 hit points, or until you use an action to dismiss the effect on it.
<br />
<br />The DM might allow you to choose different targets. For example, if you transform a bee, its giant version might have the same statistics as a giant wasp.`,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID],
            range: RANGE.FEET30,
            duration: DURATION.MINUTES10,
            concentration: true,
        });
    }
}

export class SpellGraspingVine extends BaseSpell {
    constructor() {
        super({
            spellName: "Grasping Vine",
            description: `You conjure a vine that sprouts from the ground in an unoccupied space of your choice that you can see within range. When you cast this spell, you can direct the vine to lash out at a creature within 30 feet of it that you can see. That creature must succeed on a Dexterity saving throw or be pulled 20 feet directly toward the vine.
<br />
<br />Until the spell ends, you can direct the vine to lash out at the same creature or another one as a bonus action on each of your turns.`,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.FEET30,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
            castingTime: CAST_TIME.BONUS_ACTION,
        });
    }
}

export class SpellHallucinatoryTerrain extends BaseSpell {
    constructor() {
        super({
            spellName: "Hallucinatory Terrain",
            description: `You make natural terrain in a 150-foot cube in range look, sound, and smell like some other sort of natural terrain. Thus, open fields or a road can be made to resemble a swamp, hill, crevasse, or some other difficult or impassable terrain. A pond can be made to seem like a grassy meadow, a precipice like a gentle slope, or a rock-strewn gully like a wide and smooth road. Manufactured structures, equipment, and creatures within the area aren’t changed in appearance.
<br />
<br />The tactile characteristics of the terrain are unchanged, so creatures entering the area are likely to see through the illusion. If the difference isn’t obvious by touch, a creature carefully examining the illusion can attempt an Intelligence (Investigation) check against your spell save DC to disbelieve it. A creature who discerns the illusion for what it is, sees it as a vague image superimposed on the terrain.`,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a stone, a twig, and a bit of green plant',
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.WARLOCK, CLASSES.WIZARD],
            range: RANGE.FEET300,
            duration: DURATION.HOURS24,
            castingTime: CAST_TIME.MINUTES10,
        });
    }
}

export class SpellIceStorm extends BaseSpell {
    constructor() {
        super({
            spellName: "Ice Storm",
            description: `A hail of rock-hard ice pounds to the ground in a 20-foot-radius, 40-foot-high cylinder centered on a point within range. Each creature in the cylinder must make a Dexterity saving throw. A creature takes 2d8 bludgeoning damage and 4d6 cold damage on a failed save, or half as much damage on a successful one.
<br />
<br />Hailstones turn the storm’s area of effect into difficult terrain until the end of your next turn.`,
            upcastDescription: 'When you cast this spell using a spell slot of 5th level or higher, the bludgeoning damage increases by 1d8 for each slot level above 4th.',
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a pinch of dust and a few drops of water',
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET300,
            duration: DURATION.INSTANTANEOUS,
        });
    }
}

export class SpellLocateCreature extends BaseSpell {
    constructor() {
        super({
            spellName: "Locate Creature",
            description: `Describe or name a creature that is familiar to you. You sense the direction to the creature’s location, as long as that creature is within 1,000 feet of you. If the creature is moving, you know the direction of its movement.
<br />
<br />The spell can locate a specific creature known to you, or the nearest creature of a specific kind (such as a human or a unicorn), so long as you have seen such a creature up close – within 30 feet – at least once. If the creature you described or named is in a different form, such as being under the effects of a polymorph spell, this spell doesn’t locate the creature.
<br />
<br />This spell can’t locate a creature if running water at least 10 feet wide blocks a direct path between you and the creature.`,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a bit of fur from a bloodhound',
            classes: [CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.PALADIN, CLASSES.RANGER, CLASSES.WIZARD],
            range: RANGE.SELF,
            duration: DURATION.ONE_HOUR,
            concentration: true,
        });
    }
}

export class SpellStoneShape extends BaseSpell {
    constructor() {
        super({
            spellName: "Stone Shape",
            description: `You touch a stone object of Medium size or smaller or a section of stone no more than 5 feet in any dimension and form it into any shape that suits your purpose. So, for example, you could shape a large rock into a weapon, idol, or coffer, or make a small passage through a wall, as long as the wall is less than 5 feet thick. You could also shape a stone door or its frame to seal the door shut. The object you create can have up to two hinges and a latch, but finer mechanical detail isn’t possible.`,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VSM(),
            componentMaterial: 'soft clay, which must be worked into roughly the desired shape of the stone object',
            classes: [CLASSES.ARTIFICER, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.WIZARD],
            range: RANGE.TOUCH,
            duration: DURATION.INSTANTANEOUS,
        });
    }
}

export class SpellWallOfFire extends BaseSpell {
    constructor() {
        super({
            spellName: "Wall of Fire",
            description: `You create a wall of fire on a solid surface within range. You can make the wall up to 60 feet long, 20 feet high, and 1 foot thick, or a ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thick. The wall is opaque and lasts for the duration.
<br />
<br />When the wall appears, each creature within its area must make a Dexterity saving throw. On a failed save, a creature takes 5d8 fire damage, or half as much damage on a successful save.
<br />
<br />One side of the wall, selected by you when you cast this spell, deals 5d8 fire damage to each creature that ends its turn within 10 feet of that side or inside the wall. A creature takes the same damage when it enters the wall for the first time on a turn or ends its turn there. The other side of the wall deals no damage.`,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a small piece of phosphorus',
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET120,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}

export class SpellCharmMonster extends BaseSpell {
    constructor() {
        super({
            spellName: "Charm Monster",
            description: `You attempt to charm a creature you can see within range. It must make a Wisdom saving throw, and it does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is charmed by you until the spell ends or until you or your companions do anything harmful to it. The charmed creature is friendly to you. When the spell ends, the creature knows it was charmed by you.`,
            upcastDescription: `When you cast this spell using a spell slot of 5th level or higher, you can target one additional creature for each slot level above 4th. The creatures must be within 30 feet of each other when you target them.`,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VS(),
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WARLOCK, CLASSES.WIZARD],
            range: RANGE.FEET30,
            duration: DURATION.ONE_HOUR,
        });
    }
}

export class SpellControlWater extends BaseSpell {
    constructor() {
        super({
            spellName: "Control Water",
            description: `Until the spell ends, you control any freestanding water inside an area you choose that is a cube up to 100 feet on a side. You can choose from any of the following effects when you cast this spell. As an action on your turn, you can repeat the same effect or choose a different one.
<br />
<br /><span class="bold">Flood.</span> You cause the water level of all standing water in the area to rise by as much as 20 feet. If the area includes a shore, the flooding water spills over onto dry land. If you choose an area in a large body of water, you instead create a 20-foot tall wave that travels from one side of the area to the other and then crashes down. Any Huge or smaller vehicles in the wave’s path are carried with it to the other side. Any Huge or smaller vehicles struck by the wave have a 25 percent chance of capsizing. The water level remains elevated until the spell ends or you choose a different effect. If this effect produced a wave, the wave repeats on the start of your next turn while the flood effect lasts.
<br />
<br /><span class="bold">Part Water.</span> You cause water in the area to move apart and create a trench. The trench extends across the spell’s area, and the separated water forms a wall to either side. The trench remains until the spell ends or you choose a different effect. The water then slowly fills in the trench over the course of the next round until the normal water level is restored.
<br />
<br /><span class="bold">Redirect Flow.</span> You cause flowing water in the area to move in a direction you choose, even if the water has to flow over obstacles, up walls, or in other unlikely directions. The water in the area moves as you direct it, but once it moves beyond the spell’s area, it resumes its flow based on the terrain conditions. The water continues to move in the direction you chose until the spell ends or you choose a different effect.
<br />
<br /><span class="bold">Whirlpool.</span> This effect requires a body of water at least 50 feet square and 25 feet deep. You cause a whirlpool to form in the center of the area. The whirlpool forms a vortex that is 5 feet wide at the base, up to 50 feet wide at the top, and 25 feet tall. Any creature or object in the water and within 25 feet of the vortex is pulled 10 feet toward it. A creature can swim away from the vortex by making a Strength (Athletics) check against your spell save DC.
<br />
<br />When a creature enters the vortex for the first time on a turn or starts its turn there, it must make a Strength saving throw. On a failed save, the creature takes 2d8 bludgeoning damage and is caught in the vortex until the spell ends. On a successful save, the creature takes half damage, and isn’t caught in the vortex. A creature caught in the vortex can use its action to try to swim away from the vortex as described above, but has disadvantage on the Strength (Athletics) check to do so.
<br />
<br />The first time each turn that an object enters the vortex, the object takes 2d8 bludgeoning damage, this damage occurs each round it remains in the vortex.`,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a drop of water and a pinch of dust',
            classes: [CLASSES.CLERIC, CLASSES.DRUID, CLASSES.WIZARD],
            range: RANGE.FEET300,
            duration: DURATION.MINUTES10,
            concentration: true,
        });
    }
}

export class SpellElementalBane extends BaseSpell {
    constructor() {
        super({
            spellName: "Elemental Bane",
            description: `Choose one creature you can see within range, and choose one of the following damage types: acid, cold, fire, lightning, or thunder. The target must succeed on a Constitution saving throw or be affected by the spell for its duration. The first time each turn the affected target takes damage of the chosen type, the target takes an extra 2d6 damage of that type. Moreover, the target loses any resistance to that damage type until the spell ends.`,
            upcastDescription: `When you cast this spell using a spell slot of 5th level or higher, you can target one additional creature for each slot level above 4th. The creatures must be within 30 feet of each other when you target them.`,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.WARLOCK, CLASSES.WIZARD, CLASSES.ARTIFICER],
            range: RANGE.FEET90,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}

export class SpellGuardianOfNature extends BaseSpell {
    constructor() {
        super({
            spellName: "Guardian of Nature",
            description: `A nature spirit answers your call and transforms you into a powerful guardian. The transformation lasts until the spell ends. You choose one of the following forms to assume: Primal Beast or Great Tree.
<br />
<br />><span class="bold">Primal Beast.</span> Bestial fur covers your body, your facial features become feral, and you gain the following benefits:

<li>Your walking speed increases by 10 feet.</li>
<li>You gain darkvision with a range of 120 feet.</li>
<li>You make Strength-based attack rolls with advantage.</li>
<li>Your melee weapon attacks deal an extra 1d6 force damage on a hit.</li>

<span class="bold">Great Tree.</span> Your skin appears barky, leaves sprout from your hair, and you gain the following benefits:
<li>You gain 10 temporary hit points.</li>
<li>You make Constitution saving throws with advantage.</li>
<li>You make Dexterity and Wisdom-based attack rolls with advantage.</li>
<li>While you are on the ground, the ground within 15 feet of you is difficult terrain for your enemies.</li>`,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.V(),
            classes: [CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.SELF,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
            castingTime: CAST_TIME.BONUS_ACTION,
        });
    }
}

export class SpellStoneskin extends BaseSpell {
    constructor() {
        super({
            spellName: "Stoneskin",
            description: `This spell turns the flesh of a willing creature you touch as hard as stone. Until the spell ends, the target has resistance to nonmagical bludgeoning, piercing, and slashing damage.`,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VSM(),
            componentMaterial: 'diamond dust worth 100 gp, which the spell consumes',
            classes: [CLASSES.ARTIFICER, CLASSES.DRUID, CLASSES.RANGER, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.TOUCH,
            duration: DURATION.ONE_HOUR,
            concentration: true,
        });
    }
}

export class SpellWaterSphere extends BaseSpell {
    constructor() {
        super({
            spellName: "Water Sphere",
            description: `
            You conjure up a sphere of water with a 5-foot radius on a point you can see within range. The sphere can hover in the air, but no more than 10 feet off the ground. The sphere remains for the spell’s duration.
<br />
<br />Any creature in the sphere’s space must make a Strength saving throw. On a successful save, a creature is ejected from that space to the nearest unoccupied space outside it. A Huge or larger creature succeeds on the saving throw automatically. On a failed save, a creature is restrained by the sphere and is engulfed by the water. At the end of each of its turns, a restrained target can repeat the saving throw.
<br />
<br />The sphere can restrain a maximum of four Medium or smaller creatures or one Large creature. If the sphere restrains a creature in excess of these numbers, a random creature that was already restrained by the sphere falls out of it and lands prone in a space within 5 feet of it.
<br />
<br />As an action, you can move the sphere up to 30 feet in a straight line. If it moves over a pit, cliff, or other drop, it safely descends until it is hovering 10 feet over ground. Any creature restrained by the sphere moves with it. You can ram the sphere into creatures, forcing them to make the saving throw, but no more than once per turn.
<br />
<br />When the spell ends, the sphere falls to the ground and extinguishes all normal flames within 30 feet of it. Any creature restrained by the sphere is knocked prone in the space where it falls.
`,
            spellLevel: SPELL_LEVEL.LEVEL_4,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a droplet of water',
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET90,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}
