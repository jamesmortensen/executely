const execFile = require('child_process').execFile;
const spawn = require('child_process').spawn;

function execute(cmd, stdoutEnabled, cb) {
    stdoutEnabled = typeof (stdoutEnabled) === 'undefined' ? false : stdoutEnabled;
    return new Promise((resolve, reject) => {
        const childProcess = executeProcess(cmd, stdoutEnabled);

        if (processIsExecFile(childProcess)) {  // using execFile and stdoutEnabled is false
            childProcess.stdout.on('data', (output) => {
                childProcess.disableOutput = typeof (childProcess.disableOutput) === 'undefined'
                    ? false
                    : childProcess.disableOutput;
                if (!childProcess.disableOutput)
                    console.log('process.stdout: ' + output);
                if (cb)
                    cb(output, childProcess, resolve, reject);
                resolve(output);
            });

            if (childProcess.stderr)
                childProcess.stderr.on('data', (output) => {
                    console.error(output);
                    reject(output);
                });
        }

        childProcess.on('close', (code) => {
            if (code !== 0)
                reject(code);
            else
                resolve(code);
        });
    });
}

function processIsExecFile(childProcess) {
    return childProcess.stdout;
}

function executeProcess(cmd, stdoutEnabled) {
    if (!stdoutEnabled)
        return spawn(
            cmd.split(' ')[0],
            cmd.split(' ').filter(
                (arg, index) => {
                    if (index != 0)
                        return arg;
                }
            ), { stdio: 'inherit', env: { ...process.env } }
        );
    else
        return execFile(
            cmd.split(' ')[0],
            cmd.split(' ').filter(
                (arg, index) => { 
                    if (index != 0)
                        return arg; 
                }
            ), { shell: '/bin/bash' }
        );
}

module.exports = {
    execute: execute
}
