import { type SchemaTypeDefinition } from "sanity";
import { productSchema } from "./products";
import { categorySchema } from "./categories";
import orderSchema from "./order";

export const schemaTypes: SchemaTypeDefinition[] = [
  productSchema, 
  categorySchema, 
  orderSchema
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, categorySchema, orderSchema],
};