import 'reset.css'
import '@boilerplate/front-end/app/reset.scss'
import { AboutUs } from '@boilerplate/front-end/components/about-us-content'

export interface AboutUsPageProps {}

const AboutUsPage: React.FC<AboutUsPageProps> = () => <AboutUs></AboutUs>

export default AboutUsPage
