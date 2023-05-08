import { HydratedDocument, Model, Schema, model } from 'mongoose'

interface IRole {
  name: { type: string; required: true; unique: true }
}

interface RoleModel extends Model<IRole, {}, {}> {
  findByNameArray(names: string[]): Promise<Array<HydratedDocument<IRole>>>
}

const roleSchema = new Schema<IRole, RoleModel, {}>({
  name: { type: String, required: true, unique: true },
})

roleSchema.statics.findByNameArray = function (names: string[]) {
  return this.find({ name: { $in: names } })
}

const RoleEntity = model<IRole, RoleModel>('users_roles', roleSchema)

export default RoleEntity
