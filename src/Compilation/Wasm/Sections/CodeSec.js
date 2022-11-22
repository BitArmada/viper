import { FunctionDefinition } from '../../Parser/Statements.js';
import compile from '../Instructions/Instructions.js';
import WASM from '../WASM.js';

function getLocals(body){
    var locals = {};
    var code = [0];

    for(var i = 0; i < body.length; i++){
        if(body[i].constructor.name == 'VariableDefinition'){
            const type = WASM.toWasmType(body[i].type);
            if(locals[type] == undefined){
                locals[type] = 0;
            }
            locals[type]++;
        }
    }

    for(const id in locals){
        code[0]++;
        code.push(locals[id])
        code.push(WASM[id])
    }

    return code;
}

function func(f){
    var code = [
        ...getLocals(f.body)
    ];

    code.push(...compile(f.body));

    code.push(WASM.END);

    return code;
}

function CodeSec(AST){
    var code = [];

    var count = 0;

    for(var i = 0; i < AST.length; i++){
        if(AST[i].constructor == FunctionDefinition){
            code.push(...WASM.vector(func(AST[i])))
            count++;
        }
    }

    code = [
        WASM.CODESEC,
        ...WASM.vector([
            count,
            ...code
        ])
    ];

    console.log(code)

    return code;
}

export default CodeSec;