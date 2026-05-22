import { z } from "zod";

export const orderItemValidation = z.object({
    itemId: z.string().min(1, "Product ID is required !"),
    quantity: z.number().int("Quantity must be an integer").positive("Quantity must be a positive number"),
});

export const orderStatusEnum = z.enum([
    "PLACED", "PREPARING", "COMPLETED"
]);

export const createOrderSchema = z.object({
    storeId: z.string().min(1, "Store ID is required !"),
    items: z.array(orderItemValidation).min(1, "At least one order item is required !"),
    theTotalAmount: z.number().positive("Total amount must be a positive number"),
    status: orderStatusEnum.optional(),
});

export const updateOrderStatusSchema = z.object({
    status: orderStatusEnum,
});