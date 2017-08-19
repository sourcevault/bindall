# bindall ( ob , fns  , selected )

#### API
- `ob` - Object to bind methods to.
- `fns` - is an object whose values get fixed bound to `ob`

*optional*

- `selected` - Array of string providing names of *selected* functions to bind - in case when binding needs to be done selectively.

#### Install

```
npm install @importvault/bindall
```

#### Internals

- [reassign](https://github.com/importvault/bindall/blob/7e6208f6157b19a43133822233ff65aee130e274/main.ls#L1) ```.this``` to fixed object for selected functions

- [mutates](https://github.com/importvault/bindall/blob/7e6208f6157b19a43133822233ff65aee130e274/main.ls#L11) `fns` that holds the functions

- Other implementation ( [lodash](http://devdocs.io/lodash~4/index#bindall), [underscore](http://underscorejs.org/#bindall) ) of `bindall` does not provide option to control **what** `fns` is bound *to*.

- 40 lines of [code](https://github.com/importvault/bindall/blob/7e6208f6157b19a43133822233ff65aee130e274/main.ls#L3-L13).



#### Examples

**. . binding all functions in object** 

|[ES5](https://github.com/importvault/bindall/tree/master) |
| --- |

```livescript

bindall = require "@importvault/bindall"

ob = 
  fuel:"coffee"
  fns:
    foo:!-> console.log @

ob.fns.foo! # { foo: [Function: foo] } # cannot access .fuel  :(

bindall ob,ob.fns # will mutate original object

ob.fns.foo! # { fuel: 'coffee', fns: { foo: [Function] } } # can access .fuel now !

```
**. . for applying to a subset number of functions**

|[ES5](https://github.com/importvault/bindall/tree/master) |
| --- |

```livescript

ob = 
  fuel:"coffee"
  fns:
    foo:!-> console.log @
    bar:!-> console.log @


bindall ob , ob.fns , ["bar"]

ob.fns.bar! # { fuel: 'coffee', fns: { log: [Function] , bar: [Function] } }  

ob.fns.foo! # { fns: { log: [Function] , bar: [Function] } }  

```


## License

Code and document released under MIT Licence, see [LICENSE](https://github.com/importvault/bindall/blob/livescript/LICENCE) file.