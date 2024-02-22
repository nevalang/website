---
title: Better Hello World
weight: 4
---

## Const Senders

We promised that "hello world" could be simplified. After all, if writing such a basic program is so complex, what does real programming look like? Fear not, our promise will be fulfilled. Let's start simplifying immediately, beginning with eliminating the explicit mention of the emitter.

We remove the `emitter` node along with its directive:

```neva
#bind(greeting)
emitter Emitter<string>
```

Then we modify this connection:

```neva
emitter:msg -> blocker:data
```

This way:

```neva
$greeting -> blocker:data
```

Voilà, our program is now two lines shorter:

```neva
const greeting string = 'Hello, World!'

component Main(start any) (stop any) {
    nodes {
        printer Printer<string>
        blocker Blocker<string>
    }
    net {
        :start -> blocker:sig
        $greeting -> blocker:data
        blocker:data -> printer:msg
        printer:msg -> :stop
    }
}
```

And it works just the same. What you're now observing is _syntactic sugar_ called _const senders_. In a component's network, as a sender, you can specify not only a port address but also refer to a constant. This is done using the `$` symbol. Naturally, the constant must be within scope - declared in this package or imported.

Seeing `$greeting`, the compiler understands that it needs to create a node named "greeting", instantiate it with the `builtin.Emitter` component, parameterize it with the type of the corresponding constant (in this case, `string`), and bind the constant through the `#bind` directive. In other words, do everything that we manually did in the previous lesson.

Make sure that everything is correct by running `neva run` in `nevalang_test` directory. You should again see `Hello, World!` output.

## Then Connections

Alright, we've shortened the code by two lines. But it seems this is still the longest hello world in the world, or at least one of them. It appears that the main complexity stems from the necessity to use blockers. And if there are multiple constants, does that mean a blocker is needed for each? And what if the conditions are nested (X must happen after Y, and Z after both X AND Y)? No worries, we have a solution for this. Introduce another form of syntactic sugar called _then connections_.

```neva
const greeting string = 'Hello, World!'

component Main(start any) (stop any) {
	nodes { printer Printer<string> }
	net {
		:start -> ($greeting -> printer:msg)
		printer:msg -> :stop
	}
}
```

First, the `blocker Blocker<string>` node has disappeared, and second, three connections were replaced by one. It used to be:

```neva
:start -> blocker:sig
$greeting -> blocker:data
blocker:data -> printer:msg
```

Now, it's just:

```neva
:start -> ($greeting -> printer:msg)
```

This "then connection" syntax `... -> (...)` indicates that the `$greeting` can reach `printer:msg` only after the `:start` signal is sent, ensuring that the sequence of events is maintained without the need for explicit blockers.

These two variants - with blockers and with then connections - are absolutely identical in function. The "then connections" variant actually unfolds into the blocker variant during compilation.

## Literal Senders

Indeed, that's much better! Yet, our Hello World can't exactly be called succinct. It seems that in conventional languages, we don't create constants just to pass them once. It would be great to send the string directly to print, without making it a separate entity. Well, specifically for this, Nevalang has another form of syntactic sugar, the last one we'll look at in this lesson, and it's called _literal senders_.

```neva
component Main(start any) (stop any) {
	nodes { printer Printer<string> }
	net {
		:start -> ('Hello, World!' -> printer:data)
		printer:sig -> :stop
	}
}
```

We've removed the line:

```neva
const greeting string = 'Hello, World!'
```

And changed:

```neva
:start -> ($greeting -> printer:msg)
```

to:

```neva
:start -> ('Hello, World!' -> printer:data)
```

For the compiler, this variant is only slightly more complex than the one with const senders. It will unfold this into the verbose primitive form we started with, where we have an emitter and `#bind`. This time, however, it will also create a constant because it needs something to pass in the bind as a configuration message. The name of the constant will be generated automatically.

Finally run `neva run` again and check that our `Hello, World!` is still there.

## Putting It All Together

We've gone from this:

```neva
const greeting string = 'Hello, World!'

component Main(start any) (stop any) {
    nodes {
        #bind(greeting)
        emitter Emitter<string>
        blocker Blocker<string>
        printer Printer<string>
    }
    net {
        :start -> blocker:sig
        emitter:msg -> blocker:data
        blocker:data -> printer:msg
        printer:msg -> :stop
    }
}
```

To this:

```neva
component Main(start any) (stop any) {
    nodes { printer Printer<string> }
    net {
        :start -> ('Hello, World!' -> printer:data)
        printer:sig -> :stop
    }
}
```

Cutting down the amount of code by more than half - not bad!

And you deserve a medal for persistence. Unfortunately, the medals have run out, but do you know what hasn't? Lessons in Nevalang! Onward to new, even more thrilling adventures in the world of flow-based programming!

## What's Next?

Now that's a hello world! Unfortunately, it can't be simplified any further, so it's time to say goodbye to it. We hope Nevalang will eventually become a popular language and you become a sought-after specialist in it. Then, you'll have enough money for psychotherapy to mend your mental health after what you've seen. But don't worry, it [gets easier](/docs/tutorial/05) from here.
