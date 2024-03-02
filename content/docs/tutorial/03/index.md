---
title: Hello World
weight: 3
---

Isn't it odd to reach the "Hello, World!" moment only in the third lesson - the starting point that most tutorials begin with? Well, many peculiarities await us in Nevalang. However, we hope that by the end of this tutorial, they will no longer seem like oddities. Who knows, you might even start thinking, "Could it have been any other way?". Of course, we could have started with "Hello, World!" too, without delving into the intricate details of how every little thing works, but our goal, once again, is to achieve a deep understanding of how Nevalang is structured. And, actually, "Hello, World!" is not as straightforward as it seems.

Go to your `test/src` directory and replace content of the `main.neva` with this:

```neva
const greeting string = 'Hello, World!'

component Main(start any) (stop any) {
	nodes {
		#bind(greeting)
		emitter Emitter<string>
		blocker Blocker<string>
		printer Printer<string>
	}
	net {
		:start -> blocker:sig
		emitter:msg -> blocker:data
		blocker:data -> printer:data
		printer:sig -> :stop
	}
}
```

You might be thinking right now - "This is the most verbose 'Hello, World!' I've ever seen!" And, quite likely, you are correct. But don't rush to close the page; by dissecting this example, we'll learn how to write code more concisely. Without going through this example and jumping straight to the shorter version, we would never understand how the short version actually works.

Now run `neva run` and if everything is fine you should be able to see `Hello, World!` in the terminal.

## Entities, Constants

Have a look at this line:

```neva
const greeting string = 'Hello, World!'
```

Let's take a step back and ask ourselves, what exactly are packages? Well, they are what modules are made of. Alright, but what are they made of themselves? We've already seen that we can declare components. So, do packages consist of components? Among other things, yes. And what are components? Can we say that they are entities? Probably, yes. Thus, a package in Nevalang is a collection of _entities_. Entities come in four kinds, one of which we've already discussed - components. It's time to talk about the second type of entity - _constants_.

Declaring a constant begins with the keyword `const`, followed by an arbitrary name. Incidentally, an entity's name must be unique within its package. This means, for example, that a constant could not be named `Main` in our case, because there is already a component with that name. After the name comes the type expression; in this case, we simply refer to the familiar type `string`. Then comes the `=` symbol, and finally, the value of the constant - a so-called _literal_, in our case the string `'Hello, World!'`

```neva
const <name> <type_expr> = <literal_expr>
```

So, what exactly is a constant? It's an entity that describes a _static message_ - a message whose value is known at the time of writing the program (at _compile time_) and is directly present in the program's source code. The value of a constant must be explicitly set; it cannot be computed in any way. The values of constants are _immutable_ - if a constant describes the string message `"Hello, world!"` then it will remain so throughout the program. It's impossible for a constant to change in any way. Note that in Nevalang, there are no variables and, consequently, no mutable state.

## Compiler Directives

The next piece of code that deserves close attention is this block:

```neva
#bind(greeting)
emitter Emitter<string>
```

The second line should be clear to us - a `greeting` node that is an instance of the `Emitter` component _parameterized_ with `string`. But what about the first line?

```neva
#bind(greeting)
```

This is what's known as a _directive_ - a special instruction for the compiler. There are several directives, and each tells the compiler some information on how to correctly compile the program. The syntax for any directive is as follows:

```neva
#<directive_name>(<arguments>)
```

## Emitter

To understand what the `#bind` directive does, let's look into the standard library's code, at the definition of the Emitter component (let's ignore `pub` keyword once again):

```neva
#extern(Emitter)
pub Emitter<T>() (msg T)
```

Firstly, the Emitter has no input ports! This is only possible in the standard library. The compiler will not allow us to do this ourselves - any component outside the standard library must have at least one input and one output port. Anyway, the Emitter is the only component without input ports. We need at least one such component, and soon we'll understand why. Let's move on to the `#extern` directive:

```neva
#extern(Emitter)
```

Now we're truly delving into the details, but only for a short while. Please, hang in there a little longer; it will get simpler afterward.

## Native Components and Runtime Functions

It was mentioned earlier that some components depend on others to perform some work. But if one component depends on another, and that one depends on another, how far does this chain of dependencies go? Surely it can't go on indefinitely?

Components in Nevalang are divided into two categories - _normal_ and _native_. Normal ones have a body - necessarily a network and, typically, some nodes. Native components do not have a body. In the source code, you will find only their interface. The implementation of such components is written in a lower-level language, which we will not discuss here. Such native components are called _runtime functions_; there is a whole library of such components in the runtime, and the compiler is aware of it.

A mechanism is needed to tell the compiler that a certain bodyless component, like Emitter, needs to be _linked_ with a specific runtime function in the runtime, let's suppose it is also called Emitter. How is this done?

To solve this problem, the `#extern` directive was created. It literally tells the compiler, "look, this component has no implementation in the source code; it is implemented directly in the runtime."

## Configuration Messages and Bind

Going back to our `#bind(greeting)`

When the runtime launches a native component, it can pass to it an initialization parameter - a message that can contain absolutely anything. The component can remember this message and use it later in its operation. Such a message is called a _configuration message_.

`Emitter` is a component whose task is to send the same message to its output port in an infinite loop. Since it has no input ports, it has no way to get this message other than from its configuration.

A curious reader might wonder why `Emitter` couldn't be given input ports. The reason is that we need a mechanism for sending static messages, that is, those declared as constants. These messages do not come from the output ports of other components but are declared in the source code. We need to refer the `Emitter` component to "look, here's the message to distribute to everyone".

Finally, let's return to `#bind`. Note that if `#extern` applies to components, then `#bind` applies to nodes. Moreover, it applies only to those nodes instantiated from native components. This is precisely the way to tell the compiler "this runtime function needs to be launched with this configuration message". In `bind`, a _reference_ to a constant is passed, in this case, `greeting`.

## How to Control Execution Flow in a DataFlow Language

Syntactically, the rest of the program should be clear - the nodes `emitter`, `blocker`, and `printer` are instantiated with corresponding components from `builtin` and parameterized with `string`. Then comes a network of 4 connections. But what's really happening here, and why do we need the `blocker` node? Remember, this is a hello world program that's supposed to simply print a string to stdout.

The key lies in how `Emitter` works. As mentioned, it sends the same message out in an infinite loop. If you're curious about why it functions this way, you can find the answer on the [FAQ](/docs/faq) page. We won't delve into it here, as it would take too much time. For now, just take it on faith that Emitter cannot operate differently.

The thing is, we need to send a string to the `printer` exactly once, and strictly after a signal comes from `:start`. A mandatory condition for successful compilation is that a component uses all its input and output ports. Moreover, the `:start` and `:stop` ports have special significance for the program - they should control when the program starts and ends its computations.

Thus, we need to program our network so that something happens exactly once and at a specific moment. In a way, we need to _control the execution flow_, but how do you do that in a language where you only _control the data flow_? We've just encountered a situation for the first time where what is easily done in control-flow programming requires extra effort in dataflow. But don't worry, Nevalang has the tools to tackle such tasks. In the remainder, we'll look at the most primitive and flexible of them - the `Blocker` component. Then, we'll explore a simpler way.

## Public and Private Entities

Let's look, as we've become accustomed, into the code of the `builtin` package:

```neva
#extern(Blocker)
pub Blocker<T>(sig any, data T) (data T)
```

Isn't it great to delve into the workings of the standard library while studying hello world?

So we again encounter the keyword `pub`, and it's probably time to explain it. It "exports" an entity or makes it _public_. This means that it can be used outside of the package. That's why we can use `Blocker`, `Emitter`, `Printer`, `Reader`, and the types `any` and `string` - all are declared with the `pub` keyword. However, our `Main` component is _private_ - it cannot be _imported_. And the compiler will not allow us to make it public. Naming the root component from which computation starts as "Main" is a convention that must be followed. Such a component should not perform two functions at once - being executable and reusable.

## Blocker

The `#extern(Blocker)` directive tells us that Blocker is a native component that uses a runtime function with the same name. Let's look at its interface:

```neva
<T any>(sig any, data T) (data T)
```

So, we see two _inports_ (from now on, we will call input ports "inports") `sig` and `data`, and one _outport_ `data` (likewise, we'll refer to output ports as "outports"). We also see a type parameter `T`, indicating that `data` on the input and `data` on the output have the same type `T`.

Knowing how the substitution of type arguments works, we can deduce that the expression `Blocker<string>` gives us the following interface:

```neva
(sig any, data string) (data string)
```

Meaning, the blocker expects a (any) signal and the data (in this case, a string) at its input. And emits a data (currently string) on the output. So, what does it do? It's quite simple. It blocks the data flow until messages arrive at both inports.

If a message first arrives at the `sig` port, it waits for a message at the `data` port, and vice versa; if it first arrives at `data`, it waits for a message in the `sig` port. Once messages have arrived at both inports, it _unlocks_, and the data is sent further from the outport named `data`.

## Understanding Asynchronism

Let's take another look at our network and verbalize what it does:

```neva
:start -> blocker:sig
emitter:msg -> blocker:data
blocker:data -> printer:data
printer:sig -> :stop
```

When the input signal `:start` arrives at the `blocker:sig` inport (this happens exactly once at the program's start), the `blocker` locks the flow, awaiting data. The message from `emitter:msg` (our "Hello, World!" constant) goes into the blocker but doesn't pass further until the `blocker:sig` signal arrives. If the signal arrives first, then the data immediately moves on; if not, it waits for the signal. We don't know which will happen faster - whether the data or the signal reaches the `blocker` first, but we do know that the flow won't proceed until these two messages meet in the `blocker`. Once this happens, we send the data to be printed. If by this time the emitter has already sent another message (with the same "Hello, World!" text), there's no need to worry - it will be forever blocked by the `blocker` - a new signal to `block:sig` won't arrive, because there won't be a new signal from `:start`. Finally, when the printing is finished, we terminate the program by sending a signal to `:stop`.

Assuming the program could compile without using `:start`, or if `:start` wasn't used to control the execution flow, we might manage to print the constant several times before the program would end. The thing is, components in Nevalang operate asynchronously, and while the message from `printer:sig` was moving to `:stop`, the printer would continue to work in parallel, if the machine has enough resources.

This feature of the language - maximum asynchrony, allows for easily writing concurrent programs and achieving, theoretically, high performance, but it comes with the overhead of needing to block the flow where the sequence of events is important.

## What's Next?

Wow, bet you've never written a hello world like this before. How about we [simplify](/docs/tutorial/04) things a bit here?
