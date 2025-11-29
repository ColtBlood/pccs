import {
    AttackEnhancer,
    BaseSelectableEnhancer,
    DamageEnhancer, Enhancer,
    InitiativeEnhancer,
    SkillCheckEnhancer
} from "../../enhancements/enhancer.js";
import {d4FormElement} from "../../enhancements/ui/components/1d4-form-element.js";
import {BaseSpell, CAST_TIME, COMPONENTS, DURATION, RANGE, SPELL_LEVEL} from "../base-spell.js";
import {CLASSES} from "../../enums/classes.js";

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

export class SpellAcidSplash extends BaseSpell{
    constructor() {
        super({
            spellName: "Acid Splash",
            description: "You hurl a bubble of acid. Choose one creature you can see within range, or choose two creatures you can see within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage.",
            upcastDescription: `The spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).`,
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

class SpellGuidanceEnhancer extends BaseSelectableEnhancer{
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

class SpellShillelaghEnhancer extends BaseSelectableEnhancer{
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


