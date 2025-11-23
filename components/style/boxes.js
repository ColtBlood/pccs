import {greyBackground, greyHintBackground, greyLine, mediumLetters, smallLetters} from "./basics.js";

export const characterSheetBox = () => `
    .cs-box {
        border: 1px solid ${greyLine()};
        border-radius: 10px;
        padding-right: 15px;
        margin: 10px;
        background-color: white;
    }
    .cs-box .title {
        font-weight: bold;
        display: inline-block;
        width: 100%;
        text-align: center;
        text-transform: uppercase;
        padding-bottom: 3px;
        ${smallLetters()}
    }
`;

export const singleFieldBox = () => `
    .single-cs-box {
        border: 1px solid ${greyLine()};
        border-radius: 10px;
        padding: 5px 15px;
        margin: 10px;
        display: flex;
        align-items: baseline;
    }
    
    .single-cs-box .title {
        font-weight: bold;
        display: inline-block;
        width: 100%;
        text-align: center;
        text-transform: uppercase;
        ${smallLetters()}
    }
    
    .single-cs-box .value {
        border: 1px solid ${greyLine()};
        border-radius: 100%;
        background-color: white;
        margin: -10px 0px -10px -20px;
        padding: 5px 10px;
        // text-align: center;
        display: flex;
        justify-content: center;
        width: 10px;
    }
`;

export const singleFieldBoxSquare = () => `
        .single-cs-box-square{
                border: 1px solid black;
                text-align: center;
                margin: 5px;
                padding-top: 5px;
                border-radius: 10px;
                background-color: white;
                padding: 5px;
                height: 65px;
        }
        .single-cs-box-square .title {
                font-weight: bold;
                display: inline-block;
                width: 100%;
                text-align: center;
                text-transform: uppercase;
                padding-bottom: 3px;
                ${smallLetters()}
        }
        .single-cs-box-square .main {
                padding: 10px;
        }
`;

export const buttonBoxes = () => `
    .button-box{
        border-radius: 5px;
        border: 1px solid ${greyLine()};
        box-shadow: inset -2px -2px 5px ${greyBackground()};
        width: 100px;
        margin-bottom: 5px;
        padding: 5px;
        ${mediumLetters()}
    }
    
    .button-box:active, .active{
        box-shadow: inset 2px 2px 5px ${greyLine()};
        background-color: ${greyHintBackground()};
    }
    
    .disabled{
        color: ${greyLine()};
    }
    
    .disabled:active{
        background-color: #FFDDDD;
    }
`