import Module from './Module.js';

class App {
    constructor(config) {
        this.modules = {};
    }

    script(src, text){
        this.modules[src] = new Module(text);
    }

    compile(){
        for(const id in this.modules){
            const module = this.modules[id];
            module.compile();
        }
    }
}

export default App;