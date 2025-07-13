"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type ProductFormInputs = {
  title: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  image: FileList;
};

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ProductFormInputs>();

  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data: ProductFormInputs) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("seller_id", "1");
    formData.append("title", data.title);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);

    try {
      const res = await fetch("/api/products/add", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.status === "success") {
        alert("Product added successfully!");
        reset();
      } else {
        alert("Failed to add product.");
      }
    } catch (err) {
      alert("Error uploading product.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Product Title</label>
        <input
          {...register("title", { required: true })}
          className="w-full bg-gray-100 text-gray-900 border border-gray-300 px-3 py-2 rounded-md"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">Required</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Price (ZAR)</label>
        <input
          type="number"
          step="0.01"
          {...register("price", { required: true, min: 1 })}
          className="w-full bg-gray-100 text-gray-900 border border-gray-300 px-3 py-2 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Stock Quantity</label>
        <input
          type="number"
          {...register("stock", { required: true })}
          className="w-full bg-gray-100 text-gray-900 border border-gray-300 px-3 py-2 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Category</label>
        <select
          {...register("category", { required: true })}
          className="w-full bg-gray-100 text-gray-900 border border-gray-300 px-3 py-2 rounded-md"
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="beauty">Beauty</option>
          <option value="groceries">Groceries</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Description</label>
        <textarea
          {...register("description", { required: true })}
          className="w-full bg-gray-100 text-gray-900 border border-gray-300 px-3 py-2 rounded-md"
          rows={3}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Product Image</label>

        <label
          htmlFor="imageUpload"
          className="block w-full px-4 py-3 text-center text-gray-700 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
        >
          {watch("image")?.[0]?.name || "Click to upload image"}
        </label>

        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          {...register("image", { required: true })}
          className="hidden"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Add Product"}
      </button>
    </form>
  );
}
