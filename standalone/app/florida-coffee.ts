// ─────────────────────────────────────────────────────────────────────────
// Florida specialty coffee — researched from shops' live websites by a
// multi-agent sweep (one researcher per metro), then each shop verified by a
// second agent that fetched the site and confirmed the beans/notes actually
// appear there. Unverifiable shops were dropped.
//
// Bean names and tasting notes are the roasters' own words. Menus rotate —
// treat notes as a snapshot, and follow the website link for today's list.
// ─────────────────────────────────────────────────────────────────────────

export interface ShopBean {
  name: string;
  roastLevel?: string;
  notes: string;
  origin?: string;
}

export interface CoffeeShop {
  name: string;
  city: string;
  region: "miami" | "orlando" | "tampa" | "jax";
  website: string;
  summary: string;
  roastsOwn: boolean;
  beans: ShopBean[];
  offers: string;
}

export const REGION_LABELS: Record<CoffeeShop["region"], string> = {
  miami: "Miami & South Florida",
  orlando: "Orlando & Central Florida",
  tampa: "Tampa Bay",
  jax: "North Florida",
};

// Filled by the verified research pass — see the workflow note above.
export const FLORIDA_SHOPS: CoffeeShop[] = [
  {
    "name": "Panther Coffee",
    "city": "Miami (Wynwood, Coconut Grove, Little River, Brickell)",
    "region": "miami",
    "website": "https://panthercoffee.com",
    "summary": "Miami's first and best-known small-batch specialty roaster, anchored in Wynwood since 2010; Sunset Harbour cafe closed Feb 2026 but multiple Miami cafes remain open.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "1927 - Panther Coffee Blend",
        "notes": "Dark chocolate, nutty and syrupy, creamy, mellow and balanced — classic and traditional; bold dark chocolate up front, toasted hazelnut and almond, creamy syrupy finish without bitterness.",
        "roastLevel": "Dark (traditional Italian espresso style)"
      },
      {
        "name": "CASA - Panther Coffee Blend (USDA Organic)",
        "notes": "Milk chocolate, caramel, apricot, black cherries, baking spices; silky and sweet. Versatile, floral and fruit-forward with a sweet caramel finish.",
        "origin": "Blend of washed coffees from smallholder farmers in South/Central America and Ethiopia"
      },
      {
        "name": "EAST COAST ESPRESSO - Panther Coffee Blend",
        "notes": "Very creamy, soft round chocolate, sweet black cherry, ripe coffee fruit, fresh sugarcane finish.",
        "roastLevel": "Medium-light espresso"
      }
    ],
    "offers": "Coffee subscriptions (choose your coffee, whole bean or ground, and delivery frequency) via panthercoffee.com/pages/suscriptions; Breville x Panther promotion confirmed on the site: buying any brewing equipment unlocks 20% off your first six coffee subscription shipments."
  },
  {
    "name": "Per'La Specialty Roasters",
    "city": "Coral Gables / Miami",
    "region": "miami",
    "website": "https://drinkperla.com",
    "summary": "Roast-to-order specialty roaster founded in Coral Gables in 2015 by two University of Miami alumni; supplies Miami's luxury hotels and runs its own House of Per'La cafe.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Light Roast Blend",
        "notes": "Grapefruit, apple, caramel, and roasted hazelnuts — citric, sweet, and complex; 100% Arabica (Bourbon, Typica, Caturra varietals).",
        "roastLevel": "Light",
        "origin": "Central and South America"
      },
      {
        "name": "Dark Roast Blend",
        "notes": "Dark chocolate, raspberry, caramel, and sugar cane sweetness — bold and rich; Bourbon, Mundo Novo, and Typica varietals grown at 900-1,500 MASL.",
        "roastLevel": "Dark",
        "origin": "Indonesia plus Central and South America"
      },
      {
        "name": "Cold Brew Blend",
        "notes": "Caramel, grape, raisin, and chocolate.",
        "roastLevel": "Medium"
      }
    ],
    "offers": "Coffee subscriptions confirmed on-site: African Single Origin, South and Central America Single Origin, Espresso, and Office Coffee subscription products. Per'La Coffee Rewards loyalty program confirmed at /pages/loyalty-program (\"shop, earn, redeem\" — 5 points per $1, referral/birthday bonuses, points redeemable for discount and free-shipping coupons). Could not confirm the blanket \"free shipping on subscriptions\" or \"pause/skip/cancel anytime\" wording since product pages were bot-blocked."
  },
  {
    "name": "Vice City Bean",
    "city": "Miami (Wynwood/A&E District, Brickell, The Citadel)",
    "region": "miami",
    "website": "https://vicecitybean.com",
    "summary": "Three-location Miami specialty cafe (since 2016) known for serving Madcap Coffee alongside its own house-label beans, nitro cold brew, and brewing classes.",
    "roastsOwn": false,
    "beans": [
      {
        "name": "Midtown Espresso",
        "notes": "Chocolate, berries, and caramel — a blend of seasonal washed and natural coffees built for a balanced year-round cup, great with milk or brewed black.",
        "origin": "Colombia and Ethiopia"
      }
    ],
    "offers": ""
  },
  {
    "name": "Wells Coffee Company",
    "city": "Fort Lauderdale (Flagler Village and Tarpon River)",
    "region": "miami",
    "website": "https://wellscoffees.com",
    "summary": "Family-run Fort Lauderdale roaster-cafe that small-batch roasts daily in its Flagler Village flagship and stamps every bag with the roast date.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "No. 9",
        "notes": "Chocolatey, creamy and approachable barista-forward espresso full of chocolate, citrus and tart red fruit, with notes of dried fruit; named after the John Lennon refrain in The Beatles' Revolution 9. From $16, subscription $15 (wellscoffees.com/products/no-9).",
        "origin": "Signature espresso blend"
      },
      {
        "name": "Horizon",
        "notes": "Robust, full-bodied blend of Indonesian and East African coffees roasted on the dark side — roasty flavor with a low-acid, sweet finish; a go-to filter coffee. $18 (wellscoffees.com/products/horizon-1).",
        "roastLevel": "Dark",
        "origin": "Indonesia and East Africa"
      },
      {
        "name": "Pedestrian",
        "notes": "South and Central American coffees with a tiny amount of specialty-grade Robusta for an exceptionally delicious full-body espresso; also works as a full-flavored cold brew or daily drip. $17 (wellscoffees.com/products/pedestrian-2).",
        "origin": "South and Central America plus specialty-grade Robusta"
      }
    ],
    "offers": "Coffee subscriptions with weekly, bi-weekly, monthly, 3-month, or 6-month delivery frequencies, skippable or cancellable anytime (per-blend subscriptions, e.g. No. 9 at $15/delivery vs $16 one-off). Roaster's Choice subscription sends curated fresh-roasted 8oz microlot or 10oz single-farm offerings. A 12-month prepaid subscription includes free shipping on every delivery."
  },
  {
    "name": "Subculture Coffee Roasters",
    "city": "West Palm Beach (roasting HQ on Clematis St; also Palm Beach Gardens, Delray Beach, Jupiter)",
    "region": "miami",
    "website": "https://www.subculturecoffee.com",
    "summary": "Palm Beach County's in-house roaster on Clematis Street, roasting small-batch single origins and espresso blends daily with a rotating seasonal lineup, plus local craft beer and vegan baked goods.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Espresso (12 oz Bag)",
        "notes": "Notes of stone fruit and floral aromatics balanced against brown sugar and chocolate for depth and dimension.",
        "roastLevel": "Light to medium"
      },
      {
        "name": "Cult Classic Blend (12 oz Bag)",
        "notes": "Darker, nostalgic flavor profile with notes of raisin, toasted marshmallow, and a dark chocolate finish.",
        "roastLevel": "Darker"
      },
      {
        "name": "Huila Decaf",
        "notes": "Sugar cane processed decaf with dark molasses sweetness and a solid body reminiscent of raisin bran cereal.",
        "origin": "Huila, Colombia"
      }
    ],
    "offers": "Coffee subscriptions via their online shop (Espresso, Cult Classic, and Decaf subscriptions from $17.50/month, with two- and three-bag options); rotating single origins such as Adado, Yirgacheffe (Natural Process) sold in 12 oz bags."
  },
  {
    "name": "Eternity Coffee Roasters",
    "city": "Miami",
    "region": "miami",
    "website": "https://www.eternitycoffeeroasters.com",
    "summary": "Farm-direct micro-lot roaster (family-owned farms near Medellin, Colombia); its longtime downtown Miami cafe closed in 2023 but it still roasts daily and ships online and to Whole Foods across Florida.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "El Boton - Sun Dried Natural Maragogipe",
        "notes": "Bright blueberry, raspberry, milk chocolate, banana/mango and hints of pistachio; single-estate coffee from giant Maragogipe beans grown on the cofounders' family farm.",
        "origin": "Antioquia, Colombia"
      }
    ],
    "offers": ""
  },
  {
    "name": "Imperial Moto",
    "city": "Miami (Little River flagship, plus Aventura Mall)",
    "region": "miami",
    "website": "https://www.imperialmoto.com",
    "summary": "Moto-inspired cafe, in-house roastery, and lifestyle brand founded 2016 in Little River, roasting daily with coffee sourced from farms in Brazil and Colombia.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Miami Blend",
        "notes": "Caramel, milk chocolate, and red berries — smooth and rich, designed with Miami coffee culture in mind; perfect for cortados, cappuccinos, and cafe con leche.",
        "roastLevel": "Medium"
      },
      {
        "name": "Dark Horse Blend",
        "notes": "Dark chocolate, panela, and milk caramel — a bold, Miami-inspired Italian-style roast, perfect for espresso or any brew.",
        "roastLevel": "Medium-Dark"
      },
      {
        "name": "Cafe Racer Blend",
        "notes": "Salted caramel, blackberry, and chocolate — a balanced blend of Central and South American coffees crafted for versatility across brewing methods.",
        "roastLevel": "Medium",
        "origin": "Central and South America"
      }
    ],
    "offers": ""
  },
  {
    "name": "Lineage Coffee Roasting",
    "city": "Orlando, FL",
    "region": "orlando",
    "website": "https://www.lineageroasting.com/",
    "summary": "Orlando's anchor specialty roaster with three cafes (East End Market, Mills 50, UCF) roasting single-plot coffees in-house since 2012.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Modern American",
        "notes": "Brown sugar, red grape",
        "roastLevel": "Lighter espresso roast (also suited to batch brew)",
        "origin": "Huila, Colombia (castillo, caturra, colombia varietals)"
      },
      {
        "name": "Ethiopia, Banko Gutiti",
        "notes": "Floral, Sprite",
        "origin": "Gedeb, Yirgacheffe, Ethiopia"
      },
      {
        "name": "Ethiopia, Worka",
        "notes": "Dark cherry, honey",
        "origin": "Yirgacheffe, Gedeo, Ethiopia"
      }
    ],
    "offers": "Coffee subscriptions at one flat price plus shipping: Roasters Choice rotating single-plot subscription delivers a new single-plot coffee at peak roast and samples all current roasts (except Modern American and 431), with limited-edition roasts included at no extra charge; standing subscriptions also offered for 431°, Modern American ($15.20 seen on product page), Dark & Cozy, and Colombia Select Decaf; cancel or change anytime at no charge. (Specific subscription prices $14.90/$14.95/$15.35 not visible in verified snippets.)"
  },
  {
    "name": "Foxtail Coffee Co.",
    "city": "Winter Park, FL",
    "region": "orlando",
    "website": "https://www.foxtailcoffee.com/",
    "summary": "Born and brewed in Winter Park since 2016, Foxtail grew from a flagship roastery cafe into Central Florida's largest local specialty coffee chain.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Espresso Blend",
        "notes": "Chocolate hints and roasted peanuts",
        "roastLevel": "Medium"
      },
      {
        "name": "Midnight Oil Blend",
        "notes": "Smooth, rich, bold; dark roast, 100% Arabica, roasted in Winter Park, FL",
        "roastLevel": "Dark"
      },
      {
        "name": "Roaster's Select",
        "notes": "Papua New Guinea selection: almond, berry, toffee; limited quantities, whole bean only, changes monthly",
        "origin": "Rotating monthly exclusive single origin (recent selection: Papua New Guinea)"
      }
    ],
    "offers": "Coffee bean subscriptions at shop.foxtailcoffee.com (SUBSCRIBE page plus subscription products, e.g. a 5lb-bag coffee subscription); Foxtail Coffee app loyalty program confirmed on the site's App FAQ: 1 point per $1 spent, 100 points earns a free beverage, and a free birthday drink (added to app wallet, valid 30 days)."
  },
  {
    "name": "Stemma Craft Coffee",
    "city": "Orlando, FL (downtown)",
    "region": "orlando",
    "website": "https://www.stemmacraftcoffee.com/",
    "summary": "Family-owned (mother-daughter) shop and micro-roastery run by 4th-generation coffee farmers who roast beans from their own hacienda, Finca La Misericordia, in Jinotega, Nicaragua.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "El Horno",
        "notes": "Cherry, meyer lemon, and cascara with a rich but incredibly smooth body; naturally processed, positioned as a modern espresso",
        "origin": "Finca La Misericordia, Jinotega, Nicaragua (natural process)"
      },
      {
        "name": "La Sultana",
        "notes": "Blood orange, dark chocolate, and toffee",
        "origin": "Parainema hybrid variety (originating from Honduras)"
      }
    ],
    "offers": ""
  },
  {
    "name": "Lobos Coffee Roasters",
    "city": "Orlando, FL (Audubon Park)",
    "region": "orlando",
    "website": "https://loboscoffeeroasters.com/",
    "summary": "Small-batch neighborhood roaster and cafe on Corrine Drive that pairs serious in-house roasting with a local beer and wine menu.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Casa Del Sol: Espresso Blend",
        "notes": "Plum, dried cranberry, oolong tea with a tangy mandarin finish"
      },
      {
        "name": "Bungalower Blend",
        "notes": "Dark chocolate, nutmeg, a hint of maraschino cherries, low acidity"
      },
      {
        "name": "Panamanian Geisha Coffee",
        "notes": "Vibrant and complex floral taste",
        "origin": "Panama"
      }
    ],
    "offers": ""
  },
  {
    "name": "Concord Coffee",
    "city": "Lakeland, FL",
    "region": "orlando",
    "website": "https://concordcoffee.com/",
    "summary": "Lakeland's small-batch roastery-cafe on South Florida Avenue, roasting every bean in town and expanding with a second location at Orlando Health Lakeland Highlands.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Bright & Balanced",
        "notes": "Floral and citrus tasting notes that create a well balanced cup; notes of citrus, floral, and butterscotch"
      },
      {
        "name": "Sweet & Smooth",
        "notes": "Sweet fruit and a smooth finish; notes of berry jam, raw sugar, and cherries"
      },
      {
        "name": "The Concord Classic",
        "notes": "Everyday roast for brewing every morning, great black or with cream and sugar; notes of chocolate, hazelnut, and caramel"
      }
    ],
    "offers": "Monthly coffee subscription at $20.00/bag with free shipping: choose The Concord Classic, Sweet & Smooth, or Bright & Balanced, ground or whole bean, automatically delivered once a month (concordcoffee.com/collections/subscriptions)."
  },
  {
    "name": "Deeply Cafe and Bottle Shop",
    "city": "Orlando, FL (downtown, plus Winter Garden)",
    "region": "orlando",
    "website": "https://www.deeplycafeandbottleshop.com/",
    "summary": "Minimalist downtown multi-roaster cafe (est. 2018) pouring bright seasonal coffees from world-class partners like Sey, Drop, and La Cabra, paired with a natural wine bottle shop.",
    "roastsOwn": false,
    "beans": [],
    "offers": ""
  },
  {
    "name": "Craft & Common",
    "city": "Orlando, FL (downtown, plus Lake Mary and Oviedo/UCF)",
    "region": "orlando",
    "website": "https://craftandcommon.com/",
    "summary": "Downtown Orlando cafe featuring guest roasters from across the country, known for signature drinks like the Pacific Fog (lavender-honey-sea salt latte) and The Dunes citrus cafe con leche.",
    "roastsOwn": false,
    "beans": [],
    "offers": ""
  },
  {
    "name": "Buddy Brew Coffee",
    "city": "Tampa",
    "region": "tampa",
    "website": "https://www.buddybrew.com",
    "summary": "Tampa's flagship 'Brew Good. Do Good.' roaster since 2010, with multiple cafes around the bay and beans roasted and shipped same day.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Golden Hour Roast",
        "notes": "Harmonious balance of bright citrus notes and sweet, balanced flavors; approachable yet complex, works black or with milk",
        "roastLevel": "Medium",
        "origin": "Brazil + Colombia"
      },
      {
        "name": "USF Bulls Blend",
        "notes": "Full-bodied, smooth and satisfying with hints of dark chocolate, sweet cherries and toasted walnuts",
        "origin": "El Salvador + Ethiopia"
      },
      {
        "name": "Cubano Espresso",
        "notes": "Nutty profile with dark spice undertones; a modern take on traditional Cuban espresso",
        "origin": "Proprietary espresso blend (collab with Tampa's Cigar City Brewing)"
      }
    ],
    "offers": "Perpetual Brew subscription: subscribe & save 5% on every order with delivery every 1, 2, 3, or 4 weeks; 3-Bag Sampler Subscription (three 6 oz bags of rotating coffees monthly); 30% off first subscription shipment with code SAVE30. (Office/bulk subscription not confirmed.)"
  },
  {
    "name": "Kahwa Coffee Roasting",
    "city": "St. Petersburg",
    "region": "tampa",
    "website": "https://kahwacoffee.com",
    "summary": "French-founded boutique roaster (est. 2006) headquartered in St. Pete with cafes across Tampa Bay and Sarasota, known for small-batch 100% Arabica roasting and nitro cold brew.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Sirocco",
        "notes": "Full-bodied, balanced blend with notes of dark cherry and honey; extremely smooth finish with minimal acidity. Billed as the perfect everyday blend, also excellent as cold brew.",
        "roastLevel": "Medium-dark",
        "origin": "Blend of beans from four countries"
      },
      {
        "name": "Cubano",
        "notes": "Traditional Cuban-style espresso blend — strong and robust with a sweet finish and bold crema; best as espresso or cafe con leche. Roasted to order in the St. Petersburg facility.",
        "roastLevel": "Dark"
      },
      {
        "name": "Hope Roast",
        "notes": "Charity blend with a hint of chocolate, smooth taste and low acidity; 43% of net proceeds go to the National Pediatric Cancer Foundation.",
        "roastLevel": "Dark"
      }
    ],
    "offers": "Coffee subscriptions with small-batch, roasted-fresh-per-shipment delivery (free shipping on subscriptions over $45; site also advertises free shipping on orders over $35). Kahwa mobile app rewards: earn points per dollar spent, redeem for rewards like free handcrafted beverages and merch, free breakfast sandwich for signing up, plus 500 free points on registration. (Could not confirm the specific 30/45/60-day intervals or the 10-points-per-$1 / Kahwa Reserve tier details.)"
  },
  {
    "name": "Bandit Coffee Co.",
    "city": "St. Petersburg",
    "region": "tampa",
    "website": "https://banditcoffee.co",
    "summary": "Minimalist Central Avenue cafe-roastery (est. 2016, famously wifi-free) focused on single origins, roasted to order every Tuesday and shipped Wednesday.",
    "roastsOwn": true,
    "beans": [],
    "offers": ""
  },
  {
    "name": "Commune + Co.",
    "city": "Tampa",
    "region": "tampa",
    "website": "https://www.communeandco.com",
    "summary": "Seminole Heights cafe built around patent-pending pressure-brewed, nitro-tapped cold coffee; deliberately partners with standout roasters (e.g. Madcap, Ruby) rather than roasting in-house.",
    "roastsOwn": false,
    "beans": [],
    "offers": ""
  },
  {
    "name": "Perq Coffee Bar",
    "city": "Sarasota",
    "region": "tampa",
    "website": "https://www.perqcoffeebar.us",
    "summary": "Sarasota's multi-roaster specialty bar on Hillview St, rotating micro-lot single origins hand-selected from top roasters nationwide and pulled on a hand-built Slayer espresso machine.",
    "roastsOwn": false,
    "beans": [],
    "offers": ""
  },
  {
    "name": "Paradeco Coffee Roasters",
    "city": "St. Petersburg",
    "region": "tampa",
    "website": "https://paradecocoffee.com",
    "summary": "Art deco-inspired downtown St. Pete cafe roasting in-house with a sustainability bent — zero-emission roaster and partnerships with women-owned farms.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Paradise Blend Whole Bean Coffee",
        "notes": "Confirmed on the live product page (12 oz whole bean): blend of Colombian air-freight coffee and single-farm microlot Ethiopian beans, roasted onsite; no published tasting notes on the product page",
        "origin": "Colombia + single-farm microlot Ethiopia"
      },
      {
        "name": "Authentic Organic Ethiopian Coffee Beans",
        "notes": "12 oz whole bean; the site describes its Ethiopian offering with blueberry, jasmine, and bergamot notes and Yirgacheffe-style floral/citrus character (notes drawn from the site's Ethiopian coffee pages, not a formal tasting-note list on the product page)",
        "origin": "Ethiopia"
      }
    ],
    "offers": "Monthly coffee subscriptions available via paradecocoffee.com/shop/monthly-coffee-subscriptions/ (no discount promotions seen)"
  },
  {
    "name": "Palma Coffee Co.",
    "city": "Sarasota",
    "region": "tampa",
    "website": "https://www.palmacoffee.com",
    "summary": "Direct-trade Sarasota shop roasting light-to-medium single origins from producers they visit at origin, serving V60 pour overs, Kyoto cold brew, natural wine and vinyl.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Filter Brew - Nyamyumba, Rwanda",
        "notes": "Brown sugar, caramelized orange, cacao nib; rich and full-bodied with a touch of sweetness",
        "roastLevel": "Light-medium",
        "origin": "Nyamyumba washing station, Rwanda (washed Bourbon)"
      },
      {
        "name": "Finca San Pablo - Organic Honduras Single Origin",
        "notes": "Floral, honey sweetness, creamy body, light citrus acidity",
        "origin": "Finca San Pablo, Marcala, Honduras (washed Anacafe 14, 1450 MASL)"
      },
      {
        "name": "Pink Bourbon - Semi Washed - Finca Bet-el",
        "notes": "Sweet and vibrant with red berries, starfruit, and a hint of bittersweet cacao",
        "origin": "Finca Bet-el, Valle del Cauca, Colombia"
      }
    ],
    "offers": ""
  },
  {
    "name": "Bold Bean Coffee Roasters",
    "city": "Jacksonville",
    "region": "jax",
    "website": "https://boldbeancoffee.com",
    "summary": "Jacksonville's flagship specialty roaster with cafes in Riverside, San Marco, and Jax Beach, roasting single origins and house blends since 2012.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Sweet Spot - House Blend",
        "notes": "Milk chocolate, dried fruit, honey and hazelnut with an elegant, spicy finish; sweet and syrupy profile",
        "origin": "Blend (Latin American coffees)"
      },
      {
        "name": "Supernova - Darker House Blend",
        "notes": "Syrupy body with notes of dark chocolate, roasted almonds, caramel and brown sugar",
        "roastLevel": "Dark'ish roast (medium-dark)",
        "origin": "Blend"
      },
      {
        "name": "Peru - Programa Huellas",
        "notes": "Milk chocolate, cherry cordial and hazelnut with subtle tones of peach preserves and clementine",
        "origin": "Peru (Cajamarca, San Ignacio / Nunya Jalca community lot)"
      }
    ],
    "offers": "Coffee subscriptions confirmed: Roaster's Choice (rotating selection of globally sourced coffees), Sweet Spot House Blend subscription, and the Rare Coffee Club monthly subscription (ships the last Wednesday of each month); gift subscriptions available; free shipping on orders over $50."
  },
  {
    "name": "The Kookaburra",
    "city": "St. Augustine",
    "region": "jax",
    "website": "https://thekookaburracoffee.com",
    "summary": "St. Augustine's original Aussie coffee shop (founded 2012, now 9 locations) pairing espresso with authentic Australian meat pies, with beans roasted locally in St. Augustine.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Award Winning Drop Bear Espresso",
        "notes": "Smooth chocolate notes, a spark of bright citrus, and a layered sweetness; also notes of papaya with a lingering sweet finish. Bronze Medal, Golden Bean North America 2023 and 2025.",
        "origin": "Equal-parts blend of Guatemala (Ona), Brazil (Mantiqueira de Minas), and Honduras (El Conejo)"
      },
      {
        "name": "St. Augustine Distillery Bourbon Barrel Rested Coffee",
        "notes": "Deep chocolate, English toffee, vanilla, and Toblerone",
        "origin": "Brazil (green beans rested in a used St. Augustine Distillery bourbon barrel before roasting)"
      },
      {
        "name": "Bonza Blend",
        "notes": "Notes of berries, cacao, and richness",
        "origin": "El Salvador and Guatemala (two-coffee blend)"
      }
    ],
    "offers": "Coffee subscriptions with monthly and bi-weekly plans (Drop Bear Espresso, Bonza Blend, Roasters Choice, Colombia Decaf, Easy Going, plus a Roasters Choice gift subscription) — flexible, cancel anytime, fresh coffee samples included with every subscription, roasted to order and shipped Monday-Friday. Wholesale program also offered."
  },
  {
    "name": "Opus Coffee",
    "city": "Gainesville",
    "region": "jax",
    "website": "https://opuscoffee.com",
    "summary": "Gainesville small-batch roaster with roughly eight cafes across the city, including several inside UF Health campuses and Innovation Square.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Heartbeat Espresso Blend",
        "notes": "Buttery texture with notes of brown sugar and dark chocolate; cupping notes of hazelnut, chocolate, and caramel",
        "roastLevel": "Dark",
        "origin": "Blend (Indonesia, Africa, South America)"
      },
      {
        "name": "Misty Mountain Blend",
        "notes": "Orange peel, walnuts, and baker's chocolate",
        "roastLevel": "Medium-dark",
        "origin": "Blend (Indonesia and Africa)"
      },
      {
        "name": "Guatemala Huehuetenango",
        "notes": "Layered notes of apricot, honey, and chocolate ganache",
        "roastLevel": "Light",
        "origin": "Guatemala (Huehuetenango, Los Cuchumatanes mountains)"
      }
    ],
    "offers": "Customizable coffee subscriptions (House Blend from $31 every 4 weeks; espresso, dark star, decaf, roaster's choice, and seasonal options) with free shipping on all subscriptions and on orders $45+; orders roasted in Gainesville and shipped within 2 business days."
  },
  {
    "name": "Lucky Goat Coffee Company",
    "city": "Tallahassee",
    "region": "jax",
    "website": "https://luckygoatcoffee.com",
    "summary": "Tallahassee-based roaster, tasting room, and distributor with six cafe locations, roasting specialty-grade 100% Arabica in-house.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Roastmaster's Blend",
        "notes": "Citrus acidity, spicy body, chocolatey sweetness",
        "roastLevel": "Medium",
        "origin": "Blend"
      },
      {
        "name": "Mountain Goat House Blend",
        "notes": "Slight acidity and hint of sweetness, resulting in a perfectly balanced and round body",
        "roastLevel": "Medium",
        "origin": "Blend"
      }
    ],
    "offers": "Lucky Goat Coffee App rewards (luckygoatcoffee.com/pages/rewards): earn 1 point per $1 on in-cafe purchases, redeem points for free drinks plus exclusive member-only offers, and get a free birthday drink; valid at all Lucky Goat cafe locations, online purchases excluded."
  },
  {
    "name": "Amavida Coffee Roasters",
    "city": "Santa Rosa Beach (Florida Panhandle / 30A)",
    "region": "jax",
    "website": "https://amavida.com",
    "summary": "Fair Trade and Certified Organic Panhandle roaster (roasting since 2004) with cafes in Seaside, Rosemary Beach, Santa Rosa Beach, and Panama City, plus a roastery and barista training lab in South Walton.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Good Call Blend",
        "notes": "Brown sugar, molasses, and dark chocolate",
        "origin": "Peru and Honduras (organic)"
      },
      {
        "name": "Oceans Blend",
        "notes": "Caramelized fruit, brown sugar and roasted nuts",
        "origin": "Colombia and Honduras (rotating; 100% plastic neutral, Fair Trade and Organic certified)"
      },
      {
        "name": "Espresso Mandarina",
        "notes": "Chocolate, tangerine, and orange peel",
        "origin": "Organic Fair Trade espresso blend (signature espresso)"
      }
    ],
    "offers": "Three coffee subscription series — Reserve (limited-release, small-batch single-source coffees), Trekker (rotating single origins from around the world), and Espresso — customizable to weekly, bi-weekly, or monthly delivery with choice of number of 12 oz bags and ground or whole bean."
  },
  {
    "name": "Alla Prima Coffee Roaster",
    "city": "Pensacola",
    "region": "jax",
    "website": "https://www.allaprimacoffee.com",
    "summary": "Downtown Pensacola specialty cafe and hands-on micro-roastery on West Garden Street, roasting on-site and offering barista and roasting classes.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Signature Espresso Blend",
        "notes": "Bright, cinnamon clove, and buttery toffee aftertaste",
        "roastLevel": "Medium",
        "origin": "Multi-origin blend"
      },
      {
        "name": "Breakfast Blend",
        "notes": "Mild, balanced, caramel, and red berries",
        "roastLevel": "Medium-dark",
        "origin": "Blend"
      },
      {
        "name": "Brazil Serra Negra",
        "notes": "Mild almond flavors with mellow tart acidity and sweetness",
        "roastLevel": "Light",
        "origin": "Brazil (Serra Negra region, natural process, 750-1100 masl)"
      }
    ],
    "offers": "Monthly coffee subscription: choose one to four 12 oz bags (or a 5 lb bag) of micro-roasted specialty coffee, roasted and shipped within 48 hours of the start date, recurring monthly, cancel anytime. Also offers a customizable Coffee Sampler Box with three 4 oz samples."
  }
];
