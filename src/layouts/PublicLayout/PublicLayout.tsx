import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import type { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import logoImg from '../../assets/logo.jpeg'

const SOCIALS = [
  { label: 'Facebook', value: 'f' },
  { label: 'Twitter', value: 't' },
  { label: 'LinkedIn', value: 'in' },
]

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Contact', to: '/contact' },
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

export default function PublicLayout() {
  const location = useLocation()

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
          <Typography variant='body2' sx={{ fontWeight: 700 }}>
            Email: info@xoenterprise.com
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Typography variant='body2' sx={{ fontWeight: 700 }}>
            Follow Us:
          </Typography>
            {SOCIALS.map((s) => (
              <Box
                key={s.label}
                component='a'
                href='#'
                aria-label={s.label}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {s.value}
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
                const active = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)
                return (
                  <Button
                    key={item.to}
                    onClick={() => (window.location.href = item.to)}
                    sx={{
                      color: active ? 'primary.main' : 'secondary.main',
                      fontWeight: 800,
                      '&:hover': { backgroundColor: 'transparent', color: 'primary.main' },
                    }}
                  >
                    {item.label}
                  </Button>
                )
              })}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant='contained'
                color='primary'
                sx={{ borderRadius: 1, px: 3, py: 1.25, display: { xs: 'none', sm: 'inline-flex' } }}
                onClick={() => (window.location.href = '/contact')}
              >
                Request Quote
              </Button>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

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

