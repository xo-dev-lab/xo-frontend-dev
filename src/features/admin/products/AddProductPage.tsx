import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Chip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ProductFormData {
  name: string
  category: string
  brand: string
  price: string
  inStock: boolean
  shortDescription: string
  longDescription: string
  specifications: string[]
  applications: string[]
  downloads: { label: string; url: string }[]
  images: string[]
  keyFeatures: string[]
}

interface DownloadEntry {
  label: string
  url: string
}

const CATEGORIES = ['Hardware', 'Components', 'Networking', 'Software']

const emptyForm: ProductFormData = {
  name: '',
  category: '',
  brand: '',
  price: '',
  inStock: true,
  shortDescription: '',
  longDescription: '',
  specifications: [''],
  applications: [''],
  downloads: [{ label: '', url: '' }],
  images: [],
  keyFeatures: [''],
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const getDefaultForm = (editData?: ProductFormData): ProductFormData =>
  editData
    ? { ...emptyForm, ...editData }
    : {
        ...emptyForm,
        specifications: [''],
        applications: [''],
        downloads: [{ label: '', url: '' }],
        keyFeatures: [''],
      }

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AddProductPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const editProduct = (location.state as { product?: ProductFormData })?.product
  const isEditMode = Boolean(editProduct)

  const [form, setForm] = useState<ProductFormData>(() => getDefaultForm(editProduct))

  /* ---- Generic field updater ---- */
  const updateField = <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }))

  /* ---- Dynamic list helpers ---- */
  const addItem = (key: 'specifications' | 'applications' | 'keyFeatures') =>
    setForm((prev) => ({ ...prev, [key]: [...prev[key], ''] }))

  const removeItem = (key: 'specifications' | 'applications' | 'keyFeatures', index: number) =>
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }))

  const updateItem = (
    key: 'specifications' | 'applications' | 'keyFeatures',
    index: number,
    value: string
  ) =>
    setForm((prev) => {
      const updated = [...prev[key]]
      updated[index] = value
      return { ...prev, [key]: updated }
    })

  const addDownload = () =>
    setForm((prev) => ({
      ...prev,
      downloads: [...prev.downloads, { label: '', url: '' }],
    }))

  const removeDownload = (index: number) =>
    setForm((prev) => ({
      ...prev,
      downloads: prev.downloads.filter((_, i) => i !== index),
    }))

  const updateDownload = (index: number, field: keyof DownloadEntry, value: string) =>
    setForm((prev) => {
      const updated = [...prev.downloads]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, downloads: updated }
    })

  const addImage = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      setForm((prev) => ({ ...prev, images: [...prev.images, url] }))
    }
  }

  const removeImage = (index: number) =>
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))

  const handleCancel = () => {
    navigate('/admin/products')
  }

  const handleSave = () => {
    // TODO: API call to save product
    navigate('/admin/products')
  }

  /* ---- Shared dynamic list renderer ---- */
  const renderDynamicList = (
    label: string,
    key: 'specifications' | 'applications' | 'keyFeatures',
    placeholder: string
  ) => (
    <Paper
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        mb: 2.5,
      }}
    >
      <Typography variant='subtitle1' fontWeight={700} color='secondary.main' mb={1.5}>
        {label}
      </Typography>
      {form[key].map((item, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
          <TextField
            size='small'
            fullWidth
            placeholder={placeholder}
            value={item}
            onChange={(e) => updateItem(key, index, e.target.value)}
          />
          <IconButton
            size='small'
            sx={{ color: 'primary.main', flexShrink: 0 }}
            onClick={() => removeItem(key, index)}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Box>
      ))}
      <Button
        variant='text'
        size='small'
        startIcon={<AddIcon />}
        onClick={() => addItem(key)}
        sx={{ mt: 0.5 }}
      >
        Add {label.slice(0, -1)}
      </Button>
    </Paper>
  )

  return (
    <Box>
      <Typography variant='h5' fontWeight={700} color='secondary.main' mb={3}>
        {isEditMode ? 'Edit Product' : 'Add Product'}
      </Typography>

      <Grid container spacing={3}>
        {/* ========== LEFT HALF — Form Fields ========== */}
        <Grid size={{ xs: 12, md: 7 }}>
          {/* Product Name & Category & Brand & Price & Status */}
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200',
              mb: 2.5,
            }}
          >
            <Typography variant='subtitle1' fontWeight={700} color='secondary.main' mb={2}>
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label='Product Name'
                  size='small'
                  fullWidth
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    label='Category'
                    value={form.category}
                    onChange={(e) => updateField('category', e.target.value)}
                  >
                    {CATEGORIES.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label='Brand'
                  size='small'
                  fullWidth
                  value={form.brand}
                  onChange={(e) => updateField('brand', e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label='Price'
                  size='small'
                  fullWidth
                  value={form.price}
                  onChange={(e) => updateField('price', e.target.value)}
                  placeholder='$12,499'
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label='Status'
                    value={form.inStock ? 'inStock' : 'outOfStock'}
                    onChange={(e) => updateField('inStock', e.target.value === 'inStock')}
                  >
                    <MenuItem value='inStock'>In Stock</MenuItem>
                    <MenuItem value='outOfStock'>Out of Stock</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* Short Description */}
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200',
              mb: 2.5,
            }}
          >
            <Typography variant='subtitle1' fontWeight={700} color='secondary.main' mb={1}>
              Short Description
            </Typography>
            <TextField
              size='small'
              fullWidth
              multiline
              rows={3}
              placeholder='Brief product description...'
              value={form.shortDescription}
              onChange={(e) => updateField('shortDescription', e.target.value)}
            />
          </Paper>

          {/* Long Description */}
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200',
              mb: 2.5,
            }}
          >
            <Typography variant='subtitle1' fontWeight={700} color='secondary.main' mb={1}>
              Long Description
            </Typography>
            <TextField
              size='small'
              fullWidth
              multiline
              rows={5}
              placeholder='Detailed product description...'
              value={form.longDescription}
              onChange={(e) => updateField('longDescription', e.target.value)}
            />
          </Paper>

          {/* Specifications */}
          {renderDynamicList('Specifications', 'specifications', 'e.g. 128GB DDR5 ECC memory')}

          {/* Applications */}
          {renderDynamicList('Applications', 'applications', 'e.g. Enterprise data centers')}

          {/* Downloads */}
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200',
              mb: 2.5,
            }}
          >
            <Typography variant='subtitle1' fontWeight={700} color='secondary.main' mb={1.5}>
              Downloads
            </Typography>
            {form.downloads.map((d, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                <TextField
                  size='small'
                  placeholder='Label (e.g. Datasheet PDF)'
                  value={d.label}
                  onChange={(e) => updateDownload(index, 'label', e.target.value)}
                  sx={{ flex: 1 }}
                />
                <TextField
                  size='small'
                  placeholder='URL'
                  value={d.url}
                  onChange={(e) => updateDownload(index, 'url', e.target.value)}
                  sx={{ flex: 1 }}
                />
                <IconButton
                  size='small'
                  sx={{ color: 'primary.main', flexShrink: 0 }}
                  onClick={() => removeDownload(index)}
                >
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </Box>
            ))}
            <Button
              variant='text'
              size='small'
              startIcon={<AddIcon />}
              onClick={addDownload}
              sx={{ mt: 0.5 }}
            >
              Add Download
            </Button>
          </Paper>
        </Grid>

        {/* ========== RIGHT HALF — Images & Key Features ========== */}
        <Grid size={{ xs: 12, md: 5 }}>
          {/* Images Card */}
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200',
              mb: 2.5,
            }}
          >
            <Typography variant='subtitle1' fontWeight={700} color='secondary.main' mb={1.5}>
              Product Images
            </Typography>

            {/* Image thumbnails */}
            {form.images.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {form.images.map((img, index) => (
                  <Box key={index} sx={{ position: 'relative' }}>
                    <Box
                      component='img'
                      src={img}
                      alt={`Product ${index + 1}`}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 1,
                        objectFit: 'cover',
                        border: '1px solid',
                        borderColor: 'grey.200',
                      }}
                    />
                    <IconButton
                      size='small'
                      sx={{
                        position: 'absolute',
                        top: -6,
                        right: -6,
                        bgcolor: 'primary.main',
                        color: '#fff',
                        width: 20,
                        height: 20,
                        '&:hover': { bgcolor: 'primary.dark' },
                      }}
                      onClick={() => removeImage(index)}
                    >
                      <DeleteIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}

            {/* Add Images button */}
            <Button
              variant='outlined'
              color='primary'
              startIcon={<CloudUploadIcon />}
              onClick={addImage}
              fullWidth
              sx={{ borderRadius: 2 }}
            >
              + Add Images
            </Button>
          </Paper>

          {/* Key Features Card */}
          {renderDynamicList('Key Features', 'keyFeatures', 'e.g. Dual Intel Xeon processors')}
        </Grid>
      </Grid>

      {/* ========== Bottom Actions ========== */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
        <Button
          variant='outlined'
          color='secondary'
          sx={{ borderRadius: 2, px: 4 }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          color='primary'
          sx={{ borderRadius: 2, px: 4 }}
          onClick={handleSave}
        >
          Save Product
        </Button>
      </Box>
    </Box>
  )
}

