import {BaseSpell, CAST_TIME, COMPONENTS, DURATION, RANGE, SPELL_LEVEL} from "../base-spell.js";
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

export class SpellWardingWind extends BaseSpell {
    constructor() {
        super({
            spellName: "Warding Wind",
            description: `A strong wind (20 miles per hour) blows around you in a 10-foot radius and moves with you, remaining centered on you. The wind lasts for the spell’s duration.<br /><br />The wind has the following effects:<ul><li>It deafens you and other creatures in its area.</li><li>It extinguishes unprotected flames in its area that are torch-sized or smaller.</li><li>The area is difficult terrain for creatures other than you.</li><li>The attack rolls of ranged weapon attacks have disadvantage if they pass in or out of the wind.</li><li>It hedges out vapor, gas, and fog that can be dispersed by strong wind.</li></ul>`,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: [COMPONENTS.VERBAL],
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.SELF,
            duration: DURATION.MINUTES10,
            concentration: true,
        });
    }
}

export class SpellAirBubble extends BaseSpell {
    constructor() {
        super({
            spellName: "Air Bubble",
            description: `
You create a spectral globe around the head of a willing creature you can see within range. The globe is filled with fresh air that lasts until the spell ends. If the creature has more than one head, the globe of air appears around only one of its heads (which is all the creature needs to avoid suffocation, assuming that all its heads share the same respiratory system).
`,
            upcastDescription: `
            When you cast this spell using a spell slot of 3rd level or higher, you can create two additional globes of fresh air for each slot level above 2nd.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: [COMPONENTS.SOMATIC],
            classes: [CLASSES.ARTIFICER, CLASSES.DRUID, CLASSES.RANGER, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET60,
            duration: DURATION.HOURS24,
        });
    }
}

export class SpellAnimalMessenger extends BaseSpell {
    constructor() {
        super({
            spellName: "Animal Messenger",
            description: `
By means of this spell, you use an animal to deliver a message. Choose a Tiny beast you can see within range, such as a squirrel, a blue jay, or a bat. You specify a location, which you must have visited, and a recipient who matches a general description, such as “a man or woman dressed in the uniform of the town guard” or “a red-haired dwarf wearing a pointed hat.” You also speak a message of up to twenty-five words. The target beast travels for the duration of the spell toward the specified location, covering about 50 miles per 24 hours for a flying messenger, or 25 miles for other animals.
<br />
<br />When the messenger arrives, it delivers your message to the creature that you described, replicating the sound of your voice. The messenger speaks only to a creature matching the description you gave. If the messenger doesn’t reach its destination before the spell ends, the message is lost, and the beast makes its way back to where you cast this spell.
`,
            upcastDescription: `
            If you cast this spell using a spell slot of 3rd level or higher, the duration of the spell increases by 48 hours for each slot level above 2nd.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a morsel of food',
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.FEET30,
            duration: DURATION.HOURS24,
            isRitual: true,
        });
    }
}

export class SpellBarkskin extends BaseSpell {
    constructor() {
        super({
            spellName: "Barkskin",
            description: `You touch a willing creature. Until the spell ends, the target’s skin has a rough, bark-like appearance, and the target’s AC can’t be less than 16, regardless of what kind of armor it is wearing.`,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a handful of oak bark',
            classes: [CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.TOUCH,
            duration: DURATION.ONE_HOUR,
            concentration: true,
        });
    }
}

export class SpellBeastSense extends BaseSpell {
    constructor() {
        super({
            spellName: "Beast Sense",
            description: `You touch a willing beast. For the duration of the spell, you can use your action to see through the beast’s eyes and hear what it hears, and continue to do so until you use your action to return to your normal senses.`,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: [COMPONENTS.SOMATIC],
            classes: [CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.TOUCH,
            duration: DURATION.ONE_HOUR,
            concentration: true,
            isRitual: true,
        });
    }
}

export class SpellDarkvision extends BaseSpell {
    constructor() {
        super({
            spellName: "Darkvision",
            description: `You touch a willing creature to grant it the ability to see in the dark. For the duration, that creature has darkvision out to a range of 60 feet.`,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VSM(),
            componentMaterial: 'either a pinch of dried carrot or an agate',
            classes: [CLASSES.ARTIFICER, CLASSES.DRUID, CLASSES.RANGER, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.TOUCH,
            duration: DURATION.HOURS8,
        });
    }
}

export class SpellDustDevil extends BaseSpell {
    constructor() {
        super({
            spellName: "Dust Devil",
            description: `
            Choose an unoccupied 5-foot cube of air that you can see within range. An elemental force that resembles a dust devil appears in the cube and lasts for the spell’s duration.

Any creature that ends its turn within 5 feet of the dust devil must make a Strength saving throw. On a failed save, the creature takes 1d8 bludgeoning damage and is pushed 10 feet away. On a successful save, the creature takes half as much damage and isn’t pushed.

As a bonus action, you can move the dust devil up to 30 feet in any direction. If the dust devil moves over sand, dust, loose dirt, or small gravel, it sucks up the material and forms a 10-foot-radius cloud of debris around itself that lasts until the start of your next turn. The cloud heavily obscures its area.
            `,
            upcastDescription: `
            When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 2nd.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a pinch of dust',
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET60,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}

export class SpellEarthbind extends BaseSpell {
    constructor() {
        super({
            spellName: "Earthbind",
            description: `Choose one creature you can see within range. Yellow strips of magical energy loop around the creature. The target must succeed on a Strength saving throw or its flying speed (if any) is reduced to 0 feet for the spell’s duration. An airborne creature affected by this spell descends at 60 feet per round until it reaches the ground or the spell ends.`,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: [COMPONENTS.VERBAL],
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WARLOCK, CLASSES.WIZARD],
            range: RANGE.FEET300,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}

export class SpellEnhanceAbility extends BaseSpell {
    constructor() {
        super({
            spellName: "Enhance Ability",
            description: `
            You touch a creature and bestow upon it a magical enhancement. Choose one of the following effects; the target gains the effect until the spell ends.<br />
<br />
<li>Bear’s Endurance. The target has advantage on Constitution checks. It also gains 2d6 temporary hit points, which are lost when the spell ends.</li>
<li>Bull’s Strength. The target has advantage on Strength checks, and their carrying capacity doubles.</li>
<li>Cat’s Grace. The target has advantage on Dexterity checks. It also doesn’t take damage from falling 20 feet or less if it isn’t incapacitated.</li>
<li>Eagle’s Splendor. The target has advantage on Charisma checks.</li>
<li>Fox’s Cunning. The target has advantage on Intelligence checks.</li>
<li>Owl’s Wisdom. The target has advantage on Wisdom checks.</li>

            `,
            upcastDescription: `
            When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VSM(),
            componentMaterial: 'fur or a feather from a beast',
            classes: [CLASSES.ARTIFICER, CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.RANGER, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.TOUCH,
            duration: DURATION.ONE_HOUR,
            concentration: true,
        });
    }
}

export class SpellFindTraps extends BaseSpell {
    constructor() {
        super({
            spellName: "Find Traps",
            description: `
            You sense the presence of any trap within range that is within line of sight.
<br />
<br />A trap, for the purpose of this spell, includes anything that would inflict a sudden or unexpected effect you consider harmful or undesirable, which was specifically intended as such by its creator. Thus, the spell would sense an area affected by the alarm spell, a glyph of warding, or a mechanical pit trap, but it would not reveal a natural weakness in the floor, an unstable ceiling, or a hidden sinkhole.
<br />
<br />This spell merely reveals that a trap is present. You don’t learn the location of each trap, but you do learn the general nature of the danger posed by a trap you sense.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VS(),
            classes: [CLASSES.CLERIC, CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.FEET120,
            duration: DURATION.INSTANTANEOUS,
        });
    }
}

export class SpellFlameBlade extends BaseSpell {
    constructor() {
        super({
            spellName: "Flame Blade",
            description: `
            You evoke a fiery blade in your free hand. The blade is similar in size and shape to a scimitar, and it lasts for the duration. If you let go of the blade, it disappears, but you can evoke the blade again as a bonus action.
<br />
<br />You can use your action to make a melee spell attack with the fiery blade. On a hit, the target takes 3d6 fire damage. The flaming blade sheds bright light in a 10-foot radius and dim light for an additional 10 feet.
            `,
            upcastDescription: `
           When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for every two slot levels above 2nd. 
            `,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a leaf of sumac',
            classes: [CLASSES.DRUID, CLASSES.SORCERER],
            range: RANGE.SELF,
            duration: DURATION.MINUTES10,
            concentration: true,
            castingTime: CAST_TIME.BONUS_ACTION,
        });
    }
}

export class SpellFlamingSphere extends BaseSpell {
    constructor() {
        super({
            spellName: "Flaming Sphere",
            description: `
            A 5-foot-diameter sphere of fire appears in an unoccupied space of your choice within range and lasts for the duration. Any creature that ends its turn within 5 feet of the sphere must make a Dexterity saving throw. The creature takes 2d6 fire damage on a failed save, or half as much damage on a successful one.
<br />
<br />As a bonus action, you can move the sphere up to 30 feet. If you ram the sphere into a creature, that creature must make the saving throw against the sphere’s damage, and the sphere stops moving this turn.
<br />
<br />When you move the sphere, you can direct it over barriers up to 5 feet tall and jump it across pits up to 10 feet wide. The sphere ignites flammable objects not being worn or carried, and it sheds bright light in a 20-foot radius and dim light for an additional 20 feet.


            `,
            upcastDescription: `When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd.`,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a bit of tallow, a pinch of brimstone, and a dusting of powdered iron',
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET60,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}

export class SpellHeatMetal extends BaseSpell {
    constructor() {
        super({
            spellName: "Heat Metal",
            description: `
            Choose a manufactured metal object, such as a metal weapon or a suit of heavy or medium metal armor, that you can see within range. You cause the object to glow red-hot. Any creature in physical contact with the object takes 2d8 fire damage when you cast the spell. Until the spell ends, you can use a bonus action on each of your subsequent turns to cause this damage again.
<br />
<br />If a creature is holding or wearing the object and takes the damage from it, the creature must succeed on a Constitution saving throw or drop the object if it can. If it doesn’t drop the object, it has disadvantage on attack rolls and ability checks until the start of your next turn.
            `,
            upcastDescription: `When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 2nd.`,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a piece of iron and a flame',
            classes: [CLASSES.ARTIFICER, CLASSES.BARD, CLASSES.DRUID],
            range: RANGE.FEET60,
            duration: DURATION.ONE_MINUTE,
            concentration: true,
        });
    }
}

export class SpellLocateObject extends BaseSpell {
    constructor() {
        super({
            spellName: "Locate Object",
            description: `
            Describe or name an object that is familiar to you. You sense the direction to the object’s location, as long as that object is within 1,000 feet of you. If the object is in motion, you know the direction of its movement.
<br />
<br />The spell can locate a specific object known to you, as long as you have seen it up close – within 30 feet – at least once. Alternatively, the spell can locate the nearest object of a particular kind, such as a certain kind of apparel, jewelry, furniture, tool, or weapon.
<br />
<br />This spell can’t locate an object if any thickness of lead, even a thin sheet, blocks a direct path between you and the object.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a forked twig',
            classes: [CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.PALADIN, CLASSES.RANGER, CLASSES.WIZARD],
            range: RANGE.SELF,
            duration: DURATION.MINUTES10,
            concentration: true,
        });
    }
}

export class SpellLocateAnimalsOrPlants extends BaseSpell {
    constructor() {
        super({
            spellName: "Locate Animals or Plants",
            description: `Describe or name a specific kind of beast or plant. Concentrating on the voice of nature in your surroundings, you learn the direction and distance to the closest creature or plant of that kind within 5 miles, if any are present.`,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a bit of fur from a bloodhound',
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.SELF,
            duration: DURATION.INSTANTANEOUS,
            isRitual: true,
        });
    }
}

export class SpellPassWithoutTrace extends BaseSpell {
    constructor() {
        super({
            spellName: "Pass without Trace",
            description: `A veil of shadows and silence radiates from you, masking you and your companions from detection. For the duration, each creature you choose within 30 feet of you (including you) has a +10 bonus to Dexterity (Stealth) checks and can’t be tracked except by magical means. A creature that receives this bonus leaves behind no tracks or other traces of its passage.`,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VSM(),
            componentMaterial: 'ashes from a burned leaf of mistletoe and a sprig of spruce',
            classes: [CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.SELF,
            duration: DURATION.ONE_HOUR,
            concentration: true,
        });
    }
}

export class SpellProtectionFromPoison extends BaseSpell {
    constructor() {
        super({
            spellName: "Protection from Poison",
            description: `
            You touch a creature. If it is poisoned, you neutralize the poison. If more than one poison afflicts the target, you neutralize one poison that you know is present, or you neutralize one at random.
<br />
<br />For the duration, the target has advantage on saving throws against being poisoned, and it has resistance to poison damage.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VS(),
            classes: [CLASSES.ARTIFICER, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.PALADIN, CLASSES.RANGER],
            range: RANGE.TOUCH,
            duration: DURATION.ONE_HOUR,
        });
    }
}

export class SpellSkywrite extends BaseSpell {
    constructor() {
        super({
            spellName: "Skywrite",
            description: `You cause up to ten words to form in a part of the sky you can see. The words appear to be made of cloud and remain in place for the spell’s duration. The words dissipate when the spell ends. A strong wind can disperse the clouds and end the spell early.`,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VS(),
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.WIZARD, CLASSES.ARTIFICER],
            range: RANGE.SIGHT,
            duration: DURATION.DAYS1,
            concentration: true,
            isRitual: true,
        });
    }
}

export class SpellSummonBeast extends BaseSpell {
    constructor() {
        super({
            spellName: "Summon Beast",
            description: `
            You call forth a bestial spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Bestial Spirit stat block. When you cast the spell, choose an environment: Air, Land, or Water. The creature resembles an animal of your choice that is native to the chosen environment, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.
<br />
<br />The creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.
<br/>
<table>
<tr>
<th colspan="6">Bestial Spirit</th>
</tr>
<tr>
<td colspan="6">Small beast</td>
</tr>
<tr>
<td colspan="6"><span class="bold">Armor Class:</span> 11 + the level of the spell (natural armor)</td>
</tr>
<tr>
<td colspan="6"><span class="bold">Hit Points:</span> 20 (Air only) or 30 (Land and Water only) + 5 for each spell level above 2nd</td>
</tr>
<tr>
<td colspan="6"><span class="bold">Speed:</span> 30 ft., climb 30 ft. (Land only), fly 60 ft. (Air only), swim 30 ft. (Water only)</td>
</tr>
<tr>
<th>STR</th>
<th>DEX</th>
<th>CON</th>
<th>INT</th>
<th>WIS</th>
<th>CHA</th>
</tr>
<tr>
<td>18(+4)</td>
<td>11(+0)</td>
<td>16(+3)</td>
<td>4(-3)</td>
<td>14(+2)</td>
<td>5(-3)</td>
</tr>
<tr>
<td colspan="6"><span class="bold">Senses:</span> darkvision 60 ft., passive Perception 12 </td>
</tr>
<tr>
<td colspan="6"><span class="bold">Languages:</span> understands the languages you speak </td>
</tr>
<tr>
<td colspan="6"><span class="bold">Challenge:</span> —</td>
</tr>
<tr>
<td colspan="6"><span class="bold">Proficiency Bonus:</span> equals your bonus</td>
</tr>
<tr>
<td colspan="6"><span class="bold">Flyby (Air Only):</span> The beast doesn’t provoke opportunity attacks when it flies out of an enemy’s reach.</td>
</tr>
<tr>
<td colspan="6"><span class="bold">Pack Tactics (Land and Water Only):</span> The beast has advantage on an attack roll against a creature if at least one of the beast’s allies is within 5 feet of the creature and the ally isn’t incapacitated.</td>
</tr>
<tr>
<td colspan="6"><span class="bold">Water Breathing (Water Only):</span> The beast can breathe only underwater.</td>
</tr>
<tr>
<th colspan="6">Actions</th>
</tr>
<tr>
<td colspan="6"><span class="bold">Multiattack:</span> The beast makes a number of attacks equal to half this spell’s level (rounded down).
</td>
</tr>
<tr>
<td colspan="6"><span class="bold">Maul:</span> Melee Weapon Attack: your spell attack modifier to hit, reach 5 ft., one target. Hit: 1d8 + 4 + the spell’s level piercing damage.</td>
</tr>
</table>

`,
            upcastDescription: `
            When you cast this spell using a spell slot of 3rd level or higher, use the higher level where the spell’s level appears in the stat block.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a feather, tuft of fur, and fish tail inside a gilded acorn worth at least 200 gp',
            classes: [CLASSES.DRUID, CLASSES.RANGER],
            range: RANGE.FEET90,
            duration: DURATION.ONE_HOUR,
            concentration: true,
        });
    }
}

export class SpellWitherAndBloom extends BaseSpell {
    constructor() {
        super({
            spellName: "Wither and Bloom",
            description: `
            You invoke both death and life upon a 10-foot-radius sphere centered on a point within range. Each creature of your choice in that area must make a Constitution saving throw, taking 2d6 necrotic damage on a failed save, or half as much damage on a successful one. Nonmagical vegetation in that area withers.
<br />
<br />In addition, one creature of your choice in that area can spend and roll one of its unspent Hit Dice and regain a number of hit points equal to the roll plus your spellcasting ability modifier.
            `,
            upcastDescription: `
            When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot above 2nd, and the number of Hit Dice that can be spent and added to the healing roll increases by one for each slot above 2nd.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_2,
            components: COMPONENTS.VSM(),
            componentMaterial: 'a withered vine twisted into a loop',
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET60,
            duration: DURATION.INSTANTANEOUS,
        });
    }
}
