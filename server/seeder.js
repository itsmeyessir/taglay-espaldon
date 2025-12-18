const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env vars
dotenv.config();

// Load Models
const User = require('./src/models/User');
const Product = require('./src/models/Product');
const Order = require('./src/models/Order');

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------------------------------
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate a date biased towards recent times (exponential decay-ish)
const getWeightedRandomDate = (start, end) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date;
};

// -----------------------------------------------------------------------------
// DATA GENERATORS
// -----------------------------------------------------------------------------

const CATEGORIES = ['coffee', 'cacao', 'spices', 'fruits', 'vegetables', 'grains', 'textile', 'handicrafts'];

const PRODUCT_TEMPLATES = {
  coffee: {
    names: ['Arabica', 'Robusta', 'Liberica', 'Excelsa', 'House Blend', 'Espresso Roast', 'Breakfast Blend', 'Mountain Brew'],
    adjectives: ['Premium', 'Organic', 'Mountain Grown', 'Dark Roast', 'Medium Roast', 'Single Origin', 'Sun-Dried', 'Hand-Picked'],
    origins: ['Sagada', 'Benguet', 'Batangas', 'Kalinga', 'Bukidnon', 'Davao', 'Cavite'],
    units: ['kg', '500g pack', '250g pack'],
    basePrice: 400,
    images: [
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&auto=format&fit=crop&q=60", // Coffee beans close up
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=60", // Coffee beans bag
      "https://images.unsplash.com/photo-1559525839-4f342409c480?w=800&auto=format&fit=crop&q=60", // Coffee sack
      "https://images.unsplash.com/photo-1511537632536-b7a4896848a5?w=800&auto=format&fit=crop&q=60", // Roasted beans
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=60", // Coffee beans
      "https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=800&auto=format&fit=crop&q=60"  // Coffee beans
    ]
  },
  cacao: {
    names: ['Cacao Nibs', 'Tablea', 'Cacao Beans', 'Cocoa Powder', 'Dark Chocolate Mass', 'Cacao Butter'],
    adjectives: ['Pure', 'Fermented', 'Raw', 'Artisan', 'Heirloom', 'Davao Gold', 'Stone-Ground'],
    origins: ['Davao', 'Cebu', 'Bohol', 'South Cotabato', 'Batangas'],
    units: ['kg', 'pack', 'jar'],
    basePrice: 350,
    images: [
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&auto=format&fit=crop&q=60", // Cocoa powder
      "https://images.unsplash.com/photo-1548842564-9f2252973708?w=800&auto=format&fit=crop&q=60", // Chocolate
      "https://images.unsplash.com/photo-1614957122176-6c8a77d70428?w=800&auto=format&fit=crop&q=60", // Cacao beans
      "https://images.unsplash.com/photo-1589820296156-2454da1a9710?w=800&auto=format&fit=crop&q=60", // Cacao pod
      "https://images.unsplash.com/photo-1621939514649-28b12e816a85?w=800&auto=format&fit=crop&q=60"  // Cacao seeds
    ]
  },
  spices: {
    names: ['Black Pepper', 'Chili Powder', 'Turmeric', 'Ginger', 'Bay Leaves', 'Garlic Flakes', 'Chili Flakes', 'Annatto Seeds'],
    adjectives: ['Spicy', 'Aromatic', 'Dried', 'Ground', 'Whole', 'Wild', 'Native'],
    origins: ['Sulu', 'Bicol', 'Batangas', 'Quezon', 'Mindanao'],
    units: ['kg', '100g pack', 'bottle'],
    basePrice: 200,
    images: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=60", // Spices overhead
      "https://images.unsplash.com/photo-1588723207383-a9d2466e398d?w=800&auto=format&fit=crop&q=60", // Powder
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&auto=format&fit=crop&q=60", // Turmeric
      "https://images.unsplash.com/photo-1600626333392-56ccf661073b?w=800&auto=format&fit=crop&q=60", // Peppercorns
      "https://images.unsplash.com/photo-1621360841013-c768371e93cf?w=800&auto=format&fit=crop&q=60"  // Chili
    ]
  },
  fruits: {
    names: ['Mangoes', 'Bananas', 'Pineapple', 'Durian', 'Lanzones', 'Mangosteen', 'Pomelo', 'Papaya', 'Calamansi'],
    adjectives: ['Sweet', 'Fresh', 'Export Quality', 'Ripe', 'Green', 'Seasonal', 'Yellow'],
    origins: ['Guimaras', 'Davao', 'Bukidnon', 'Camiguin', 'Isabela', 'Cebu'],
    units: ['kg', 'crate', 'box'],
    basePrice: 120,
    images: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=60", // Mangoes
      "https://images.unsplash.com/photo-1587324024623-2868078044f5?w=800&auto=format&fit=crop&q=60", // Durian
      "https://images.unsplash.com/photo-1589536836935-430c3d99540c?w=800&auto=format&fit=crop&q=60", // Pineapple
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop&q=60", // Mangoes 2
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&auto=format&fit=crop&q=60", // Bananas
      "https://images.unsplash.com/photo-1596450523828-567406692233?w=800&auto=format&fit=crop&q=60", // Mangosteen
      "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&auto=format&fit=crop&q=60"  // Papaya
    ]
  },
  vegetables: {
    names: ['Carrots', 'Cabbage', 'Potatoes', 'Broccoli', 'Lettuce', 'Cauliflower', 'Eggplant', 'Tomatoes'],
    adjectives: ['Fresh', 'Organic', 'Crisp', 'Farm Fresh', 'Highland'],
    origins: ['Benguet', 'Mountain Province', 'Nueva Vizcaya', 'Tagaytay'],
    units: ['kg', 'sack'],
    basePrice: 80,
    images: [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=800&auto=format&fit=crop&q=60", // Cabbage
      "https://images.unsplash.com/photo-1518977676601-b53f82a6b696?w=800&auto=format&fit=crop&q=60", // Potatoes/Carrots
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop&q=60", // Carrots
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop&q=60", // Fresh Veggies
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&auto=format&fit=crop&q=60"  // Broccoli
    ]
  },
  grains: {
    names: ['Rice', 'Corn', 'Adlai', 'Mung Beans'],
    adjectives: ['Organic', 'Brown', 'Red', 'Black', 'White', 'Glutinous', 'Jasponica'],
    origins: ['Nueva Ecija', 'Isabela', 'Cotabato', 'Bukidnon'],
    units: ['kg', 'sack (25kg)', 'sack (50kg)'],
    basePrice: 50,
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=60", // Rice
      "https://images.unsplash.com/photo-1620054739506-6c9b3a3c9e91?w=800&auto=format&fit=crop&q=60", // Grains
      "https://images.unsplash.com/photo-1536304993881-ffc0216543bd?w=800&auto=format&fit=crop&q=60", // Rice field
      "https://images.unsplash.com/photo-1573485868688-69363364f9ec?w=800&auto=format&fit=crop&q=60", // Corn
      "https://images.unsplash.com/photo-1631209121750-a9f603c80917?w=800&auto=format&fit=crop&q=60", // Black Rice/Grains
      "https://images.unsplash.com/photo-1606757389270-67c4be6d2032?w=800&auto=format&fit=crop&q=60"  // Rice variety
    ]
  },
  textile: {
    names: ['Weave', 'Fabric', 'Cloth', 'Runner', 'Blanket', 'Scarf'],
    adjectives: ['Handwoven', 'Traditional', 'Inabel', 'Hablon', 'Yakan', 'Tnalak'],
    origins: ['Ilocos', 'Ifugao', 'Basilan', 'Iloilo', 'South Cotabato'],
    units: ['meter', 'piece', 'roll'],
    basePrice: 800,
    images: [
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&auto=format&fit=crop&q=60", // Textile
      "https://images.unsplash.com/photo-1528646061386-4c7b20468087?w=800&auto=format&fit=crop&q=60", // Fabric
      "https://images.unsplash.com/photo-1606293926075-69a00febf280?w=800&auto=format&fit=crop&q=60", // Woven
      "https://images.unsplash.com/photo-1596265371388-43edbaadab56?w=800&auto=format&fit=crop&q=60"  // Loom
    ]
  },
  handicrafts: {
    names: ['Basket', 'Mat', 'Hat', 'Bag', 'Fan', 'Tray', 'Planter'],
    adjectives: ['Woven', 'Rattan', 'Bamboo', 'Abaca', 'Native', 'Handmade'],
    origins: ['Bicol', 'Quezon', 'Palawan', 'Samar', 'Bohol'],
    units: ['piece', 'set'],
    basePrice: 300,
    images: [
      "https://images.unsplash.com/photo-1590422204558-450ee7b60706?w=800&auto=format&fit=crop&q=60", // Woven decor
      "https://images.unsplash.com/photo-1582046429267-3932b55f1f9a?w=800&auto=format&fit=crop&q=60", // Rattan
      "https://images.unsplash.com/photo-1594270410221-e6a33cbc35ab?w=800&auto=format&fit=crop&q=60", // Bag
      "https://images.unsplash.com/photo-1605642993888-29471375d7b8?w=800&auto=format&fit=crop&q=60"  // Mat texture
    ]
  }
};

const FARMER_PROFILES = [
  { name: "Juan dela Cruz", region: "Benguet", specialty: "coffee" },
  { name: "Roberto Magsaysay", region: "Davao", specialty: "cacao" },
  { name: "Ahmad Hassan", region: "Sulu", specialty: "spices" },
  { name: "Rosa Dulnuan", region: "Ifugao", specialty: "textile" },
  { name: "Carmen Lumad", region: "Guimaras", specialty: "fruits" },
  { name: "Elena Tagbanua", region: "Nueva Ecija", specialty: "grains" },
  { name: "Mateo Ibaloi", region: "Benguet", specialty: "vegetables" },
  { name: "Sitti Aminah", region: "Basilan", specialty: "textile" },
  { name: "Pedro Bukid", region: "Bukidnon", specialty: "coffee" },
  { name: "Maria Clara", region: "Iloilo", specialty: "handicrafts" }
];

const BUYER_PROFILES = [
  { name: "Maria Santos", org: "Maria's Cafe", role: "buyer" },
  { name: "Coffee Project Buyer", org: "Coffee Project", role: "buyer" },
  { name: "Hotel Manila Purchasing", org: "Grand Manila Hotel", role: "buyer" },
  { name: "Healthy Options", org: "Healthy Options Inc.", role: "buyer" },
  { name: "Chef Tony", org: "Antonio's Restaurant", role: "buyer" },
  { name: "Kultura Sourcing", org: "Kultura Filipino", role: "buyer" },
  { name: "Local Deli", org: "Neighbourhood Deli", role: "buyer" },
  { name: "Resort World F&B", org: "RW Manila", role: "buyer" }
];

// -----------------------------------------------------------------------------
// MAIN SEEDER
// -----------------------------------------------------------------------------
const importData = async () => {
  await connectDB();

  try {
    // 1. Wipe Everything
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('💥 Previous Data Destroyed...');

    // -------------------------------------------------------------------------
    // 2. Create Users
    // -------------------------------------------------------------------------
    const users = [];

    // Admin
    await User.create({
      name: 'Admin User',
      organizationName: 'Taglay HQ',
      email: 'admin@taglay.com',
      password: 'password123',
      role: 'admin',
      phone: '09000000000',
      address: { province: 'Metro Manila' }
    });
    console.log('🛡️ Created Admin');

    // Buyers
    const buyerDocs = [];
    for (const b of BUYER_PROFILES) {
      // Remove special chars like &, ', then replace spaces with dots
      const email = b.name.toLowerCase()
        .replace(/&/g, 'and') // Replace & with 'and' for readability
        .replace(/[^a-z0-9\s]/g, '') // Remove other special chars
        .replace(/\s+/g, '.') // Replace spaces with dots
        + '@taglay.com';
        
      const buyer = await User.create({
        name: b.name,
        organizationName: b.org,
        email: email,
        password: 'password123',
        role: 'buyer',
        phone: '09' + getRandomInt(100000000, 999999999),
        address: { 
          street: 'Sample St.', 
          city: ['Manila', 'Makati', 'Taguig', 'Quezon City', 'Cebu'][getRandomInt(0, 4)], 
          province: 'Metro Manila', 
          zip: '1000' 
        }
      });
      buyerDocs.push(buyer);
      users.push(buyer);
      console.log(`🛒 Created Buyer: ${b.name}`);
    }

    // Farmers
    const farmerDocs = [];
    for (const f of FARMER_PROFILES) {
      const email = f.name.toLowerCase().replace(/ /g, '.') + '@taglay.com';
      const farmer = await User.create({
        name: f.name,
        organizationName: `${f.name}'s Farm`,
        email: email,
        password: 'password123',
        role: 'farmer',
        phone: '09' + getRandomInt(100000000, 999999999),
        address: { province: f.region }
      });
      // Attach metadata for product generation
      farmer.specialty = f.specialty; 
      farmerDocs.push(farmer);
      users.push(farmer);
      console.log(`👨‍🌾 Created Farmer: ${f.name} (${f.specialty})`);
    }

    // -------------------------------------------------------------------------
    // 3. Generate Products (Aim for 100+)
    // -------------------------------------------------------------------------
    const createdProducts = [];
    
    // Each farmer creates 10-15 products
    for (const farmer of farmerDocs) {
      const numProducts = getRandomInt(10, 15);
      
      // They mostly produce their specialty, but also some others
      for (let i = 0; i < numProducts; i++) {
        let category = farmer.specialty;
        // 20% chance to produce something random else from list
        if (Math.random() > 0.8) {
          category = getRandomItem(CATEGORIES);
        }

        const template = PRODUCT_TEMPLATES[category];
        const name = `${getRandomItem(template.adjectives)} ${getRandomItem(template.names)}`;
        const origin = getRandomItem(template.origins);
        
        // Random price variation +/- 20%
        const price = Math.floor(template.basePrice * (0.8 + Math.random() * 0.4));
        
        const product = await Product.create({
          farmerId: farmer._id,
          title: name,
          description: `High quality ${name.toLowerCase()} sourced directly from ${origin}. Sustainably farmed and harvested by ${farmer.organizationName}.`,
          price: price,
          category: category,
          images: [{ url: getRandomItem(template.images) }],
          stock: getRandomInt(100, 5000),
          unit: getRandomItem(template.units)
        });
        createdProducts.push(product);
      }
    }
    console.log(`📦 Generated ${createdProducts.length} Products across ${farmerDocs.length} Farmers...`);

    // -------------------------------------------------------------------------
    // 4. Generate Massive Order History
    // -------------------------------------------------------------------------
    const ordersToCreate = [];
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);
    
    // Generate ~600 orders
    const TOTAL_ORDERS = 600;
    const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

    for (let i = 0; i < TOTAL_ORDERS; i++) {
      // Pick a random buyer
      const buyer = getRandomItem(buyerDocs);
      
      // Create a cart (1-6 items)
      const numItems = getRandomInt(1, 6);
      const items = [];
      let totalOrderPrice = 0;

      for (let j = 0; j < numItems; j++) {
        const product = getRandomItem(createdProducts);
        const qty = getRandomInt(5, 50); // Wholesale quantities
        
        items.push({
          productId: product._id,
          farmerId: product.farmerId,
          title: product.title,
          quantity: qty,
          price: product.price,
          image: product.images[0].url
        });
        totalOrderPrice += (product.price * qty);
      }

      // Determine Date & Status
      const orderDate = getWeightedRandomDate(sixMonthsAgo, now);
      const daysOld = (now - orderDate) / (1000 * 60 * 60 * 24);
      
      let status;
      // Logic: Older orders = delivered. Recent = pending/processing.
      if (daysOld > 14) {
        status = Math.random() > 0.05 ? 'delivered' : 'cancelled'; // 95% delivered
      } else if (daysOld > 5) {
        status = Math.random() > 0.3 ? 'delivered' : 'shipped';
      } else if (daysOld > 2) {
        status = 'confirmed';
      } else {
        status = Math.random() > 0.5 ? 'pending' : 'confirmed';
      }

      ordersToCreate.push({
        buyerId: buyer._id,
        items: items,
        shippingAddress: {
          address: buyer.address.street,
          city: buyer.address.city,
          postalCode: buyer.address.zip,
          country: 'Philippines'
        },
        paymentMethod: 'Cash on Delivery',
        taxPrice: 0,
        shippingPrice: 250,
        totalPrice: totalOrderPrice + 250,
        isPaid: status === 'delivered',
        paidAt: status === 'delivered' ? orderDate : null,
        status: status,
        createdAt: orderDate,
        deliveredAt: status === 'delivered' ? new Date(orderDate.getTime() + 86400000 * 3) : null
      });
    }

    // Insert in batches to avoid memory issues if massive (600 is fine, but good practice)
    await Order.insertMany(ordersToCreate);
    console.log(`🚚 Imported ${ordersToCreate.length} Orders!`);
    console.log('✅ Seeding Complete. Database is rich and ready.');
    
    console.log('\n--- CREDENTIALS ---');
    console.log('Admin:  admin@taglay.com');
    console.log('Buyers (Pick one):');
    console.log(` - ${buyerDocs[0].email} (Maria)`);
    console.log(` - ${buyerDocs[1].email} (Coffee Project)`);
    console.log('Farmers (Pick one):');
    console.log(` - ${farmerDocs[0].email} (Juan - Coffee)`);
    console.log(` - ${farmerDocs[1].email} (Roberto - Cacao)`);
    console.log('Password for all: password123');

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  await connectDB();
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('💥 Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}