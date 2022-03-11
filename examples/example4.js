const execute = require('executely').execute;

(async () => {
    
    function verifyExecutionCompleted(output, process, resolve, reject) {
        if (output.includes('sleepy time over')) {
            process.disableOutput = true;
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

    console.log('Fourth example with execFile. It is the same as example2 except this uses a then');
    console.log('method instead of async/await.');
    /**
     * Execute command, using execFile. Output is not displayed by default, but we can pipe it
     * to stdout. Also, we can access the output via process.stdout and resolve/reject using 
     * a callback function, verifyExecutionCompleted. We use the promise then method to access 
     * the result.
     */
    await execute(cmd, USE_EXECFILE, verifyExecutionCompleted).then((result) => {
        console.log('demo using execFile to monitor execution and then perform action based on an event in the executed process...');
        console.log('The result is: ' + result);
        console.log('--------\n');
    });
})();
