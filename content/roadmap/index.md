---
title: Roadmap
weight: 3
---

These features were envisioned from the very beginning of the project. The ultimate goal of Nevalang is to fully realize these features, providing a robust, efficient, and user-friendly programming language.

## Visual Programming

Nevalang started as a visual programming language but has evolved into a hybrid, offering a clean, C-like syntax alongside a visual editor. This approach addresses common drawbacks of visual programming by supporting standard development practices like version control and code reviews, while also making complex projects manageable through its package system and component abstractions.

## Go Interop

Nevalang's compiler can generate human-readable Go code. There are plans to utilize this feature for interoperability with existing Go codebases, allowing you to use existing Go code inside your Nevalang programs and, vice versa, to integrate Nevalang modules into your Go programs.

## No Runtime Exceptions

Nevalang plans to achieve high reliability, where programs either fail at startup or run without crashes forever. It will do this by analyzing the program for errors before it runs (static semantic analysis) and checking for problems when the program starts (runtime checks). If a program crashes after starting, it's likely a bug in Nevalang itself. Users might still encounter logical mistakes in their code though.
