# bindall ( ob , fns  , options )

#### API
- `ob` - Object to bind methods to.
- `fns` - is an object whose values get fixed bound to `ob`

*optional*

- `options` 

  - `select` - Array of string providing names of functions attached to *fns* to bind - in case when binding needs to be done selectively.

  - `addto` - object to bind the newly created bound methods to. Using this option means `fns` object is **not** mutated and the original methods attached to `fns` is kept in place.


#### Install

```
npm install @sourcevault/bindall
```

#### Internals

- [reassign](https://github.com/sourcevault/bindall/blob/7e6208f6157b19a43133822233ff65aee130e274/main.ls#L1) ```.this``` to fixed object for selected functions

- by **default** [mutates](https://github.com/sourcevault/bindall/blob/7e6208f6157b19a43133822233ff65aee130e274/main.ls#L11) `fns` that holds the functions. To prevent mutation use the `addto` option.

- Other implementation ( [lodash](http://devdocs.io/lodash~4/index#bindall), [underscore](http://underscorejs.org/#bindall) ) of `bindall` do not provide options to control **what** `fns` is bound *to*. They also lack the ability to prevent mutation when needed.



#### Examples

|[View in ES5](https://github.com/sourcevault/bindall/tree/master) |
| --- |

- . . binding all functions in object


```livescript

bindall = require "@sourcevault/bindall"

log = !-> console.log @

# purpose of this excercise is we want access to ob.fuel

ob = 
  fuel:"coffee"
  fns:
    foo:log

ob.fns.foo! # { foo: [Function: log] } # cannot access ob.fuel  :(

bindall ob,ob.fns # [WARNING] → will mutate ob.fns

ob.fns.foo! 

# { fuel: 'coffee', fns: { foo: [Function] } } # can access .fuel now :)

```
- . . for applying to a subset number of functions

```livescript
ob = 
  fuel:"coffee"
  fns:
    foo:log
    bar:log

# ↓ only ob.fns.bar is bound due to using select option ↓

bindall ob ,ob.fns,(select:["bar"])

ob.fns.bar!

# { fuel: 'coffee', fns: { foo: [Function: log] , bar: [Function] } }

# ↓ foo is not bound as expected ↓

ob.fns.foo! # {fns: { foo: [Function: log] , bar: [Function] }}


```

* .. to prevent **mutating** original object 

```livescript
ob = 
  fuel:"coffee"
  fns:
    foo:log
    bar:log

boundfns = bindall ob , ob.fns , ( select:["bar"], addto:[] )

# ↓ boundfns contains the newly minted bound fns ↓

boundfns.bar! # { fuel: 'coffee', fns: { log: [Function] , bar: [Function] }}

# ↓ original object unchanged ↓

ob.fns.bar!

# {fns: { foo: [Function: log], bar: [Function: log] } }

```

**Notes on Immutability**

<center>
*If a tree falls in a forest and no one is around to hear it, does it make a sound ?*
</center>

<br>

Passing an `[]` object to the `addto` option makes bindall immutable - in the sense that `[]` is mutated and the original object from which the methods were extracted is untouched. 

This is useful . .
- . . if the functions being extracted from is an external object, 

- . . when we need to add our bound fuction to an independent object of our choosing.

bindall that mutates is dangerous and should be used with caution. The main usecase for bindall that mutates the extracting object is within the enclave of constructor objects.

### Updates and API change

- `0.2.0` changed `selected` to `option` to expand functionality. Third argument is an object instead of an array and the previous functionality of `selected` is now passed as value to `select` key in `option`. `addto` allows control of what object to attach thee newly created fuctions to.

- `0.1.0` [readme](https://github.com/sourcevault/bindall/tree/0.1.0)

## License
 
Code and document released under MIT Licence, see [LICENSE](https://github.com/sourcevault/bindall/blob/livescript/LICENCE) for details.

