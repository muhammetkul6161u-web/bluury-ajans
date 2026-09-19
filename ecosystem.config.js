module.exports = {
  apps: [
    {
      name: 'bluury-backend',
      script: 'server.js',
      cwd: './backend',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      }
    }
  ]
};
