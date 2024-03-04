# Chat Bridge Changelog

## 2.0.1

### Patch Changes

Chat Bridge v2.0.1 introduces documentation enhancements and workflow refinements to streamline development processes and improve project organization. Dive into the details of this incremental update:

#### Documentation Improvements:

-   **API Documentation:**
    -   Adds comprehensive documentation for templates, providing clear guidelines on their usage and integration within the Chat Bridge ecosystem.

#### Package Updates:

-   **Dependency Upgrades:**
    -   Updates package versions to leverage the latest features and improvements, ensuring compatibility and stability across the project.
    -   Includes updates to various dependencies, such as `fastify` and `undici`.

#### Project Refactoring:

-   **File and Directory Restructuring:**
    -   Refactors project files and directories for improved organization and maintainability.
    -   Ensures a more coherent structure to facilitate easier navigation and development.

#### Workflow Enhancements:

-   **GitHub Actions Workflow Updates:**
    -   Enhances GitHub Package workflow for authentication, ensuring secure and seamless package management.
    -   Updates GitHub Actions workflows to optimize CI/CD processes and improve overall project efficiency.

#### Upgrading Instructions:

Upgrade to Chat Bridge v2.0.1 to benefit from enhanced documentation and streamlined workflows. Follow the updated documentation to explore the newly added templates and leverage the improved project structure for a more efficient development experience.

As always, we appreciate your feedback and contributions to making Chat Bridge a robust and reliable communication solution. Happy coding with Chat Bridge v2.0.1!

## 2.0.0

### Major Changes

Chat Bridge v2.0.0 marks a significant milestone in the project's evolution by transitioning from CommonJS to ECMAScript Modules (ESM), paving the way for seamless integration with TypeScript, ES Modules, and enhanced auto-complet in IDEs like VSCode. Explore the exciting changes and improvements in this release:

#### Modern JavaScript Support:

-   **Migration to ESM:**
    -   Embraces ECMAScript Modules (ESM) for improved interoperability with modern JavaScript environments, including TypeScript and ES Modules.
    -   Enables smoother development workflows and enhanced code organization.

#### Package Updates:

-   **Dependency Upgrades:**
    -   Updates package versions to leverage the latest features and improvements, ensuring compatibility and stability across the project.
    -   Includes updates to various dependencies, such as `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`.

#### Documentation Enhancements:

-   **API Reference and Package Organization:**
    -   Enhances API reference and documentation to reflect the latest changes and package organization.
    -   Provides clear guidelines for developers transitioning to ESM and leveraging TypeScript support.

#### Codebase Maintenance:

-   **Dependency Management:**
    -   Manages dependencies effectively with updated package versions, maintaining a healthy and up-to-date development environment.
    -   Ensures compatibility and stability with the latest ecosystem changes.

#### Upgrading Instructions:

Upgrade to Chat Bridge v2.0.0 today to unlock the benefits of ESM support, TypeScript integration, and improved development workflows. Follow the updated documentation to seamlessly migrate your project and take advantage of the latest features and enhancements.

As always, we value your feedback and contributions to making Chat Bridge a robust and versatile communication solution. Happy coding with Chat Bridge v2.0.0!

## 1.3.0

### Minor Changes

Chat Bridge v1.3.0 is here, packed with enhancements to fortify security, streamline workflows, and enrich your development experience. Dive into the details of this exciting release:

#### Security Improvements:

-   **Enhanced Security Measures:**
    -   Introduces `SECURITY.md` with contact information for Chat Bridge, ensuring clear communication channels for addressing security concerns.

#### Workflow Enhancements:

-   **Workflow Optimization:**
    -   Adds CodeQL workflow to bolster code quality assessment and ensure robustness across the codebase.
    -   Updates npm ecosystem directory to source for improved dependency management.

#### Documentation Updates:

-   **Feature and Benefit Enhancements:**

    -   Updates features and benefits documentation to reflect the latest capabilities of Chat Bridge.

-   **API Reference and Guides:**
    -   Enhances API reference and guides documentation for clearer understanding and seamless integration.

#### Project Structure Refinements:

-   **Dependency Management:**

    -   Removes unused dependency `@fastify/static` to streamline project dependencies.

-   **Restructuring:**
    -   Restructures the project for improved organization and maintainability.

#### New Features and Functionality:

-   **Client Class Enhancements:**

    -   Empowers the `Client` class with enhanced functionality:
        -   Retrieves page information automatically upon startup for streamlined configuration.

-   **Template and Element Additions:**

    -   Introduces new elements and templates to enrich messaging capabilities and enhance user interaction.

-   **TypeScript Support:**
    -   Adds TypeScript support with the inclusion of various button types and templates for seamless integration and improved type safety.

#### Upgrading Instructions:

Upgrade to Chat Bridge v1.3.0 today to benefit from strengthened security measures, optimized workflows, and enhanced documentation. Stay ahead of the curve with the latest features and improvements in Chat Bridge!

As always, we welcome your feedback and contributions to make Chat Bridge even better. Happy coding!

**Full Changelog**: https://github.com/BadEnd777/Chat-Bridge/compare/v1.2.1...v1.3.0

## 1.2.1

### Patch Changes

Chat Bridge v1.2.1 is here, resolving a critical module resolution issue that led to the 'Cannot find module @fastify/static' error during execution. This release streamlines dependencies, removes unnecessary imports and code related to `fastifyStatic`, ensuring a smoother development experience.

#### Bug Fix:

-   **Module Resolution Issue:**
    -   Fixes the 'Cannot find module @fastify/static' error that occurred during execution, providing a seamless development environment.

#### Code Cleanup:

-   **Removal of Unnecessary Imports:**
    -   Cleans up the codebase by removing unnecessary imports and code related to `fastifyStatic`, contributing to a more concise and maintainable code structure.

#### Version Update:

-   **Version Bump to 1.2.1:**
    -   Updates the version to 1.2.1 to reflect the bug fix and code adjustments included in this release.

#### Upgrading Instructions:

To incorporate the fixes and improvements from Chat Bridge v1.2.1 into your project, follow these steps:

1. **Update Dependencies:**

    - Ensure that your project's dependencies are updated to the latest versions.

2. **Verify Import Statements:**

    - Confirm that import statements related to `@fastify/static` are correctly resolved.

3. **Remove Unnecessary Code:**

    - Check for and remove any unnecessary imports or code related to `fastifyStatic`.

4. **Update to Version 1.2.1:**
    - Upgrade your Chat Bridge package to version 1.2.1 to benefit from the bug fix and code cleanup.

With these steps, you'll enjoy a more stable and error-free Chat Bridge experience. Upgrade to Chat Bridge v1.2.1 today and keep your development journey smooth and hassle-free!

## 1.2.0

### Minor Changes

Get ready for an improved Chat Bridge experience with version 1.2.0! This release addresses a critical bug, refactors imports for better module resolution, and introduces exciting new methods to elevate the functionality of the `Client` class.

#### Key Changes:

##### Bug Fixes and Refactoring:

-   **Bug Resolution:**

    -   Addresses the 'Cannot find module' bug, ensuring a smoother development experience by resolving module import issues.

-   **Import Refactor:**
    -   Overhauls import statements for enhanced readability and improved module resolution.

##### Client Class Enhancements:

-   **New Methods for Improved Interaction:**

    -   **`send` Method:**

        -   Introduces the `send` method to the `Client` class, streamlining the process of sending various types of messages for improved readability.

    -   **`setTyping` Method:**
        -   Adds the `setTyping` method to the `Client` class, providing control over the typing indicator to enhance user interaction.

-   **Property Access Modifier Refactoring:**
    -   Refactors access modifiers for the `endpoint`, `port`, and `host` properties in the `Client` class, optimizing code structure and maintainability.

#### Upgrading Instructions:

To benefit from the latest enhancements and bug fixes, follow these steps to upgrade to Chat Bridge v1.2.0:

1. **Update Dependencies:**

    - Ensure all dependencies are up-to-date.

2. **Update Import Statements:**

    - Refactor import statements in your codebase as per the updated structure.

3. **Explore New Methods:**

    - Take advantage of the newly introduced `send` and `setTyping` methods in the `Client` class for a more versatile interaction with the API.

4. **Enjoy a Smoother Experience:**
    - Experience a more stable and feature-rich Chat Bridge with the resolved bug and expanded functionalities.

Upgrade to Chat Bridge v1.2.0 today and leverage these improvements for a more robust and enjoyable development journey!

## 1.1.0-alpha

### Minor Changes

We're excited to unveil a fresh update packed with improvements for smoother communication and development. Here's what's new:

#### Key Enhancements:

-   **Streamlined Imports for Better Organization:**
    -   Types/interfaces now have a direct home at `@/interfaces`.
    -   Import statements have been thoughtfully reordered for optimal clarity.
-   **Unlocking Additional Communication Methods:**
    -   Send messages, attachments, images, audio, video, and files with ease using these new methods:
        -   `sendApiMessage`
        -   `sendAttachment`
        -   `sendImage`
        -   `sendAudio`
        -   `sendVideo`
        -   `sendFile`
-   **Plugin Power Unleashed:**
    -   A new example demonstrates how to register plugins (like fastify-cors) using the `register` method, expanding customization possibilities.
-   **Enhanced Error Handling for Clearer Insights:**
    -   Error messages in `sendRequest` now include the response body when requests fail, providing more actionable information for troubleshooting.
-   **Minor Code Organization Tweaks for Smooth Sailing:**
    -   Import statements have been fine-tuned for enhanced code readability.

#### Code Structure Refinements:

-   **Class Name Harmony:** `Collection` in v1.0.0-alpha-alpha has evolved into `Collections` in v1.1.0-alpha.
-   **File Organization Optimization:**
    -   Version 1.1.0-alpha introduces a more modular approach, with `Collections` defined and exported in a separate module alongside imported interfaces.
-   **Interface Import Streamlining:**
    -   The `Identifiable` interface now resides in `@/interfaces` for consistent import across files.

**Ready to experience these enhancements? Update to Chat Bridge v1.1.0-alpha today and unleash a more streamlined and versatile communication experience!**

## 1.0.0-alpha

### Major Changes

Embark on a journey with the inaugural release of Chat Bridge v1.0.0-alpha! This version lays the foundation for streamlined communication and introduces key components to kickstart your development experience.

#### Core Components:

##### 1. **Client Class:**

-   Located at `src/core/client.js`, the `Client` class forms the heart of Chat Bridge, providing a robust structure for handling communication tasks.
-   Includes functionalities for handling webhook verification, processing incoming messages, and initiating API requests.

##### 2. **Constants Module:**

-   Centralizes essential URLs at `src/core/constants.js`, offering a clean structure for managing base and message URLs.
-   Features `BASE_URL` and `MESSAGE_URL` for constructing API endpoints.

##### 3. **Collection Class:**

-   Defined in `src/core/collection.js`, the `Collection` class sets the groundwork for managing identifiable items.
-   Allows adding, retrieving, and removing items, showcasing the foundation for efficient data handling.

#### Key Functionality:

-   **Webhook Handling:**

    -   Implements methods for verifying webhook subscriptions and processing incoming messages.

-   **API Requests:**

    -   Incorporates the `sendRequest` method for making API requests with proper error handling.

-   **Static File Hosting:**

    -   Introduces static file hosting capabilities, enabling the serving of static assets.

-   **Page Information Retrieval:**

    -   Retrieves and stores information about the connected Facebook page.

-   **Messaging Capabilities:**
    -   Provides a basic `sendTextMessage` method for sending text messages via the Facebook Graph API.

#### Get Started:

Ready to dive into the world of Chat Bridge? Start by integrating v1.0.0-alpha-alpha into your project and lay the groundwork for seamless communication. We look forward to your feedback as you explore the initial functionalities of Chat Bridge!
