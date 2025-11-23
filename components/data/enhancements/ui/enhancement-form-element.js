export class EnhancementFormElement{
    matcher;
    constructor(matcher) {
        this.matcher = matcher;
    }

    render(){
        return `oops, missing implementation for an EnhancementFormElement`;
    }

    fetchValue(...obj){
        throw new Error('No fetchValue method implemented');
    }
}