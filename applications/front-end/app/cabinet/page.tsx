/* eslint-disable import/no-default-export */

'use client'

import 'reset.css'
import '@boilerplate/front-end/app/reset.scss'
import { Cabinet } from '@boilerplate/front-end/components/cabinet'

export interface CabinetPageProps {}

const CabinetPage: React.FC<CabinetPageProps> = () => <Cabinet></Cabinet>

export default CabinetPage