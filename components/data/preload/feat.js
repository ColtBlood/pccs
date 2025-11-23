import {BaseEnhancer, PassivePerceptionEnhancer} from "../enhancements/enhancer.js";

export class FeatObservantEnhancer extends BaseEnhancer{
    constructor() {
        super(PassivePerceptionEnhancer);
        this.description = 'Feat Observant: +5 bonus to your passive Wisdom (Perception) and passive Intelligence (Investigation) scores'
    }

    enhancePassivePerception(input){
        return input+5;
    }
}

export class FeatObservant{
    asi = null;
    constructor({asi} = {}) {
        this.asi = asi;
    }

    register(builder){
        builder.setStat({stat:this.asi, value:builder.getStat(this.asi)+1});
        builder.addEnhancer(new FeatObservantEnhancer())
    }
}

export class FeatSkillExpert{
    asi = null;
    proficiencySkill = null;
    expertiseSkill = null;
    /*
    You have honed your proficiency with particular skills, granting you the following benefits:

Increase one ability score of your choice by 1, to a maximum of 20.
You gain proficiency in one skill of your choice.
Choose one skill in which you have proficiency. You gain expertise with that skill, which means your proficiency bonus is doubled for any ability check you make with it. The skill you choose must be one that isn't already benefiting from a feature, such as Expertise, that doubles your proficiency bonus.
     */
    constructor({asi, proficiencySkill, expertiseSkill} = {}) {
        this.asi = asi;
        this.proficiencySkill = proficiencySkill;
        this.expertiseSkill = expertiseSkill;
    }
    register(builder){
        builder.setStat({stat:this.asi, value:builder.getStat(this.asi)+1});
        builder.addProficiency(this.proficiencySkill);
        builder.addExpertise(this.expertiseSkill);
    }
}

export class FeatResilient{
    asi = null;
    /*
    Choose one ability score. You gain the following benefits:

Increase the chosen ability score by 1, to a maximum of 20.
You gain proficiency in saving throws using the chosen ability.
     */
    constructor({asi} = {}) {
        this.asi = asi;
    }
    register(builder){
        builder.setStat({stat:this.asi, value:builder.getStat(this.asi)+1});
        builder.addProficiency(this.asi);
    }
}