import { defineField, defineType } from "sanity"

export default defineType({
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    defineField({
      name: "orderId",
      title: "Order ID",
      type: "string",
    }),
    defineField({
      name: "customer",
      title: "Customer",
      type: "object",
      fields: [
        { name: "name", type: "string", title: "Name" },
        { name: "email", type: "string", title: "Email" },
        { name: "phone", type: "string", title: "Phone" },
        { name: "address", type: "string", title: "Address" },
        { name: "city", type: "string", title: "City" },
        { name: "country", type: "string", title: "Country" },
        { name: "postalCode", type: "string", title: "Postal Code" },
        { name: "paymentMethod", type: "string", title: "Payment Method" },
      ],
    }),
    defineField({
      name: "items",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "productId", type: "string", title: "Product ID" },
            { name: "title", type: "string", title: "Product Title" },
            { name: "quantity", type: "number", title: "Quantity" },
            { name: "price", type: "number", title: "Price" },
          ],
        },
      ],
    }),
    defineField({
      name: "total",
      title: "Total Amount",
      type: "number",
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    }),
  ],
})