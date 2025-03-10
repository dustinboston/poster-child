# Poster Child: A Simple, Git-Backed CMS

![Screenshot 2025-03-10 071158](https://github.com/user-attachments/assets/5679c7e6-f1dc-4aa4-8b65-c6ed9b7e42f4)

> Poster Child is a single page "content management system" (CMS) built with Node.js, Express, and Octokit, designed for users who want to manage their content directly within a Git repository. It provides a straightforward interface for creating, editing, and managing markdown posts, along with associated metadata.

## Features

* **Git-Based Storage:** All content and metadata are stored directly in a Git repository, enabling version control, collaboration, and easy backups.
* **Metadata Management:** Easily define metadata for your posts, including title, date, slug, categories, tags, keywords, and descriptions.
* **Draft Management:** Mark posts as drafts to keep them hidden from public view until you're ready to publish.
* **Simple Interface:** An intuitive UI for creating and editing content.
* **Octokit Integration**: Uses Octokit to interact with the Github API, enabling it to read and write files directly to a Github repository.

## Prerequisites

* **Node.js:** Ensure you have Node.js and npm installed on your system. You can check by running:
    ```bash
    node -v
    npm -v
    ```
* **Git:** Git needs to be installed and configured on your system.
* **GitHub Account:** You'll need a GitHub account to store your content repository.
* **Github Personal Access Token:** You'll need a Github personal access token with `repo` scope.

## Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/dustinboston/poster-child
    cd poster-child
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    *   Create a `.env` file in the project's root directory.
    *   Add the following environment variables, replacing the placeholders with your actual values:
        ```
        GITHUB_ACCESS_TOKEN=<your-github-personal-access-token>
        GITHUB_USERNAME=<your-github-username>
        GITHUB_REPOSITORY=<your-github-repository-name>
        CONTENT_PATH=main #Or whichever branch you use.
        ```
    *Note: you must have a branch on the repo and at least one file to begin.*

## Usage

1.  **Start the Server:**
    ```bash
    npm start
    ```
    This will start the Poster Child application (default is `3000`).

2.  **Access the Application:**
    Open your web browser and go to `http://localhost:3000` (or the port you configured).

3.  **Creating/Editing Content:**
    *   The application will present a list of files it finds in your repo.
    *   Click "+ New Post" to create a new post.
    *   Fill in the title, content, and any metadata you need.
    *   Use the "Draft" dropdown to mark a post as a draft (not yet published).
    *   Click "Save Post" to save your changes to the git repository.
    *   Each time you press save a new commit will be added to the repository.

4. **Deleting Content**
    * Delete has not been implemented yet.

## Contributing

Contributions are welcome! If you have any ideas for improvements or find any bugs, please open an issue or submit a pull request.
