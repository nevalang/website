---
title: Echo
weight: 2
---

## Module and Manifest

If you've gone through the quick start, you should have already created your first project. In that case, simply update the code in `main.neva` to include the `Echo` component from this example. For everyone else, let's execute the following command:

```bash
neva new test
```

With this command, we're creating a _module_. We'll learn more about modules later, but for now, remember that any Nevalang program consists of at least one module.

Each module has a `neva.yml` file, which describes its _dependencies_ (modules can depend on other modules, in this case, there are no dependencies) and the required version of the compiler (in this case, 0.0.1). Such a file is called the module's _manifest_.

So, after our module is created, replace the content of the `test/src/main.neva` file with the following code:

```neva
import { std/builtin }

component Main(start any) (stop any) {
	nodes {
		reader builtin.Reader
		printer builtin.Printer<string>
	}
	net {
		:start -> reader:sig
		reader:data -> printer:data
		printer:sig -> :stop
	}
}
```

Now make sure that you're in the `test` directory and run `neva run src`. The terminal should block until you type something. Type anything, e.g. "how are you?". If everything is okay you should see this output:

```bash
> how are you?
```

As you can see, the program prints what you've entered and quits. That's all it does.

## Packages, Std Module, Builtin Package

Let's pay attention to this line:

```
import { std/builtin }
```

Previously, it was mentioned that our module has no dependencies, but that's not entirely true. Every module implicitly depends on the _standard library_ module - `std`.

We've already discovered that Nevalang programs consist of modules, but what do modules consist of? Modules consist of _packages_. In this case, we import the `builtin` package from the `std` module to reuse it in our code.

## Nodes, Component Instances

Let's now return to our `Main` component and see how it has changed. As we remember, it previously did nothing. Nevertheless, it had a body. Now, as we can see, its body has grown and consists not only of a `net` but also contains a `nodes` section.

```neva
nodes {
	reader builtin.Reader
	printer builtin.Printer<string>
}
```

Previously, it was mentioned that components send messages to each other. However, in reality, it's not the components that exchange messages but their instances. These instances are called _nodes_ and the components are merely "blueprints" from which such nodes can be created. A component effectively describes a node - its input-output ports and its behavior.

The network of any component that performs some work will inevitably consist of instances of other components. This means that a component typically depends on other components.

In our example, the Main component creates 2 nodes - `printer`, an instance of the component `builtin.Printer`, and `reader`, an instance of the component `builtin.Reader`.

This `reader builtin.Reader` syntax should be understood as `<node_name> <instantiation_expression>`, where the latter, in turn, is `<package_name>.<component_name>`.

## Type Parameters

Another syntactic construct that we should examine before moving forward is "generics," or, as they are more academically called, type parameters.

Let's look again at the declaration of the `printer` node, specifically at its right part - the component instantiation:

`builtin.Printer<string>`

The construction `<string>` immediately catches the eye. What does it mean? If we take a moment to look at the declaration of the `builtin.Printer` component, we will see the following:

```neva
#extern(LinePrinter)
pub Printer<T>(data T) (sig T)
```

We will not yet touch upon what `#extern` and `pub` mean, as we still have to understand these. Let's focus on the interface. We see that the `Printer` component has an input port `data` with type `T` and an output port `sig` also with type `T`. But what is this type `T`?

It's all about this code `Printer<T>`. Such a syntactic construction, where triangle brackets follow the component's name, and within them are letters (typically uppercase), is called a type parameter. In this case, the `Printer` component has one parameter `T`. Essentially, this means that when instantiating this component (when creating a node based on it) we need to provide a type argument.

In our case, we provide a `string` and

```
Printer<T>(data T) (sig T)
```

Behaves as

```
Printer(data string) (sig string)
```

Type parameters are a mechanism that allows writing generic code. Without them, we would have to have a multitude of Printer variations for different data types. By specifying that the printer needs to work with strings (about them, and about other data types, we will also talk later), we get a safe way of using this node in our network.

Are you still here? It's quite a lot for an introductory lesson, isn't it? But there's nothing to be done, our task is to delve into and understand how it works. Either way, we're almost finished, there's just a little bit left.

## Connections, Senders, Receivers and Port Addresses

Let's finally take another look at the network of our Main component:

```
net {
	:start -> reader:sig
	reader:data -> printer:data
	printer:sig -> :stop
}
```

Now that we know what nodes are, we can understand this syntax a bit deeper. So, the network consists of connections. In this case, three. The order in which connections are declared in the code is absolutely not important. Remember - we do not control the flow of execution, but merely set the direction in which data flows.

Each connection consists of a _sender_ and a _receiver_. Both are described by constructs called _port addresses_ which in turn consist of a node and a port. For example, in the connection:

```
reader:data -> printer:data
```

The output port `data` of the `reader` node is directed into the input port `data` of the `printer` node. Ports to the left of `->` are always output, and ports to the right are always input.

## IO Nodes

Finally, the curious reader might wonder, what about port addresses without specified nodes like `:start` and `:stop`?

The fact is that there are indeed two types of nodes - _component instance nodes_ and the so-called _IO nodes_, of which there are always two in the network of each component - the `in` node and the `out` node.

Now, the `in` node contains only output ports, and the `out` node only input ports. This inversion might be confusing, but it is actually quite natural - a component reads data from its input ports as if they are the output ports of some node and correspondingly writes to its output ports as if they are someone else's input ports.

Because you don’t have to think about it most of the time, Nevalang offers a shorter syntax for connections with IO nodes - `:<port>` instead of `<io_node>:<port>`. For example, `in:start` is the same as `:start`. One might ask, 'But what if an input port and an output port have the same name?' Well, you always have senders on the left and receivers on the right, so `:x -> :x` means `in:x -> out:x`.

## Reader, Printer and The Algorithm

Finally, let's dissect the algorithm our network executes. So, we have 3 connections:

```
:start -> reader:sig
reader:data -> printer:data
printer:sig -> :stop
```

As we see, the `start` signal goes to the `reader` node into the `sig` port. The `sig` port typically signifies a _signal_ to start performing work. The `Reader` component is designed in such a way that upon receiving this signal, it will _block_, waiting for input from the keyboard. After the user enters text and presses Enter, the program will be unblocked, and the entered data will be sent to the `Printer` component, which, in turn, will print it out and emit a `sig` signal on its output. We use this signal to close our loop, forming a cycle. The program will terminate if "ctrl+c" is pressed, but until then, it will continuously operate, constantly waiting for input and then printing it, ad infinitum.

## Implicit Builtin

Before we move on, let's simplify our program just a bit. We'll remove the `import { std/builtin }` line and also eliminate every `builtin.` prefix from our nodes' instantiations.

```neva
component Main(start any) (stop any) {
    nodes {
        reader Reader
        printer Printer<string>
    }
    net {
        :start -> reader:sig
        reader:data -> printer:data
        printer:sig -> :stop
    }
}
```

It still works! In fact, the compiler implicitly injects the `std/builtin` import into every file and checks if the entity we refer to is defined there. However, if we, for example, define our own `Reader` in this package, it will _shadow_ the built-in one.

## What's Next?

Well then, the Nevalang programmer is almost ready! Perhaps it's time to tackle a real problem. In the next chapter, we'll write a [hello world](/docs/tutorial/03)!
