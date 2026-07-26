import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Stack } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import Button from '@/components/common/ui/Button/Button'
import logoImg from '@/assets/logo.jpeg'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface LoginFormData {
  email: string
  password: string
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LoginPage() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>()

  const onSubmit = (data: LoginFormData) => {
    // eslint-disable-next-line no-console
    console.log('Admin login attempt:', data)
    // TODO: integrate with authentication API
    navigate('/admin/dashboard')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 420,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: '0 4px 24px rgba(15, 23, 42, 0.12)',
          border: '1px solid',
          borderColor: 'grey.200',
          p: { xs: 3, sm: 4 },
        }}
      >
        {/* ---------- Logo ---------- */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Box
            component='img'
            src={logoImg}
            alt='XoEnterprise logo'
            sx={{
              width: 72,
              height: 72,
              borderRadius: 1.5,
              objectFit: 'cover',
              mx: 'auto',
            }}
          />
        </Box>

        {/* ---------- Title ---------- */}
        <Typography
          variant='h5'
          fontWeight={800}
          textAlign='center'
          color='secondary.main'
          gutterBottom
        >
          Admin Sign In
        </Typography>

        <Typography
          variant='body2'
          color='text.secondary'
          textAlign='center'
          sx={{ mb: 3 }}
        >
          Enter your credentials to access the admin panel.
        </Typography>

        {/* ---------- Divider with icon ---------- */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mb: 3,
          }}
        >
          <Box sx={{ flex: 1, height: '1px', bgcolor: 'grey.200' }} />
          <LockOutlinedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Box sx={{ flex: 1, height: '1px', bgcolor: 'grey.200' }} />
        </Box>

        {/* ---------- Form ---------- */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2.5}>
            {/* Email */}
            <TextField
              label='Email Address'
              fullWidth
              size='small'
              required
              type='email'
              autoComplete='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message || ' '}
            />

            {/* Password */}
            <TextField
              label='Password'
              fullWidth
              size='small'
              required
              type='password'
              autoComplete='current-password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message || ' '}
            />

            {/* Submit Button */}
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              fullWidth
              disabled={isSubmitting}
              sx={{
                fontWeight: 700,
                textTransform: 'none',
                py: 1.25,
                borderRadius: 1,
                mt: 1,
              }}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </Stack>
        </form>

        {/* ---------- Footer ---------- */}
        <Typography
          variant='caption'
          color='text.secondary'
          textAlign='center'
          display='block'
          sx={{ mt: 3 }}
        >
          &copy; {new Date().getFullYear()} XoEnterprise. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}

