import TestSeriesCard from '../../components/TestCard'
import React from 'react'

export const testSeriesData = [
  {
    title: "Prayas JEE Hindi 2026",
    subtitle: "Test Series",
    tests: 20,
    price: 799,
    originalPrice: 1599,
    validity: 180,
    image: "/test1.webp",
    badge: "ONLINE HINDI",
    discount: 50,
  }, {
    title: "Prayas JEE Hindi 2026",
    subtitle: "Test Series",
    tests: 20,
    price: 799,
    originalPrice: 1599,
    validity: 180,
    image: "/test1.webp",
    badge: "ONLINE HINDI",
    discount: 50,
  },  {
    title: "Prayas JEE Hindi 2026",
    subtitle: "Test Series",
    tests: 20,
    price: 799,
    originalPrice: 1599,
    validity: 180,
    image: "/test1.webp",
    badge: "ONLINE HINDI",
    discount: 50,
  }, {
    title: "Prayas JEE Hindi 2026",
    subtitle: "Test Series",
    tests: 20,
    price: 799,
    originalPrice: 1599,
    validity: 180,
    image: "/test1.webp",
    badge: "ONLINE HINDI",
    discount: 50,
  },  {
    title: "Prayas JEE Hindi 2026",
    subtitle: "Test Series",
    tests: 20,
    price: 799,
    originalPrice: 1599,
    validity: 180,
    image: "/test1.webp",
    badge: "ONLINE HINDI",
    discount: 50,
  }, {
    title: "Prayas JEE Hindi 2026",
    subtitle: "Test Series",
    tests: 20,
    price: 799,
    originalPrice: 1599,
    validity: 180,
    image: "/test1.webp",
    badge: "ONLINE HINDI",
    discount: 50,
  }, {
    title: "Prayas JEE Hindi 2026",
    subtitle: "Test Series",
    tests: 20,
    price: 799,
    originalPrice: 1599,
    validity: 180,
    image: "/test1.webp",
    badge: "ONLINE HINDI",
    discount: 50,
  },
  {
    title: "NEET Rank Booster 2025",
    subtitle: "Full Syllabus",
    tests: 25,
    price: 999,
    originalPrice: 1999,
    validity: 365,
    image: "/test1.webp",
    badge: "ONLINE ENGLISH",
    discount: 50,
  },
  {
    title: "Foundation Class 10 2025",
    subtitle: "Test Series",
    tests: 15,
    price: 599,
    originalPrice: 1299,
    validity: 150,
    image: "/test1.webp",
    badge: "OFFLINE HINDI",
    discount: 54,
  },
   {
    title: "Foundation Class 10 2025",
    subtitle: "Test Series",
    tests: 15,
    price: 599,
    originalPrice: 1299,
    validity: 150,
    image: "/test1.webp",
    badge: "OFFLINE HINDI",
    discount: 54,
  },
];

function page() {
  return (
    <>
 <div className='px-20'>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {testSeriesData.map((series, index) => (
        <TestSeriesCard key={index} {...series} />
      ))}
    </div> 
 </div>
   
    </>
  )
}

export default page
