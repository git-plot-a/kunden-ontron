
module.exports = {
  apps: [{
    name: 'ontron-kunden-prod-frontend',
    script: './node_modules/next/dist/bin/next',
    exec_mode: 'cluster',
    args: 'start -p 3000',
    instances: 2,
    kill_timeout: 120000,
    watch: false,
    env: {
      NEXT_PUBLIC_HOST: 'PROD'
    }
  }]
};