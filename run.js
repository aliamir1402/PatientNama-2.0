const { exec } = require('child_process');

// Define the command you want to run
const command = 'npm start';

// Execute the command
const child = exec(command);

// Listen for the command's output
child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

// Listen for any errors that occur during execution
child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// Listen for the command's exit event
child.on('exit', (code) => {
  console.log(`Child process exited with code ${code}`);
});
