export interface CompanyDetails {
  email: string
  phone: string
  openingDays: string
  openingTime: string
  closingTime: string
  facebook: string
  instagram: string
  linkedin: string
  twitter: string
  registeredOffice: string
  currentOffice: string
  about: string
  categories?: string[]
}

export interface CompanyDetailsResponse {
  success: boolean
  message?: string
  data: CompanyDetails
}