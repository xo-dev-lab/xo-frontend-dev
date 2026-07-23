import React from 'react'
import Box from '@mui/material/Box'

export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100vw',
        px: 0,

        mx: 'auto',
      }}
    >
      {children}
    </Box>
  )
}

