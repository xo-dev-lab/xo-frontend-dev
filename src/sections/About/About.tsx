import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'
import aboutUsImg from '@/assets/About.jpeg'

import { apiClient } from '@/services/api/client'
import { type CompanyDetailsResponse } from '@/types/companyDetails'

export default function About() {
  const theme = useTheme()

  const { data: companyDetails } = useQuery({
    queryKey: ['company-details'],
    queryFn: async () => {
      const res = await apiClient.get<CompanyDetailsResponse>('/api/company-details')
      return res.data.data
    },
  })

  const paragraphs = (companyDetails?.about || '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
<Box id="about-us" sx={{ py: { xs: 4, md: 6 }, px: { xs: 3, md: 10 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 4, md: 10 },
          alignItems: 'center',
        }}
      >
        {/* Image Column - Left Side */}
        <Box>
          <Box
            component='img'
            src={aboutUsImg}
            alt='About XO Enterprise'
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: 500,
              objectFit: 'cover',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(15, 23, 42, 0.12)',
              display: 'block',
            }}
          />
        </Box>
        {/* Content Column - Right Side */}
        <Box sx={{pr: { xs: 2, md: 12 } }}>
          <Typography
            variant='h4'
            fontWeight={800}
            color='secondary'
            sx={{ mb: 2, fontSize: { xs: '1.5rem', md: '1.75rem' } }}
          >
            About XO Enterprise
          </Typography>
          {paragraphs.map((paragraph, index) => (
            <Typography
              key={index}
              variant='body1'
              sx={{
                color: theme.palette.text.secondary,
                lineHeight: 1.8,
                fontSize: { xs: '0.95rem', md: '1rem' },
                textAlign: 'justify',
                mb: index < paragraphs.length - 1 ? 2 : 0,
              }}
            >
              {paragraph}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

