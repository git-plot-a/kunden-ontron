module.exports = {
  apps: [{
    name: 'ontron-frontend',
    script: './node_modules/next/dist/bin/next',
    exec_mode: 'cluster',
    instances: 2,
    kill_timeout: 120000,
    watch: false,
    args: 'start -p 10024',
  }]
};