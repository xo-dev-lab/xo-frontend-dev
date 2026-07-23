import Typography from '@mui/material/Typography'

import Box from '@mui/material/Box'

export default function SectionTitle({
  eyebrow,
  title,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  align?: 'left' | 'center'
}) {
  return (
    <Box textAlign={align} mb={3}>
      <Typography variant='h4' fontWeight={800} mt={eyebrow ? 0.5 : 0}>
        {title}
      </Typography>
      {eyebrow ? (
        <Typography variant='subtitle1' color='secondary' fontWeight={700}>
          {eyebrow}
        </Typography>
      ) : null}
    </Box>
  )
}

