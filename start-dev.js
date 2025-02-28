const { spawn } = require('child_process');
const path = require('path');

// Start webpack dev server
console.log('Starting webpack dev server...');
const webpackDevServerProcess = spawn('node', ['webpack-dev-server.js'], {
  stdio: 'inherit',
  shell: true
});

// Wait for webpack dev server to start
setTimeout(() => {
  // Start Electron
  console.log('Starting Electron...');
  const electronProcess = spawn('electron', ['.'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'development'
    },
    shell: true
  });

  // Handle clean shutdown
  const cleanup = () => {
    console.log('Shutting down processes...');
    electronProcess.kill();
    webpackDevServerProcess.kill();
    process.exit();
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  electronProcess.on('close', (code) => {
    console.log(`Electron process exited with code ${code}`);
    webpackDevServerProcess.kill();
    process.exit(code);
  });
}, 3000); // Give webpack dev server some time to start
