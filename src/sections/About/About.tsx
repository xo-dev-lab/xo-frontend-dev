import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import aboutUsImg from '@/assets/AboutUs.png'

export default function About() {
  const theme = useTheme()

  return (
<Box id="about-us" sx={{ py: { xs: 4, md: 6 }, px: { xs: 3, md: 10 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 4, md: 10 },
          alignItems: 'center',
        }}
      >
        {/* Image Column - Left Side */}
        <Box>
          <Box
            component='img'
            src={aboutUsImg}
            alt='About XO Enterprise'
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: 420,
              objectFit: 'cover',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(15, 23, 42, 0.12)',
              display: 'block',
            }}
          />
        </Box>
        {/* Content Column - Right Side */}
        <Box sx={{pr: { xs: 2, md: 12 } }}>
          <Typography
            variant='h4'
            fontWeight={800}
            color='secondary'
            sx={{ mb: 2, fontSize: { xs: '1.5rem', md: '1.75rem' } }}
          >
            About XO Enterprise
          </Typography>
          {[
            'XO Enterprises Was established in 2017. I believe in saying that a friend is one who takes me for what I am.',
            'Being Owner of XO Enterprises, I have first got the experience of 4 year in this field and gathered the technical as well as the theoretical knowledge. I realize the fact that no one can stand in market without sharing his/her interests with other.',
            `With support of all companies employees, XO enterprises is able to create a steady sales increase and growing number of clients are showing their trust/confidence rapidly. This is all due to everyone's diligent untiring contribution towards the company.`,
            'The progress of economy, thriving of the society, and the improvement of people&rsquo;s daily lives create the demand for security facility.',
          ].map((paragraph, index) => (
            <Typography
              key={index}
              variant='body1'
              sx={{
                color: theme.palette.text.secondary,
                lineHeight: 1.8,
                fontSize: { xs: '0.95rem', md: '1rem' },
                textAlign: 'justify',
                mb: index < 6 ? 2 : 0,
              }}
            >
              {paragraph}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

