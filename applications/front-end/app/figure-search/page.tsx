import 'reset.css'
import '@boilerplate/front-end/app/reset.scss'
import { Benefits } from '@boilerplate/front-end/components/benefits-container'
import { Product } from '@boilerplate/front-end/components/product'

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => <>
  <Benefits></Benefits><Product></Product>
</>

export default HomePage
