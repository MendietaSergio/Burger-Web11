import React,{useState} from 'react'

export const ListClients = ({ viewClients }) => {
  const [clientsList,setClientsList] = useState()
  if (viewClients) {
    return (
      <div>ListClients</div>
    )
  }else{
    return null
  }
}
