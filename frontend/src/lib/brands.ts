// Car brands with their SVG paths
export const CAR_BRANDS = [
  'Aston Martin',
  'Audi',
  'BMW',
  'Chana',
  'Chevrolet',
  'Daihatsu',
  'Ferrari',
  'Fiat',
  'Ford',
  'Honda',
  'Hyundai',
  'Isuzu',
  'Kia',
  'Lambo',
  'Mazda',
  'McLaren',
  'Mercedes',
  'Mini',
  'Mitsubishi',
  'Nissan',
  'Perodua',
  'Peugeot',
  'Porsche',
  'Proton',
  'Renault',
  'Skoda',
  'Suzuki',
  'Tesla',
  'Toyota',
  'VW',
] as const

export type CarBrand = (typeof CAR_BRANDS)[number]

export interface GarageBuildStep {
  brand?: CarBrand
  year?: string
  model?: string
  condition?: string
  goal?: 'street' | 'track' | 'drift' | 'show'
  budget?: string
}

export const YEARS = Array.from({ length: 30 }, (_, i) => (2024 - i).toString())

export const CAR_CONDITIONS = [
  'Stock',
  'Lightly Modified',
  'Heavily Modified',
  'Unknown',
] as const
