import Testimonials from "../components/Testimonials";
import Banner from "../components/Banner";
import Rajexam from "../components/Books-sections/Rajexam"
import CourseEnroll from "../components/CourseEnroll";
import CoursesSection from "../components/CourseSelection";
import BannerImg2 from "../components/bannerimg2";
import CurrentAffairs from "../components/CurrentAffairs";
import FacultySlider from "../components/FacultySlider";
import CTA from "../components/CTA";


export default function Home() {
  return (
    <>

<Banner />
      <CoursesSection />
      <CourseEnroll />
<div className="container md:px-14 px-1">
   <Rajexam />
</div>
      <FacultySlider/>
      <CurrentAffairs />
     <div className="container px-4 md:px-0">
       <BannerImg2 />
     </div>
      <CTA />
      <Testimonials />

    </>
  );
}
