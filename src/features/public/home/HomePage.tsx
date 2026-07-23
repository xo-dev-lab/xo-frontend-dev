import Hero from '@/sections/Hero/Hero'

import About from '@/sections/About/About'
import Categories from '@/sections/Categories/Categories'
import FeaturedProducts from '@/sections/FeaturedProducts/FeaturedProducts'
import Services from '@/sections/Services/Services'
import ContactCTA from '@/sections/ContactCTA/ContactCTA'
import PageContainer from '@/components/common/ui/PageContainer/PageContainer'
import Divider from '@mui/material/Divider'

export default function HomePage() {
  return (
    <PageContainer>
      <Hero />
      <Divider />
      
      <Categories />
      <Divider />

      <About />
      <Divider />

      <FeaturedProducts />
      <Divider />

      <Services />
      <Divider />

      <ContactCTA />
    </PageContainer>
  )
}

