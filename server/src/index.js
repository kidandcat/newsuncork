/* eslint-disable no-console */
const logger = require("winston");
const app = require("./app");
const port = app.get("port");
const { spawn } = require("child_process");
const child = spawn("node", ["./db.js"]);
child.stdout.on("data", d => {
  console.log(d.toString("utf8"));
});
child.stderr.on("data", d => {
  console.error(d.toString("utf8"));
});

setTimeout(() => {
  const server = app.listen(port);
  server.on("listening", () =>
    logger.info(
      "Feathers application started on http://%s:%d",
      app.get("host"),
      port
    )
  );
}, 3000);

process.on("unhandledRejection", (reason, p) =>
  logger.error("Unhandled Rejection at: Promise ", p, reason)
);
