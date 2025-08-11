import TestCard from '@/components/TestCard'
import React from 'react'

function page() {
  return (
    <>
 <div className='px-20'>
  <div  className='grid grid-cols-1 md:grid:col-2 lg:grid-cols-3 gap-6'>
    <TestCard/>
    </div>  
 </div>
   
    </>
  )
}

export default page
