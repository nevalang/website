---
title: Home
---

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
interface IPrinter<T>(data T) (sig T)

components {
    Main(enter any) (exit any) {
        nodes {
            subNode SecondComponent { depNode Printer<any> }
        }
        net {
            in:enter -> subNode:msg
            subNode:msg -> out:exit
        }
    }

    SecondComponent (msg any) (msg any) {
        nodes { depNode IPrinter<any> }
        net {
            in:msg -> depNode:data
            depNode:sig -> out:msg
        }
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
