import { asDto } from '../dtos/userDto.js'

export default class UsersDaoMem {
  constructor() {
    this.users = [];
  }
  
  init() {
    console.log("users dao en memoria -> listo");
  }

  disconnect() {
    console.log("users dao en memoria -> cerrado");
  }

  #getIndex = (id) => {
    return this.users.findIndex((user) => user.id === id);
  };

  getAll() {
    return asDto(this.users);
  }

  getById(idBuscado) {
    return asDto(this.users[this.#getIndex(idBuscado)]);
  }

  save(userNuevo) {
    this.personas.push(userNuevo);
    return asDto(userNuevo);
  }

  deleteById(idParaBorrar) {
    const [borrada] = this.users.splice(this.#getIndex(idParaBorrar), 1);
    return asDto(borrada);
  }

  deleteAll() {
    this.users = [];
  }

  updateById(idParaReemplazar, userNuevo) {
    const index = this.#getIndex(idParaReemplazar);
    const actualizada = { ...this.users[index], ...userNuevo };
    this.users.splice(index, 1, actualizada);
    return asDto(actualizada);
  }
}