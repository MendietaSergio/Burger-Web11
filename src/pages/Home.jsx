import React from 'react'
import { Banner } from '../components/Banner/Banner'
import { FeaturedProduct } from '../components/FeaturedProduct/FeaturedProduct'
import { HappyCustomers } from '../components/HappyCustomers/HappyCustomers'
import { OptionsSelection } from '../components/OptionsSelection/OptionsSelection'
import { PortBurger } from '../components/PortBurger/PortBurger'
import { Ubication } from '../components/Ubication/Ubication'

export const Home = () => {
  return (
    <div>
      <div className='row container-imgFondo'>
        <PortBurger />
        <OptionsSelection />
      </div>
      <FeaturedProduct />
      <Banner />
      <Ubication />
    </div>
  )
}
