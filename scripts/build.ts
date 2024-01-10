import { copyFileSync, existsSync, readFileSync, writeFileSync, rmSync } from 'fs';
// import { withSpinner, success } from '@paperdave/logger';
import { execSync } from 'child_process';
import { join } from 'path';

const jsonFile = join(__dirname, '..', 'package.json');
const packagesDir = join(__dirname, '..', 'packages');

(async () => {
    let packageJson;

    /* await withSpinner({
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
        text: 'Removing packages directory.',
        successText: 'Removed packages directory.',
    }, async (spinner) => {
        try {
            rmSync(packagesDir, { recursive: true, force: true });
        } catch (err) {
            spinner.error('Could not remove packages directory.');
            process.exit(1);
        }
    });

    await withSpinner({
        text: 'Compiling typescript files.',
        successText: 'Compiled typescript files.',
    }, async (spinner) => {
        try {
            execSync('tsc --skipLibCheck');
        } catch (err) {
            spinner.error('Could not compile typescript files.');
            process.exit(1);
        }
    });

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

    success('Finished build script.'); */

    process.stdout.write('Checking for packages directory.', async () => {
        try {
            if (!existsSync(packagesDir)) {
                process.stdout.write('The packages directory does not exist.');
                process.exit(1);
            }
            process.stdout.write('Found packages directory.');
        } catch (err) {
            process.stdout.write('Something went wrong.');
            process.exit(1);
        }
    });

    process.stdout.write('Removing packages directory.', async () => {
        try {
            rmSync(packagesDir, { recursive: true, force: true });
        } catch (err) {
            process.stdout.write('Could not remove packages directory.');
            process.exit(1);
        }
    });

    process.stdout.write('Compiling typescript files.', async () => {
        try {
            execSync('tsc --skipLibCheck');
        } catch (err) {
            process.stdout.write('Could not compile typescript files.');
            process.exit(1);
        }
    });

    process.stdout.write('Checking for package.json file.', async () => {
        try {
            if (!existsSync(jsonFile)) {
                process.stdout.write('Failed to find package.json file.');
                process.exit(1);
            }
            process.stdout.write('Found package.json file.');
            packageJson = JSON.parse(readFileSync(jsonFile, 'utf8'));
        } catch (err) {
            process.stdout.write('Failed to read package.json data.');
            process.exit(1);
        }
    });

    process.stdout.write('Creating package.json file in packages directory.', async () => {
        try {
            const packageJsonDist = {
                ...packageJson,
                main: 'dist/index.js',
                scripts: undefined,
                'lint-staged': undefined,
                devDependencies: undefined,
                peerDependencies: undefined
            };

            writeFileSync(join(packagesDir, 'package.json'), JSON.stringify(packageJsonDist, null, 2));
        } catch (err) {
            process.stdout.write('Could not create package.json file in packages directory.');
            process.exit(1);
        }
    });

    const filesToCopy = ['CODE_OF_CONDUCT.md', 'CONTRIBUTING.md', 'LICENSE', 'README.md'];

    process.stdout.write(`Copying files to packages directory: ${filesToCopy.join(', ')}`, async () => {
        try {
            filesToCopy.forEach((file) => {
                copyFileSync(join(__dirname, '..', file), join(packagesDir, file));
            });
        } catch (err) {
            process.stdout.write('Could not copy files to packages directory.');
            process.exit(1);
        }
    });

    process.stdout.write('Finished build script.');
})();
