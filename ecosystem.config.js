module.exports = {
  apps: [
    {
      name: "SERVER",
      script: "server/src/index.js",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],
  deploy: {
    production: {
      user: "root",
      host: "suncork.net",
      ref: "origin/master",
      repo: "https://github.com/kidandcat/newsuncork",
      path: "/root/newsuncork",
      "post-deploy":
        "npm install && npm build && pm2 reload ecosystem.config.js --env production"
    }
  }
};
