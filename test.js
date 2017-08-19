var bindall, check, ob, ob1;
bindall = require("./main.js");
process.exitCode = 0;
check = function(){
  return this.fuel;
};
ob = {
  fuel: "coffee",
  fns: {
    foo: check,
    bar: check
  }
};
bindall(ob, ob.fns);
if (!(ob.fns.foo() === "coffee") && ob.fns.bar() === "coffee") {
  process.exitCode = 1;
}
ob1 = {
  fuel: "coffee",
  fns: {
    foo: check,
    bar: check
  }
};
bindall(ob1, ob1.fns, ["foo"]);
if (ob1.fns.bar() === "coffee") {
  process.exitCode = 1;
}