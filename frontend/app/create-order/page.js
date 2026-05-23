"use client";

import { useSearchParams } from "next/navigation";

import CreateOrderForm from "@/components/orders/CreateOrderForm";
import StoreSwitcher from "@/components/orders/StoreSwitcher";

const CreateOrderPage = () => {
    const searchParams = useSearchParams();

    const storeId =
        searchParams.get("storeId") || "store-1";

    return (
        <div className="space-y-6">
            {/* Header */}

            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Create Order
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Create realtime orders for your stores.
                </p>
            </div>

            {/* Store Switcher */}

            <StoreSwitcher />

            {/* Active Store */}

            <div className=" rounded-2xl border border-gray-200 bg-white p-4 ">
                <p className="text-sm text-gray-500">
                    Active Store
                </p>

                <h2 className="mt-1 text-lg font-semibold text-gray-900">
                    {storeId}
                </h2>
            </div>

            {/* Create Order Form */}

            <CreateOrderForm />
        </div>
    );
};

export default CreateOrderPage;