import { defineField, defineType } from "sanity"

export const categorySchema = defineType({
  name: "category",
  title: "Categories",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "products",
      title: "Number of Products",
      type: "number",
    }),
  ],
});