/* eslint-disable import/no-default-export */
'use client'

import { useParams } from 'next/navigation'

import { WithProfile } from '@boilerplate/dashboard/store/with-profile'

import { UpdateProductForm } from '@boilerplate/dashboard/components/forms/update-product.form'

interface DashboardUpdateProductPageProps {}

export const DashboardUpdateProductPage: React.FC<DashboardUpdateProductPageProps> = () => {
  const { productId } = useParams<{ productId: string }>()
  const validProductId = String(productId)

  return (
    <WithProfile>
      <UpdateProductForm productId={validProductId} />
    </WithProfile>
  )
}

export default DashboardUpdateProductPage
