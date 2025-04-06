# Newsfeed Website

## Table of Contents

1. [Team Members](#team-members)
2. [About](#about)
3. [Progress](#progress)
4. [Project Folder Structure](#folder-structure)

## Team Members

- **Huỳnh Khắc Huy** - MSSV: 0306231291
- **Trần Hoàng Minh Khoa** - MSSV: 0306231298
- **Lê Trung Tín** - MSSV: 0306231339

## About

The Newsfeed Website is a **Dockerized** full-stack website using **Bootstrap** for the frontend, **Express.js** for the backend. It provides a seamless interface for managing and displaying newsfeed content. This project is designed to be scalable, maintainable, and easy to integrate with other systems or applications.

## How to start application

For the initial startup, build the Docker images:
```
docker compose up --build
```
\
All next startups, you can skip the build step and directly start the existing container(s). First, let's list all containers (running and stopped) to find the one you want to start and note it's ID:
```
docker ps -a
```
\
Then, use the docker start command followed by the container's ID to run that container:
```
docker start <container_id>
```
\
This will run this ExpressJS server & MySQL DB server. For development, It's recommended to start the MySQL DB server separately and run the ExpressJS directly from your terminal by using `npm run dev`.
## Progress

For detailed updates and progress tracking, please visit our [Notion page](https://wind-chauffeur-826.notion.site/Newsfeed-Web-Fullstack-1c4ee58faa7880a684bfcf2ca0c85a58).

## Folder Structure

```
├─ /node_modules            # Contains all the dependencies
├─ /client                  # Frontend code for the website
│   ├─ /assets              # Static files like CSS, Fonts, and JavaScript
│   │    ├─ /css
│   │    │   └─ /images     # Images used in Bootstrap, CSS, Animation
│   │    ├─ /fonts
│   │    └─ /js
│   ├─ /images              # Images used accross the Website
│   ├─ /pages               # Reusable pages
│   └─ index.html           # Frontend entry point
│
├─ /server                  # Backend code for the website
│   ├─ /public              # Contains static files
│   ├─ /db                  # Handles database connection
│   ├─ /services            # Handles database interaction
│   ├─ /controllers         # Handles request and response logic
│   ├─ /routes              # Maps endpoints to controller functions
│   ├─ /middlewares         # Contains custom middleware functions
│   ├─ /views               # Contains template files for rendering HTML
│   └─ /utils               # Contains utility functions for the server
│
├─ index.js                 # Backend entry point
├─ package-lock.json        # Records the exact versions of dependencies
├─ package.json             # Manages project dependencies and scripts
├─ README.md                # Project markdown (this file)
└─ .gitignore               # Tells Git which files to ignore
```
