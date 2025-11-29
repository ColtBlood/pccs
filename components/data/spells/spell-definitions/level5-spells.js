import {BaseSpell, COMPONENTS, DURATION, RANGE, SPELL_LEVEL} from "../base-spell.js";
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