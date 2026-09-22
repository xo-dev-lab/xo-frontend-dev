import { useState } from 'react'
import Box from '@mui/material/Box'
import { type SxProps, type Theme } from '@mui/material/styles'

export const PLACEHOLDER_IMAGE =
  'https://placehold.co/600x500/0F172A/E53935?text=Product'

interface ProductImageProps {
  src?: string
  alt?: string
  sx?: SxProps<Theme>
}

export default function ProductImage({ src, alt, sx }: ProductImageProps) {
  const [hasError, setHasError] = useState(false)
  const currentSrc = src && !hasError ? src : PLACEHOLDER_IMAGE

  return (
    <Box
      component='img'
      src={currentSrc}
      alt={alt}
      onError={() => setHasError(true)}
      sx={sx}
    />
  )
}