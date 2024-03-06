---
title: Source Code
weight: 1
---

This section provides an overview of Nevalang, focusing on its user and compiler perspectives, excluding the type system which is covered separately. It doesn't delve into the execution details of Nevalang programs, but rather explores the abstractions present in the source code and their governing principles.

## Build

A build is a set of Nevalang _modules_. Every module has a unique _module reference_. One of the modules is the _entry_ module.

## Module

A module is a set of _packages_. Every module has its own _manifest file_.

## Entry Module

The entry module is the root module for compilation. Every entry module must have at least one _executable_ package.

## Module Manifest

File that describes which version of language this module supports and contains list of its _dependencies_.

## Module Dependencies

Every module besides `std` has dependencies, at least `std`. Modules define dependencies by specifing their paths and versions. Every dependency module can have a local alias.

## Package

A package is a set of _files_ located in the same directory. The name of a package is the path to its directory from the module's root. All _entities_ in a package form a single namespace, so they must have names names that are unique in the entire package. An entity can refer to entities described in other files in the same package without having to import it.

## Executable Package

A package without _public_ entities and with a _main_ component.

## File

a File is a set of _imports_ and _entities_. Unlike a package, a file is not a namespace itself, but imports declared inside one file are not visible inside another. There's no restriction on how one should group entities in files inside a package.

## Imports

Imports are used to access entities defined in other packages. Imports declared in one file are not visible inside another. An import consists of a _module reference_ and a _package name_. For example, `std:http/net` is an import of the package `http/net` from module `std`. Only _public_ entities can be imported.

## Entities

Entities are abstractions for creating programs. They are either _private_ or _public_. They are private by default and can be made public using the `pub` keyword. Every entity has a name that is unique across the package. Entities are _referenced_ by _entity references_.

There are four _kinds_ of entities (from simple to complex):

1. _Type_
2. _Interface_
3. _Constant_
4. _Component_

## Entity Reference

An entity reference consists of an optional package name and the name of the referenced entity. The package name can be omitted if the referenced entity either exists in the same package or in `std/builtin`. If an entity in the current package has the same name as an entity in the builtin, it _shadows_ it.

## Type Entity

Type entities (type definitions) consist of an optional list of _type parameters_ followed by an optional _type expression_ that is called the _body_.

## Base Type

Type definition without body means _base_ type. Compiler is aware of base types and will throw error if non-base type has no body. Base types are only allowed inside `std/builtin` package. Some base types can be used inside _recursive type definitions_.

## Recursive Type Definition

If type refers to itself inside its own definition, then it's recursive definition. Example: `type l list<l>`. In this case `list` must be base type that supports recursive definitions. Compiler knows which types supports recursion and which do not.

## Type Parameters (Generics)

Every type paremeter has name that must be unique across all other type parameters in this definition and constrant.

## Type Parameter Constraint

Constraint is a type expression that is used as _supertype_ to ensure _type compatibility_ between _type argument_ and type corresponding parameter. If no constrained explicitly defined then `any` is implicitly used.

## Type Parameters and Arguments Compatibility

Argument `A` compatible with parameter `P` if there's subtyping relation of form `A <: C` where`C` is a constraint of `P`. If there's several parameters/arguments, every one of them must be compatible. Count of arguments must always be equal to the count of parameters.

## Type Expression

There is 2 _kinds_ of type expressions:

1. Instantiation expressions
2. Literals expressions

Type expressions can be infinitely nested. Process of reducing the type expression called _type resolving_. Resolved type expression is an expression that cannot be reduced to a more simple form.

## Type Instantiation Expression

Such expression consist of _entity reference_ (that must refer to existing type definition or type parameter) and optional list of _type arguments_. Type arguments themselves are arbitrary type expressions (they follows the same rules described above).

## Literal Type Expression

Type expressions that cannot be described in a instantiation form.

## Interface Definition

Interface is a _component signature_ that describes _abstract component_ - its input and output _ports_ and optional type parameters. Interfaces are used with _dependency injection_ and _abstract components_.

## Ports

Port definition consist of a _type expression_ describing the data-type port expects and a flag that describes whether the port is an _array_ or _single_ port. Type expression can refer to interface's type parameters. If no type paremeter given then `any` is implicitly used.

## Single Ports

Single port is port with one _slot_. Reference to such ports should not include slot index.

## Array Ports

Array port is port with multiple (up to 255) _slots_. Such ports must be referenced either via slot indexes or in _array-bypass connection_ expressions.

## Constant

Constant is an entity that consist of either _message_ or _entity reference_ to other constant. Message can include references to other constants. Constant messages can be infinitely nested. Constants may refer imported constants from other packages. _Components_ are only entities that can refer constants, that are not constants themselves - they can refer to constants via _compiler directives_ and from their _networks_.

## Component

Component always has _interface_ and optional _compiler directives_, _nodes_ and _network_. There are two kinds of components: _normal_ and _native_ ones.

## Main Component

Executable package must have _component_ called `Main`. This component must follow specific set of rules:

- Must be _normal_
- Must be _private_
- Must have exactly 1 inport `start`
- Must have exactly one outport `stop`
- Both ports must have type `any`
- Must have no _abstract nodes_

Main component doesn't have to have _network_ but it is usually the case because it's the _root_ component in the program.

## Native Components

Component without implementation (without nodes and network) must use `#extern` directive to refer to _runtime function_. Such component called _native component_. Native components normally only exist inside `std` module, but there should be no forced restriction for that.

## Normal Component

Normal component is implemented in source code i.e. it has not only interface but also nodes and network, or at least just network. Normal components must never use `#extern` directive.

## Nodes

Nodes are things that have inports and outports that can be connected in network. There's two kinds of nodes:

1. IO Nodes
2. Computational nodes

IO nodes are created implicitly. Every component have one `in` and one `out` node. Node `in` has outports corresponding to component's interface's inports. And vice versa - `out` node has inports corresponding to component interface's inports.

Computational nodes are nodes that are instantiated from entities - components or interfaces. There's 2 types of computational nodes: concrete and abstract. Nodes that are instantiated from components are _concrete nodes_ and those that instantiated from interfaces are _abstract nodes_.

Interfaces and component's interfaces can have type parameters. In this case node must specify type arguments in instantiation expression.

## Dependency Injection (DI)

Normal component can have _abstract node_ that is instantiated from an interface instead of a component. Such components with abstract nodes needs what's called dependency injection.

I.e. if a component has dependency node `n` instantiated with interface `I` one must provide concrete component that _implements_ this interface.

Dependency Injection can be infinitely nested. Component `Main` cannot use dependency injection.

## Component and Interface Compatability (Implementation)

Component _implements_ interface (is _compatible_ with it) if type paremeters, inports and outports are compatible.

Type parameters are compatible if their count, order and names are equal. Constraints of component's type parameters must be compatible with the constraints of the corresponding interface's type parameter's constraints.

Component's inports are compatible with the interface's if:

1. Amount is exactly equal
2. They have exactly the same names and _kind_ (array or single)
3. Their types are _compatible_ (are _subtypes_ of) with the corresponding interface's inports

Outports of a component are compatible with the interface's if:

1. Amount is equal or more (this is only difference with inports)
2. Exactly the same names and _kind_
3. Their types are _compatible_

## Network

Network is a set of connections. Every connection consist of sender-side and receiver-side. Sender and receiver must be _compatible_. There is 2 types of connections: normal and array-bypass.

## Normal Connection

Normal connection can have several types of sender-side and receiver-side.

Sender-side:

1. _Port address_ (traditional)
2. _Constant reference_
3. _Primitive message literal_

Receiver-side:

1. List of inport-addresses
2. List of _deferred connections_

Sender-side in of a normal connection can also have optional _struct selectors_.

## Sender-Side Struct Selectors

If (_resolved_) type of sender-side is _structure_, then it's possible to have selectors in it. Selectors are list of strings, where each element means field in a struct. More than one selector means that there is a structure inside structure. Selectors must be type safe. I.e. it must be possible to "unwrap" structure each time we process next selector.

## Port Address

Port Address consist of name of the node, name of the port and optional index of the slot. Slot index must be present only if port address refers to array-port.

## Constant Reference Sender

In normal connection not just port address but also reference to constant entity (that must be available in the scope) could be a sender. This works exactly like if there's _emitter_ sender with _bound_ constant.

## Primitive Message Literal Sender

This works almost like constant reference sender except instead of referencing some constant we simply use message literal. Only primitive data-types are supported: booleans, numbers, strings and enum members.

## Array-Bypass Connection

Connection that connects all slots of some sender with all slots of some receiver. Sender and receiver must both be array-ports. Component is only allowed to bypass it's own inports. Such connection always consist of two port addresses without slot indexes.

## Bound Constant

Constant that is referenced inside `bind` compiler directive

## Compiler Directive

Special instructions for compiler. Directives that must be supported by the compiler are `#extern`, `#autoports` and `#bind`.

## Runtime Function Overloading

Native components pass several arguments to `#extern` directive to utilize overloading. In this case arguments are pairs separated by whitespace, they have form `#extern(t1 f1, t2 f2, ... tN fN)` where `t` is a type and `f` is the name of a _runtime function_.

Component that uses overloading must have exactly one type parameter (it's name doesn't matter) of type `union`. Types that are referenced inside directive must be members of that union.
