---
title: Hello World
weight: 3
---

Isn't it odd to reach the "Hello, World!" moment only in the third lesson - the starting point that most tutorials begin with? Well, many peculiarities await us in Nevalang. However, we hope that by the end of this tutorial, they will no longer seem like oddities. Who knows, you might even start thinking, "Could it have been any other way?". Of course, we could have started with "Hello, World!" too, without delving into the intricate details of how every little thing works, but our goal, once again, is to achieve a deep understanding of how Nevalang is structured. And, actually, "Hello, World!" is not as straightforward as it seems.

```neva
const greeting string = 'Hello, World!'

component Main(start any) (stop any) {
	nodes {
		#bind(greeting)
		greeting Emitter<string>
		printer Printer<string>
		blocker Blocker<string>
	}
	net {
		in:start -> blocker:sig
		greeting:msg -> blocker:data
		blocker:data -> printer:msg
		printer:msg -> out:stop
	}
}
```

You might be thinking right now - "This is the most verbose 'Hello, World!' I've ever seen!" And, quite likely, you are correct. But don't rush to close the page; by dissecting this example, we'll learn how to write code more concisely. Without going through this example and jumping straight to the shorter version, we would never understand how the short version actually works.

TODO...
