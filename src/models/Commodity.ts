interface PriceRange {
  min: number
  max: number
}

export interface Container {
  count: number
  size: number
}

export interface Commodity {
  id: string
  name: string
  nameShort: string
  priceRangePerScu: PriceRange
}

export const createStateCommodity = (commodity: Commodity): Commodity => {
  return commodity
}
