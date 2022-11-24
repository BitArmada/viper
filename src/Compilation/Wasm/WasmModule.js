import FuncTypesec from './Sections/FuncTypeSec.js';
import ImportSec from './Sections/ImportSec.js';
import ExportSec from './Sections/ExportSec.js';
import CodeSec from './Sections/CodeSec.js';
import WASM from './WASM.js';

class WasmModule {
    constructor(AST){
        this.wasm = [];
        [this.typeTable, this.typesec, this.funcsec] = FuncTypesec(AST);
        this.importsec = ImportSec(AST);
        this.exportsec = ExportSec(AST);
        this.codesec = CodeSec(AST);

        this.compile();
    }

    compile(){
        this.wasm.push(...WASM.versionStatement);
        this.wasm.push(...this.typesec);
        this.wasm.push(...this.importsec);
        this.wasm.push(...this.funcsec);
        this.wasm.push(...this.exportsec);
        this.wasm.push(...this.codesec);
    }
}

export default WasmModule;