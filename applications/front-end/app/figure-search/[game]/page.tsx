/* eslint-disable import/no-default-export */

import { Benefits } from '@boilerplate/front-end/components/benefits-container'
import { ProductsList } from '@boilerplate/front-end/components/products-list'

import 'reset.css'
import '@boilerplate/front-end/app/reset.scss'

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => (
  <>
    <Benefits></Benefits>
    <ProductsList></ProductsList>
  </>
)

export default HomePage
