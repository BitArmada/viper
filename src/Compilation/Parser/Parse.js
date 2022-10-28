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
    'kw_return'
    // 'open_round',
    // 'close_round',
    // 'open_curly',
    // 'close_curly',
    // 'open_square',
    // 'close_square',
];

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

function Parse(tokens, localVars){

    // create root node
    var tree = [];

    var identifiers = [];

    var locals = localVars ?? [];

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
                }else if(tokens[0] == 'add'){
                    tokens.shift();
                    var left = Parse([name], locals);
                    var right = Parse([tokens[0]], locals);
                    tree.push(
                        new Statements.Operation('add', left, right)
                    );
                }else if(tokens[0] == 'sub'){
                    tokens.shift();
                    var left = Parse([name], locals);
                    var right = Parse([tokens[0]], locals);
                    tree.push(
                        new Statements.Operation('sub', left, right)
                    );
                }else{
                    var type;
                    const id = locals.findIndex((x) => {
                        if(x.name === name){
                            type = x.type;
                            return true;
                        }
                    });
                    if(id == -1){
                        console.log('unknown variable reference: ' + name);
                    }
                    tree.push(
                        new Statements.VariableReference(name, id, type)
                    );
                }
            }
        }else if(tokens[0] == 'open_round'){
            tokens.shift();
            var value = next(tokens, 'close_round');
            value = Parse(value, locals);
            tree.push(...value);
        }

        tokens = nextBegining(tokens);

        if(defaultTypes[tokens[0]]){
            const type = defaultTypes[tokens[0]];

            tokens.shift();

            if(!TOKENS[tokens[0]]){
                // next item is not a token
                const name = tokens[0];

                tokens.shift();

                if(tokens[0] == 'semicolon' || tokens.length == 0){
                    var value = [];
                    const id = locals.length;
                    tree.push(
                        new Statements.VariableDefinition(type, name, value, id)
                    )
                    locals.push(tree[tree.length-1]);
                }else if(tokens[0] == 'assign'){
                    // variable definition with value
                    tokens.shift();
                    var body = next(tokens, 'semicolon');
                    var value = Parse(body);

                    const id = locals.length;

                    tree.push(
                        new Statements.VariableDefinition(type, name, value, id)
                    )
                    locals.push(tree[tree.length-1]);
                }else if(tokens[0] == 'open_round'){
                    tokens.shift();
                    // arguments
                    var args = next(tokens, 'close_round');
                    var parsedArgs = [];
                    var flocals = [];
                    while(args.length > 0){
                        var arg = next(args, 'comma');
                        parsedArgs.push(...Parse(arg));

                        flocals.push(parsedArgs[parsedArgs.length-1]);

                        args.shift();
                    }
                    tokens.shift();
                    tokens.shift();
                    var t = next(tokens, 'close_curly');
                    tokens.shift();
                    var body = Parse(t, flocals);
                    console.log(flocals)
                    tree.push(
                        new Statements.FunctionDefinition(type, name, parsedArgs, body)
                    )
                }
            }
        }else if(tokens[0] == 'kw_return'){
            tokens.shift();
            var value = next(tokens, 'semicolon');
            value = Parse(value, locals);
            tree.push(
                new Statements.Return(value)
            );
        }
    }

    return tree;
}

export default Parse;