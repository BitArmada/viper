import Statement from "./Statement.js";

class VariableDefinition extends Statement {
    constructor(type, name, body){
        super(body);
        this.type = type ?? "int"; // default type;
        this.name = name;
    }
}

class Constant extends Statement {
    constructor(type, value){
        super();
        this.type = type ?? "int"; // default type;
        this.value = value ?? 0;
    }
}

class FunctionDefinition extends Statement {
    constructor(type, name, args, body){
        super(body);
        this.returnType = type ?? "void"; // default type;
        this.name = name;
        this.args = args;
    }
}

class FunctionCall extends Statement {
    constructor(name, args){
        super();
        this.name = name;
        this.args = args;
    }
}

export {
    VariableDefinition,
    FunctionDefinition,
    FunctionCall,
    Constant,
};