import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import type { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import CloseIcon from '@mui/icons-material/Close'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MenuIcon from '@mui/icons-material/Menu'
import TwitterIcon from '@mui/icons-material/Twitter'

import logoImg from '../../assets/logo.jpeg'
import { ListItemText } from '@mui/material'

import { apiClient } from '@/services/api/client'
import { type CompanyDetailsResponse } from '@/types/companyDetails'

type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'twitter'

const SOCIALS: { platform: SocialPlatform; label: string; icon: React.ReactElement }[] = [
  { platform: 'facebook', label: 'Facebook', icon: <FacebookIcon sx={{ fontSize: 18 }} /> },
  { platform: 'instagram', label: 'Instagram', icon: <InstagramIcon sx={{ fontSize: 18 }} /> },
  { platform: 'linkedin', label: 'LinkedIn', icon: <LinkedInIcon sx={{ fontSize: 18 }} /> },
  { platform: 'twitter', label: 'Twitter', icon: <TwitterIcon sx={{ fontSize: 18 }} /> },
]

type NavItem =
  | { label: string; to: string; scrollTo?: never }
  | { label: string; to?: never; scrollTo: string }

const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Contact', to: '/contact' },
  { label: 'Categories', scrollTo: 'categories' },
  { label: 'About Us', scrollTo: 'about-us' },
  { label: 'Services', scrollTo: 'services' },
]

function HeaderLogo() {
  const navigate = useNavigate()

  return (
    <Button
      disableRipple
      onClick={() => navigate('/')}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 0,
      }}
    >
      <Box
        component='img'
        src={logoImg}
        alt='XoEnterprise logo'
        sx={{
          width: 60,
          height: 60,
          borderRadius: 1,
          objectFit: 'cover',
        }}
      />
    </Button>
  )
}

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function PublicLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const { data: companyDetails } = useQuery({
    queryKey: ['company-details'],
    queryFn: async () => {
      const res = await apiClient.get<CompanyDetailsResponse>('/api/company-details')
      return res.data.data
    },
  })

  const socialURL = (platform: SocialPlatform) => companyDetails?.[platform] || '#'

  const handleNavClick = (item: NavItem) => {
    if ('to' in item) {
      navigate(item.to!)
    } else if ('scrollTo' in item) {
      if (location.pathname === '/') {
        scrollToSection(item.scrollTo)
      } else {
        navigate('/')
        setTimeout(() => scrollToSection(item.scrollTo), 300)
      }
    }
  }

  const handleMobileNavClick = (item: NavItem) => {
    setMobileOpen(false)
    handleNavClick(item)
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          backgroundColor: '#0B1220',
          color: '#CBD5E1',
          py: 1,
          px: 4,
        }}
      >
        <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Typography variant='body2' sx={{ fontWeight: 700 }}>
              Email: {companyDetails?.email || 'info@xoenterprise.in'}
            </Typography>
            {companyDetails?.phone && (
              <Typography variant='body2' sx={{ fontWeight: 700 }}>
                Phone: {companyDetails.phone}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography variant='body2' sx={{ fontWeight: 700 }}>
            Follow Us:
          </Typography>
{SOCIALS.map((s) => (
              <Box
                key={s.label}
                component='a'
                href={socialURL(s.platform)}
                target='_blank'
                rel='noreferrer'
                aria-label={s.label}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#CBD5E1',
                  '&:hover': { color: '#E53935' },
                }}
              >
                {s.icon}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <AppBar
        position='static'
        elevation={0}
        sx={(theme: Theme) => ({
          backgroundColor: 'background.default',
          color: 'secondary.main',
          borderBottom: `1px solid ${theme.palette.divider}`,
          
        })}
      >
        <Toolbar sx={{  }}>

          <Container maxWidth={false} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '12vh' }}>
            <HeaderLogo />

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
              {navItems.map((item) => {
                const key = 'to' in item ? item.to : item.scrollTo
                const isActive = 'to' in item
                  ? (item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to!))
                  : false
                return (
                  <Button
                    key={key}
                    onClick={() => handleNavClick(item)}
                    sx={{
                      color: isActive ? 'primary.main' : 'secondary.main',
                      fontWeight: 800,
                      '&:hover': { backgroundColor: 'transparent', color: 'primary.main' },
                    }}
                  >
                    {item.label}
                  </Button>
                )
              })}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant='contained'
                color='primary'
                sx={{ borderRadius: 1, px: 3, py: 1.25, display: { xs: 'none', sm: 'inline-flex' } }}
                onClick={() => navigate('/contact')}
              >
                Request Quote
              </Button>

              <IconButton
                aria-label='Open navigation menu'
                onClick={() => setMobileOpen(true)}
                sx={{ display: { xs: 'inline-flex', md: 'none' }, color: 'secondary.main' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor='right'
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: 'background.default',
            px: 2,
            py: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box
            component='img'
            src={logoImg}
            alt='XoEnterprise logo'
            sx={{ width: 48, height: 48, borderRadius: 1, objectFit: 'cover' }}
          />
          <IconButton aria-label='Close navigation menu' onClick={() => setMobileOpen(false)} sx={{ color: 'secondary.main' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {navItems.map((item) => {
            const key = 'to' in item ? item.to : item.scrollTo
            const isActive =
              'to' in item
                ? item.to === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.to!)
                : false
            return (
              <ListItem key={key} disablePadding>
                <ListItemButton
                  onClick={() => handleMobileNavClick(item)}
                  sx={{
                    borderRadius: 1,
                    color: isActive ? 'primary.main' : 'secondary.main',
                    fontWeight: 800,
                    '&:hover': { backgroundColor: 'transparent', color: 'primary.main' },
                  }}
                >
                  <ListItemText primary={item.label} slotProps={{ primary: { fontWeight: 800 } }} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>

        <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Divider />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            sx={{ borderRadius: 1, px: 3, py: 1.25 }}
            onClick={() => {
              setMobileOpen(false)
              navigate('/contact')
            }}
          >
            Request Quote
          </Button>
        </Box>
      </Drawer>

      <Box component='main' sx={{ flex: 1 }}>
        <Outlet />
      </Box>

      <Box component='footer' sx={{ py: 4, borderTop: '1px solid', borderColor: 'divider', color: 'text.secondary' }}>
        <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant='body2'>© {new Date().getFullYear()} XoEnterprise. All rights reserved.</Typography>
          <Typography variant='body2'>Security & Automation</Typography>
        </Container>
      </Box>
    </Box>
  )
}

