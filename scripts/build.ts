import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs';
import {
    info,
    success,
    withSpinner
} from '@paperdave/logger';
import { join } from 'path';

info('Starting build script...');

const jsonFile = join(__dirname, '..', 'package.json');
const packagesDir = join(__dirname, '..', 'packages');

(async () => {
    let packageJson;

    await withSpinner({
        text: 'Checking for package.json file.',
        successText: 'Found package.json file.',
    }, async (spinner) => {
        try {
            if (!existsSync(jsonFile)) {
                spinner.error('Failed to find package.json file.');
                process.exit(1);
            }
            spinner.update('Found package.json file.');
            packageJson = JSON.parse(readFileSync(jsonFile, 'utf8'));
        } catch (err) {
            spinner.error('Failed to read package.json data.');
            process.exit(1);
        }
    });

    await withSpinner({
        text: 'Checking for packages directory.',
        successText: 'Found packages directory.',
    }, async (spinner) => {
        try {
            if (!existsSync(packagesDir)) {
                spinner.error('The packages directory does not exist.');
                 process.exit(1);
            }
            spinner.update('Found packages directory.');
        } catch (err) {
            spinner.error('Something went wrong.');
             process.exit(1);
        }
    });

    await withSpinner({
        text: 'Creating package.json file in packages directory.',
        successText: 'Created package.json file in packages directory.',
    }, async (spinner) => {
        try {
            const packageJsonDist = {
                ...packageJson,
                main: 'dist/index.js',
                scripts: undefined,
                'lint-staged': undefined,
                devDependencies: undefined,
                peerDependencies: undefined,
            };

            writeFileSync(join(packagesDir, 'package.json'), JSON.stringify(packageJsonDist, null, 2));
        } catch (err) {
            spinner.error('Could not create package.json file in packages directory.');
             process.exit(1);
        }
    });

    const filesToCopy = ['CODE_OF_CONDUCT.md', 'CONTRIBUTING.md', 'LICENSE', 'README.md'];

    await withSpinner({
        text: `Copying files to packages directory: ${filesToCopy.join(', ')}`,
        successText: 'Copied files to packages directory.',
    }, async (spinner) => {
        try {
            filesToCopy.forEach((file) => {
                copyFileSync(join(__dirname, '..', file), join(packagesDir, file));
            });
        } catch (err) {
            spinner.error('Could not copy files to packages directory.');
             process.exit(1);
        }
    });

    success('Finished build script.');
})();