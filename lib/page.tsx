// File: src/app/seller/dashboard/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Seller {
  company_name: string;
  contact_person: string;
  email: string;
}

export default function SellerDashboard() {
  const [seller, setSeller] = useState<Seller | null>(null);

  useEffect(() => {
    // TODO: Replace with real auth/session check later
    const mockSeller: Seller = {
      company_name: 'Joelines Enterprise',
      contact_person: 'Joeline',
      email: 'aboobakerjoeline@gmail.com',
    };
    setSeller(mockSeller);
  }, []);

  if (!seller) return <p className="p-4">Loading dashboard...</p>;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Seller Dashboard</h1>
        <nav className="space-x-4">
          <Link href="/seller/dashboard" className="text-blue-600">Dashboard</Link>
          <Link href="/seller/products/add" className="text-blue-600">Add Product</Link>
          <Link href="/seller/orders" className="text-blue-600">Orders</Link>
        </nav>
      </header>

      <section className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {seller.contact_person} 👋</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded shadow bg-white">
            <h3 className="font-semibold text-lg">Company</h3>
            <p className="text-sm text-gray-700">{seller.company_name}</p>
          </div>
          <div className="p-4 border rounded shadow bg-white">
            <h3 className="font-semibold text-lg">Email</h3>
            <p className="text-sm text-gray-700">{seller.email}</p>
          </div>
          <div className="p-4 border rounded shadow bg-white">
            <h3 className="font-semibold text-lg">Status</h3>
            <p className="text-sm text-yellow-600">Application under review</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Next Steps</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Wait for approval (5–7 business days)</li>
            <li>You’ll receive an email once your store is activated</li>
            <li>Start uploading your products</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
