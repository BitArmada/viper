import WASM from '../WASM.js';

function ImportSec(){
    var encoder = new TextEncoder('utf-8');
    let section = [];

    section = [
        WASM.IMPORTSEC,
        ...WASM.vector([
            0x01,
            // import memory
            ...WASM.vector(encoder.encode("env")),
            ...WASM.vector(encoder.encode("memory")),
            WASM.memtype,
            0x00,
            1
        ])
    ]

    return section;
}

export default ImportSec;