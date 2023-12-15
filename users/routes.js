import * as dao from "./dao.js";

let currentUser = null;

function UserRoutes(app) {
  
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
}
  const deleteUser = async (req, res) => { 
    const id = req.params.id;
    const status = await dao.deleteUser(id);
    res.json(status);
  };
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const id = req.params.userId;
    const user = await dao.findUserById(id);
    res.json(user);
  };
  const findByUsername = async (req, res) => {
    const username = req.params.username;
    const user = await dao.findUserByUsername(username);
    res.json(user);
  };

  const findByPassword = async (req, res) => {
    const username = req.params.username;
    const user = await dao.findUserByPassword(username);
    res.json(user);
  };
  
  const updateUser = async (req, res) => {
    const id = req.params.id;
    const newUser = req.body;
    const status = await dao.updateUser(id, newUser);
    res.json(status);
   };
   const signup = async (req, res) => {
    const user = await dao.findUserByUsername(
      req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
      return;
    }
    currentUser = await dao.createUser(req.body);
    res.json(currentUser);
  };
;

  const signin = async (req, res) => {
    const { username, password } = req.body;
    currentUser = await dao.findUserByCredentials(username, password);
    res.json(currentUser);
  };
  const account = async (req, res) => { 
    res.json(currentUser);
  };

  const signout = (req, res) => { };

  app.post("/api/users/account", account);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.get("/api/users/username/:username", findByUsername);
  app.put("/api/users/:id", updateUser);
  app.delete("/api/users/:id", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
}
export default UserRoutes;