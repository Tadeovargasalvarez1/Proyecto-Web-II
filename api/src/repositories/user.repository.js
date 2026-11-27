import { User } from '../models/index.js';

export function findUserByEmail(email) {
  return User.findOne({ where: { email } });
}

export function findUserById(id) {
  return User.findByPk(id);
}

export function createUser(attributes) {
  return User.create(attributes);
}
