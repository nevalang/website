---
title: Home
---

Welcome to Nevalang, a general-purpose, flow-based programming language with static typing and implicit parallelism, designed with visual programming in mind, that compiles to machine code and Go.

{{< tabs >}}
{{% tab name="Hello world" %}}

```neva
component Main(start any) (stop any) {
	nodes { printer Printer<string> }
	net {
		in:start -> ('Hello, World!' -> printer:data)
		printer:sig -> out:stop
	}
}
```

{{% /tab %}}

{{% tab name="Dependency injection" %}}

```neva
component Main(start any) (stop any) {
    nodes {
        subNode SecondComponent { depNode Printer<any> }
    }
    net {
        in:start -> subNode:msg
        subNode:msg -> out:stop
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

component Main(start any) (stop any) {
    nodes {
        builder StructBuilder<User>
        print Print<User>
    }
    net {
        32 -> builder:age
        'John' -> builder:name
        builder:msg -> print:data
        print:sig -> out:stop
    }
}
```

{{% /tab %}}
{{< /tabs >}}
