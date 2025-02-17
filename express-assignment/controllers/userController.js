let users = [];

exports.getUsers = (req, res) => {
  res.json(users);
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: Date.now(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  let user = users.find(user => user.id == id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = name;
  user.email = email;
  res.json(user);
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  users = users.filter(user => user.id != id);
  res.status(204).send();
};
