// server/tests/order_test.js
const BASE_URL = 'http://127.0.0.1:5001/api';

const printResult = (name, success, data = null) => {
  if (success) {
    console.log(`✅ [PASS] ${name}`);
  } else {
    console.log(`❌ [FAIL] ${name}`);
    if (data) console.error('   Error Data:', data);
  }
};

let farmerCookie = '';
let buyerCookie = '';
let productId = '';
let orderId = '';

async function runTests() {
  console.log('🚀 Starting Order System Tests...\n');
  const randomId = Math.floor(Math.random() * 10000);

  try {
    // ---------------------------------------------------------
    // SETUP: Register Farmer & Create Product
    // ---------------------------------------------------------
    console.log(`--- Setup: Creating Farmer & Product ---`);
    let res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Farmer ${randomId}`,
        email: `farmer${randomId}@orders.com`,
        password: 'password123',
        role: 'farmer'
      })
    });
    const farmerCookieHeader = res.headers.get('set-cookie');
    if (farmerCookieHeader) farmerCookie = farmerCookieHeader.split(';')[0];

    // Create Product
    res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': farmerCookie },
      body: JSON.stringify({
        title: 'Rice Sack (50kg)',
        description: 'Premium Jasmine Rice',
        price: 2500,
        category: 'grains',
        stock: 100,
        unit: 'sack'
      })
    });
    const productData = await res.json();
    productId = productData._id;
    printResult('Setup Farmer & Product', res.status === 201);


    // ---------------------------------------------------------
    // TEST 1: Register Buyer
    // ---------------------------------------------------------
    console.log(`\n--- Test 1: Register Buyer ---`);
    res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Buyer ${randomId}`,
        email: `buyer${randomId}@orders.com`,
        password: 'password123',
        role: 'buyer'
      })
    });
    const buyerCookieHeader = res.headers.get('set-cookie');
    if (buyerCookieHeader) buyerCookie = buyerCookieHeader.split(';')[0];
    printResult('Register Buyer', res.status === 201);


    // ---------------------------------------------------------
    // TEST 2: Create Order (As Buyer)
    // ---------------------------------------------------------
    console.log(`\n--- Test 2: Create Order ---`);
    const orderPayload = {
      items: [{
        productId: productId,
        title: 'Rice Sack (50kg)',
        quantity: 2,
        price: 2500
      }],
      shippingAddress: {
        address: '123 Main St',
        city: 'Manila',
        postalCode: '1000',
        country: 'Philippines'
      },
      paymentMethod: 'Cash on Delivery',
      taxPrice: 0,
      shippingPrice: 50,
      totalPrice: 5050
    };

    res = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': buyerCookie },
      body: JSON.stringify(orderPayload)
    });
    const orderData = await res.json();
    orderId = orderData._id;
    
    printResult('Create Order', res.status === 201, orderData);


    // ---------------------------------------------------------
    // TEST 3: Get Order By ID (As Buyer)
    // ---------------------------------------------------------
    console.log(`\n--- Test 3: Get Order (Buyer) ---`);
    res = await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Cookie': buyerCookie }
    });
    printResult('Get Order (Buyer)', res.status === 200);


    // ---------------------------------------------------------
    // TEST 4: Get My Orders (As Buyer)
    // ---------------------------------------------------------
    console.log(`\n--- Test 4: Get My Orders ---`);
    res = await fetch(`${BASE_URL}/orders/myorders`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Cookie': buyerCookie }
    });
    const myOrders = await res.json();
    printResult('Get My Orders', res.status === 200 && myOrders.length > 0);


    // ---------------------------------------------------------
    // TEST 5: Unauthorized Access (As Farmer)
    // ---------------------------------------------------------
    console.log(`\n--- Test 5: Unauthorized Access (Farmer) ---`);
    // Note: In our simple controller, Farmers cannot view arbitrary orders yet unless they are Admin
    res = await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Cookie': farmerCookie }
    });
    printResult('Block Unrelated Farmer', res.status === 403);

  } catch (error) {
    console.error('❌ Test Script Error:', error);
  }
}

runTests();
