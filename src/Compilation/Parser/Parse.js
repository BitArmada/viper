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
    'kw_return',
    'kw_if',
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

function getBody(tokens){
    var n = 0;
    var output = [];
    while(tokens.length > 0){
        if(tokens[0] == 'open_curly'){
            n++;
        }else if(tokens[0] == 'close_curly'){
            n--;
        }
        if(n < 0){
            return output;
        }
        output.push(tokens.shift());
    }

    return output;
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
            var float = parseFloat(tokens[0]+tokens[1]+tokens[2]);
            if(int && tokens[1] != '.'){
                tokens.shift();
                tree.push(
                    new Statements.Constant('int', int)
                );
            }else if(tokens.length >= 3 && float){
                tokens.shift();
                tokens.shift();
                tokens.shift();
                tree.push(
                    new Statements.Constant('float', float)
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
                        parsedArgs.push(
                            ...Parse(arg, locals)
                        )
                        args.shift();
                    }
                    tokens.shift();
                    tree.push(
                        new Statements.FunctionCall(name, parsedArgs)
                    );
                    continue;
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
                }else if(tokens[0] == 'le'){
                    tokens.shift();
                    var left = Parse([name], locals);
                    var right = Parse([tokens[0]], locals);
                    tree.push(
                        new Statements.Operation('le', left, right)
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
        }else if(tokens[0] == 'add'){
            tokens.shift();
            let left = [tree.shift()];
            let right = Parse(next(tokens, 'semicolon'), locals);
            console.log(left, right)
            tree.push(
                new Statements.Operation('add', left, right)
            )
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
                    var t = getBody(tokens);
                    console.log(t);
                    // var t = next(tokens, 'close_curly');
                    var body = Parse(t, flocals);
                    console.log(body);
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
        }else if(tokens[0] == 'kw_if'){
            tokens.shift();
            tokens.shift();
            var condition = next(tokens, 'close_round');
            condition = Parse(condition, locals);
            tokens.shift();
            tokens.shift();
            var body = next(tokens, 'close_curly');
            body = Parse(body, locals);
            tree.push(
                new Statements.If(condition, body)
            )
        }
    }

    return tree;
}

export default Parse;