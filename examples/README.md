# executely examples

### Using the latest version

Run `npm i executely` to install the latest version of executely.

### Using the local cloned copy

If you wante to see the examples run against any local changes you've made to executely, follow the below steps to link the cloned version to the examples:

1. In the executely folder, run `npm link`. This creates a global symlink to the module.

2. In the examples folder, run `npm link executely`. This will link the examples/node_modules/executely module back to the root of the repository so you can see how any changes you make to the executely code affect the examples in real time.

### Running examples

Just use the node binary. For instance:

`node example1`

