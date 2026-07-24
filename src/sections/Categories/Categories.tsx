import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'

import SectionTitle from '@/components/common/ui/SectionTitle/SectionTitle'

export default function Categories() {
  const navigate = useNavigate()

  const categories = [
    { title: 'Solar Panels', description: 'Power & efficiency' },
    { title: 'Inverters', description: 'Reliable performance' },
    { title: 'Batteries', description: 'Backup & storage' },
    { title: 'Accessories', description: 'Complete the system' },
    { title: 'Charge Controllers', description: 'Optimize charging' },
    { title: 'Mounting Structures', description: 'Secure installation' },
    { title: 'Cables & Wiring', description: 'Reliable connectivity' },
    { title: 'Hardware', description: 'Hardware solutions' },
  ]

  const handleCategoryClick = (title: string) => {
    navigate(`/products?category=${encodeURIComponent(title)}`)
  }

  return (
    <Box id="categories" sx={{ py: 2 }}>
      <SectionTitle title='Explore our products categories' align='center' />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(8, 1fr)' },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {categories.map((cat) => (
          <Box
            key={cat.title}
            onClick={() => handleCategoryClick(cat.title)}
            sx={{
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
              {cat.title.charAt(0)}
            </Box>

            <Box sx={{ fontWeight: 700, color: 'secondary.main', fontSize: 13, lineHeight: 1.3 }}>
              {cat.title}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}


