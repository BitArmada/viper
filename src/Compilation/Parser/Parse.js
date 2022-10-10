import * as Statements from './Statements.js';

const seperators = [
    //vars
    'kw_int',
    'kw_string',
    'kw_float',
    'kw_boolean',
    
    'semicolon',
    'open_round',
    'close_round',
    'open_curly',
    'close_curly',
    'open_square',
    'close_square',
];

function Parse(tokens){
    var statement = [];
    while(tokens.length > 0){
        if(seperators.includes(tokens[0])){
            Statements.matchStatement(statement);
            statement = [];
        }

        statement.push(tokens.shift());
    }
}

export default Parse;