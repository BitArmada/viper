
function getFunctionIDs(AST, scope){
    for(var i = 0; i < AST.length; i++){
        if(AST[i].constructor.name == "FunctionDefinition"){
            scope[AST[i].name] = AST[i].id;
            getFunctionIDs(AST[i].body, scope)
        }
    }
}

function resolveFunctionCalls(AST, scope){
    for(var i = 0; i < AST.length; i++){
        if(AST[i].constructor.name == "FunctionCall"){
            AST[i].id = scope[AST[i].name];
            console.log(AST[i])
        }
        resolveFunctionCalls(AST[i].body, scope)
    }
}

function resolveFunctionIDs(AST, s){
    var scope = {} ?? s;
    getFunctionIDs(AST, scope);
    resolveFunctionCalls(AST, scope);
    console.log(scope);
}


export default resolveFunctionIDs;