---
title: Core
weight: 5
---
The `Core`  section describes the core component's.

# Emitter
The `Emitter` constantly emits a message that you bind to it using the compiler directive `#bind`.This should be avoided if possible (use const's and literals instead).
```
pub component Emitter<T>() (msg T)
```

### Usage

# Destructor
```
pub component Destructor(msg any) ()
```

# Blocker
Blocker works like an AND gate, only sending data through the outport once it receives data at both inports.
```
pub component Blocker<T>(sig any, data T) (data T)
```

# Struct Builder
The `builder` is used to construct your custom struct types.
```
pub component StructBuilder<T struct {}> () (msg T)
```
### Usage
```
type User struct {
    age int
    name string
}

component Main(start any) (stop any) {
    nodes {
        builder StructBuilder<User>
        print Printer<User>
    }
    net {
        :start -> (
            'John' -> builder:name,
            32 -> builder:age
        )
        builder:msg -> print:data
        print:sig -> :stop
    }
}
```

# Struct Selector
```
pub component StructSelector<T>(msg struct {}) (msg T)
```
