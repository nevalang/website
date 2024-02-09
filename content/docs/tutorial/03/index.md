---
title: Hello World
weight: 3
---

Isn't it odd to reach the "Hello, World!" moment only in the third lesson - the starting point that most tutorials begin with? Well, many peculiarities await us in Nevalang. However, we hope that by the end of this tutorial, they will no longer seem like oddities. Who knows, you might even start thinking, "Could it have been any other way?". Of course, we could have started with "Hello, World!" too, without delving into the intricate details of how every little thing works, but our goal, once again, is to achieve a deep understanding of how Nevalang is structured. And, actually, "Hello, World!" is not as straightforward as it seems.

```neva
const greeting string = 'Hello, World!'

component Main(start any) (stop any) {
	nodes {
		#bind(greeting)
		greeting Emitter<string>
		printer Printer<string>
		blocker Blocker<string>
	}
	net {
		in:start -> blocker:sig
		greeting:msg -> blocker:data
		blocker:data -> printer:msg
		printer:msg -> out:stop
	}
}
```

You might be thinking right now - "This is the most verbose 'Hello, World!' I've ever seen!" And, quite likely, you are correct. But don't rush to close the page; by dissecting this example, we'll learn how to write code more concisely. Without going through this example and jumping straight to the shorter version, we would never understand how the short version actually works.

## Entities, Constants

Have a look at this line:

```neva
const greeting string = 'Hello, World!'
```

Let's take a step back and ask ourselves, what exactly are packages? Well, they are what modules are made of. Alright, but what are they made of themselves? We've already seen that we can declare components. So, do packages consist of components? Among other things, yes. And what are components? Can we say that they are entities? Probably, yes. Thus, a package in Nevalang is a collection of _entities_. Entities come in four kinds, one of which we've already discussed - components. It's time to talk about the second type of entity - _constants_.

Declaring a constant begins with the keyword `const`, followed by an arbitrary name. Incidentally, an entity's name must be unique within its package. This means, for example, that a constant could not be named `Main` in our case, because there is already a component with that name. After the name comes the type expression; in this case, we simply refer to the familiar type `string`. Then comes the `=` symbol, and finally, the value of the constant - a so-called _literal_, in our case the string `'Hello, World!'`

```
const <name> <type_expr> = <literal_expr>
```

So, what exactly is a constant? It's an entity that describes a _static message_ - a message whose value is known at the time of writing the program (at _compile time_) and is directly present in the program's source code. The value of a constant must be explicitly set; it cannot be computed in any way. The values of constants are _immutable_ - if a constant describes the string message `"Hello, world!"` then it will remain so throughout the program. It's impossible for a constant to change in any way. Note that in Nevalang, there are no variables and, consequently, no mutable state.

## Emitter, Compiler Directives, Native Components, Runtime Functions and Config Messages

The next piece of code that deserves close attention is this block:

```neva
#bind(greeting)
greeting Emitter<string>
```

The second line should be clear to us - a `greeting` node that is an instance of the `Emitter` component _parameterized_ with `string`. But what about the first line?

```
#bind(greeting)
```

This is what's known as a _directive_ - a special instruction for the compiler. There are several directives, and each tells the compiler some information on how to correctly compile the program. To understand what the `#bind` directive does, let's look into the standard library's code, at the definition of the Emitter component (let's ignore `pub` keyword once again):

```
#extern(Emitter)
pub Emitter<T>() (msg T)
```

Firstly, the Emitter has no input ports! This is only possible in the standard library. The compiler will not allow us to do this ourselves - any component outside the standard library must have at least one input and one output port. Anyway, the Emitter is the only component without input ports. We need at least one such component, and soon we'll understand why. Let's move on to the `#extern` directive:

```neva
#extern(Emitter)
```

Now we're truly delving into the details, but only for a short while. Please, hang in there a little longer; it will get simpler afterward.

It was mentioned earlier that some components depend on others to perform some work. But if one component depends on another, and that one depends on another, how far does this chain of dependencies go? Surely it can't go on indefinitely?

Components in Nevalang are divided into two categories - _normal_ and _native_. Normal ones have a body - necessarily a network and, typically, some nodes. Native components do not have a body. In the source code, you will find only their interface. The implementation of such components is written in a lower-level language, which we will not discuss here. Such native components are called _runtime functions_; there is a whole library of such components in the runtime, and the compiler is aware of it.

A mechanism is needed to tell the compiler that a certain bodyless component, like Emitter, needs to be _linked_ with a specific runtime function in the runtime, let's suppose it is also called Emitter. How is this done?

To solve this problem, the `#extern` directive was created. It literally tells the compiler, "look, this component has no implementation in the source code; it is implemented directly in the runtime."

Going back to our `#bind(greeting)`

When the runtime launches a native component, it can pass to it an initialization parameter - a message that can contain absolutely anything. The component can remember this message and use it later in its operation. Such a message is called a _configuration message_.

`Emitter` is a component whose task is to send the same message to its output port in an infinite loop. Since it has no input ports, it has no way to get this message other than from its configuration.

A curious reader might wonder why `Emitter` couldn't be given input ports. The reason is that we need a mechanism for sending static messages, that is, those declared as constants. These messages do not come from the output ports of other components but are declared in the source code. We need to refer the `Emitter` component to "look, here's the message to distribute to everyone".

Finally, let's return to `#bind`. Note that if `#extern` applies to components, then `#bind` applies to nodes. Moreover, it applies only to those nodes instantiated from native components. This is precisely the way to tell the compiler "this runtime function needs to be launched with this configuration message". In `bind`, a _reference_ to a constant is passed, in this case, `greeting`.