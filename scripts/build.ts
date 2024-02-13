import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const rootDir = path.resolve(__dirname, '..');
const packageDir = path.resolve(rootDir, 'package');
const distDir = path.resolve(packageDir, 'dist');
const sourceDir = path.resolve(rootDir, 'source');
const testDir = path.resolve(rootDir, 'test');

const main = async () => {
    try {
        // Clean up the package directory
        if (fs.existsSync(packageDir)) {
            fs.rmSync(packageDir, { recursive: true, force: true });
        }

        // Create a new package directory
        fs.mkdirSync(packageDir);
        // Create a new dist directory
        fs.mkdirSync(distDir);

        // Compile the source code
        process.chdir(sourceDir);
        execSync('tsup', { stdio: 'inherit' });

        // Copy all the files from the source directory to the package directory
        fs.readdirSync(`${sourceDir}/dist`).forEach((file) => {
            fs.copyFileSync(path.resolve(sourceDir, 'dist', file), path.resolve(distDir, file));
        });
        
        // Copy the package.json file from the source directory to the package directory
        const packageJson = JSON.parse(fs.readFileSync(path.resolve(sourceDir, 'package.json'), 'utf-8'));

        delete packageJson.scripts;
        delete packageJson.devDependencies;
        delete packageJson.peerDependencies;

        fs.writeFileSync(path.resolve(packageDir, 'package.json'), JSON.stringify(packageJson, null, 2));

        // Copy the README.md, LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, and SECURITY.md files from the root directory to the package directory
        const files = ['CODE_OF_CONDUCT.md', 'CONTRIBUTING.md', 'LICENSE', 'README.md', 'SECURITY.md'];
        files.forEach((file) => {
            fs.copyFileSync(path.resolve(rootDir, file), path.resolve(packageDir, file));
        });

        // Publish package to yalc local registry for testing
        process.chdir(packageDir);
        execSync('yalc publish', { stdio: 'inherit' });

        // Install the package in the test directory
        process.chdir(testDir);
        execSync(`yalc add ${packageJson.name}`, { stdio: 'inherit' });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

main();