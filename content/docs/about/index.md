---
title: About The Language
weight: 1
---

![Neva gradient logo](/images/gradient.svg)

## What is this?

This is _Neva_ or _Nevalang_ (these two names are interchangeable) - an open-source flow-based general-purpose language with static typing and a focus on visual programming, which compiles into machine code and Go.

## Why Yet Another Language?

As cliché and unbelievable as it sounds, Nevalang has no direct analogs. Its combination of characteristics makes it a unique language, well-suited for addressing two issues in programming where significant progress has not been felt for many years - visual programming and implicit parallelism.

The first gives us the ability to reason about programs in a way that is natural for us, similar to how we think when looking at electronic components, analyzing the data flow within them. The second enables us to fully leverage parallelism without making the code significantly more complex.

Add to this strong static typing, compilation into machine code, and open-source availability and you might get a tool that is both simple and powerful enough that even inexperienced programmers can use it to create large and fast programs.

## Why Visual Programming?

For over 50 years, we've been writing and editing text, even though it's well-known that humans better understand visual information. We need a good general-purpose visual programming language. Yes, visual languages exist, but they are mostly specialized. None of them comes close to the popularity of Python or Java. If we look at the top 20 most popular languages, we won't find any visual ones.

If it's not obvious why we need a visual programming language, consider the number of visual diagrams we use when designing software. Some might argue that text is also a form of visual language because it consists of glyphs, but we're specifically talking about node editor-based tools. It's natural for people to think of processes as boxes connected by arrows. Countless examples support this, not only drawings on boards and notebooks but also the popularity of visual software like Miro and Figma, as well as numerous note-taking apps with graph and canvas views like Obsidian.

The problem with these diagrams is that they are static. Today, they may reflect the current state of things (and that's if we're lucky), but tomorrow they might not. No matter how hard we try to keep documentation updated, it will never fully capture reality. Code is the only thing that can be truly trusted. Oh, if only these diagrams could be the actual code...

The argument that visual programming is less maintainable is simply incorrect. It's just a different form of data representation. The flow-based approach allows for abstraction in the same way we do with text-based programming. Nevalang has components, packages and modules for that.

Warning: Please note that the **visual editor is still on the roadmap**. Until the language stabilizes, we would need to rewrite it repeatedly.

## Why Implicit Parallelism?

Nevalang features what we call Effortless Concurrency. This means that writing concurrent code requires no extra effort. The reason is that all code in Nevalang is asynchronous by default - components operate in parallel to each other (if the machine has enough resources). Effort is actually required when you need to ensure a clear sequence of events (you might be surprised how rarely this is actually necessary) - this is a complete paradigm shift.

Components exchange messages through buffered queues, and blocking only occurs when the queue is full. But even in this case, parts of the program that are not blocked continue to work.

The icing on the cake is the fact that Nevalang naturally supports stream computing right out of the box. It doesn't just support it - it's a native form for it. Where in conventional programming we process a batch of data and then pass it on, in Nevalang, we process and pass on data as it becomes ready. An entire page wouldn't be enough to describe how much this can speed up computations.
