bindall = require "./main.js"

process.exitCode = 0

check = -> @fuel

ob =
  fuel:"coffee"
  fns:
    foo:check
    bar:check

bindall ob , ob.fns


if not ((ob.fns.foo!) is "coffee") and ((ob.fns.bar!) is "coffee")

  process.exitCode = 1


ob1 =
  fuel:"coffee"
  fns:
    foo:check
    bar:check

bindall ob1 , ob1.fns , ["foo"]

if ((ob1.fns.bar!) is "coffee")

  process.exitCode = 1