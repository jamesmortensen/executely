# executely

### What is executely?

"Executely" is not a real word. It's not in the dictionary. If the word had meaning then I'd imagine it to be something like "the act of performing a task or putting a plan into action."  The closest correct word might be "executively", the adverb of "execute".

However, in this context, executely is a small library for making spawn and execFile, both Node.js child_process methods, slightly easier to work with.

I find that many times I try a command in the terminal first before copying it into code where I need to execute a process. Also, the reverse is true. I find I want to debug a command I've found in code, but to run it in the terminal typically involves reverse engineering the code to translate it from a spawn or execFile command to something that runs on the terminal. While spawn requires arguments be presented in an array, executely just takes everything as a string, just like on the terminal. Here are a few simple examples:

```
const executely = require('executely').execute;

executely('ls -ltrSha /etc');
```

With spawn, this might look like this:

```
const spawn = require('child_process').spawn;

spawn('ls', ['-ltrSha', '/etc']);
```

Imagine this is a very long command instead of a more simple one like the above examples. That's a lot more time and energy (or find/replace pattern matching skills) to get it back to something that runs in the terminal.

In addition, executely provides some hooks to allow developers to do stuff with the child process output. For instance, we can log it, and we can even look for patterns in the output and make branching decisions based off of it.

### Usage

See the [examples](https://github.com/jamesmortensen/executely/tree/master/examples) folder to learn how to use executely with simple examples.

### Spawn vs execFile

executely uses spawn by default, unless a boolean `true` is passed in as the second argument, in which case, we use execFile. execFile has some advantages. We can attach to the stdout stream and listen to any output from the process. executely takes a callback function as the third argument, which is used to do things like disable the output from the process or perhaps start executing other actions in an application.

One notable example I've used this for is to start a Selenium Standalone Chrome Docker container image and listen to the output to know when the Selenium server is up and running. Once I know the server is running, I can start running UI tests. 

## License

Copywright (c) James Mortensen, 2022 MIT License

