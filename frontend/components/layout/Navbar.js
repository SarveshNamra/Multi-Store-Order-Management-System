"use client";

const Navbar = () => {
    return (
        <header className="sticky top-4 z-30 mx-4 flex h-24 items-center justify-between rounded-3xl border border-gray-200 bg-white/90 px-6 shadow-sm backdrop-blur-md md:mx-6 md:px-10">
            {/* Left Section */}

            <div>
                <h2 className="text-4xl font-bold text-green-900">
                    TMBill
                </h2>

                <p className="mt-1 text-2xl text-gray-500">
                    Manage your stores and orders
                </p>
            </div>

            {/* Right Section */}

            <div className="flex items-center gap-8 ">
                {/* Notification */}

                <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-lg text-gray-600 transition hover:bg-gray-100">
                    🔔
                </button>

                {/* User Profile */}

                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-base font-semibold text-white">
                        A
                    </div>

                    <div className="hidden sm:block">
                        <p className="text-base font-semibold text-gray-900">
                            Admin
                        </p>

                        <p className="text-sm text-gray-500">
                            admin@store.com
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;