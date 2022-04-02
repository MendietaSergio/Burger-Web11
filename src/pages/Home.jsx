import React from 'react'
import { Banner } from '../components/Banner/Banner'
import { FeaturedProduct } from '../components/FeaturedProduct/FeaturedProduct'
import { HappyCustomers } from '../components/HappyCustomers/HappyCustomers'
import { OptionsSelection } from '../components/OptionsSelection/OptionsSelection'
import { PortBurger } from '../components/PortBurger/PortBurger'

export const Home = () => {
  return (
    <div>
      <PortBurger/>
      <OptionsSelection/>
      <FeaturedProduct/>
      <Banner/>
      <HappyCustomers/>
    </div>
  )
}
