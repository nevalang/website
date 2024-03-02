---
title: Specification (WIP)
weight: 6
---

## Build

Build is set of Nevalang _modules_. Every module has unique _module reference_. One of the modules is _entry_ module.

## Module

Module is a set of _packages_. Every module has its own _manifest file_.

## Entry Module

Entry is a root module for compilation algorithm. Every entry module must have _executable_ package.

## Module Reference

Entity that refers to a module via _path_ and _version_.

## Module Manifest

File that describes which version of language this package supports and list of its _dependencies_.

## Module Dependencies

Every module except `std` has dependencies. At least `std`. Dependency is a key-value pair where key is local _alias_ for module and value is a _reference_.

## Package

Package is a set of _files_ located in the same directory. Name of the package is the path to its directory from module's root. All _entities_ that exist in a single package must have unique names.

## File

File is a set of _import declarations_ and _entity definitions_.

## Import Declarations

Imports are a map where key is file-level alias and value is an Import Declaration. Import Declaration consist of module and package names. Module name matches existing alias in current module's manifest's dependencies section.

## Entity Definitions

Entity is language abstraction for writing programs. Entities are either _private_ or _public_. There are four _kinds_ of entities (from simple to complex):

1. _Type Definition_
2. _Interface Definition_
3. _Constant Definition_
4. _Component Definition_

## Visibility Scope

Entities that are _private_ cannot be imported from other packages. _Public_ on the other hand can be imported. Entities are private by default unless special modificator is explicitly used.

## Type Definition

Type definition consist of an optional list of _type parameters_ followed by optional _type expression_ that is called _body_. Type definition without body means _base_ type.

## Base Type

Type definition without a body. Such type definition assumes that compiler is aware of existing this type and knows how to handle it. Such types are only allowed inside `std/builtin` package. These are base types in official Nevalang implementation:

## Type Parameters

Type paremeter consist of its name that must be unique across all other type parameters in definition and constrant. Constraint is a type expression that is used as _supertype_ to ensure _type compatibility_ between _type argument_ and type parameter.

## Type Parameters and Arguments Compatibility

Argument `A` compatible with parameter `P` if there's subtyping relation of form `A <: C` where`C` is a constraint of `P`. If there's several parameters/arguments, every one of them must be compatible. Count of arguments must always be equal to the count of parameters.

## Type Expression

There is 2 _kinds_ of type expressions:

1. Instantiation expressions
2. Literals expressions

Type expressions can be infinitely nested. Process of reducing the type expression called _type resolving_. Resolved type expression is an expression that cannot be reduced to more simple form.

## Type Instantiation Expression

Such expression consist of _entity reference_ (that must refer to existing type definition or type parameter) and optional list of _type arguments_. Type arguments themselves are arbitrary type expressions (they follows the same rules described above).

## Literal Type Expression

Special cases that cannot be described in a instantiation form. Their list depends on implementation but examples from official Nevalang are `struct`, `enum` and `union`.

## Interface Definition

Interface is a _component_ signature, describing it's input and output format. Interface could be though of as a component without _body_ i.e. without implementation. Interface compatibility is implicit. One should not explicitly spell "implements" and instead just pass dependency into _DI_. Interface as an entity consists of two things: _type parameters_ and an _IO definition_.

## IO Definition

IO means Input-Output. IO Object describes input and output port of a (possibly abstract) component. Both inports and outports are maps where key is a name of the port (should be unique across all other ports on the same side) and the value is _port definition_.

## Port Definition

Port definition consist of a _type expression_ describing the data-type port expects and is-array flag that describes whether the port is an _array_ or _single_ port. Type expression can refer to interface's type parameters.

## Single Ports

Single port is port with one slot. Reference to such ports should not include slot index.

## Array Ports

Array port is port with multiple (up to 255) slots. They serve for situations when one need to aggregate data of the same type from several (arbitrary count) sources.

## Constant Definition

Constant is an entity that consist of either _message_ or _entity reference_ to other constant. Message can include references to other constants. Constant messages can be infinitely nested. Constants may refer imported constants from other packages. _Components_ are only entities that can refer constants, that are not constants themselves - they can refer to constants via _compiler directives_ and from their _networks_.

## Component Definition

Component always has _interface_ and optional _compiler directives_, _nodes_ and _network_. There are two kinds of components: _normal_ and _native_ ones.

## Native Components

Component without implementation (without nodes and network) must use `#extern` directive to refer to _runtime function_. Such component called _native component_. Native components normally only exist inside `std` module, but there should be no forced restriction for that.

## Normal Component

Normal component is implemented in source code i.e. it has not only interface but also nodes and network, or at least just network. Normal components must never use `#extern` directive.

### Nodes

Normal component uses other components and interfaces to create nodes for its network. Those _entities_ are _dependencies_ of a component. Nodes that are instantiated from components are _concrete nodes_ and those that instantiated from interfaces are _abstract nodes_.

#### Dependency Injection (DI)

Normal component can have abstract node that is instantiated from an interface instead of a concrete component. Such components needs what's called dependency injection at the instantiation time in order to get them work. I.e. if a component has dependency node `n` instantiated with interface `I` one must provide concrete component that _implements_ this interface. Dependency Injection can be infinitely nested. Component `Main` cannot use dependency injection.

### Network

Network is a set of connections. There is 2 types of connections: normal and array-bypass

### Normal Connection

Normal connection connects one (in) _port-slot_ to another (out).

### Array Bypass Connection
