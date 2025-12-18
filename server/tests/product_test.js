// server/tests/product_test.js
const BASE_URL = 'http://127.0.0.1:5001/api';

const printResult = (name, success, data = null) => {
  if (success) {
    console.log(`✅ [PASS] ${name}`);
  } else {
    console.log(`❌ [FAIL] ${name}`);
    if (data) console.error('   Error Data:', data);
  }
};

let cookieJar = '';
let productId = '';
let farmerUser = {};

async function runTests() {
  console.log('🚀 Starting Product System Tests...\n');

  // Randomize user
  const randomId = Math.floor(Math.random() * 10000);
  farmerUser = {
    name: `Farmer ${randomId}`,
    email: `farmer${randomId}@taglay.com`,
    password: 'password123',
    role: 'farmer'
  };

  try {
    // ---------------------------------------------------------
    // SETUP: Register & Login Farmer
    // ---------------------------------------------------------
    console.log(`--- Setup: Creating Farmer Account ---`);
    let res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(farmerUser)
    });
    
    // Save Cookie
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) cookieJar = setCookie.split(';')[0];
    
    printResult('Setup Farmer', res.status === 201);
    if (res.status !== 201) return;


    // ---------------------------------------------------------
    // TEST 1: Create Product (Authorized)
    // ---------------------------------------------------------
    console.log(`\n--- Test 1: Create Product ---`);
    const newProduct = {
      title: 'Fresh Mangoes',
      description: 'Sweet Carabao Mangoes from Guimaras',
      price: 150,
      category: 'fruits',
      stock: 500,
      unit: 'kg'
    };

    res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Cookie': cookieJar
      },
      body: JSON.stringify(newProduct)
    });

    let data = await res.json();
    printResult('Create Product', res.status === 201, data);
    
    if (data._id) productId = data._id;
    else { console.error('Cannot proceed without product ID'); return; }


    // ---------------------------------------------------------
    // TEST 2: Get All Products (Public)
    // ---------------------------------------------------------
    console.log(`\n--- Test 2: List Products (Public) ---`);
    res = await fetch(`${BASE_URL}/products?category=fruits`, {
      method: 'GET'
    });
    
    data = await res.json();
    const found = data.products.some(p => p._id === productId);
    printResult('List Products & Find Created', res.status === 200 && found);


    // ---------------------------------------------------------
    // TEST 3: Update Product (Owner)
    // ---------------------------------------------------------
    console.log(`\n--- Test 3: Update Product (Owner) ---`);
    res = await fetch(`${BASE_URL}/products/${productId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Cookie': cookieJar
      },
      body: JSON.stringify({ price: 140, stock: 450 }) // Discount!
    });
    
    data = await res.json();
    printResult('Update Product', res.status === 200 && data.price === 140);


    // ---------------------------------------------------------
    // TEST 4: Unauthorized Update (Mock Buyer)
    // ---------------------------------------------------------
    console.log(`\n--- Test 4: Unauthorized Update Check ---`);
    // Create a buyer
    const buyerRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Buyer Thief',
        email: `thief${randomId}@gmail.com`,
        password: 'password123',
        role: 'buyer'
      })
    });
    const buyerCookie = buyerRes.headers.get('set-cookie').split(';')[0];

    // Try to update farmer's product
    res = await fetch(`${BASE_URL}/products/${productId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Cookie': buyerCookie
      },
      body: JSON.stringify({ price: 0 })
    });
    
    // Expect 403 Forbidden
    printResult('Block Unauthorized Update', res.status === 403);


    // ---------------------------------------------------------
    // TEST 5: Delete Product (Owner)
    // ---------------------------------------------------------
    console.log(`\n--- Test 5: Delete Product (Owner) ---`);
    res = await fetch(`${BASE_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Cookie': cookieJar
      }
    });

    printResult('Delete Product', res.status === 200);


    // ---------------------------------------------------------
    // TEST 6: Verify Deletion
    // ---------------------------------------------------------
    console.log(`\n--- Test 6: Verify Deletion ---`);
    res = await fetch(`${BASE_URL}/products/${productId}`, {
      method: 'GET'
    });
    
    printResult('Product Gone (404)', res.status === 404);

  } catch (error) {
    console.error('❌ Test Script Error:', error);
  }
}

runTests();
