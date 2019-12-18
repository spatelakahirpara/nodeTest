var express= require('express');
console.log("starting");
var app= express();
var bodyParser = require('body-parser');
const util= require('util');
var exec = util.promisify(require('child_process').exec);
var outputString;

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if('OPTIONS'==req.method)  {
        res.sendStatus(200);
    }
    else{
        next();
    }
});
app.use(bodyParser.json());


app.get('/buildPLB',async function(req,res,next){
    const {stdout,stderr} = await exec("~/Desktop/second.sh");
    outputString=stdout.toString(); 
    console.log("output from the script: "+outputString);
    const lines = outputString.split(/\r?\n/);
    lines.forEach((line) => {
        if(line.search( "FINAL_URL2" )!=-1){
        var length= "FINAL_URL".length;
        var url=line.slice(length+1);
        console.log(url);
        // res.send(outputString);
    }
       
    });
    res.send("no url found");
  }); 

  app.get('/test',async function(req,res,next){
    console.log("testing");
    res.send("testing");
    
  }); 

app.listen(3000);
async function call(req,res,next){
const {stdout,stderr} = await exec("~/Desktop/second.sh");
outputString=stdout.toString(); 
console.log("output from the script: "+outputString);
const lines = outputString.split(/\r?\n/);
lines.forEach((line) => {
    if(line.search( "FINAL_URL" )!=-1){
    var length= "FINAL_URL".length;
    var url=line.slice(length+1);
    console.log(url);
    // res.send(outputString);
}
   
});
console.log("no url found");
}
call();

process.on("unhandledRejection", (reason, p) => {
    console.log(reason + " ************** Unhandled Rejection at Promise ****************** ");
    console.log(p);
})
.on("uncaughtException", err => {
    console.log("Uncaught Exception thrown");
    console.log(err);
    process.exit(1);
});



