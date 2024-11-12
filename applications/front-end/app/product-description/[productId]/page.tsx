'use client'

import 'reset.css'
import '@boilerplate/front-end/app/reset.scss'

import { ProductDescription } from '@boilerplate/front-end/components/product-description'
import { useParams } from 'next/navigation'

export interface ProductDescProps { }

const ProductDescPage: React.FC<ProductDescProps> = () => {
  const { productId } = useParams<{ productId: string }>()
  const validProductId = String(productId)

  return (
    <ProductDescription productId={validProductId}></ProductDescription>
  )
}

export default ProductDescPage
