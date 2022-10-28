import WASM from '../WASM.js';

const Instructions = {
    'Return': Return,
    'Constant': Constant,
    'Operation': Operation,
    'VariableReference': VariableReference,
};

function Return(s){
    var bin = [
        ...compile(s.body),
    ];
    return bin;
}

function Constant(s){
    return [
        WASM.i32const,
        s.value
    ];
}

function VariableReference(s){
    return [
        WASM.localget,
        s.id
    ];
}

function Operation(s){
    switch (s.operation){
        case 'add':
            return [
                ...compile(s.a),
                ...compile(s.b),
                WASM.add
            ];
            break;
    }
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