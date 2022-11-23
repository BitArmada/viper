
function getFunctionIDs(AST, scope){
    for(var i = 0; i < AST.length; i++){
        if(AST[i].constructor.name == "FunctionDefinition"){
            scope[AST[i].name] = AST[i];
            getFunctionIDs(AST[i].body, scope)
        }
    }
}

function resolveFunctionCalls(AST, scope){
    if(!AST) return;

    for(var i = 0; i < AST.length; i++){
        if(AST[i].constructor.name == "FunctionCall"){
            AST[i].id = scope[AST[i].name].id;
            AST[i].type = scope[AST[i].name].returnType;
        }
        resolveFunctionCalls(AST[i].body, scope)
        resolveFunctionCalls(AST[i].a, scope)
        resolveFunctionCalls(AST[i].b, scope)
        resolveFunctionCalls(AST[i].condition, scope)
    }
}

function resolveFunctionIDs(AST, s){
    var scope = {} ?? s;
    getFunctionIDs(AST, scope);
    resolveFunctionCalls(AST, scope);
    console.log(scope);
}


export default resolveFunctionIDs;