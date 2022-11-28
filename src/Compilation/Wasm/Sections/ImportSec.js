import WASM from '../WASM.js';

var encoder = new TextEncoder('utf-8');

function Import(i){
    let bytes = [];

    // convert name to binary 
    const name = i.name.split('_');
    name.map((str)=>{
        bytes.push(...WASM.vector(encoder.encode(str)));
    });

    bytes.push(
        0x00,
        0x00,
    )

    return bytes
}

function ImportSec(AST){
    let section = [];

    let imports = [];

    for(var i = 0; i < AST.length; i++){
        if(AST[i].constructor.name == 'Import'){
            imports.push(Import(AST[i]));
        }
    }

    section = [
        imports.length+1,
        // import memory
        ...WASM.vector(encoder.encode("env")),
        ...WASM.vector(encoder.encode("memory")),
        WASM.memtype,
        0x00,
        1,
    ]

    imports.map((i)=>{
        section.push(...i)
    })

    section = [
        WASM.IMPORTSEC,
        ...WASM.vector(section)
    ]

    console.log(section)

    return section;
}

export default ImportSec;