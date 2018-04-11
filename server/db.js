const kill = require("kill-port");
const { spawn, execSync } = require("child_process");

kill(26257).then(() => {
  const binary =
    process.platform === "darwin" ? "./cockroach-mac" : "./cockroach-linux";
  spawn(binary, ["start", "--insecure", "--host=localhost"]);
  setTimeout(() => {
    try {
      console.log("DB started");
      execSync(`${binary} user set suncork --insecure`);
      console.log("user created");
    } catch (e) {}
    try {
      execSync(`${binary} sql --insecure -e 'CREATE DATABASE suncork_server'`);
      console.log("database created");
    } catch (e) {}
    try {
      execSync(
        `${binary} sql --insecure -e 'GRANT ALL ON DATABASE suncork_server TO suncork'`
      );
      console.log("permissions granted");
    } catch (e) {}
  }, 1000);
});
