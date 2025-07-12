'use client';

import React from 'react';

export default function AddProductPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Add Product</h1>
      <form>
        <div className="mb-4">
          <label className="block mb-1">Product Name</label>
          <input type="text" className="border px-3 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Price</label>
          <input type="number" className="border px-3 py-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
