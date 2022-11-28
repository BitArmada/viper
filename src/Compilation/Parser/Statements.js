import Statement from "./Statement.js";

class VariableDefinition extends Statement {
    constructor(type, name, body, id) {
        super(body);
        this.type = type ?? "int"; // default type;
        this.name = name;
        this.id = id;
    }
}

class VariableReference extends Statement {
    constructor(name, id, type) {
        super();
        this.type = type;
        this.name = name;
        this.id = id;
    }
}

class VariableAssignment extends Statement {
    constructor(variable, body) {
        super(body);
        this.variable = variable;
    }
}

class Constant extends Statement {
    constructor(type, value) {
        super();
        this.type = type ?? "int"; // default type;
        this.value = value ?? 0;
    }
}

class FunctionDefinition extends Statement {
    static count = 0;
    constructor(type, name, args, body) {
        super(body);
        this.returnType = type ?? "void"; // default type;
        this.name = name;
        this.args = args;
        this.id = FunctionDefinition.count++;
    }
}

class FunctionCall extends Statement {
    constructor(name, args) {
        super();
        this.name = name;
        this.args = args;
        this.id = null;
        this.type = null;
    }
}

class Operation extends Statement {
    constructor(operation, a, b) {
        super();
        this.operation = operation;
        this.a = a;
        this.b = b;
    }
    get type() {
        if (this.a[0].type == this.b[0].type) {
            return this.a[0].type;
        } else {
            console.warn('type error: cannot add unmatching types');
        }
    }
}

class Return extends Statement {
    constructor(body) {
        super(body);
    }
}

class If extends Statement {
    constructor(condition, body) {
        super(body);
        this.condition = condition;
    }
}

class While extends Statement {
    constructor(condition, body) {
        super(body);
        this.condition = condition;
    }
}

class Break extends Statement {
    constructor(body) {
        super(body);
    }
}

class For extends Statement {
    constructor(initialization, condition, iteration, body) {
        super(body);
        this.initialization = initialization;
        this.condition = condition;
        this.iteration = iteration;
    }
}

class Class extends Statement {
    constructor(body, name) {
        super(body);
        this.name = name;
    }
}

class Import extends Statement {
    constructor(type, name, args) {
        super();
        this.type = type ?? 'void';
        this.name = name;
        this.args = args;
        this.id = FunctionDefinition.count++;
    }
}

class WasmSection extends Statement {
    constructor(instructions) {
        super();
        this.instructions = instructions;
    }
}

export {
    VariableDefinition,
    FunctionDefinition,
    FunctionCall,
    Constant,
    Operation,
    VariableReference,
    VariableAssignment,
    Return,
    If,
    While,
    Break,
    For,
    Import,
    Class,
    WasmSection,
};