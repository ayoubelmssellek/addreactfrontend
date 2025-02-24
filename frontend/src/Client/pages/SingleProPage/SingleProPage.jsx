import React, { useEffect, useState } from 'react'
import ProductPageDiskTopVersion from '../../components/ProductPageDiskTopVersion/ProductPageDiskTopVersion'
import { Navbar } from '../../components/navbar/Navbar'
import ProductPage from '../../components/ProductPage/ProductPage'
export const SingleProPage = () => {
    const [IsMobile,setIsMobile]=useState(window.innerWidth<=576)
    useEffect(()=>{
  const handelResize=()=>{
    setIsMobile(window.innerWidth<=576)
  }
  window.addEventListener('resize',handelResize)

    
    return ()=>{
      window.removeEventListener('resize',handelResize)

    }
    },[])
  return (
    <>
   
     {
        IsMobile ?
         <ProductPage/> 
         :
      <>
         <Navbar/>
         <ProductPageDiskTopVersion/> 
      </>
     }
    </>
  )
}

