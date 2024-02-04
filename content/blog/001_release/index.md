---
title: 🎉 Nevalang Released!
---

![Neva gradient logo](gradient.svg)

After three years of hard work in private, I'm happy to say that Nevalang is ready for everyone to see!

## The Journey

Since starting in [June 2021](https://github.com/nevalang/neva/commit/9c7c7b7c28caa6b632e674afb0a517ced875689), I've often worried if I could finish this project. I wondered if my idea would ever be ready to show to the world. Solving each problem was like fighting a monster that grows back its heads - as soon as I solved one thing, new problems appeared. Numerous times, just as I sensed the solution was within reach, I'd hit a dead end, realizing with horror that the only way forward was to backtrack several steps and start anew in a different direction.

It felt like the work would never end. Sometimes, I even asked myself if I was crazy for spending so much of my free time on it, with only a few friends knowing about my project.

These three years have taught me a lot. I could have become a successful tech blogger if I weren't so lazy - I encountered problems ranging from developing my own type system to integrating WebAssembly code into an Electron application. The biggest thing I learned is that I should have shared my language earlier.

### Three Years In Silence

Instead of showing a simple version early on to get feedback and help, I worked alone for three years, like having a second full-time job.

This happened for two reasons:

1. I didn't have much experience managing projects.
2. I ran into many unexpected challenges.

While the first point is straightforward (I'm glad to say lessons were learned), the second is worth talking about more.

Creating Nevalang wasn't just about crafting another programming language; it was about reimagining programming itself. Integrating concepts like FBP with static typing and visual programming were monumental tasks.

At first, you think the type system can do without generics... How naive. Then you try to decide if you really need to bring everything from FBP - maybe drop array ports or at least sub-streams? Nope, that won't work.

### Lack Of References

I found it hard to find references. There are visual languages out there, but they are usually very specialized: LabVIEW, Unreal Blueprints, Node-RED, Blocky, Ballerina, DRAKON, you name it.

The same goes for dataflow languages. There are some general purpose things like NoFlo, but they aren't statically typed, which is a big deal. I also looked for an FBP language that didn't require using a traditional language like JavaScript, but FBP itself doesn't limit you to that, making it hard to find examples.

Essentially, the unique combination of features in Nevalang makes it both unique and challenging to develop because there aren't many references.

## What's Next?

While I made the mistake of not releasing sooner, over these years, Nevalang has matured with a distinct identity. The core components, such as the compiler, runtime, and type system, have been solidified, outlining a clear path forward for both the language and its ecosystem.

I could have invested another year to release the language in its perfect form, but it's now clear to me that would have been misguided. There's a considerable amount of work still ahead, and new horizons await us.

- Build a minimal community and start gathering feedback.
- Begin speaking at conferences and writing posts to promote Nevalang's ideas.
- Write the most necessary modules of the standard library.
- Work on Go interop - in and out.
- Revive and bring the visual editor in VSCode to a minimally viable state.

I am thrilled to share this moment with you. Let's together watch as Nevalang takes its first baby steps and help it along the way!
