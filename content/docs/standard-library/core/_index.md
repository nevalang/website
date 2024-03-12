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

## Usage

# Destructor
```
pub component Destructor(msg any) ()
```

# Blocker
```
pub component Blocker<T>(sig any, data T) (data T)
```

# Struct Builder
```
pub component StructBuilder<T struct {}> () (msg T)
```

# Struct selector
```
pub component StructSelector<T>(msg struct {}) (msg T)
```
