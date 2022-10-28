import Statement from "./Statement.js";

class VariableDefinition extends Statement {
    constructor(type, name, body, id){
        super(body);
        this.type = type ?? "int"; // default type;
        this.name = name;
        this.id = id;
    }
}

class VariableReference extends Statement {
    constructor(name, id){
        super();
        this.name = name;
        this.id = id;
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
    static count = 0;
    constructor(type, name, args, body){
        super(body);
        this.returnType = type ?? "void"; // default type;
        this.name = name;
        this.args = args;
        this.id = FunctionDefinition.count++;
    }
}

class FunctionCall extends Statement {
    constructor(name, args){
        super();
        this.name = name;
        this.args = args;
    }
}

class Operation extends Statement {
    constructor(operation, a, b){
        super();
        this.operation = operation;
        this.a = a;
        this.b = b;
    }
}

class Return extends Statement {
    constructor(body){
        super(body);
    }
}

export {
    VariableDefinition,
    FunctionDefinition,
    FunctionCall,
    Constant,
    Operation,
    VariableReference,
    Return,
};