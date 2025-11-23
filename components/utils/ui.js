export const bindOnClick = (thisContext, id2functionMap = []) => {
    id2functionMap.forEach(({id, funct}) => {
        const element = thisContext.shadowRoot.getElementById(id)
        if(element){
            element.onclick = funct.bind(thisContext);
        }
        else{
            console.error(`Element not found (${id})`);
        }
    })
}