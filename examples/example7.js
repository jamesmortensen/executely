const execute = require('executely').execute;

(async () => {
    console.log('Seventh example with spawn: we cannot use "&&". With spawn, only one command at');
    console.log('a time is supported unless we use multiple execs.');
    /*
     * execute a command, using spawn. 
     * We cannot access output, and it's sent to stdout by default.
     */
    try {
        await execute('ls -ltrSha && ls', false).then((statusCode) => {
            console.log('spawn: ' + statusCode);
            console.log('-------');
        });
    } catch (e) {
        console.error('Using spawn with "&&" is not supported: error code ' + e);
    }

    console.log('--------\n');
    console.log('If we use Promise.all and map each cmd to execute, they all run at the same time, so');
    console.log('sleep has no effect on splitting up the 2 ls commands:');
    const cmds = ['ls -ltrSha', 'sleep 3', 'ls'];
    await Promise.all(
        cmds.map(cmd =>
            execute(cmd, false)
        )
    );

    console.log('--------\n');
    console.log('To run one after another, use 3 separate, awaited execute commands: ');
    await execute(cmds[0], false);
    await execute(cmds[1], false);
    await execute(cmds[2], false);
})();
