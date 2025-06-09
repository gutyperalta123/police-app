// frontend/build.js
const { execSync } = require('child_process');

try {
  execSync('npx react-scripts build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Error al ejecutar react-scripts build:', error);
  process.exit(1);
}
