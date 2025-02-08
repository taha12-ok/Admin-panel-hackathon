"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FiSearch } from "react-icons/fi"
import { getProducts } from "@/sanity/lib/client"
import type { Product } from "../../../sanity/schemaTypes/products"

export default function ModernProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    } else {
      loadProducts()
    }
  }, [router])

  async function loadProducts() {
    const fetchedProducts = await getProducts()
    setProducts(fetchedProducts)
    setFilteredProducts(fetchedProducts)
    setIsLoading(false)
  }

  useEffect(() => {
    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setFilteredProducts(filtered)
  }, [searchTerm, products])

  function urlFor(image: { type: "image"; asset: { ref: string; type: "reference" }; hotspot?: { x: number; y: number; height: number; width: number } }): string {
    return image?.asset?.ref ? `/images/${image.asset.ref}` : "";
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <h1 className="text-4xl font-extrabold text-gray-800">Product Catalog</h1>
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-[#00B4B4]/30 rounded-full focus:ring-2 focus:ring-[#00B4B4]/50 transition-all"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00B4B4] opacity-70" />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product._id as string} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <div className="relative h-56 w-full">
                  <Image 
                    src={typeof product.imageUrl === 'string' ? product.imageUrl : (product.image?.asset?.ref ? urlFor(product.image) : "/placeholder.jpg")}
                    alt={product.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-xl text-gray-900 mb-2 truncate">{product.title}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold text-[#00B4B4]">${product.price}</span>
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      Stock: {product.inventory}
                    </span>
                  </div>
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.tags.map((tag: string, index: number) => (
  <span 
    key={index} 
    className="bg-[#00B4B4]/10 text-[#00B4B4] text-xs px-2 py-1 rounded-full"
  >
    {tag}
  </span>
))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}