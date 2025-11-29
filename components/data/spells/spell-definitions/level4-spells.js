import {BaseSpell, COMPONENTS, DURATION, RANGE, SPELL_LEVEL} from "../base-spell.js";
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