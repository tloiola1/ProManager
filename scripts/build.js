// let args = ["install"];
// let opts = { stdio: "inherit", cwd: "client", shell: true };
// require("child_process").spawn("npm", args, opts);

// args = ["run build"];
// opts = { stdio: "inherit", cwd: "client", shell: true };
// require("child_process").spawn("npm", args, opts);

const exec = require("child_process").exec;

process.chdir('client');
return exec('npm install & npm run build');