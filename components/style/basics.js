
export const greyLine = () => `#999999`;
export const greyLineHint = () => `#dddddd`;
export const greyBackground = () => `#dddddd`;
export const greyHintBackground = () => `#eeeeee`;

export const smallLetters = () => `font-size: 9px;`;
export const mediumLetters = () => `font-size: 12px;`;
export const bigLetters = () => `font-size: 14px;`;

export const boldClass = () => `.bold{font-weight: bold;}`;
export const italicClass = () => `.italic{font-style: italic;}`;

export const tableStyles = () => `
            table{
                border-collapse: collapse;
                border-spacing: 0;
                box-sizing: border-box;
                margin: 10px 0;
            }
            th{
                color: #ECE9E4;
                background-color: #908149;
                min-width: 50px;
                text-align: left;
            }
            tr{
                border-bottom: 1px solid ${greyLine()};
                vertical-align: top;
            }
            td, th{
                padding: 5px;
            }
`;