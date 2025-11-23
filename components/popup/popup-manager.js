import './popup-box.js'

let currentPopup;

export const defaultCloseAction = () => {
    document.getElementById('popup-target').innerHTML = '';
}
const defaultMainAction = () => {
    pccsConsole.log('Missing main action for popup');
    defaultCloseAction();
}

export const openPopup = ({title, content, mainAction, closeAction} = {}) => {
    const elm = document.createElement('popup-box');
    elm.setAttribute('title', title)
    elm.setAttribute('content', content)
    elm.mainAction = mainAction || defaultMainAction;
    elm.closeAction = closeAction || defaultCloseAction;
    document.getElementById('popup-target').appendChild(elm);
    currentPopup = elm;
}

export const getOpenPopup = () => {
    return currentPopup;
}
