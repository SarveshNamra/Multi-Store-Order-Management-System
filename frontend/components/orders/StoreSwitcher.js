"use client";

import { useRouter, useSearchParams } from "next/navigation";

const stores = [
    "store-1",
    "store-2",
    "store-3",
    "store-4",
    "store-5",
    "store-6",
    "store-7",
    "store-8",
    "store-9",
    "store-10",
];

const StoreSwitcher = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentStore = searchParams.get("storeId") || "store-1";

    // Handle Store Change
    const handleStoreChange = (event) => {
        const selectedStore = event.target.value;

        const params = new URLSearchParams(
            searchParams.toString(),
        );

        params.set("storeId", selectedStore);

        router.push(`/orders?${params.toString()}`);
    };

    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            {/* Left Content */}

            <div>
                <h2 className="text-2xl font-semibold text-orange-900">
                    Store Selection
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Switch between stores to view
                    realtime orders.
                </p>
            </div>

            {/* Store Dropdown */}

            <div className="w-full sm:w-64">
                <select value={currentStore} onChange={handleStoreChange} className="w-full rounded-xl border border-gray-300 
                bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-black">
                    {stores.map((store) => (
                        <option key={store} value={store}>
                            {store}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default StoreSwitcher;