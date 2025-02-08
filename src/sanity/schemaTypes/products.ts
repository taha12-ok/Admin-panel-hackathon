import { defineField, defineType } from "sanity";

export interface Product {
  [x: string]: unknown;
  id: string;
  createdAt: string;
  updatedAt: string;
  rev: string;
  type: "product";
  title: string;
  description?: string;
  price: number;
  image: {
    type: "image";
    asset: {
      ref: string;
      type: "reference";
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
  badge?: string;
  inventory: number;
  priceWithoutDiscount?: number;
  tags?: string[];
  category?: { _type: "reference"; _ref: string };
}

export const productSchema = defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "priceWithoutDiscount",
      title: "Price Without Discount",
      type: "number",
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "description",
      title: "Product Description",
      type: "text",
    }),
    defineField({
      name: "inventory",
      title: "Inventory Management",
      type: "number",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Featured", value: "featured" },
          { 
            title: "Follow products and discounts on Instagram", 
            value: "instagram" 
          },
          { title: "Gallery", value: "gallery" },
        ],
      },
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      options: { dateFormat: "YYYY-MM-DD" },
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      options: { dateFormat: "YYYY-MM-DD" },
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
});
 