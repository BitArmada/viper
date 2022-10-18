import * as Statements from './Statements.js';
import TOKENS from '../Lexer/Tokens.js';

const defaultTypes = {
    'kw_int': 'int',
    'kw_float': 'float',
    'kw_string': 'string',
    'kw_boolean': 'boolean',
};

const beginers = [
    //vars
    'kw_int',
    'kw_string',
    'kw_float',
    'kw_boolean',
    // 'open_round',
    // 'close_round',
    // 'open_curly',
    // 'close_curly',
    // 'open_square',
    // 'close_square',
];

function matchStatement(statement){

    if(statement.length == 0){
        return false;
    }

    if(!TOKENS[statement[0]]){
        var int = parseInt(statement[0], 10);
        if(int !== NaN){
            return new Statements.Constant('int', int);
        }
    }

    if(defaultTypes[statement[0]]){
        const type = defaultTypes[statement[0]];
        if (!TOKENS[statement[1]]){
            // next item is not a token
            if(statement.length == 2){

                // uninitialized variable definition
                return new Statements.VariableDefinition(type, statement[1], null);

            }else if(statement[2] == 'assign'){

                // variable definition with value
                var value = Parse(statement.slice(3));
                return new Statements.VariableDefinition(type, statement[1], value);

            }else if(statement[2] == 'open_round'){
                // function
                var body = statement.slice(5,-1);
                console.log(statement)
            }

        }
    }

    return false;
}

function next(tokens, name){
    var l = [];
    while(tokens.length > 0){
        if(tokens[0] == name){
            return l;
        }else{
            l.push(tokens.shift());
        }
    }
    return l;
}

function nextBegining(tokens){
    while(tokens.length > 0){
        if(beginers.includes(tokens[0])){
            return tokens;
        }else{
            tokens.shift();
        }
    }
    return tokens;
}

function Parse(tokens){
    var statement = [];

    // create root node
    var tree = [];

    var identifiers = [];

    while(tokens.length > 0){

        if(tokens[0] == undefined){
            tokens.shift();
            continue;
        }else if(!TOKENS[tokens[0]]){
            var int = parseInt(tokens[0], 10);
            if(int){
                tokens.shift();
                tree.push(
                    new Statements.Constant('int', int)
                );
            }else{
                // identifier
                var name = tokens.shift();

                if(tokens[0] == 'open_round'){
                    // arguments
                    var args = next(tokens, 'close_round');
                    var parsedArgs = [];
                    while(args.length > 0){
                        var arg = next(args, 'comma');
                        args.shift();
                    }
                    tokens.shift();
                    tree.push(
                        new Statements.FunctionCall(name, args)
                    );
                }
            }
        }

        tokens = nextBegining(tokens);

        if(defaultTypes[tokens[0]]){
            const type = defaultTypes[tokens[0]];

            tokens.shift();

            if(!TOKENS[tokens[0]]){
                // next item is not a token
                const name = tokens[0];

                tokens.shift();

                if(tokens[0] == 'semicolon'){
                    value = [];
                    tree.push(
                        new Statements.VariableDefinition(type, name, value)
                    )
                }else if(tokens[0] == 'assign'){
                    // variable definition with value
                    tokens.shift();
                    var body = next(tokens, 'semicolon');
                    var value = Parse(body);
                    tree.push(
                        new Statements.VariableDefinition(type, name, value)
                    )
                }else if(tokens[0] == 'open_round'){
                    tokens.shift();
                    // arguments
                    var args = next(tokens, 'close_round');
                    var parsedArgs = [];
                    while(args.length > 0){
                        var arg = next(args, 'comma');
                        
                        args.shift();
                    }
                    tokens.shift();
                    tokens.shift();
                    var t = next(tokens, 'close_curly');
                    tokens.shift();
                    var body = Parse(t);
                    tree.push(
                        new Statements.FunctionDefinition(type, name, body)
                    )
                }
            }
        }
    }

    return tree;
}

export default Parse;