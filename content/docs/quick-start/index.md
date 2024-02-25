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
0.5.1
```

## Creating Your First Project

Let's create a new project named `nevalang_test`. This project will include a `neva.yml` _manifest_ file and a `main.neva` source code file, which will contain a simple Nevalang program.

Execute the following commands to set up your project:

```bash
mkdir nevalang_test # create directory
cd nevalang_test # go there
touch neva.yml # create manifest file
echo "compiler: 0.0.1" >> neva.yml # insert compiler version
touch main.neva # create source code file
```

Next, open `main.neva` with your preferred text editor and add the following code:

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

Open a terminal and execute the following command:

```bash
neva run
```

If `Hello, World!` is displayed in the terminal, congratulations—your setup is correct!

Next, let's compile the program into an executable:

```bash
neva build
```

You should find a `main` executable in the current directory. Execute it with:

```
./main
```

You should see the `Hello, World!` message again, just like before.

## Next Steps

You are now ready to dive deeper into Nevalang programming!

For further learning, consult the [tutorial](/docs/tutorial) to enhance your understanding.
