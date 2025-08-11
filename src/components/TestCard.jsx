import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function TestCard() {
  return (
    <>
    <div className=" my-12">
      <div className="relative">
        {/* main card */}
        <div className="rounded-2xl border border-gray-200 shadow-md overflow-hidden pt-12 bg-white">
          {/* body with soft green gradient */}
          <div className="p-6 bg-gradient-to-b from-green-50 to-white rounded-b-2xl">
            <h3 className="text-center text-2xl font-semibold text-gray-800 mb-4">SSC CGL 2025 – Tier 1</h3>

            <ul className="text-gray-700 text-left list-disc list-inside space-y-2 mb-6">
              <li>20 Full Mock Tests</li>
              <li>210 Previous Mock Tests</li>
            </ul>

            <div className="flex gap-3 justify-center mb-3">
              <Link href="#" className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#341a63] text-white font-semibold text-sm shadow-sm hover:opacity-95">
                View All Tests
              </Link>

              <Link href="#" className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#1ea7ff] text-white font-semibold text-sm shadow-sm hover:opacity-95">
                Buy Now
              </Link>
            </div>

            <div className="px-4">
              <Link href="#" className="block text-center py-2 rounded-md border border-[#341a63] text-[#341a63] font-semibold">Attempt Now</Link>
            </div>
          </div>
        </div>

        {/* floating header badge */}
        <div className="absolute left-1/2 -top-7 transform -translate-x-1/2 w-48 bg-white rounded-2xl shadow-lg flex flex-col items-center py-4">
          <div className="w-16 h-16 relative rounded-full overflow-hidden bg-white">
            <Image src="/ssc-logo.png" alt="SSC" fill sizes="64px" style={{ objectFit: 'contain' }} />
          </div>
          <div className="mt-2 text-gray-800 font-semibold">View Plans</div>
        </div>
      </div>
    </div>
    </>
  )
}

export default TestCard
