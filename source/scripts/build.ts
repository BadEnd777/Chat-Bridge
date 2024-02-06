import { existsSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { withSpinner, success } from '@paperdave/logger';
import { execSync } from 'child_process';
import { join } from 'path';

const rootPath = join(__dirname, '..', '..');
const packagePath = join(rootPath, 'packages');
const distPath = join(packagePath, 'dist');
const jsonFileToCopy = join(rootPath, 'source', 'package.json');
const jsonFileOutput = join(packagePath, 'package.json');

interface PackageJson {
    name: string;
    version: string;
    description: string;
    main: string;
    scripts: Record<string, string>;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    peerDependencies: Record<string, string>;
}

(async () => {
    let packageJson: PackageJson;

    // Check if distPath is not exists, then create it.
    // If exists, then remove all files in it.
    await withSpinner({
        text: 'Checking dist folder...',
        successText: 'Dist folder is ready.',
    }, async (spinner) => {
        try {
            if (!existsSync(packagePath)) {
                spinner.update('Creating packages folder...');
                try {
                    execSync(`mkdir ${packagePath}`);
                } catch (error) {
                    spinner.error('Failed to create packages folder.');
                    throw error;
                }
            }

            if (!existsSync(distPath)) {
                spinner.update('Creating dist folder...');
                try {
                    execSync(`mkdir ${distPath}`);
                } catch (error) {
                    spinner.error('Failed to create dist folder.');
                    throw error;
                }
            }

            spinner.update('Removing all files in dist folder...');
            rmSync(`${distPath}/*`, { recursive: true, force: true });
        } catch (error) {
            spinner.error('Failed to remove all files in dist folder.');
            throw error;
        }
    });

    // Read package.json file
    await withSpinner({
        text: 'Reading package.json file...',
        successText: 'package.json file is ready.',
    }, async (spinner) => {
        try {
            packageJson = JSON.parse(readFileSync(jsonFileToCopy, 'utf8'));
        } catch (error) {
            spinner.error('Failed to read package.json file.');
            throw error;
        }
    });

    // Copy package.json file to packages folder
    await withSpinner({
        text: 'Copying package.json file...',
        successText: 'package.json file is copied.',
    }, async (spinner) => {
        try {
            const newPackageJson = {
                ...packageJson,
                main: 'dist/index.js',
                scripts: undefined,
                dependencies: {
                    ...packageJson.dependencies
                },
                devDependencies: undefined,
                peerDependencies: undefined
            };

            writeFileSync(jsonFileOutput, JSON.stringify(newPackageJson, null, 2));
        } catch (error) {
            spinner.error('Failed to copy package.json file.');
            throw error;
        }
    });

    const filesToCopy = ['CODE_OF_CONDUCT.md', 'CONTRIBUTING.md', 'LICENSE', 'README.md'];
    await withSpinner({
        text: 'Copying markdown files...',
        successText: 'Markdown files are copied.',
    }, async (spinner) => {
        try {
            for (const file of filesToCopy) {
                const source = join(rootPath, file);
                const destination = join(packagePath, file);
                // execSync(`cp ${source} ${destination}`); // 'cp' is not recognized as an internal or external command,
                writeFileSync(destination, readFileSync(source, 'utf8'));
            }
        } catch (error) {
            spinner.error('Failed to copy markdown files.');
            throw error;
        }
    });

    // Compile typescript files
    await withSpinner({
        text: 'Compiling typescript files...',
        successText: 'Typescript files are compiled.',
    }, async (spinner) => {
        try {
            execSync('tsc --skipLibCheck');
        } catch (error) {
            spinner.error('Failed to compile typescript files.');
            throw error;
        }
    });

    success('Build is done.');
})();