---
title: Home
---

# Hello World

```neva
components {
	Main(enter any) (exit any) {
		nodes { printer Printer<string> }
		net {
			in:enter -> ('Hello, World!' -> printer:data)
			printer:sig -> out:exit
		}
	}
}
```