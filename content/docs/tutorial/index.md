---
title: Tutorial
weight: 3
---

Welcome to the "Learn Nevalang the Hard Way" tutorial! This comprehensive guide is designed to teach you the Nevalang programming language through detailed examples, covering everything you need to grasp the full scope of the language. Throughout this tutorial, you will dissect numerous small programs, observing various iterations from complex and verbose to concise and straightforward. This step-by-step deconstruction is crucial for understanding the inner workings of many features, ensuring that nothing in Nevalang feels like magic to you. Ready to embark on this journey? Let's dive in!

## Modules, packages

Here's the smallest possible Nevalang program. It does absolutely nothing nothing:

```neva
component Main(enter any) (exit any) {
	net { in:enter -> out:exit }
}
```