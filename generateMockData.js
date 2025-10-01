// generateMockData.js
// Run: node generateMockData.js
// Output: mockData.json
// Generates 30 HOTEL + TOURS packages per city (nights 1..30) and 10 standalone activities per city.

const fs = require("fs");

// ------------------ Deterministic RNG ------------------
function mulberry32(a){return function(){let t=(a+=0x6D2B79F5);t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
const R = {
  int:(rng,min,max)=>Math.floor(rng()*(max-min+1))+min,
  pick:(rng,arr)=>arr[Math.floor(rng()*arr.length)],
  shuffle:(rng,arr)=>{const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;},
  some:(rng,arr,min=1,max=3)=>R.shuffle(rng,arr).slice(0,Math.max(min,Math.min(max,R.int(rng,min,max))))
};
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

// ------------------ City Configs ------------------
const CITIES = {
  Istanbul: {
    region: "Marmara",
    neighborhoods: ["Sultanahmet","Taksim","Galata","Karaköy","Beşiktaş","Kadıköy","Üsküdar"],
    landmarks: ["Hagia Sophia","Blue Mosque","Topkapı Palace","Grand Bazaar","Galata Tower","Dolmabahçe Palace","Spice Bazaar"],
    airportCodes: ["IST","SAW"],
    activities: [
      { title:"Bosphorus Sunset Cruise", category:"water" },
      { title:"Old City Guided Tour", category:"culture" },
      { title:"Kadıköy Street Food Walk", category:"food" },
      { title:"Traditional Hammam Experience", category:"wellness" },
      { title:"Princes’ Islands Day Trip", category:"sightseeing" }
    ]
  },
  Cappadocia: {
    region: "Central Anatolia",
    neighborhoods: ["Göreme","Uçhisar","Ürgüp","Avanos"],
    landmarks: ["Göreme Open-Air Museum","Uçhisar Castle","Love Valley","Kaymaklı Underground City","Devrent Valley"],
    airportCodes: ["ASR","NAV"],
    activities: [
      { title:"Hot Air Balloon (Sunrise)", category:"adventure" },
      { title:"Red Tour (North Cappadocia)", category:"culture" },
      { title:"Green Tour (South Cappadocia)", category:"culture" },
      { title:"ATV Sunset Safari", category:"adventure" }
    ]
  },
  Antalya: {
    region: "Mediterranean",
    neighborhoods: ["Kaleiçi","Lara","Konyaaltı","Belek","Side","Kemer"],
    landmarks: ["Düden Waterfalls","Hadrian’s Gate","Old Harbor","Antalya Museum","Konyaaltı Beach"],
    airportCodes: ["AYT"],
    activities: [
      { title:"Waterfall Tour", category:"sightseeing" },
      { title:"Old Harbor Boat Trip", category:"water" },
      { title:"Rafting & Jeep Safari", category:"adventure" },
      { title:"Kaleiçi Walking Tour", category:"culture" }
    ]
  },
  Ankara: {
    region: "Central Anatolia",
    neighborhoods: ["Çankaya","Kızılay","Ulus","Sıhhiye"],
    landmarks: ["Anıtkabir","Museum of Anatolian Civilizations","Ankara Castle","Kocatepe Mosque"],
    airportCodes: ["ESB"],
    activities: [
      { title:"Anıtkabir & Museum Highlights", category:"culture" },
      { title:"Old Ankara Walking Tour", category:"sightseeing" },
      { title:"Citadel & Bazaar Stroll", category:"culture" }
    ]
  },
  Izmir: {
    region: "Aegean",
    neighborhoods: ["Konak","Alsancak","Karşıyaka","Bornova","Çeşme","Alaçatı"],
    landmarks: ["Clock Tower","Kemeraltı Bazaar","Agora Open Air Museum","Konak Pier"],
    airportCodes: ["ADB"],
    activities: [
      { title:"Ephesus Day Trip", category:"culture" },
      { title:"Şirince Wine & Village", category:"food" },
      { title:"Alaçatı Beaches Day", category:"leisure" }
    ]
  },
  Fethiye: {
    region: "Aegean",
    neighborhoods: ["Ölüdeniz","Fethiye Center","Çalış Beach","Hisarönü","Kayaköy"],
    landmarks: ["Blue Lagoon","Butterfly Valley","Saklıkent Gorge","Kayaköy Ghost Town","Fethiye Marina"],
    airportCodes: ["DLM"],
    activities: [
      { title:"Ölüdeniz Tandem Paragliding", category:"adventure" },
      { title:"12 Islands Boat Tour", category:"water" },
      { title:"Saklıkent Gorge & Rafting", category:"adventure" },
      { title:"Kayaköy Hike & Beach", category:"sightseeing" }
    ]
  }
};

const BOARD_TYPES = ["RO","BB","HB","FB","AI"]; // RoomOnly/Bed&Breakfast/Half/Full/All-inclusive
const LANG_DEFAULT = ["EN"];
const LANG_EXT = ["EN","TR","AR"];

// ------------------ Text + Pricing Builders ------------------
function overview(city, nights){
  return `Explore ${city} over ${nights} ${nights===1?"night":"nights"} with a curated blend of guided tours and free time. Stay in a central hotel, enjoy convenient transfers, and add optional experiences to match your style. Ideal for first-timers and repeat visitors.`;
}
function inclusionsStay(cfg, rng, nights){
  const stars = R.int(rng,3,5);
  const transferType = rng()<0.5? "shared" : "private";
  // At least 1 included activity; others optional upsells.
  return [
    `Airport transfers (${transferType})`,
    `${nights} ${nights===1?"night":"nights"} hotel (${stars}★) with breakfast`,
    "Guided highlights tour (tickets where listed)",
    "Local support (EN)"
  ];
}
const exclusionsBase = ["International flights","Meals not specified","Personal expenses & tips","City tax if applicable"];
const importantBase = ["Some sites close on select days; itinerary may adjust.","Dress modestly for mosques (headscarf for women).","Traffic can affect pickup times."];

function itinerary(rng, city, nights, landmarks){
  const days = [];
  const lm = R.shuffle(rng, landmarks);
  for(let d=1; d<=Math.min(nights+1, 10); d++){
    const isArr = d===1, isDep = d===(nights+1);
    const title = isArr? "Arrival & Orientation" : isDep? "Departure" : R.pick(rng,["City Highlights","Neighborhood Walk","Museums & Markets","Scenic Views","Coast & Cruise"]);
    const more = isArr
      ? ["Meet & greet at airport","Transfer to hotel","Evening stroll near hotel"]
      : isDep
      ? ["Check-out assistance","Transfer to airport (3–4h pre-flight)"]
      : [
        `Visit: ${lm[(d-2)%lm.length]}`,
        "Guided commentary & photo stops",
        R.pick(rng,["Street food tasting (optional)","Free time for shopping","Optional ticketed site"]) 
      ];
    days.push({
      day:d,
      title,
      summary: isArr?`Arrival in ${city}`:isDep?"Departure day.":`Exploring ${city}'s key sights.`,
      more,
      timeWindow: (isArr||isDep) ? undefined : R.pick(rng,["09:00–16:00","10:00–15:00","13:00–18:00"]),
      meals: { breakfast: !isArr, lunch:false, dinner:false }
    });
  }
  return days;
}

function basePrice(rng, city, nights, boardType){
  const cityWeight = { Istanbul:145, Cappadocia:125, Antalya:135, Ankara:100, Izmir:115, Fethiye:130 }[city]||115;
  const uplift = { RO:0, BB:10, HB:25, FB:40, AI:70 }[boardType]||0;
  const noise = R.int(rng,-15,25);
  return Math.max(90, Math.round((cityWeight + uplift + noise) * nights * 0.65));
}

function gallery(rng){
  const ids = R.shuffle(rng, Array.from({length:16},(_,i)=>i+1));
  return [
    { url:`https://picsum.photos/id/${ids[0]}/1200/800`, alt:"Image 1" },
    { url:`https://picsum.photos/id/${ids[1]}/1200/800`, alt:"Image 2" },
    { url:`https://picsum.photos/id/${ids[2]}/1200/800`, alt:"Image 3" }
  ];
}

// ------------------ Builders ------------------
function buildStandaloneActivities(rng, city, cfg, count){
  const acts = [];
  for(let i=0;i<count;i++){
    const base = R.pick(rng, cfg.activities);
    const id = `${slugify(city)}-act-${slugify(base.title)}-${i+1}`;
    acts.push({
      id,
      slug: slugify(`${city}-${base.title}-${i+1}`),
      city,
      title: base.title,
      category: base.category,
      summary: R.pick(rng,[
        "Guided small-group experience with local expert.",
        "Top sights in a compact itinerary.",
        "Perfect for travelers already in town."
      ]),
      duration: R.pick(rng,["2h","3h","4h","6h","Full day"]),
      operatingDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      startTimes: ["09:00","13:00","16:00"],
      price: { currency:"USD", perPerson: R.int(rng,25,120) },
      meetingPoint: `${R.pick(rng,cfg.neighborhoods)} central point`,
      hotelPickup: rng()<0.35,
      inclusions: R.some(rng,["Guide","Tickets","Tea/Coffee","Equipment","Shuttle"],1,3),
      exclusions: R.some(rng,["Meals","Personal expenses","Tips","Hotel pickup"],1,2),
      language: rng()<0.6? ["EN"] : ["EN","TR"],
      bookingCutoff: R.pick(rng,["6h before","24h before"]),
      cancellationPolicy: rng()<0.85? "Free up to 24h":"Non-refundable",
      images: [{ url:`https://picsum.photos/seed/${id}/1200/800`, alt:`${city} activity` }],
      yearRound: true,
      unavailableMonths: []
    });
  }
  return acts;
}

function buildPackage(rng, city, cfg, idx, nights, cityActivities){
  // package = hotel + activities + full itinerary
  const boardType = R.pick(rng, BOARD_TYPES);
  const hood = R.pick(rng, cfg.neighborhoods);
  const near = R.pick(rng, cfg.landmarks);
  const nameCore = R.pick(rng,[
    "Classics & Highlights","Essentials","Culture & Flavors","Premium Escape",
    "Family Time","Boutique Stay","Coast & Cruise","Adventure & Heritage"
  ]);
  const name = `${city} ${nameCore} (${nights}N)`;
  const id = `${slugify(city)}-${slugify(nameCore)}-${nights}n-${idx}`;
  const slug = slugify(`${city}-${nameCore}-${nights}-nights-${idx}`);

  // choose included activities (1–3) by reference to standalone list
  const actRefs = R.some(rng, cityActivities.map(a=>({ id:a.id, title:a.title })), 1, Math.min(3, cityActivities.length));

  return {
    id,
    slug,
    packageType: "stay-package",
    featured: rng()<0.12,
    name,
    tagline: R.pick(rng,["Iconic sights + time to wander","Guided highlights with free time","Central stays made easy"]),
    country: "Türkiye",
    region: cfg.region,
    city,
    locationLine: `${hood} • ${R.int(rng,200,1200)} m to ${near}`,
    boardType,
    badges: [boardType, rng()<0.75?"Free cancellation":"Non-refundable", rng()<0.6?"Transfers":"Central"],
    heroImage: { url:`https://picsum.photos/seed/${slug}/1600/900`, alt:`${city} skyline` },
    gallery: gallery(rng),
    nights,
    overview: overview(city, nights),
    inclusions: [...inclusionsStay(cfg, rng, nights), `Included activities: ${actRefs.map(a=>a.title).join(", ")}`],
    exclusions: exclusionsBase,
    accommodation: {
      name: `${hood} Boutique Hotel (or similar)`,
      starRating: R.int(rng,3,5),
      roomType: R.pick(rng,["Standard double/twin","Superior room","Deluxe room"])
    },
    transfers: {
      arrivalIncluded: true,
      departureIncluded: true,
      mode: rng()<0.5? "Shared shuttle":"Private car",
      airportCodes: cfg.airportCodes
    },
    guideLanguage: rng()<0.5? LANG_DEFAULT : LANG_EXT,
    yearRound: true,
    unavailableMonths: [],
    itineraryDays: itinerary(rng, city, nights, cfg.landmarks),
    importantInfo: importantBase,
    includedActivities: actRefs, // << handy for UI cross-links
    pricing: {
      currency: "USD",
      fromPricePerPerson: basePrice(rng, city, nights, boardType)
    },
    cancellationPolicy: rng()<0.85? "Free up to 24h":"Non-refundable"
  };
}

// ------------------ Orchestrator ------------------
function generateAll({
  seed = 20250930,
  cities = Object.keys(CITIES),
  packagesPerCity = 30,
  activitiesPerCity = 10,
  minNights = 1,
  maxNights = 30
} = {}){
  const rng = mulberry32(seed);
  const allActivities = [];
  const allPackages = [];

  // First create standalone activities per city (so packages can reference them)
  const cityActsMap = {};
  for(const city of cities){
    const cfg = CITIES[city];
    const acts = buildStandaloneActivities(rng, city, cfg, activitiesPerCity);
    cityActsMap[city] = acts;
    allActivities.push(...acts);
  }

  // Then create packages per city, nights spread 1..30
  for(const city of cities){
    const cfg = CITIES[city];
    for(let i=0;i<packagesPerCity;i++){
      const nights = minNights + (i % (maxNights - minNights + 1)); // cycles 1..30
      const pkg = buildPackage(rng, city, cfg, i+1, nights, cityActsMap[city]);
      allPackages.push(pkg);
    }
  }

  return {
    packages: allPackages,
    activities: allActivities,
    meta: { seed, generatedAt: new Date().toISOString(), packagesPerCity, activitiesPerCity }
  };
}

// ------------------ Run & write ------------------
const data = generateAll({
  seed: 77,
  cities: ["Istanbul","Cappadocia","Antalya","Ankara","Izmir","Fethiye"],
  packagesPerCity: 30,
  activitiesPerCity: 10,
  minNights: 1,
  maxNights: 30
});

fs.writeFileSync("mockData.json", JSON.stringify(data, null, 2), "utf-8");
console.log(`✔ Generated ${data.packages.length} packages and ${data.activities.length} activities across ${new Set(data.packages.map(p=>p.city)).size} cities.`);


