#!/usr/bin/env node

/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable import/unambiguous */
/* eslint-disable import/no-commonjs */
/* eslint-disable node/shebang */

const fs = require('fs').promises;
const path = require('path');

const main = async (resolutions) => {
  const packageLockFilePath = path.resolve(__dirname, '../package-lock.json');

  for (const [name, version] of Object.entries(resolutions)) {
    const packageLock = JSON.parse(await fs.readFile(packageLockFilePath));

    const packagePaths = Object.keys(packageLock.packages);

    const deletePaths = [];

    for (const packagePath of packagePaths) {
      if (packagePath.endsWith('/' + name)) {
        if (packageLock.packages[packagePath].version !== version) {
          deletePaths.push(packagePath);
        }
      }
    }

    for (const packagePath of deletePaths) {
      for (const deletePath of deletePaths) {
        if (packagePath === deletePath || packagePath.startsWith(deletePath + '/')) {
          // eslint-disable-next-line fp/no-delete
          delete packageLock.packages[packagePath];
        }
      }
    }

    await fs.writeFile(
      packageLockFilePath,
      JSON.stringify(packageLock, null, '  '),
    );
  }
};

main(require('../package.json').resolutions);