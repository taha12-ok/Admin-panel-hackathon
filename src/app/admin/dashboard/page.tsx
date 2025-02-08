"use client"

import { useEffect, useState } from "react"
import { FiBox, FiShoppingCart, FiDollarSign, FiUsers } from "react-icons/fi"
import { getProducts, getOrders } from "../../../sanity/lib/client"
import type { Product } from "../../../sanity/schemaTypes/products"
import Link from "next/link"

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [recentOrders, setRecentOrders] = useState<{ _id: string; orderId: string; customer: { name: string }; total: number; status: string }[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProducts = await getProducts()
        const fetchedOrders = await getOrders()
        setProducts(fetchedProducts)
        setRecentOrders(fetchedOrders.slice(0, 5))
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const stats = [
    { label: "Total Products", value: 12, icon: FiBox },
    { label: "Total Orders", value: 150, icon: FiShoppingCart },
    { label: "Total Revenue", value: "$15,000", icon: FiDollarSign },
    { label: "Total Customers", value: 1200, icon: FiUsers },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00B4B4]"></div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 relative overflow-hidden group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className="rounded-xl bg-[#00B4B4] bg-opacity-10 p-3 group-hover:bg-opacity-20 transition-all duration-300">
                <stat.icon className="w-6 h-6 text-[#00B4B4]" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00B4B4] bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent Products</h3>
            <Link 
              href="/admin/products" 
              className="text-sm text-[#00B4B4] hover:text-[#009999] font-medium hover:underline"
            >
              View All Products
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500">
                  <th className="pb-4">Product Name</th>
                  <th className="pb-4">Price</th>
                  <th className="pb-4">Inventory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
              {products.slice(0, 5).map((product: Product) => (
                  <tr key={String(product._id)} className="text-sm">
                    <td className="py-4">
                      <Link 
                        href={`/admin/products/${product._id}`}
                        className="font-medium text-gray-900 hover:text-[#00B4B4] transition-colors"
                      >
                        {product.title}
                      </Link>
                    </td>
                    <td className="py-4 text-gray-600">${product.price}</td>
                    <td className="py-4 text-gray-600">{product.inventory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
            <Link 
              href="/admin/orders" 
              className="text-sm text-[#00B4B4] hover:text-[#009999] font-medium hover:underline"
            >
              View All Orders
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500">
                  <th className="pb-4">Order ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Total</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="text-sm">
                    <td className="py-4">
                      <Link 
                        href={`/admin/orders/${order._id}`}
                        className="font-medium text-gray-900 hover:text-[#00B4B4] transition-colors"
                      >
                        {order.orderId}
                      </Link>
                    </td>
                    <td className="py-4 text-gray-600">{order.customer.name}</td>
                    <td className="py-4 text-gray-600">${order.total}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${order.status.toLowerCase() === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}