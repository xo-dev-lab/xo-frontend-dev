import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import PageContainer from '@/components/common/ui/PageContainer/PageContainer'
import { apiClient } from '@/services/api/client'
import { type ProductDetailResponse } from '@/types/product'
import Loader from '@/components/common/ui/Loader/Loader'
import ProductImage, {
  PLACEHOLDER_IMAGE,
} from '@/components/common/ui/ProductImage/ProductImage'
import InquiryDialog from './InquiryDialog'

// const formatPrice = (price: string) => `$${Number(price).toLocaleString()}`

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await apiClient.get<ProductDetailResponse>(`/api/products/${id}`)
      return res.data.data
    },
    enabled: !!id,
  })

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState(0)
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const thumbnailScrollRef = useRef<HTMLDivElement>(null)

  if (isLoading) {
    return (
      <PageContainer>
        <Box sx={{ px: { xs: 3, md: 10 }, py: { xs: 4, md: 6 } }}>
          <Loader />
        </Box>
      </PageContainer>
    )
  }

  if (!product || error) {
    return (
      <PageContainer>
        <Box sx={{ px: { xs: 3, md: 10 }, py: { xs: 4, md: 6 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant='h5' fontWeight={700}>
              Product Not Found
            </Typography>
          </Box>
          <Typography variant='body1' color='text.secondary'>
            The product with ID "{id}" does not exist.
          </Typography>
          <Button
            variant='contained'
            color='error'
            sx={{ mt: 2 }}
            onClick={() => navigate('/products')}
          >
            Back to Products
          </Button>
        </Box>
      </PageContainer>
    )
  }

  const images = product.images.length > 0 ? product.images : [PLACEHOLDER_IMAGE]

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailScrollRef.current) {
      const scrollAmount = 110
      thumbnailScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta))
  }

  return (
    <PageContainer>
      <Box sx={{ px: { xs: 3, md: 10 }, py: { xs: 4, md: 6 } }}>
        {/* Back button */}
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 6 },
          }}
        >
          {/* ===== LEFT COLUMN ===== */}
          <Box sx={{ flex: '1 1 55%', maxWidth: { md: '55%' } }}>
            {/* Main image */}
            <Box
              sx={{
                width: '100%',
                height: { xs: 320, sm: 420, md: 500 },
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#F1F5F9',
                mb: 2,
              }}
            >
              <ProductImage
                src={images[selectedImageIndex]}
                alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.3s ease',
                }}
              />
            </Box>

            {/* Thumbnail strip */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {/* Left arrow */}
              <IconButton
                size='small'
                onClick={() => scrollThumbnails('left')}
                sx={{
                  bgcolor: 'grey.100',
                  '&:hover': { bgcolor: 'grey.200' },
                  flexShrink: 0,
                }}
              >
                <ArrowBackIosNewIcon fontSize='small' />
              </IconButton>

              {/* Thumbnails */}
              <Box
                ref={thumbnailScrollRef}
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  overflow: 'hidden',
                  scrollBehavior: 'smooth',
                  flex: 1,
                }}
              >
                {images.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    sx={{
                      width: 80,
                      height: 64,
                      borderRadius: 1.5,
                      overflow: 'hidden',
                      border: '2px solid',
                      borderColor:
                        index === selectedImageIndex ? '#1976D2' : 'divider',
                      cursor: 'pointer',
                      flexShrink: 0,
                      opacity: index === selectedImageIndex ? 1 : 0.55,
                      transition: 'opacity 0.2s, border-color 0.2s',
                      '&:hover': { opacity: 1 },
                    }}
                  >
                    <ProductImage
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                ))}
              </Box>

              {/* Right arrow */}
              <IconButton
                size='small'
                onClick={() => scrollThumbnails('right')}
                sx={{
                  bgcolor: 'grey.100',
                  '&:hover': { bgcolor: 'grey.200' },
                  flexShrink: 0,
                }}
              >
                <ArrowForwardIosIcon fontSize='small' />
              </IconButton>
            </Box>
          </Box>

          {/* ===== RIGHT COLUMN ===== */}
          <Box sx={{ flex: '1 1 45%', maxWidth: { md: '45%' } }}>
            {/* Product Name */}
            <Typography variant='h4' fontWeight={800} gutterBottom>
              {product.name}
            </Typography>

            {/* Brand & Category */}
            <Box sx={{ mb: 2 }}>
              <Typography variant='body1' fontWeight={500} sx={{ mb: 0.5 }}>
                <Typography component='span' variant='body2' color='text.secondary' fontWeight={600}>
                  Brand :{' '}
                </Typography>
                {product.brand}
              </Typography>
              <Typography variant='body1' fontWeight={500}>
                <Typography component='span' variant='body2' color='text.secondary' fontWeight={600}>
                  Category :{' '}
                </Typography>
                {product.category}
              </Typography>
            </Box>

            {/* Price */}
            {/* <Typography
              variant='h4'
              fontWeight={800}
              color='error'
              sx={{ mb: 2.5 }}
            >
              {formatPrice(product.price)}
            </Typography> */}

            {/* Description */}
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ mb: 3, lineHeight: 1.7 }}
            >
              {product.description}
            </Typography>

            {/* Key Features */}
            <Typography variant='h6' fontWeight={700} gutterBottom>
              Key Features
            </Typography>
            <Box
              component='ul'
              sx={{
                pl: 2.5,
                mb: 3,
                '& li': {
                  mb: 0.5,
                  fontSize: '0.95rem',
                  color: 'text.secondary',
                  lineHeight: 1.6,
                },
              }}
            >
              {product.keyFeatures.map((feature, i) => (
                <li key={i}>
                  <Typography variant='body2' component='span'>
                    {feature}
                  </Typography>
                </li>
              ))}
            </Box>

            {/* Quantity Selector */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 3,
              }}
            >
              <Typography variant='body1' fontWeight={600}>
                Quantity:
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <IconButton
                  size='small'
                  onClick={() => handleQuantityChange(-1)}
                  sx={{
                    borderRadius: 0,
                    px: 1.5,
                    py: 1,
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  <RemoveIcon fontSize='small' />
                </IconButton>
                <Typography
                  sx={{
                    minWidth: 48,
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    borderLeft: '1px solid',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    py: 0.75,
                  }}
                >
                  {quantity}
                </Typography>
                <IconButton
                  size='small'
                  onClick={() => handleQuantityChange(1)}
                  sx={{
                    borderRadius: 0,
                    px: 1.5,
                    py: 1,
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  <AddIcon fontSize='small' />
                </IconButton>
              </Box>
            </Box>

            {/* Request Purchase Button */}
            <Button
              variant='contained'
              color='error'
              size='large'
              fullWidth
              onClick={() => setInquiryOpen(true)}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'none',
              }}
            >
              Request Purchase
            </Button>
          </Box>
        </Box>

        {/* ===== DIVIDER ===== */}
        <Divider sx={{ mt: 6 }} />

        {/* ===== PRODUCT INFO TABS ===== */}
        <Box>
          <Tabs
            value={activeTab}
            onChange={(_e, newValue) => setActiveTab(newValue)}
            sx={{
              mb: 1,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                px: 3,
                py: 1.5,
                minHeight: 48,
                color: 'text.secondary',
              },
              '& .Mui-selected': {
                color: 'error.main',
                fontWeight: 700,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'error.main',
                height: 3,
              },
            }}
          >
            <Tab label='Descriptions' />
            <Tab label='Specifications' />
            <Tab label='Applications' />
            {/* <Tab label='Downloads' /> */}
          </Tabs>

          {/* Tab content */}
          <Box
            sx={{
              bgcolor: '#F8FAFC',
              borderRadius: 2,
              p: { xs: 2.5, md: 4 },
              minHeight: 180,
            }}
          >
            {activeTab === 0 && (
              <Box>
                <Typography variant='h6' fontWeight={700} gutterBottom>
                  Product Description
                </Typography>
                <Typography variant='body1' color='text.secondary' sx={{ lineHeight: 1.8 }}>
                  {product.tabContent.description}
                </Typography>
              </Box>
            )}
            {activeTab === 1 && (
              <Box>
                <Typography variant='h6' fontWeight={700} gutterBottom>
                  Technical Specifications
                </Typography>
                <Box component='ul' sx={{ pl: 2.5, '& li': { mb: 1, color: 'text.secondary' } }}>
                  {product.tabContent.specifications.map((spec, i) => (
                    <li key={i}>
                      <Typography variant='body2' component='span'>
                        {spec}
                      </Typography>
                    </li>
                  ))}
                </Box>
              </Box>
            )}
            {activeTab === 2 && (
              <Box>
                <Typography variant='h6' fontWeight={700} gutterBottom>
                  Applications
                </Typography>
                <Typography variant='body1' color='text.secondary' sx={{ lineHeight: 1.8 }}>
                  {product.tabContent.description}
                </Typography>
                <Box component='ul' sx={{ pl: 2.5, mt: 2, '& li': { mb: 1, color: 'text.secondary' } }}>
                  {product.tabContent.applications.map((app, i) => (
                    <li key={i}>
                      <Typography variant='body2' component='span'>
                        {app}
                      </Typography>
                    </li>
                  ))}
                </Box>
              </Box>
            )}
            {/* {activeTab === 3 && (
              <Box>
                <Typography variant='h6' fontWeight={700} gutterBottom>
                  Downloads & Resources
                </Typography>
                <Typography variant='body1' color='text.secondary' sx={{ lineHeight: 1.8 }}>
                  Access product documentation, datasheets, firmware updates, and technical
                  resources for the {product.name}. Download the latest user manual, quick
                  start guide, and compatibility matrix to assist with deployment and
                  configuration.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
                  {product.tabContent.downloads.map((dl, i) => (
                    <Button key={i} variant='outlined' size='small'>
                      {dl.label}
                    </Button>
                  ))}
                </Box>
              </Box>
            )} */}
          </Box>
        </Box>
      </Box>

      {/* Inquiry Dialog */}
      <InquiryDialog
        open={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        productName={product.name}
        productId={product.id}
        initialQuantity={quantity}
      />
    </PageContainer>
  )
}

