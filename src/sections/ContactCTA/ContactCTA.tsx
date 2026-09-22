import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import Button from '@/components/common/ui/Button/Button'
import PageContainer from '@/components/common/ui/PageContainer/PageContainer'
import { apiClient } from '@/services/api/client'
import { type CompanyDetailsResponse } from '@/types/companyDetails'

const features = [
  'Free Consultation',
  'Professional Installation',
  'Customized Solutions',
  '24\u00d77 Customer Support',
]

export default function ContactCTA() {
  const navigate = useNavigate()

  const { data: companyDetails } = useQuery({
    queryKey: ['company-details'],
    queryFn: async () => {
      const res = await apiClient.get<CompanyDetailsResponse>('/api/company-details')
      return res.data.data
    },
  })

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #081624, #0F2740)',
        py: { xs: 6, md: 8 },
        color: 'white',
      }}
    >
      <PageContainer>
        <Box sx={{ textAlign: 'center' }}>
          {/* Heading */}
          <Typography
            variant='h3'
            fontWeight={800}
            sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            Let&apos;s Secure What Matters Most
          </Typography>

          {/* Description */}
          <Typography
            variant='body1'
            sx={{
              mt: 2,
              maxWidth: 640,
              mx: 'auto',
              opacity: 0.85,
              lineHeight: 1.7,
            }}
          >
            From CCTV surveillance to complete security automation, our experts
            are ready to help you choose the right solution for your home or
            business.
          </Typography>

          {/* Features checklist */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: { xs: 1.5, md: 3 },
              mt: 4,
            }}
          >
            {features.map((feature) => (
              <Typography
                key={feature}
                variant='body1'
                fontWeight={500}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  minWidth: { xs: '45%', md: 'auto' },
                }}
              >
                <Box
                  component='span'
                  sx={{ color: 'primary.main', fontWeight: 700, fontSize: 18 }}
                >
                  ✓
                </Box>
                {feature}
              </Typography>
            ))}
          </Box>

          {/* CTA Button */}
          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={() => navigate('/contact')}
            sx={{
              mt: 4,
              px: { xs: 4, md: 5 },
              py: 1.5,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              borderRadius: 1,
            }}
          >
            Contact Our Experts
          </Button>

          {/* Contact info */}
          <Box sx={{ mt: 3 }}>
            <Typography variant='body2' sx={{ opacity: 0.8 }}>
              Call : {companyDetails?.phone || '+91 XXXXX XXXXX'}
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.8 }}>
              Email: {companyDetails?.email || 'sales@xoenterprises.com'}
            </Typography>
          </Box>
        </Box>
      </PageContainer>
    </Box>
  )
}

