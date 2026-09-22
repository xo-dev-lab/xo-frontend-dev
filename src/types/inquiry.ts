export interface InquiryApiRow {
  id: number
  product_id: number | null
  user_name: string | null
  company_name: string | null
  phone: string | null
  email: string | null
  city: string | null
  quantity: number | null
  subject: string | null
  message: string | null
  source: string
  createdAt?: string
  updatedAt?: string
  productName?: string | null
}

export interface InquiriesResponse {
  success: boolean
  data: InquiryApiRow[]
}

export interface InquiryGraphResponse {
  success: boolean
  month: number
  year: number
  enquiry: number
  contact: number
}

export interface InquiryRow {
  id: number
  product: string
  customerName: string
  companyName: string
  phoneNumber: string
  email: string
  city: string
  quantity: number | null
  subject: string | null
  message: string
  date: string
}

export const formatInquiryDate = (iso?: string): string => {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export const mapInquiryRow = (row: InquiryApiRow): InquiryRow => ({
  id: row.id,
  product:
    row.productName ?? (row.product_id != null ? `Product #${row.product_id}` : '—'),
  customerName: row.user_name ?? '—',
  companyName: row.company_name ?? '—',
  phoneNumber: row.phone ?? '—',
  email: row.email ?? '—',
  city: row.city ?? '—',
  quantity: row.quantity,
  subject: row.subject,
  message: row.message ?? '—',
  date: formatInquiryDate(row.createdAt),
})