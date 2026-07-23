import { createBrowserRouter, Navigate } from 'react-router-dom'

import PublicLayout from '@/layouts/PublicLayout/PublicLayout'

import HomePage from '@/features/public/home/HomePage'
import ProductsPage from '@/features/public/products/ProductsPage'
import ProductDetailsPage from '@/features/public/product-details/ProductDetailsPage'
import ContactPage from '@/features/public/contact/ContactPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:id', element: <ProductDetailsPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <Navigate to='/' replace /> },
    ],
  },
])

