'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    company_name: '',
    registration_no: '',
    contact_person: '',
    contact_phone: '',
    website: '',
    address: '',
    product_categories: [] as string[],
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setFormData((prev) => ({ ...prev, product_categories: selected }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/api/sellers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error registering');

      setMessage(`✅ Registered: ${data.seller.company_name}`);
      setTimeout(() => router.push('https://universalapex.co.za/'), 2000);
    } catch (err) {
      if (err instanceof Error) {
        setMessage(`❌ ${err.message}`);
      } else {
        setMessage('❌ Unknown error occurred');
      }
    }
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sell on universalapex.co.za</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="company_name"
          onChange={handleChange}
          placeholder="Company Name *"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="registration_no"
          onChange={handleChange}
          placeholder="Company Registration No. (optional)"
          className="w-full p-2 border rounded"
        />

        <input
          name="contact_person"
          onChange={handleChange}
          placeholder="Contact Person *"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="contact_phone"
          onChange={handleChange}
          placeholder="Contact Phone *"
          className="w-full p-2 border rounded"
          required
          pattern="^\+?\d{10,13}$"
          title="Enter a valid phone number"
        />

        <input
          name="website"
          onChange={handleChange}
          placeholder="Company Website (optional)"
          className="w-full p-2 border rounded"
        />

        <textarea
          name="address"
          onChange={handleChange}
          placeholder="Company Address *"
          className="w-full p-2 border rounded"
          required
        />

        <label className="block font-medium">Product Categories *</label>
        <select
          multiple
          name="product_categories"
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded h-32"
          required
        >
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Homeware">Homeware</option>
          <option value="Groceries">Groceries</option>
          <option value="Health & Beauty">Health & Beauty</option>
          <option value="Automotive">Automotive</option>
        </select>

        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Login Email *"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password *"
          className="w-full p-2 border rounded"
          required
        />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Submit Registration
        </button>
      </form>

      {message && <p className="mt-4 text-center font-medium">{message}</p>}
    </main>
  );
}
