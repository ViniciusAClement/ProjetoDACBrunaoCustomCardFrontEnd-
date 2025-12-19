import React from 'react'
import Navigation from './Navigation'
import HeroBanner from './HeroBanner'
import ProductSection from './ProductSection'

function Home({ onNavigateToCategory }) {
  return (
    <>
      <Navigation onNavigateToCategory={onNavigateToCategory} />
      <HeroBanner />
      <ProductSection />
    </>
  )
}

export default Home

