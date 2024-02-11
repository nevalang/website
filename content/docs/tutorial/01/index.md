---
title: A Program That Does Nothing
weight: 1
---

Here is the smallest program in Nevalang that compiles. It absolutely does nothing, but by looking at it, you can learn a lot about Nevalang.

```neva
component Main(start any) (stop any) {
    net { in:start -> out:stop }
}
```

Let's break down what's written here.

A Nevalang program consists of _components_ that send _messages_ to each other through _ports_ but ports cannot be connected randomly. Each port has its own _data type_, and when we connect one port to another, the compiler checks if they are _compatible_. Otherwise, it throws an error.

It states that there is a "Main" component (every component has a name), with two ports - one for input - `start` - and one for output - `stop`. The data type of both ports is `any` - a universal data type, saying "I am compatible with any types of data."

```neva
Main (start any) (stop any)
```

Next, we see a block of curly braces `{}` and inside another one with the keyword `net`.

```neva
{
    net { in:start -> out:stop }
}
```

Ports are the _interface_ of a component, but in addition to the interface, a component also needs a _body_ - code that describes what exactly the component does, what work it performs. In this case, the curly braces are the body, and `net` is the _network_ - the computational scheme of the component.

In Nevalang, programming is _flow-based_, and instead of controlling the flow of execution, as in conventional languages, we control the flow of data. We don't call functions, don't execute instructions; we just route messages from one place to another, thus creating a graph that describes how data flows through the program. That's why such programming is called flow-based.

In this case, we see that data flows directly from the input port `start` to the output port `stop`.

```
in:start -> out:stop
```

In other words, our Main component does nothing. It just lets data pass through itself without having any impact on the external world. Essentially, it could be called a bypass, but in a Nevalang program, there must always be at least one `Main` component (we'll understand why later).

The curious reader may wonder, what about `in:` and `out:`? Why couldn't we just write `start -> stop`? The fact is that there can be any number of ports for both input and output (although typically there are no more than three on each side). Input and output ports can sometimes have the same names. To avoid confusion, we specify the direction - `in` is input, and `out` is output.

## What's Next?

What, think this program isn't useful enough? Then let's move on to the [next chapter](/docs/tutorial/02)!
