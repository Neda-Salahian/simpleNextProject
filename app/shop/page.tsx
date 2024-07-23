'use client' // This ensures the component is rendered on the client-side

import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
}

function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  // Fetch products on the client-side
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:4000/products', {
          cache: 'no-cache', // Ensure fresh data
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  // Add product handler on the client-side
  const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProduct = {
      title,
      price: parseFloat(price),
    };

    try {
      const response = await fetch('http://localhost:4000/products', {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      // Optimistically update the product list
      setProducts((prevProducts) => [...prevProducts, { id: Date.now(), ...newProduct }]);

      // Clear form inputs
      setTitle('');
      setPrice('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col gap-5 max-w-xl bg-slate-800 rounded-md p-5 mx-auto"
        onSubmit={addProduct}
      >
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 bg-slate-700 rounded-md outline-none"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 bg-slate-700 rounded-md outline-none"
          required
        />
        <button className="p-2 bg-slate-900" type="submit">
          Add Product
        </button>
      </form>
      <div className="flex flex-wrap gap-5 max-w-xl justify-center rounded-md p-5 mx-auto">
        {products.map((product) => (
          <div key={product.id} className="p-5 bg-slate-700 rounded-md text-center">
            <p>{product.title}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
