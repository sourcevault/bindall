var bind, main, opts;
bind = function(fn, ob){
  return function(){
    return fn.apply(ob, arguments);
  };
};
main = function(ob, methods, allNames, attachTo){
  var len, name, bound;
  len = allNames.length + 1;
  while (--len) {
    name = allNames[len - 1];
    bound = bind(methods[name], ob);
    attachTo[name] = bound;
  }
  return attachTo;
};
opts = function(ob, methods){
  var attachTo, allNames, userOption;
  attachTo = methods;
  switch (arguments.length) {
  case 2:
    allNames = Object.getOwnPropertyNames(methods);
    break;
  case 3:
    userOption = arguments[2];
    if (userOption.select) {
      allNames = userOption.select;
    } else {
      allNames = Object.getOwnPropertyNames(methods);
    }
    if (userOption.addto) {
      attachTo = userOption.addto;
    }
  }
  return main(ob, methods, allNames, attachTo);
};
module.exports = opts;