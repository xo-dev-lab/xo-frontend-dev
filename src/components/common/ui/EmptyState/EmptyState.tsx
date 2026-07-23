import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'

export default function EmptyState({
  title = 'No data',
  description,
}: {
  title?: string
  description?: string
}) {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      py={6}
    >
      <Typography variant='h6' fontWeight={800}>
        {title}
      </Typography>
      {description ? (
        <Typography mt={1} color='text.secondary'>
          {description}
        </Typography>
      ) : null}
    </Box>
  )
}

