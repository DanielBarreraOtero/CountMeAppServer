export default class Cat {
  private _id?: string
  private name: string
  private color: string
  private birthDate: Date
  private weight: number

  constructor(name: string, color: string, birthDate: Date, weight: number, _id?: string) {
    this.setName(name).setColor(color).setBirthDate(birthDate).setWeight(weight)

    if (_id) {
      this.setId(_id)
    }
  }

  public getId(): string {
    return this._id
  }
  public setId(_id: string): Cat {
    this._id = _id
    return this
  }

  public getName(): string {
    return this.name
  }
  public setName(name: string): Cat {
    this.name = name
    return this
  }

  public getColor(): string {
    return this.color
  }
  public setColor(color: string): Cat {
    this.color = color
    return this
  }

  public getBrithDate(): Date {
    return this.birthDate
  }
  public setBirthDate(birthDate: Date): Cat {
    this.birthDate = birthDate
    return this
  }

  public getWeight(): number {
    return this.weight
  }
  public setWeight(weight: number): Cat {
    this.weight = weight
    return this
  }
}
