import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InventoryIcon from '@mui/icons-material/Inventory'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'

import logoImg from '@/assets/logo.jpeg'

/* ------------------------------------------------------------------ */
/*  Navigation items                                                    */
/* ------------------------------------------------------------------ */

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon /> },
  { label: 'Products', path: '/admin/products', icon: <InventoryIcon /> },
  { label: 'Inquiries', path: '/admin/inquiries', icon: <ContactMailIcon /> },
  // { label: 'Users', path: '/admin/users', icon: <PeopleIcon /> },
  { label: 'Settings', path: '/admin/settings', icon: <SettingsIcon /> },
]

/* ------------------------------------------------------------------ */
/*  Sidebar width constant                                             */
/* ------------------------------------------------------------------ */

const SIDEBAR_WIDTH = 260

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [mobileOpen, setMobileOpen] = useState(false)

  const activePage = NAV_ITEMS.find((item) => location.pathname === item.path)

  const handleLogout = () => {
    navigate('/admin/login')
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev)
  }

  const handleNavClick = (path: string) => {
    navigate(path)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  /* ---------- Sidebar content (shared between desktop & mobile drawer) ---------- */
  const sidebarContent = (
    <>
      {/* Logo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2.5,
          py: 2.5,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Box
          component='img'
          src={logoImg}
          alt='XoEnterprise logo'
          sx={{
            width: 44,
            height: 44,
            borderRadius: 1,
            objectFit: 'cover',
          }}
        />
        <Typography variant='h6' fontWeight={800} sx={{ color: '#FFFFFF' }}>
          XoEnterprise
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1, px: 1.5, pt: 1.5 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path

          return (
            <ListItemButton
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.65)',
                bgcolor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.65)',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                }}
              />
            </ListItemButton>
          )
        })}
      </List>

      {/* Logout */}
      <Box sx={{ px: 1.5, pb: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            color: 'rgba(255,255,255,0.65)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.08)',
              color: '#FFFFFF',
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: 'inherit',
            }}
          >
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary='Logout'
            primaryTypographyProps={{
              fontWeight: 500,
              fontSize: '0.9rem',
            }}
          />
        </ListItemButton>
      </Box>
    </>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      {/* ---------- Desktop sidebar (hidden on mobile) ---------- */}
      {!isMobile && (
        <Box
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            bgcolor: '#0F172A',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            zIndex: 1200,
          }}
        >
          {sidebarContent}
        </Box>
      )}

      {/* ---------- Mobile drawer ---------- */}
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            bgcolor: '#0F172A',
            color: '#FFFFFF',
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* ---------- Right content area ---------- */}
      <Box
        sx={{
          flex: 1,
          ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* White top header strip */}
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            px: { xs: 2, md: 4 },
            py: 2,
            borderBottom: '1px solid',
            borderColor: 'grey.200',
            display: 'flex',
            alignItems: 'center',
            minHeight: 64,
            gap: 1,
          }}
        >
          {/* Hamburger button — visible only on mobile */}
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' fontWeight={700} color='secondary.main'>
            {activePage?.label ?? 'Admin'}
          </Typography>
        </Box>

        {/* Page content */}
        <Box sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

