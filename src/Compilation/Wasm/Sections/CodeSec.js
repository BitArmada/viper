import { FunctionDefinition } from '../../Parser/Statements.js';
import compile from '../Instructions/Instructions.js';
import WASM from '../WASM.js';

function func(f){
    var code = [
        0, //  0 locals
        // 0x41,
        // 2,
        // 0x20, // get var
        // 0x00,
        // 0x6A, // add
        // WASM.END
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