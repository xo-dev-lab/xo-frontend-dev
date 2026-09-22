export interface ProductDownload {
  label: string
  url?: string
}

export interface ProductItem {
  id: number
  icon: string | null
  name: string
  description: string | null
  price: string
  category: string | null
  brand: string | null
  images: string[]
  keyFeatures: string[]
  tabDescription: string | null
  specifications: string[]
  applications: string[]
  downloads: ProductDownload[]
  createdAt: string
  updatedAt: string
  tabContent: {
    description: string | null
    specifications: string[]
    applications: string[]
    downloads: ProductDownload[]
  }
}

export interface ProductListResponse {
  success: boolean
  count: number
  data: ProductItem[]
}

export interface ProductDetailResponse {
  success: boolean
  data: ProductItem
}