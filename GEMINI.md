## Project Overview

This is a Next.js web application designed to help users create and share their love or friendship stories. It allows users to document special moments, which are then presented on a dedicated webpage. The project leverages modern web technologies to provide a dynamic and engaging user experience.

**Key Features:**

*   **Story Creation:** Users can input details about their relationship or friendship, including special moments.
*   **Interactive Display:** Stories are presented on a dedicated, shareable webpage with animations and interactive elements.
*   **Responsive Design:** Built with Tailwind CSS and Radix UI for a mobile-first and accessible experience.

**Technologies Used:**

*   **Framework:** Next.js (React)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, Radix UI
*   **State Management:** Zustand
*   **Animations:** Framer Motion
*   **Error Tracking:** Sentry
*   **Analytics:** Vercel Analytics & Speed Insights

## Building and Running

To get the project up and running, follow these steps:

1.  **Install Dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Run in Development Mode:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    This will start the development server, usually accessible at `http://localhost:3000`.

3.  **Build for Production:**

    ```bash
    npm run build
    # or
    yarn build
    ```

    This command compiles the application for production deployment.

4.  **Start Production Server:**

    ```bash
    npm run start
    # or
    yarn start
    ```

    After building, this command starts the Next.js production server.

5.  **Linting:**

    ```bash
    npm run lint
    # or
    yarn lint
    ```

    This command runs ESLint to check for code quality and style issues.

## Development Conventions

*   **Component-Based Architecture:** The application follows a component-based structure, with UI components organized in the `components/` directory.
*   **TypeScript:** The project is written entirely in TypeScript, ensuring type safety and better code maintainability.
*   **Tailwind CSS:** Styling is primarily handled using Tailwind CSS for utility-first styling, complemented by Radix UI for accessible component primitives.
*   **ESLint:** Code quality is maintained using ESLint, with configurations defined in `.eslintrc.json`.
*   **Zustand:** Global state management is handled by Zustand, a small, fast, and scalable bear-bones state-management solution.
