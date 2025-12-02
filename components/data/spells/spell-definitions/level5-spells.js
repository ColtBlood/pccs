import {BaseSpell, CAST_TIME, COMPONENTS, DURATION, RANGE, SPELL_LEVEL} from "../base-spell.js";
import {CLASSES} from "../../enums/classes.js";

export class SpellGreaterRestoration extends BaseSpell{
    constructor() {
        super({
            spellName: "Greater Restoration",
            description: `
You imbue a creature you touch with positive energy to undo a debilitating effect. You can reduce the target’s exhaustion level by one, or end one of the following effects on the target:

<li>One effect that charmed or petrified the target</li>
<li>One curse, including the target’s attunement to a cursed magic item</li>
<li>Any reduction to one of the target’s ability scores</li>
<li>One effect reducing the target’s hit point maximum</li>
            `,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            componentMaterial: 'adiamond dust worth at least 100 gp, which the spell consumes',
            classes: [CLASSES.ARTIFICER, CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID],
        });
    }
}

export class SpellContagion extends BaseSpell{
    constructor() {
        super({
            spellName: "Contagion",
            description: `
Your touch inflicts disease. Make a melee spell attack against a creature within your reach. On a hit, the target is poisoned.<br />
<br />
At the end of each of the poisoned target’s turns, the target must make a Constitution saving throw. If the target succeeds on three of these saves, it is no longer poisoned, and the spell ends. If the target fails three of these saves, the target is no longer poisoned, but choose one of the diseases below. The target is subjected to the chosen disease for the spell’s duration.<br />
<br />
Since this spell induces a natural disease in its target, any effect that removes a disease or otherwise ameliorates a disease’s effects apply to it.<br />

<li><span class="bold">Blinding Sickness.</span> Pain grips the creature’s mind, and its eyes turn milky white. The creature has disadvantage on Wisdom checks and Wisdom saving throws and is blinded.</li>
<li><span class="bold">Filth Fever.</span> A raging fever sweeps through the creature’s body. The creature has disadvantage on Strength checks, Strength saving throws, and attack rolls that use Strength.</li>
<li><span class="bold">Flesh Rot.</span> The creature’s flesh decays. The creature has disadvantage on Charisma checks and vulnerability to all damage.</li>
<li><span class="bold">Mindfire.</span> The creature’s mind becomes feverish. The creature has disadvantage on Intelligence checks and Intelligence saving throws, and the creature behaves as if under the effects of the confusion spell during combat.</li>
<li><span class="bold">Seizure.</span> The creature is overcome with shaking. The creature has disadvantage on Dexterity checks, Dexterity saving throws, and attack rolls that use Dexterity.</li>
<li><span class="bold">Slimy Doom.</span> The creature begins to bleed uncontrollably. The creature has disadvantage on Constitution checks and Constitution saving throws. In addition, whenever the creature takes damage, it is stunned until the end of its next turn.</li>
            `,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VS(),
            duration: DURATION.DAYS7,
            classes: [CLASSES.CLERIC, CLASSES.DRUID],
        });
    }
}

export class SpellCloudkill extends BaseSpell{
    constructor() {
        super({
            spellName: "Cloudkill",
            description: `
You create a 20-foot-radius sphere of poisonous, yellow-green fog centered on a point you choose within range. The fog spreads around corners. It lasts for the duration or until strong wind disperses the fog, ending the spell. Its area is heavily obscured.<br />
<br />
When a creature enters the spell’s area for the first time on a turn or starts its turn there, that creature must make a Constitution saving throw. The creature takes 5d8 poison damage on a failed save, or half as much damage on a successful one. Creatures are affected even if they hold their breath or don’t need to breathe.<br />
<br />
The fog moves 10 feet away from you at the start of each of your turns, rolling along the surface of the ground. The vapors, being heavier than air, sink to the lowest level of the land, even pouring down openings.<br />
            `,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VS(),
            classes: [CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET120,
            duration: DURATION.MINUTES10,
            concentration: true,
        });
    }
}

export class SpellWallOfStone extends BaseSpell {
    constructor() {
        super({
            spellName: "Wall of Stone",
            description: `
A nonmagical wall of solid stone springs into existence at a point you choose within range. The wall is 6 inches thick and is composed of ten 10-foot-by-10-foot panels. Each panel must be contiguous with at least one other panel. Alternatively, you can create 10-foot-by-20-foot panels that are only 3 inches thick.<br />
<br />
If the wall cuts through a creature’s space when it appears, the creature is pushed to one side of the wall (your choice). If a creature would be surrounded on all sides by the wall (or the wall and another solid surface), that creature can make a Dexterity saving throw. On a success, it can use its reaction to move up to its speed so that it is no longer enclosed by the wall.<br />
<br />
The wall can have any shape you desire, though it can’t occupy the same space as a creature or object. The wall doesn’t need to be vertical or resting on any firm foundation. It must, however, merge with and be solidly supported by existing stone. Thus, you can use this spell to bridge a chasm or create a ramp.<br />
<br />
If you create a span greater than 20 feet in length, you must halve the size of each panel to create supports. You can crudely shape the wall to create crenellations, battlements, and so on.<br />
<br />
The wall is an object made of stone that can be damaged and thus breached. Each panel has AC 15 and 30 hit points per inch of thickness. Reducing a panel to 0 hit points destroys it and might cause connected panels to collapse at the DM’s discretion.<br />
<br />
If you maintain your concentration on this spell for its whole duration, the wall becomes permanent and can’t be dispelled. Otherwise, the wall disappears when the spell ends.
`,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            componentMaterial: 'a small block of granite',
            classes: [CLASSES.ARTIFICER, CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET120,
            duration: DURATION.MINUTES10,
            concentration: true,
        });
    }
}

export class SpellAntilifeShell extends BaseSpell {
    constructor() {
        super({
            spellName: "Antilife Shell",
            description: `
            A shimmering barrier extends out from you in a 10-foot radius and moves with you, remaining centered on you and hedging out creatures other than undead and constructs.
<br />
<br />The barrier lasts for the duration. The barrier prevents an affected creature from passing or reaching through. An affected creature can cast spells or make attacks with ranged or reach weapons through the barrier.
<br />
<br />If you move so that an affected creature is forced to pass through the barrier, the spell ends.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID],
            range: `${RANGE.SELF} (10-foot radius)`,
            duration: DURATION.ONE_HOUR,
            concentration: true,
        });
    }
}

export class SpellAwaken extends BaseSpell {
    constructor() {
        super({
            spellName: "Awaken",
            description: `
            After spending the casting time tracing magical pathways within a precious gemstone, you touch a huge or smaller beast or plant. The target must have either no Intelligence score or an Intelligence of 3 or less.
<br />
<br />The target gains an Intelligence of 10. The target also gains the ability to speak one language you know. If the target is a plant, it gains the ability to move its limbs, roots, vines, creepers, and so forth, and it gains senses similar to a human’s. Your DM chooses statistics appropriate for the awakened plant, such as the statistics for the awakened shrub or the awakened tree.
<br />
<br />The awakened beast or plant is charmed by you for 30 days or until you and your companions do anything harmful to it. When the charmed condition ends, the awakened creature chooses whether to remain friendly to you, based on how you treated it while it was charmed.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VSM(),
            componentMaterial: 'an agate worth at least 1,000 gp, which the spell consumes',
            classes: [CLASSES.BARD, CLASSES.DRUID],
            range: RANGE.TOUCH,
            duration: DURATION.INSTANTANEOUS,
            castingTime: CAST_TIME.HOURS8
        });
    }
}

export class SpellCommuneWithNature extends BaseSpell {
    constructor() {
        super({
            spellName: "Commune with Nature",
            description: `
            You briefly become one with nature and gain knowledge of the surrounding territory. In the outdoors, the spell gives you knowledge of the land within 3 miles of you. In caves and other natural underground settings, the radius is limited to 300 feet. The spell doesn’t function where nature has been replaced by construction, such as in dungeons and towns.
<br />
<br />You instantly gain knowledge of up to three facts of your choice about any of the following subjects as they relate to the area:

<li>terrain and bodies of water</li>
<li>prevalent plants, minerals, animals, or peoples</li>
<li>powerful celestials, fey, fiends, elementals, or undead</li>
<li>influence from other planes of existence</li>
<li>buildings</li>
For example, you could determine the location of powerful undead in the area, the location of major sources of safe drinking water, and the location of any nearby towns.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.SELF,
            duration: DURATION.INSTANTANEOUS,
            isRange: true,
        });
    }
}

export class SpellConjureElemental extends BaseSpell {
    constructor() {
        super({
            spellName: "Conjure Elemental",
            description: `
            You call forth an elemental servant. Choose an area of air, earth, fire, or water that fills a 10-foot cube within range. An elemental of challenge rating 5 or lower appropriate to the area you chose appears in an unoccupied space within 10 feet of it. For example, a fire elemental emerges from a bonfire, and an earth elemental rises up from the ground. The elemental disappears when it drops to 0 hit points or when the spell ends.
<br />
<br />The elemental is friendly to you and your companions for the duration. Roll initiative for the elemental, which has its own turns. It obeys any verbal commands that you issue to it (no action required by you). If you don’t issue any commands to the elemental, it defends itself from hostile creatures but otherwise takes no actions.
<br />
<br />If your concentration is broken, the elemental doesn’t disappear. Instead, you lose control of the elemental, it becomes hostile toward you and your companions, and it might attack. An uncontrolled elemental can’t be dismissed by you, and it disappears 1 hour after you summoned it. The DM has the elemental’s statistics.
            `,
            upcastDescription: 'When you cast this spell using a spell slot of 6th level or higher, the challenge rating increases by 1 for each slot level above 5th.',
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VSM(),
            componentMaterial: 'burning incense for air, soft clay for earth, sulfur and phosphorus for fire, or water and sand for water',
            classes: [CLASSES.DRUID, CLASSES.WIZARD],
            range: RANGE.FEET90,
            duration: DURATION.ONE_HOUR,
            concentration: true,
        });
    }
}

export class SpellGeas extends BaseSpell {
    constructor() {
        super({
            spellName: "Geas",
            description: `
            You place a magical command on a creature that you can see within range, forcing it to carry out some service or refrain from some action or course of activity as you decide.
<br />
<br />If the creature can understand you, it must succeed on a Wisdom saving throw or become charmed by you for the duration. While the creature is charmed by you, it takes 5d10 psychic damage each time it acts in a manner directly counter to your instructions, but no more than once each day. A creature that can’t understand you is unaffected by the spell.
<br />
<br />You can issue any command you choose, short of an activity that would result in certain death. Should you issue a suicidal command, the spell ends. You can end the spell early by using an action to dismiss it. A Remove Curse, Greater Restoration, or Wish spell also ends it.
            `,
            upcastDescription: `When you cast this spell using a spell slot of 7th or 8th level, the duration is 1 year. When you cast this spell using a spell slot of 9th level, the spell lasts until it is ended by one of the spells mentioned above.`,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.V(),
            classes: [CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.PALADIN, CLASSES.WIZARD],
            range: RANGE.FEET60,
            duration: DURATION.DAYS30,
        });
    }
}

export class SpellInsectPlague extends BaseSpell {
    constructor() {
        super({
            spellName: "Insect Plague",
            description: `
            Swarming, biting locusts fill a 20-foot-radius sphere centered on a point you choose within range. The sphere spreads around corners. The sphere remains for the duration, and its area is lightly obscured. The sphere’s area is difficult terrain.
<br />
<br />When the area appears, each creature in it must make a Constitution saving throw. A creature takes 4d10 piercing damage on a failed save, or half as much damage on a successful one. A creature must also make this saving throw when it enters the spell’s area for the first time on a turn or ends its turn there.
            `,
            upcastDescription: `When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d10 for each slot level above 5th.`,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a few grains of sugar, some kernels of grain, and a smear of fat',
            classes: [CLASSES.CLERIC, CLASSES.DRUID, CLASSES.SORCERER],
            range: RANGE.FEET300,
            duration: DURATION.MINUTES10,
            concentration: true,
        });
    }
}

export class SpellMassCureWounds extends BaseSpell {
    constructor() {
        super({
            spellName: "Mass Cure Wounds",
            description: `A wave of healing energy washes out from a point of your choice within range. Choose up to six creatures in a 30-foot-radius sphere centered on that point. Each target regains hit points equal to 3d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.`,
            upcastDescription: 'When you cast this spell using a spell slot of 6th level or higher, the healing increases by 1d8 for each slot level above 5th.',
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VS(),
            classes: [CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID],
            range: RANGE.FEET60,
        });
    }
}

export class SpellPlanarBinding extends BaseSpell {
    constructor() {
        super({
            spellName: "Planar Binding",
            description: `
            With this spell, you attempt to bind a celestial, an elemental, a fey, or a fiend to your service. The creature must be within range for the entire casting of the spell. (Typically, the creature is first summoned into the center of an inverted Magic Circle in order to keep it trapped while this spell is cast.) At the completion of the casting, the target must make a Charisma saving throw. On a failed save, it is bound to serve you for the duration. If the creature was summoned or created by another spell, that spell’s duration is extended to match the duration of this spell.
<br />
<br />A bound creature must follow your instructions to the best of its ability. You might command the creature to accompany you on an adventure, to guard a location, or to deliver a message. The creature obeys the letter of your instructions, but if the creature is hostile to you, it strives to twist your words to achieve its own objectives. If the creature carries out your instructions completely before the spell ends, it travels to you to report this fact if you are on the same plane of existence. If you are on a different plane of existence, it returns to the place where you bound it and remains there until the spell ends.
            `,
            upcastDescription: 'When you cast this spell using a spell slot of a higher level, the duration increases to 10 days with a 6th-level slot, 30 days with a 7th-level slot, 180 days with an 8th-level slot, or 1 year and 1 day with a 9th-level spell slot.',
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a jewel worth at least 1,000 gp, which the spell consumes',
            classes: [CLASSES.CLERIC, CLASSES.DRUID, CLASSES.BARD, CLASSES.WIZARD],
            range: RANGE.FEET60,
            duration: DURATION.HOURS24,
            concentration: true,
        });
    }
}

export class SpellReincarnate extends BaseSpell {
    constructor() {
        super({
            spellName: "Reincarnate",
            description: `
            You touch a dead humanoid or a piece of a dead humanoid. Provided that the creature has been dead no longer than 10 days, the spell forms a new adult body for it and then calls the soul to enter that body. If the target’s soul isn’t free or willing to do so, the spell fails.
<br />
<br />The magic fashions a new body for the creature to inhabit, which likely causes the creature’s race to change. The DM rolls a d100 and consults the following table to determine what form the creature takes when restored to life, or the DM chooses a form.
<table>
<tr><th colspan="2">Reincarnation Table</th></tr>
<tr><th>d100</th><th>Race</th></tr>
<tr><td>01-04</td><td>Dragonborn</td></tr>
<tr><td>05-13</td><td>Dwarf, hill</td></tr>
<tr><td>14-21</td><td>Dwarf, mountain</td></tr>
<tr><td>22-25</td><td>Elf, dark</td></tr>
<tr><td>26-34</td><td>Elf, high</td></tr>
<tr><td>35-42</td><td>Elf, wood</td></tr>
<tr><td>43-46</td><td>Gnome, forest</td></tr>
<tr><td>47-52</td><td>Gnome, rock</td></tr>
<tr><td>53-56</td><td>Half-elf</td></tr>
<tr><td>57-60</td><td>Half-orc</td></tr>
<tr><td>61-68</td><td>Halfling, lightfoot</td></tr>
<tr><td>69-76</td><td>Halfling, stout</td></tr>
<tr><td>77-96</td><td>Human</td></tr>
<tr><td>97-00</td><td>Tiefling</td></tr>
</table>
The reincarnated creature recalls its former life and experiences. It retains the capabilities it had in its original form, except it exchanges its original race for the new one and changes its racial traits accordingly.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VSM(),
            componentMaterial: 'rare oils and unguents worth at least 1,000 gp, which the spell consumes',
            classes: [CLASSES.DRUID],
            range: RANGE.TOUCH,
            duration: DURATION.INSTANTANEOUS,
            castingTime: CAST_TIME.HOURS1
        });
    }
}

export class SpellScrying extends BaseSpell {
    constructor() {
        super({
            spellName: "Scrying",
            description: `
            You can see and hear a particular creature you choose that is on the same plane of existence as you. The target must make a Wisdom saving throw, which is modified by how well you know the target and the sort of physical connection you have to it. If a target knows you’re casting this spell, it can fail the saving throw voluntarily if it wants to be observed.
<table>
<tr><tr>Knowledge</tr><tr>Save Modifier</tr></tr>
<tr><td>Secondhand (you have heard of the target)</td><td>+5</td></tr>
<tr><td>Firsthand (you have met the target)</td><td>+0</td></tr>
<tr><td>Familiar (you know the target well)</td><td>-5</td></tr>
</table>
<br />
<table>
<tr><tr>Connection</tr><tr>Save Modifier</tr></tr>
<tr><td>Likeness or picture</td><td>-2</td></tr>
<tr><td>Possession or garment</td><td>-4</td></tr>
<tr><td>Body part, lock of hair, bit of nail, or the like</td><td>-10</td></tr>
</table>
On a successful save, the target isn’t affected, and you can’t use this spell against it again for 24 hours.
<br />
<br />On a failed save, the spell creates an invisible sensor within 10 feet of the target. You can see and hear through the sensor as if you were there. The sensor moves with the target, remaining within 10 feet of it for the duration. A creature that can see invisible objects sees the sensor as a luminous orb about the size of your fist.
<br />
<br />Instead of targeting a creature, you can choose a location you have seen before as the target of this spell. When you do, the sensor appears at that location and doesn’t move.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a focus worth at least 1,000 gp, such as a crystal ball, a silver mirror, or a font filled with holy water',
            classes: [CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.WARLOCK, CLASSES.WIZARD],
            range: RANGE.SELF,
            duration: DURATION.MINUTES10,
        });
    }
}

export class SpellTreeStride extends BaseSpell {
    constructor() {
        super({
            spellName: "Tree Stride",
            description: `
            You gain the ability to enter a tree and move from inside it to inside another tree of the same kind within 500 feet.
<br />
<br />Both trees must be living and at least the same size as you. You must use 5 feet of movement to enter a tree. You instantly know the location of all other trees of the same kind within 500 feet and, as part of the move used to enter the tree, can either pass into one of those trees or step out of the tree you’re in. You appear in a spot of your choice within 5 feet of the destination tree, using another 5 feet of movement. If you have no movement left, you appear within 5 feet of the tree you entered.
<br />
<br />You can use this transportation ability once per round for the duration. You must end each turn outside a tree.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.SELF,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}

export class SpellControlWinds extends BaseSpell {
    constructor() {
        super({
            spellName: "Control Winds",
            description: `
You take control of the air in a 100-foot cube that you can see within range. Choose one of the following effects when you cast the spell. The effect lasts for the spell’s duration, unless you use your action on a later turn to switch to a different effect. You can also use your action to temporarily halt the effect or to restart one you’ve halted.

<li><span class="bold">Gusts.</span> A wind picks up within the cube, continually blowing in a horizontal direction that you choose. You choose the intensity of the wind: calm, moderate, or strong. If the wind is moderate or strong, ranged weapon attacks that pass through it or that are made against targets within the cube have disadvantage on their attack rolls. If the wind is strong, any creature moving against the wind must spend 1 extra foot of movement for each foot moved.</li>
<li><span class="bold">Downdraft.</span> You cause a sustained blast of strong wind to blow downward from the top of the cube. Ranged weapon attacks that pass through the cube or that are made against targets within it have disadvantage on their attack rolls. A creature must make a Strength saving throw if it flies into the cube for the first time on a turn or starts its turn there flying. On a failed save, the creature is knocked prone.</li>
<li><span class="bold">Updraft.</span> You cause a sustained updraft within the cube, rising upward from the cube’s bottom edge. Creatures that end a fall within the cube take only half damage from the fall. When a creature in the cube makes a vertical jump, the creature can jump up to 10 feet higher than normal.</li>
`,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET300,
            duration: DURATION.ONE_HOUR,
            concentration: true,
        });
    }
}

export class SpellMaelstrom extends BaseSpell {
    constructor() {
        super({
            spellName: "Maelstrom",
            description: `A mass of 5-foot-deep water appears and swirls in a 30-foot radius centered on a point you can see within range. The point must be on ground or in a body of water. Until the spell ends, that area is difficult terrain, and any creature that starts its turn there must succeed on a Strength saving throw or take 6d6 bludgeoning damage and be pulled 10 feet toward the center.`,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VSM(),
            componentMaterial: 'paper or leaf in the shape of a funnel',
            classes: [CLASSES.DRUID],
            range: RANGE.FEET120,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}

export class SpellSummonDraconicSpirit extends BaseSpell {
    constructor() {
        super({
            spellName: "Summon Draconic Spirit",
            description: `
You call forth a draconic spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Draconic Spirit stat block. When you cast this spell, choose a family of dragon: chromatic, gem, or metallic. The creature resembles a dragon of the chosen family, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.
<br />
<br />The creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.
<table>
    <tr><th colspan="6">Draconic Spirit</th></tr>
    <tr><td colspan="6">Large Dragon, Neutral</td></tr>
    <tr><td colspan="6"><span class="bold">Armor Class</span> 14 + the level of the spell (natural armor)</td></tr>
    <tr><td colspan="6"><span class="bold">Hit Points</span> 50 + 10 for each spell level above 5th (the dragon has a number of hit dice [d10s] equal to the level of the spell)</td></tr>
    <tr><td colspan="6"><span class="bold">Speed</span> 30 ft., fly 60 ft., swim 30 ft.</td></tr>
    <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
    <tr><td>19 (+4)</td><td>14 (+2)</td><td>17 (+3)</td><td>10 (+0)</td><td>14 (+2)</td><td>14 (+2)</td></tr>
    <tr><td colspan="6"><span class="bold">Damage Resistances(Chromatic and Metallic Only)</span> acid, cold, fire, lightning, poison</td></tr>
    <tr><td colspan="6"><span class="bold">Damage Resistances(Gem Only)</span> force, necrotic, psychic, radiant, thunder</td></tr>
    <tr><td colspan="6"><span class="bold">Condition Immunities</span> charmed, frightened, poisoned</td></tr>
    <tr><td colspan="6"><span class="bold">Senses</span> blindsight 30 ft., darkvision 60 ft., passive Perception 12</td></tr>
    <tr><td colspan="6"><span class="bold">Languages</span> Draconic, understands the languages you speak</td></tr>
    <tr><td colspan="6"><span class="bold">Challenge — Proficiency Bonus (PB)</span> equals your bonus</td></tr>
    <tr><td colspan="6"><span class="bold">Shared Resistances.</span> When you summon the dragon, choose one of its damage resistances. You have resistance to the chosen damage type until the spell ends</td></tr>
    <tr><th colspan="6">Actions</th></tr>
    <tr><td colspan="6"><span class="bold">Multiattack.</span> The dragon makes a number of Rend attacks equal to half the spell’s level (rounded down), and it uses Breath Weapon.</td></tr>
    <tr><td colspan="6"><span class="bold">Rend.</span> Melee Weapon Attack: your spell attack modifier to hit, reach 10 ft., one target. Hit: 1d6 plus 4 + the spell's level piercing damage.</td></tr>
    <tr><td colspan="6"><span class="bold">Breath Weapon.</span> The dragon exhales destructive energy in a 30-foot cone. Each creature in that area must make a Dexterity saving throw against your spell save DC. A creature takes 2d6 damage of a type this dragon has resistance to (your choice) on a failed save, or half as much damage on a successful one.</td></tr>
</table>
`,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VSM(),
            componentMaterial: 'an object with the image of a dragon engraved on it, worth at least 500 gp',
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET60,
            duration: DURATION.ONE_HOUR,
            concentration: true,
            upcastDescription: 'When you cast this spell using a spell slot of 6th level or higher, use the higher level wherever the spell’s level appears in the stat block.',
        });
    }
}

export class SpellTransmuteRock extends BaseSpell {
    constructor() {
        super({
            spellName: "Transmute Rock",
            description: `
You choose an area of stone or mud that you can see that fits within a 40-foot cube and that is within range, and choose one of the following effects.

<ul>
<li><span class="bold">Transmute Rock to Mud.</span>
<ul>
<li>Nonmagical rock of any sort in the area becomes an equal volume of thick and flowing mud that remains for the spell’s duration.</li>
<li>If you cast the spell on an area of ground, it becomes muddy enough that creatures can sink into it. Each foot that a creature moves through the mud costs 4 feet of movement, and any creature on the ground when you cast the spell must make a Strength saving throw. A creature must also make this save the first time it enters the area on a turn or ends its turn there. On a failed save, a creature sinks into the mud and is restrained, though it can use an action to end the restrained condition on itself by pulling itself free of the mud.</li>
<li>If you cast the spell on a ceiling, the mud falls. Any creature under the mud when it falls must make a Dexterity saving throw. A creature takes 4d8 bludgeoning damage on a failed save, or half as much damage on a successful one.</li>
</ul>
</li>
</ul>
<ul>
<li><span class="bold">Transmute Mud to Rock.</span>
<ul>
<li>Nonmagical mud or quicksand in the area no more than 10 feet deep transforms into soft stone for the spell’s duration. Any creature in the mud when it transforms must make a Dexterity saving throw. On a failed save, a creature becomes restrained by the rock. The restrained creature can use an action to try to break free by succeeding on a Strength check (DC 20) or by dealing 25 damage to the rock around it. On a successful save, a creature is shunted safely to the surface to an unoccupied space.</li>
</ul>
</li>
</ul>
`,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VSM(),
            componentMaterial: 'clay and water',
            classes: [CLASSES.DRUID, CLASSES.WIZARD, CLASSES.ARTIFICER],
            range: RANGE.FEET120,
            duration: DURATION.UNTIL_DISPELLED,
        });
    }
}

export class SpellWrathOfNature extends BaseSpell {
    constructor() {
        super({
            spellName: "Wrath of Nature",
            description: `
You call out to the spirits of nature to rouse them against your enemies. Choose a point you can see within range. The spirits cause trees, rocks, and grasses in a 60-foot cube centered on that point to become animated until the spell ends.
<br />
<br /><span class="bold">Grasses and Undergrowth.</span> Any area of ground in the cube that is covered by grass or undergrowth is difficult terrain for your enemies.
<br />
<br /><span class="bold">Trees.</span> At the start of each of your turns, each of your enemies within 10 feet of any tree in the cube must succeed on a Dexterity saving throw or take 4d6 slashing damage from whipping branches.
<br />
<br /><span class="bold">Roots and Vines.</span> At the end of each of your turns, one creature of your choice that is on the ground in the cube must succeed on a Strength saving throw or become restrained until the spell ends. A restrained creature can use an action to make a Strength (Athletics) check against your spell save DC, ending the effect on itself on a success.
<br />
<br /><span class="bold">Rocks.</span> As a bonus action on your turn, you can cause a loose rock in the cube to launch at a creature you can see in the cube. Make a ranged spell attack against the target. On a hit, the target takes 3d8 nonmagical bludgeoning damage, and it must succeed on a Strength saving throw or fall prone.
`,
            spellLevel: SPELL_LEVEL.LEVEL_5,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.FEET120,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}
