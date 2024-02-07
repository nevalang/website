---
title: Home
---

Welcome to Nevalang, a programming language designed to transform the way you think about software development. Crafted for both efficiency and ease of use, Nevalang offers a refreshing and intuitive paradigm that focuses on the flow of data rather than on traditional control flow, making it a powerful tool for modern programming challenges.

{{< tabs >}}
{{% tab name="Hello world" %}}

```neva
component Main(enter any) (exit any) {
	nodes { printer Printer<string> }
	net {
		in:enter -> ('Hello, World!' -> printer:data)
		printer:sig -> out:exit
	}
}
```

{{% /tab %}}

{{% tab name="Dependency injection" %}}

```neva
component Main(enter any) (exit any) {
    nodes {
        subNode SecondComponent { depNode Printer<any> }
    }
    net {
        in:enter -> subNode:msg
        subNode:msg -> out:exit
    }
}

interface IPrinter<T>(data T) (sig T)

component SecondComponent (msg any) (msg any) {
    nodes { depNode IPrinter<any> }
    net {
        in:msg -> depNode:data
        depNode:sig -> out:msg
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

component Main(enter any) (exit any) {
    nodes {
        builder StructBuilder<User>
        print Print<User>
    }
    net {
        32 -> builder:age
        'John' -> builder:name
        builder:msg -> print:data
        print:sig -> out:exit
    }
}
```

{{% /tab %}}
{{< /tabs >}}

# Features

## Flow-Based Programming

Nevalang operates on a flow-based programming model, where components are connected through inputs and outputs. This eliminates the need for low-level instructions like "call/return" and state manipulations, empowering you to reason about programs in a more natural way.

## Effortless Concurrency

FBP allows messages to flow concurrently across connections. This fundamental shift from synchronous to asynchronous operations by default enables seamless parallel computation, without the complexities of mutexes, channels, or promises, and avoids common pitfalls like deadlocks and race conditions. First-class support for streaming data processing allows the system to operate at maximum speed.

## Static Type System

With static typing, Nevalang catches a significant number of bugs at compile time, enhancing code safety and reliability. Structural sub-typing further refines this approach by allowing components to receive more detailed data than required, intelligently ignoring unnecessary information. This reduces the need for boilerplate adapter code, streamlining the development process.

## Multi-Target Compilation

Nevalang provides the ability to compile into either machine code for deployment as a single executable binary, or into Go, using it as its intermediate representation. This functionality generates human-readable Go code that developers can compile themselves using the official Go compiler or its alternatives. This includes the ability to produce WebAssembly, thereby extending Nevalang's utility for web-based applications.

## Simple and Clean C-like Syntax

Nevalang offers a syntax that is not only simple and easy to understand but also clean and minimalistic without the clutter and noise. Despite its powerful capabilities, Nevalang boasts very few syntax constructs and language abstractions compared to most popular programming languages, maintaining a small core.

## Interpreter Mode

To support rapid development and debugging, Nevalang includes an interpreter mode. This means the compiler doesn't have to rush, allowing it to create more optimized code for final use.

## 💉 First-Class Dependency Injection

With first-class support for dependency injection and interfaces, Nevalang encourages a modular design that’s easy to test, enhancing code quality and maintainability.

## Builtin Observability

Nevalang’s built-in observability feature traces every message path throughout execution at runtime, offering superior debugging capabilities.

## Garbage Collection

Leveraging Go's garbage collector, Nevalang frees you from manual memory management, allowing you to concentrate on developing your application.

## Visual Programming (WIP)

Nevalang started as a visual programming language but has evolved into a hybrid, offering a clean, C-like syntax alongside a visual editor. This approach addresses common drawbacks of visual programming by supporting standard development practices like version control and code reviews, while also making complex projects manageable through its package system and component abstractions.

## Go Interop (WIP)

Nevalang's compiler can generate human-readable Go code. There are plans to utilize this feature for interoperability with existing Go codebases, allowing you to use existing Go code inside your Nevalang programs and, vice versa, to integrate Nevalang modules into your Go programs.

## No Runtime Exceptions (WIP)

Nevalang plans to achieve high reliability, where programs either fail at startup or run without crashes forever. It will do this by analyzing the program for errors before it runs (static semantic analysis) and checking for problems when the program starts (runtime checks). If a program crashes after starting, it's likely a bug in Nevalang itself. Users might still encounter logical mistakes in their code though.
