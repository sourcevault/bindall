bindall = require "./main.js"

process.exitCode = 0

log = -> @fuel

# TEST 1

ob1 =
  fuel:"coffee"
  fns:
    foo:log
    bar:log

bindall ob1 , ob1.fns


if not ((ob1.fns.foo!) is "coffee") and ((ob1.fns.bar!) is "coffee")

  process.exitCode = 1

# TEST 2

ob2 =
  fuel:"coffee"
  fns:
    foo:log
    bar:log

bindall ob2 , ob2.fns , select:["foo"]

if (not (ob2.fns.foo! is "coffee")) or ((ob2.fns.bar!) is "coffee")

  process.exitCode = 1

# TEST 3

ob3 =
  fuel:"coffee"
  fns:
    foo:log
    bar:log

stashed-fns = ob3.fns

ret = bindall do
  ob3
  ob3.fns
    select:["foo"]
    addto:[]

if not (ret.foo! is "coffee")

  process.exitCode = 1

if not (stashed-fns is ob3.fns)

  process.exitCode = 1