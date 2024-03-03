---
title: Quick Start
weight: 2
---

Install Nevalang and create your first project in one minute!

## Installing Nevalang

To begin, download the Nevalang installation script using the following command:

```bash
curl -sSL https://raw.githubusercontent.com/nevalang/neva/main/scripts/install.sh | bash
```

If everything is ok you should be able to execute

```bash
neva version
```

And see output like this (version could differ):

```
0.9.0
```

## Creating Your First Project

Let's create a new project named `test`. Execute the following commands to set up your project:

```bash
neva new test
```

This command will create `test` directory with `neva.yml` _manifest_ file with `src/main.neva` _source code_ file.

Let's open `src/main.neva` with your preferred text editor. You should see this:

```neva
component Main(start any) (stop any) {
    nodes {

    }
    net {
        :start -> :stop
    }
}
```

This program does nothing. Let's replace this code with the following:

```neva
component Main(start any) (stop any) {
    nodes { printer Printer<string> }
    net {
        :start -> ('Hello, World!' -> printer:data)
        printer:sig -> :stop
    }
}
```

Congratulations! You have just written your first Nevalang program. Now, let's run it.

## Running Your First Program

Open a terminal and execute the following command. Make sure you are in the root of the project (where you have `neva.yml`):

```bash
neva run src
```

If `Hello, World!` is displayed in the terminal, congratulations — your setup is correct!

Next, let's compile the program into an executable:

```bash
neva build src
```

You should find an `output` executable in the current directory. 

Execute it with:

```
./output
```

You should see the `Hello, World!` message again, just like before.

## Next Steps

You are now ready to dive deeper into Nevalang programming!

For further learning, consult the [tutorial](/docs/tutorial) to enhance your understanding.
