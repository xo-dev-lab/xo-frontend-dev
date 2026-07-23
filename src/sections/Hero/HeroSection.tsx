import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useNavigate } from 'react-router-dom'

import heroSectionImg from '@/assets/herosection (2).png'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'

const brands = [
  "/brands/hikvision.svg",
  "/brands/dahua.svg",
  "/brands/bosch.svg",
  "/brands/honeywell.svg",
  "/brands/cpplus.svg",
  "/brands/suprema.svg",
];

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          minWidth: 0,
          minHeight: '560px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background image */}
        <Box
          component="img"
          src={heroSectionImg}
          alt="Hero section background"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            width: { xs: '100%', md: '50%' }, // half width on desktop
            px: { xs: 2, md: 0 },
            // ensure centered vertically; horizontal left aligned
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            // margin from the left side of the screen (as requested)
            pl: { xs: 2, md: 6 },
            gap: 2,
          }}
        >
          {/* Text */}
          <Box>
            <Typography
              variant="h4"
              sx={{
                color: '#E53935',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -0.5,
              }}
            >
              Secure{' '}
              <Box component="span" sx={{ color: '#E53935', display: 'inline-block' }}>
                {/* "." centered vertically */}
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    transform: 'translateY(-2px)',
                    marginX: '2px',
                  }}
                >
                  .
                </Box>
              </Box>{' '}
              Automate{' '}
              <Box component="span" sx={{ color: '#E53935', display: 'inline-block' }}>
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    transform: 'translateY(-2px)',
                    marginX: '2px',
                  }}
                >
                  .
                </Box>
              </Box>{' '}
              Protect
            </Typography>

            <Typography
              variant="h2"
              sx={{
                color: '#FFFFFF',
                fontWeight: 800,
                mt: 1,
                lineHeight: 1.1,
                letterSpacing: -0.5,
              }}
            >
              Professioinal Security &amp;
            </Typography>

            <Typography
              variant="h2"
              sx={{
                color: '#E53935',
                fontWeight: 800,
                mt: 0.5,
                lineHeight: 1.1,
                letterSpacing: -0.5,
              }}
            >
              Automation Solutions
            </Typography>

            <Typography
              sx={{
                color: '#FFFFFF',
                fontWeight: 500,
                mt: 1,
                lineHeight: 1.5,
                fontSize: { xs: 14, md: 16 },
              }}
            >
              Advanced cctv, Access Control, Video Door Phones, and fire safety system, for a smart safer
              tomorrow.
            </Typography>
          </Box>

          {/* Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
            {/* Request quote (red filled) */}
            <Button
              variant="contained"
              onClick={() => navigate('/contact')}
              sx={{
                backgroundColor: '#E53935',
                '&:hover': { backgroundColor: '#D32F2F' },
                px: 3,
                py: 1.2,
                borderRadius: '10px',
                color: '#fff',
                fontWeight: 800,
                minWidth: 190,
              }}
            >
              Request quote
            </Button>


            {/* Explore products (outlined with arrow on right) */}
            <Button
              variant="outlined"
              onClick={() => navigate('/products')}
              sx={{

                borderColor: '#FFFFFF',
                color: '#FFFFFF',
                backgroundColor: 'transparent',
                px: 3,
                py: 1.2,
                borderRadius: '10px',
                fontWeight: 800,
                minWidth: 220,
                '&:hover': {
                  borderColor: '#FFFFFF',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                },
              }}
            >
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                <Box component="span">View products</Box>
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>

      <Box py={4}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={3}
          >
            <Divider
              sx={{
                width: 120,
                borderColor: "#d9d9d9",
              }}
            />

            <Typography
              variant="h6"
              fontWeight={700}
              textTransform="uppercase"
            >
              Trusted By Leading Brands
            </Typography>

            <Divider
              sx={{
                width: 120,
                borderColor: "#d9d9d9",
              }}
            />
          </Stack>

          {/* Red underline */}
          <Box
            sx={{
              width: 45,
              height: 4,
              bgcolor: "#ff3b30",
              borderRadius: 2,
              mx: "auto",
              mt: 1.5,
            }}
          />
        </Box>
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          useFlexGap
          spacing={3}
          alignItems="center"
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: "#dcdcdc",
                mx: 3,
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            />
          }
        >
          {brands.map((logo) => (
            <Box
              key={logo}
              component="img"
              src={logo}
              alt="lol"
              sx={{
                height: 45,
                objectFit: "contain",
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  )
}



