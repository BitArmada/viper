
console.log = function(value){
    document.getElementById('data').innerHTML += '\n'+JSON.stringify(value, null, 4);
}

console.error = function(value){
    document.getElementById('data').innerHTML += '\n'+JSON.stringify(value, null, 4);
}