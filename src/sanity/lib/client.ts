import { createClient } from "next-sanity"
import type { Product } from "../schemaTypes/products"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
})

export async function getProducts() {
  return client.fetch<Product[]>(`*[_type == "product"]{
    _id,
    title,
    slug,
    price,
    inventory,
    "imageUrl": image.asset->url,
    category->{
      _id,
      title
    }
  }`)
}

export async function getCategories() {
  return client.fetch(`*[_type == "category"]{
    _id,
    title,
    slug,
    "imageUrl": image.asset->url
  }`)
}

export async function getOrders() {
  return client.fetch(`*[_type == "order"] | order(createdAt desc){
    _id,
    orderId,
    customer,
    total,
    status,
    createdAt
  }`)
}

interface ProductImage {
  asset: {
    ref: string;
  };
}

interface ProductInput extends Omit<Product, "_id" | "_createdAt" | "_updatedAt" | "_rev" | "_type"> {
  image: ProductImage;
}

export async function createProduct(product: ProductInput) {
  try {
    const result = await client.create({
      _type: "product",
      ...product,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: product.image.asset.ref,
        },
      },
    })
    console.log("Product created successfully:", result)
    return result
  } catch (error) {
    console.error("Failed to create product:", error)
    throw error
  }
}

export async function updateProduct(product: Product) {
  return client.patch(product._id as unknown as string).set(product).commit()
}

export async function deleteProduct(id: string) {
  return client.delete(id)
}