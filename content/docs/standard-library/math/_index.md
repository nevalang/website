---
title: Math
weight: 5
---
The `Math`  section describes component's used to do mathematical operations.

# Adder
It takes in values and returns a sum, its best used with port streaming.
```
pub component Adder<T int | float | string>(stream maybe<T>) (res T)
```
### Usage
```
component Main(start any) (stop any) {
	nodes {
		adder Adder<int>
		streamer PortStreamer<int>
		printer Printer<int>
	}
	net {
		:start -> (
			1 -> streamer:ports[0],
			2 -> streamer:ports[1]
		)
		streamer:stream -> adder:stream
		adder:res -> printer:data
		printer:sig -> :stop
	}
}
```


# Subtractor
It takes in values and returns a sum and subtracts all the values from the first value, best used with port streaming.

```
pub component Subtractor<T int | float >(stream maybe<T>) (res T)
```
### Usage
```
component Main(start any) (stop any) {
	nodes {
		sub Subtractor<int>
		streamer PortStreamer<int>
		printer Printer<int>
	}
	net {
		:start -> (
			1 -> streamer:ports[0],
			2 -> streamer:ports[1]
		)
		streamer:stream -> sub:stream
		sub:res -> printer:data
		printer:sig -> :stop
	}
}
```

# Multiplier
It multiplies all the passed in values, best used with port streaming
```
pub component Multiplier<T int | float >(stream maybe<T>) (res T)
```
### Usage
```
component Main(start any) (stop any) {
	nodes {
		mult Multiplier<int>
		streamer PortStreamer<int>
		printer Printer<int>
	}
	net {
		:start -> (
			1 -> streamer:ports[0],
			2 -> streamer:ports[1],
			3 -> streamer:ports[2]
		)
		streamer:stream -> mult:stream
		mult:res -> printer:data
		printer:sig -> :stop
	}
}
```
It takes in a integer and returns value - 1.
# Decrementor
```
pub component Decrementor<T int | float>(data T) (res T)
```