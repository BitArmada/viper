import { FunctionDefinition } from '../../Parser/Statements.js';
import FunctionType from './FunctionType.js';
import WASM from '../WASM.js';

function matchType(func, table){
    // get argument types
    var argtypes = [];
    for(var j = 0; j < func.args.length; j++){
        argtypes.push(func.args[j].type);
    }

    for(var i = 0; i < table.length; i++){
        if(
            table[i].returnType == func.returnType && 
            JSON.stringify(argtypes) == JSON.stringify(table[i].arguments)
        ){
            return i;
        }
    }

    // add to table
    table.push(new FunctionType(
        func.returnType,
        argtypes
    ));

    return false;
}

function typeToWasm(type){
    return WASM[WASM.toWasmType(type)];
}

function FuncTypesec(AST){
    var typesec = [];
    var funcsec = [];
    var table = [];
    
    function iterate(AST){
        for(var i = 0; i < AST.length; i++){
            if(AST[i].constructor == FunctionDefinition){
                // match the function type to the table
                var index = matchType(AST[i], table);
    
                if(!index){
                    // create type for function
                    var args = AST[i].args.map((arg)=>{
                        return typeToWasm(arg.type);
                    });
    
                    var returnType = typeToWasm(AST[i].returnType);
    
                    typesec.push(
                        0x60, // function
                        ...WASM.vector(args), // args
                        ...WASM.vector([returnType]), // return
                    );
    
                    funcsec.push(table.length-1);
                }else{
                    funcsec.push(index);
                }
            }
            iterate(AST[i].body);
        }
    }

    iterate(AST);

    typesec = [
        WASM.TYPESEC, // type section
        ...WASM.vector([
            table.length,
            ...typesec
        ])
    ];

    funcsec = [
        WASM.FUNCSEC, // function section
        ...WASM.vector([
            funcsec.length,
            ...funcsec
        ])
    ];
    return [table, typesec, funcsec];
}


export default FuncTypesec;