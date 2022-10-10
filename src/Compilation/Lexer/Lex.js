import TOKENS from './Tokens.js';

function charType(char){
    if(char.match(/^[ |\n]/)){
        return 'whitespace';
    }else if(char.match(/^[A-Za-z_]+$/)){
        return 'letter';
    }else if (char.match(/^[0-9]+$/)){
        return 'number';
    }else{
        return 'other';
    }
}

function getToken(str){
    for(const id in TOKENS){
        if(TOKENS[id] == str){
            return id;
        }
    }
}

function Lex(text){

    var tokens = [];

    var word = "";
    var lastType = 'whitespace';

    for(var i = 0; i < text.length; i++){
        var char = text[i];

        const type = charType(char);

        if(type !== lastType){
            const token = getToken(word);

            if(token){
                tokens.push(token);
            }else if(lastType !== 'whitespace'){
                tokens.push(word);
            }

            word = "";
        }
        
        word += char;

        lastType = type;
    }

    return tokens;
}

export default Lex;