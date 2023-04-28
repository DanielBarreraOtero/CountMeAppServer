import CatBD from '../entities-bbdd/Cat_entity'

export default class GetCat {
  async execute(id: string) {
    try {
      const catsBD = await CatBD.find({ _id: id })

      if (catsBD.length === 1) {
        return catsBD[0].toCatModel()
      }

      return { error: `Couldn't find ant cat by the id: ${id}` }
    } catch (e) {
      return { error: `The following id is not well formatted: ${id}` }
    }
  }
}
