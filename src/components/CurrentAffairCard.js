import React from 'react'

function CurrentAffairCard(catItems) {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      {catItems.map((item) => (

        <Link key={item.id} href="/current-affairs-detail">
          <div className="rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 bg-white">
            <div className="relative">
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={400}
                className="w-full h-44 object-cover rounded-t-xl"
              />
              <span className="absolute top-3 left-3 bg-yellow-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow">
                {item.category}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <CalendarDays size={16} />
                {new Date(item.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <h2 className="text-base font-semibold line-clamp-2 mb-2">
                {item.title}
              </h2>
            </div>
          </div>
        </Link>
      ))}
    </div>

  )
}

export default CurrentAffairCard
