export class Enhancer{
    enhancers = []
    static instance;

    static getInstance(){
        if(!Enhancer.instance){
            Enhancer.instance = new Enhancer();
        }
        return Enhancer.instance;
    }

    registerEnhancer(enhancer){
        this.enhancers.push(enhancer);
        return this;
    }

    unregisterEnhancerByClass(clazz){
        this.enhancers = this.enhancers.filter(enhancer => enhancer.constructor.name !== clazz.constructor.name);
        return this;
    }

    getEnhancersByClass(clazz){
        return this.enhancers.filter(enhancer => enhancer.typeEnhancer.includes(clazz));
    }

    enhance(clazz, input){
        this.getEnhancersByClass(clazz)
            .forEach((enhancer) => {
                    input.value = enhancer[BaseEnhancer.enhancerTypes[clazz].method](input);
                }
            );
        return input.value;
    }
}

export const SavingThrowEnhancer = 'SavingThrowEnhancer';
export const SkillCheckEnhancer = 'SkillCheckEnhancer';
export const ArmorClassEnhancer = 'ArmorClassEnhancer';
export const InitiativeEnhancer = 'InitiativeEnhancer';
export const PassivePerceptionEnhancer = 'PassivePerceptionEnhancer';
export const MovementSpeedEnhancer = 'MovementSpeedEnhancer';
export const AttackEnhancer = 'AttackEnhancer';
export const DamageEnhancer = 'DamageEnhancer';

export const ArmorTrait = 'armor';

export class BaseEnhancer {
    typeEnhancer = [];
    traits = [];
    description = 'Missing description';
    forced = true;
    enabled = true;
    formElement;
    static enhancerTypes = {
        [SavingThrowEnhancer]: {name: SavingThrowEnhancer, method:'enhanceSavingThrow'},
        [SkillCheckEnhancer]: {name: SkillCheckEnhancer, method:'enhanceSkillCheck'},
        [ArmorClassEnhancer]: {name: ArmorClassEnhancer, method:'enhanceArmorClass'},
        [InitiativeEnhancer]: {name: InitiativeEnhancer, method:'enhanceInitiative'},
        [PassivePerceptionEnhancer]: {name: PassivePerceptionEnhancer, method:'enhancePassivePerception'},
        [MovementSpeedEnhancer]: {name: MovementSpeedEnhancer, method:'enhanceMovementSpeed'},
        [AttackEnhancer]: {name: AttackEnhancer, method:'enhanceAttack'},
        [DamageEnhancer]: {name: DamageEnhancer, method:'enhanceDamage'},
    }
    constructor(...types) {
        if(types.find(type => !BaseEnhancer.enhancerTypes[type])){
            throw new Error(`Enhancer type not found: ${types}`);
        }
        types.forEach(type => {
            const relatedMethod = this[BaseEnhancer.enhancerTypes[type].method];
            if(!relatedMethod){
                this[BaseEnhancer.enhancerTypes[type].method] = () => {throw new Error('Required method not implemented')}
            }
        })
        this.typeEnhancer = types;
    }
}

export class BaseSelectableEnhancer extends BaseEnhancer{
    constructor(...types) {
        super(...types);
        this.forced = false;
        types.forEach(type => {
            this[BaseEnhancer.enhancerTypes[type].method] = ({value}) => value;
        })
    }
}