import mongoose from 'mongoose'
import { asDto } from '../dtos/userDto.js'
import { UserModel } from '../../DB/models/index.js'

export default class UsersDaoDb {
 
    constructor(cnxStr) {
        this.cnxStr = cnxStr
        this.users = UserModel.default
    }
  
    async init() {
        await mongoose.connect(this.cnxStr)
    }

    async disconnect() {
        await mongoose.disconnect()
    }

    async getAll() {
        const users = await this.users.find({})
        return asDto(users)
    }

    async getById(idBuscado) {
        const user = await this.users.findOne({ id: idBuscado })
        return asDto(user)
    }

    async getByName(name) {
        const user = await this.users.findOne({ displayName: name })
        return asDto(user)
    }

    async save(userNuevo) {
        await this.users.create(userNuevo)
        return asDto(userNuevo)
    }

    async deleteById(idParaBorrar) {
        const borrada = await this.users.findOneAndDelete({ id: idParaBorrar })
        return asDto(borrada)
    }

    async deleteAll() {
        await this.users.deleteMany({})
    }

    async updateById(idParaReemplazar, userNuevo) {
        const actualizada = await this.users.findOneAndUpdate({ id: idParaReemplazar }, { $set: userNuevo })
        return asDto(actualizada)
    }

}