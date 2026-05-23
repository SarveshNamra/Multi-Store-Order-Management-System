"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    {
        name: "Dashboard",
        href: "/dashboard",
    },
    {
        name: "Orders",
        href: "/orders?storeId=store-1",
    },
    {
        name: "Create Order",
        href: "/create-order?storeId=store-1",
    },
    {
        name: "Analytics",
        href: "/analytics",
    },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-gray-200 bg-white px-8 py-10 md:flex">
            {/* Logo */}

            <div className="mb-14">
                <h1 className="text-2xl font-extrabold text-gray-900">
                    MultiStore
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Order Management
                </p>
            </div>

            {/* Navigation */}

            <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? "bg-black text-white shadow-md"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            {link.name}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;