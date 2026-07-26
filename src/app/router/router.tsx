import { createBrowserRouter, Navigate } from 'react-router-dom'

import PublicLayout from '@/layouts/PublicLayout/PublicLayout'
import AdminLayout from '@/layouts/AdminLayout/AdminLayout'

import HomePage from '@/features/public/home/HomePage'
import ProductsPage from '@/features/public/products/ProductsPage'
import ProductDetailsPage from '@/features/public/product-details/ProductDetailsPage'
import ContactPage from '@/features/public/contact/ContactPage'
import LoginPage from '@/features/admin/login/LoginPage'
import DashboardPage from '@/features/admin/dashboard/DashboardPage'
import AdminProductsPage from '@/features/admin/products/ProductsPage'
import AddProductPage from '@/features/admin/products/AddProductPage'
import InquiriesPage from '@/features/admin/inquiries/InquiriesPage'
import SettingsPage from '@/features/admin/settings/SettingsPage'

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
  {
    path: 'admin/login',
    element: <LoginPage />,
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to='/admin/dashboard' replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'products', element: <AdminProductsPage /> },
      { path: 'products/add', element: <AddProductPage /> },
      { path: 'products/edit/:id', element: <AddProductPage /> },
      { path: 'inquiries', element: <InquiriesPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])

