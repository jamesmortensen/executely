const execute = require('executely').execute;

(async () => {

    function verifyExecutionCompletedWithOutput(output, process, resolve, reject) {
        if (output.includes('sleepy time over')) {
            process.disableOutput = false;
            resolve('sleepy time over');
        }
    }

    /**
     * Command to execute in the next examples. We'll detect the output "sleepy time over" and then
     * resolve the promise using the callback. Output is also disabled in the callback so we don't 
     * see "this will not be displayed"
     */
    const cmd = 'sleep 3 && echo "sleepy time over" && sleep 1 && echo "this will not be displayed"';
    const USE_EXECFILE = true;

    console.log('Fourth example with execFile: ');

    /**
     * Execute command, using execFile. Output is not displayed by default, but we can pipe it
     * to stdout. Also, we can access the output via process.stdout and resolve/reject using 
     * a callback function, verifyExecutionCompleted. We use the promise then method to access 
     * the result. We use a different callback, which does not disable output once promise is resolved.
     */
    await execute(cmd, USE_EXECFILE, verifyExecutionCompletedWithOutput).then((result) => {
        console.log('demo using execFile to monitor execution and then perform action based on an event in the executed process, but without disabling output...');
        console.log('The result is: ' + result);
    });

})();
