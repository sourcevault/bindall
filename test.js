var bindall, log, ob1, ob2, ob3, stashedFns, ret;
bindall = require("./main.js");
process.exitCode = 0;
log = function(){
  return this.fuel;
};
ob1 = {
  fuel: "coffee",
  fns: {
    foo: log,
    bar: log
  }
};
bindall(ob1, ob1.fns);
if (!(ob1.fns.foo() === "coffee") && ob1.fns.bar() === "coffee") {
  process.exitCode = 1;
}
ob2 = {
  fuel: "coffee",
  fns: {
    foo: log,
    bar: log
  }
};
bindall(ob2, ob2.fns, {
  select: ["foo"]
});
if (!(ob2.fns.foo() === "coffee") || ob2.fns.bar() === "coffee") {
  process.exitCode = 1;
}
ob3 = {
  fuel: "coffee",
  fns: {
    foo: log,
    bar: log
  }
};
stashedFns = ob3.fns;
ret = bindall(ob3, ob3.fns, {
  select: ["foo"],
  addto: []
});
if (!(ret.foo() === "coffee")) {
  process.exitCode = 1;
}
if (!(stashedFns === ob3.fns)) {
  process.exitCode = 1;
}