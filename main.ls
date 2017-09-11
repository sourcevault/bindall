
# ↓ ------- MAIN BIT ------- ↓ #

bind =  (fn,ob) -> -> fn.apply ob,arguments

main = (ob,methods,allNames,attachTo) ->


  len =  allNames.length + 1

  while (--len)

    name = allNames[len - 1]

    bound = bind methods[name] , ob

    attachTo[name] = bound

  attachTo

# ↑ ------- MAIN BIT ------- ↑ #


opts = (ob,methods) -> # fill all variables user choose


  attachTo = methods # default

  switch arguments.length

  # Apply to ..

  | 2 => # assume default opts # all functions  # mutates

    allNames = Object.getOwnPropertyNames methods

  | 3 => # non-default options


    userOption = arguments[2]

    if userOption.select or userOption.s # selective functions

      allNames = userOption.select

    else

      allNames = Object.getOwnPropertyNames methods

    if userOption.addto or userOption.a # which object to attach to

      attachTo = userOption.addto


  main do
    ob # object to bind .this to
    methods # extract fns from this object
    allNames # names of fns to extract as an array
    attachTo # attach bound methods to this object


module.exports = opts