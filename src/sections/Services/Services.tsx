

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import DevicesOtherIcon from '@mui/icons-material/DevicesOther'
import ComputerIcon from '@mui/icons-material/Computer'
import MemoryIcon from '@mui/icons-material/Memory'
import SettingsIcon from '@mui/icons-material/Settings'
import BuildIcon from '@mui/icons-material/Build'
import SecurityIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/Speed'
import StorageIcon from '@mui/icons-material/Storage'

import SectionTitle from '@/components/common/ui/SectionTitle/SectionTitle'

const products = [
  {
    id: 1,
    icon: <DevicesOtherIcon sx={{ fontSize: 56 }} />,
    name: 'CCTV Installation',
    description: 'Professional CCTV installation services for homes and businesses.',
  },
  {
    id: 2,
    icon: <ComputerIcon sx={{ fontSize: 56 }} />,
    name: 'AMC & Maintenance',
    description: 'Comprehensive maintenance and support services for your IT infrastructure.',
  },
  {
    id: 3,
    icon: <MemoryIcon sx={{ fontSize: 56 }} />,
    name: 'CCTV on Rent',
    description: 'Flexible rental options for temporary CCTV needs.',
  },
  {
    id: 4,
    icon: <SettingsIcon sx={{ fontSize: 56 }} />,
    name: 'Access Control System',
    description: 'Complete access control solutions for secure entry management.',
  },
  {
    id: 5,
    icon: <BuildIcon sx={{ fontSize: 56 }} />,
    name: 'Fire Safety Solutions',
    description: 'Comprehensive fire safety equipment and services.',
  },
  {
    id: 6,
    icon: <SecurityIcon sx={{ fontSize: 56 }} />,
    name: '24x7 Support',
    description: 'Round-the-clock technical support and assistance.',
  },
  {
    id: 7,
    icon: <SpeedIcon sx={{ fontSize: 56 }} />,
    name: 'Corporate Network Solutions',
    description: 'Complete network solutions for businesses, including design, implementation, and management.',
  },
  {
    id: 8,
    icon: <StorageIcon sx={{ fontSize: 56 }} />,
    name: 'System Integration',
    description: 'Seamless integration of various systems for optimal performance.',
  },
]

export default function Services() {
  return (
    <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 3, md: 10 } }}>
      <SectionTitle title='Our Services' eyebrow='We provide end-to-end security and automation solution.' align='center' />
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
        {products.map((product) => (
          <Card
            key={product.id}
            sx={{
              pt: 2,
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
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
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}


