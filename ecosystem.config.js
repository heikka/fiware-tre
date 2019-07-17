module.exports = {
  apps: [{
    name: 'Capelon',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-165-145-234.compute-1.amazonaws.com',
      key: 'c:\Users\heikki\.ssh\capelon.pem',
      key: '~/.ssh/capelon.pem',
      ref: 'origin/master',
      repo: 'git@github.com:heikka/fiware-tre.git',
      path: '/home/ubuntu/fiware-tre',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}