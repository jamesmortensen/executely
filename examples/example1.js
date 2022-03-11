const execute = require('executely').execute;

(async () => {
    console.log('First example with spawn: ');
    /*
     * execute a command, using spawn. 
     * We cannot access output, and it's sent to stdout by default.
     */
    await execute('ls -ltrSha').then((statusCode) => {
        console.log('spawn: ' + statusCode);
        console.log('-------');
    });
})();
