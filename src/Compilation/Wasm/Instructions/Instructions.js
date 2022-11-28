import WASM from '../WASM.js';

const Instructions = {
    'Return': Return,
    'Constant': Constant,
    'Operation': Operation,
    'VariableReference': VariableReference,
    'VariableDefinition': VariableDefinition,
    'VariableAssignment': VariableAssignment,
    'FunctionCall': FunctionCall,
    'If': If,
    'While': While,
    'For': For,
    'Class': Class,
    'Break': Break,
    'WasmSection': WasmSection,
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
        ...(s.type == 'int') ? (WASM.Leb128(s.value)) : ([s.value])
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

function VariableAssignment(s){
    return [
        ...compile(s.body),
        WASM.localset,
        s.variable.id,
    ];
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
        case 'mul':
            return [
                ...compile(s.a),
                ...compile(s.b),
                WASM[WASM.toWasmType(s.type)+'mul']
            ];
            break;
        case 'div':
            return [
                ...compile(s.a),
                ...compile(s.b),
                WASM[WASM.toWasmType(s.type)+'div']
            ];
            break;
        case 'lt':
            return [
                ...compile(s.a),
                ...compile(s.b),
                WASM[WASM.toWasmType(s.type)+'lt_s']
            ];
            break;
        case 'gt':
            return [
                ...compile(s.a),
                ...compile(s.b),
                WASM[WASM.toWasmType(s.type)+'gt_s']
            ];
            break;
        case 'le':
            return [
                ...compile(s.a),
                ...compile(s.b),
                WASM[WASM.toWasmType(s.type)+'le_s']
            ];
            break;
        case 'ge':
            return [
                ...compile(s.a),
                ...compile(s.b),
                WASM[WASM.toWasmType(s.type)+'ge_s']
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
    let cond = compile(s.condition);
    labels++;
    let body = compile(s.body);
    labels--;
    return [
        ...cond,
        WASM.IF,
        WASM.blocktype,
        ...body,
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

function While(s){
    labels += 2;
    let condition = compile(s.condition)
    let body = compile(s.body);
    labels -= 2;
    return [
        WASM.block, WASM.blocktype,
            WASM.loop, WASM.blocktype,
                ...condition,
                WASM.i32const, 0, WASM.i32eq, // not condition
                WASM.br_if, 0x01,
                ...body,
                WASM.br, 0x00,
            WASM.END,
        WASM.END
    ];
}

function For(s){
    labels++;
    let init = compile(s.initialization);
    labels++;
    var out =  [
        WASM.block, WASM.blocktype,
            ...init,
            WASM.loop, WASM.blocktype,
                ...compile(s.condition),
                WASM.i32const, 0, WASM.i32eq, // not condition
                WASM.br_if, 0x01,
                ...compile(s.body),
                ...compile(s.iteration),
                WASM.br,
                0x00,
            WASM.END,
        WASM.END
    ];
    labels-=2;
    return out;
}

function Break(s){
    console.log(labels)
    let out = [
        WASM.br, labels-1
    ];
    labels = 0;
    return out;
}

function Class(s){
    return compile(s.body);
}

function WasmSection(s){
    return s.instructions.map((i)=>{
        if(i in WASM){
            return WASM[i];
        }else{
            return parseInt(i, 16);
        }
    })
}

var labels = 0;

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