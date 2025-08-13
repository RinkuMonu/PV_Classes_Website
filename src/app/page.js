import Testimonials from "../components/Testimonials";
import Banner from "../components/Banner";
import Rajexam from "../components/Books-sections/Rajexam"
import CourseEnroll from "../components/CourseEnroll";
import CoursesSection from "../components/CourseSelection";
import BannerImg2 from "../components/bannerimg2";
import CurrentAffairs from "../components/CurrentAffairs";
import FacultySlider from "../components/FacultySlider";


export default function Home() {
  return (
    <>

<Banner />
      <CourseEnroll />
      <CoursesSection />
      <BannerImg2 />
      <Rajexam />
<FacultySlider/>
      <CurrentAffairs />
 <Testimonials />

    </>
  );
}
