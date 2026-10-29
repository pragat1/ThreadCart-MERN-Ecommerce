import mongoose from "mongoose";
import dotenv from "dotenv";
import productModel from "./models/productModel.js";
import dns from 'dns'
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const seedProducts = [
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight cotton top with a round neckline and short sleeves, perfect for casual everyday wear.",
    price: 100,
    image: [
      "https://images.unsplash.com/photo-1638740974954-0b8368aa524d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    date: Date.now(),
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "Comfortable pure cotton T-shirt with round neck design, ideal for daily wear.",
    price: 200,
    image: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    bestseller: true,
    date: Date.now(),
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "Soft cotton top designed for girls with breathable fabric and stylish look.",
    price: 220,
    image: [
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    bestseller: true,
    date: Date.now(),
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "Premium quality tapered fit trousers offering comfort and modern style.",
    price: 190,
    image: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7"
    ],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    date: Date.now(),
  },
  {
    name: "Women High Waist Denim Jeans",
    description:
      "Stylish high waist denim jeans with stretchable fabric for maximum comfort.",
    price: 250,
    image: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
    ],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    date: Date.now(),
  },
  {
    name: "Unisex Casual Hoodie",
    description:
      "Warm and comfortable hoodie suitable for both men and women.",
    price: 300,
    image: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7"
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    bestseller: false,
    date: Date.now(),
  },
];

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing products (optional)
    await productModel.deleteMany({});
    console.log("🗑️  Cleared existing products");

    // Insert new products
    const result = await productModel.insertMany(seedProducts);
    console.log(`✅ ${result.length} products seeded successfully!`);

    // Show inserted data
    const allProducts = await productModel.find({});
    console.log("\n📦 Products in Database:");
    console.table(allProducts.map(p => ({ name: p.name, price: p.price, category: p.category })));

    process.exit(0);
  } catch (error) {
    console.log("❌ Seeding Error:", error);
    process.exit(1);
  }
};

// Run seeder
seedDB();
