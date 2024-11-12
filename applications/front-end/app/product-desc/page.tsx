import 'reset.css'
import '@boilerplate/front-end/app/reset.scss'

import { ProductDescription } from '@boilerplate/front-end/components/product-description'

export interface ProductDescProps {}

const ProductDescPage: React.FC<ProductDescProps> = () => <>
  <ProductDescription></ProductDescription>
</>

export default ProductDescPage
