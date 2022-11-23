import WASM from '../WASM.js';

const Instructions = {
    'Return': Return,
    'Constant': Constant,
    'Operation': Operation,
    'VariableReference': VariableReference,
    'VariableDefinition': VariableDefinition,
    'FunctionCall': FunctionCall,
    'If': If,
};

function Return(s){
    var bin = [
        ...compile(s.body),
        WASM.RETURN
    ];
    return bin;
}

function Constant(s){
    return [
        WASM[WASM.toWasmType(s.type)+'const'],
        s.value
    ];
}

function VariableReference(s){
    return [
        WASM.localget,
        s.id
    ];
}

function VariableDefinition(s){
    return [
        ...compile(s.body),
        WASM.localset,
        s.id
    ]
}

function Operation(s){
    switch (s.operation){
        case 'add':
            return [
                ...compile(s.a),
                ...compile(s.b),
                WASM[WASM.toWasmType(s.type)+'add']
            ];
            break;
        case 'sub':
            return [
                ...compile(s.a),
                ...compile(s.b),
                WASM[WASM.toWasmType(s.type)+'sub']
            ];
            break;
        case 'le':
            return [
                ...compile(s.a),
                ...compile(s.b),
                WASM[WASM.toWasmType(s.type)+'le_s']
            ];
            break;
    }
}

function FunctionCall(s){
    return [
        ...compile(s.args),
        WASM.call,
        s.id
    ]
}

function If(s){
    return [
        ...compile(s.condition),
        WASM.IF,
        WASM.blocktype,
        ...compile(s.body),
        // WASM.i32,
        // WASM.i32const,
        // 42,
        // WASM.RETURN,
        // 0x05,
        // WASM.i32const,
        // 42,
        WASM.END,
    ];
}

function compile(statements){
    var code = [];

    for(var i = 0; i < statements.length; i++) {
        var func = Instructions[statements[i].constructor.name];
        if(func){
            code.push(
                ...func(statements[i])
            );
        }
    }

    return code;
}

export default compile;