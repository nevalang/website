---
title: Source Code
weight: 1
---

This section provides an overview of Nevalang, focusing on its user and compiler perspectives, excluding the type-system which is covered separately. It doesn't delve into the execution details of Nevalang programs, but rather explores the abstractions present in the source code and their governing principles.

## Build

Build is set of Nevalang _modules_. Every module has unique _module reference_. One of the modules is _entry_ module.

## Module

Module is a set of _packages_. Every module has its own _manifest file_.

## Entry Module

Entry module is a root module for compilation. Every entry module must have at least one _executable_ package.

## Module Manifest

File that describes which version of language this module supports and list of its _dependencies_.

## Module Dependencies

Every module except `std` has dependencies, at least `std`. Module defines dependencies by specifing dependend module's path and version. Every dependency module can have local alias.

## Package

Package is a set of _files_ located in the same directory. Name of the package is the path to its directory from module's root. All _entities_ in a package forms single namespace so they must have unique names across package. An entity can refer to entities described in other files in the same package without _imports_.

## Executable Package

Package without _public_ entities and with _main_ component

## File

File is a set of _imports_ and _entities_. Unlike package file is not a namespace itself, but imports declared inside one file are not visible inside another. There's no restriction on how one should group entities in files inside a package.

## Imports

Imports allow to use entities defined in other packages. Imports declared in one file are not visible inside another. Import consist of _module reference_ and _package name_. E.g. `std:http/net` is an import of package `http/net` from module `std`. Only _public_ entities can be imported.

## Entities

Entities are abstractions for creating programs. They are either _private_ or _public_. They are private by default and can be made public by using `pub` keyword. Every entity has name that is unique across the package. Entities are _referenced_ by _entity references_.

There are four _kinds_ of entities (from simple to complex):

1. _Type_
2. _Interface_
3. _Constant_
4. _Component_

## Entity Reference

Entity reference consist of an optional package name and name of the referenced entity. Package name can be omitted if entity that we reference either exist in the same package or in `std/builtin`. If entity in current package has the same name as the one in the builtin, then it _shadows_ it.

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
