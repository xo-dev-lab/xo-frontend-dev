import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/services/api/client'
import {
  type InquiriesResponse,
  type InquiryGraphResponse,
  mapInquiryRow,
} from '@/types/inquiry'
import Loader from '@/components/common/ui/Loader/Loader'

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const PIE_COLORS = ['#E53935', '#0F172A']

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const navigate = useNavigate()

  const [month, setMonth] = useState<number>(() => new Date().getMonth() + 1)
  const [year, setYear] = useState<number>(() => new Date().getFullYear())

  const years = useMemo(() => {
    const current = new Date().getFullYear()
    return [current, current - 1]
  }, [])

  /* ---- Latest inquiries (for the table) ---- */
  const {
    data: inquiries,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['admin-inquiries'],
    queryFn: async () => {
      const res = await apiClient.get<InquiriesResponse>('/api/inquiries')
      return res.data.data
    },
  })

  const recentInquiries = (inquiries ?? []).map(mapInquiryRow).slice(0, 5)

  /* ---- Selected-month counts (stat boxes + pie + bar) ---- */
  const graphQuery = useQuery({
    queryKey: ['admin-graph', month, year],
    queryFn: async () => {
      const res = await apiClient.get<InquiryGraphResponse>(
        `/api/inquiries/graph?month=${month}&year=${year}`
      )
      return res.data
    },
  })

  const monthlyCounts = graphQuery.data

  const pieData = [
    { name: 'Product Enquiries', value: monthlyCounts?.enquiry ?? 0 },
    { name: 'Contact Messages', value: monthlyCounts?.contact ?? 0 },
  ]

  const totalCount = (monthlyCounts?.enquiry ?? 0) + (monthlyCounts?.contact ?? 0)
  return (
    <Box>
      {/* Welcome card */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Typography variant='h5' fontWeight={700} color='secondary.main' gutterBottom>
          Welcome to Admin Dashboard
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Manage your XoEnterprise platform from here.
        </Typography>

        {/* Month & Year selector */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
          <FormControl size='small' sx={{ minWidth: 140 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={month}
              label='Month'
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {MONTH_NAMES.map((m, index) => (
                <MenuItem key={m} value={index + 1}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size='small' sx={{ minWidth: 110 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={year}
              label='Year'
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {years.map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Stats cards */}
      <Grid container spacing={3} mb={3}>
        {[
          { label: 'Product Enquiries', value: monthlyCounts?.enquiry ?? 0, color: 'primary.main' },
          { label: 'Contact Messages', value: monthlyCounts?.contact ?? 0, color: 'secondary.main' },
          { label: 'Total Inquiries', value: totalCount, color: 'error.main' },
        ].map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.label}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200',
                textAlign: 'center',
              }}
            >
              <Typography variant='h4' fontWeight={800} color={item.color}>
                {graphQuery.isPending ? '—' : Number(item.value).toLocaleString()}
              </Typography>
              <Typography variant='body2' color='text.secondary' mt={1}>
                {item.label} · {MONTH_NAMES[month - 1]} {year}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts row */}
      <Grid container spacing={3} mb={3}>
        {/* Inquiries by Source — Bar Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200',
              height: '100%',
            }}
          >
            <Typography variant='h6' fontWeight={700} color='secondary.main' mb={2}>
              Inquiries by Source · {MONTH_NAMES[month - 1]} {year}
            </Typography>
            {graphQuery.isPending ? (
              <Loader />
            ) : (
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={pieData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='value' name='Inquiries' radius={[6, 6, 0, 0]}>
                    {pieData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>

        {/* Inquiries by Source — Pie Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200',
              height: '100%',
            }}
          >
            <Typography variant='h6' fontWeight={700} color='secondary.main' mb={2}>
              Inquiries by Source · {MONTH_NAMES[month - 1]} {year}
            </Typography>
            {graphQuery.isPending ? (
              <Loader />
            ) : totalCount === 0 ? (
              <Box
                sx={{
                  height: 280,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant='body2' color='text.secondary'>
                  No inquiries for this month.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {/* Pie chart on the left */}
                <Box sx={{ flex: '0 0 55%' }}>
                  <ResponsiveContainer width='100%' height={280}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey='value'
                        nameKey='name'
                        cx='50%'
                        cy='50%'
                        outerRadius={100}
                        innerRadius={50}
                      >
                        {pieData.map((_, index) => (
                          <Cell
                            key={index}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>

                {/* Custom vertical legend on the right */}
                <Box
                  sx={{
                    flex: '0 0 40%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                  }}
                >
                  {pieData.map((item, index) => (
                    <Box
                      key={item.name}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          flexShrink: 0,
                          bgcolor: PIE_COLORS[index % PIE_COLORS.length],
                        }}
                      />
                      <Typography variant='body2' color='text.secondary'>
                        {item.name}: {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Products Inquiry Table */}
      <Paper
        sx={{
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200',
          overflow: 'hidden',
        }}
      >
        {/* Table header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
            borderBottom: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          <Typography variant='h6' fontWeight={700} color='secondary.main'>
            Product Inquiries
          </Typography>
          <Button variant='outlined' size='small' color='primary' onClick={() => navigate('/admin/inquiries')}>
            View All
          </Button>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F1F5F9' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ py: 5 }}>
                    <Loader />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} align='center' sx={{ py: 5 }}>
                    <Typography variant='body2' color='text.secondary'>
                      Failed to load inquiries.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : recentInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align='center' sx={{ py: 5 }}>
                    <Typography variant='body2' color='text.secondary'>
                      No inquiries yet.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                recentInquiries.map((row, index) => (
                  <TableRow key={row.id ?? index}>
                    <TableCell>{row.customerName}</TableCell>
                    <TableCell>{row.product}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.phoneNumber}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.email}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.date}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

