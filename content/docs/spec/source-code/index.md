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

A file that describes which version of the language this module supports and contains a list of its _dependencies_.

## Module Dependencies

Every module besides `std` has dependencies, at least `std`. Modules define dependencies by specifing their paths and versions. Every dependency module can have a local alias.

## Package

A package is a set of _files_ located in the same directory. The name of a package is the path to its directory from the module's root. All _entities_ in a package form a single namespace, so they must have names names that are unique in the entire package. An entity can refer to entities described in other files in the same package without having to import it.

## Executable Package

A package without _public_ entities and with a _main_ component.

## File

A File is a set of _imports_ and _entities_. Unlike a package, a file is not a namespace itself, but imports declared inside one file are not visible inside another. There's no restriction on how entities ahould be grouped in files inside a package.

## Imports

Imports are used to access entities defined in other packages. Imports declared in one file are not visible inside another. An import consists of a _module reference_ and a _package name_. For example, `std:http/net` is an import of the package `http/net` from the module `std`. Only _public_ entities can be imported.

## Entities

Entities are abstractions for creating programs. They are either _private_ or _public_. They are private by default and can be made public using the `pub` keyword. Every entity has a name that is unique across the package. Entities are _referenced_ by _entity references_.

There are four _kinds_ of entities (from simple to complex):

1. _Type_
2. _Interface_
3. _Constant_
4. _Component_

## Entity Reference

An entity reference consists of an optional package name and the name of the referenced entity. The package name can be omitted if the referenced entity either exists in the same package or in `std/builtin`. If an entity in the current package has the same name as an entity in builtin, it _shadows_ (overrides) it.

## Type Entity

Type entities (type definitions) consist of an optional list of _type parameters_ followed by an optional _type expression_ that is called the _body_.

## Base Type

A type definition without a body is assumed to be of the type _base_. The compiler is aware of base types and will throw an error if a non-base type has no body. Base types are only allowed inside the `std/builtin` package. Some base types can be used inside _recursive type definitions_.

## Recursive Type Definition

A recurcsive type definition happens when a type refers to itself inside its definition. Example: `type l list<l>`. In this case `list` must be a base type that supports recursive definitions. The compiler knows which types support recursion and which do not.

## Type Parameters (Generics)

Every type paremeter has a name that must be unique across all other type parameters in it's definition and constraint.

## Type Parameter Constraint

A constraint is a type expression that is used as a _supertype_ to ensure _type compatibility_ between a _type argument_ and the corresponding parameter. If no constraint is explicitly defined, `any` is implicitly used.

## Type Parameters and Arguments Compatibility

Argument `A` is compatible with parameter `P` if there's a subtyping relationship of the form `A <: C` where`C` is a constraint of `P`. If there's several parameters/arguments, every one of them must be compatible. The number of arguments must always be equal to the number of parameters.

## Type Expression

There are two  _kinds_ of type expressions:

1. Instantiation expressions
2. Literals expressions

Type expressions can be infinitely nested. The process of reducing type expressions is called _type resolving_. A resolved type expression is an expression that cannot be reduced to a more simple form.

## Type Instantiation Expression

A type instantiation expression consists of an _entity reference_ (that must refer to an existing type definition or type parameters) and an optional list of _type arguments_. Type arguments themselves are arbitrary type expressions (they follows the same rules described above).

## Literal Type Expression

Type expressions that cannot be described in an instantiation form.

## Interface Definition

An interface is a _component signature_ that describes an _abstract component_ - its input and output _ports_ and optional type parameters. Interfaces are used in combination with _dependency injection_ and _abstract components_.

## Ports

A port definition consists of a _type expression_ describing the data-type that the port expects and a flag that describes whether the port is an _array_ or _single_ port. Type expressions can refer to an interface's type parameters. If no type paremeter is given then `any` is implicitly used.

## Single Ports

A single port is a port with one _slot_. Reference to such ports should not include a slot index.

## Array Ports

An array port is a port with multiple (up to 255) _slots_. Such ports must be referenced either via slot indexes or in _array-bypass connection_ expressions.

## Constant

A constant is an entity that consists of either a _message_ or an _entity reference_ to another constant. A message can include references to other constants. Constant messages can be infinitely nested. Constants may refer to imported constants from other packages. _Components_ are the only entities able to refer constants, that are not constants themselves - they can refer to constants via _compiler directives_ and from their _networks_.

## Component

A component always has an _interface_, and may optionally contain _compiler directives_, _nodes_ and a _network_. There are two kinds of components: _normal_ and _native_ ones.

## Main Component

An executable package must have a _component_ called `Main`. This component must follow a specific set of rules:

- It must be _normal_
- It must be _private_
- It must have exactly 1 inport `start`
- It must have exactly one outport `stop`
- Both ports must have type `any`
- It must have no _abstract nodes_

The main component doesn't have to have _network_ but it is usually the case because it's the _root_ component in the program.

## Native Components

A component without an implementation (without nodes and a network) must use the `#extern` directive to refer to a _runtime function_. Such a component is called a _native component_. Native components normally only exist within the `std` module, but there should be no forced restriction on this.

## Normal Component

A normal component is implemented in source code, i.e. it not only has an interface but also a network and usually also nodes. Normal components must never use the `#extern` directive.

## Nodes

Nodes are things that have inports and outports that can be connected in network. There are two kinds of nodes:

1. IO Nodes
2. Computational nodes

IO nodes are created implicitly. Every component has one `in` and one `out` node. The `in` node has outports corresponding to a component's interface's inports. Vice versa, the `out` node also has inports corresponding to a component's interface's inports.

Computational nodes are nodes that are instantiated from entities - components or interfaces. There's 2 types of computational nodes: concrete and abstract. Nodes that are instantiated from components are _concrete nodes_ and those that are instantiated from interfaces are _abstract nodes_.

Interfaces and component interfaces can have type parameters. In this case, a node must specify type arguments in an instantiation expression.

## Dependency Injection (DI)

Normal component can have an _abstract node_ that is instantiated from an interface instead of a component. Such components with abstract nodes need what's called dependency injection.

I.e. if a component has a dependency node `n` instantiated with interface `I` one must provide a concrete component that _implements_ this interface.

Dependency Injection can be infinitely nested. The `Main` component cannot use dependency injection.

## Component and Interface Compatability (Implementation)

A component _implements_ an interface (is _compatible_ with it) if type paremeters, inports and outports are compatible.

Type parameters are compatible if their amount, order and name are equal. Constraints of a component's type parameters must be compatible with the constraints of the corresponding interface's type parameter's constraints.

A component's inports are compatible with the interface's if:

1. Their amount is exactly equal
2. They have exactly the same names and _kind_ (array or single)
3. Their types are _compatible_ with (are _subtypes_ of) the corresponding interface's inports

Outports of a component are compatible with the interface's if:

1. Their amount is equal or larger (this is the only difference with inports)
2. Exactly the same names and _kind_
3. Their types are _compatible_

## Network

A network is a set of connections. Every connection consist of sender-side and receiver-side. Sender and receiver must be _compatible_. There are two types of connections: normal and array-bypass.

## Normal Connection

Normal connections can have several types of sender-side and receiver-side.

Sender-side:

1. _Port address_ (traditional)
2. _Constant reference_
3. _Primitive message literal_

Receiver-side:

1. List of inport-addresses
2. List of _deferred connections_

The sender-side of a normal connection can also have optional _struct selectors_.

## Sender-Side Struct Selectors

If the (_resolved_) type of the sender-side is _structure_, then it's possible to have selectors in it. Selectors are a list of strings, where each element represents a field in a struct. More than one selector means that there is a structure inside another structure. Selectors must be type safe, i.e. it must be possible to "unwrap" the structure each time the next selector is processed.

## Port Address

A port address consists of the name of the node it belongs to, the name of the referenced port, and an optionally the index of the slot. A slot index must be present only if the port address refers to an array-port.

## Constant Reference Sender

In a normal connection, not just the port address but also a reference to a constant entity (that must be available in the scope) could be a sender. This works exactly like an _emitter_ sender with a _bound_ constant.

## Primitive Message Literal Sender

This works almost like a constant reference sender, except instead of referencing some constant it references a message literal. Only primitive data-types are supported: booleans, numbers, strings and enumerator members.

## Array-Bypass Connection

A connection that connects all slots of some sender with all slots of some receiver. Sender and receiver must both be array-ports. A component is only allowed to bypass it's own inports. Such a connection always consists of two port addresses without slot indexes.

## Bound Constant

A constant that is referenced by a `bind` compiler directive.

## Compiler Directive

Special instructions for the compiler. Directives that must be supported by the compiler are `#extern`, `#autoports` and `#bind`.

## Runtime Function Overloading

Native components pass several arguments to the `#extern` directive to utilize overloading. These arguments are pairs separated by whitespace, they have the form `#extern(t1 f1, t2 f2, ... tN fN)` where `t` is a type and `f` is the name of a _runtime function_.

A component that uses overloading must have exactly one type parameter (it's name doesn't matter) of type `union`. Types that are referenced inside the directive must be members of that union.
