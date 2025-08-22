

// "use client"

// import { useState, useEffect } from "react"
// import axiosInstance from "../app/axios/axiosInstance"
// import CategoryCoursesSection from "./CategoryCoursesSection"

// export default function HomeCoursesSection() {
//   const [categories, setCategories] = useState([])

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axiosInstance.get("/categories")
//         setCategories(res?.data || [])
//       } catch (err) {
//         console.error("Error fetching categories", err)
//       }
//     }
//     fetchCategories()
//   }, [])

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-12">

//          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#204972] text-center">
//                 Explore Popular Courses
//             </h2>


//       {categories?.map((cat) => (
//         <CategoryCoursesSection key={cat._id} category={cat} />
//       ))}
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import axiosInstance from "../app/axios/axiosInstance"
import CategoryCoursesSection from "./CategoryCoursesSection"

export default function HomeCoursesSection() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories")
        setCategories(res?.data || [])
      } catch (err) {
        console.error("Error fetching categories", err)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#204972] text-center">
        Explore Popular Courses
      </h2>

      {categories?.map((cat) => (
        <CategoryCoursesSection key={cat?._id} category={cat} />
      ))}
    </div>
  )
}
