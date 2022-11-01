import { FunctionDefinition } from '../../Parser/Statements.js';
import compile from '../Instructions/Instructions.js';
import WASM from '../WASM.js';

function func(f){
    var code = [
        1, //  0 locals
        1,
        0x7f,
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