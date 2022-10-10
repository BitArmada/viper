import * as Viper from './Viper.js';

const config = {
};

var app = new Viper.App(config);

async function loadScript(src){
    await fetch(src)
    .then(response => response.text()) 
    .then(text => {
        app.script(src, text);
        app.compile();
    });
}

function loadAll(){
    const scripts = document.querySelectorAll("script[type='text/viper']");

    for(var i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        loadScript(script.src);
    }
}

loadAll();