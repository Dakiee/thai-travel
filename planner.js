(function (root) {
  'use strict';
  const researchDate = '18 September 2026';
  const sources = [
    { id: 'season', name: 'Tourism Authority of Thailand · January', url: 'https://www.tourismthailand.org/Articles/thailand-january', note: 'Seasonal destination guidance; weather is not a forecast.' },
    { id: 'krabi', name: 'Tourism Authority of Thailand · Krabi', url: 'https://www.tourismthailand.org/Destinations/Provinces/Krabi/344', note: 'Ao Nang as a base for island trips; peak-season booking advice.' },
    { id: 'palace', name: 'The Grand Palace · official tickets', url: 'https://www.royalgrandpalace.th/th/buy-ticket', note: 'Published foreign-adult admission: THB 500.' },
    { id: 'watpho', name: 'Wat Pho · official visitor information', url: 'https://www.watpho.com/en/contact/plan', note: 'Published admission: THB 300; respectful temple clothing required.' },
    { id: 'hong', name: 'Trip Thai Tour · Hong Islands', url: 'https://www.tripthaitour.com/Krabi/HongIslands', note: 'Advertised 2026 speedboat tour: THB 1,500 + THB 300 foreign-adult park fee. Recheck for 2027.' },
    { id: 'kayak', name: 'Koh Tour Krabi · Ao Thalane kayaking', url: 'https://kohtourkrabi.com/tours/kayaking-ao-thalane', note: 'Advertised adult rate with lunch: THB 1,095; planner rounds to THB 1,100. Recheck inclusions and 2027 rates.' },
    { id: 'miat', name: 'MIAT · official flight timetable', url: 'https://miat.com/en/timetable', note: 'Check the final January 2027 schedule. No flight times or fares have been verified.' }
  ];
  const day = (id, city, title, subtitle, category, cost, slots, tip, sourceIds = []) => ({ id, city, title, subtitle, category, cost, slots, tip, sourceIds });
  const days = {
    arrival: day('arrival', 'Bangkok', 'From winter to warmer days', 'Ulaanbaatar → Bangkok · settle into the city', 'Travel day', 0, [
      ['Before departure', 'Fly from Chinggis Khaan International Airport (UBN) to Bangkok (BKK). Choose a confirmed itinerary arriving on this day; flight times are still to be checked.'],
      ['On arrival', 'Allow time for immigration and bags, then take a prebooked van to your hotel. Plan roughly 45–90 minutes on the road, depending on traffic.'],
      ['Evening', 'Keep it easy: a neighborhood dinner, a short walk, and an early night. Stay around Silom or Sathorn near BTS/MRT.']
    ], 'For two adults and luggage, confirm the transfer has enough baggage space. International flights are budgeted separately.'),
    temples: day('temples', 'Bangkok', 'Golden temples & riverside wandering', 'Grand Palace · Wat Pho · Chao Phraya', 'Culture', 800, [
      ['08:30', 'Start at the Grand Palace before the midday heat. Allow about two hours. Published foreign-adult ticket: THB 500.'],
      ['12:00', 'Lunch near Tha Tien, then visit the reclining Buddha at Wat Pho. Published ticket: THB 300.'],
      ['16:00', 'Take a public river boat, find a riverside café, and enjoy the evening light across the water. Boat fares come from the local transport allowance.']
    ], 'Wear clothing that covers shoulders and knees. Recheck opening hours and any special closures before visiting.', ['palace', 'watpho']),
    city: day('city', 'Bangkok', 'The city, one little bite at a time', 'Canals · Talat Noi · Chinatown', 'Food & exploring', 600, [
      ['09:00', 'Arrange a short canal boat ride with a clearly agreed total group price. Allow THB 600 per adult, included in today’s activity budget.'],
      ['13:00', 'Walk through Talat Noi’s lanes and stop for a coffee. Keep the afternoon unhurried, with time to cool down indoors.'],
      ['18:00', 'Explore Yaowarat in Chinatown for a self-guided food crawl. Share dishes across the group; meals are already covered by the daily food allowance.']
    ], 'The canal price is a planning allowance, not a quote. If it costs more, use public boats and keep the difference.'),
    flySouth: day('flySouth', 'Krabi', 'Hello, Andaman blue', 'Bangkok → Krabi · Ao Nang sunset', 'Travel day', 0, [
      ['Morning', 'Fly Bangkok to Krabi (KBV). Allow roughly 1½ hours in the air plus airport time; choose the actual flight after confirming international tickets.'],
      ['Afternoon', 'Take a prebooked van to Ao Nang, roughly 40–60 minutes. Check in and unpack: this is your beach base for the rest of the coastal stay.'],
      ['Evening', 'Walk along Ao Nang beach at sunset and choose a simple Thai restaurant a few streets back from the seafront.']
    ], 'Check whether the domestic flight uses BKK or DMK. Bags and airport changes can erase a cheap fare’s savings.'),
    railay: day('railay', 'Krabi', 'A longtail ride to Railay', 'Railay West · Phra Nang beach', 'Beach day', 200, [
      ['09:00', 'Take a shared longtail boat from Ao Nang to Railay. Budget THB 200 per person return as an estimate; confirm the day’s fare and last return.'],
      ['11:00', 'Walk to Phra Nang beach, swim when conditions allow, and have lunch in Railay. Bring water and a dry bag.'],
      ['15:30', 'Return to Ao Nang in daylight. Leave the evening free for dinner and a seaside stroll.']
    ], 'Boats depend on weather, tides, and passenger numbers. Agree the pickup point and return arrangement before paying.', ['krabi']),
    hong: day('hong', 'Krabi', 'Lagoons, limestone & island time', 'Hong Islands · beach stops · viewpoint', 'Island adventure', 1800, [
      ['08:00', 'Join a Hong Islands speedboat excursion from Ao Nang. Use the operator’s actual pickup time when booked.'],
      ['Daytime', 'Enjoy the lagoon, beach stops, and snorkeling where the guide permits. The viewpoint is optional; take it slowly in the heat.'],
      ['Late afternoon', 'Return to your hotel for a relaxed evening. The food allowance remains available even if your tour includes lunch.']
    ], 'Budget THB 1,500 for the advertised tour plus THB 300 park entry per foreign adult. Confirm 2027 price, lunch, transfers, and weather cancellation terms.', ['hong']),
    slow: day('slow', 'Krabi', 'Nothing on the agenda. Almost.', 'Pool time · an optional massage · sunset', 'Slow day', 400, [
      ['Morning', 'Sleep in, have a long breakfast, and spend time at the pool or beach.'],
      ['Afternoon', 'Set aside about THB 400 per person for an optional one-hour local massage. Choose a provider and treatment you are comfortable with.'],
      ['Evening', 'Try a different neighborhood restaurant, then keep the evening free.']
    ], 'This is also a weather buffer. Swap it with an island excursion if the sea conditions are better on another day.'),
    kayak: day('kayak', 'Krabi', 'A quiet paddle through the mangroves', 'Ao Thalane · guided half-day kayaking', 'Nature', 1100, [
      ['Morning / tide dependent', 'Take a guided half-day kayaking trip through Ao Thalane. Confirm the best departure for the tides.'],
      ['Midday', 'The referenced operator advertises THB 1,095 per adult with lunch. The plan rounds this to THB 1,100; verify hotel pickup and current terms.'],
      ['Afternoon', 'Return to Ao Nang with the rest of the day free for swimming, cafés, or a quiet evening.']
    ], 'Confirm suitable kayak seating with the operator. Bring sun protection and a dry bag.', ['kayak']),
    islands: day('islands', 'Krabi', 'One more day on the water', 'Four Islands · snorkeling · sandbars', 'Island adventure', 1400, [
      ['08:00', 'Join a shared Four Islands longtail tour. Allow THB 1,000 for the tour plus THB 400 for possible park fees per adult; these are estimates.'],
      ['Daytime', 'Visit beach and snorkeling stops chosen by the operator for the tides and weather. Sandbar access is tide dependent.'],
      ['Late afternoon', 'Return to Ao Nang. If you prefer fewer boat days, make this a beach day and subtract its activity allowance in your own budget.']
    ], 'Ask for the total including all park fees, hotel transfers, lunch, and equipment. A private boat may be good value for five, but obtain a quote first.'),
    beach: day('beach', 'Krabi', 'Keep a little space for the unexpected', 'A final beach day · cafés · souvenirs', 'Slow day', 0, [
      ['Morning', 'Revisit your favorite beach or stay by the pool. This flexible day can absorb a rescheduled excursion.'],
      ['Afternoon', 'Enjoy a late lunch, shop for a few souvenirs, and pack without rushing. Personal shopping is outside the budget.'],
      ['Evening', 'Share a final seaside dinner. Confirm tomorrow’s airport pickup and flight terminal.']
    ], 'A long stay in one beach base saves packing time and repeated hotel transfers.'),
    cooking: day('cooking', 'Krabi', 'Bring a little Thailand home', 'A hands-on Thai cooking class', 'Food & exploring', 1500, [
      ['Morning', 'Arrange a group cooking class with a local school. Set aside THB 1,500 per adult as an estimate and check the dishes and class length.'],
      ['Afternoon', 'Enjoy what you cooked, then spend the afternoon at the beach or hotel.'],
      ['Evening', 'Leave the evening open for anything the group wants to revisit.']
    ], 'Tell the school about allergies and dietary preferences before booking. Class meals do not reduce the food allowance, leaving a little extra room.'),
    extraBeach: day('extraBeach', 'Krabi', 'Take the scenic route to doing less', 'An extra day by the Andaman Sea', 'Slow day', 0, [
      ['Morning', 'Choose an easy beach morning in Ao Nang. No advance booking needed.'],
      ['Afternoon', 'Read, swim, or visit a café. Keep this as an extra buffer for boat trips affected by weather.'],
      ['Evening', 'Have a relaxed dinner together and enjoy another sunset.']
    ], 'The 14-day option adds this rest day and a cooking class while keeping the same two bases.'),
    returnBangkok: day('returnBangkok', 'Bangkok', 'Back to Bangkok, with time to spare', 'Phuket → Bangkok · final two-night stay', 'Travel day', 0, [
      ['Morning', 'Transfer to Phuket Airport and fly back to Bangkok. Prefer arrival at the airport that best suits your final stay.'],
      ['Afternoon', 'Check into a Bangkok hotel for two nights. An airport-area hotel is convenient for an early onward departure.'],
      ['Evening', 'Have a final Thai dinner and check in online where available. Pack your cold-weather layer in your hand luggage.']
    ], 'The overnight buffer reduces the risk from separate domestic tickets. If your international flight leaves early, choose an airport hotel with confirmed transfers.'),
    home: day('home', 'Ulaanbaatar', 'A suitcase full of sunshine', 'Bangkok → Ulaanbaatar', 'Travel day', 0, [
      ['Before departure', 'Leave ample time for the airport and aim to arrive about three hours before an international flight. Confirm the correct terminal.'],
      ['Travel', 'Fly home on your confirmed itinerary. A connection may mean arriving the next calendar day.'],
      ['On arrival', 'Have a warm layer ready for Ulaanbaatar. Your flight’s actual arrival date determines the final time away.']
    ], 'The 10–14 days describe the sample calendar plan. Overnight connections may extend the time away; settle the flights before booking hotels.')
  };
  const stops = [
    { city: 'Bangkok', key: 'bangkok', nights: 3, offset: 0, description: 'Temples, riverside walks and street food.', area: 'Silom or Sathorn near BTS/MRT', links: {
      Booking: 'https://www.booking.com/searchresults.html?ss=Bangkok&checkin=2027-01-16&checkout=2027-01-19&group_adults=2',
      Agoda: 'https://www.agoda.com/search?textToSearch=Bangkok&checkIn=2027-01-16&checkOut=2027-01-19&adults=2&rooms=1',
      Airbnb: 'https://www.airbnb.com/s/Bangkok--Thailand/homes?checkin=2027-01-16&checkout=2027-01-19&adults=2',
      Trip: 'https://www.trip.com/hotels/list?keyword=Bangkok&checkin=2027-01-16&checkout=2027-01-19&adult=2'
    } },
    { city: 'Ao Nang (Krabi)', key: 'krabi', nights: 3, offset: 3, description: 'Longtail boats, Railay and a day on the islands.', area: 'Ao Nang, walking distance to the beach and restaurants', links: {
      Booking: 'https://www.booking.com/searchresults.html?ss=Ao+Nang&checkin=2027-01-19&checkout=2027-01-22&group_adults=2',
      Agoda: 'https://www.agoda.com/search?textToSearch=Ao%20Nang&checkIn=2027-01-19&checkOut=2027-01-22&adults=2&rooms=1',
      Airbnb: 'https://www.airbnb.com/s/Ao-Nang--Thailand/homes?checkin=2027-01-19&checkout=2027-01-22&adults=2',
      Trip: 'https://www.trip.com/hotels/list?keyword=Ao%20Nang&checkin=2027-01-19&checkout=2027-01-22&adult=2'
    } },
    { city: 'Koh Lanta', key: 'lanta', nights: 2, offset: 6, description: 'Slow beach mornings and sunset dinners.', area: 'Klong Dao or Long Beach', links: {
      Booking: 'https://www.booking.com/searchresults.html?ss=Koh+Lanta&checkin=2027-01-22&checkout=2027-01-24&group_adults=2',
      Agoda: 'https://www.agoda.com/search?textToSearch=Koh%20Lanta&checkIn=2027-01-22&checkOut=2027-01-24&adults=2&rooms=1',
      Airbnb: 'https://www.airbnb.com/s/Koh-Lanta--Thailand/homes?checkin=2027-01-22&checkout=2027-01-24&adults=2',
      Trip: 'https://www.trip.com/hotels/list?keyword=Koh%20Lanta&checkin=2027-01-22&checkout=2027-01-24&adult=2'
    } },
    { city: 'Koh Phi Phi', key: 'phiPhi', nights: 2, offset: 8, description: 'Island walks, viewpoints and time on the water.', area: 'Near Tonsai for easy ferry access; check noise reviews', links: {
      Booking: 'https://www.booking.com/searchresults.html?ss=Koh+Phi+Phi&checkin=2027-01-24&checkout=2027-01-26&group_adults=2',
      Agoda: 'https://www.agoda.com/search?textToSearch=Koh%20Phi%20Phi&checkIn=2027-01-24&checkOut=2027-01-26&adults=2&rooms=1',
      Airbnb: 'https://www.airbnb.com/s/Koh-Phi-Phi--Thailand/homes?checkin=2027-01-24&checkout=2027-01-26&adults=2',
      Trip: 'https://www.trip.com/hotels/list?keyword=Koh%20Phi%20Phi&checkin=2027-01-24&checkout=2027-01-26&adult=2'
    } },
    { city: 'Phuket', key: 'phuket', nights: 4, offset: 10, description: 'Old Town, beach days and one last sunset.', area: 'Old Town for cafés, or Kata for a beach base', links: {
      Booking: 'https://www.booking.com/searchresults.html?ss=Phuket&checkin=2027-01-26&checkout=2027-01-30&group_adults=2',
      Agoda: 'https://www.agoda.com/search?textToSearch=Phuket&checkIn=2027-01-26&checkOut=2027-01-30&adults=2&rooms=1',
      Airbnb: 'https://www.airbnb.com/s/Phuket--Thailand/homes?checkin=2027-01-26&checkout=2027-01-30&adults=2',
      Trip: 'https://www.trip.com/hotels/list?keyword=Phuket&checkin=2027-01-26&checkout=2027-01-30&adult=2'
    } },
    { city: 'Bangkok', key: 'bangkok', nights: 2, offset: 14, description: 'A final two-night buffer before the journey home.', area: 'Near BTS/MRT, or near your departure airport for an early flight', links: {
      Booking: 'https://www.booking.com/searchresults.html?ss=Bangkok&checkin=2027-01-30&checkout=2027-02-01&group_adults=2',
      Agoda: 'https://www.agoda.com/search?textToSearch=Bangkok&checkIn=2027-01-30&checkOut=2027-02-01&adults=2&rooms=1',
      Airbnb: 'https://www.airbnb.com/s/Bangkok--Thailand/homes?checkin=2027-01-30&checkout=2027-02-01&adults=2',
      Trip: 'https://www.trip.com/hotels/list?keyword=Bangkok&checkin=2027-01-30&checkout=2027-02-01&adult=2'
    } }
  ];
  const transfers = [
    { id: 'flySouth', offset: 3, title: 'Bangkok → Krabi', route: 'BKK / DMK → KBV', mode: 'Flight', min: 2000, max: 3500, status: 'Planning allowance', note: 'Search for 19 January 2027. Confirm baggage and which Bangkok airport is used before booking.', url: 'https://12go.asia/en/avia/bangkok/krabi?date=2027-01-19', source: '12Go · Bangkok to Krabi' },
    { id: 'toLanta', offset: 6, title: 'Ao Nang → Koh Lanta', route: 'Ao Nang → Koh Lanta', mode: 'Ferry', min: 700, max: 700, status: 'Published fare allowance', note: 'Search for 22 January 2027. Confirm the pier, hotel pickup, baggage rules and sailing time.', url: 'https://12go.asia/en/ferry/ao-nang/koh-lanta?date=2027-01-22', source: '12Go · Ao Nang to Koh Lanta' },
    { id: 'toPhiPhi', offset: 8, title: 'Koh Lanta → Koh Phi Phi', route: 'Koh Lanta → Koh Phi Phi', mode: 'Ferry', min: 500, max: 600, status: 'Published fare allowance', note: 'Search for 24 January 2027. Confirm the departure pier, local fees and hotel transfer.', url: 'https://12go.asia/en/travel/koh-lanta/koh-phi-phi?date=2027-01-24', source: '12Go · Koh Lanta to Koh Phi Phi' },
    { id: 'toPhuket', offset: 10, title: 'Koh Phi Phi → Phuket', route: 'Koh Phi Phi → Phuket', mode: 'Ferry', min: 450, max: 600, status: 'Published fare allowance', note: 'Search for 26 January 2027. Confirm the Phuket arrival pier and onward hotel transfer.', url: 'https://12go.asia/en/travel/koh-phi-phi/phuket?date=2027-01-26', source: '12Go · Koh Phi Phi to Phuket' },
    { id: 'returnBangkok', offset: 14, title: 'Phuket → Bangkok', route: 'HKT → BKK / DMK', mode: 'Flight', min: 2000, max: 3500, status: 'Planning allowance', note: 'Search for 30 January 2027. Confirm baggage and choose the Bangkok airport that suits your final stay.', url: 'https://12go.asia/en/avia/phuket/bangkok?date=2027-01-30', source: '12Go · Phuket to Bangkok' }
  ];
  sources.push(...transfers.map(t => ({ id: t.id, name: t.source, url: t.url, note: t.note })));
  days.flySouth.slots[1][1] = 'Arrange an airport transfer to Ao Nang. Check in for three nights and take an easy walk along the beach.';
  days.flySouth.tip = 'Flight allowance: THB 2,000–3,500 per person. The airport transfer is covered by the local-transfer allowance. Confirm BKK or DMK before booking.';
  days.returnBangkok.subtitle = 'Phuket → Bangkok · final two-night stay';
  days.returnBangkok.slots[0][1] = 'Transfer to Phuket Airport (HKT) and fly to Bangkok. Prefer the same Bangkok airport used by your international departure.';
  days.home.tip = 'This plan covers 17 calendar days and 16 hotel nights. International flight times can change your arrival date at home.';
  const easyDay = (id, city, title, subtitle, morning, afternoon, evening) => day(id, city, title, subtitle, 'Slow day', 0, [['Morning', morning], ['Afternoon', afternoon], ['Evening', evening]], 'Meals and local transport use the daily budget. Optional paid excursions are extra unless listed in the activity allowance.');
  days.toLanta = day('toLanta', 'Koh Lanta', 'A ferry ride to slower days', 'Ao Nang → Koh Lanta · settle in for two nights', 'Travel day', 0, [['Before sailing', 'Check out and reach the confirmed departure point. Check whether your ticket includes hotel pickup.'], ['Ferry crossing', 'Travel from Ao Nang to Koh Lanta. Budget THB 700 per adult and confirm the exact pier, sailing time and baggage rules.'], ['Afternoon & evening', 'Transfer to your hotel around Klong Dao or Long Beach. Unpack, swim and enjoy a sunset dinner.']], 'The ferry is included in the separate transport budget. Allow extra for the arrival-pier to hotel transfer.', ['toLanta']);
  days.lantaBeach = easyDay('lantaBeach', 'Koh Lanta', 'A whole day for the beach', 'Long Beach · swimming · sunset', 'Start with a slow breakfast and a beach walk.', 'Swim or read by the hotel pool; keep the hottest hours easy.', 'Choose a beachside dinner and watch the sunset.');
  days.lantaExplore = easyDay('lantaExplore', 'Koh Lanta', 'A little island exploring', 'Old Town · cafés · a change of scenery', 'Arrange a local ride to explore Lanta Old Town.', 'Take a relaxed lunch and browse the waterfront shops. Shopping is extra.', 'Return to your beach base before dinner.');
  days.lantaSlow = easyDay('lantaSlow', 'Koh Lanta', 'One more unhurried island day', 'Beach time · optional excursion · pack slowly', 'Revisit your favorite beach or choose a separately priced excursion.', 'Leave this day flexible for the weather and the group’s energy.', 'Pack and confirm tomorrow’s transfer to Saladan Pier.');
  days.toPhiPhi = day('toPhiPhi', 'Koh Phi Phi', 'Next stop, Phi Phi', 'Koh Lanta → Koh Phi Phi · two island nights', 'Travel day', 0, [['Morning', 'Check out and reach the confirmed departure pier with time for ferry check-in.'], ['Ferry crossing', 'Travel to Koh Phi Phi. Budget THB 500–600 per adult and confirm the operator, departure time and local fees.'], ['Afternoon', 'Walk or arrange a hotel transfer, then explore the village and nearby beach.']], 'Ferry fare is in the transport budget. Local pier fees and any onward hotel boat transfer are extra.', ['toPhiPhi']);
  days.phiPhiExplore = easyDay('phiPhiExplore', 'Koh Phi Phi', 'Find your favorite island view', 'Village walks · beach time · optional viewpoint', 'Explore early while it is cooler; take water and sun protection.', 'Relax at the beach or add an optional viewpoint visit. Any admission is extra.', 'Enjoy dinner near your hotel and a relaxed walk.');
  days.phiPhiSlow = easyDay('phiPhiSlow', 'Koh Phi Phi', 'Make room for the sea', 'A flexible day · optional snorkeling trip', 'Choose a beach morning or book a separately priced snorkeling excursion.', 'For an excursion, confirm equipment, boat transfers and all park fees before paying.', 'Return with time to pack and confirm tomorrow’s ferry.');
  days.toPhuket = day('toPhuket', 'Phuket', 'A new shore, a little city life', 'Phi Phi → Phuket · four nights', 'Travel day', 0, [['Before departure', 'Check out and take your bags to the confirmed departure point for ferry check-in.'], ['Ferry crossing', 'Sail to Phuket. Budget THB 450–600 per adult and confirm the arrival pier before arranging onward transport.'], ['Afternoon & evening', 'Transfer to your Phuket hotel, settle in and find a local dinner.']], 'Book a sailing that suits hotel check-in. The ferry budget excludes the arrival-pier to hotel transfer.', ['toPhuket']);
  days.phuketDay = easyDay('phuketDay', 'Phuket', 'A taste of the coast', 'Old Town or the beach · an easy first day', 'Choose Old Town’s streets and cafés, or a beach morning near your hotel.', 'Leave time for a relaxed lunch and a swim.', 'Keep the evening open and decide what you want to revisit over the next two days.');
  days.phuketExplore = easyDay('phuketExplore', 'Phuket', 'A full day for Phuket', 'Old Town · viewpoints · local food', 'Explore Phuket Old Town before the midday heat.', 'Choose a viewpoint, museum, or a slow café afternoon.', 'Find a local dinner and keep the evening flexible.');
  days.phuketSlow = easyDay('phuketSlow', 'Phuket', 'One more beach day', 'Swim · rest · sunset', 'Spend an easy morning at the beach closest to your hotel.', 'Keep the afternoon open for swimming, shopping, or a massage.', 'Enjoy a final island sunset and confirm tomorrow’s airport transfer.');
  days.bangkokFinal = easyDay('bangkokFinal', 'Bangkok', 'One last Bangkok day', 'Markets · cafés · an easy final evening', 'Choose a market, museum, or neighborhood you missed at the start.', 'Keep time free for last-minute shopping and packing.', 'Have an early dinner and confirm tomorrow’s airport transfer.');
  function itinerary(duration = 17) {
    if (duration !== 17) throw new RangeError('This route takes 17 days and 16 nights.');
    return ['arrival', 'temples', 'city', 'flySouth', 'railay', 'hong', 'toLanta', 'lantaBeach', 'toPhiPhi', 'phiPhiExplore', 'toPhuket', 'phuketDay', 'phuketExplore', 'phuketSlow', 'returnBangkok', 'bangkokFinal', 'home'].map(id => days[id]);
  }
  const styles = {
    value: { label: 'Our base estimate', flight: 23000, domestic: 4000, bangkok: 1400, krabi: 1800, lanta: 1800, phiPhi: 2400, phuket: 2000, food: 550, local: 110, transfers: 3800 },
    comfort: { label: 'More breathing room', flight: 26000, domestic: 7000, bangkok: 2400, krabi: 3200, lanta: 3200, phiPhi: 4000, phuket: 3500, food: 900, local: 180, transfers: 5000 }
  };
  function calculate({ duration = 17, adults = 2, style = 'value', rooms = Math.ceil(adults / 2) } = {}) {
    if (!Number.isInteger(adults) || adults < 1 || adults > 8) throw new RangeError('Choose 1–8 adults.');
    if (!Number.isInteger(rooms) || rooms < Math.ceil(adults / 2) || rooms > adults) throw new RangeError('Use 1–2 adults per room.');
    const config = styles[style];
    if (!config) throw new RangeError('Unknown budget style.');
    const plan = itinerary(duration);
    const selectedFare = t => style === 'value' ? t.min : t.max;
    const ferryCost = transfers.filter(t => t.mode === 'Ferry').reduce((sum, t) => sum + selectedFare(t), 0);
    const transportRange = { min: transfers.reduce((sum, t) => sum + t.min, 0), max: transfers.reduce((sum, t) => sum + t.max, 0) };
    const breakdown = [
      { key: 'flights', label: 'International flights', icon: 'plane', detail: `UBN ↔ Bangkok · ${adults} adults · return allowance`, amount: config.flight * adults },
      { key: 'domestic', label: 'Two domestic flights', icon: 'plane', detail: 'Bangkok → Krabi + Phuket → Bangkok · fare allowance; check bags', amount: config.domestic * adults },
      { key: 'ferries', label: 'Three island ferries', icon: 'boat', detail: 'Ao Nang → Lanta → Phi Phi → Phuket', amount: ferryCost * adults },
      { key: 'hotels', label: 'Places to stay', icon: 'bed', detail: `16 nights · ${rooms} rooms · six stays`, amount: stops.reduce((sum, stop) => sum + stop.nights * config[stop.key], 0) * rooms },
      { key: 'food', label: 'Food & coffee', icon: 'cup', detail: `THB ${config.food} / person / day · all ${duration} days`, amount: config.food * duration * adults },
      { key: 'transport', label: 'Other transfers & local rides', icon: 'car', detail: 'Additional airport/pier transfers + daily rides · allowance', amount: config.transfers * Math.ceil(adults / 6) + config.local * duration * adults },
      { key: 'activities', label: 'Experiences & entry fees', icon: 'sun', detail: 'Listed activity allowances only · optional excursions extra', amount: plan.reduce((sum, d) => sum + d.cost, 0) * adults },
      { key: 'essentials', label: 'Insurance & mobile data', icon: 'shield', detail: 'THB 1,500 insurance + THB 350 data / person', amount: 1850 * adults }
    ];
    const subtotal = breakdown.reduce((sum, item) => sum + item.amount, 0);
    const buffer = Math.ceil(subtotal * 0.1);
    const total = subtotal + buffer;
    return { duration, adults, rooms, style, config, plan, stops, krabiNights: 3, transportRange, breakdown, subtotal, buffer, total, perPerson: total / adults };
  }
  function dateAt(start, offset) {
    const d = new Date(`${start}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() + offset);
    return d;
  }
  const api = { researchDate, sources, itinerary, calculate, dateAt, styles, stops, transfers };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TravelPlanner = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
