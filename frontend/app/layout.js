import "./globals.css";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
    title: "Multi-Store Dashboard",
    description: "Modern SaaS Order Management System",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-50 text-gray-900">
                <div className="flex min-h-screen">
                    {/* Sidebar */}

                    <Sidebar />

                    {/* Main Content */}

                    <div className="flex flex-1 flex-col md:ml-64">
                        {/* Navbar */}

                        <Navbar />

                        {/* Page Content */}

                        <main className="flex-1 p-4 md:p-8">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}