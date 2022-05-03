import React from 'react'
import { ImgProfile } from '../components/containerProfile/Imgprofile/ImgProfile'
import { OptionProfile } from '../components/containerProfile/OptionProfile/OptionProfile'

export const Myaccount = () => {
  return (
    <div>
      <div className='container'>
        <div className="row">
          <ImgProfile />
          <OptionProfile />
        </div>

      </div>
    </div>
  )
}
