---
title: 🎉 Nevalang Released!
date: "2019-03-25T13:43:40"
---

![Papers photo](gradient.svg)

Please forgive my somewhat informal tone, dear reader, but I am brimming with emotion.

## It's Alive!

After three long years of closed development, I can finally proclaim with pride that Nevalang is ready to be released to the public!

Throughout this time, from the initial [commit](https://github.com/nevalang/neva/commit/9c7c7b7c28caa6b632e674afb0a517ced875689) back in June 2021 to just yesterday, I've been periodically besieged by doubts - would this epic journey ever conclude? Would my brainchild ever see the light of day? Every problem solved felt like cutting off one of Hydra's heads, only for several more to sprout in its place. Numerous times, just as I sensed the solution was within reach, I'd hit a dead end, realizing with horror that the only way forward was to backtrack several steps and start anew in a different direction. It seemed like the work was endless. At times, I even wondered if I was mad. After all, aside from a couple of friends, no one knew what I was dedicating almost all my free time to.

## How It Was

To say that these three years have been incredibly educational would be an understatement. I could have become a successful tech blogger if I weren't so lazy - I encountered problems ranging from developing my own type system to integrating WebAssembly code into an Electron application. I could share much about my experience, but I'll say just this: my biggest mistake was not releasing the language sooner.

Instead of planning a minimal Proof of Concept (PoC) that, while not fully functional for programming, would demonstrate the ideas behind my language and gather a small community of enthusiasts to develop the language together, integrating and testing new ideas with feedback, I spent three years working in silence, effectively juggling a second full-time job.

Why did it end up this way? Two reasons: 1) A plain lack of project management experience. 2) An incredible number of unforeseen challenges.

While the first point is straightforward and hardly worth dwelling on (I'm glad to say lessons were learned), the second merits a few words.

Imagine this task:

You're creating a stream-oriented, statically typed, general-purpose programming language that compiles to machine code. And it has to be true Flow-Based Programming (FBP) with implicit parallelism. Oh, and it should be compatible with Go, so you don't have to rewrite all libraries from scratch. And, just for fun, let's say the language supports real visual programming, not just text. Because, come on, we've been writing in text for 50 years.

In short, you're tasked with changing programming.

At first, you think the type system can do without generics... How naive. Then you try to decide if you really need to bring everything from FBP - maybe drop array ports or at least sub-streams? Nope, that won't work.

It would be nice to take a peek somewhere, but there's nowhere to look! It seems that all stream-oriented languages are very niche (LabVIEW for science, Unreal Blueprints for games, etc.), and there are very few of them. Visual languages suffer the same fate: either they're unpopular due to poor implementation or they're niche regardless of whether they're stream-oriented or not (Blocky, Ballerina, Node-RED, NoFlo, you name it). How I envy those working on yet another C-like language.

But let's get back to the matter at hand. While I made the mistake of not releasing sooner, over these three years, Nevalang fully formed its own identity. Yes, we still need to write a comprehensive standard library (and by God, we will write the best one out there), but the core of the language - the compiler, runtime, type system, even the main programming patterns and how the standard library should generally operate, when to use array ports and when sub-streams - is crystal clear. And most importantly, we know exactly where to go from here:

## Next Steps

- Build a minimal community and start gathering feedback.
- Begin speaking at conferences and writing posts to promote Nevalang's ideas.
- Write the most necessary modules of the standard library.
- Work on Go interop - in and out.
- Revive and bring the visual editor in VSCode to a minimally viable state.

Ladies and gentlemen, a door to the future is opening before us. A programming world where writing parallel code is effortless, free from the worries of concurrent access issues. Programming where powerful visual tools and text perfectly complement each other.

I am thrilled to share this moment with you. Let's together watch as Nevalang takes its first baby steps and help it along the way!
