import Cat from '../models/Cat_model'
import CatBD from '../entities-bbdd/Cat_entity'

export default class GetAll {
  async execute(): Promise<Cat[]> {
    const cats: Cat[] = []

    const catsBD = await CatBD.find().populate({
      path: 'relatives',
      model: 'cat',
    })

    catsBD.forEach((cat) => {
      console.log(cat)

      cats.push(cat.toCatModel())
    })

    return cats
  }
}
