import CircularProgress from '@mui/material/CircularProgress'

import Box from '@mui/material/Box'

export default function Loader({ size = 36 }: { size?: number }) {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' p={2}>
      <CircularProgress size={size} />
    </Box>
  )
}

