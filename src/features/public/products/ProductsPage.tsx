import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

import PageContainer from '@/components/common/ui/PageContainer/PageContainer'
import { apiClient } from '@/services/api/client'
import { type ProductListResponse } from '@/types/product'
import Loader from '@/components/common/ui/Loader/Loader'
import EmptyState from '@/components/common/ui/EmptyState/EmptyState'

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x500/0F172A/E53935?text=Product'

const formatPrice = (price: string) => `$${Number(price).toLocaleString()}`

export default function ProductsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || ''
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['public-products'],
    queryFn: async () => {
      const res = await apiClient.get<ProductListResponse>('/api/products')
      return res.data.data
    },
  })

  const categories = useMemo(
    () => [...new Set((products ?? []).map((p) => p.category).filter(Boolean))] as string[],
    [products]
  )

  const brands = useMemo(
    () => [...new Set((products ?? []).map((p) => p.brand).filter(Boolean))] as string[],
    [products]
  )

  const filteredProducts = useMemo(() => {
    if (!products) return []
    return products.filter((product) => {
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory
      const matchesBrand =
        !selectedBrand || product.brand === selectedBrand
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description ?? '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      return matchesCategory && matchesBrand && matchesSearch
    })
  }, [products, selectedCategory, selectedBrand, searchQuery])

  return (
    <PageContainer>
      <Box sx={{ px: { xs: 3, md: 10 }, py: { xs: 4, md: 6 } }}>

        {/* Filter Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            mb: 4,
          }}
        >
          {/* Left side: Category & Brand dropdowns */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <FormControl size='small' sx={{ minWidth: 180 }}>
              <InputLabel>Select Category</InputLabel>
              <Select
                value={selectedCategory}
                label='Select Category'
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value=''>
                  <em>All Categories</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size='small' sx={{ minWidth: 180 }}>
              <InputLabel>Select Brand</InputLabel>
              <Select
                value={selectedBrand}
                label='Select Brand'
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <MenuItem value=''>
                  <em>All Brands</em>
                </MenuItem>
                {brands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Right side: Search field */}
          <TextField
            size='small'
            placeholder='Search products...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Products Grid */}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <EmptyState
            title='Failed to load products'
            description='Please try again later.'
          />
        ) : filteredProducts.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 2.5,
            }}
          >
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                sx={{
                  pt: 2,
                  cursor: 'pointer',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.16)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent>
                  <Box
                    component='img'
                    src={product.images[0] ?? PLACEHOLDER_IMAGE}
                    alt={product.name}
                    sx={{
                      width: '100%',
                      height: 150,
                      objectFit: 'contain',
                      bgcolor: '#F1F5F9',
                      borderRadius: 1,
                      mb: 1.5,
                    }}
                  />
                  <Typography variant='subtitle1' fontWeight={700} gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ mb: 1, minHeight: 36 }}
                  >
                    {product.description}
                  </Typography>
                  <Typography variant='h6' fontWeight={700} sx={{ mb: 1.5 }}>
                    {formatPrice(product.price)}
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      variant='outlined'
                      color='error'
                      size='small'
                      sx={{ textTransform: 'none', fontWeight: 600 }}
                    >
                      Request Purchase
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <EmptyState
            title='No products found'
            description='No products match the current filters.'
          />
        )}
      </Box>
    </PageContainer>
  )
}