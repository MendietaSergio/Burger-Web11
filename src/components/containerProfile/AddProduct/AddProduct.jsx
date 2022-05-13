import React from 'react'

export const AddProduct = ({ viewAddProducts }) => {
  if (viewAddProducts) {

    return (
      <div>AddProduct</div>
    )
  } else {
    return null
  }
}
