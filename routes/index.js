const router = require("express").Router();
const {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog");

const { registerUser, getAllUsers, loginUser, deleteUser } = require("../controllers/user");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.delete("/delete-user", deleteUser);

router.get("/get-user", getAllUsers);

router.post("/create", createBlog);

router.patch("/update", updateBlog);

router.delete("/delete", deleteBlog);

router.get("/", getBlog);

module.exports = router;
