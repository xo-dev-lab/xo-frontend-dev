import { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  IconButton,
  Grid,
  Chip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

/* ------------------------------------------------------------------ */
/*  Tab panel helper                                                    */
/* ------------------------------------------------------------------ */

interface TabPanelProps {
  children: React.ReactNode
  value: number
  index: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  if (value !== index) return null
  return <Box sx={{ pt: 3 }}>{children}</Box>
}

/* ------------------------------------------------------------------ */
/*  Initial data                                                       */
/* ------------------------------------------------------------------ */

const initialGeneral = {
  email: 'info@xoenterprise.com',
  phone: '+91-9876543210',
  openingDays: 'Monday – Saturday',
  openingTime: '09:00 AM',
  closingTime: '07:00 PM',
  facebook: 'https://facebook.com/xoenterprise',
  instagram: 'https://instagram.com/xoenterprise',
  linkedin: 'https://linkedin.com/company/xoenterprise',
  twitter: 'https://twitter.com/xoenterprise',
  registeredOffice: 'Plot No. 123, Sector 12, Industrial Area, Mumbai – 400001, Maharashtra, India',
  currentOffice: 'B-45, Tech Park, Phase II, Electronic City, Bangalore – 560100, Karnataka, India',
}

const initialCategories: string[] = [
  'Solar Panels',
  'Inverters',
  'Batteries',
  'Accessories',
  'Charge Controllers',
  'Mounting Structures',
  'Cables & Wiring',
  'Hardware',
]

const initialServices: { id: number; name: string; description: string }[] = [
  { id: 1, name: 'CCTV Installation', description: 'Professional CCTV installation services for homes and businesses.' },
  { id: 2, name: 'AMC & Maintenance', description: 'Comprehensive maintenance and support services for your IT infrastructure.' },
  { id: 3, name: 'CCTV on Rent', description: 'Flexible rental options for temporary CCTV needs.' },
  { id: 4, name: 'Access Control System', description: 'Complete access control solutions for secure entry management.' },
  { id: 5, name: 'Fire Safety Solutions', description: 'Comprehensive fire safety equipment and services.' },
  { id: 6, name: '24x7 Support', description: 'Round-the-clock technical support and assistance.' },
  { id: 7, name: 'Corporate Network Solutions', description: 'Complete network solutions for businesses, including design, implementation, and management.' },
  { id: 8, name: 'System Integration', description: 'Seamless integration of various systems for optimal performance.' },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState(0)

  /* ---- General state ---- */
  const [general, setGeneral] = useState(initialGeneral)

  /* ---- Categories state ---- */
  const [categories, setCategories] = useState<string[]>(initialCategories)
  const [newCategory, setNewCategory] = useState('')

  /* ---- Services state ---- */
  const [services, setServices] = useState(initialServices)
  const [newServiceName, setNewServiceName] = useState('')
  const [newServiceDesc, setNewServiceDesc] = useState('')

  /* ---- General handlers ---- */
  const handleGeneralChange = (field: keyof typeof initialGeneral) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneral((prev) => ({ ...prev, [field]: e.target.value }))
  }

  /* ---- Category handlers ---- */
  const handleAddCategory = () => {
    const trimmed = newCategory.trim()
    if (trimmed && !categories.includes(trimmed)) {
      setCategories((prev) => [...prev, trimmed])
      setNewCategory('')
    }
  }

  const handleRemoveCategory = (cat: string) => {
    setCategories((prev) => prev.filter((c) => c !== cat))
  }

  /* ---- Service handlers ---- */
  const handleAddService = () => {
    const name = newServiceName.trim()
    const desc = newServiceDesc.trim()
    if (name && desc) {
      setServices((prev) => [...prev, { id: Date.now(), name, description: desc }])
      setNewServiceName('')
      setNewServiceDesc('')
    }
  }

  const handleRemoveService = (id: number) => {
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <Box>

      {/* ---------- Horizontal Tabs ---------- */}
      <Paper sx={{ borderRadius: 2, border: '1px solid', borderColor: 'grey.200', overflow: 'hidden' }}>
        <Tabs
          value={tabValue}
          onChange={(_, newVal) => setTabValue(newVal)}
          sx={{
            px: 2,
            pt: 1,
            borderBottom: '1px solid',
            borderColor: 'grey.200',
            bgcolor: '#FAFAFA',
            '& .MuiTab-root': { fontWeight: 700, textTransform: 'none', fontSize: '0.95rem' },
            '& .Mui-selected': { color: 'primary.main' },
            '& .MuiTabs-indicator': { bgcolor: 'primary.main' },
          }}
        >
          <Tab label='General' />
          <Tab label='Product Categories' />
          <Tab label='Services' />
        </Tabs>

        {/* ==================== General Tab ==================== */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Email'
                  size='small'
                  value={general.email}
                  onChange={handleGeneralChange('email')}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Phone'
                  size='small'
                  value={general.phone}
                  onChange={handleGeneralChange('phone')}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label='Opening Days'
                  size='small'
                  value={general.openingDays}
                  onChange={handleGeneralChange('openingDays')}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label='Opening Time'
                  size='small'
                  type='time'
                  value={general.openingTime}
                  onChange={handleGeneralChange('openingTime')}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label='Closing Time'
                  size='small'
                  type='time'
                  value={general.closingTime}
                  onChange={handleGeneralChange('closingTime')}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Facebook URL'
                  size='small'
                  value={general.facebook}
                  onChange={handleGeneralChange('facebook')}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Instagram URL'
                  size='small'
                  value={general.instagram}
                  onChange={handleGeneralChange('instagram')}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='LinkedIn URL'
                  size='small'
                  value={general.linkedin}
                  onChange={handleGeneralChange('linkedin')}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Twitter URL'
                  size='small'
                  value={general.twitter}
                  onChange={handleGeneralChange('twitter')}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Registered Office'
                  size='small'
                  multiline
                  rows={3}
                  value={general.registeredOffice}
                  onChange={handleGeneralChange('registeredOffice')}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Current Office'
                  size='small'
                  multiline
                  rows={3}
                  value={general.currentOffice}
                  onChange={handleGeneralChange('currentOffice')}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='contained' color='primary' sx={{ borderRadius: 2, px: 4 }}>
                Save General
              </Button>
            </Box>
          </Box>
        </TabPanel>

        {/* ==================== Product Categories Tab ==================== */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3, pb: 3 }}>
            {/* Existing categories */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 3 }}>
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  onDelete={() => handleRemoveCategory(cat)}
                  deleteIcon={<DeleteIcon />}
                  sx={{
                    fontWeight: 600,
                    borderRadius: 1.5,
                    bgcolor: '#F1F5F9',
                    color: 'secondary.main',
                    '& .MuiChip-deleteIcon': { color: 'primary.main', fontSize: 18 },
                  }}
                />
              ))}
            </Box>

            {/* Add new category */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                placeholder='Enter new category name'
                size='small'
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddCategory() }}
                sx={{ minWidth: 280, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              <Button
                variant='contained'
                color='primary'
                startIcon={<AddIcon />}
                onClick={handleAddCategory}
                sx={{ borderRadius: 2 }}
              >
                Add Category
              </Button>
            </Box>
          </Box>
        </TabPanel>

        {/* ==================== Services Tab ==================== */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ px: 3, pb: 3 }}>
            {/* Existing services */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
              {services.map((svc) => (
                <Paper
                  key={svc.id}
                  variant='outlined'
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    borderColor: 'grey.200',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant='subtitle2' fontWeight={700} color='secondary.main'>
                      {svc.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                      {svc.description}
                    </Typography>
                  </Box>
                  <IconButton
                    size='small'
                    sx={{ color: 'primary.main', flexShrink: 0 }}
                    onClick={() => handleRemoveService(svc.id)}
                  >
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </Paper>
              ))}
            </Box>

            {/* Add new service */}
            <Typography variant='subtitle2' fontWeight={700} color='secondary.main' mb={1.5}>
              Add New Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <TextField
                placeholder='Service name'
                size='small'
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              <TextField
                placeholder='Service description'
                size='small'
                multiline
                rows={2}
                value={newServiceDesc}
                onChange={(e) => setNewServiceDesc(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              <Button
                variant='contained'
                color='primary'
                startIcon={<AddIcon />}
                onClick={handleAddService}
                sx={{ borderRadius: 2, alignSelf: 'flex-start' }}
              >
                Add Service
              </Button>
            </Box>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  )
}
