import * as dao from "./dao.js";
let currentUser = null;
export default function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
        if (role) {
          const users = await dao.findUsersByRole(role);
          res.json(users);
          return;
        }
    if (name) {
          const users = await dao.findUsersByPartialName(name);
          res.json(users);
          return;
        }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
      const user = await dao.findUserById(req.params.userId);
      res.json(user);
    };

  const deleteUser = async (req, res) => {
      const status = await dao.deleteUser(req.params.userId);
      res.json(status);
  };

  const updateUser = async (req, res) => {
      const { userId } = req.params;
      const status = await dao.updateUser(userId, req.body);
      res.json(status);
    };

  const createUser = async (req, res) => {
      const user = await dao.createUser(req.body);
      res.json(user);
    };

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.delete("/api/users/:userId", deleteUser);
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users", createUser);
}
