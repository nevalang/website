---
title: IO
weight: 5
---
The `IO`  section describes the standard component's to deal with input and output

# Printer
The `Printer` is a component used to print to stdout

```
pub component Printer<T>(data T) (sig T)
```
### Usage
```
const greeting string = 'Hello, World!'

component Main(start any) (stop any) {
	nodes { printer Printer<string> }
	net {
		:start -> ($greeting -> printer:data)
		printer:sig -> :stop
	}
}
```

# FPrinter
The `FPrinter` is a component used to print to stdout with formatting
```
pub component FPrinter<T>(tpl string, [args] T) ([args] T, err error)
```