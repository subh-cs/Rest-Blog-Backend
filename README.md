## API Routes

### User Routes

- **POST** `/register`: Registers a new user.
- **POST** `/login`: Logs in an existing user.

### Blog Routes
- **GET** `/`: Retrieves information for 10 blog posts - By default. (**public route**)
- **GET** `/?page=2`: Retrieves information for 10 blog posts of page 2. (**public route**)
- **POST** `/create`: Creates a new blog post. (**private route**, requires authentication)
- **PATCH** `/update?id=${id}`: Updates an existing blog post. (**private route**, requires authentication)
- **DELETE** `/delete?id=${id}`: Deletes a blog post. (**private route**, requires authentication)


### Note

- **auth** is a middleware that check for authentication for protected routes.
