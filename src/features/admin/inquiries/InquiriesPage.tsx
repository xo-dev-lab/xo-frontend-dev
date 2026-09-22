import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
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

import { apiClient } from '@/services/api/client'
import {
  type InquiriesResponse,
  type InquiryRow,
  mapInquiryRow,
} from '@/types/inquiry'
import Loader from '@/components/common/ui/Loader/Loader'
import EmptyState from '@/components/common/ui/EmptyState/EmptyState'

const PAGE_SIZE_OPTIONS = [10, 25, 50]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function InquiriesPage() {
  const {
    data: inquiryRows,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['admin-inquiries'],
    queryFn: async () => {
      const res = await apiClient.get<InquiriesResponse>('/api/inquiries')
      return res.data.data
    },
  })

  const inquiries: InquiryRow[] = useMemo(
    () => (inquiryRows ?? []).map(mapInquiryRow),
    [inquiryRows]
  )

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
        {isLoading ? (
          <Loader />
        ) : error ? (
          <EmptyState
            title='Failed to load inquiries'
            description='Please try again later.'
          />
        ) : (
          <>
        <TableContainer
          sx={{
            maxHeight: 'calc(100vh - 210px)',
          }}
        >
          <Table stickyHeader>
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
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.quantity ?? '—'}</TableCell>
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
          </>
        )}
      </Paper>
    </Box>
  )
}

