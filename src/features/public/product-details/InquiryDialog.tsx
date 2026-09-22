import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { apiClient } from '@/services/api/client'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface InquiryFormData {
  product: string
  yourName: string
  companyName: string
  phoneNumber: string
  email: string
  city: string
  quantity: number
  message: string
}

interface InquiryPayload {
  source: 'enquiry'
  product_id: number
  User_Name: string
  company_name?: string
  phone: string
  email: string
  city: string
  quantity?: number
  message: string
}

interface InquiryResponse {
  success: boolean
  message?: string
}

interface InquiryDialogProps {
  open: boolean
  onClose: () => void
  productName: string
  productId: number
  initialQuantity: number
}

/* ------------------------------------------------------------------ */
/*  Fields configuration                                               */
/* ------------------------------------------------------------------ */

interface FieldConfig {
  label: string
  name: keyof InquiryFormData
  required: boolean
  type?: string
  multiline?: boolean
  rows?: number
  disabled?: boolean
}

const FIELDS: FieldConfig[] = [
  { label: 'Product', name: 'product', required: false, disabled: true },
  { label: 'Your Name', name: 'yourName', required: true },
  { label: 'Company Name', name: 'companyName', required: false },
  { label: 'Phone Number', name: 'phoneNumber', required: true, type: 'tel' },
  { label: 'Email Address', name: 'email', required: true, type: 'email' },
  { label: 'City', name: 'city', required: true },
  { label: 'Quantity', name: 'quantity', required: false, type: 'number' },
  {
    label: 'Requirement / Message',
    name: 'message',
    required: false,
    multiline: true,
    rows: 3,
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function InquiryDialog({
  open,
  onClose,
  productName,
  productId,
  initialQuantity,
}: InquiryDialogProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    defaultValues: {
      product: productName,
      yourName: '',
      companyName: '',
      phoneNumber: '',
      email: '',
      city: '',
      quantity: initialQuantity,
      message: '',
    },
  })

  const { mutate: submitInquiry, isPending: isSubmitting } = useMutation({
    mutationFn: async (payload: InquiryPayload) => {
      const res = await apiClient.post<InquiryResponse>('/api/inquiries', payload)
      return res.data
    },
    onSuccess: (res) => {
      toast.success(res.message || 'Your enquiry has been submitted successfully.')
      reset({
        product: productName,
        yourName: '',
        companyName: '',
        phoneNumber: '',
        email: '',
        city: '',
        quantity: initialQuantity,
        message: '',
      })
      onClose()
    },
    onError: (err: unknown) => {
      const axiosError = err as { response?: { data?: { message?: string } } }
      toast.error(axiosError.response?.data?.message || 'Failed to submit. Please try again later.')
    },
  })

  const onSubmit = (data: InquiryFormData) => {
    submitInquiry({
      source: 'enquiry',
      product_id: productId,
      User_Name: data.yourName,
      company_name: data.companyName || undefined,
      phone: data.phoneNumber,
      email: data.email,
      city: data.city,
      quantity: data.quantity,
      message: data.message,
    })
  }

  /* Prevent closing when user clicks on the backdrop */
  const handleClose = (_event: object, reason: string) => {
    if (reason === 'backdropClick') return
    onClose()
  }

  /* ---- Fixed width for all labels on desktop ---- */
  const LABEL_WIDTH = 160

  /* ------------------------------------------------------------------ */
  /*  Render helpers                                                     */
  /* ------------------------------------------------------------------ */

  const renderFieldRow = (field: FieldConfig) => {
    const labelNode = (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          pr: isMobile ? 0 : 2,
          mb: isMobile ? 0.5 : 0,
          minWidth: isMobile ? undefined : LABEL_WIDTH,
          width: isMobile ? undefined : LABEL_WIDTH,
          flexShrink: 0,
        }}
      >
        <Typography
          variant='body2'
          fontWeight={600}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {field.label}
          {field.required && (
            <Typography component='span' color='error.main'>
              {' '}
              *
            </Typography>
          )}
        </Typography>
      </Box>
    )

    const inputNode = (
      <Controller
        name={field.name}
        control={control}
        rules={{
          required: field.required ? `${field.label} is required` : false,
          ...(field.name === 'email' && {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }),
          ...(field.name === 'phoneNumber' && {
            minLength: {
              value: 7,
              message: 'Phone number is too short',
            },
          }),
        }}
        render={({ field: rhfField }) => (
          <TextField
            {...rhfField}
            fullWidth
            size='small'
            error={!!errors[field.name]}
            helperText={errors[field.name]?.message || ' '}
            disabled={field.disabled}
            type={field.type ?? 'text'}
            multiline={field.multiline}
            rows={field.rows}
            inputProps={
              field.name === 'quantity' ? { min: 1 } : undefined
            }
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: field.disabled ? 'action.hover' : 'transparent',
              },
            }}
          />
        )}
      />
    )

    /* Mobile: stacked layout — label above field */
    if (isMobile) {
      return (
        <Box key={field.name} sx={{ mb: 1 }}>
          {labelNode}
          {inputNode}
        </Box>
      )
    }

    /* Desktop: side-by-side with fixed-width labels */
    return (
      <Box
        key={field.name}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          mb: 1,
        }}
      >
        {labelNode}
        {inputNode}
      </Box>
    )
  }

  /* ------------------------------------------------------------------ */
  /*  JSX                                                                */
  /* ------------------------------------------------------------------ */

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: { xs: 2, md: 3 },
          m: 1,
          // Remove default max-height so dialog can grow to fit content
          maxHeight: '90vh',
        },
      }}
    >
      {/* ---- Close icon (top-right corner) ---- */}
      <IconButton
        onClick={onClose}
        size='small'
        sx={{ position: 'absolute', right: 12, top: 12 }}
        aria-label='Close'
      >
        <CloseIcon />
      </IconButton>

      {/* ---- Title ---- */}
      <DialogTitle sx={{ pb: 1, pr: 5, textAlign: 'center' }}>
        <Typography variant='h5' fontWeight={700}>
          Request purchase / Inquiry
        </Typography>
      </DialogTitle>
      <DialogTitle sx={{ pb: 1, pr: 5, textAlign: 'center' }}>
        <Typography variant='body2' color='text.secondary' textAlign='center'>
          Please fill the details asked below . and we will get back to you.
        </Typography>
      </DialogTitle>

      {/* ---- Form ---- */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ mt: 2, pb: 1 }}>
          {FIELDS.map(renderFieldRow)}

          {/* Submit button */}
          <DialogActions sx={{ px: 0, pt: 2, justifyContent: 'center' }}>
            <Button
              type='submit'
              variant='contained'
              color='error'
              size='large'
              disabled={isSubmitting}
              sx={{
                fontWeight: 700,
                textTransform: 'none',
                py: 1.25,
                px: 4,
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  )
}

