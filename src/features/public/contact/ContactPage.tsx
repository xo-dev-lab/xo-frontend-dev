import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import {
  Box,
  Typography,
  TextField,
  Grid,
  Stack,
} from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'

import PageContainer from '@/components/common/ui/PageContainer/PageContainer'
import Button from '@/components/common/ui/Button/Button'
import { apiClient } from '@/services/api/client'
import { type CompanyDetailsResponse } from '@/types/companyDetails'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ContactFormData {
  yourName: string
  yourPhone: string
  emailId: string
  city: string
  subject: string
  message: string
}

interface ContactInquiryPayload {
  source: 'contact'
  User_Name: string
  phone: string
  email: string
  city: string
  subject: string
  message: string
}

interface InquiryResponse {
  success: boolean
  message?: string
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

  // const onSubmit = (data: ContactFormData) => {
  //   // eslint-disable-next-line no-console
  //   console.log('Contact form submitted:', data)
  //   // TODO: integrate with API
  // }

  const { mutate: submitInquiry, isPending: isSubmitting } = useMutation({
    mutationFn: async (payload: ContactInquiryPayload) => {
      const res = await apiClient.post<InquiryResponse>('/api/inquiries', payload)
      return res.data
    },
    onSuccess: (res) => {
      toast.success(res.message || 'Your message has been submitted successfully.')
      reset()
    },
    onError: (err: unknown) => {
      const axiosError = err as { response?: { data?: { message?: string } } }
      toast.error(axiosError.response?.data?.message || 'Failed to submit. Please try again later.')
    },
  })

  const onSubmit = (data: ContactFormData) => {
    submitInquiry({
      source: 'contact',
      User_Name: data.yourName,
      phone: data.yourPhone,
      email: data.emailId,
      city: data.city,
      subject: data.subject,
      message: data.message,
    })
  }

  const sharedBoxSx = {
    border: '1px solid',
    borderColor: 'grey.300',
    borderRadius: 2,
    p: { xs: 3, md: 4 },
    height: '100%',
    bgcolor: 'background.paper',
  }

  const { data: companyDetails } = useQuery({
    queryKey: ['company-details'],
    queryFn: async () => {
      const res = await apiClient.get<CompanyDetailsResponse>('/api/company-details')
      return res.data.data
    },
  })

  const splitLines = (value?: string) =>
    (value || '').split(/\n+/).map((s) => s.trim()).filter(Boolean)

  const contactInfo: ContactInfoEntry[] = (() => {
    if (!companyDetails) return CONTACT_INFO

    const entries: ContactInfoEntry[] = []

    const registeredLines = splitLines(companyDetails.registeredOffice)
    if (registeredLines.length) {
      entries.push({
        icon: <LocationOnOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />,
        label: 'Registered Office',
        lines: registeredLines,
      })
    }

    const currentLines = splitLines(companyDetails.currentOffice)
    if (currentLines.length) {
      entries.push({
        icon: <LocationOnOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />,
        label: 'Current Office',
        lines: currentLines,
      })
    }

    const phoneLines = splitLines(companyDetails.phone)
    if (phoneLines.length) {
      entries.push({
        icon: <CallOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />,
        lines: phoneLines,
      })
    }

    const emailLines = splitLines(companyDetails.email)
    if (emailLines.length) {
      entries.push({
        icon: <EmailOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />,
        lines: emailLines,
      })
    }

    const timeRange = [companyDetails.openingTime, companyDetails.closingTime]
      .filter(Boolean)
      .join(' - ')
    const hoursLine = [companyDetails.openingDays, timeRange].filter(Boolean).join(': ')
    if (hoursLine) {
      entries.push({
        icon: <AccessTimeOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />,
        label: 'Operating Time',
        lines: [hoursLine],
      })
    }

    return entries
  })()

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
                {contactInfo.map((entry, index) => (
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

                  {/* City */}
                  <TextField
                    label='Your City'
                    fullWidth
                    size='small'
                    required
                    {...register('city', {
                      required: 'City is required',
                    })}
                    error={!!errors.city}
                    helperText={errors.city?.message || ' '}
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
                    error={!!errors.subject}
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
                    disabled={isSubmitting}
                    sx={{
                      fontWeight: 700,
                      textTransform: 'none',
                      py: 1.25,
                      borderRadius: 1,
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </Stack>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

