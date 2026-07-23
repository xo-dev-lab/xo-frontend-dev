import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import DevicesOtherIcon from '@mui/icons-material/DevicesOther'
import ComputerIcon from '@mui/icons-material/Computer'
import MemoryIcon from '@mui/icons-material/Memory'
import SettingsIcon from '@mui/icons-material/Settings'
import BuildIcon from '@mui/icons-material/Build'
import SecurityIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/Speed'
import StorageIcon from '@mui/icons-material/Storage'
import RouterIcon from '@mui/icons-material/Router'
import SmartphoneIcon from '@mui/icons-material/Smartphone'

import SectionTitle from '@/components/common/ui/SectionTitle/SectionTitle'

const products = [
  {
    id: 1,
    icon: <DevicesOtherIcon sx={{ fontSize: 56 }} />,
    name: 'Enterprise Server',
    description: 'High-performance server for large-scale operations.',
    price: '$12,499',
  },
  {
    id: 2,
    icon: <ComputerIcon sx={{ fontSize: 56 }} />,
    name: 'Workstation Pro',
    description: 'Powerful workstation for professionals.',
    price: '$3,299',
  },
  {
    id: 3,
    icon: <MemoryIcon sx={{ fontSize: 56 }} />,
    name: 'Memory Module 32GB',
    description: 'High-speed DDR5 RAM for enterprise use.',
    price: '$259',
  },
  {
    id: 4,
    icon: <SettingsIcon sx={{ fontSize: 56 }} />,
    name: 'Configuration Tool',
    description: 'Automated deployment and config manager.',
    price: '$899',
  },
  {
    id: 5,
    icon: <BuildIcon sx={{ fontSize: 56 }} />,
    name: 'Maintenance Kit',
    description: 'Complete hardware maintenance solution.',
    price: '$549',
  },
  {
    id: 6,
    icon: <SecurityIcon sx={{ fontSize: 56 }} />,
    name: 'Security Gateway',
    description: 'Advanced firewall and threat protection.',
    price: '$2,199',
  },
  {
    id: 7,
    icon: <SpeedIcon sx={{ fontSize: 56 }} />,
    name: 'Network Accelerator',
    description: 'Boost network speed and reduce latency.',
    price: '$1,499',
  },
  {
    id: 8,
    icon: <StorageIcon sx={{ fontSize: 56 }} />,
    name: 'NAS Storage Array',
    description: 'Scalable network-attached storage solution.',
    price: '$4,799',
  },
  {
    id: 9,
    icon: <RouterIcon sx={{ fontSize: 56 }} />,
    name: 'Edge Router X9',
    description: 'Enterprise-grade routing for branch offices.',
    price: '$1,899',
  },
  {
    id: 10,
    icon: <SmartphoneIcon sx={{ fontSize: 56 }} />,
    name: 'Mobile Management',
    description: 'Endpoint management for mobile devices.',
    price: '$699',
  },
]

export default function FeaturedProducts() {
  return (
    <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 3, md: 10 } }}>
      <SectionTitle title='Featured Products' align='center' />
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
        {products.map((product) => (
          <Card
            key={product.id}
            sx={{
              pt: 2,
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
    </Box>
  )
}
