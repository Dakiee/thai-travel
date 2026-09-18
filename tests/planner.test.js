const test = require('node:test');
const assert = require('node:assert/strict');
const { calculate, itinerary, dateAt, stops, transfers } = require('../planner.js');

test('the six stays cover exactly sixteen nights in the requested order', () => {
  assert.deepEqual(stops.map(s => [s.city,s.nights,s.offset]), [
    ['Bangkok',3,0], ['Ao Nang (Krabi)',3,3], ['Koh Lanta',2,6],
    ['Koh Phi Phi',2,8], ['Phuket',4,10], ['Bangkok',2,14]
  ]);
  assert.equal(stops.reduce((sum,s) => sum+s.nights,0),16);
  const trip = calculate();
  assert.equal(trip.plan.length,17);
  assert.equal(trip.plan.at(-3).id,'returnBangkok');
  assert.equal(trip.plan.at(-2).id,'bangkokFinal');
  assert.equal(trip.plan.at(-1).id,'home');
  assert.equal(trip.adults,2);
  assert.equal(trip.rooms,1);
  assert.equal(trip.breakdown.find(r=>r.key==='hotels').amount,28800);
  assert.equal(trip.total,135124);
});

test('transfer dates match the itinerary and span January into February', () => {
  assert.deepEqual(transfers.map(t=>dateAt('2027-01-16',t.offset).toISOString().slice(0,10)), [
    '2027-01-19','2027-01-22','2027-01-24','2027-01-26','2027-01-30'
  ]);
  for (const t of transfers) assert.equal(itinerary()[t.offset].id,t.id);
  assert.equal(dateAt('2027-01-16',16).toISOString().slice(0,10),'2027-02-01');
  assert.equal(dateAt('2027-01-31',16).toISOString().slice(0,10),'2027-02-16');
});

test('two flights and three ferries are counted once per traveler', () => {
  assert.equal(transfers.filter(t=>t.mode==='Flight').length,2);
  assert.equal(transfers.filter(t=>t.mode==='Ferry').length,3);
  for (const [style,perAdult] of [['value',5650],['comfort',8900]]) {
    const trip=calculate({style});
    const transport=trip.breakdown.filter(r=>['domestic','ferries'].includes(r.key));
    assert.equal(transport.reduce((sum,r)=>sum+r.amount,0),perAdult*2);
    assert.deepEqual(trip.transportRange,{min:5650,max:8900});
    assert.equal(trip.breakdown.find(r=>r.key==='activities').amount,3400*2);
  }
});

test('every stay has the four supplied two-adult accommodation searches', () => {
  for (const stop of stops) {
    assert.deepEqual(Object.keys(stop.links), ['Booking','Agoda','Airbnb','Trip']);
    for (const url of Object.values(stop.links)) assert.match(url, /2027-.+adult/i);
  }
  assert.match(transfers[0].url, /date=2027-01-19$/);
  assert.match(transfers.at(-1).url, /date=2027-01-30$/);
});

test('all group sizes and styles balance with a ten-percent buffer', () => {
  for (let adults=1;adults<=8;adults++) for (const style of ['value','comfort']) {
    const trip=calculate({adults,style});
    assert.equal(trip.rooms,Math.ceil(adults/2));
    assert.equal(trip.subtotal,trip.breakdown.reduce((sum,r)=>sum+r.amount,0));
    assert.equal(trip.total,trip.subtotal+trip.buffer);
    assert.equal(trip.buffer,Math.ceil(trip.subtotal*.1));
    assert.ok(Math.abs(trip.perPerson*adults-trip.total)<0.001);
    assert.ok(trip.breakdown.every(r=>r.amount>0));
  }
});

test('extra rooms add all sixteen nights without changing per-person transport', () => {
  const shared=calculate();const singles=calculate({rooms:2});
  assert.equal(singles.subtotal-shared.subtotal,28800);
  assert.equal(singles.total-shared.total,31680);
  for (const key of ['domestic','ferries']) assert.equal(shared.breakdown.find(r=>r.key===key).amount,singles.breakdown.find(r=>r.key===key).amount);
});

test('invalid duration, occupancy and styles are rejected', () => {
  for (const duration of [0,10,12,14,16,18,'17']) assert.throws(()=>itinerary(duration),RangeError);
  for (const adults of [0,1.5,9,NaN]) assert.throws(()=>calculate({adults}),RangeError);
  assert.throws(()=>calculate({adults:5,rooms:2}),RangeError);
  assert.throws(()=>calculate({adults:5,rooms:6}),RangeError);
  assert.throws(()=>calculate({style:'unknown'}),RangeError);
});
