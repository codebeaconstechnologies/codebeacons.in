'use strict';
const { execSync } = require('child_process');

// opennextjs-cloudflare build calls npm run build internally.
// OPENNEXT_BUILD=1 tells us we are that inner call — run next build directly.
if (process.env.OPENNEXT_BUILD === '1') {
  execSync('npx next build', { stdio: 'inherit' });
} else {
  execSync('npx opennextjs-cloudflare build', {
    stdio: 'inherit',
    env: { ...process.env, OPENNEXT_BUILD: '1' },
  });
}
