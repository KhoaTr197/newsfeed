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

The Newsfeed Website is a full-stack website using **Bootstrap** for the frontend and **Express.js** for the backend. It provides a seamless interface for managing and displaying newsfeed content. This project is designed to be scalable, maintainable, and easy to integrate with other systems or applications.

## Progress

For detailed updates and progress tracking, please visit our [Notion page]([https://www.notion.so/](https://wind-chauffeur-826.notion.site/Newsfeed-Web-Fullstack-1c4ee58faa7880a684bfcf2ca0c85a58)).

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
