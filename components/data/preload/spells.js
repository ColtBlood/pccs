import {
    AttackEnhancer,
    BaseSelectableEnhancer, DamageEnhancer, Enhancer,
    InitiativeEnhancer,
    SkillCheckEnhancer
} from "../enhancements/enhancer.js";
import {d4FormElement} from "../enhancements/ui/components/1d4-form-element.js";
import {
    BaseSpell,
    CANT_CAST,
    CAST_TIME,
    COMPONENTS,
    DURATION,
    RANGE,
    SPELL_LEVEL,
    TARGET
} from "../spells/base-spell.js";
import {CLASSES} from "../enums/classes.js";
import {DiceRoll} from "../../dice/dice-roll.js";


export class SpellGuidance extends BaseSpell{
    constructor() {
        super({
            spellName: "Guidance",
            description: "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check of its choice. It can roll the die before or after making the ability check. The spell then ends.",
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.BARD, CLASSES.ARTIFICER],
            concentration: true,
            duration: DURATION.ONE_MINUTE,
            relatedEnhancer: new SpellGuidanceEnhancer(),
        });
    }

    castSpell(spellLevel = this.spellLevel) {
        super.castSpell(spellLevel);
        Enhancer.getInstance().registerEnhancer(this.relatedEnhancer);
    }

    dropConcentration() {
        super.dropConcentration();
        Enhancer.getInstance().unregisterEnhancerByClass(this.relatedEnhancer);
    }
}

export class SpellShillelagh extends BaseSpell{
    constructor() {
        super({
            spellName: "Shillelagh",
            description: "The wood of a club or quarterstaff you are holding is imbued with nature’s power. For the duration, you can use your spellcasting ability instead of Strength for the attack and damage rolls of melee attacks using that weapon, and the weapon’s damage die becomes a d8. The weapon also becomes magical, if it isn’t already. The spell ends if you cast it again or if you let go of the weapon.",
            componentMaterial: 'mistletoe, a shamrock leaf, and a club or quarterstaff',
            classes: [CLASSES.DRUID],
            castingTime: CAST_TIME.BONUS_ACTION,
            duration: DURATION.ONE_MINUTE,
            relatedEnhancer: new SpellShillelaghEnhancer(),
        });
    }

    castSpell(spellLevel = this.spellLevel) {
        super.castSpell(spellLevel);
        Enhancer.getInstance().registerEnhancer(this.relatedEnhancer);
    }
}

export class SpellCreateBonfire extends BaseSpell{
    constructor() {
        super({
            spellName: "Create Bonfire",
            description: "You create a bonfire on ground that you can see within range. Until the spell ends, the bonfire fills a 5-foot cube. Any creature in the bonfire’s space when you cast the spell must succeed on a Dexterity saving throw or take 1d8 fire damage. A creature must also make the saving throw when it enters the bonfire’s space for the first time on a turn or ends its turn there.",
            range: RANGE.FEET60,
            components: COMPONENTS.VS(),
            concentration: true,
            duration: DURATION.ONE_MINUTE,
            classes: [CLASSES.ARTIFICER, CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WARLOCK, CLASSES.WIZARD],
        });
    }
}

export class SpellDruidcraft extends BaseSpell{
    constructor() {
        super({
            spellName: "Druidcraft",
            description: "Whispering to the spirits of nature, you create one of the following effects within range:\n" +
                "<li>You create a tiny, harmless sensory effect that predicts what the weather will be at your location for the next 24 hours. The effect might manifest as a golden orb for clear skies, a cloud for rain, falling snowflakes for snow, and so on. This effect persists for 1 round.\n</li>" +
                "<li>You instantly make a flower blossom, a seed pod open, or a leaf bud bloom.\n</li>" +
                "<li>You create an instantaneous, harmless sensory effect, such as falling leaves, a puff of wind, the sound of a small animal, or the faint odor of skunk. The effect must fit in a 5-foot cube.\n</li>" +
                "<li>You instantly light or snuff out a candle, a torch, or a small campfire.</li>",
            range: RANGE.FEET30,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID],
        });
    }
}

export class SpellFrostbite extends BaseSpell{
    constructor() {
        super({
            spellName: "Frostbite",
            description: "You cause numbing frost to form on one creature that you can see within range. The target must make a Constitution saving throw. On a failed save, the target takes 1d6 cold damage, and it has disadvantage on the next weapon attack roll it makes before the end of its next turn.",
            upcastDescription: `The spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).`,
            range: RANGE.FEET60,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WARLOCK, CLASSES.WIZARD, CLASSES.ARTIFICER],
        });
    }

    castSpell() {
        this.castCantripMechanics(6);
        return super.castSpell();
    }
}

export class SpellGust extends BaseSpell{
    constructor() {
        super({
            spellName: "Gust",
            description: "You seize the air and compel it to create one of the following effects at a point you can see within range:\n" +
                "<li>One Medium or smaller creature that you choose must succeed on a Strength saving throw or be pushed up to 5 feet away from you.\n</li>" +
                "<li>You create a small blast of air capable of moving one object that is neither held nor carried and that weighs no more than 5 pounds. The object is pushed up to 10 feet away from you. It isn’t pushed with enough force to cause damage.\n</li>" +
                "<li>You create a harmless sensory affect using air, such as causing leaves to rustle, wind to slam shutters shut, or your clothing to ripple in a breeze.</li>",
            range: RANGE.FEET30,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
        });
    }
}

export class SpellInfestation extends BaseSpell{
    constructor() {
        super({
            spellName: "Infestation",
            description: "You cause a cloud of mites, fleas, and other parasites to appear momentarily on one creature you can see within range. The target must succeed on a Constitution saving throw, or it takes 1d6 poison damage and moves 5 feet in a random direction if it can move and its speed is at least 5 feet. Roll a d4 for the direction: 1, north; 2, south; 3, east; or 4, west. This movement doesn’t provoke opportunity attacks, and if the direction rolled is blocked, the target doesn't move.",
            upcastDescription: `The spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).`,
            spellLevel: SPELL_LEVEL.CANTRIP,
            range: RANGE.FEET30,
            componentMaterial: 'a living flea',
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WARLOCK, CLASSES.WIZARD],
        });
    }

    castSpell() {
        this.castCantripMechanics(6);
        return super.castSpell();
    }
}

export class SpellMagicStone extends BaseSpell{
    constructor() {
        super({
            spellName: "Magic Stone",
            description: "You touch one to three pebbles and imbue them with magic. You or someone else can make a ranged spell attack with one of the pebbles by throwing it or hurling it with a sling. If thrown, it has a range of 60 feet. If someone else attacks with the pebble, that attacker adds your spellcasting ability modifier, not the attacker’s, to the attack roll. On a hit, the target takes bludgeoning damage equal to 1d6 + your spellcasting ability modifier. Hit or miss, the spell then ends on the stone.<br />" +
                "If you cast this spell again, the spell ends early on any pebbles still affected by it.",
            castingTime: CAST_TIME.BONUS_ACTION,
            spellLevel: SPELL_LEVEL.CANTRIP,
            components: COMPONENTS.VS(),
            duration: DURATION.ONE_MINUTE,
            classes: [CLASSES.DRUID, CLASSES.WARLOCK, CLASSES.ARTIFICER],
        });
    }
}

export class SpellMending extends BaseSpell{
    constructor() {
        super({
            spellName: "Mending",
            description: "This spell repairs a single break or tear in an object you touch, such as a broken chain link, two halves of a broken key, a torn cloak, or a leaking wineskin. As long as the break or tear is no larger than 1 foot in any dimension, you mend it, leaving no trace of the former damage. <br />" +
                "This spell can physically repair a magic item or construct, but the spell can’t restore magic to such an object.",
            spellLevel: SPELL_LEVEL.CANTRIP,
            castingTime: CAST_TIME.MINUTE1,
            componentMaterial: 'two lodestones',
            classes: [CLASSES.ARTIFICER, CLASSES.BARD, CLASSES.CLERIC, CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
        });
    }
}

export class SpellMoldEarth extends BaseSpell{
    constructor() {
        super({
            spellName: "Mold Earth",
            description: "You choose a portion of dirt or stone that you can see within range and that fits within a 5-foot cube. You manipulate it in one of the following ways:\n" +
                "\n" +
                "<li>If you target an area of loose earth, you can instantaneously excavate it, move it along the ground, and deposit it up to 5 feet away. This movement doesn’t have enough force to cause damage.\n</li>" +
                "<li>You cause shapes, colors, or both to appear on the dirt or stone, spelling out words, creating images, or shaping patterns. The changes last for 1 hour.\n</li>" +
                "<li>If the dirt or stone you target is on the ground, you cause it to become difficult terrain. Alternatively, you can cause the ground to become normal terrain if it is already difficult terrain. This change lasts for 1 hour.\n</li>" +
                "If you cast this spell multiple times, you can have no more than two of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.",
            spellLevel: SPELL_LEVEL.CANTRIP,
            range: RANGE.FEET30,
            components: [COMPONENTS.SOMATIC],
            duration: `${DURATION.INSTANTANEOUS} or ${DURATION.ONE_HOUR}`,
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
        });
    }
}

export class SpellPoisonSpray extends BaseSpell{
    constructor() {
        super({
            spellName: "Poison Spray",
            description: "You extend your hand toward a creature you can see within range and project a puff of noxious gas from your palm. The creature must succeed on a Constitution saving throw or take 1d12 poison damage.",
            upcastDescription: `The spell’s damage increases by 1d12 when you reach 5th level (2d12), 11th level (3d12), and 17th level (4d12).`,
            spellLevel: SPELL_LEVEL.CANTRIP,
            range: RANGE.FEET10,
            components: COMPONENTS.VS(),
            classes: [CLASSES.ARTIFICER, CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WARLOCK, CLASSES.WIZARD],
        });
    }

    castSpell() {
        this.castCantripMechanics(12);
        return super.castSpell();
    }
}

export class SpellGuidanceEnhancer extends BaseSelectableEnhancer{
    constructor() {
        super(
            SkillCheckEnhancer,
            InitiativeEnhancer,
        );
        this.forced = false;
        this.enabled = false;
        this.description = 'Guidance: roll a 1d4 and add the number rolled to one ability check of its choice'
        this.formElement = new d4FormElement({label: 'Guidance', uniqueMatcher:'guidance'})
    }
}
export class SpellShillelaghEnhancer extends BaseSelectableEnhancer{
    constructor() {
        super(
            AttackEnhancer,
            DamageEnhancer,
        );
        this.forced = false;
        this.enabled = false;
        this.description = 'Shillelagh: For the duration, you can use your spellcasting ability instead of Strength for the attack and damage rolls of melee attacks using that weapon, and the weapon’s damage die becomes a d8.'
    }
}

export class SpellAcidSplash extends BaseSpell{
    constructor() {
        super({
            spellName: "Acid Splash",
            description: "You hurl a bubble of acid. Choose one creature you can see within range, or choose two creatures you can see within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage.",
            upcastDescription: `The spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).`,
            spellLevel: SPELL_LEVEL.CANTRIP,
            components: COMPONENTS.VS(),
            classes: [CLASSES.ARTIFICER, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET60,
        });
    }

    castSpell() {
        this.castCantripMechanics(6);
        return super.castSpell();
    }
}

export class SpellControlFlames extends BaseSpell{
    constructor() {
        super({
            spellName: "Control Flames",
            description: `
            You choose nonmagical flame that you can see within range and that fits within a 5-foot cube. You affect it in one of the following ways:
<li>You instantaneously expand the flame 5 feet in one direction, provided that wood or other fuel is present in the new location.</li>
<li>You instantaneously extinguish the flames within the cube.</li>
<li>You double or halve the area of bright light and dim light cast by the flame, change its color, or both. The change lasts for 1 hour.</li>
<li>You cause simple shapes—such as the vague form of a creature, an inanimate object, or a location—to appear within the flames and animate as you like. The shapes last for 1 hour.</li>
If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.
            `,
            spellLevel: SPELL_LEVEL.CANTRIP,
            components: [COMPONENTS.SOMATIC],
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET60,
            duration: `${DURATION.INSTANTANEOUS} or ${DURATION.ONE_HOUR}`,
        });
    }
}

export class SpellChillTouch extends BaseSpell{
    constructor() {
        super({
            spellName: "Chill Touch",
            description: `
            You create a ghostly, skeletal hand in the space of a creature within range. Make a ranged spell attack against the creature to assail it with the chill of the grave. On a hit, the target takes 1d8 necrotic damage, and it can’t regain hit points until the start of your next turn. Until then, the hand clings to the target. If you hit an undead target, it also has disadvantage on attack rolls against you until the end of your next turn.
            `,
            upcastDescription: `This spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).`,
            spellLevel: SPELL_LEVEL.CANTRIP,
            components: COMPONENTS.VS(),
            classes: [CLASSES.SORCERER, CLASSES.WARLOCK, CLASSES.WIZARD],
            range: RANGE.FEET120,
            duration: DURATION.ONE_ROUND,
        });
    }

    castSpell() {
        this.castCantripMechanics(8);
        return super.castSpell();
    }
}

export class SpellProduceFlame extends BaseSpell{
    constructor() {
        super({
            spellName: "Produce Flame",
            description: `
            A flickering flame appears in your hand. The flame remains there for the duration and harms neither you nor your equipment. The flame sheds bright light in a 10-foot radius and dim light for an additional 10 feet. The spell ends if you dismiss it as an action or if you cast it again.<br />
<br />
You can also attack with the flame, although doing so ends the spell. When you cast this spell, or as an action on a later turn, you can hurl the flame at a creature within 30 feet of you. Make a ranged spell attack. On a hit, the target takes 1d8 fire damage.<br />
            `,
            upcastDescription: `This spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).`,
            spellLevel: SPELL_LEVEL.CANTRIP,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID],
            range: RANGE.SELF,
            duration: DURATION.MINUTES10,
        });
    }

    castSpell() {
        this.castCantripMechanics(8);
        return super.castSpell();
    }
}

export class SpellShapeWater extends BaseSpell{
    constructor() {
        super({
            spellName: "Shape Water",
            description: `
            You choose an area of water that you can see within range and that fits within a 5-foot cube. You manipulate it in one of the following ways:<br />
<br />
<li>You instantaneously move or otherwise change the flow of the water as you direct, up to 5 feet in any direction. This movement doesn’t have enough force to cause damage.</li>
<li>You cause the water to form into simple shapes and animate at your direction. This change lasts for 1 hour.</li>
<li>You change the water’s color or opacity. The water must be changed in the same way throughout. This change lasts for 1 hour.</li>
<li>You freeze the water, provided that there are no creatures in it. The water unfreezes in 1 hour.</li>
If you cast this spell multiple times, you can have no more than two of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.<br />
            `,
            spellLevel: SPELL_LEVEL.CANTRIP,
            components: [COMPONENTS.S],
            classes: [CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WIZARD],
            range: RANGE.FEET30,
            duration: `${DURATION.INSTANTANEOUS} or ${DURATION.ONE_HOUR}`,
        });
    }
}

export class SpellThunderclap extends BaseSpell{
    constructor() {
        super({
            spellName: "Thunderclap",
            description: `
            You create a burst of thunderous sound, which can be heard 100 feet away. Each creature other than you within 5 feet of you must make a Constitution saving throw. On a failed save, the creature takes 1d6 thunder damage.
            `,
            upcastDescription: `The spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).`,
            spellLevel: SPELL_LEVEL.CANTRIP,
            components: [COMPONENTS.S],
            classes: [CLASSES.BARD, CLASSES.DRUID, CLASSES.SORCERER, CLASSES.WARLOCK, CLASSES.WIZARD, CLASSES.ARTIFICER],
            range: `${RANGE.SELF} (5-foot radius)`,
        });
    }

    castSpell() {
        this.castCantripMechanics(6);
        return super.castSpell();
    }
}

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
    castSpell(spellLevel = this.spellLevel) {
        super.castGenericSpellMechanics({
            spellLevel,
            diceType: 8,
            baseDiceAmount: 5,
        });
    }
}

export class SpellConjureFey extends BaseSpell{
    constructor() {
        super({
            spellName: "Conjure Fey",
            description: `
            You summon a fey creature of challenge rating 6 or lower, or a fey spirit that takes the form of a beast of challenge rating 6 or lower. It appears in an unoccupied space that you can see within range. The fey creature disappears when it drops to 0 hit points or when the spell ends.

The fey creature is friendly to you and your companions for the duration. Roll initiative for the creature, which has its own turns. It obeys any verbal commands that you issue to it (no action required by you), as long as they don’t violate its alignment. If you don’t issue any commands to the fey creature, it defends itself from hostile creatures but otherwise takes no actions.

If your concentration is broken, the fey creature doesn’t disappear. Instead, you lose control of the fey creature, it becomes hostile toward you and your companions, and it might attack. An uncontrolled fey creature can’t be dismissed by you, and it disappears 1 hour after you summoned it. The DM has the fey creature’s statistics.
            `,
            spellLevel: SPELL_LEVEL.LEVEL_6,
            components: COMPONENTS.VS(),
            classes: [CLASSES.DRUID, CLASSES.WARLOCK],
            range: RANGE.FEET90,
            concentration: true,
            duration: DURATION.ONE_HOUR,
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

export const FULL_SPELL_LIST =
    [
        new SpellGuidance(),
        new SpellShillelagh(),
        new SpellAcidSplash(),
        new SpellControlFlames(),
        new SpellChillTouch(),
        new SpellDetectMagic(),
        new SpellAnimateDead(),
        new SpellGaseousForm(),
        new SpellBlight(),
        new SpellConfusion(),
        new SpellBlindnessDeafness(),
        new SpellGentleRepose(),
        new SpellSpikeGrowth(),
        new SpellConjureFey(),
        new SpellSilveryBarbs(),
        new SpellCreateBonfire(),
        new SpellDruidcraft(),
        new SpellFrostbite(),
        new SpellGust(),
        new SpellInfestation(),
        new SpellMagicStone(),
        new SpellMending(),
        new SpellMoldEarth(),
        new SpellPoisonSpray(),
        new SpellCureWounds(),
        new SpellHealingWord(),
        new SpellHealingSpirit(),
        new SpellGoodberry(),
        new SpellDispelMagic(),
        new SpellPolymorph(),
        new SpellSpeakWithAnimals(),
        new SpellRevivify(),
        new SpellProduceFlame(),
        new SpellShapeWater(),
        new SpellBeastBond(),
        new SpellGustOfWind(),
        new SpellMoonbeam(),
        new SpellLesserRestoration(),
        new SpellHoldPerson(),
        new SpellCallLightning(),
        new SpellDaylight(),
        new SpellConjureAnimals(),
        new SpellThunderclap(),
        new SpellCloudkill(),
        new SpellContagion(),
        new SpellGreaterRestoration(),
    ];



const setAlwaysPreparedSpells = (alwaysPreparedSpells) => {
    FULL_SPELL_LIST.forEach(spell => {
        if (alwaysPreparedSpells.includes(spell.spellName)) {
            spell.isAlwaysPrepared = true;
        }
    });
}


// Sort by spell level, then alphabetically by name

FULL_SPELL_LIST.sort((spell, otherSpell) => {
    const sorting = spell.spellLevel - otherSpell.spellLevel
    if(sorting === 0){
        return spell.spellName.localeCompare(otherSpell.spellName)
    }
    return sorting;
});