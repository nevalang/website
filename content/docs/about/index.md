---
title: About The Language
weight: 1
---

![Neva gradient logo](/images/gradient.svg)

## What Is This?

This is _Neva_ or _Nevalang_ (these two names are interchangeable) - an open-source flow-based general-purpose programming language with static typing and a focus on visual programming, which compiles into machine code and Go.

## Why Yet Another Language?

As cliché and unbelievable as it sounds, Nevalang has no direct analogs. Its combination of characteristics makes it a unique language, well-suited for addressing two issues in programming where significant progress has not been felt for many years - visual programming and implicit parallelism.

The first gives us the ability to reason about programs in a way that is natural for us, similar to how we think when looking at electronic components, analyzing the data flow within them. The second enables us to fully leverage parallelism without making the code significantly more complex.

Add to this strong static typing, compilation into machine code, and open-source availability and you might get a tool that is both simple and powerful enough that even inexperienced programmers can use it to create large and fast programs.

## Why FBP? Why Not OOP or FP?

The reason why Nevalang might succeed is its flow-based paradigm. The stagnation in the problems described above, as we believe, is a consequence of the flow control paradigm established by the von Neumann architecture, where we have a state and a computer that changes this state by sequentially executing instructions. This way of thinking has served us well, but in the era of multi-core processors, we struggle to adapt it to modern realities. However, in the dataflow paradigm, and especially in its most powerful form - Flow-Based Programming (FBP), these problems do not exist.

## What Is Implicit Parallelism?

Just as automatic transmissions replaced manual ones, manual memory management gave way to automatic garbage collection. Languages without garbage collection still exist, but they are inevitably more complex and, as a result, less productive. There are domains where such an inconvenient way of programming is justified, but most programs do not require this. We believe the time has come to take the next step in automation and relieve humans from controlling concurrency. Mutexes, channels, coroutines, and promises - all these synchronization primitives should be made an implementation detail, outsourcing the control of concurrency and parallelism to the machine.

Nevalang features what we call _effortless concurrency_. This means that writing concurrent code requires no extra effort. The reason is that all code in Nevalang is asynchronous by default - components operate in parallel to each other (if the machine has enough resources). Effort is actually required when you need to ensure a clear sequence of events (you might be surprised how rarely this is actually necessary) - this is a complete paradigm shift.

Components exchange messages through buffered queues, and blocking only occurs when the queue is full. But even in this case, parts of the program that are not blocked continue to work.

The icing on the cake is the fact that Nevalang naturally supports stream computing right out of the box. It doesn't just support it - it's a native form for it. Where in conventional programming we process a batch of data and then pass it on, in Nevalang, we process and pass on data as it becomes ready. An entire page wouldn't be enough to describe how much this can speed up computations.

## Why Visual Programming?

For over 50 years, we've been writing and editing text, even though it's well-known that humans better understand visual information. We need a good general-purpose visual programming language. Yes, visual languages exist, but they are mostly specialized. None of them comes close to the popularity of Python or Java. If we look at the top 20 most popular languages, we won't find any visual ones.

If it's not obvious why we need a visual programming language, consider the number of visual diagrams we use when designing software. Some might argue that text is also a form of visual language because it consists of glyphs, but we're specifically talking about node editor-based tools. It's natural for people to think of processes as boxes connected by arrows. Countless examples support this, not only drawings on boards and notebooks but also the popularity of visual software like Miro and Figma, as well as numerous note-taking apps with graph and canvas views like Obsidian.

The problem with these diagrams is that they are static. Today, they may reflect the current state of things (and that's if we're lucky), but tomorrow they might not. No matter how hard we try to keep documentation updated, it will never fully capture reality. Code is the only thing that can be truly trusted. Oh, if only these diagrams could be the actual code...

The argument that visual programming is less maintainable is simply incorrect. It's just a different form of data representation. The flow-based approach allows for abstraction in the same way we do with text-based programming. Nevalang has components, packages and modules for that.

**Warning**: Please note that the visual editor is still on the roadmap. Until the language stabilizes, we would need to rewrite it repeatedly.

## Static Structural Type System

The Nevalang compiler includes a built-in static analyzer whose task is to find as many errors in the code as possible. Specifically, errors - things that would lead to the program crashing or behaving nonsensically. We don't want the language to get in your way or for you to struggle against the compiler. We aim to make it an additional pair of observant eyes - a co-pilot who kindly points out flaws immediately, so they don't have to be fixed later, confusedly digging through the code.

To achieve this, Nevalang provides strong static typing with structural subtyping. "Strong" means there is no implicit type casting in the language, "static" indicates that type checking occurs at compile time rather than runtime, and "structural" means that compatibility of types is checked based on their structure, not their name, as is done in systems with nominative subtyping.

For a better understanding, let's examine an example from traditional programming with nominative subtyping, like Go. Imagine you have a function `readBook` that takes a `Book` structure with two fields `{ title, author string }`, but you have a `Magazine` structure with all the `Book` fields plus an additional `number int`. In Go, we cannot pass `Magazine` to `getBook`, despite the magazine having all the necessary information for reading.

```go
func main() {
    magazine := Magazine{
        title: "FBP time",
        author: "Emil Valeev",
    }

    readBook(magazine) // compile error!
}

type Magazine struct {
    number int
    title, author string
}

type Book struct { title, author string }

func readBook(book Book) {
    // ...
}
```

Even from a practical standpoint, it seems logical that an entity capable of reading books should also be able to read magazines. But we need to perform an explicit cast

```go
readBook(Book{
    title: magazine.title,
    author: magazine.author,
})
```

It might not be a big deal, but imagine now dealing with `func readBooks(books []Book)`, and you have to write a loop to convert a list of magazines into a list of books. This kind of nesting can increase indefinitely (imagine, for example, just a list of objects with a list of objects inside), leading to the need to write dozens, sometimes hundreds of lines of code for mapping. In a language with structural typing, we simply don't need to think about this - the compiler sees that the types are structurally compatible and allows the program to compile.

This mechanism also allows for implementing scope for structure fields without additional functionality, and not just at the package level, but even at the level of an individual component. Simply use a more detailed type internally and provide a less detailed type externally. No mappings required.

## Where do I start?

Intrigued? Then welcome to the [Quick Start](/docs/quick-start) extravaganza!