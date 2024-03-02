---
title: Style Guide
weight: 6
---

The Nevalang style guide outlined in this document sets the standards for organizing and formatting code, designing components, and choosing appropriate names. It's recommended that all programs follow this guide to ensure consistency across Nevalang code, making it easier to read and understand.

## Code Organization

- **Lines Count**: Aim for files to be up to 300 lines. Files longer than 300 lines should be split, indicating a need for better organization.

## Formatting

- **Short Lines**: Keep lines under **80 characters** to enhance readability, accommodate split-screen setups, and avoid horizontal scrolling, especially for those who prefer large text for eye care.
- **Small Files**: Ideally no longer than **100 lines**
- **Comments**: **Comments must be avoided** in general. Strive to easy to understand API with your naming. However, when annavoidable, they must start with lowercase and end without a dot. Keep comments short and simple.
- **Tabs Over Spaces**: **Tabs are preferred** for their flexibility in displaying indentation and for being more data-efficient.
- **Entity Blocks**: **Group similar** entities (like types or components) within `{}` blocks for clarity, but use discretion for cases where separate contexts are needed.

## API Design

- **Generics Usage**: Utilize generics when data type consistency across inports and outports is important.
- **Flow Separation**: Use outports to differentiate data paths and structs for data that always moves together.
- **Network Structure**: Favor simple, understandable topologies like pipes or trees over complex networks with multiple parent nodes.
- **Port Numbers**: Limit the number of ports. Ideally, no more than three inports and five outports to keep the network comprehensible.
- **Interface Size**: Keep your interfaces small. The lesser ports interface have, the easier it is to implement it.

## Naming Conventions

A general rule is that an entity's name should inherit context from its parent scope, eliminating the need for redundant context duplication.

Good naming arrives naturally from the development process rather than artificial creation. It eliminates the need for comments.

- **Packages**: Use `lower_snake_case` for package names up to 3 words.
- **Files**: Exactly the same as for packages
- **Entities**: Use descriptive `CamelCase` names for types, interfaces and components. For constants use `lowerCamelCase`.
- **Interfaces**: Exactly the same as for components but add `I` prefix.
- **Components**: Use actionable noun with "er" ending if possible.
- **Ports**: Use short `lowerCamelCase` up to 5 letters.
- **Nodes**: Name nodes similarly to their components/interfaces, but in `lowerCamelCase`. Distinguish multiple instances of the same entity by their meaning.
- **Enums**: Use singular form. E.g. prefer `Day` to `Days` so it's clear that enum represent single value.
