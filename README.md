# Rough Project

Technologies used: React, Nodejs, vite, TailwindCSS, Express, mongoose etc.

The project is based on the reading of a data.json file 


## System Requirements

To get started with development, you need to install few tools

1. git 
   
   `git` version 2.13.1 or higher. Download [git](https://git-scm.com/downloads) if you don't have it already.

   To check your version of git, run:

   ```shell
    git --version
   ```

2. node 
   
   `node` version 16.15.1 or higher. Download [node](https://nodejs.org/en/download/) if you don't have it already.

   To check your version of node, run:

   ```shell
    node --version
   ```

3. npm
  
   `npm` version 5.6.1 or higher. You will have it after you install node.

   To check your version of npm, run:

   ```shell
    npm --version
   ```

## Setup

To set up a development environment, please follow these steps:

1. Clone the repo or Download the .zip file linked to this repository and just drag and drop them into your editoor of choice

   ```shell
    git clone https://github.com/madgoat42069/mmassesment.git
   ```

2. Change directory to the project directory

    ```shell
    cd mmassesment
    ```

3. Install the dependencies
   
    ```shell
     npm install
    ```

    If you get an error, please check the console for more information.

    If you don't get an error, you are ready to start development.

4. Run the app
   
    ```shell
    npm run dev
    ```

    Project will be running in the browser.

    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

5. Open new terminal and use this

    ```shell
    cd server
    ```

6. Install the backend dependencies
   
    ```shell
     npm install
    ```

7. Start the backend
   
    ```shell
     npm start
    ```


If there are any errors try creating a .env file inside the main project directory adding this   
  
    ```shell
     SKIP_PREFLIGHT_CHECK=true
    ```
