// server/tests/dashboard_test.js
const BASE_URL = 'http://127.0.0.1:5001/api';

const printResult = (name, success, data = null) => {
  if (success) {
    console.log(`✅ [PASS] ${name}`);
  } else {
    console.log(`❌ [FAIL] ${name}`);
    if (data) console.error('   Error Data:', data);
  }
};

let adminCookie = '';
let buyerCookie = '';

async function runTests() {
  console.log('🚀 Starting Dashboard Analytics Tests...\n');
  const randomId = Math.floor(Math.random() * 10000);

  try {
    // ---------------------------------------------------------
    // SETUP: Register Admin
    // ---------------------------------------------------------
    console.log(`--- Setup: Creating Admin Account ---`);
    let res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Admin ${randomId}`,
        email: `admin${randomId}@taglay.com`,
        password: 'password123',
        role: 'admin'
      })
    });
    const cookieHeader = res.headers.get('set-cookie');
    if (cookieHeader) adminCookie = cookieHeader.split(';')[0];
    printResult('Setup Admin', res.status === 201);


    // ---------------------------------------------------------
    // TEST 1: Get Dashboard Stats (As Admin)
    // ---------------------------------------------------------
    console.log(`\n--- Test 1: Get Stats (Admin) ---`);
    res = await fetch(`${BASE_URL}/dashboard/stats`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Cookie': adminCookie }
    });
    
    const data = await res.json();
    
    const isValidStructure = 
      data.counts && 
      typeof data.counts.products === 'number' && 
      typeof data.counts.orders === 'number' && 
      typeof data.counts.users === 'number' && 
      typeof data.totalRevenue === 'number' &&
      Array.isArray(data.recentOrders);

    printResult('Get Stats Structure', res.status === 200 && isValidStructure, data);


    // ---------------------------------------------------------
    // TEST 2: Unauthorized Access (As Buyer)
    // ---------------------------------------------------------
    console.log(`\n--- Test 2: Unauthorized Access (Buyer) ---`);
    
    // Register Buyer first
    const buyerRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Buyer ${randomId}`,
        email: `buyer_dash${randomId}@taglay.com`,
        password: 'password123',
        role: 'buyer'
      })
    });
    const buyerCookieHeader = buyerRes.headers.get('set-cookie');
    if (buyerCookieHeader) buyerCookie = buyerCookieHeader.split(';')[0];

    // Try to access stats
    res = await fetch(`${BASE_URL}/dashboard/stats`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Cookie': buyerCookie }
    });

    printResult('Block Non-Admin Access', res.status === 403);

  } catch (error) {
    console.error('❌ Test Script Error:', error);
  }
}

runTests();
