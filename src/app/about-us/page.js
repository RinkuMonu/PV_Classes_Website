import Head from 'next/head';
import Link from 'next/link';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About Us | Company Name</title>
        <meta name="description" content="Learn about our company mission, values, and team" />
      </Head>
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-[#204972] text-white"
        style={{
          backgroundImage: 'linear-gradient(to right, #0F437B, #13773E)',
        }}
      >
        
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our PV Classes</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Dedicated to excellence, innovation, and creating value for our clients and community.
          </p>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-[#204972] mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                Our mission is to deliver exceptional products and services that exceed expectations while fostering
                sustainable growth and positive impact in our industry.
              </p>
              <p className="text-gray-700">
                We believe in building lasting relationships with our clients through transparency, innovation,
                and unwavering commitment to quality.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="bg-[#5C6417] h-64 rounded-lg flex items-center justify-center text-white text-2xl font-semibold">
                Mission Image
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-[#214B7D] text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Innovation",
                description: "We embrace change and constantly seek new ways to solve problems and create value."
              },
              {
                title: "Integrity",
                description: "We operate with honesty and transparency in all our business dealings."
              },
              {
                title: "Excellence",
                description: "We strive for the highest quality in everything we do, never settling for mediocrity."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white bg-opacity-10 text-black p-6 rounded-lg backdrop-filter backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-[#204972] text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: "Pankaj Sir", role: "Maths & Chemistry" },
              { name: "Vijay Sir", role: "Geo of Rajasthan,India & World" },
              { name: "Akash Sir", role: "State Policy & Indian Policy" },
              { name: "Uma Ma'am", role: "Rajasthan culture & History" },
             
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto bg-gray-300 rounded-full mb-4 flex items-center justify-center text-[#5C6417]">
                  <span className="text-4xl font-bold">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-[#214B7D]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#5C6417] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to work with us?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get in touch with our team to discuss how we can help you achieve your goals.
          </p>
          <Link href={"/contact-us"} className="bg-white text-[#204972] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>

     
    </div>
  );
}