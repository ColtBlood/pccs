export const prependModifiers = (modifier, showOnZero = false) => {
    if(modifier === 0 && !showOnZero) {
        return '';
    }
    return `${modifier >= 0 ? '+':''}${modifier}`
}