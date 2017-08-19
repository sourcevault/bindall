var bind, main, opts;
bind = function(fn, ob){
  return function(){
    return fn.apply(ob, arguments);
  };
};
main = function(ob, methods, allNames){
  var len, name, bound;
  len = allNames.length + 1;
  while (--len) {
    name = allNames[len - 1];
    bound = bind(methods[name], ob);
    methods[name] = bound;
  }
};
opts = function(ob, methods){
  var allNames;
  switch (arguments.length) {
  case 2:
    allNames = Object.getOwnPropertyNames(methods);
    break;
  case 3:
    allNames = arguments[2];
  }
  main(ob, methods, allNames);
};
module.exports = opts;