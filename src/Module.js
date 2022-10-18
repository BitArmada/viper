import Lex from './Compilation/Lexer/Lex.js';
import Parse from './Compilation/Parser/Parse.js';
import Compile from './Compilation/Wasm/Compile.js';

class Module {
    constructor(text){
        this.text = text;
    }

    compile(){
        this.tokens = Lex(this.text);
        this.AST = Parse(this.tokens);
        this.Wasm = Compile(this.AST);
        this.Wasm = Module.createBufferSource(this.Wasm);//[0,97,115,109,1,0,0,0,1,7,1,96,2,127,127,1,127,3,2,1,0,7,7,1,3,97,100,100,0,0,10,9,1,7,0,32,0,32,1,106,11]);

        console.log(this.AST);

        console.log(this.Wasm);

        this.run();
        // document.getElementById('data').innerHTML = JSON.stringify(this.AST, null, 4);
    }

    run(){
        const importObject = {
            module: {},
            env: {
                memory: new WebAssembly.Memory({ initial: 256 }),
            }
        };
        
        WebAssembly.instantiate(this.Wasm, importObject).then((wasm)=>{
            // console.log(wasm.instance.exports.add(10,5));
            console.log(wasm.instance);
        });
    }

    static createBufferSource(array){
        const arrayBuffer = new ArrayBuffer(array.length);
        const data = new Uint8Array(array, arrayBuffer);
        return data;
    }
}

export default Module;