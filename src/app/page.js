import Testimonials from "../components/Testimonials";
import Banner from "../components/Banner";
import Rajexam from "../components/Books-sections/Rajexam"
import CourseEnroll from "../components/CourseEnroll";
import CoursesSection from "../components/CourseSelection";
import BannerImg2 from "../components/bannerimg2";
import CurrentAffairs from "../components/CurrentAffairs";
import FacultySlider from "../components/FacultySlider";
import CTA from "../components/CTA";
import TestSeriesHome from "../components/TestSeriesHome";
import HomeCoursesSection from "../components/HomeCoursesSection";
import PyqSlider from "../components/PyqSlider";

import LearningResources from "../components/LearningResources";
import TrustedPlatform from "../components/TrustedPlatform";
import ExamCategory from "../components/ExamCategory";
import FAQ from "../components/FAQs";


export default function Home() {
  return (
    <>

      <Banner />

      <CoursesSection />
      <CourseEnroll />
      <Rajexam />
      <LearningResources />
      <FacultySlider />
      <TestSeriesHome />

      <CurrentAffairs />
      <HomeCoursesSection />
      {/* <BannerImg2 /> */}
      <CTA />
      <PyqSlider />
      <ExamCategory />
      {/* <TrustedPlatform /> */}
      <FAQ />
      <Testimonials />

    </>
  );
}
