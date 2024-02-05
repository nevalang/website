---
title: Style guide
weight: 4
---

The Nevalang style guide outlined in this document sets the standards for organizing and formatting code, designing components, and choosing appropriate names. It's recommended that all programs follow this guide to ensure consistency across Nevalang code, making it easier to read and understand.

## Code Organization

- **File Size**: Aim for files to be up to 300 lines. Files longer than 300 lines should be split, indicating a need for better organization.

## Formatting

- **Tabs Over Spaces**: Tabs are preferred for their flexibility in displaying indentation and for being more data-efficient.
- **Line Length**: Keep lines under 80 characters to enhance readability, accommodate split-screen setups, and avoid horizontal scrolling, especially for those who prefer large text for eye care.
- **Entity Blocks**: Group similar entities (like types or components) within `{}` blocks for clarity, but use discretion for cases where separate contexts are needed.
- **Newlines**: Always insert newlines after imports and between entities.

## Design

- **Generics Usage**: Utilize generics when data type consistency across inports and outports is important.
- **Flow Separation**: Use outports to differentiate data paths and structs for data that always moves together.
- **Network Structure**: Favor simple, understandable topologies like pipes or trees over complex networks with multiple parent nodes.
- **Port Numbers**: Limit the number of ports. Ideally, no more than three inports and five outports to keep the network comprehensible.

## Naming Conventions

A general rule is that an entity's name should inherit context from its parent scope, eliminating the need for redundant context duplication

- **Packages**: Use `lower_snake_case` for package names up to 3 words.
- **Entities**: Use descriptive (up to 3 words) names `CamelCase` for types, interfaces and components, and for constants use `lowerCamelCase`.
- **Components**: Use actionable noun with "er" ending if possible.
- **Interfaces**: Use same rules as for components but add `I` prefix.
- **Ports**: Keep port names short, ideally under five characters, and use intuitive abbreviations.
- **Nodes**: Name nodes similarly to their components, in lowerCamelCase, and distinguish multiple instances of the same component with specific identifiers.
