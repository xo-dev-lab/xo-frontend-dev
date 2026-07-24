import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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
import { products } from './productData'

const categories = [...new Set(products.map((p) => p.category))]
const brands = [...new Set(products.map((p) => p.brand))]

export default function ProductsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || ''
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory
      const matchesBrand =
        !selectedBrand || product.brand === selectedBrand
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesBrand && matchesSearch
    })
  }, [selectedCategory, selectedBrand, searchQuery])

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
        {filteredProducts.length > 0 ? (
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
                  <Box sx={{ color: 'black', mb: 1.5, textAlign: 'center' }}>
                    {product.icon}
                  </Box>
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
                    {product.price}
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
          <Typography variant='body1' color='text.secondary' textAlign='center' sx={{ py: 6 }}>
            No products match the current filters.
          </Typography>
        )}
      </Box>
    </PageContainer>
  )
}

