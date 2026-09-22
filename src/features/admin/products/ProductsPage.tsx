import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Chip,
  IconButton,
  Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { apiClient } from '@/services/api/client'
import { type ProductListResponse } from '@/types/product'
import Loader from '@/components/common/ui/Loader/Loader'
import EmptyState from '@/components/common/ui/EmptyState/EmptyState'
import ProductImage from '@/components/common/ui/ProductImage/ProductImage'

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const formatPrice = (price: string) => `$${Number(price).toLocaleString()}`

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ProductsPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const res = await apiClient.get<ProductListResponse>('/api/products')
      return res.data.data
    },
  })

  const filteredProducts = useMemo(() => {
    if (!products) return []
    if (!searchQuery.trim()) return products
    const q = searchQuery.toLowerCase()
    return products.filter((p) => p.name.toLowerCase().includes(q))
  }, [products, searchQuery])

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
        {isLoading ? (
          <Loader />
        ) : error ? (
          <EmptyState
            title='Failed to load products'
            description='Please try again later.'
          />
        ) : (
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
                      <ProductImage
                        src={product.images[0]}
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
                        {product.category ?? '—'}
                      </Typography>
                    </TableCell>

                    {/* Price */}
                    <TableCell>
                      <Typography variant='body2' fontWeight={600}>
                        {formatPrice(product.price)}
                      </Typography>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Chip
                        label='In Stock'
                        size='small'
                        sx={{
                          fontWeight: 600,
                          color: '#2E7D32',
                          bgcolor: '#E8F5E9',
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
                      <EmptyState
                        title='No products found'
                        description={
                          searchQuery
                            ? `No products found for "${searchQuery}"`
                            : 'Add a product to get started.'
                        }
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  )
}