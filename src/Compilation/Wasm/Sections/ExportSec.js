import { FunctionDefinition } from '../../Parser/Statements.js';
import WASM from '../WASM.js';

function ExportSec(AST){
    var encoder = new TextEncoder('utf-8');
    var exports = [];
    var items = 0;

    for(var i = 0; i < AST.length; i++){
        if(AST[i].constructor == FunctionDefinition){
            exports.push(...WASM.vector(encoder.encode(AST[i].name)));
            exports.push(WASM.funcidx);
            exports.push(AST[i].id);
            items++;
        }
    }

    exports = [
        WASM.EXPORTSEC,
        ...WASM.vector([
            items,
            ...exports
        ])
    ];

    return exports;
}

export default ExportSec;