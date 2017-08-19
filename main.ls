bind =  (fn,ob) -> -> fn.apply ob,arguments

main = (ob,methods,allNames) !->

  len =  allNames.length + 1

  while (--len)

    name = allNames[len - 1]

    bound = bind methods[name] , ob

    methods[name] = bound

opts = (ob,methods) !->

  switch arguments.length

  # Apply to ..

  | 2 => # .. all functions

    allNames = Object.getOwnPropertyNames methods

  | 3 => # .. selective functions

    allNames = arguments[2]


  main ob , methods , allNames


module.exports = opts
