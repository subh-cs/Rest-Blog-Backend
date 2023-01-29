const router = require("express").Router();
const auth = require("../config/auth");
const {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog");
const {
  registerUser,
  getAllUsers,
  loginUser,
  deleteUser,
} = require("../controllers/user");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/delete-user", deleteUser);
router.get("/get-user", getAllUsers);

router.post("/create", auth, createBlog); //private route
router.patch("/update", auth, updateBlog); //private route
router.delete("/delete", auth, deleteBlog); //private route
router.get("/", getBlog); //public route

module.exports = router;
