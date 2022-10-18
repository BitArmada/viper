import WasmModule from "./WasmModule.js";

function Compile(AST) {
    var program = new WasmModule(AST);
    return program.wasm;
}

export default Compile;