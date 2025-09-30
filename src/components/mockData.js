export const packagesData = [
  {
    id: 1,
    name: 'Santorini Cliffs Resort',
    title: 'Santorini Cliffs Resort',
    location: 'Oia, Santorini',
    distance: '500 m from center',
    image: '/images/santorini.jpg',
    nights: '4 nights',
    starRating: 5,
    reviewScore: 9.2,
    reviewsCount: 812,
    price: 1680,
    priceUnit: '/person',
    boardType: 'Breakfast included',
    features: ['Couples', 'Beachfront', 'Free cancellation'],
    inclusions: ['Flights', 'Meals', 'Airport transfer', 'Flexible dates'],
    description: 'Cliffside luxury with world-famous sunsets and caldera views.',
    itinerary: [
      { day: 1, title: 'Arrival & Sunset Stroll', details: 'Airport transfer, check-in, explore Oia lanes, sunset viewing.', more: ['Private transfer from airport (30–40 min)', 'Check-in and welcome drink', 'Golden hour walk to Oia Castle viewpoint'] },
      { day: 2, title: 'Caldera Cruise', details: 'Half-day cruise with swimming and onboard lunch.', more: ['Snorkeling gear provided', 'Onboard BBQ with vegetarian options', 'Return transfer included'] },
      { day: 3, title: 'Island Discovery', details: 'Visit Fira and Pyrgos, winery tasting optional.', more: ['Guided walk in Fira', 'Stop at Blue Dome Church photo spot', 'Boutique winery tasting (optional add-on)'] },
      { day: 4, title: 'Leisure & Departure', details: 'Relax by the pool before transfer to airport.', more: ['Late checkout subject to availability', 'Baggage assistance', 'Return airport transfer'] }
    ],
    importantInfo: [
      'A city tax may be collected at property.',
      'Passport must be valid for at least 6 months on arrival.',
      'Free cancellation up to 7 days before check-in.'
    ]
  },
  {
    id: 2,
    name: 'Tokyo Urban Stay',
    title: 'Tokyo Urban Stay',
    location: 'Shinjuku, Tokyo',
    distance: '0.8 km from Shinjuku Station',
    image: '/images/tokyo.jpg',
    nights: '7 nights',
    starRating: 4,
    reviewScore: 8.7,
    reviewsCount: 1543,
    price: 1295,
    priceUnit: '/person',
    boardType: 'Room only',
    features: ['City center', 'Activities'],
    inclusions: ['Flights', 'Flexible dates'],
    description: 'Modern rooms steps from neon boulevards, ramen alleys, and parks.',
    itinerary: [
      { day: 1, title: 'Arrival & Shinjuku', details: 'Airport train, check-in, evening in Omoide Yokocho.', more: ['Suica/PASMO card setup assistance', 'Ichiran ramen suggestion nearby', 'Neon alley photo walk'] },
      { day: 2, title: 'Shibuya & Harajuku', details: 'Scramble crossing, Meiji Shrine, Takeshita Street.', more: ['Hachiko statue meetup', 'Omotesando architecture stroll', 'Crepe stop on Takeshita'] },
      { day: 3, title: 'Asakusa & Akihabara', details: 'Senso-ji Temple and electronics/anime district.', more: ['Nakamise shopping street', 'Retro arcade visit', 'Gundam cafe (if open)'] },
      { day: 4, title: 'Free day', details: 'Optional day trip to Mt. Fuji/Hakone.', more: ['Hakone loop with pirate ship', 'Fuji Five Lakes viewpoint', 'TeamLab Planets alternative in Tokyo'] }
    ],
    importantInfo: [
      'JR Pass not included unless selected.',
      'Some venues may require cash; ATMs widely available.',
      'Check local guidance for visa-free entry durations.'
    ]
  },
  {
    id: 3,
    name: 'Swiss Alpine Lodge',
    title: 'Swiss Alpine Lodge',
    location: 'Zermatt, Switzerland',
    distance: 'Ski-in / Ski-out',
    image: '/images/swiss-alps.jpg',
    nights: '6 nights',
    starRating: 5,
    reviewScore: 9.5,
    reviewsCount: 623,
    price: 2310,
    priceUnit: '/person',
    boardType: 'Half board',
    features: ['Activities', 'Family-friendly'],
    inclusions: ['Flights', 'Meals', 'Lift passes'],
    description: 'Cozy wooden interiors, mountain spa, and glacier-side dining.',
    itinerary: [
      { day: 1, title: 'Arrival in Zermatt', details: 'Train to car-free Zermatt, check-in, village walk.', more: ['Glacier Express arrival option', 'Matterhorn viewpoint orientation', 'Fondue dinner recommendation'] },
      { day: 2, title: 'Ski Day / Gornergrat', details: 'Ski passes included; panorama ride if not skiing.', more: ['Ski rental fitting in morning', 'Gornergrat Bahn scenic ride', 'Hot chocolate stop on-mountain'] },
      { day: 3, title: 'Spa & Glacier Views', details: 'Relax at spa, optional glacier hike (seasonal).', more: ['Thermal circuit access', 'Ice grotto visit (seasonal)', 'Evening in old town'] }
    ],
    importantInfo: [
      'Winter gear rental available on site.',
      'Mountain weather can change rapidly—pack layers.',
      'Some activities are seasonal.'
    ]
  },
  {
    id: 4,
    name: 'Maldives Overwater Villas',
    title: 'Maldives Overwater Villas',
    location: 'South Ari Atoll',
    distance: 'Private island',
    image: '/images/maldives.jpg',
    nights: '5 nights',
    starRating: 5,
    reviewScore: 9.1,
    reviewsCount: 402,
    price: 2890,
    priceUnit: '/person',
    boardType: 'All-inclusive',
    features: ['Beachfront', 'All-inclusive', 'Free cancellation'],
    inclusions: ['Seaplane transfer', 'Meals', 'Water sports'],
    description: 'Turquoise lagoons and coral reefs at your villa doorstep.',
    itinerary: [
      { day: 1, title: 'Seaplane Transfer', details: 'Arrive Male, seaplane to resort, sunset dinner.', more: ['Meet & greet at MLE', 'Seaplane lounge access', 'Romantic dinner by the beach'] },
      { day: 2, title: 'Reef Snorkeling', details: 'Guided house reef tour, kayaking in lagoon.', more: ['Marine biologist briefing', 'Underwater photography (optional)', 'Clear kayak rental'] },
      { day: 3, title: 'Spa & Sandbank Picnic', details: 'Couple spa treatment and private sandbank lunch.', more: ['60-min couple massage', 'Champagne picnic', 'Drone photo session (optional)'] },
      { day: 4, title: 'Leisure', details: 'Paddleboarding, marine life talk at sunset.', more: ['SUP boards provided', 'Sunset dolphin cruise (optional)', 'Night cinema under stars'] },
      { day: 5, title: 'Departure', details: 'Seaplane back to Male, onward flight.', more: ['Late breakfast', 'Assisted checkout', 'Seaplane transfer to MLE'] }
    ],
    importantInfo: [
      'Seaplane transfers operate during daylight hours only.',
      'All-inclusive inclusions vary by resort; check documentation.',
      'No alcohol allowed in Male city outside licensed venues.'
    ]
  },
  {
    id: 5,
    name: 'Bali Jungle Retreat',
    title: 'Bali Jungle Retreat',
    location: 'Ubud, Bali',
    distance: '2.1 km from Ubud Palace',
    image: '/images/bali.jpg',
    nights: '8 nights',
    starRating: 4,
    reviewScore: 8.9,
    reviewsCount: 981,
    price: 1390,
    priceUnit: '/person',
    boardType: 'Breakfast included',
    features: ['Activities', 'Family-friendly'],
    inclusions: ['Flights', 'Airport transfer', 'Yoga class'],
    description: 'Lush rainforest hideaway with infinity pools and rice terrace views.',
    itinerary: [
      { day: 1, title: 'Ubud Arrival', details: 'Airport transfer, check-in, Ubud market walk.', more: ['Welcome fruit platter', 'Craft market browsing', 'Campuhan Ridge sunset'] },
      { day: 2, title: 'Temples & Rice Terraces', details: 'Tirta Empul, Tegalalang, coffee plantation.', more: ['Sarong provided for temple', 'Swing photo stop (optional)', 'Luwak coffee tasting'] },
      { day: 3, title: 'Wellness Day', details: 'Yoga class and Balinese massage.', more: ['Morning vinyasa class', '90-min Balinese massage', 'Healthy set lunch'] }
    ],
    importantInfo: [
      'Modest attire recommended at temples.',
      'Monkeys may approach in Ubud Monkey Forest—avoid feeding.',
      'Travel insurance recommended for activities.'
    ]
  },
  {
    id: 6,
    name: 'NYC Skyline Suites',
    title: 'NYC Skyline Suites',
    location: 'Manhattan, New York',
    distance: '300 m from Times Square',
    image: '/images/new-york.jpg',
    nights: '3 nights',
    starRating: 5,
    reviewScore: 8.5,
    reviewsCount: 2011,
    price: 1780,
    priceUnit: '/person',
    boardType: 'Room only',
    features: ['City center', 'Free cancellation'],
    inclusions: ['Flights', 'Priority check-in'],
    description: 'Floor-to-ceiling views, designer bedding, and skyline lounge access.',
    itinerary: [
      { day: 1, title: 'Midtown & Times Square', details: 'Check-in, evening lights walk.', more: ['Bryant Park and library', 'Times Square billboards', 'Rooftop bar suggestion'] },
      { day: 2, title: 'Central Park & Museums', details: 'Park stroll, MoMA or Met visit.', more: ['Bow Bridge photo stop', 'MoMA timed entry suggestion', '5th Ave window shopping'] },
      { day: 3, title: 'Downtown Icons', details: 'Brooklyn Bridge, One World, Soho shopping.', more: ['DUMBO skyline shots', '9/11 Memorial visit', 'SoHo boutique crawl'] }
    ],
    importantInfo: [
      'Resort fees may apply and are payable at property.',
      'Subway MetroCard not included.',
      'Some observatories require timed-entry tickets.'
    ]
  }
];


