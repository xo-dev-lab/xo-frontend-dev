import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Chip,
  IconButton,
  Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ProductRow {
  id: number
  image: string
  name: string
  category: string
  price: string
  inStock: boolean
}

/* ------------------------------------------------------------------ */
/*  Dummy data                                                         */
/* ------------------------------------------------------------------ */

const initialProducts: ProductRow[] = [
  {
    id: 1,
    image: 'https://placehold.co/600x500/0F172A/E53935?text=Enterprise+Server',
    name: 'Enterprise Server',
    category: 'Hardware',
    price: '$12,499',
    inStock: true,
  },
  {
    id: 2,
    image: 'https://placehold.co/600x500/0F172A/E53935?text=Workstation+Pro',
    name: 'Workstation Pro',
    category: 'Hardware',
    price: '$3,299',
    inStock: true,
  },
  {
    id: 3,
    image: 'https://placehold.co/600x500/0F172A/E53935?text=Memory+Module',
    name: 'Memory Module 32GB',
    category: 'Components',
    price: '$259',
    inStock: false,
  },
  {
    id: 4,
    image: 'https://placehold.co/600x500/0F172A/E53935?text=Security+Gateway',
    name: 'Security Gateway',
    category: 'Networking',
    price: '$2,199',
    inStock: true,
  },
  {
    id: 5,
    image: 'https://placehold.co/600x500/0F172A/E53935?text=Network+Accelerator',
    name: 'Network Accelerator',
    category: 'Networking',
    price: '$1,499',
    inStock: false,
  },
  {
    id: 6,
    image: 'https://placehold.co/600x500/0F172A/E53935?text=NAS+Storage+Array',
    name: 'NAS Storage Array',
    category: 'Hardware',
    price: '$4,799',
    inStock: true,
  },
  {
    id: 7,
    image: 'https://placehold.co/600x500/0F172A/E53935?text=Edge+Router+X9',
    name: 'Edge Router X9',
    category: 'Networking',
    price: '$1,899',
    inStock: true,
  },
  {
    id: 8,
    image: 'https://placehold.co/600x500/0F172A/E53935?text=Mobile+Management',
    name: 'Mobile Management',
    category: 'Software',
    price: '$699',
    inStock: true,
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ProductsPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return initialProducts
    const q = searchQuery.toLowerCase()
    return initialProducts.filter((p) => p.name.toLowerCase().includes(q))
  }, [searchQuery])

  return (
    <Box>
      {/* ---------- Header: Search + Add Product button (no card) ---------- */}
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
          placeholder='Search by product name...'
          size='small'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
            minWidth: 280,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />

        {/* Add Product button — right side */}
        <Button
          variant='contained'
          color='primary'
          sx={{ borderRadius: 2, px: 3 }}
          onClick={() => navigate('/admin/products/add')}
        >
          + Add Product
        </Button>
      </Box>

      {/* ---------- Products Table ---------- */}
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
                <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} hover>
                  {/* Image */}
                  <TableCell>
                    <Box
                      component='img'
                      src={product.image}
                      alt={product.name}
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 1,
                        objectFit: 'cover',
                        border: '1px solid',
                        borderColor: 'grey.200',
                      }}
                    />
                  </TableCell>

                  {/* Name */}
                  <TableCell>
                    <Typography variant='body2' fontWeight={600}>
                      {product.name}
                    </Typography>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <Typography variant='body2' color='text.secondary'>
                      {product.category}
                    </Typography>
                  </TableCell>

                  {/* Price */}
                  <TableCell>
                    <Typography variant='body2' fontWeight={600}>
                      {product.price}
                    </Typography>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Chip
                      label={product.inStock ? 'In Stock' : 'Out of Stock'}
                      size='small'
                      sx={{
                        fontWeight: 600,
                        color: product.inStock ? '#2E7D32' : '#C62828',
                        bgcolor: product.inStock ? '#E8F5E9' : '#FFEBEE',
                        borderRadius: 1.5,
                      }}
                    />
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton
                        size='small'
                        sx={{ color: 'secondary.main' }}
                        onClick={() =>
                          navigate(`/admin/products/edit/${product.id}`, {
                            state: { product },
                          })
                        }
                      >
                        <EditIcon fontSize='small' />
                      </IconButton>
                      <IconButton
                        size='small'
                        sx={{ color: 'primary.main' }}
                        onClick={() => {
                          /* TODO: handle delete */
                        }}
                      >
                        <DeleteIcon fontSize='small' />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}

              {/* Empty state when no products match search */}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align='center' sx={{ py: 6 }}>
                    <Typography variant='body1' color='text.secondary'>
                      No products found for "{searchQuery}"
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

