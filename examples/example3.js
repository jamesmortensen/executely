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
    const cmd = 'sleep 3 && echo "we stop sleeping" && sleep 1 && echo "this will not be displayed"';
    const USE_EXECFILE = true;

    console.log('Third example execFile: wait 3 seconds then echo "we stop sleeping".');
    console.log('We do not run the callback because we did not see "sleepy time over".');
    /**
     * Execute command, using execFile. Output is not displayed by default, but we can pipe it
     * to stdout. Also, we can access the output via process.stdout and resolve/reject using 
     * a callback function, verifyExecutionCompleted. We use await in this example.
     */
    const result = await execute(cmd, USE_EXECFILE, verifyExecutionCompleted);
    console.log('Result with await is: ' + result);
    console.log('--------\n');
})();
