/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ProductForm from '@/components/seller/ProductForm';

export default function AddProductPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
        <ProductForm />
      </section>
    </main>
  );
}
