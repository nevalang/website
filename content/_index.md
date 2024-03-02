---
title: Home
---

Welcome to Nevalang, a programming language designed to transform the way you think about software development. Crafted for both efficiency and ease of use, Nevalang offers a refreshing and intuitive paradigm that focuses on the flow of data rather than on traditional control flow, making it a powerful tool for modern programming challenges.

{{< tabs >}}
{{% tab name="Hello world" %}}

```neva
component Main(start) (stop) {
	nodes { Printer<string> }
	net {
		:start -> ('Hello, World!' -> printer:data)
		printer:sig -> :stop
	}
}
```

{{% /tab %}}

{{% tab name="Dependency injection" %}}

```neva
component Main(start) (stop) {
    nodes {
        subNode SecondComponent { depNode Printer<any> }
    }
    net {
        :start -> subNode:msg
        subNode:msg -> :stop
    }
}

interface IPrinter<T>(data T) (sig T)

component SecondComponent (msg) (msg) {
    nodes { depNode IPrinter<any> }
    net {
        :msg -> depNode:data
        depNode:sig -> :msg
    }
}
```

{{% /tab %}}

{{% tab name="Struct builder" %}}

```neva
type User struct {
    age int
    name string
}

component Main(start) (stop) {
    nodes {
        Printer<User>
        builder StructBuilder<User>
    }
    net {
        :start -> (
            'John' -> builder:name,
            32 -> builder:age
        )
        builder:msg -> printer:data
        printer:sig -> :stop
    }
}
```

{{% /tab %}}
{{< /tabs >}}

## Features

### Flow-Based Programming

Nevalang operates on a flow-based programming model, where components are connected through inputs and outputs. This eliminates the need for low-level instructions like "call/return" and state manipulations, empowering you to reason about programs in a more natural way.

### Implicit Parallelism

FBP allows messages to flow concurrently across connections. This fundamental shift from synchronous to asynchronous operations by default enables seamless parallel computation, without the complexities of mutexes, channels, or promises, and avoids common pitfalls like deadlocks and race conditions. First-class support for streaming data processing allows the system to operate at maximum speed.

### Static Type System

With static typing, Nevalang catches a significant number of bugs at compile time, enhancing code safety and reliability. Structural sub-typing further refines this approach by allowing components to receive more detailed data than required, intelligently ignoring unnecessary information. This reduces the need for boilerplate adapter code, streamlining the development process.

### Multi-Target Compilation

Nevalang provides the ability to compile into either machine code for deployment as a single executable binary, or into Go, using it as its intermediate representation. This functionality generates human-readable Go code that developers can compile themselves using the official Go compiler or its alternatives. This includes the ability to produce WebAssembly, thereby extending Nevalang's utility for web-based applications.

### Simple and Clean C-like Syntax

Nevalang offers a syntax that is not only simple and easy to understand but also clean and minimalistic without the clutter and noise. Despite its powerful capabilities, Nevalang boasts very few syntax constructs and language abstractions compared to most popular programming languages, maintaining a small core.

### Interpreter Mode

To support rapid development and debugging, Nevalang includes an interpreter mode. This means the compiler doesn't have to rush, allowing it to create more optimized code for final use.

### First-Class Dependency Injection

With first-class support for dependency injection and interfaces, Nevalang encourages a modular design that’s easy to test, enhancing code quality and maintainability.

### Builtin Observability

Nevalang’s built-in observability feature traces every message path throughout execution at runtime, offering superior debugging capabilities.

### Package Management

Nevalang comes with a built-in package manager that leverages Git. Releasing your package is as simple as pushing a tag to your repository. Installing a dependency is just as easy with a single command `neva get`.

### Garbage Collection

Leveraging Go's garbage collector, Nevalang frees you from manual memory management, allowing you to concentrate on developing your application.



## Next Steps

Want to learn more? Welcome to the [about the language](/docs/about) section.
