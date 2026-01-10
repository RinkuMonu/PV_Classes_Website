import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaLightbulb, FaHandshake, FaStar, FaChalkboardTeacher, FaBookOpen, FaUsers, FaAward } from 'react-icons/fa';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About PV Classes | Best Coaching Institute</title>
        <meta name="description" content="Learn about PV Classes - our mission, values, and dedicated team of educators" />
      </Head>
      
      {/* Enhanced Hero Section with Education Theme */}
      <section 
        className="relative py-20 bg-gradient-to-r from-[#0F437B] via-[#1a5a9c] to-[#13773E] text-white overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#5C6417] opacity-20 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#13773E] opacity-15 rounded-full translate-x-20 translate-y-20"></div>
        
        <div className="container relative mx-auto px-6 text-center">
          <div className="inline-block p-3 bg-white/10 rounded-full backdrop-blur-sm mb-6">
            <FaBookOpen className="text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            About <span className="text-yellow-300">PV Classes</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Transforming education with personalized guidance, expert faculty, and proven results since 2010.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[150px]">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm">Successful Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[150px]">
              <div className="text-2xl font-bold">10+</div>
              <div className="text-sm">Years Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[150px]">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission Section with Image */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="relative">
                <div className="bg-gradient-to-br from-[#214B7D] to-[#5C6417] h-80 w-full rounded-2xl overflow-hidden shadow-xl">
                  {/* Replace with your actual mission image */}
                  <div className="h-full w-full bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center">
                    <div className="text-center p-6">
                      <FaChalkboardTeacher className="text-6xl text-[#214B7D] mx-auto mb-4" />
                      <p className="text-xl font-bold text-gray-800">Our Mission in Action</p>
                      <p className="text-gray-600 mt-2">Quality Education for Every Student</p>
                    </div>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#5C6417] opacity-20 rounded-full -z-10"></div>
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-[#214B7D]/10 text-[#214B7D] px-4 py-2 rounded-full mb-4">
                <FaAward className="text-lg" />
                <span className="font-semibold">Our Commitment</span>
              </div>
              <h2 className="text-3xl font-bold text-[#204972] mb-6">
                Our <span className="text-[#5C6417]">Mission</span>
              </h2>
              <p className="text-gray-700 mb-4 text-lg">
                To empower students with knowledge, critical thinking skills, and confidence to excel in competitive exams and beyond.
              </p>
              <p className="text-gray-700 mb-6">
                At PV Classes, we believe every student has unique potential. Our mission is to provide personalized, comprehensive coaching that goes beyond textbooks, fostering holistic development and academic excellence.
              </p>
              <ul className="space-y-3">
                {[
                  "Personalized attention to each student",
                  "Comprehensive study material & resources",
                  "Regular assessments & performance tracking",
                  "Expert guidance from experienced faculty"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-[#13773E] text-white p-1 rounded-full mt-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-[#204972] mb-4">Our Core Values</h2>
            <p className="text-gray-600">The principles that guide our teaching methodology and student engagement</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Innovation in Teaching",
                description: "We continuously evolve our teaching methods, incorporating technology and modern pedagogy to make learning engaging and effective.",
                icon: <FaLightbulb />,
                color: "from-blue-500 to-cyan-400"
              },
              {
                title: "Integrity & Ethics",
                description: "We maintain the highest ethical standards in education, ensuring transparency in our processes and genuine care for student development.",
                icon: <FaHandshake />,
                color: "from-green-500 to-emerald-400"
              },
              {
                title: "Excellence in Education",
                description: "We strive for academic excellence through rigorous training, quality resources, and continuous improvement in our curriculum.",
                icon: <FaStar />,
                color: "from-[#5C6417] to-lime-500"
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#214B7D] hover:shadow-xl transition-shadow duration-300">
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${value.color} text-white mb-6`}>
                  <div className="text-2xl">{value.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* Enhanced Team Section with Teacher Profiles */}
<section className="py-16 px-6 bg-gray-50">
  <div className="container mx-auto max-w-6xl">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-[#204972] mb-4">Meet Our Expert Faculty</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">Our team of experienced educators is dedicated to guiding students towards academic success with personalized attention.</p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Teacher 1: Pankaj Sir */}
      <div className="rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="p-6">
          {/* Teacher Image - Replace with actual image */}
          <div className="w-32 h-42 mx-auto overflow-hidden border-4 border-white shadow-lg mb-6">
            <Image 
              src="/Image/pankajSir.png"
              alt="Pankaj Sir - Maths & Chemistry Teacher"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Pankaj Sir</h3>
            <p className="text-[#214B7D] font-semibold mb-2">Mathematics & Chemistry</p>
            
            <div className="inline-block bg-gradient-to-r from-[#214B7D] to-[#5C6417] text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
              12+ Years Experience
            </div>
            
            <p className="text-gray-600 text-sm mb-4">IIT-JEE, NEET Foundation Specialist</p>
            
            <div className="flex justify-center space-x-2">
              {[1,2,3,4,5].map((star) => (
                <FaStar key={star} className="text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#214B7D]/10 to-[#5C6417]/10 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-center text-sm">
            <FaUsers className="text-[#214B7D] mr-2" />
            <span className="text-gray-700">300+ Students Taught</span>
          </div>
        </div>
      </div>

      {/* Teacher 2: Vijay Sir */}
      <div className="rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="p-6">
          <div className="w-32 h-42 mx-auto overflow-hidden border-4 border-white shadow-lg mb-6">
            <Image 
              src="/Image/vijaySir.png"
              alt="Vijay Sir - Geography Teacher"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Vijay Sir</h3>
            <p className="text-[#214B7D] font-semibold mb-2">Geography Expert</p>
            
            <div className="inline-block bg-gradient-to-r from-[#214B7D] to-[#5C6417] text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
              15+ Years Experience
            </div>
            
            <p className="text-gray-600 text-sm mb-4">Rajasthan, India & World Geography</p>
            
            <div className="flex justify-center space-x-2">
              {[1,2,3,4,5].map((star) => (
                <FaStar key={star} className="text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#214B7D]/10 to-[#5C6417]/10 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-center text-sm">
            <FaUsers className="text-[#214B7D] mr-2" />
            <span className="text-gray-700">350+ Students Taught</span>
          </div>
        </div>
      </div>

      {/* Teacher 3: Akash Sir */}
      <div className="rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="p-6">
          <div className="w-32 h-42 mx-auto overflow-hidden border-4 border-white shadow-lg mb-6">
            <Image 
              src="/Image/aakashSir.png"
              alt="Akash Sir - Polity Teacher"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Akash Sir</h3>
            <p className="text-[#214B7D] font-semibold mb-2">Polity Specialist</p>
            
            <div className="inline-block bg-gradient-to-r from-[#214B7D] to-[#5C6417] text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
              10+ Years Experience
            </div>
            
            <p className="text-gray-600 text-sm mb-4">State Policy & Indian Polity</p>
            
            <div className="flex justify-center space-x-2">
              {[1,2,3,4,5].map((star) => (
                <FaStar key={star} className="text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#214B7D]/10 to-[#5C6417]/10 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-center text-sm">
            <FaUsers className="text-[#214B7D] mr-2" />
            <span className="text-gray-700">280+ Students Taught</span>
          </div>
        </div>
      </div>

      {/* Teacher 4: Uma Ma'am */}
      <div className="rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="p-6">
          <div className="w-32 h-42 mx-auto overflow-hidden border-4 border-white shadow-lg mb-6">
            <Image 
              src="/Image/umaMam.png"
              alt="Uma Ma'am - History Teacher"
              width={128}
              height={128}
              className=" object-cover"
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Uma Ma'am</h3>
            <p className="text-[#214B7D] font-semibold mb-2">History & Culture</p>
            
            <div className="inline-block bg-gradient-to-r from-[#214B7D] to-[#5C6417] text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
              8+ Years Experience
            </div>
            
            <p className="text-gray-600 text-sm mb-4">Rajasthan Culture & History</p>
            
            <div className="flex justify-center space-x-2">
              {[1,2,3,4,5].map((star) => (
                <FaStar key={star} className="text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#214B7D]/10 to-[#5C6417]/10 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-center text-sm">
            <FaUsers className="text-[#214B7D] mr-2" />
            <span className="text-gray-700">250+ Students Taught</span>
          </div>
        </div>
      </div>
    </div>
    
    {/* Teaching Methodology Section (same as before) */}
       {/* Teaching Methodology */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#204972] mb-3">Our Teaching Methodology</h3>
              <p className="text-gray-600">A structured approach to ensure comprehensive learning</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Concept Building", desc: "Strong foundation of basic concepts" },
                { step: "02", title: "Practice Sessions", desc: "Regular problem-solving practice" },
                { step: "03", title: "Doubt Clearing", desc: "Personalized doubt resolution" },
                { step: "04", title: "Revision & Tests", desc: "Systematic revision and assessments" }
              ].map((method, idx) => (
                <div key={idx} className="text-center p-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#214B7D] to-[#5C6417] text-white font-bold text-lg mb-4">
                    {method.step}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{method.title}</h4>
                  <p className="text-sm text-gray-600">{method.desc}</p>
                </div>
              ))}
            </div>
          </div>
  </div>
</section>

      {/* Enhanced CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0F437B] via-[#214B7D] to-[#13773E] text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Begin Your Success Journey Today</h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of successful students who have achieved their academic goals with PV Classes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact-us" 
                className="bg-white text-[#204972] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
              >
                Contact for Admission
              </Link>
              <Link 
                href="/courses" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center"
              >
                View Our Courses
              </Link>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Free Demo Class", value: "Available" },
                  { label: "Study Material", value: "Provided" },
                  { label: "Batch Size", value: "Limited" },
                  { label: "Success Guarantee", value: "95%" }
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold mb-1">{item.value}</div>
                    <div className="text-sm opacity-80">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}