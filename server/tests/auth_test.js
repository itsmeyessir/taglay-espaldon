// server/tests/auth_test.js
const BASE_URL = 'http://127.0.0.1:5001/api/auth';

// Helper to print results
const printResult = (name, success, data = null) => {
  if (success) {
    console.log(`✅ [PASS] ${name}`);
  } else {
    console.log(`❌ [FAIL] ${name}`);
    if (data) console.error('   Error Data:', data);
  }
};

// Global cookie jar
let cookieJar = '';

async function runTests() {
  console.log('🚀 Starting Auth System Tests...\n');

  // Randomize user to allow repeated runs
  const randomId = Math.floor(Math.random() * 10000);
  const testUser = {
    name: `Test User ${randomId}`,
    email: `test${randomId}@example.com`,
    password: 'password123',
    role: 'farmer'
  };

  try {
    // ---------------------------------------------------------
    // TEST 1: Register New User
    // ---------------------------------------------------------
    console.log(`--- Test 1: Registering ${testUser.email} ---
`);
    let res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });

    let data = await res.json();
    
    // Extract cookie
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
      cookieJar = setCookie.split(';')[0]; // Simple extraction
    }

    printResult('Register User', res.status === 201, data);

    if (res.status !== 201) {
      console.error('Critical Failure: Cannot proceed without registration.');
      return;
    }

    // ---------------------------------------------------------
    // TEST 2: Prevent Duplicate Registration
    // ---------------------------------------------------------
    console.log(`\n--- Test 2: Attempt Duplicate Registration ---
`);
    res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    
    // We expect a 400 Bad Request
    printResult('Prevent Duplicate', res.status === 400);


    // ---------------------------------------------------------
    // TEST 3: Login
    // ---------------------------------------------------------
    console.log(`\n--- Test 3: Login ---
`);
    res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testUser.email, password: testUser.password })
    });
    
    data = await res.json();
    
    // Update cookie if login sets a new one (it should)
    const loginCookie = res.headers.get('set-cookie');
    if (loginCookie) {
      cookieJar = loginCookie.split(';')[0];
    }

    printResult('Login User', res.status === 200, data);


    // ---------------------------------------------------------
    // TEST 4: Access Protected Route (/me) WITHOUT Cookie
    // ---------------------------------------------------------
    console.log(`\n--- Test 4: Access Protected Route (No Cookie) ---
`);
    res = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
      // No Cookie header sent
    });

    printResult('Block Unauth Access', res.status === 401);


    // ---------------------------------------------------------
    // TEST 5: Access Protected Route (/me) WITH Cookie
    // ---------------------------------------------------------
    console.log(`\n--- Test 5: Access Protected Route (With Cookie) ---
`);
    res = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Cookie': cookieJar // Send the cookie we saved
      }
    });

    data = await res.json();
    printResult('Allow Auth Access', res.status === 200, data);
    
    // Verify data integrity
    if (data.email === testUser.email) {
      console.log('   Data Integrity Check: PASS (Email matches)');
    } else {
      console.log('   Data Integrity Check: FAIL (Email mismatch)');
    }


    // ---------------------------------------------------------
    // TEST 6: Logout
    // ---------------------------------------------------------
    console.log(`\n--- Test 6: Logout ---
`);
    res = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    printResult('Logout', res.status === 200);

  } catch (error) {
    console.error('❌ Test Script Error:', error);
  }
}

runTests();
