// src/schemas/invoiceItemSchemas.ts
import { z } from 'zod';

export const createInvoiceItemSchema = z.object({
  invoiceId: z
    .string()
    .uuid({ message: 'invoiceId must be a valid UUID' }),
  description: z
    .string()
    .nonempty({ message: 'description is required' }),
  quantity: z
    .number()
    .int({ message: 'quantity must be an integer' })
    .positive({ message: 'quantity must be greater than zero' }),
  price: z
    .number()
    .positive({ message: 'price must be greater than zero' }),
});

export const updateInvoiceItemSchema = createInvoiceItemSchema.partial();
