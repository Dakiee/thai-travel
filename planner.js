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
      ['On arrival', 'Allow time for immigration and bags. Buy a Thai SIM or activate an eSIM, and withdraw or exchange some baht in the arrivals hall. Take the Airport Rail Link to Ratchaprarop (about 25 minutes), or a large taxi or van for five people and bags.'],
      ['Evening', 'Keep it easy: street food around Pratunam and Ratchaprarop, a short walk, and an early night at Hotel Ordinary.']
    ], 'Five people with luggage will not fit in one standard taxi. Book a van, or split into two taxis from the official taxi queue. Hotel Ordinary takes a cash deposit at check-in. International flights are budgeted separately.'),
    temples: day('temples', 'Bangkok', 'Golden temples & riverside wandering', 'Grand Palace · Wat Pho · Chao Phraya', 'Culture', 800, [
      ['08:30', 'Start at the Grand Palace before the midday heat. Allow about two hours. Published foreign-adult ticket: THB 500.'],
      ['12:00', 'Lunch near Tha Tien, then visit the reclining Buddha at Wat Pho. Published ticket: THB 300.'],
      ['16:00', 'Cross the river by ferry from Tha Tien to Wat Arun for the late-afternoon light, then take a public river boat and find a riverside café at dusk. Boat fares come from the local transport allowance; Wat Arun admission (about THB 200) is extra.']
    ], 'Wear clothing that covers shoulders and knees. Ignore anyone outside the palace who says it is closed today; that is a common scam. Recheck opening hours and any special closures before visiting.', ['palace', 'watpho']),
    city: day('city', 'Bangkok', 'The city, one little bite at a time', 'Canals · Talat Noi · Chinatown', 'Food & exploring', 600, [
      ['09:00', 'Arrange a short canal boat ride with a clearly agreed total group price. Allow THB 600 per adult, included in today’s activity budget.'],
      ['13:00', 'Walk through Talat Noi’s lanes and stop for a coffee. Keep the afternoon unhurried, with time to cool down indoors.'],
      ['18:00', 'Explore Yaowarat in Chinatown for a self-guided food crawl. Sunday evening is a good night for it; many street stalls close on Mondays. Share dishes across the group; meals are already covered by the daily food allowance.']
    ], 'The canal price is a planning allowance, not a quote. If it costs more, use public boats and keep the difference. The Khlong Saen Saep express boat from Pratunam Pier, near both hotels, is a cheap alternative.'),
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
    { city: 'Bangkok', key: 'bangkok', nights: 3, offset: 0, placeId: 'ordinary', hotel: 'Hotel Ordinary Bangkok', guests: 5, image: 'https://images.trvl-media.com/lodging/45000000/44520000/44516500/44516467/9836597a.jpg?impolicy=resizecrop&ra=fill&rh=575&rw=575', imageAlt: 'The illuminated Hotel Ordinary Bangkok sign and entrance', description: 'Temples, riverside walks and street food.', area: 'Ratchaprarop, Bangkok', links: {
      Booking: 'https://www.booking.com/searchresults.html?ss=Bangkok&checkin=2027-01-16&checkout=2027-01-19&group_adults=2',
      Agoda: 'https://www.agoda.com/search?textToSearch=Bangkok&checkIn=2027-01-16&checkOut=2027-01-19&adults=2&rooms=1',
      Airbnb: 'https://www.airbnb.com/s/Bangkok--Thailand/homes?checkin=2027-01-16&checkout=2027-01-19&adults=2',
      Trip: 'https://www.trip.com/hotels/list?keyword=Bangkok&checkin=2027-01-16&checkout=2027-01-19&adult=2'
    } },
    { city: 'Ao Nang (Krabi)', key: 'krabi', nights: 3, offset: 3, placeId: 'ibis', hotel: 'ibis Styles Krabi Ao Nang', guests: 5, image: 'https://www.ahstatic.com/photos/7020_sw_00_p_1024x768.jpg', imageAlt: 'The ibis Styles Ao Nang pool lined with sun loungers beneath limestone cliffs', description: 'Longtail boats, Railay and a day on the islands.', area: 'Ao Nang', links: {
      Booking: 'https://www.booking.com/searchresults.html?ss=Ao+Nang&checkin=2027-01-19&checkout=2027-01-22&group_adults=2',
      Agoda: 'https://www.agoda.com/search?textToSearch=Ao%20Nang&checkIn=2027-01-19&checkOut=2027-01-22&adults=2&rooms=1',
      Airbnb: 'https://www.airbnb.com/s/Ao-Nang--Thailand/homes?checkin=2027-01-19&checkout=2027-01-22&adults=2',
      Trip: 'https://www.trip.com/hotels/list?keyword=Ao%20Nang&checkin=2027-01-19&checkout=2027-01-22&adult=2'
    } },
    { city: 'Koh Lanta', key: 'lanta', nights: 2, offset: 6, placeId: 'rattana', hotel: 'Rattana Resort, Lanta Noi', guests: 5, image: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/543416584.jpg?k=ed8aa3c5bec80c913fa5c31d30052859f42adc196108afe45c9a38690697c1f8&o=', imageAlt: 'The pool at Rattana Resort under a blue sky, with palms and the resort villas behind', description: 'Slow beach mornings and sunset dinners.', area: 'Koh Lanta Noi', links: {
      Booking: 'https://www.booking.com/searchresults.html?ss=Koh+Lanta&checkin=2027-01-22&checkout=2027-01-24&group_adults=2',
      Agoda: 'https://www.agoda.com/search?textToSearch=Koh%20Lanta&checkIn=2027-01-22&checkOut=2027-01-24&adults=2&rooms=1',
      Airbnb: 'https://www.airbnb.com/s/Koh-Lanta--Thailand/homes?checkin=2027-01-22&checkout=2027-01-24&adults=2',
      Trip: 'https://www.trip.com/hotels/list?keyword=Koh%20Lanta&checkin=2027-01-22&checkout=2027-01-24&adult=2'
    } },
    { city: 'Koh Phi Phi', key: 'phiPhi', nights: 2, offset: 8, placeId: 'donchukit', hotel: 'Phi Phi Don Chukit Resort', guests: 7, guestNote: '5 → 7 people', image: 'https://phiphidonchukitresort.site/_astro/6.C3HJZaV5_2jARXi.webp', imageAlt: 'Guests in the Phi Phi Don Chukit infinity pool looking out at the island’s limestone cliffs', description: 'Island walks, viewpoints and time on the water.', area: 'Tonsai Bay, Koh Phi Phi', links: {
      Booking: 'https://www.booking.com/searchresults.html?ss=Koh+Phi+Phi&checkin=2027-01-24&checkout=2027-01-26&group_adults=2',
      Agoda: 'https://www.agoda.com/search?textToSearch=Koh%20Phi%20Phi&checkIn=2027-01-24&checkOut=2027-01-26&adults=2&rooms=1',
      Airbnb: 'https://www.airbnb.com/s/Koh-Phi-Phi--Thailand/homes?checkin=2027-01-24&checkout=2027-01-26&adults=2',
      Trip: 'https://www.trip.com/hotels/list?keyword=Koh%20Phi%20Phi&checkin=2027-01-24&checkout=2027-01-26&adult=2'
    } },
    { city: 'Phuket', key: 'phuket', nights: 4, offset: 10, placeId: 'kamala', hotel: 'Ultra 360* Sky-Villa Penthouse', guests: 7, image: 'https://images.trvl-media.com/lodging/79000000/78390000/78380800/78380768/1acc1878.jpg?impolicy=resizecrop&rw=1024&ra=fit', imageAlt: 'The Sky-Villa’s glass-walled living room opening onto a terrace at sunset over Kamala', description: 'Old Town, beach days and one last sunset.', area: 'Kamala Beach, Phuket', links: {
      Booking: 'https://www.booking.com/searchresults.html?ss=Phuket&checkin=2027-01-26&checkout=2027-01-30&group_adults=2',
      Agoda: 'https://www.agoda.com/search?textToSearch=Phuket&checkIn=2027-01-26&checkOut=2027-01-30&adults=2&rooms=1',
      Airbnb: 'https://www.airbnb.com/s/Phuket--Thailand/homes?checkin=2027-01-26&checkout=2027-01-30&adults=2',
      Trip: 'https://www.trip.com/hotels/list?keyword=Phuket&checkin=2027-01-26&checkout=2027-01-30&adult=2'
    } },
    { city: 'Bangkok', key: 'bangkok', nights: 2, offset: 14, placeId: 'baiyoke', hotel: 'Baiyoke Sky Hotel', guests: 7, image: 'https://api.jtrholidays.com/storage/5114/baioke-hotel1.webp?tr=w-1024%2Cf-webp%2Cq-80', imageAlt: 'Baiyoke Sky Hotel rising above the Bangkok skyline', description: 'A final two-night buffer before the journey home.', area: 'Pratunam, Bangkok', links: {
      Booking: 'https://www.booking.com/searchresults.html?ss=Bangkok&checkin=2027-01-30&checkout=2027-02-01&group_adults=2',
      Agoda: 'https://www.agoda.com/search?textToSearch=Bangkok&checkIn=2027-01-30&checkOut=2027-02-01&adults=2&rooms=1',
      Airbnb: 'https://www.airbnb.com/s/Bangkok--Thailand/homes?checkin=2027-01-30&checkout=2027-02-01&adults=2',
      Trip: 'https://www.trip.com/hotels/list?keyword=Bangkok&checkin=2027-01-30&checkout=2027-02-01&adult=2'
    } }
  ];
  const places = [
    { id: 'bkk', stop: 'bangkok', type: 'airport', lat: 13.6818969, lng: 100.7468694, name: 'Suvarnabhumi Airport', when: 'Arrive 16 Jan · fly home 1 Feb', note: 'Airport Rail Link to Ratchaprarop, five minutes from both Bangkok hotels.' },
    { id: 'ordinary', stop: 'bangkok', type: 'hotel', lat: 13.7561251, lng: 100.5431889, name: 'Hotel Ordinary Bangkok', when: '16–19 Jan · 3 nights', note: '2 king rooms + extra bed. Cash deposit at check-in.' },
    { id: 'kbv', stop: 'krabi', type: 'airport', lat: 8.0992802, lng: 98.9831948, name: 'Krabi Airport', when: '19 Jan', note: 'About 40 minutes by taxi to Ao Nang.' },
    { id: 'ibis', stop: 'krabi', type: 'hotel', lat: 8.0341379, lng: 98.8312381, name: 'ibis Styles Krabi Ao Nang', when: '19–22 Jan · 3 nights', note: '2 rooms + extra bed.' },
    { id: 'nopparat', stop: 'krabi', type: 'pier', lat: 8.0474397, lng: 98.7986249, name: 'Nopparat Thara Pier', when: '22 Jan', note: 'Ferry to Koh Lanta.' },
    { id: 'saladan', stop: 'lanta', type: 'pier', lat: 7.648269, lng: 99.041702, name: 'Saladan Pier', when: 'Arrive 22 Jan · leave 24 Jan', note: 'Agree the taxi price first, or use the resort pickup.' },
    { id: 'rattana', stop: 'lanta', type: 'hotel', lat: 7.6729114, lng: 99.0453522, name: 'Rattana Resort, Lanta Noi', when: '22–24 Jan · 2 nights', note: 'Paid. About 3 km from Saladan over the bridge. Rents motorbikes.' },
    { id: 'tonsai', stop: 'phiphi', type: 'pier', lat: 7.7402, lng: 98.7712, name: 'Tonsai Pier', when: 'Arrive 24 Jan · leave 26 Jan', note: 'No cars on the island. Walk or use a luggage porter.' },
    { id: 'donchukit', stop: 'phiphi', type: 'hotel', lat: 7.7365495, lng: 98.7745366, name: 'Phi Phi Don Chukit Resort', when: '24–26 Jan · 2 nights', note: '2 twins, plus an extra room on 25 Jan.' },
    { id: 'rassada', stop: 'phuket', type: 'pier', lat: 7.8730296, lng: 98.4145428, name: 'Rassada Pier', when: '26 Jan', note: 'About 45 minutes to Kamala.' },
    { id: 'kamala', stop: 'phuket', type: 'hotel', lat: 7.9534149, lng: 98.2907791, name: 'Ultra 360* Sky-Villa Penthouse', when: '26–30 Jan · 4 nights', note: 'Hillside penthouse above Kamala. About a 15-minute walk to the beach.' },
    { id: 'hkt', stop: 'phuket', type: 'airport', lat: 8.1053402, lng: 98.305429, name: 'Phuket Airport', when: '30 Jan', note: 'About 40 minutes from Kamala. Leave early.' },
    { id: 'baiyoke', stop: 'bangkok', type: 'hotel', lat: 13.7541027, lng: 100.5403735, name: 'Baiyoke Sky Hotel', when: '30 Jan–1 Feb · 2 nights', note: '3 rooms + extra bed. Pratunam Market is next door.' }
  ];
  const legs = [
    ['bkk', 'ordinary', 'ground', 'Suvarnabhumi Airport → Hotel Ordinary · Airport Rail Link or taxi'],
    ['ordinary', 'bkk', 'ground', 'Hotel Ordinary → Bangkok airport · Airport Rail Link or taxi'],
    ['bkk', 'kbv', 'flight', 'Bangkok → Krabi · domestic flight'],
    ['kbv', 'ibis', 'ground', 'Krabi Airport → ibis Styles · taxi or prebooked van'],
    ['ibis', 'nopparat', 'ground', 'ibis Styles → Nopparat Thara Pier · taxi or hotel transfer'],
    ['nopparat', 'saladan', 'ferry', 'Nopparat Thara Pier → Saladan Pier · ferry'],
    ['saladan', 'rattana', 'ground', 'Saladan Pier ↔ Rattana Resort · taxi or resort pickup'],
    ['saladan', 'tonsai', 'ferry', 'Saladan Pier → Tonsai Pier · ferry'],
    ['tonsai', 'donchukit', 'walk', 'Tonsai Pier ↔ Don Chukit Resort · walk or luggage porter'],
    ['tonsai', 'rassada', 'ferry', 'Tonsai Pier → Rassada Pier · ferry'],
    ['rassada', 'kamala', 'ground', 'Rassada Pier → Sky-Villa, Kamala · taxi or prebooked van'],
    ['kamala', 'hkt', 'ground', 'Sky-Villa, Kamala → Phuket Airport · taxi or prebooked van'],
    ['hkt', 'bkk', 'flight', 'Phuket → Bangkok · domestic flight'],
    ['bkk', 'baiyoke', 'ground', 'Bangkok airport → Baiyoke Sky · Airport Rail Link or taxi'],
    ['baiyoke', 'bkk', 'ground', 'Baiyoke Sky → Suvarnabhumi Airport · Airport Rail Link or taxi']
  ];
  const transfers = [
    { id: 'flySouth', offset: 3, title: 'Bangkok → Krabi', route: 'BKK / DMK → KBV', mode: 'Flight', time: '11:30–13:00', min: 2000, max: 3500, status: 'Planning allowance', note: 'Search for 19 January 2027. Confirm baggage and which Bangkok airport is used before booking.', url: 'https://12go.asia/en/avia/bangkok/krabi?date=2027-01-19', source: '12Go · Bangkok to Krabi' },
    { id: 'toLanta', offset: 6, title: 'Ao Nang → Koh Lanta', route: 'Ao Nang → Koh Lanta', mode: 'Ferry', time: '11:00–13:45', min: 700, max: 700, status: 'Published fare allowance', note: 'Search for 22 January 2027. Confirm the pier, hotel pickup, baggage rules and sailing time.', url: 'https://12go.asia/en/ferry/ao-nang/koh-lanta?date=2027-01-22', source: '12Go · Ao Nang to Koh Lanta' },
    { id: 'toPhiPhi', offset: 8, title: 'Koh Lanta → Koh Phi Phi', route: 'Koh Lanta → Koh Phi Phi', mode: 'Ferry', time: '10:00–10:30', min: 500, max: 600, status: 'Published fare allowance', note: 'Search for 24 January 2027. Confirm the departure pier, local fees and hotel transfer.', url: 'https://12go.asia/en/travel/koh-lanta/koh-phi-phi?date=2027-01-24', source: '12Go · Koh Lanta to Koh Phi Phi' },
    { id: 'toPhuket', offset: 10, title: 'Koh Phi Phi → Phuket', route: 'Koh Phi Phi → Phuket', mode: 'Ferry', time: '11:00–13:00', min: 450, max: 600, status: 'Published fare allowance', note: 'Search for 26 January 2027. Confirm the Phuket arrival pier and onward hotel transfer.', url: 'https://12go.asia/en/travel/koh-phi-phi/phuket?date=2027-01-26', source: '12Go · Koh Phi Phi to Phuket' },
    { id: 'returnBangkok', offset: 14, title: 'Phuket → Bangkok', route: 'HKT → BKK / DMK', mode: 'Flight', min: 2000, max: 3500, status: 'Planning allowance', note: 'Search for 30 January 2027. Confirm baggage and choose the Bangkok airport that suits your final stay.', url: 'https://12go.asia/en/avia/phuket/bangkok?date=2027-01-30', source: '12Go · Phuket to Bangkok' }
  ];
  const internationalFlights = [
    { id: 'flyIn', offset: 0, title: 'Ulaanbaatar → Bangkok', route: 'UBN → BKK', mode: 'Flight' },
    { id: 'flyHome', offset: 16, title: 'Bangkok → Ulaanbaatar', route: 'BKK → UBN', mode: 'Flight' }
  ];
  sources.push(...transfers.map(t => ({ id: t.id, name: t.source, url: t.url, note: t.note })));
  days.flySouth.slots[1][1] = 'Arrange an airport transfer to Ao Nang. Check in for three nights and take an easy walk along the beach.';
  days.flySouth.tip = 'Flight allowance: THB 2,000–3,500 per person. The airport transfer is covered by the local-transfer allowance. Confirm BKK or DMK before booking.';
  days.returnBangkok.subtitle = 'Phuket → Bangkok · final two-night stay';
  days.returnBangkok.slots[0][1] = 'Leave Kamala early by van (about 40 minutes) for Phuket Airport (HKT). Fly to Suvarnabhumi (BKK) if you can: it is your departure airport, and the Airport Rail Link runs to Ratchaprarop near Baiyoke Sky.';
  days.returnBangkok.slots[1][1] = 'Check into Baiyoke Sky Hotel in Pratunam for the final two nights.';
  days.returnBangkok.slots[2][1] = 'Have dinner at the Pratunam street stalls, then check in online for the flight home. Pack your cold-weather layer in your hand luggage.';
  days.returnBangkok.tip = 'The two-night buffer protects the international flight from a delayed domestic flight. The hotel is about 30–45 minutes from Suvarnabhumi by Airport Rail Link.';
  days.home.tip = 'This plan covers 17 calendar days and 16 hotel nights. International flight times can change your arrival date at home.';
  const easyDay = (id, city, title, subtitle, morning, afternoon, evening) => day(id, city, title, subtitle, 'Slow day', 0, [['Morning', morning], ['Afternoon', afternoon], ['Evening', evening]], 'Meals and local transport use the daily budget. Optional paid excursions are extra unless listed in the activity allowance.');
  days.toLanta = day('toLanta', 'Koh Lanta', 'A ferry ride to slower days', 'Ao Nang → Koh Lanta · settle in on Lanta Noi', 'Travel day', 0, [['Before sailing', 'Check out and reach Nopparat Thara Pier, or the pickup point on your ticket. Check whether hotel pickup is included.'], ['Ferry crossing', 'Travel from Ao Nang to Saladan Pier on Koh Lanta. Budget THB 700 per adult and confirm the sailing time and baggage rules.'], ['Afternoon & evening', 'Take the resort pickup or a taxi over the bridge to Rattana Resort on Lanta Noi, about 3 km. Swim in the pool, then have an early seafood dinner in Saladan.']], 'Lanta Noi is quiet and has no real beach nearby. Plan tomorrow’s beach time on Lanta Yai. Agree the taxi price before loading bags.', ['toLanta']);
  days.lantaBeach = day('lantaBeach', 'Koh Lanta', 'A whole day for the beach', 'Long Beach · Old Town · sunset', 'Slow day', 0, [['Morning', 'Rent motorbikes from the resort, or hire a tuk-tuk or songthaew, to reach Long Beach (Phra Ae) on Lanta Yai in about 20–25 minutes.'], ['Afternoon', 'Swim and keep the hottest hours easy. Optional: continue to Lanta Old Town on the east coast for its wooden stilt houses and a waterfront lunch.'], ['Evening', 'Watch the sunset from a Long Beach bar, then head back to Lanta Noi before it gets late. Pack for tomorrow’s ferry.']], 'Ride only with a valid licence that covers motorbikes; many travel insurance policies do not pay out otherwise. A covered tuk-tuk day hire is the safer group option.');
  days.lantaExplore = easyDay('lantaExplore', 'Koh Lanta', 'A little island exploring', 'Old Town · cafés · a change of scenery', 'Arrange a local ride to explore Lanta Old Town.', 'Take a relaxed lunch and browse the waterfront shops. Shopping is extra.', 'Return to your beach base before dinner.');
  days.lantaSlow = easyDay('lantaSlow', 'Koh Lanta', 'One more unhurried island day', 'Beach time · optional excursion · pack slowly', 'Revisit your favorite beach or choose a separately priced excursion.', 'Leave this day flexible for the weather and the group’s energy.', 'Pack and confirm tomorrow’s transfer to Saladan Pier.');
  days.toPhiPhi = day('toPhiPhi', 'Koh Phi Phi', 'Next stop, Phi Phi', 'Koh Lanta → Koh Phi Phi · two island nights', 'Travel day', 0, [['Morning', 'Transfer from Lanta Noi to Saladan Pier with time for ferry check-in.'], ['Ferry crossing', 'Travel to Tonsai Pier on Koh Phi Phi. Budget THB 500–600 per adult and confirm the operator, departure time and local fees.'], ['Afternoon & evening', 'Walk or use a luggage porter to Don Chukit Resort. Swim in the infinity pool, then climb to the Phi Phi Viewpoint for sunset (small entry fee, about 30 minutes’ walk uphill).']], 'Phi Phi charges a small island entry fee on arrival (about THB 20). Keep cash handy. There are no cars on the island.', ['toPhiPhi']);
  days.phiPhiExplore = day('phiPhiExplore', 'Koh Phi Phi', 'Maya Bay and the lagoons', 'Phi Phi Leh boat trip · the group grows to seven', 'Island adventure', 0, [['07:30', 'Take an early longtail or speedboat trip to Phi Phi Leh: Maya Bay, Pileh Lagoon and Viking Cave, ahead of the day-trip crowds from Phuket.'], ['Afternoon', 'Welcome the two travelers joining the group and settle them into the extra room. Swim at Loh Dalum Bay, or snorkel at Monkey Beach.'], ['Evening', 'Have a group dinner in Tonsai village for all seven. Pack and confirm tomorrow’s ferry.']], 'Optional and outside the activity allowance: allow about THB 800–1,500 per adult for a shared boat, plus the national park fee (about THB 400 per foreign adult). Swimming is not allowed at Maya Bay; it is viewed from the beach and boardwalk.');
  days.phiPhiSlow = easyDay('phiPhiSlow', 'Koh Phi Phi', 'Make room for the sea', 'A flexible day · optional snorkeling trip', 'Choose a beach morning or book a separately priced snorkeling excursion.', 'For an excursion, confirm equipment, boat transfers and all park fees before paying.', 'Return with time to pack and confirm tomorrow’s ferry.');
  days.toPhuket = day('toPhuket', 'Phuket', 'A new shore, a little city life', 'Phi Phi → Phuket · four nights in Kamala', 'Travel day', 0, [['Before departure', 'Check out and take your bags to Tonsai Pier for ferry check-in.'], ['Ferry crossing', 'Sail to Rassada Pier in Phuket. Budget THB 450–600 per adult.'], ['Afternoon & evening', 'Take a prebooked van for seven people to the Sky-Villa above Kamala, about 45 minutes. Buy groceries on the way, then watch the sunset from the terrace.']], 'Seven people and luggage need a van, not a taxi. Book it before you sail. The ferry budget excludes the pier-to-villa transfer.', ['toPhuket']);
  days.phuketDay = easyDay('phuketDay', 'Phuket', 'Settle into Kamala', 'Kamala Beach · Laem Sing · villa time', 'Walk down to Kamala Beach for a swim, about 15 minutes from the villa.', 'Visit Laem Sing, a small cove just south of Kamala, or keep the afternoon for the villa pool.', 'Have a seafood dinner on the Kamala beachfront. Optional: Phuket FantaSea is in Kamala; check show days and prices.');
  days.phuketExplore = easyDay('phuketExplore', 'Phuket', 'Old Town and the southern capes', 'Old Town · Big Buddha · Promthep Cape sunset', 'Hire a van for the day and explore Phuket Old Town’s Sino-Portuguese shophouses and Soi Romanee before the midday heat.', 'Visit the Big Buddha on Nakkerd Hill (free; cover shoulders and knees), with a stop at the Karon Viewpoint.', 'Watch the sunset from Promthep Cape, then have dinner in Rawai before driving back to Kamala.');
  days.phuketExplore.tip = 'A day-hire van for seven is usually cheaper and easier than several taxis. Agree the stops and total price in advance; the fare is outside the local-ride allowance.';
  days.phuketSlow = easyDay('phuketSlow', 'Phuket', 'One more beach day', 'Surin Beach · rest · sunset', 'Try Surin Beach, a short ride north of Kamala, or stay at Kamala.', 'Keep the afternoon open for swimming, shopping, or a Thai massage.', 'Enjoy a final island sunset from the villa terrace and confirm tomorrow’s airport van.');
  days.bangkokFinal = easyDay('bangkokFinal', 'Bangkok', 'One last Bangkok day', 'Chatuchak Weekend Market · Pratunam · final evening', 'It is Sunday, so go to Chatuchak Weekend Market early, before the heat (BTS to Mo Chit or a taxi). Keep the group together with a set meeting point.', 'Return to the hotel to cool off. Shop in Pratunam Market and Platinum Mall next door, then pack.', 'Go up to Baiyoke Sky’s observation deck for a farewell view over the city. Check whether guest access is included. Confirm tomorrow’s airport transfer.');
  function itinerary(duration = 17) {
    if (duration !== 17) throw new RangeError('This route takes 17 days and 16 nights.');
    return ['arrival', 'city', 'temples', 'flySouth', 'railay', 'hong', 'toLanta', 'lantaBeach', 'toPhiPhi', 'phiPhiExplore', 'toPhuket', 'phuketDay', 'phuketExplore', 'phuketSlow', 'returnBangkok', 'bangkokFinal', 'home'].map(id => days[id]);
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
  const api = { researchDate, sources, itinerary, calculate, dateAt, styles, stops, places, legs, transfers, internationalFlights };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TravelPlanner = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
