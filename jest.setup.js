const { existsSync } = require('node:fs');
const { join } = require('node:path');
const { execSync } = require('node:child_process');

module.exports = async () => {
  const libPath = join(__dirname, 'lib', 'lib.js');

  if (!existsSync(libPath)) {
    execSync('npm run build', { stdio: 'inherit' });
  }
};
