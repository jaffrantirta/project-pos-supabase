"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const products: Product[] = [
  { id: 1, name: "Corner Desk Left Sit", price: 97.75, image: "/desk1.jpg" },
  { id: 2, name: "Corner Desk Right Sit", price: 169.05, image: "/desk2.jpg" },
  { id: 3, name: "Customizable Desk", price: 920.46, image: "/desk3.jpg" },
  { id: 4, name: "Large Desk", price: 2068.85, image: "/desk4.jpg" },
];

export default function CashierPage() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex h-screen">
      {/* Left - Cart */}
      <div className="w-1/3 bg-white border-r p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Cart</h2>
        <div className="flex-1 overflow-y-auto">
          {cart.map((item, idx) => (
            <div key={idx} className="flex justify-between border-b py-2">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button className="w-full mt-4">Payment</Button>
        </div>
      </div>

      {/* Right - Product List */}
      <div className="w-2/3 p-4 bg-gray-50">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Products</h2>
          <Input placeholder="Search product..." className="w-64" />
        </div>
        <div className="grid grid-cols-3 gap-4 overflow-y-auto h-[calc(100vh-100px)]">
          {products.map((product) => (
            <Card
              key={product.id}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => addToCart(product)}
            >
              <CardContent className="p-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-md"
                />
                <div className="mt-2 font-medium">{product.name}</div>
                <div className="text-sm text-gray-600">
                  ${product.price.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
