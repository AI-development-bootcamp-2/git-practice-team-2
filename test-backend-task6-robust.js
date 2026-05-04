/**
 * Backend Test Suite for Task 6 - Due Date
 * 
 * Usage:
 * 1. Ensure the server is running (npm run server)
 * 2. Run: node test-backend-task6-robust.js
 */

const API_URL = 'http://localhost:3001/api/todos';

async function runTests() {
  console.log('=== Backend Edge Case Tests: Task 6 (Due Date) ===');

  const testCases = [
    {
      name: 'Valid ISO date (YYYY-MM-DD)',
      method: 'POST',
      body: { title: 'Valid Date', dueDate: '2026-12-31' },
      expectedStatus: 201,
      validate: (data) => data.dueDate === '2026-12-31'
    },
    {
      name: 'Valid ISO date-time',
      method: 'POST',
      body: { title: 'Valid DateTime', dueDate: '2026-06-15T10:00:00.000Z' },
      expectedStatus: 201,
      validate: (data) => !isNaN(Date.parse(data.dueDate))
    },
    {
      name: 'Explicit null (clear date)',
      method: 'POST',
      body: { title: 'Explicit Null', dueDate: null },
      expectedStatus: 201,
      validate: (data) => data.dueDate === null
    },
    {
      name: 'Undefined / Omitted',
      method: 'POST',
      body: { title: 'Omitted Date' },
      expectedStatus: 201,
      validate: (data) => data.dueDate === null
    },
    {
      name: 'Empty string (Should fail validation)',
      method: 'POST',
      body: { title: 'Empty String', dueDate: '' },
      expectedStatus: 400,
      validate: (data) => data.error && data.error.includes('Invalid dueDate')
    },
    {
      name: 'Whitespace string (Should fail validation)',
      method: 'POST',
      body: { title: 'Whitespace', dueDate: '   ' },
      expectedStatus: 400,
      validate: (data) => data.error && data.error.includes('Invalid dueDate')
    },
    {
      name: 'Invalid date string "not-a-date"',
      method: 'POST',
      body: { title: 'Garbage String', dueDate: 'not-a-date' },
      expectedStatus: 400
    },
    {
      name: 'Numerical value (Should fail validation as it is not an ISO string)',
      method: 'POST',
      body: { title: 'Number', dueDate: 123456789 },
      expectedStatus: 400
    },
    {
      name: 'Object value (Should fail validation)',
      method: 'POST',
      body: { title: 'Object', dueDate: { date: '2026-01-01' } },
      expectedStatus: 400
    },
    {
      name: 'Future date (Far future)',
      method: 'POST',
      body: { title: 'Far Future', dueDate: '2099-01-01' },
      expectedStatus: 201,
      validate: (data) => data.dueDate === '2099-01-01'
    },
    {
      name: 'Past date (Far past)',
      method: 'POST',
      body: { title: 'Far Past', dueDate: '1970-01-01' },
      expectedStatus: 201,
      validate: (data) => data.dueDate === '1970-01-01'
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const tc of testCases) {
    try {
      const res = await fetch(API_URL, {
        method: tc.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tc.body)
      });

      const data = await res.json();
      const statusMatch = res.status === tc.expectedStatus;
      const logicMatch = tc.validate ? tc.validate(data) : true;

      if (statusMatch && logicMatch) {
        console.log(`✅ [PASS] ${tc.name}`);
        passed++;
      } else {
        console.error(`❌ [FAIL] ${tc.name}`);
        console.error(`   Expected Status: ${tc.expectedStatus}, Got: ${res.status}`);
        console.error(`   Response Body:`, data);
        failed++;
      }
    } catch (err) {
      console.error(`💥 [ERROR] ${tc.name}: ${err.message}`);
      failed++;
    }
  }

  // Test Update (PUT) logic specifically
  console.log('\n--- Testing PUT Transitions ---');
  try {
    // Create a base todo
    const createRes = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Transition Test', dueDate: '2026-01-01' })
    });
    const todo = await createRes.json();
    const id = todo.id;

    // 1. Valid Date -> Null
    const res1 = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dueDate: null })
    });
    const data1 = await res1.json();
    if (data1.dueDate === null) {
      console.log('✅ [PASS] Update: Date -> Null');
      passed++;
    } else {
      console.error('❌ [FAIL] Update: Date -> Null');
      failed++;
    }

    // 2. Null -> New Valid Date
    const res2 = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dueDate: '2026-05-05' })
    });
    const data2 = await res2.json();
    if (data2.dueDate === '2026-05-05') {
      console.log('✅ [PASS] Update: Null -> Date');
      passed++;
    } else {
      console.error('❌ [FAIL] Update: Null -> Date');
      failed++;
    }

    // 3. Update with invalid date
    const res3 = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dueDate: 'invalid' })
    });
    if (res3.status === 400) {
      console.log('✅ [PASS] Update: Invalid Date -> 400');
      passed++;
    } else {
      console.error('❌ [FAIL] Update: Invalid Date -> 400');
      failed++;
    }

  } catch (err) {
    console.error(`💥 [ERROR] PUT Tests: ${err.message}`);
    failed++;
  }

  console.log(`\n=== Summary: ${passed} Passed, ${failed} Failed ===`);
  if (failed > 0) process.exit(1);
}

runTests();
