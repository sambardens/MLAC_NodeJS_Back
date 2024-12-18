module.exports = {
  apps : [{
    script: './index.js',
    name: 'major-labl-api',
    env: {
      NODE_ENV: 'production'
    },
    // exec_mode: 'fork',
    instance: '1',
  }]
};
