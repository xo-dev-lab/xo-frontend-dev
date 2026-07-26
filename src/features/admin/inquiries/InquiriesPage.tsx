import { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface InquiryRow {
  id: number
  product: string
  customerName: string
  companyName: string
  phoneNumber: string
  email: string
  city: string
  quantity: number
  message: string
  date: string
}

/* ------------------------------------------------------------------ */
/*  Dummy data                                                         */
/* ------------------------------------------------------------------ */

const inquiries: InquiryRow[] = [
  {
    id: 1,
    product: 'Enterprise Server',
    customerName: 'Amit Sharma',
    companyName: 'TechCorp India',
    phoneNumber: '+91-9876543210',
    email: 'amit.sharma@email.com',
    city: 'Mumbai',
    quantity: 5,
    message: 'We need servers for our new data center. Please provide bulk pricing.',
    date: '2026-07-20',
  },
  {
    id: 2,
    product: 'Workstation Pro',
    customerName: 'Priya Patel',
    companyName: 'DesignWave Studio',
    phoneNumber: '+91-9876543211',
    email: 'priya.patel@email.com',
    city: 'Bangalore',
    quantity: 10,
    message: 'Requirement for 3D rendering workstations with dual monitors.',
    date: '2026-07-19',
  },
  {
    id: 3,
    product: 'Security Gateway',
    customerName: 'Rajesh Kumar',
    companyName: 'FinSafe Ltd.',
    phoneNumber: '+91-9876543212',
    email: 'rajesh.k@email.com',
    city: 'Delhi',
    quantity: 3,
    message: 'Need firewall appliances for branch office security compliance.',
    date: '2026-07-18',
  },
  {
    id: 4,
    product: 'NAS Storage Array',
    customerName: 'Sunita Verma',
    companyName: 'MediaPro Productions',
    phoneNumber: '+91-9876543213',
    email: 'sunita.v@email.com',
    city: 'Pune',
    quantity: 2,
    message: 'Looking for high-capacity NAS for video storage and backup.',
    date: '2026-07-17',
  },
  {
    id: 5,
    product: 'Edge Router X9',
    customerName: 'Vikram Singh',
    companyName: 'ConnectNet ISP',
    phoneNumber: '+91-9876543214',
    email: 'vikram.singh@email.com',
    city: 'Hyderabad',
    quantity: 15,
    message: 'Bulk order for CPE deployment across 15 branch locations.',
    date: '2026-07-16',
  },
  {
    id: 6,
    product: 'Memory Module 32GB',
    customerName: 'Anjali Mehta',
    companyName: 'DataCore Systems',
    phoneNumber: '+91-9876543215',
    email: 'anjali.mehta@email.com',
    city: 'Chennai',
    quantity: 100,
    message: 'Requirement for server memory upgrade. Requesting volume discount.',
    date: '2026-07-15',
  },
  {
    id: 7,
    product: 'Network Accelerator',
    customerName: 'Suresh Reddy',
    companyName: 'CloudLink Solutions',
    phoneNumber: '+91-9876543216',
    email: 'suresh.reddy@email.com',
    city: 'Ahmedabad',
    quantity: 4,
    message: 'Need WAN optimization appliances for inter-office connectivity.',
    date: '2026-07-14',
  },
  {
    id: 8,
    product: 'Mobile Management',
    customerName: 'Neha Gupta',
    companyName: 'HealthFirst Clinics',
    phoneNumber: '+91-9876543217',
    email: 'neha.gupta@email.com',
    city: 'Jaipur',
    quantity: 1,
    message: 'Need UEM solution for managing 50+ mobile devices across clinics.',
    date: '2026-07-13',
  },
  {
    id: 9,
    product: 'Enterprise Server',
    customerName: 'Rohit Desai',
    companyName: 'EduTech Innovations',
    phoneNumber: '+91-9876543218',
    email: 'rohit.desai@email.com',
    city: 'Lucknow',
    quantity: 2,
    message: 'Servers for hosting LMS and student portal. Need quotation.',
    date: '2026-07-12',
  },
  {
    id: 10,
    product: 'Workstation Pro',
    customerName: 'Kavita Joshi',
    companyName: 'ArchVision Designs',
    phoneNumber: '+91-9876543219',
    email: 'kavita.joshi@email.com',
    city: 'Kolkata',
    quantity: 6,
    message: 'Workstations for architectural CAD/BIM team.',
    date: '2026-07-11',
  },
]

const PAGE_SIZE_OPTIONS = [10, 25, 50]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function InquiriesPage() {
  /* ---- Filters ---- */
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  /* ---- Pagination ---- */
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(0)

  /* ---- Filter logic ---- */
  const filtered = useMemo(() => {
    let result = inquiries

    // Search by product name or customer name
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (row) =>
          row.product.toLowerCase().includes(q) ||
          row.customerName.toLowerCase().includes(q)
      )
    }

    // Date range filter
    if (dateFrom) {
      result = result.filter((row) => row.date >= dateFrom)
    }
    if (dateTo) {
      result = result.filter((row) => row.date <= dateTo)
    }

    return result
  }, [searchQuery, dateFrom, dateTo])

  /* ---- Pagination calculations ---- */
  const totalPages = Math.ceil(filtered.length / pageSize)
  const safePage = Math.min(page, Math.max(0, totalPages - 1))
  const paginatedRows = filtered.slice(safePage * pageSize, (safePage + 1) * pageSize)
  const lastItemNumber = Math.min((safePage + 1) * pageSize, filtered.length)

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    setPage(0)
  }

  return (
    <Box>
      <Typography variant='h5' fontWeight={700} color='secondary.main' mb={3}>
        Lead / Inquiry Management
      </Typography>

      {/* ---------- Filters: Search (left) + Date Range (right) ---------- */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
        }}
      >
        {/* Search field — left side */}
        <TextField
          placeholder='Search by product or customer name...'
          size='small'
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setPage(0)
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            minWidth: 300,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        />

        {/* Date range — right side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            label='From Date'
            type='date'
            size='small'
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value)
              setPage(0)
            }}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            label='To Date'
            type='date'
            size='small'
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value)
              setPage(0)
            }}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Box>
      </Box>

      {/* ---------- Table ---------- */}
      <Paper
        sx={{
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200',
          overflow: 'hidden',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F1F5F9' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>#</TableCell>
                <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Customer Name</TableCell>
                <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Company Name</TableCell>
                <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Phone Number</TableCell>
                <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Email Address</TableCell>
                <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>City</TableCell>
                <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Requirement / Message</TableCell>
                <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} align='center' sx={{ py: 6 }}>
                    <Typography variant='body1' color='text.secondary'>
                      No inquiries found matching your filters.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.id}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 600 }}>{row.product}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.customerName}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.companyName}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.phoneNumber}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.email}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.city}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.quantity}</TableCell>
                    <TableCell sx={{ minWidth: 220, maxWidth: 300 }}>
                      <Typography variant='body2' color='text.secondary' sx={{ lineHeight: 1.4 }}>
                        {row.message}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.date}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ---------- Pagination Footer ---------- */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            px: 3,
            py: 1.5,
            borderTop: '1px solid',
            borderColor: 'grey.200',
            bgcolor: '#FAFAFA',
          }}
        >
          {/* Left: Rows per page selector */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='body2' color='text.secondary'>
              Rows per page:
            </Typography>
            <FormControl size='small' sx={{ minWidth: 80 }}>
              <Select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                sx={{
                  borderRadius: 1.5,
                  bgcolor: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.300' },
                }}
              >
                {PAGE_SIZE_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Center/Right: Page info + nav icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant='body2' color='text.secondary'>
              {filtered.length === 0
                ? '0 entries'
                : `${safePage * pageSize + 1}–${lastItemNumber} of ${filtered.length}`}
            </Typography>

            <IconButton
              size='small'
              disabled={safePage === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              sx={{ color: safePage === 0 ? 'grey.300' : 'secondary.main' }}
            >
              <ChevronLeftIcon />
            </IconButton>

            <IconButton
              size='small'
              disabled={safePage >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              sx={{ color: safePage >= totalPages - 1 ? 'grey.300' : 'secondary.main' }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

