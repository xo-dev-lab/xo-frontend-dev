import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useQuery } from '@tanstack/react-query'

import SectionTitle from '@/components/common/ui/SectionTitle/SectionTitle'
import { apiClient } from '@/services/api/client'
import { type CompanyDetailsResponse } from '@/types/companyDetails'

const DEFAULT_CATEGORIES = [
  'Solar Panels',
  'Inverters',
  'Batteries',
  'Accessories',
  'Charge Controllers',
  'Mounting Structures',
  'Cables & Wiring',
  'Hardware',
]

export default function Categories() {
  const navigate = useNavigate()

  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const { data: companyDetails } = useQuery({
    queryKey: ['company-details'],
    queryFn: async () => {
      const res = await apiClient.get<CompanyDetailsResponse>('/api/company-details')
      return res.data.data
    },
  })

  const categories = companyDetails?.categories?.length
    ? companyDetails.categories
    : DEFAULT_CATEGORIES

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const updateArrows = () => {
      setCanScrollLeft(el.scrollLeft > 1)
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    }

    updateArrows()
    el.addEventListener('scroll', updateArrows)
    const observer = new ResizeObserver(updateArrows)
    observer.observe(el)

    return () => {
      el.removeEventListener('scroll', updateArrows)
      observer.disconnect()
    }
  }, [categories])

  const scrollCategories = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = Math.max(el.clientWidth * 0.6, 200)
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const handleCategoryClick = (title: string) => {
    navigate(`/products?category=${encodeURIComponent(title)}`)
  }

  const arrowSx = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    bgcolor: 'background.paper',
    boxShadow: 2,
    border: '1px solid',
    borderColor: 'grey.200',
    '&:hover': { bgcolor: 'grey.100' },
  } as const

  return (
    <Box id="categories" sx={{ py: 2 }}>
      <SectionTitle title='Explore our products categories' align='center' />

      <Box sx={{ position: 'relative', px: { xs: 2, md: 5 } }}>
        {canScrollLeft && (
          <IconButton
            size='small'
            aria-label='Scroll categories left'
            onClick={() => scrollCategories('left')}
            sx={{ ...arrowSx, left: 0 }}
          >
            <ArrowBackIosNewIcon fontSize='small' />
          </IconButton>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            ref={scrollRef}
            sx={{
              display: 'flex',
              gap: { xs: 1.5, md: 2 },
              maxWidth: '100%',
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {categories.map((cat) => (
              <Box
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                sx={{
                  flexShrink: 0,
                  width: { xs: 96, md: 112 },
                  textDecoration: 'none',
                  borderRadius: 2,
                  textAlign: 'center',
                  padding: { xs: 1, md: 1.5 },
                  cursor: 'pointer',
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    backgroundColor: 'rgba(229, 57, 53, 0.12)',
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: 18,
                    mb: 1,
                    mx: 'auto',
                  }}
                >
                  {cat.charAt(0)}
                </Box>

                <Box sx={{ fontWeight: 700, color: 'secondary.main', fontSize: 13, lineHeight: 1.3 }}>
                  {cat}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {canScrollRight && (
          <IconButton
            size='small'
            aria-label='Scroll categories right'
            onClick={() => scrollCategories('right')}
            sx={{ ...arrowSx, right: 0 }}
          >
            <ArrowForwardIosIcon fontSize='small' />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}


