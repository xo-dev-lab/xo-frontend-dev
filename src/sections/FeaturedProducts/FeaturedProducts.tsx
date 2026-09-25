import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import SectionTitle from '@/components/common/ui/SectionTitle/SectionTitle'
import ProductImage from '@/components/common/ui/ProductImage/ProductImage'
import Loader from '@/components/common/ui/Loader/Loader'
import { apiClient } from '@/services/api/client'
import { type ProductListResponse } from '@/types/product'

const MAX_PRODUCTS = 10

// const formatPrice = (price: string) => `$${Number(price).toLocaleString()}`

export default function FeaturedProducts() {
  const navigate = useNavigate()

  const { data: products, isLoading } = useQuery({
    queryKey: ['public-products'],
    queryFn: async () => {
      const res = await apiClient.get<ProductListResponse>('/api/products')
      return res.data.data
    },
  })

  const featuredProducts = (products ?? []).slice(0, MAX_PRODUCTS)

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 3, md: 10 } }}>
      <SectionTitle title='Featured Products' align='center' />

      {isLoading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(5, 1fr)',
            },
            gap: 2.5,
          }}
        >
          {featuredProducts.map((product) => (
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
                <ProductImage
                  src={product.images[0]}
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
                {/* <Typography variant='h6' fontWeight={700} sx={{ mb: 1.5 }}>
                  {formatPrice(product.price)}
                </Typography> */}
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
      )}
    </Box>
  )
}
