var x = {}

x.hello = "HEllO";

x.greet = "Good Morning"

data = 5;

x.he = function(data,callback){
    callback(5)
}

var f = x['he'];

f(data,function(x){
    console.log(x)
})

console.log(x)

