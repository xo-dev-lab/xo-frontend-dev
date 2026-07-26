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
} from '@mui/material'
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

/* ------------------------------------------------------------------ */
/*  Dummy data                                                         */
/* ------------------------------------------------------------------ */

const leadsOverviewData = [
  { month: 'Jan', leads: 40 },
  { month: 'Feb', leads: 55 },
  { month: 'Mar', leads: 30 },
  { month: 'Apr', leads: 70 },
  { month: 'May', leads: 90 },
  { month: 'Jun', leads: 110 },
  { month: 'Jul', leads: 85 },
  { month: 'Aug', leads: 95 },
  { month: 'Sep', leads: 120 },
  { month: 'Oct', leads: 140 },
  { month: 'Nov', leads: 100 },
  { month: 'Dec', leads: 130 },
]

const leadsByStatusData = [
  { status: 'New', count: 45 },
  { status: 'Contacted', count: 80 },
  { status: 'Qualified', count: 60 },
  { status: 'Proposal', count: 35 },
  { status: 'Negotiation', count: 25 },
  { status: 'Closed Won', count: 50 },
  { status: 'Closed Lost', count: 20 },
]

const PIE_COLORS = ['#E53935', '#0F172A', '#FFB300', '#4CAF50', '#2196F3', '#9C27B0', '#FF5722']

const inquiryRows = [
  { name: 'Amit Sharma', product: 'Industrial Lathe Machine', phone: '+91-9876543210', email: 'amit.sharma@email.com', date: '2026-07-20' },
  { name: 'Priya Patel', product: 'CNC Milling Machine', phone: '+91-9876543211', email: 'priya.patel@email.com', date: '2026-07-19' },
  { name: 'Rajesh Kumar', product: 'Hydraulic Press 200T', phone: '+91-9876543212', email: 'rajesh.k@email.com', date: '2026-07-18' },
  { name: 'Sunita Verma', product: 'Packaging Conveyor Belt', phone: '+91-9876543213', email: 'sunita.v@email.com', date: '2026-07-17' },
  { name: 'Vikram Singh', product: 'Air Compressor 50HP', phone: '+91-9876543214', email: 'vikram.singh@email.com', date: '2026-07-16' },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
  const navigate = useNavigate()
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
      </Paper>

      {/* Stats cards */}
      <Grid container spacing={3} mb={3}>
        {[
          { label: 'Total Products', value: '1,284' },
          { label: 'Active Users', value: '3,572' },
          { label: 'Orders', value: '847' },
          { label: 'Revenue', value: '$1,28,450' },
        ].map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.label}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200',
                textAlign: 'center',
              }}
            >
              <Typography variant='h4' fontWeight={800} color='primary.main'>
                {item.value}
              </Typography>
              <Typography variant='body2' color='text.secondary' mt={1}>
                {item.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts row */}
      <Grid container spacing={3} mb={3}>
        {/* Leads Overview — Line Chart */}
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
              Leads Overview
            </Typography>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={leadsOverviewData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='leads'
                  stroke='#E53935'
                  strokeWidth={2}
                  dot={{ fill: '#E53935', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Leads by Status — Pie Chart */}
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
              Leads by Status
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Pie chart on the left */}
              <Box sx={{ flex: '0 0 55%' }}>
                <ResponsiveContainer width='100%' height={280}>
                  <PieChart>
                    <Pie
                      data={leadsByStatusData}
                      dataKey='count'
                      nameKey='sta. +tus'
                      cx='50%'
                      cy='50%'
                      outerRadius={100}
                      innerRadius={50}
                    >
                      {leadsByStatusData.map((_, index) => (
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
                {leadsByStatusData.map((item, index) => (
                  <Box
                    key={item.status}
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
                      {item.status}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
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
              {inquiryRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

