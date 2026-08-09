import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Typography,
  TextField,
  Grid,
  Stack,
  CircularProgress,
} from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'

import PageContainer from '@/components/common/ui/PageContainer/PageContainer'
import Button from '@/components/common/ui/Button/Button'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ContactFormData {
  yourName: string
  yourPhone: string
  emailId: string
  subject: string
  message: string
}

/* ------------------------------------------------------------------ */
/*  Contact info entries                                                */
/* ------------------------------------------------------------------ */

interface ContactInfoEntry {
  icon: React.ReactNode
  label?: string
  lines: string[]
}

const CONTACT_INFO: ContactInfoEntry[] = [
  {
    icon: <LocationOnOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />,
    label: 'Registered Office',
    lines: ['Lucknow, Uttam Nagare', 'Noapara - 700110'],
  },
  {
    icon: <LocationOnOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />,
    label: 'Current Office',
    lines: ['Mumbai, Andheri East', 'Maharashtra - 400093'],
  },
  {
    icon: <CallOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />,
    lines: ['+91 987456321 / +91 4563217799'],
  },
  {
    icon: <EmailOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />,
    lines: ['sales@xoenterprises.com'],
  },
  {
    icon: <AccessTimeOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />,
    label: 'Operating Time',
    lines: ['Mon - Sat: 9:00 AM - 6:00 PM'],
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const [result, setResult] = useState('')
  const [sending, setSending] = useState(false)
  const onSubmit = async (data: ContactFormData) => {
    setSending(true)
    setResult('Sending...')

try {
      const infoParagraph = [
        `A new contact enquiry has been received through the XO Enterprise website. "${data.yourName}" has submitted an enquiry and provided ${data.emailId} as their email address and "${data.yourPhone}" as their contact number.`,
        `Their enquiry is as follows: "${data.message}"`,
        'Kindly review the details and follow up with the visitor accordingly.',
      ].join('\n\n')

      const formData = new FormData()
      formData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
      formData.append('subject', data.subject)
      formData.append('Info', infoParagraph)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const responseData = await response.json()

      if (responseData.success) {
        setResult('Form submitted successfully!')
        reset()
      } else {
        setResult(
          responseData.message || 'Something went wrong. Please try again.'
        )
      }
    } catch {
      setResult('Network error. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const sharedBoxSx = {
    border: '1px solid',
    borderColor: 'grey.300',
    borderRadius: 2,
    p: { xs: 3, md: 4 },
    height: '100%',
    bgcolor: 'background.paper',
  }

  return (
    <PageContainer>
      <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 4 } }}>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* ---------- LEFT BOX: Contact Info ---------- */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={sharedBoxSx}>
              <Typography variant='h5' fontWeight={700} mb={3}>
                Get in Touch
              </Typography>

              <Stack spacing={3}>
                {CONTACT_INFO.map((entry, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1.5 }}>
                    <Box sx={{ mt: 0.3, flexShrink: 0 }}>{entry.icon}</Box>
                    <Box>
                      {entry.label && (
                        <Typography
                          variant='subtitle2'
                          fontWeight={700}
                          color='text.secondary'
                          gutterBottom
                        >
                          {entry.label}
                        </Typography>
                      )}
                      {entry.lines.map((line, i) => (
                        <Typography
                          key={i}
                          variant='body2'
                          color='text.secondary'
                          sx={{ lineHeight: 1.7 }}
                        >
                          {line}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* ---------- RIGHT BOX: Contact Form ---------- */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={sharedBoxSx}>
              <Typography variant='h5' fontWeight={700} mb={3}>
                Send Us a Message
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={2.5}>
                  {/* Row 1: Your Name + Your Phone */}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      flexDirection: { xs: 'column', sm: 'row' },
                    }}
                  >
                    <TextField
                      label='Your Name'
                      fullWidth
                      size='small'
                      required
                      {...register('yourName', {
                        required: 'Your Name is required',
                      })}
                      error={!!errors.yourName}
                      helperText={errors.yourName?.message || ' '}
                    />
                    <TextField
                      label='Your Phone'
                      fullWidth
                      size='small'
                      required
                      type='tel'
                      {...register('yourPhone', {
                        required: 'Your Phone is required',
                        minLength: {
                          value: 7,
                          message: 'Phone number too short',
                        },
                      })}
                      error={!!errors.yourPhone}
                      helperText={errors.yourPhone?.message || ' '}
                    />
                  </Box>

                  {/* Email ID */}
                  <TextField
                    label='Email ID'
                    fullWidth
                    size='small'
                    required
                    type='email'
                    {...register('emailId', {
                      required: 'Email ID is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    error={!!errors.emailId}
                    helperText={errors.emailId?.message || ' '}
                  />

                  {/* Subject */}
                  <TextField
                    label='Subject'
                    fullWidth
                    size='small'
                    required
                    {...register('subject', {
                      required: 'Subject is required',
                    })}
                    helperText={errors.subject?.message || ' '}
                  />

                  {/* Your Message */}
                  <TextField
                    label='Your Message'
                    fullWidth
                    size='small'
                    required
                    multiline
                    rows={4}
                    {...register('message', {
                      required: 'Message is required',
                    })}
                    error={!!errors.message}
                    helperText={errors.message?.message || ' '}
                  />

                  {/* Submit Button */}
                  <Button
                    type='submit'
                    variant='contained'
                    color='error'
                    size='large'
                    fullWidth
                    disabled={sending}
                    sx={{
                      fontWeight: 700,
                      textTransform: 'none',
                      py: 1.25,
                      borderRadius: 1,
                    }}
                  >
                    {sending ? (
                      <CircularProgress size={24} color='inherit' />
                    ) : (
                      'Send Message'
                    )}
                  </Button>

                  {/* Result feedback */}
                  {result && (
                    <Typography
                      variant='body2'
                      color={result === 'Form submitted successfully!' ? 'success.main' : 'error.main'}
                      sx={{ textAlign: 'center' }}
                    >
                      {result}
                    </Typography>
                  )}
                </Stack>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

