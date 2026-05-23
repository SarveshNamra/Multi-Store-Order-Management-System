"use client";

import { useState } from "react";
import { createOrder } from "@/services/order.service";

const CreateOrderForm = () => {

    // Form Data
    const [formData, setFormData] = useState({
        storeId: "",
        itemId: "",
        quantity: 1,
        theTotalAmount: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Handle Input Changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Reset Form
    const resetForm = () => {
        setFormData({
            storeId: "",
            itemId: "",
            quantity: 1,
            theTotalAmount: "",
        });
    };

    // Handle Form Submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);

            setError("");

            setSuccess("");

            const payload = {
                storeId: formData.storeId,

                items: [
                    {
                        itemId: formData.itemId,
                        quantity: Number(formData.quantity),
                    },
                ],

                theTotalAmount: Number(
                    formData.theTotalAmount,
                ),
            };

            const response = await createOrder(payload);

            setSuccess(response.message || "Order created successfully");

            resetForm();
        }
        catch (error) {
            setError(
                error.message || "Failed to create order",
            );
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Header */}

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Create Order
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Add a new order for your store.
                </p>
            </div>

            {/* Error Message */}

            {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Success Message */}

            {success && (
                <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                    {success}
                </div>
            )}

            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                {/* Store ID */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Store ID
                    </label>

                    <input type="text" name="storeId" value={formData.storeId} onChange={handleChange} placeholder="Enter store ID"
                        required
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                    />
                </div>

                {/* Item ID */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Item ID
                    </label>

                    <input type="text" name="itemId" value={formData.itemId} onChange={handleChange} placeholder="Enter item ID"
                        required
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                    />
                </div>

                {/* Quantity */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Quantity
                    </label>

                    <input type="number" name="quantity" min="1" value={formData.quantity} onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                    />
                </div>

                {/* Total Amount */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Total Amount
                    </label>

                    <input type="number" name="theTotalAmount" min="1" value={ formData.theTotalAmount } onChange={handleChange} placeholder="Enter total amount"
                        required
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                    />
                </div>

                {/* Submit Button */}

                <button type="submit" disabled={loading}
                    className="flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Creating Order..." : "Create Order"}
                </button>
            </form>
        </div>
    );
};

export default CreateOrderForm;