

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
import HubIcon from '@mui/icons-material/Hub'
import TvIcon from '@mui/icons-material/Tv'
import GridViewIcon from '@mui/icons-material/GridView'
import RadarIcon from '@mui/icons-material/Radar'
import CallIcon from '@mui/icons-material/Call'
import DnsIcon from '@mui/icons-material/Dns'
import FingerprintIcon from '@mui/icons-material/Fingerprint'

import SectionTitle from '@/components/common/ui/SectionTitle/SectionTitle'

const products = [
  {
    id: 1,
    icon: <HubIcon sx={{ fontSize: 56 }} />,
    name: 'Networking',
    description: 'Reliable network design, installation, and management for seamless connectivity.',
  },
  {
    id: 2,
    icon: <TvIcon sx={{ fontSize: 56 }} />,
    name: 'LED TV and Monitoring',
    description: 'High-quality LED TV installation and professional display monitoring solutions.',
  },
  {
    id: 3,
    icon: <GridViewIcon sx={{ fontSize: 56 }} />,
    name: 'LED Wall and Interactive Panels',
    description: 'Bold LED walls and interactive panels for impactful presentations and engagement.',
  },
  {
    id: 4,
    icon: <RadarIcon sx={{ fontSize: 56 }} />,
    name: 'Metal Detector',
    description: 'Advanced metal detection systems for enhanced security and safety screening.',
  },
  {
    id: 5,
    icon: <CallIcon sx={{ fontSize: 56 }} />,
    name: 'Intercom System',
    description: 'Crystal-clear intercom systems for reliable internal and building communication.',
  },
  {
    id: 6,
    icon: <DnsIcon sx={{ fontSize: 56 }} />,
    name: 'Computer and Server Setup',
    description: 'Complete computer and server setup, configuration, and deployment services.',
  },
  {
    id: 7,
    icon: <FingerprintIcon sx={{ fontSize: 56 }} />,
    name: 'Biometric Machine',
    description: 'Secure biometric machines for accurate attendance and access control.',
  },
  {
    id: 8,
    icon: <DevicesOtherIcon sx={{ fontSize: 56 }} />,
    name: 'CCTV Installation',
    description: 'Professional CCTV installation services for homes and businesses.',
  },
  {
    id: 9,
    icon: <ComputerIcon sx={{ fontSize: 56 }} />,
    name: 'AMC & Maintenance',
    description: 'Comprehensive maintenance and support services for your IT infrastructure.',
  },
  {
    id: 10,
    icon: <MemoryIcon sx={{ fontSize: 56 }} />,
    name: 'CCTV on Rent',
    description: 'Flexible rental options for temporary CCTV needs.',
  },
  {
    id: 11,
    icon: <SettingsIcon sx={{ fontSize: 56 }} />,
    name: 'Access Control System',
    description: 'Complete access control solutions for secure entry management.',
  },
  {
    id: 12,
    icon: <BuildIcon sx={{ fontSize: 56 }} />,
    name: 'Fire Safety Solutions',
    description: 'Comprehensive fire safety equipment and services.',
  },
  {
    id: 13,
    icon: <SecurityIcon sx={{ fontSize: 56 }} />,
    name: '24x7 Support',
    description: 'Round-the-clock technical support and assistance.',
  },
  {
    id: 14,
    icon: <SpeedIcon sx={{ fontSize: 56 }} />,
    name: 'Corporate Network Solutions',
    description: 'Complete network solutions for businesses, including design, implementation, and management.',
  },
  {
    id: 15,
    icon: <StorageIcon sx={{ fontSize: 56 }} />,
    name: 'System Integration',
    description: 'Seamless integration of various systems for optimal performance.',
  },
]

export default function Services() {
  return (
    <Box id="services" sx={{ py: { xs: 4, md: 6 }, px: { xs: 3, md: 10 } }}>
      <SectionTitle title='Our Services' eyebrow='We provide end-to-end security and automation solution.' align='center' />
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


