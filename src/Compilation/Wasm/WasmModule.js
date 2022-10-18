import WASM from './WASM.js';

class WasmModule {
    constructor(AST){
        this.wasm = [];
        this.functionTypes = [];

        this.compile();
    }

    compile(){
        this.wasm.push(...WASM.versionStatement);
    }
}

export default WasmModule;