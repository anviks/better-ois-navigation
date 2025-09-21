import fs from 'fs-extra';

const target = process.argv[2];

fs.emptyDirSync(`build/${target}`);

fs.copySync('src/common', `build/${target}`);
fs.copySync(`src/${target}`, `build/${target}`);
