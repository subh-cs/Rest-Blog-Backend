# Blog Web Application Backend Server
A backend server for a blog web application using MVC architecture and following basic system design principles.

## Introduction
This is a backend server for a blog web application that follows MVC architecture and basic system design principles. It provides REST APIs for user registration, login and CRUD operations for blog posts. The routes are protected using authentication, with only authenticated users able to create, update and delete blog posts. The server retrieves information for 10 blog posts by default, with the ability to retrieve information for a specific page of blog posts.

### Preview video link:
 Watch on 1.5x [Click Here](https://www.loom.com/share/490c8d3fa3ed43d0a7e76dab15df7cdb)
 
## Functionalities
- User registration and login
- CRUD operations for blog posts
- Pagination for retrieving blog posts

## Api Routes
 ### User Routes
- `POST /register`: Registers a new user.
- `POST /login`: Logs in an existing user.

 ### Blog Routes
- `GET /`: Retrieves information for 10 blog posts by default (public route).
- `GET /?page=2`: Retrieves information for 10 blog posts of page 2 (public route).
- `POST /create`: Creates a new blog post (private route, requires authentication).
- `PATCH /update?id=${id}`: Updates an existing blog post (private route, requires authentication).
- `DELETE /delete?id=${id}`: Deletes a blog post (private route, requires authentication).

## Run Locally

Clone the project

```bash
  git clone https://github.com/subh-cs/Rest-Blog-CasualFunnel.git
```

Go to the project directory

```bash
  cd Rest-Blog-CasualFunnel
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

