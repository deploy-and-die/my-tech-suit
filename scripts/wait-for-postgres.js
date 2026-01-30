#!/usr/bin/env node
const net = require("net");
const { spawn } = require("child_process");

const DEFAULT_URL = "postgresql://mytech:mytech@localhost:5432/mytech?schema=public";

function getTarget() {
  const rawUrl = process.env.DATABASE_URL || DEFAULT_URL;
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch (err) {
    throw new Error(`Invalid DATABASE_URL: ${rawUrl}`);
  }
  const host = parsed.hostname || "localhost";
  const port = parsed.port ? Number(parsed.port) : 5432;
  return { host, port };
}

function waitForPort(host, port, timeoutMs) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const socket = net.connect({ host, port }, () => {
        socket.end();
        resolve();
      });

      socket.on("error", (err) => {
        socket.destroy();
        if (Date.now() - started > timeoutMs) {
          reject(new Error(`Timed out waiting for ${host}:${port}: ${err.message}`));
          return;
        }
        setTimeout(attempt, 1000);
      });
    };

    attempt();
  });
}

function resolvePrismaCli() {
  try {
    return require.resolve("prisma/build/index.js");
  } catch (err) {
    return null;
  }
}

async function runMigrations() {
  const { host, port } = getTarget();
  const timeoutMs = Number(process.env.DB_WAIT_TIMEOUT_MS || 60000);
  console.log(`Waiting for PostgreSQL at ${host}:${port}...`);
  await waitForPort(host, port, timeoutMs);
  console.log("PostgreSQL is reachable. Running migrations (prisma migrate deploy)...");

  await new Promise((resolve, reject) => {
    const prismaCli = resolvePrismaCli();
    const command = prismaCli ? process.execPath : "npx";
    const args = prismaCli
      ? [prismaCli, "migrate", "deploy"]
      : ["--no-install", "prisma", "migrate", "deploy"];
    const child = spawn(command, args, {
      stdio: "inherit",
      env: process.env,
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`prisma migrate deploy exited with code ${code}`));
      }
    });

    child.on("error", reject);
  });

  console.log("Migrations completed successfully.");
}

runMigrations().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
