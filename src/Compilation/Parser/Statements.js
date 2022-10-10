import Statement from "./Statement.js";

const defaultTypes = [
    'int',
    'string',
    'boolean',
];

class VariableDefinition extends Statement {
    constructor(type, name){
        super();
        this.type = "int"; // default type;
    }
}

function matchStatement(statement){
    const type = array[0].slice(3);

    if(defaultTypes.includes(type)){ // variable definition
        
    }

    return null;
}

export {
    matchStatement,
    VariableDefinition,
};