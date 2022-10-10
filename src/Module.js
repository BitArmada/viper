import Lex from './Compilation/Lexer/Lex.js';
import Parse from './Compilation/Parser/Parse.js';

class Module {
    constructor(text){
        this.text = text;
    }

    compile(){
        this.tokens = Lex(this.text);
        this.AST = Parse(this.tokens);

        console.log(this.AST);
    }
}

export default Module;