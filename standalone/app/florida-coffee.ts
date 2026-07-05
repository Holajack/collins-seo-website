// ─────────────────────────────────────────────────────────────────────────
// Florida specialty coffee — researched from shops' live websites by a
// multi-agent sweep (one researcher per metro), then each shop verified by a
// second agent that fetched the site and confirmed the beans/notes actually
// appear there. Unverifiable shops were dropped.
//
// Bean names and tasting notes are the roasters' own words. Menus rotate —
// treat notes as a snapshot, and follow the website link for today's list.
// ─────────────────────────────────────────────────────────────────────────

export type BeanKind =
  | "single-origin"
  | "blend"
  | "espresso"
  | "decaf"
  | "other";

export interface ShopBean {
  name: string;
  roastLevel?: string;
  notes: string;
  origin?: string;
  kind?: BeanKind;
}

export interface CoffeeShop {
  name: string;
  city: string;
  region: "miami" | "orlando" | "tampa" | "jax" | "sc";
  website: string;
  summary: string;
  roastsOwn: boolean;
  beans: ShopBean[];
  offers: string;
  /** Short descriptor for the card, from the roaster's own site. */
  tagline?: string;
  /** Verified brand hex color, used to tint the shop's monogram tile. */
  brandColor?: string;
}

export const REGION_LABELS: Record<CoffeeShop["region"], string> = {
  miami: "Miami & South Florida",
  orlando: "Orlando & Central Florida",
  tampa: "Tampa Bay",
  jax: "North Florida",
  sc: "South Carolina",
};

// Filled by the verified research pass — see the workflow note above.
export const FLORIDA_SHOPS: CoffeeShop[] = [
  {
    "name": "Panther Coffee",
    "city": "Miami (Wynwood, Coconut Grove, Little River, Brickell)",
    "region": "miami",
    "website": "https://panthercoffee.com",
    "summary": "Miami's first and best-known small-batch specialty roaster, anchored in Wynwood since 2010; Sunset Harbour cafe closed Feb 2026 but multiple Miami cafes remain open.",
    "tagline": "Miami small-batch specialty coffee roaster",
    "roastsOwn": true,
    "beans": [
      {
        "name": "1927 - Panther Coffee Blend",
        "notes": "Dark chocolate, nutty and syrupy with a creamy, mellow, balanced body — a classic Italian-style espresso.",
        "roastLevel": "medium-dark",
        "kind": "espresso"
      },
      {
        "name": "CASA - Panther Coffee Blend (USDA Organic)",
        "notes": "Milk chocolate, caramel, apricot, black cherry and baking spices — silky and sweet.",
        "roastLevel": "medium",
        "origin": "South & Central America and Ethiopia",
        "kind": "blend"
      },
      {
        "name": "EAST COAST ESPRESSO - Panther Coffee Blend",
        "notes": "Very creamy with soft round chocolate, sweet black cherry and ripe coffee fruit, finishing with fresh sugarcane.",
        "roastLevel": "medium",
        "origin": "Brazil & Nicaragua",
        "kind": "espresso"
      },
      {
        "name": "WEST COAST ESPRESSO - Panther Coffee Blend (USDA Organic)",
        "notes": "Sweet lemonade, malted chocolate, raspberry and concord grape with a silky finish.",
        "roastLevel": "light-medium",
        "origin": "Ethiopia & Uganda",
        "kind": "espresso"
      },
      {
        "name": "COLD BREW - Panther Coffee Blend",
        "notes": "Malted milk, deep chocolate, vanilla, honey and cherries — velvety and smooth.",
        "kind": "blend"
      },
      {
        "name": "PORVENIR - Mexico Specialty Coffee (Organic)",
        "notes": "Honey, date and caramel — round, sweet and warm with chocolate and a delicate plum note.",
        "origin": "Mexico (Chiapas)",
        "kind": "single-origin"
      },
      {
        "name": "MEJOR - Colombia Specialty Coffee (USDA Organic)",
        "notes": "Montmorency cherry and citrus with bright milk chocolate — sweet and silky.",
        "origin": "Colombia (Cauca)",
        "kind": "single-origin"
      },
      {
        "name": "REFISA - Ethiopia Specialty Coffee (Organic)",
        "notes": "Nectarine, clementine and honey — juicy, soft and silky.",
        "roastLevel": "light",
        "origin": "Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "GATINA - Kenya Specialty Coffee",
        "notes": "Lime, persimmon and honeycomb — very floral.",
        "roastLevel": "light",
        "origin": "Kenya (Nyeri)",
        "kind": "single-origin"
      },
      {
        "name": "FAZENDA SANTA LUCIA - Brasil Specialty Coffee",
        "notes": "Very creamy with soft round chocolate, sweet black cherry, ripe coffee fruit and sugarcane.",
        "roastLevel": "medium",
        "origin": "Brazil (Carmo de Minas)",
        "kind": "single-origin"
      },
      {
        "name": "TERRA DE SÃO FRANCISCO - Brasil Specialty Coffee",
        "notes": "Very sweet and buttery with chocolate, cherry and pear and a delicate rosy note.",
        "roastLevel": "medium",
        "origin": "Brazil",
        "kind": "single-origin"
      },
      {
        "name": "DECAF MOUNTAIN WATER - Brasil Specialty Coffee",
        "notes": "Creamy body with chocolate and red fruit and a lingering honey-like sweetness.",
        "origin": "Brazil (Minas Gerais, Mountain Water Process)",
        "kind": "decaf"
      },
      {
        "name": "AGROAMBIENTAL - Colombia Specialty Coffee",
        "notes": "Cherry cola and silky milk chocolate — sweet and round with intense sweetness.",
        "origin": "Colombia (Sotará, Cauca)",
        "kind": "single-origin"
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
        "notes": "Citric, sweet and complex with grapefruit, apple, caramel and roasted hazelnuts.",
        "roastLevel": "light",
        "origin": "Central & South America",
        "kind": "blend"
      },
      {
        "name": "Dark Roast Blend",
        "notes": "Bold yet balanced with dark chocolate, raspberry and caramel.",
        "roastLevel": "dark",
        "origin": "Indonesia & the Americas",
        "kind": "blend"
      },
      {
        "name": "Cold Brew Blend",
        "notes": "Smooth with caramel, raisin and chocolate.",
        "roastLevel": "medium",
        "origin": "Central & South America",
        "kind": "blend"
      },
      {
        "name": "Espresso Fino Blend",
        "notes": "Rich dark roast with dark chocolate, toasted nuts and a hint of raspberry.",
        "roastLevel": "dark",
        "origin": "Guatemala, Brazil & Sumatra",
        "kind": "espresso"
      },
      {
        "name": "Espresso Vivo Blend",
        "notes": "Well-balanced with dark chocolate, caramel, citrus and roasted almonds.",
        "roastLevel": "medium",
        "kind": "espresso"
      },
      {
        "name": "Water Processed Decaf Espresso",
        "notes": "Well-balanced Swiss Water decaf with milk chocolate, lemon-lime and grapefruit.",
        "roastLevel": "medium",
        "origin": "Huila, Colombia",
        "kind": "decaf"
      },
      {
        "name": "Lucha Blend",
        "notes": "Intense extra-dark roast with dark chocolate, tobacco and smoky notes.",
        "roastLevel": "extra dark",
        "origin": "Sumatra & Brazil",
        "kind": "blend"
      },
      {
        "name": "Miami Winter Seasonal Blend",
        "notes": "Bright seasonal light roast with orange, pineapple and strawberry.",
        "roastLevel": "light",
        "origin": "Kenya & Ethiopia",
        "kind": "blend"
      },
      {
        "name": "Ethiopia Natural Yirgacheffe",
        "notes": "Fruit-forward with strawberry, peach and blackberry.",
        "roastLevel": "light",
        "origin": "Yirgacheffe, Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia Sidamo Durato Bombe",
        "notes": "Berry-driven with raspberry, plum and blueberry.",
        "roastLevel": "light",
        "origin": "Sidamo, Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Colombia San Agustin",
        "notes": "Sweet and balanced with orange, caramel and milk chocolate.",
        "roastLevel": "medium",
        "origin": "San Agustin, Huila, Colombia",
        "kind": "single-origin"
      },
      {
        "name": "Sumatra Aceh Takengon",
        "notes": "Full-bodied with dark chocolate, grapefruit and earthy cedar notes.",
        "roastLevel": "medium",
        "origin": "Aceh Takengon, Sumatra",
        "kind": "single-origin"
      },
      {
        "name": "Guatemala Huehuetenango MAM",
        "notes": "Complex with red wine, chocolate and caramel.",
        "roastLevel": "light",
        "origin": "Huehuetenango, Guatemala",
        "kind": "single-origin"
      },
      {
        "name": "El Salvador Finca La Reforma",
        "notes": "Juicy with blackberry, milk chocolate and cherry.",
        "roastLevel": "medium",
        "origin": "Finca La Reforma, El Salvador",
        "kind": "single-origin"
      },
      {
        "name": "Brazil Cerrado",
        "notes": "Nutty and smooth with roasted almonds, caramel and dark chocolate.",
        "roastLevel": "medium",
        "origin": "Cerrado, Brazil",
        "kind": "single-origin"
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
    "tagline": "Good specialty coffee in Miami since 2016",
    "roastsOwn": false,
    "beans": [
      {
        "name": "Midtown Espresso",
        "notes": "Vice City Bean's signature seasonal espresso, a blend of washed and natural coffees from Colombia and Ethiopia tasting of chocolate, berries and caramel.",
        "roastLevel": "medium",
        "origin": "Colombia & Ethiopia (blend)",
        "kind": "espresso"
      },
      {
        "name": "Ethiopia Sidama",
        "notes": "Light-roast heirloom from smallholders around the Worku wash station in the eastern tip of Sidama, with lychee, pomegranate, brown spice, chocolate, cane sugar and hibiscus.",
        "roastLevel": "light",
        "origin": "Sidama, Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Mehbuba Guji Uraga Haro",
        "notes": "Single-origin from Mehbuba Seid's farm in Guji Uraga, showing black currant, berry, apple, chocolate and tangerine with a clean, sweet black-tea finish.",
        "origin": "Guji Uraga (Haro Adam), Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "El Mirador Pink Bourbon Washed",
        "notes": "Washed Pink Bourbon grown by Yessica & Diego Parra at El Mirador (1,750 masl), balanced and sweet with floral, creamy, agave and cacao notes.",
        "origin": "El Mirador, Pitalito, Huila, Colombia",
        "kind": "single-origin"
      },
      {
        "name": "El Mirador Pink Bourbon Natural",
        "notes": "Natural-processed Pink Bourbon from Yessica & Diego Parra at El Mirador, fruit-forward with grape, blueberry and chocolate.",
        "origin": "El Mirador, Pitalito, Huila, Colombia",
        "kind": "single-origin"
      },
      {
        "name": "Yemen Sharqi Haraz Anaerobic Natural",
        "notes": "High-intervention anaerobic natural microlot of heirloom Yemeni varieties from the Sharqi Haraz Cooperative, layered with fudge, cola, fig, pomegranate and pink Starburst.",
        "origin": "Haraz, Yemen",
        "kind": "single-origin"
      },
      {
        "name": "Kungahara",
        "notes": "Washed Bourbon from the Kungahara women's group at the Bwishaza Cooperative, with chocolate, raisin, cherry and lemon.",
        "origin": "Rutsiro District, Rwanda",
        "kind": "single-origin"
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
    "tagline": "Fort Lauderdale specialty roaster since 2013",
    "roastsOwn": true,
    "beans": [
      {
        "name": "No. 9",
        "notes": "Chocolatey, creamy and approachable espresso with notes of dried fruit and citrus.",
        "origin": "Signature espresso blend",
        "kind": "espresso"
      },
      {
        "name": "Horizon",
        "notes": "A bold, rich blend balancing earthy and fruity coffees, described by the roaster as \"bold and rich as a South Florida sunrise.\"",
        "origin": "Signature blend",
        "kind": "blend"
      },
      {
        "name": "Pedestrian",
        "notes": "A darker espresso roast that is syrupy and rich with a smooth finish.",
        "roastLevel": "medium-dark",
        "origin": "Handcrafted blend",
        "kind": "espresso"
      },
      {
        "name": "BB",
        "notes": "A medium-bodied blend named after Brandon Wells' grandmother that makes a sweet, mild and approachable cup.",
        "origin": "Handcrafted blend",
        "kind": "blend"
      },
      {
        "name": "Ethiopia Chelbesa",
        "notes": "A bright Ethiopian single-origin with stone-fruit and cocoa character.",
        "origin": "Chelbesa, Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia Jimma",
        "notes": "Candied plum, champagne grape and milk chocolate.",
        "origin": "Goma District, Jimma Zone, Ethiopia (natural process)",
        "kind": "single-origin"
      },
      {
        "name": "Guatemala Las Camelias",
        "notes": "Caramel and cherry.",
        "origin": "Guatemala",
        "kind": "single-origin"
      },
      {
        "name": "Seasonal Swiss Water Decaf",
        "notes": "A chemical-free Swiss Water Process decaf that protects the coffee's original taste, roasted for drip or espresso.",
        "origin": "Rotating origins (seasonal)",
        "kind": "decaf"
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
        "notes": "A light-to-medium roasted Arabica blend with notes of stone fruit and floral aromatics balanced by brown sugar and chocolate.",
        "roastLevel": "light-medium",
        "origin": "Arabica blend",
        "kind": "espresso"
      },
      {
        "name": "Cult Classic Blend (12 oz Bag)",
        "notes": "A darker, nostalgic blend with notes of raisin, toasted marshmallow, and a dark chocolate finish.",
        "roastLevel": "dark",
        "kind": "blend"
      },
      {
        "name": "Huila Decaf",
        "notes": "A decaffeinated single-origin coffee from Huila, Colombia.",
        "origin": "Colombia, Huila",
        "kind": "decaf"
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
    "tagline": "Small-batch single-origin, farm-direct roasting",
    "roastsOwn": true,
    "beans": [
      {
        "name": "El Boton - Sun Dried Natural Maragogipe",
        "notes": "Bright blueberry and raspberry with milk chocolate, banana/mango and hints of pistachio.",
        "origin": "Antioquia, Colombia (Maragogipe varietal, sun-dried natural)",
        "kind": "single-origin"
      },
      {
        "name": "ECR Seasonal Espresso Blend",
        "notes": "Syrupy shots of chocolate, caramel and a hint of vanilla, followed by bright citrus notes of orange peel, key lime and grapefruit.",
        "roastLevel": "medium",
        "origin": "Blend: Washed Caturra 40%, Washed Catuai 40%, Sun-Dried Natural Maragogype 20% (Antioquia, Colombia)",
        "kind": "espresso"
      },
      {
        "name": "Ethiopia Konga - Yirgacheffe (Natural)",
        "notes": "Mixed berries, yellow cherry, ripe peach, apricot and exotic floral notes.",
        "roastLevel": "medium",
        "origin": "Konga, Yirgacheffe, Ethiopia (Heirloom, natural, 1,850 masl)",
        "kind": "single-origin"
      },
      {
        "name": "Colombia - Finca Santa Monica",
        "notes": "Hints of caramel, dark chocolate, honey and black cherry.",
        "roastLevel": "medium",
        "origin": "Colombia (single estate)",
        "kind": "single-origin"
      },
      {
        "name": "Burundi Africa Kirimiro",
        "notes": "Zesty orange, cinnamon and clove with red apple and crisp Asian pear, subtle caramel and cream, and a hibiscus/rose-like acidity.",
        "origin": "Kirimiro, Burundi (Bourbon varietal, washed, 1,938 masl)",
        "kind": "single-origin"
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
    "tagline": "Moto-Inspired Coffee & Lifestyle Brand",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Miami Blend",
        "notes": "Smooth and rich with milk chocolate, caramel, and red berries, designed for cortados, cappuccinos, and cafe con leche.",
        "roastLevel": "medium",
        "origin": "Multi-origin (Central & South America)",
        "kind": "blend"
      },
      {
        "name": "Cafe Racer Blend",
        "notes": "A balanced, sustainably sourced house espresso with notes of golden rum, blackberry, and chocolate.",
        "roastLevel": "medium",
        "origin": "Central & South America",
        "kind": "espresso"
      },
      {
        "name": "Dark Horse Blend",
        "notes": "A bold, Miami-inspired medium-dark Italian roast with dark chocolate, panela, and milk caramel.",
        "roastLevel": "medium-dark (Italian roast)",
        "origin": "Multi-origin (Central & South America)",
        "kind": "blend"
      },
      {
        "name": "Surf Blend",
        "notes": "A multi-origin blend with roasted peanuts, coconut water, and papaya that supports reef preservation in St Barth.",
        "origin": "Multi-origin (world-class surfing destinations)",
        "kind": "blend"
      },
      {
        "name": "Rebel's Blend",
        "notes": "A limited-release multi-origin blend of cherry, dark chocolate, and spun-sugar sweetness with a twist of citrus.",
        "roastLevel": "medium",
        "origin": "Finca San Martin (Colombia), Finca Beatriz (Guatemala), Espiritu Santo (Brazil)",
        "kind": "blend"
      },
      {
        "name": "Finca Quebraditas | Colombia",
        "notes": "A vibrant, complex Sidra with passion fruit, jasmine, and vanilla bean.",
        "roastLevel": "medium",
        "origin": "Colombia (Sidra, thermal-shock washed)",
        "kind": "single-origin"
      },
      {
        "name": "Finca Naya | Colombia",
        "notes": "Grown on steep slopes above the Cauca River, with toffee, honey, and molasses.",
        "roastLevel": "medium-dark",
        "origin": "Cauca River, Colombia",
        "kind": "single-origin"
      },
      {
        "name": "Finca San Javier | Colombia",
        "notes": "An anaerobic Yellow Bourbon with dried apricot, soursop, and dates over a velvety milk-chocolate body.",
        "roastLevel": "medium",
        "origin": "Colombia (Yellow Bourbon, anaerobic)",
        "kind": "single-origin"
      },
      {
        "name": "Finca el Jardin | Colombia",
        "notes": "An elegant, flowery Geisha with jasmine, lemongrass, and panela.",
        "roastLevel": "medium",
        "origin": "Colombia (Geisha)",
        "kind": "single-origin"
      },
      {
        "name": "Finca La Primavera | Colombia",
        "notes": "A vibrant, well-rounded Tabi with caramel, red apple, and graham cracker.",
        "roastLevel": "medium",
        "origin": "Colombia (Tabi)",
        "kind": "single-origin"
      },
      {
        "name": "Finca San Martin | Colombia",
        "notes": "A sweet, fruity Pink Bourbon with cherry, cotton candy, and orange.",
        "roastLevel": "medium",
        "origin": "Colombia (Pink Bourbon)",
        "kind": "single-origin"
      },
      {
        "name": "Finca El Manzano | Colombia",
        "notes": "A bold medium-dark roast with toffee, honey, and molasses and a velvety, layered finish.",
        "roastLevel": "medium-dark",
        "origin": "Colombia",
        "kind": "single-origin"
      },
      {
        "name": "After Midnight | Colombia Decaf",
        "notes": "A sugarcane-process decaf with brown sugar, walnut, and orange and a subtle citrus finish.",
        "origin": "Colombia (sugarcane process)",
        "kind": "decaf"
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
    "tagline": "Orlando small-lot specialty roaster",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Colombia, Palestina",
        "notes": "Cantaloupe and melon jelly.",
        "roastLevel": "light-medium",
        "origin": "Palestina, Huila, Colombia",
        "kind": "single-origin"
      },
      {
        "name": "Colombia, Linarco Rodriguez",
        "notes": "Grape juice and plum with tight, complex acidity and dense tropical flavors from a longtime favorite Typica producer.",
        "roastLevel": "light",
        "origin": "El Bosque, Palestina, Huila, Colombia (Typica)",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia, Worka",
        "notes": "Dark cherry and honey.",
        "roastLevel": "light",
        "origin": "Worka, Yirgacheffe, Gedeo, Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia, Banko Gutiti",
        "notes": "Floral and Sprite, with clarity and structure from high-elevation smallholder farms in Gedeb.",
        "roastLevel": "light",
        "origin": "Gedeb, Yirgacheffe, Ethiopia (washed Heirloom, 1900-2200m)",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia, Kayon Mountain Farm",
        "notes": "Dried cranberry and yellow mango from a co-owned family farm in Shakiso.",
        "roastLevel": "light",
        "origin": "Shakiso, Guji, Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Kenya, Kangunu",
        "notes": "Cherry and cooked tomato.",
        "roastLevel": "light",
        "origin": "Kiriaini, Kenya",
        "kind": "single-origin"
      },
      {
        "name": "Kenya, Gichathaini",
        "notes": "Black currant and sweet lemon syrup, with a clean cup from two-stage Kenya-style fermentation at the Gichathaini mill.",
        "roastLevel": "light",
        "origin": "Thegenge, Nyeri, Kenya",
        "kind": "single-origin"
      },
      {
        "name": "Mexico, Sierra Norte",
        "notes": "Strong, balanced body with chocolate and dried fruit, roasted traditionally to reflect the classic Oaxaca profile.",
        "roastLevel": "medium",
        "origin": "Sierra Norte, Oaxaca, Mexico (~1400-1500m)",
        "kind": "single-origin"
      },
      {
        "name": "Modern American",
        "notes": "Great mouthfeel and fruity sweetness, roasted lighter to highlight complex sweetness with great body for espresso.",
        "roastLevel": "medium-light",
        "origin": "Huila, Colombia (castillo, caturra, colombia)",
        "kind": "espresso"
      },
      {
        "name": "Carousel's Cafe",
        "notes": "A slightly darker, approachable espresso whose longer roast brings out sweetness, great black or with cream and sugar.",
        "roastLevel": "medium",
        "origin": "Huila, Colombia (castillo, caturra, colombia)",
        "kind": "espresso"
      },
      {
        "name": "431° (Northern Italian Espresso)",
        "notes": "Roasted to 431° for balanced roastiness without sacrificing the coffee's sweetness and terroir, approachable and versatile.",
        "roastLevel": "dark",
        "origin": "Colombia",
        "kind": "espresso"
      },
      {
        "name": "Red Rhino",
        "notes": "A terroir-focused installment of their Modern American espresso with great mouthfeel and fruity sweetness, versatile across brew methods.",
        "roastLevel": "medium-light",
        "origin": "Huila, Colombia (castillo, caturra, colombia)",
        "kind": "espresso"
      },
      {
        "name": "Dark & Cozy",
        "notes": "Roasty and sweet, a comfy dark roast taken just into second crack that breaks through milk or creamer.",
        "roastLevel": "dark",
        "origin": "Tehuya Estate, Guatemala (Caturra/Bourbon, 1800m)",
        "kind": "single-origin"
      },
      {
        "name": "Colombia Select Decaf",
        "notes": "Chocolate and ripe berries, naturally decaffeinated via ethyl acetate to preserve flavor and body.",
        "roastLevel": "medium",
        "origin": "Colombia (Ethyl Acetate decaf, ~1400m)",
        "kind": "decaf"
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
    "tagline": "Florida roaster roasting small-batch beans in-house",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Midnight Oil Blend",
        "notes": "A smooth, rich and bold dark roast of 100% Arabica beans.",
        "roastLevel": "dark",
        "kind": "blend"
      },
      {
        "name": "Orange Avenue Blend",
        "notes": "Chocolate and caramel notes with bright citrus for a balanced cup.",
        "roastLevel": "light",
        "kind": "blend"
      },
      {
        "name": "Farmhouse Blend",
        "notes": "A medium roast with notes of cherry, brown sugar and chocolate.",
        "roastLevel": "medium",
        "kind": "blend"
      },
      {
        "name": "Roaster's Select",
        "notes": "A rotating monthly single-origin roast from a different origin each month, offered whole bean only.",
        "origin": "Rotating monthly single origin",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia Guji Single Origin",
        "notes": "A washed light roast with high clarity and classic blueberry aroma and flavor.",
        "roastLevel": "light",
        "origin": "Ethiopia, Guji",
        "kind": "single-origin"
      },
      {
        "name": "Colombia Cauca Single Origin",
        "notes": "A smooth, flavorful medium-roast single origin from Colombia's Cauca region.",
        "roastLevel": "medium",
        "origin": "Colombia, Cauca",
        "kind": "single-origin"
      },
      {
        "name": "Honduras Lempira Single Origin",
        "notes": "A medium-roast single origin from the Lempira region of Honduras with bright acidity and fruity character.",
        "roastLevel": "medium",
        "origin": "Honduras, Lempira",
        "kind": "single-origin"
      },
      {
        "name": "Mexico Cristal Single Origin",
        "notes": "A single-origin Mexican coffee on Foxtail's single-origin lineup.",
        "roastLevel": "medium",
        "origin": "Mexico",
        "kind": "single-origin"
      },
      {
        "name": "Mexico Chiapas Single Origin",
        "notes": "A medium-roast single origin from the Chiapas region of Mexico with notes of chocolate, caramel and praline.",
        "roastLevel": "medium",
        "origin": "Mexico, Chiapas",
        "kind": "single-origin"
      },
      {
        "name": "Colombia Decaf",
        "notes": "A Swiss Water process decaf (chemical-free) with notes of chocolate and caramel.",
        "roastLevel": "medium-dark",
        "origin": "Colombia",
        "kind": "decaf"
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
    "tagline": "Family-owned, seed-to-cup Nicaraguan coffee roastery",
    "roastsOwn": true,
    "beans": [
      {
        "name": "La Sultana",
        "notes": "Blood orange, dark chocolate, and toffee.",
        "origin": "Finca La Misericordia, Nicaragua (Parainema variety)",
        "kind": "single-origin"
      },
      {
        "name": "El Horno",
        "notes": "Cherry, meyer lemon, and cascara with a rich but incredibly smooth body.",
        "origin": "Finca La Misericordia, Nicaragua (natural process)",
        "kind": "single-origin"
      },
      {
        "name": "Marvin's Blend",
        "notes": "Rich, full-bodied, and balanced.",
        "origin": "Finca La Misericordia, Nicaragua",
        "kind": "blend"
      },
      {
        "name": "La Naranja",
        "notes": "A round flavor profile with hints of orange and velvety cacao nibs.",
        "kind": "blend"
      },
      {
        "name": "Decaf",
        "notes": "Sugarcane-process decaf that is frequently praised by customers and often sold out.",
        "kind": "decaf"
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
        "notes": "Plum, dried cranberry and oolong tea with a tangy mandarin finish.",
        "kind": "espresso"
      },
      {
        "name": "Bungalower Blend",
        "notes": "Dark chocolate and nutmeg with a hint of maraschino cherry and low acidity.",
        "kind": "blend"
      },
      {
        "name": "Panamanian Geisha Coffee",
        "notes": "An elusive Panamanian Geisha with a vibrant, complex floral character.",
        "origin": "Panama",
        "kind": "single-origin"
      },
      {
        "name": "Peru: Organic La Esperanza",
        "notes": "Baker's cocoa and sweet tangerine with a dry almond finish.",
        "origin": "Peru",
        "kind": "single-origin"
      },
      {
        "name": "Colombia Supremo Bucaramanga El Gato",
        "notes": "Notes of orange, chocolate, cherry and red grapes.",
        "origin": "Colombia",
        "kind": "single-origin"
      },
      {
        "name": "Brazil: Prima Qualita",
        "notes": "Tangerine, apricot and cashew with a heavy body and light acidity.",
        "origin": "Brazil",
        "kind": "single-origin"
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
    "tagline": "Good things happen over coffee",
    "roastsOwn": true,
    "beans": [
      {
        "name": "The Concord Classic",
        "notes": "An everyday coffee with notes of chocolate, hazelnut and caramel, good black or with cream and sugar.",
        "kind": "blend"
      },
      {
        "name": "Bright & Balanced",
        "notes": "Floral and citrus notes that make a bright, well-balanced cup.",
        "kind": "blend"
      },
      {
        "name": "Sweet & Smooth",
        "notes": "Notes of berry jam, raw sugar and cherries with sweet fruit and a smooth finish.",
        "kind": "blend"
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
    "beans": [
      {
        "name": "Drop Coffee — Nicaragua",
        "notes": "A bright, fruit-forward single origin from Swedish roaster Drop Coffee, offered as whole bean.",
        "roastLevel": "Light",
        "origin": "Nicaragua",
        "kind": "single-origin"
      },
      {
        "name": "Friedhats — Rwanda",
        "notes": "A clean, light-roasted Rwandan single origin from Amsterdam roaster Friedhats, sold as whole bean.",
        "roastLevel": "Light",
        "origin": "Rwanda",
        "kind": "single-origin"
      },
      {
        "name": "Dak Coffee — Ethiopia",
        "notes": "A floral, delicate Ethiopian single origin from Amsterdam roaster Dak, offered as whole bean.",
        "roastLevel": "Light",
        "origin": "Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Sey Coffee",
        "notes": "A rotating roaster partner from Brooklyn, New York, known for bright, light-roasted seasonal coffees.",
        "roastLevel": "Light",
        "kind": "other"
      },
      {
        "name": "La Cabra",
        "notes": "A rotating Danish roaster partner featured for its light, fruit-forward specialty coffees.",
        "roastLevel": "Light",
        "kind": "other"
      }
    ],
    "offers": ""
  },
  {
    "name": "Craft & Common",
    "city": "Orlando, FL (downtown, plus Lake Mary and Oviedo/UCF)",
    "region": "orlando",
    "website": "https://craftandcommon.com/",
    "summary": "Downtown Orlando cafe featuring guest roasters from across the country, known for signature drinks like the Pacific Fog (lavender-honey-sea salt latte) and The Dunes citrus cafe con leche.",
    "tagline": "Woman-owned multi-roaster cafe, downtown Orlando",
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
    "tagline": "Brew Good, Do Good",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Golden Hour Roast",
        "notes": "A medium-roast blend of a refreshing, citrusy Colombian and a sweet, balanced Brazilian coffee.",
        "roastLevel": "medium",
        "origin": "Colombia & Brazil",
        "kind": "blend"
      },
      {
        "name": "USF Bulls Blend",
        "notes": "Full-bodied and smooth with hints of dark chocolate, sweet cherries and toasted walnuts.",
        "origin": "El Salvador & Ethiopia",
        "kind": "blend"
      },
      {
        "name": "Cubano Espresso",
        "notes": "A rich, bold, nutty espresso with dark-spice undertones, Buddy Brew's take on traditional Cuban espresso.",
        "roastLevel": "medium-dark",
        "origin": "Central & South America",
        "kind": "espresso"
      },
      {
        "name": "Cold Brew Roast",
        "notes": "A bright, fruity blend built for cold brew, with floral Sidama notes giving way to roasted macadamia and cherry cordial.",
        "roastLevel": "medium",
        "origin": "Ethiopia Sidama & El Salvador",
        "kind": "blend"
      },
      {
        "name": "Black Lab Roast",
        "notes": "A full-bodied Ethiopia-Honduras blend with notes of apple chips and almonds and a smooth, clean finish.",
        "roastLevel": "medium-dark",
        "origin": "Ethiopia & Honduras",
        "kind": "blend"
      },
      {
        "name": "Old Florida Roast",
        "notes": "A well-balanced Brazil-Colombia blend with notes of citrus, sugarcane and sunshine.",
        "roastLevel": "medium",
        "origin": "Brazil & Colombia",
        "kind": "blend"
      },
      {
        "name": "Gasparilla Roast",
        "notes": "An annual East African and Central American blend balancing florals, nuttiness and spice.",
        "origin": "East African & Central American",
        "kind": "blend"
      },
      {
        "name": "Pig Jig Roast",
        "notes": "A charity blend of specialty beans from Guatemala and El Salvador supporting the Tampa Pig Jig.",
        "origin": "Guatemala & El Salvador",
        "kind": "blend"
      },
      {
        "name": "Big Dawg Roast",
        "notes": "A limited-edition, certified-organic collaboration with the Team Godwin Foundation.",
        "kind": "blend"
      },
      {
        "name": "Freedom Roast",
        "notes": "A blend of specialty beans from El Salvador and Colombia with notes of dark chocolate and walnut, sold to help fight human trafficking.",
        "origin": "El Salvador & Colombia",
        "kind": "blend"
      },
      {
        "name": "Double Dog Espresso",
        "notes": "Bold single-origin El Salvador espresso with candied lemon acidity, roasted walnut and dark chocolate.",
        "roastLevel": "medium-dark",
        "origin": "El Salvador (single origin)",
        "kind": "espresso"
      },
      {
        "name": "Peru",
        "notes": "Washed and grown near 2,300m, offering clarity and sweetness with notes of red grape, cane syrup and nutmeg.",
        "origin": "Peru",
        "kind": "single-origin"
      },
      {
        "name": "Colombia",
        "notes": "Full-bodied and sweet with red hibiscus, florals and raspberry acidity finishing on almond and pastry.",
        "origin": "Colombia, Huila",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia Sidama Guji Gr 1 Washed",
        "notes": "A washed Grade 1 single origin with a clean, floral cup and hints of lemongrass and citrus.",
        "origin": "Ethiopia, Guji/Sidama",
        "kind": "single-origin"
      },
      {
        "name": "Guatemala - Organic Regional Farmer's Lot",
        "notes": "A certified-organic regional farmer's-lot single origin with notes of dark chocolate, toasted almonds and red apple.",
        "origin": "Guatemala (organic)",
        "kind": "single-origin"
      },
      {
        "name": "Decaf Colombia - Sugarcane Processed EA",
        "notes": "A naturally sugarcane (EA) processed decaf Colombian with notes of lemon, raisin and a creamy finish.",
        "origin": "Colombia, Huila",
        "kind": "decaf"
      },
      {
        "name": "A Door of Hope Roast",
        "notes": "A Honduran charity blend with notes of walnut and chocolate, supporting foster families in Tampa.",
        "origin": "Honduras",
        "kind": "blend"
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
    "tagline": "Small-batch roasted. Served fresh.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Sirocco",
        "notes": "Kahwa's most popular signature house blend — a balanced, full-bodied cup with notes of dark cherry and honey and a smooth, low-acid finish.",
        "roastLevel": "medium-dark",
        "origin": "Blend of beans from four countries",
        "kind": "blend"
      },
      {
        "name": "Cubano",
        "notes": "A traditional Cuban-style espresso blend, strong and robust with a sweet finish.",
        "roastLevel": "dark",
        "kind": "espresso"
      },
      {
        "name": "Mistral",
        "notes": "Kahwa's cafe espresso blend of choice, with strong body, a sweet creamy finish, and a pleasant lingering aftertaste.",
        "roastLevel": "medium",
        "origin": "Blend (Italian-style)",
        "kind": "espresso"
      },
      {
        "name": "Zonda (Decaf)",
        "notes": "A dark roast with notes of dark chocolate, naturally water-process decaffeinated without chemicals.",
        "roastLevel": "dark",
        "kind": "decaf"
      },
      {
        "name": "Hope Roast",
        "notes": "Kahwa's charity blend benefiting the National Pediatric Cancer Foundation — a dark roast with a hint of chocolate, a smooth taste, and low acidity.",
        "roastLevel": "dark",
        "kind": "blend"
      },
      {
        "name": "Bali Blue Moon",
        "notes": "A full-bodied, low-acidity single origin with rich oak and cedar notes upfront, a sweet apple-and-orange finish, and a chocolate aftertaste.",
        "roastLevel": "medium-dark",
        "origin": "Indonesia (Bali)",
        "kind": "single-origin"
      },
      {
        "name": "Organic Colombian",
        "notes": "An organic medium roast with sweet cherry flavor and milk chocolate notes.",
        "roastLevel": "medium",
        "origin": "Colombia (organic)",
        "kind": "single-origin"
      },
      {
        "name": "Peru Single Origin",
        "notes": "An organic, medium-bodied roast from the women-grown COOPAFSI cooperative in Cajamarca, with average acidity and sweet notes of orange, milk chocolate and caramel.",
        "roastLevel": "medium",
        "origin": "Peru — Cajamarca region, COOPAFSI women-grown cooperative (organic)",
        "kind": "single-origin"
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
    "beans": [
      {
        "name": "Bandit Staple Blend",
        "notes": "Chocolate, strawberry, and caramel.",
        "origin": "50% washed Ethiopia Dale / 50% washed Colombia Catatumbo",
        "kind": "blend"
      },
      {
        "name": "Half-Caf'd Blend",
        "notes": "Marshmallow, nougat, and milk chocolate.",
        "origin": "50% Colombia Cauca Inzá E.A. natural decaf / 50% Guatemala Ceiba",
        "kind": "blend"
      },
      {
        "name": "Ethiopia Nano Genji",
        "notes": "Key lime, Meyer lemon, and floral.",
        "origin": "Agaro, Ethiopia (washed)",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia Sidamo Dale",
        "notes": "Peach tea, brown sugar, and raspberry lemonade.",
        "origin": "Sidamo, Ethiopia (washed)",
        "kind": "single-origin"
      },
      {
        "name": "Colombia Santiago Patiño",
        "notes": "Berry jam, cacao, honey, and cherry candy.",
        "origin": "Salento, Quindío, Colombia (natural, single farmer lot)",
        "kind": "single-origin"
      },
      {
        "name": "Peru German Carranza Barboza",
        "notes": "Coffee blossom, lemon-lime soda, and baking spices.",
        "origin": "Amazonas, Peru (anaerobic washed, single farmer lot)",
        "kind": "single-origin"
      },
      {
        "name": "Guatemala Ceiba",
        "notes": "Cherry, blueberry, and dark chocolate.",
        "origin": "Huehuetenango, Guatemala (washed)",
        "kind": "single-origin"
      },
      {
        "name": "Mexico El Aguacate",
        "notes": "Dried apricot, almond nougat, and dark chocolate.",
        "origin": "San Agustín Loxicha, Oaxaca, Mexico (washed)",
        "kind": "single-origin"
      },
      {
        "name": "Decaf Colombia",
        "notes": "Apricot, marshmallow fluff, and lemon candy.",
        "origin": "Colombia (natural, decaf)",
        "kind": "decaf"
      }
    ],
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
    "tagline": "Rotating single-origin micro-lots from top roasters",
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
    "tagline": "Bringing you daily doses of Paradise",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Paradise Blend Whole Bean Coffee",
        "notes": "Paradeco's signature 12 oz blend marrying Central American Colombian air-freight coffee with single-farm microlot Ethiopian beans.",
        "origin": "Central America (Colombian air-freight) & single-farm microlot Ethiopian",
        "kind": "blend"
      },
      {
        "name": "Authentic Organic Ethiopian Coffee Beans",
        "notes": "Organically farmed Ethiopian beans showing the vibrant acidity, floral notes and fruity undertones the birthplace of coffee is known for.",
        "origin": "Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Quality Colombian Coffee Beans Via El Dulce, Terra Coffee Association",
        "notes": "Light-roasted Colombian beans with notes of berries, cherries and smooth caramel, sourced through the El Dulce / Terra Coffee Association.",
        "roastLevel": "light",
        "origin": "Colombia (El Dulce, Terra Coffee Association)",
        "kind": "single-origin"
      },
      {
        "name": "Single Farmer Guatemalan Coffee Beans by Paradeco",
        "notes": "Single-farmer Guatemalan beans celebrated for rich chocolatey flavor, balanced acidity and full body.",
        "origin": "Guatemala",
        "kind": "single-origin"
      },
      {
        "name": "Premium Organic Guatemalan Coffee Beans by Paradeco",
        "notes": "Premium organic Guatemalan whole beans with a complex, well-balanced flavor and notes of chocolate and spice.",
        "origin": "Guatemala",
        "kind": "single-origin"
      },
      {
        "name": "Peru Woman Owned Farm Whole Bean Coffee",
        "notes": "Grown by woman farmer Maria Nieves Tantalean Fernandez on a shade-grown organic farm, with bright acidity, medium body and floral, red-fruit character.",
        "origin": "La Coipa, Cajamarca, Peru (producer Maria Nieves Tantalean Fernandez)",
        "kind": "single-origin"
      },
      {
        "name": "Honduras Coffee Beans by Paradeco",
        "notes": "Honduran whole beans with brown-sugar sweetness and hints of chocolate and toasted nuts.",
        "origin": "Honduras",
        "kind": "single-origin"
      },
      {
        "name": "Decaf Colombia",
        "notes": "A decaffeinated Colombian whole-bean offering with the region's balanced, nutty-chocolatey profile.",
        "origin": "Colombia",
        "kind": "decaf"
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
    "tagline": "Ethically sourced, freshly roasted single-origin coffee",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Filter Brew - Nyamyumba, Rwanda",
        "notes": "A rich, full-bodied brew with brown sugar, caramelized orange, and cacao nib.",
        "roastLevel": "light-medium",
        "origin": "Nyamyumba washing station, Rwanda (Washed Bourbon)",
        "kind": "single-origin"
      },
      {
        "name": "Finca San Pablo - Organic Honduras Single Origin",
        "notes": "A textbook Marcala coffee, fragrant with floral notes and honey sweetness alongside a creamy body and light citrus acidity.",
        "roastLevel": "light-medium",
        "origin": "Finca San Pablo, Marcala, Honduras (Organic, Washed Anacafe 14)",
        "kind": "single-origin"
      },
      {
        "name": "Pink Bourbon - Semi Washed - Finca Bet-el",
        "notes": "Sweet and vibrant with a mouthful of red berries, starfruit, and a hint of bittersweet cacao.",
        "roastLevel": "light",
        "origin": "Finca Bet-el, Valle del Cauca, Colombia (semi-washed Pink Bourbon)",
        "kind": "single-origin"
      },
      {
        "name": "Pink Bourbon 120K - Finca Bet-el",
        "notes": "Silky and perfectly sweet, lingering with red fruit from its extended fermentation and finishing extremely clean.",
        "roastLevel": "light",
        "origin": "Finca Bet-el, Valle del Cauca, Colombia (extended-fermentation Pink Bourbon)",
        "kind": "single-origin"
      },
      {
        "name": "Alturas del Triunfo - Chiapas, Mexico",
        "notes": "Bursting with syrupy caramel that makes a great espresso, it is understatedly complex as filter with vibrant acidity and layered dark fruits.",
        "roastLevel": "light-medium",
        "origin": "Sierra Madre de Chiapas, Mexico (1600-1900 masl, Organic Bourbon/Caturra)",
        "kind": "single-origin"
      },
      {
        "name": "Cumbia - Colombia/Kenya Espresso Blend",
        "notes": "Palma's espresso blend showing dark chocolate, mandarin orange, lemon, and tart cherry.",
        "roastLevel": "medium",
        "origin": "Blend of Huila, Colombia and Nyeri, Kenya",
        "kind": "espresso"
      },
      {
        "name": "Wei Wei - Guatemala",
        "notes": "Intensely bright yet balanced, with a creamy chocolate fragrance and orange citrus running through to a dark-chocolate sweetness.",
        "roastLevel": "light-medium",
        "origin": "Finca Severa, Santa Cruz Barillas, Huehuetenango, Guatemala",
        "kind": "single-origin"
      },
      {
        "name": "Cascara Tea - Coffee Cherry Tea",
        "notes": "A coffee-cherry tea with an intense red-fruit fragrance and notes of plum, tamarind, and citrus.",
        "origin": "Finca El Porvenir (Diego Triana), Cauca, Colombia - dried coffee cherry skins",
        "kind": "other"
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
    "tagline": "Specialty coffees for the bold at heart",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Sweet Spot - House Blend",
        "notes": "A sweet, balanced house blend with notes of milk chocolate, dried fruit, honey and hazelnut and an elegant, spicy finish.",
        "roastLevel": "medium",
        "kind": "blend"
      },
      {
        "name": "Supernova - Darker House Blend",
        "notes": "A darker, more developed take on Sweet Spot with a syrupy body and notes of dark chocolate, roasted almonds, caramel and brown sugar.",
        "roastLevel": "medium-dark",
        "kind": "blend"
      },
      {
        "name": "Supernatural",
        "notes": "A pop of fruit over a milk chocolate, hazelnut and caramel base, with all the notes of a mixed berry pie.",
        "roastLevel": "medium",
        "origin": "Central American and natural Ethiopian blend",
        "kind": "blend"
      },
      {
        "name": "The Dark Side",
        "notes": "Sweet, creamy and full-bodied dark chocolate with notes of toasted marshmallow and dark chocolate malted milk balls.",
        "roastLevel": "dark",
        "kind": "blend"
      },
      {
        "name": "Decaf Blend",
        "notes": "A full-bodied sugarcane-process decaf blend with notes of pie spice, toffee and citrus zest.",
        "roastLevel": "medium",
        "origin": "Risaralda and Tolima, Colombia (sugarcane process)",
        "kind": "decaf"
      },
      {
        "name": "Peru - Programa Huellas",
        "notes": "Balanced and warming with notes of milk chocolate, cherry cordial and hazelnut and subtle tones of peach preserves and clementine.",
        "roastLevel": "medium",
        "origin": "Peru",
        "kind": "single-origin"
      },
      {
        "name": "Natural Ethiopia",
        "notes": "Floral and refreshing with watermelon sweetness, mixed berry brightness, elegant stone-fruit notes and a creamy body.",
        "roastLevel": "light",
        "origin": "Sidama, Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia Natural Yirgacheffe",
        "notes": "Floral and refreshing with watermelon sweetness, mixed berry brightness, elegant stone-fruit notes and a creamy body.",
        "roastLevel": "light",
        "origin": "Yirgacheffe, Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Colombia - Yoiner Mosquera",
        "notes": "Juicy plum and cherry cordial with vibrant acidity and elegant vanilla-toned floral elements.",
        "roastLevel": "light",
        "origin": "Palestina, Huila, Colombia (Rosado varietal)",
        "kind": "single-origin"
      },
      {
        "name": "Colombia - Julio Calderon Washed Gesha",
        "notes": "A layered cup of impressive clarity with floral aromas of jasmine, lemongrass and melon, juicy brightness and soft, fresh stone fruit.",
        "roastLevel": "light",
        "origin": "Palestina, Huila, Colombia (Gesha varietal)",
        "kind": "single-origin"
      },
      {
        "name": "Rwanda Vunga",
        "notes": "Creamy body with vibrant, juicy acidity and strong citrus, floral and spiced aromas complemented by black tea and bergamot.",
        "roastLevel": "light",
        "origin": "Vunga washing station, Nyabihu District, Rwanda",
        "kind": "single-origin"
      },
      {
        "name": "Roaster's Choice - Single Origin",
        "notes": "A rotating roaster's-pick single origin roasted light to be a vibrant expression of its lineage and terroir.",
        "roastLevel": "light",
        "origin": "Rotating single origin selected by the roaster",
        "kind": "single-origin"
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
    "tagline": "St. Augustine's original Aussie coffee shop",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Award Winning Drop Bear Espresso",
        "notes": "An equal-parts blend of Guatemala, Brazil, and Honduras with smooth chocolate, bright citrus, and lingering sweetness; a Bronze Medal winner at the 2023 and 2025 Golden Bean North America.",
        "origin": "Blend — Guatemala, Brazil & Honduras (equal parts)",
        "kind": "espresso"
      },
      {
        "name": "Bonza Blend",
        "notes": "A blend of two coffees from El Salvador and Guatemala showing berries, cacao, and richness (Aussie slang for 'awesome').",
        "origin": "Blend — El Salvador & Guatemala",
        "kind": "blend"
      },
      {
        "name": "St. Augustine Distillery Bourbon Barrel Rested Coffee",
        "notes": "Green Brazil beans rested in a used St. Augustine Distillery bourbon barrel before roasting for deep chocolate, English toffee, vanilla, and Toblerone.",
        "origin": "Brazil",
        "kind": "single-origin"
      },
      {
        "name": "Easy Going",
        "notes": "A half-caffeinated, easy-drinking blend with notes of grapefruit, meringue, and molasses.",
        "origin": "Half-caffeinated blend",
        "kind": "blend"
      },
      {
        "name": "Colombia Casabianca",
        "notes": "A washed Northern Tolima coffee with green apple and dulce de leche.",
        "origin": "Northern Tolima, Colombia (1690 masl; Colombia, Castillo & CR-95 varietals; washed)",
        "kind": "single-origin"
      },
      {
        "name": "Brazil Mantiqueira De Minas",
        "notes": "A bright, sweet natural-process cup with berry, chocolate, and vanilla nougat.",
        "origin": "Carmo de Minas, Brazil (1100 masl; Yellow Catuai; natural)",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia Megerssa",
        "notes": "A single-origin Ethiopian offering on the shop's current lineup (detailed roaster tasting notes not captured).",
        "origin": "Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Guatemala El Pesadero",
        "notes": "A single-origin Guatemalan offering on the shop's current lineup (detailed roaster tasting notes not captured).",
        "origin": "Guatemala",
        "kind": "single-origin"
      },
      {
        "name": "The Ace Case",
        "notes": "A branded gift box bringing together three of the roaster's most celebrated coffees.",
        "origin": "Gift set",
        "kind": "other"
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
    "tagline": "Good coffee for good people",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Heartbeat Espresso Blend",
        "notes": "A dark-roasted espresso blend with a buttery texture and notes of brown sugar and dark chocolate.",
        "roastLevel": "dark",
        "origin": "Indonesia, Africa & South America",
        "kind": "espresso"
      },
      {
        "name": "House Blend",
        "notes": "A nutty yet sweet medium roast that shines in any brew method.",
        "roastLevel": "medium",
        "origin": "Indonesia, Africa & South America",
        "kind": "blend"
      },
      {
        "name": "Misty Mountain Blend",
        "notes": "Bold, earthy beans with notes of orange peel, walnuts, and baker's chocolate.",
        "roastLevel": "medium-dark",
        "origin": "Indonesia & Africa",
        "kind": "blend"
      },
      {
        "name": "Decaf House Blend",
        "notes": "A Swiss Water processed decaf with cupping notes of chocolate and caramel.",
        "roastLevel": "medium-dark",
        "origin": "South America & Central America",
        "kind": "decaf"
      },
      {
        "name": "Summer Trip",
        "notes": "A seasonal medium roast with notes of strawberry, rose, and toasted almonds.",
        "roastLevel": "medium",
        "origin": "Colombia & Costa Rica",
        "kind": "blend"
      },
      {
        "name": "Satchel's Blend",
        "notes": "A medium roast created with Gainesville's iconic Satchel's Pizza, which opened alongside Opus in 2002-2003.",
        "roastLevel": "medium",
        "origin": "Sumatra, Ethiopia & Brazil",
        "kind": "blend"
      },
      {
        "name": "1884 Porters Quarters Blend",
        "notes": "A bold, signature medium roast honoring the historic Porters Quarters neighborhood beside the Opus Airstream.",
        "roastLevel": "medium",
        "kind": "blend"
      },
      {
        "name": "Coach's Signature Blend",
        "notes": "A bold medium-dark roast with rich notes of dark chocolate and stone fruit, part of the Spurrier Collection.",
        "roastLevel": "medium-dark",
        "origin": "East Timor & Ethiopia",
        "kind": "blend"
      },
      {
        "name": "Guatemala Huehuetenango",
        "notes": "A washed light roast grown up to 2000m with layered notes of apricot, honey, and chocolate ganache.",
        "roastLevel": "light",
        "origin": "Huehuetenango, Guatemala",
        "kind": "single-origin"
      },
      {
        "name": "Peru Aprysa",
        "notes": "A Fair Trade and Organic medium roast with notes of blueberry and spices.",
        "roastLevel": "medium",
        "origin": "Aprysa Cooperative, Peruvian Amazon",
        "kind": "single-origin"
      },
      {
        "name": "Honduras Probando Ideas",
        "notes": "A medium roast with layered notes of dark chocolate, stone fruit, and currant.",
        "roastLevel": "medium",
        "origin": "Marcala, Honduras",
        "kind": "single-origin"
      },
      {
        "name": "Colombia ASOPAP Co-op",
        "notes": "A bright medium roast with notes of honey and sweet berries.",
        "roastLevel": "medium",
        "origin": "Sierra Nevada de Santa Marta, Colombia",
        "kind": "single-origin"
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
    "tagline": "Florida specialty micro-lot coffee roaster",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Roastmaster's Blend",
        "notes": "A complex, full-bodied everyday blend with chocolatey sweetness, a spicy medium body, and citrus acidity.",
        "roastLevel": "medium",
        "origin": "Blend (100% Arabica)",
        "kind": "blend"
      },
      {
        "name": "Mountain Goat House Blend",
        "notes": "A fan-favorite house blend with slight acidity and a hint of sweetness for a balanced, round body.",
        "roastLevel": "medium",
        "origin": "Blend (100% Arabica)",
        "kind": "blend"
      },
      {
        "name": "Ethiopia Aricha",
        "notes": "Bright and delicate with notes of Meyer lemon, blueberry, and turbinado sugar.",
        "roastLevel": "light",
        "origin": "Ethiopia, Yirgacheffe (Aricha washing station)",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia Wush Wush",
        "notes": "Anaerobic-fermented and vibrant with white peach, watermelon, and cotton candy.",
        "roastLevel": "light",
        "origin": "Ethiopia, Hambela",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia ARDI",
        "notes": "A heirloom Sidama coffee with notes of cocoa and strawberry.",
        "roastLevel": "light",
        "origin": "Ethiopia, Sidama (heirloom variety)",
        "kind": "single-origin"
      },
      {
        "name": "Guatemala Waykan",
        "notes": "Milk chocolate and toffee with a unique, lingering sweetness from the high-altitude Huehuetenango region.",
        "roastLevel": "medium",
        "origin": "Guatemala, Huehuetenango",
        "kind": "single-origin"
      },
      {
        "name": "Midnight Express Colombia Supremo",
        "notes": "A dark-roasted Colombian with smoky notes of roasted cocoa and a heavy body.",
        "roastLevel": "dark",
        "origin": "Colombia (Supremo)",
        "kind": "single-origin"
      },
      {
        "name": "Sumatra Takengon Jagong Mill",
        "notes": "A heavy-bodied Aceh Sumatran with dark chocolate, hickory, and butter croissant.",
        "roastLevel": "dark",
        "origin": "Indonesia, Sumatra (Aceh, Takengon)",
        "kind": "single-origin"
      },
      {
        "name": "Lucky 7 Espresso",
        "notes": "Snappy and complex with a spicy body, citric acidity, and dark chocolate, and a two-time bronze medalist at the 2024 Golden Bean The Americas.",
        "roastLevel": "medium",
        "origin": "Espresso blend (four-bean, 100% Arabica)",
        "kind": "espresso"
      },
      {
        "name": "Euro Espresso",
        "notes": "A traditional European-style espresso blend with prominent bitterness, a savory finish, and higher caffeine content.",
        "roastLevel": "dark",
        "origin": "Espresso blend",
        "kind": "espresso"
      },
      {
        "name": "Decaf Water Process (Decaf Mountain Water)",
        "notes": "Naturally water-decaffeinated with full flavor and low acidity, with notes of almond/walnut, brown sugar, and graham cracker.",
        "roastLevel": "medium",
        "origin": "Water-processed decaf (100% Arabica)",
        "kind": "decaf"
      },
      {
        "name": "Decaf Goat Tracks",
        "notes": "Caramel and chocolate sweetness with no caffeine and no acidity.",
        "roastLevel": "medium",
        "origin": "Water-processed decaf (flavored)",
        "kind": "decaf"
      },
      {
        "name": "Decaf Southern Pecan",
        "notes": "A decaffeinated take on their New Orleans-style Southern Pecan with nutty pecan sweetness.",
        "roastLevel": "medium",
        "origin": "Water-processed decaf (flavored)",
        "kind": "decaf"
      },
      {
        "name": "Southern Pecan",
        "notes": "Nutty and sweet with flavors of pecan, cinnamon, vanilla, and hazelnut, plus a light body and low acidity.",
        "roastLevel": "medium",
        "origin": "Flavored (New Orleans style)",
        "kind": "other"
      },
      {
        "name": "Goat Tracks",
        "notes": "Smooth and sweet with chocolatey caramel flavor, a light body, and low acidity.",
        "roastLevel": "medium",
        "origin": "Flavored",
        "kind": "other"
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
        "notes": "A smooth organic blend of Peru and Honduras coffees with notes of brown sugar, molasses, and dark chocolate.",
        "roastLevel": "medium",
        "origin": "Peru & Honduras",
        "kind": "blend"
      },
      {
        "name": "Oceans Blend (100% Plastic Neutral)",
        "notes": "A Fair Trade, Organic, 100% plastic-neutral blend with notes of caramelized fruit, brown sugar, and roasted nuts.",
        "kind": "blend"
      },
      {
        "name": "Espresso Mandarina",
        "notes": "An award-winning organic espresso with notes of chocolate, tangerine, and orange peel.",
        "kind": "espresso"
      },
      {
        "name": "Recharge Blend",
        "notes": "A seasonal organic blend of Peru, Honduras, and Ethiopia coffees with notes of caramel, chocolate, and cream.",
        "origin": "Peru, Honduras & Ethiopia",
        "kind": "blend"
      },
      {
        "name": "Cold Brew Beans",
        "notes": "A well-balanced cold brew bean with notes of brown sugar and roasted almond, strong body, and mild acidity.",
        "kind": "blend"
      },
      {
        "name": "Juerga Decaf Blend",
        "notes": "A medium-bodied seasonal decaf blend of Honduras and Peru coffees with notes of vanilla, butter, and milk chocolate.",
        "roastLevel": "medium",
        "origin": "Honduras / Peru (seasonal)",
        "kind": "decaf"
      },
      {
        "name": "Decaf Mexican Espresso",
        "notes": "A low-acidity, medium-bodied organic Mexican decaf espresso with notes of raisin, malt, and milk chocolate.",
        "origin": "Mexico",
        "kind": "decaf"
      },
      {
        "name": "Ethiopia Negele Gorbitu",
        "notes": "An organic Ethiopian coffee with delicate tea-like flavors and crisp citric acidity.",
        "roastLevel": "light",
        "origin": "Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Peru Sol y Café",
        "notes": "An organic Peruvian coffee from the Sol y Café cooperative with notes of brown sugar, milk chocolate, and plum.",
        "origin": "Peru",
        "kind": "single-origin"
      },
      {
        "name": "Honduras Honey Process (Bryan Bautista)",
        "notes": "A honey-processed Honduras from producer Bryan Bautista with notes of plum, malt, and nougat.",
        "origin": "Honduras (Marcala)",
        "kind": "single-origin"
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
        "notes": "Medium roast that is bright with cinnamon-clove and a buttery toffee aftertaste, with each origin roasted separately then blended for peak crema.",
        "roastLevel": "medium",
        "origin": "Multi-origin blend",
        "kind": "espresso"
      },
      {
        "name": "Breakfast Blend",
        "notes": "Mild and balanced with notes of caramel and red berries.",
        "roastLevel": "medium-dark",
        "kind": "blend"
      },
      {
        "name": "Cold Brew Blend",
        "notes": "Their signature cold brew blend for home batches, meant to be ground coarse and steeped 18 hours at a 1:5.5 ratio.",
        "kind": "blend"
      },
      {
        "name": "Brazil Serra Negra",
        "notes": "Mild almond flavors with mellow tart acidity and sweetness.",
        "roastLevel": "light",
        "origin": "Serra Negra, Sul de Minas, Brazil (natural process)",
        "kind": "single-origin"
      },
      {
        "name": "Peru Cajamarca",
        "notes": "Cooked berry, praline and peanut butter with tart acidity and mellow candy-like sweetness.",
        "origin": "Cajamarca, Peru (washed process)",
        "kind": "single-origin"
      },
      {
        "name": "Mexico Marachi",
        "notes": "Mild dried citrus and chocolate flavors with tart acidity and fruit-like sweetness.",
        "roastLevel": "medium",
        "origin": "Mexico (washed process)",
        "kind": "single-origin"
      },
      {
        "name": "Decaf Brazil Serra Negra",
        "notes": "Their rotating water-process decaf offering, showing green tea notes with mild acidity and a creamy mouthfeel.",
        "roastLevel": "medium",
        "origin": "Serra Negra, Brazil (water process)",
        "kind": "decaf"
      }
    ],
    "offers": "Monthly coffee subscription: choose one to four 12 oz bags (or a 5 lb bag) of micro-roasted specialty coffee, roasted and shipped within 48 hours of the start date, recurring monthly, cancel anytime. Also offers a customizable Coffee Sampler Box with three 4 oz samples."
  },
  {
    "name": "Methodical Coffee",
    "city": "Greenville, SC",
    "region": "sc",
    "website": "https://methodicalcoffee.com",
    "summary": "Greenville's flagship specialty roaster and multi-cafe operation (Downtown, Commons, Stones Point, plus a bakery), roasting to order and shipping nationwide.",
    "tagline": "Coffee nerds, not coffee snobs",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Blue Boy",
        "notes": "Smooth, sweet and velvety with chocolate, graham and brown-sugar sweetness.",
        "roastLevel": "medium",
        "origin": "70% Guatemala Ixlama, 30% Colombia Nariño",
        "kind": "blend"
      },
      {
        "name": "Belly Warmer",
        "notes": "A bold dark roast with nutty, earthy dark-chocolate notes.",
        "roastLevel": "dark",
        "origin": "Equal parts Honduras and Brazil",
        "kind": "blend"
      },
      {
        "name": "Play Nice",
        "notes": "Syrupy body with chocolate, brown sugar and a little berry that plays nice brewed any way.",
        "roastLevel": "medium",
        "origin": "Blend (Colombia/Ethiopia)",
        "kind": "espresso"
      },
      {
        "name": "Guatemala, Ixlama",
        "notes": "Smooth and sweet with apple, chocolate and caramel.",
        "origin": "Guatemala (Huehuetenango)",
        "kind": "single-origin"
      },
      {
        "name": "Colombia, Andrés Cardona",
        "notes": "A complex, vibrant natural with strawberry, brown sugar and a savory hint of cucumber and jalapeño.",
        "origin": "Colombia (Antioquia, natural process)",
        "kind": "single-origin"
      },
      {
        "name": "Colombia, Landmark",
        "notes": "Caramel, nutty and citrus.",
        "origin": "Colombia (Huila, Women Growers Program)",
        "kind": "single-origin"
      },
      {
        "name": "Colombia, Willow",
        "notes": "Fruit-forward and bright with stone fruit, berries and chocolate.",
        "origin": "Colombia",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia, Bombe Abore",
        "notes": "Fruity and jammy with raspberry and citrus.",
        "origin": "Ethiopia (Sidama, natural process)",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia, Origins - Natural",
        "notes": "A fruit-forward natural with berries, cocoa and tea.",
        "origin": "Ethiopia (Guji, natural process)",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia, Origins - Washed",
        "notes": "Clean and floral with citrus and tea.",
        "origin": "Ethiopia (Sidama, washed process)",
        "kind": "single-origin"
      },
      {
        "name": "Repose Decaf",
        "notes": "A funky, fruity strawberry co-fermented decaf with citrus, strawberry and coconut.",
        "roastLevel": "light",
        "origin": "Colombia (Sebastian Ramirez, strawberry co-fermented; EA process)",
        "kind": "decaf"
      },
      {
        "name": "Colombia, Cauca - Decaf",
        "notes": "A balanced EA-process decaf with sweet fruit, lemon peel and graham (also sold as Sunset Decaf).",
        "origin": "Colombia, Cauca (EA / ethyl acetate process)",
        "kind": "decaf"
      }
    ],
    "offers": ""
  },
  {
    "name": "Due South Coffee Roasters",
    "city": "Greenville, SC (Hampton Station)",
    "region": "sc",
    "website": "https://duesouthcoffee.com",
    "summary": "Roasting thoughtful, forward-thinking specialty coffee in South Carolina since 2013, with a taproom-style cafe and roastery at Hampton Station in Greenville.",
    "tagline": "Forward-thinking specialty coffee since 2013",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Waxwing Blend (Formerly Night Train)",
        "notes": "A balanced Brazil-and-Ethiopia blend with baker's chocolate, strawberry, and a creamy body.",
        "roastLevel": "medium",
        "origin": "Brazil & Ethiopia",
        "kind": "blend"
      },
      {
        "name": "Redstart Blend",
        "notes": "A smooth blend of South American and African coffees with caramel sweetness and apple crispness.",
        "origin": "South American & African coffees",
        "kind": "blend"
      },
      {
        "name": "Nightjar Blend",
        "notes": "Their first official dark roast blend, big and bold with dark chocolate, clove, and a syrupy body.",
        "roastLevel": "dark",
        "kind": "blend"
      },
      {
        "name": "Longspur Blend",
        "notes": "A chocolatey, creamy espresso with an orange middle and a long finish.",
        "roastLevel": "medium",
        "origin": "mainly Brazil",
        "kind": "espresso"
      },
      {
        "name": "Guji | Ethiopia",
        "notes": "A washed Ethiopian coffee with juicy peach, clementine, and classic citrus clarity.",
        "roastLevel": "light",
        "origin": "Guji, Ethiopia (washed)",
        "kind": "single-origin"
      },
      {
        "name": "Paubrasil | Brazil",
        "notes": "Their most comforting single origin, smooth with chocolate and toasted almond like a rich candy bar.",
        "origin": "Cerrado Mineiro, Brazil (natural)",
        "kind": "single-origin"
      },
      {
        "name": "Selva Negra | Nicaragua",
        "notes": "A clean washed Nicaraguan coffee with red apple, citrus acidity, and praline that goes down smooth.",
        "origin": "Matagalpa, Nicaragua (washed)",
        "kind": "single-origin"
      },
      {
        "name": "Toucan Series | Colombia Development Lot",
        "notes": "A limited-release Young Producers Program micro-lot with experimental fermentation, showing candied cherry, dark chocolate, and rose.",
        "roastLevel": "light",
        "origin": "Andes, Antioquia, Colombia",
        "kind": "single-origin"
      },
      {
        "name": "SUPRA Espresso",
        "notes": "A rich, full-bodied dark espresso with dark chocolate, roasted almond, and a syrupy body (a Supra Performance collaboration).",
        "roastLevel": "dark",
        "kind": "espresso"
      },
      {
        "name": "SUPRA Drip",
        "notes": "A medium roast for filter lovers with chocolate, molasses, and a smooth finish (a Supra Performance collaboration).",
        "roastLevel": "medium",
        "kind": "blend"
      },
      {
        "name": "La Palmera Decaf | Colombia",
        "notes": "A smooth, sweet Colombian decaf with caramel, marshmallow, and a creamy body.",
        "origin": "Caldas, Colombia (EA process)",
        "kind": "decaf"
      }
    ],
    "offers": "Single Origin and Blend coffee subscriptions available (Blend Subscription from $18.25); free shipping on all orders over $50 in the Contiguous USA."
  },
  {
    "name": "Bridge City Coffee",
    "city": "Greenville, SC (plus Travelers Rest)",
    "region": "sc",
    "website": "https://www.bridgecity.coffee",
    "summary": "Mission-driven Greenville roaster and cafe group founded in 2017 — named 2024 Roast Magazine Micro-Roaster of the Year — committed to ethical partnerships and community impact.",
    "tagline": "Award-winning mission-driven Greenville micro-roaster",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Nostalgia",
        "notes": "Dark chocolate, cocoa, roasted almond and hazelnut in their comfort-in-a-cup flagship blend.",
        "roastLevel": "medium-dark",
        "kind": "blend"
      },
      {
        "name": "Brazil Classico",
        "notes": "A smooth, chocolate-and-nut-forward everyday Brazilian single origin.",
        "roastLevel": "medium-dark",
        "origin": "Brazil",
        "kind": "single-origin"
      },
      {
        "name": "Peru Lucero",
        "notes": "Semi-dry white wine, caramel and milk chocolate; washed Caturra and Catimor from producer Lucero Anayeli Torres.",
        "roastLevel": "medium",
        "origin": "El Diamante, Jaen, Peru",
        "kind": "single-origin"
      },
      {
        "name": "El Salvador Ojo de Agua - Dehydrated Honey Process",
        "notes": "Raspberry, blackberry, marmalade and prune from the Pola family's regenerative honey-process lot.",
        "origin": "Juayua, Sonsonate, El Salvador",
        "kind": "single-origin"
      },
      {
        "name": "El Salvador Ojo de Agua - Natural Process",
        "notes": "Pineapple and blackberry with plum acidity from the Pola family's regenerative natural-process lot.",
        "origin": "Juayua, Sonsonate, El Salvador",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia Banko Taratu",
        "notes": "Dry white flower with blueberry and strawberry sweetness and mild lime acidity; washed with extended fermentation.",
        "origin": "Yirgacheffe, Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Rwanda Mwito",
        "notes": "Apricot, golden raisin and red currant in a light-roast natural process.",
        "roastLevel": "light",
        "origin": "Nyamasheke, Western Province, Rwanda",
        "kind": "single-origin"
      },
      {
        "name": "Colombia Pink Bourbon",
        "notes": "A tropical medley with a light agave aftertaste; light-roast Pink Bourbon best brewed on V60 or Aeropress.",
        "roastLevel": "light",
        "origin": "Colombia",
        "kind": "single-origin"
      },
      {
        "name": "Uganda Sironko Micro Mill",
        "notes": "Tropical fruit, honey and citrus with a syrupy body; washed micro-lot with a signature 40-hour fermentation.",
        "origin": "Sironko District, Eastern Uganda (Mt. Elgon)",
        "kind": "single-origin"
      },
      {
        "name": "Fell & Fair Collaborative Blend",
        "notes": "Chocolate, mulberry and adventure in a medium-roast collaboration blend with Fell & Fair (natural Rwanda and Brazil).",
        "roastLevel": "medium",
        "kind": "blend"
      },
      {
        "name": "Terraform the City 2.0 (Bridge City x Propaganda)",
        "notes": "Orange, sweet banana and stone-fruit aromatics with a lingering apricot acidity; collaboration release with Propaganda.",
        "kind": "blend"
      }
    ],
    "offers": "Bridge City Coffee Club subscription (weekly, bi-weekly, or monthly deliveries from $21, adjustable or pausable anytime) plus limited Rare Reserve / ultra-rare coffee releases (geisha, wush wush) shipped to your door."
  },
  {
    "name": "Little River Roasting Co.",
    "city": "Spartanburg, SC",
    "region": "sc",
    "website": "https://www.littleriverroasting.com",
    "summary": "Spartanburg's original small-batch specialty roaster (since 2001), with four cafe locations and 'Farmer Friendly' direct-relationship sourcing that pays above market price.",
    "tagline": "Small-batch, ethically sourced since 2001",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Little River Blend",
        "notes": "Medium-roasted Costa Rica blended with light-roasted Peru from partner farms for a cup with brightness, body, and balance.",
        "roastLevel": "medium",
        "origin": "Costa Rica & Peru (partner farms)",
        "kind": "blend"
      },
      {
        "name": "Little River Espresso Blend",
        "notes": "A light-medium blend of three coffees built for espresso, pulling a sweet, syrupy, nutty shot.",
        "roastLevel": "light-medium",
        "origin": "Blend of three coffees",
        "kind": "espresso"
      },
      {
        "name": "Appalachian Blend",
        "notes": "Light, medium, and dark roasts from around the world combined for a well-rounded, medium-bodied cup with smoky, nutty flavor and a hint of sweetness.",
        "roastLevel": "medium",
        "origin": "Multi-origin (worldwide)",
        "kind": "blend"
      },
      {
        "name": "High Strung Blend",
        "notes": "Three relationship coffees make a bold, heavy-bodied cup with a buttery walnut finish.",
        "roastLevel": "dark",
        "origin": "Three relationship coffees",
        "kind": "blend"
      },
      {
        "name": "Decaf Espresso Blend",
        "notes": "A bold, chocolaty blend of their decafs with hints of wheat for a full-bodied espresso without the caffeine.",
        "origin": "Blend of decafs",
        "kind": "decaf"
      },
      {
        "name": "Ethiopia Yirgacheffe",
        "notes": "Roasted lightly for a clean finish with floral, fruity tones and a distinct hint of strawberries in the aroma.",
        "roastLevel": "light",
        "origin": "Yirgacheffe, Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Sulawesi",
        "notes": "Grown in the mountainous Tana Toraja region and roasted dark for a heavy body with smoky, syrupy notes of cedar and spice.",
        "roastLevel": "dark",
        "origin": "Tana Toraja, South Sulawesi, Indonesia",
        "kind": "single-origin"
      },
      {
        "name": "Sumatra",
        "notes": "A dark-roasted Indonesian single origin with the heavy body and earthy depth characteristic of Sumatra.",
        "roastLevel": "dark",
        "origin": "Sumatra, Indonesia",
        "kind": "single-origin"
      },
      {
        "name": "Falalalalaliday Blend",
        "notes": "A seasonal holiday blend offered during the winter/Christmas season.",
        "origin": "Seasonal blend",
        "kind": "blend"
      }
    ],
    "offers": "Online shop at shop.littleriverroasting.com selling fresh-roasted coffee, breakfast/lunch, and merch; wholesale program; four Spartanburg cafe locations."
  },
  {
    "name": "Mōzza Roasters",
    "city": "Spartanburg, SC",
    "region": "sc",
    "website": "https://mozzaroasters.com",
    "summary": "Spartanburg small-batch roaster that roasts to order (beans roasted 1-3 days before shipping) and supplies partner cafes across the Upstate while shipping direct to subscribers.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Aurora Blend",
        "notes": "Mild chocolate, honeycomb, brown sugar, and Meyer lemon in a smooth, balanced everyday cup.",
        "roastLevel": "medium",
        "origin": "Colombia & Guatemala",
        "kind": "blend"
      },
      {
        "name": "Noble Blend",
        "notes": "Bold Colombian richness meets bright Ethiopian fruit for deep dark chocolate with a hint of ripe blackberry.",
        "roastLevel": "medium-dark",
        "origin": "Colombia & Ethiopia",
        "kind": "blend"
      },
      {
        "name": "Nightfall Blend",
        "notes": "Full-bodied and well-balanced with tobacco, chocolate, and a touch of spice on the finish.",
        "roastLevel": "medium-dark",
        "origin": "Indonesia & Africa",
        "kind": "blend"
      },
      {
        "name": "Espresso Blend",
        "notes": "Rich cocoa and hazelnut balanced by clean acidity that cuts through milk without an ultra-dark burnt flavor.",
        "roastLevel": "medium-dark",
        "origin": "Brazil, Ethiopia & Guatemala",
        "kind": "espresso"
      },
      {
        "name": "Decaf Blend",
        "notes": "Swiss Water processed with warm gingerbread, cocoa, and dark berry plus a slight hint of orange zest.",
        "roastLevel": "dark",
        "origin": "Ethiopia Sidamo/Yirgacheffe & Swiss Water Colombian Dulima",
        "kind": "decaf"
      },
      {
        "name": "Ben's Blend",
        "notes": "A bold, fruit-forward medium roast whose proceeds support Ben's Friends, a recovery community for hospitality professionals.",
        "roastLevel": "medium",
        "kind": "blend"
      },
      {
        "name": "Cold Brew",
        "notes": "Crafted for cold steeping with bright fruit notes and chocolatey depth for a smooth finish.",
        "roastLevel": "medium",
        "origin": "Brazil, Ethiopia & Guatemala",
        "kind": "blend"
      },
      {
        "name": "Ethiopia Yirgacheffe",
        "notes": "Lively and vibrant with floral, citrus character and notes of strawberry, kiwi, blueberry, and apricot.",
        "roastLevel": "light-medium",
        "origin": "Yirgacheffe Region, Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Brazil",
        "notes": "Bursting with sweet peach, apricot, and blackberry syrup from a unique closed-truck fermentation.",
        "roastLevel": "light-medium",
        "origin": "Bahia, Brazil",
        "kind": "single-origin"
      },
      {
        "name": "Rwanda",
        "notes": "Bright and refreshing with notes of nectarine, tangerine, and sugar cane.",
        "roastLevel": "light-medium",
        "origin": "Huye Mountain, Rwanda",
        "kind": "single-origin"
      },
      {
        "name": "Burundi",
        "notes": "Smallholder coffee from Shikankoni Hill with notes of milk chocolate, blackberry, and cola.",
        "roastLevel": "light-medium",
        "origin": "Kayanza Province, Burundi",
        "kind": "single-origin"
      }
    ],
    "offers": "Coffee subscriptions with 10% off every subscription order; choose your roast (or let the roaster pick), grind, and delivery frequency (weekly, biweekly, monthly); skip, pause, or cancel anytime; beans roasted to order in small batches 1-3 days before shipping. Also offers wholesale to cafes/restaurants and barista training."
  },
  {
    "name": "Second State Coffee",
    "city": "Charleston, SC",
    "region": "sc",
    "website": "https://secondstatecoffee.com/",
    "summary": "Charleston's flagship specialty roaster (founded 2012) with five cafes and a James Island roastery, roasting light-to-medium on a Loring S15 Falcon with relationship-based sourcing.",
    "tagline": "Charleston small-batch specialty coffee roaster",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Stealth — Blend",
        "notes": "Full-bodied, smooth darker roast with deep roundness, soft fruitiness, creamy sweetness and low acidity.",
        "roastLevel": "dark",
        "origin": "Guatemala + Brazil",
        "kind": "blend"
      },
      {
        "name": "Heavyweight — Blend",
        "notes": "Traditional, approachable medium-full body with sweet chocolate and a fudgy sweetness that holds up to cream and sugar.",
        "roastLevel": "medium-dark",
        "origin": "Colombia + Brazil",
        "kind": "blend"
      },
      {
        "name": "Prizefighter — Blend",
        "notes": "Silky and composed with nutty classic character, mild citrus and soft florals at medium sweetness.",
        "roastLevel": "medium-dark",
        "origin": "Colombia + Brazil + Ethiopia",
        "kind": "blend"
      },
      {
        "name": "Ethiopia Chelbesa Washed",
        "notes": "High-elevation washed Ethiopia with clean floral and citrus character of black tea, jasmine and blood orange.",
        "roastLevel": "light",
        "origin": "Chelbesa Washing Station, Gedeb, Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia Hamasho Natural",
        "notes": "Natural-process Ethiopia layered with jammy black fruits, grape-like florals and a lemonade zip.",
        "roastLevel": "light",
        "origin": "Hamasho Station, Bensa, Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Rwanda Nyabumera",
        "notes": "Creamy-bodied with muted fruit notes; mild, simple and approachable.",
        "roastLevel": "light-medium",
        "origin": "Nyabumera Washing Station, Nyamasheke, Rwanda",
        "kind": "single-origin"
      },
      {
        "name": "Colombia | Sebastian Ramirez Pink Bourbon Washed",
        "notes": "Washed Pink Bourbon that is floral, fruity and naturally sweet with bergamot-like brightness.",
        "roastLevel": "light",
        "origin": "Sebastian Ramirez, Quindío, Colombia",
        "kind": "single-origin"
      },
      {
        "name": "Colombia Honey Pink Bourbon",
        "notes": "Honey-processed Colombian Pink Bourbon that is sweet, floral and fruited.",
        "roastLevel": "light",
        "origin": "Colombia",
        "kind": "single-origin"
      },
      {
        "name": "Edwin Norena IPA Process",
        "notes": "Hops- and yeast-inoculated co-ferment that is complex, creamy and sweet with jasmine, honeysuckle and strawberry lemonade.",
        "roastLevel": "light",
        "origin": "Campo Hermoso Farm, Edwin Noreña, Quindío, Colombia",
        "kind": "single-origin"
      },
      {
        "name": "Guatemalan Decaf",
        "notes": "Sugar Cane Process decaf with notes of caramel and a whisper of fruitiness.",
        "roastLevel": "medium",
        "origin": "Guatemala (Sugar Cane Process)",
        "kind": "decaf"
      }
    ],
    "offers": "Coffee subscriptions with weekly, bi-weekly, or monthly frequency; tax and shipping included on all subscriptions; dedicated Heavyweight subscription product and a Coffee Subscriptions collection on the shop."
  },
  {
    "name": "Foresight Coffee Roasters (formerly Springbok)",
    "city": "Charleston, SC",
    "region": "sc",
    "website": "https://foresightcoffee.com/",
    "summary": "Charleston's upper King Street small-batch roaster (roasting in the Lowcountry since 2015 as Springbok, now Foresight), partnering directly with producers for traceable lots.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Paradigm Blend",
        "notes": "A medium-dark blend of Central and South American coffees with warm notes of baker's chocolate, brown sugar and ripe plum, full-bodied and rich with mild acidity.",
        "roastLevel": "medium-dark",
        "origin": "Central & South America",
        "kind": "blend"
      },
      {
        "name": "Flagship Blend",
        "notes": "A subtly complex, full-bodied blend roasted for pleasant acidity, sweet chocolate notes and a smooth finish, perfect for espresso or filter.",
        "roastLevel": "medium",
        "kind": "blend"
      },
      {
        "name": "Proximity Blend",
        "notes": "A syrupy, chocolatey blend celebrating Foresight's coffee relationships, ideal for filter, cappuccino or cold brew.",
        "kind": "blend"
      },
      {
        "name": "Brazilliant Blend",
        "notes": "A blend of Brazilian coffees roasted dark but not burnt, with notes of chocolate fudge and praline and low acidity, great for cold brew, espresso and filter.",
        "roastLevel": "dark",
        "origin": "Brazil",
        "kind": "blend"
      },
      {
        "name": "Panama - La Santa",
        "notes": "Light, bright and delicious with notes of toffee, pear and honey.",
        "roastLevel": "light",
        "origin": "Panama",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia Yirgacheffe Kochere",
        "notes": "A light, washed Ethiopian coffee with floral, lemon and peach notes for a bright, clean cup.",
        "roastLevel": "light",
        "origin": "Ethiopia, Yirgacheffe (Kochere)",
        "kind": "single-origin"
      },
      {
        "name": "Colombia Villa de Don Juan",
        "notes": "A smooth, full-bodied Colombian coffee with rich caramel notes, crafted by certified Q Graders.",
        "origin": "Colombia",
        "kind": "single-origin"
      },
      {
        "name": "Peru Las Damas - Organic",
        "notes": "An organic, women-grown Peruvian coffee with notes of caramel, citrus and chocolate, full-bodied and ideal for pour-over or drip.",
        "origin": "Peru (COOPAFSI)",
        "kind": "single-origin"
      },
      {
        "name": "Guatemala Finca Nueva Granada",
        "notes": "A consistently smooth, never-bitter daily coffee with sweet chocolate notes and low acidity.",
        "origin": "Guatemala, San Marcos",
        "kind": "single-origin"
      },
      {
        "name": "Slow Ride Half Caff",
        "notes": "A 50/50 blend of specialty-grade Swiss Water decaf and Central American coffees with notes of milk chocolate, graham cracker and raw honey, a drinkable espresso or drip.",
        "origin": "Swiss Water Decaf & Central America",
        "kind": "other"
      }
    ],
    "offers": "Coffee subscriptions (Blends, Single Origin, and Roaster's Choice plans) with free shipping on subscription orders over $40 (excluding wholesale)."
  },
  {
    "name": "Highfalutin Coffee Roasters",
    "city": "Charleston, SC (Avondale/West Ashley + James Island)",
    "region": "sc",
    "website": "https://highfalutin.com/",
    "summary": "Founded in 2018 in West Ashley's Avondale neighborhood, Highfalutin exclusively sources a highly curated selection of top-tier micro lots and roasts for clean, sweet, floral and fruity cups.",
    "tagline": "Roasted with Splendor in Charleston, SC",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Nativo Nogales",
        "notes": "Juicy cherry and watermelon-candy sweetness with crisp, bright acidity and a clearly defined lemon note.",
        "roastLevel": "light",
        "origin": "Los Nogales farm, Pitalito, Huila, Colombia (Mosto/lixiviate process)",
        "kind": "single-origin"
      },
      {
        "name": "Wilder Lazo SL28",
        "notes": "A vivid, vibrant cup with notes of kiwi, raspberry, red currant and lemon.",
        "roastLevel": "light",
        "origin": "Wilder Lazo, Colombia (washed SL28)",
        "kind": "single-origin"
      },
      {
        "name": "Bura Hamasho",
        "notes": "Floral aromatics with a tea-like body and honeydew melon sweetness.",
        "roastLevel": "light",
        "origin": "Sidama Zone, Ethiopia (organic natural, Grade 1)",
        "kind": "single-origin"
      },
      {
        "name": "Magnum Sidra",
        "notes": "Fresh-cut peaches on the nose, then bubble gum, strawberry taffy and mango in the cup.",
        "roastLevel": "light",
        "origin": "El Vergel Estate, Tolima, Colombia (72-hour anaerobic natural, Sidra variety)",
        "kind": "single-origin"
      },
      {
        "name": "Condor Decaf",
        "notes": "Dried cherry, almond and cola, with the original flavor and aroma preserved through ethyl-acetate decaffeination.",
        "roastLevel": "medium",
        "origin": "Colombia (ethyl acetate / sugarcane process)",
        "kind": "decaf"
      },
      {
        "name": "Ixlama",
        "notes": "Bright acidity, rich chocolaty sweetness and an impeccably clean cup, with cherry notes that come alive as espresso.",
        "roastLevel": "medium",
        "origin": "Caserio Teogal, Aldea San Martin, Guatemala",
        "kind": "single-origin"
      },
      {
        "name": "Honey Mountain",
        "notes": "Roasted slightly hotter for a more classic profile, with loads of natural sweetness and golden-raisin juiciness.",
        "roastLevel": "medium",
        "origin": "Colombia (48-hour fermentation; Caturra, Colombia and Castillo varieties)",
        "kind": "single-origin"
      }
    ],
    "offers": "Gift cards (e-gift, from $10, via highfalutin.com/products/gift-card) and Palate Development Class (highfalutin.com/products/event). No subscription program seen."
  },
  {
    "name": "Charleston Coffee Roasters",
    "city": "Charleston, SC (North Charleston roastery)",
    "region": "sc",
    "website": "https://www.charlestoncoffeeroasters.com/",
    "summary": "Long-running slow-roasted, small-batch roaster known for organic blends and single origins, sold online and in grocers across the Southeast.",
    "tagline": "Slow-roasted small-batch organic coffee",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Charleston Organic Blend",
        "notes": "Bright citrus notes with a nutty, caramel sweetness and a smooth smokiness.",
        "roastLevel": "medium",
        "origin": "North, Central & South America",
        "kind": "blend"
      },
      {
        "name": "Kiawah Organic Blend",
        "notes": "Rich and full-bodied with chocolate overtones and a smooth aftertaste.",
        "roastLevel": "dark",
        "kind": "blend"
      },
      {
        "name": "Beach House Blend",
        "notes": "A dark, rich roast that stays smooth with subtle earthiness and slight sweetness.",
        "roastLevel": "dark",
        "origin": "Colombian French, Sumatra & Mexican beans",
        "kind": "blend"
      },
      {
        "name": "Organic Espresso Medium",
        "notes": "A crisp, balanced medium-roast espresso blend with a sweet, smooth character.",
        "roastLevel": "medium",
        "origin": "Central & South America (Colombian, Mexican, Guatemalan)",
        "kind": "espresso"
      },
      {
        "name": "Organic Espresso Dark",
        "notes": "A bold dark-roasted espresso blend that pulls a thick crema.",
        "roastLevel": "dark",
        "origin": "Central & South America",
        "kind": "espresso"
      },
      {
        "name": "Organic Cold Brew",
        "notes": "Dark-roasted for a bold, subtly sweet and smooth brew with hints of cocoa.",
        "roastLevel": "dark",
        "origin": "Colombia, Mexico & Guatemala",
        "kind": "blend"
      },
      {
        "name": "Organic Swiss Water Process Decaf",
        "notes": "A chemical-free Swiss Water Process decaf roasted dark for a smooth, full-flavored cup.",
        "roastLevel": "dark",
        "origin": "Organic Arabica",
        "kind": "decaf"
      },
      {
        "name": "Organic Honduran",
        "notes": "A crisp, lively cup balancing fruity brightness and smooth sweetness with citrus and caramel notes and a rich, creamy body.",
        "roastLevel": "medium",
        "origin": "Copan region, Honduras (single estate)",
        "kind": "single-origin"
      },
      {
        "name": "Organic Peruvian",
        "notes": "A pure, plush single origin roasted medium to stay light-bodied and creamy with subtle nut and citrus tones.",
        "roastLevel": "medium",
        "origin": "Peru",
        "kind": "single-origin"
      },
      {
        "name": "Organic Sumatra",
        "notes": "A bold roast with a smooth, full finish and hints of almond and chocolate.",
        "roastLevel": "dark",
        "origin": "Sumatra, Indonesia",
        "kind": "single-origin"
      },
      {
        "name": "Organic Colombian",
        "notes": "A bold, smooth and well-rounded single origin.",
        "roastLevel": "dark",
        "origin": "Cundinamarca region, Colombia (grown above 5,000 ft)",
        "kind": "single-origin"
      },
      {
        "name": "Organic Colombian French",
        "notes": "A deep French roast bringing out bold chocolate flavors with hints of smoke and a rich, full taste.",
        "roastLevel": "french",
        "origin": "Cundinamarca region, Colombia",
        "kind": "single-origin"
      },
      {
        "name": "Costa Rican Tarrazu",
        "notes": "Smooth and rich with bright citrus flavors from the award-winning Dota estate.",
        "roastLevel": "medium",
        "origin": "Dota estate, Tarrazu, Costa Rica",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopian Yirgacheffe",
        "notes": "A fruit-forward light roast with a distinctive berry flavor, citrus finish and floral aroma.",
        "roastLevel": "light",
        "origin": "Gedeb, Yirgacheffe, Ethiopia",
        "kind": "single-origin"
      },
      {
        "name": "Guatemalan \"El Injertal\"",
        "notes": "A light roast with a full, round body and bright orange citrus notes.",
        "roastLevel": "light",
        "origin": "San Marcos region, Guatemala",
        "kind": "single-origin"
      }
    ],
    "offers": "Coffee subscription (charlestoncoffeeroasters.com/subscribe/) with 10% subscriber discount on all orders and occasional exclusive promotions; Coffee of the Month Club delivering two 12 oz bags of freshly roasted seasonal favorites monthly with tasting and origin notes in a gift box, terms of 3/6/9/12 months or until cancel, code CLUB20 for 20% off first shipment; free shipping on orders of $20+."
  },
  {
    "name": "Sightsee",
    "city": "Charleston, SC (698 Rutledge Ave)",
    "region": "sc",
    "website": "https://www.sightseeshop.com/",
    "summary": "Travel-inspired retail shop and coffee bar near Hampton Park serving craft coffee from local and regional roasters, with a house blend and rotating featured whole beans.",
    "tagline": "Travel-inspired Charleston shop + coffee bar",
    "roastsOwn": false,
    "beans": [
      {
        "name": "Sightsee House Blend",
        "notes": "Mixed berries, bright citrus, and velvety chocolate in an Ethiopia-natural/Colombia-washed blend built for any brew method from espresso to French press (roasted by Brandywine).",
        "origin": "Ethiopia (natural) + Colombia (washed)",
        "kind": "blend"
      },
      {
        "name": "Ethiopia, Hada Molecha, 96 Hours Extended Fermentation",
        "notes": "Chocolate pudding, hazelnut liqueur, and melon drawn out by an innovative 96-hour extended-fermentation process.",
        "origin": "Ethiopia, Gedeo Zone (Aricha District), Hada Molecha washing station",
        "kind": "single-origin"
      },
      {
        "name": "Colombia Las Palmas",
        "notes": "A rotating Colombian single-origin from La Palma y El Tucán, offered as whole bean.",
        "origin": "Colombia, La Palma y El Tucán (Cundinamarca)",
        "kind": "single-origin"
      }
    ],
    "offers": "Sightsee Coffee Subscription: monthly delivery of the featured guest coffee, the featured Springbok Coffee Roasters coffee, or both, with a customized coffee guide including brewing instructions based on the shop's dial-in; shipping included."
  },
  {
    "name": "Curiosity Coffee Bar",
    "city": "Columbia, SC",
    "region": "sc",
    "website": "https://www.curiositycoffeebar.com/",
    "summary": "Neighborhood coffee shop and bar on North Main Street serving ethically sourced single-origin coffee plus beer, wine, and locally sourced food.",
    "tagline": "Proudly independent, ethically sourced coffee",
    "roastsOwn": false,
    "beans": [
      {
        "name": "Bless Your Heart - Tanzania (Curiosity x 1000 Faces)",
        "notes": "Curiosity's versatile signature coffee with nutty, chocolatey notes reflecting Tanzania's volcanic terroir.",
        "roastLevel": "medium",
        "origin": "Tanzania — southern slopes of Mount Kilimanjaro",
        "kind": "single-origin"
      },
      {
        "name": "Bless Your Dark Heart - Tanzania",
        "notes": "The bold dark-roast edition of the Bless Your Heart signature, deepening the nutty-chocolatey Tanzania profile into a richer cup.",
        "roastLevel": "dark",
        "origin": "Tanzania — Mount Kilimanjaro",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia Idido - Natural (Curiosity x 1000 Faces)",
        "notes": "Fruity notes of passion fruit and green apple with floral hints, a clean cane-sugar sweetness, bright acidity, and a nutty aftertaste.",
        "roastLevel": "light",
        "origin": "Ethiopia — Idido, Yirgacheffe",
        "kind": "single-origin"
      },
      {
        "name": "Kenya - Spikes AA - SL28 - Washed (Curiosity x 1000 Faces)",
        "notes": "Dry-fermented and washed to a floral, silky, and complex cup.",
        "roastLevel": "light",
        "origin": "Kenya — Spikes Estate, Kiambu, SL28 variety",
        "kind": "single-origin"
      },
      {
        "name": "Uganda - Engeya - Washed (Curiosity x 1000 Faces)",
        "notes": "An East-African cup pairing bright, fruity acidity with a rounded, balanced body.",
        "origin": "Uganda — Engeya, Rwenzori region",
        "kind": "single-origin"
      }
    ],
    "offers": "Retail bean product pages live on its own site (e.g. curiositycoffeebar.com/product/bless-your-heart-tanzania-curiosity-x-1000-faces-coffee and /product/bless-your-dark-heart-tanzania), confirming the 1000 Faces collaboration roast; curiosityco.shop also resolves as their shop. No subscription program seen. All confirmed via indexed pages only — the site returns 403 to automated fetchers."
  },
  {
    "name": "Loveland Coffee",
    "city": "Irmo / Columbia, SC",
    "region": "sc",
    "website": "https://www.lovelandcoffee.com/",
    "summary": "Fair Trade Organic specialty roaster with a two-floor roastery cafe in Irmo and a drive-thru kiosk on St. Andrews Road in Columbia, roasting small-batch since 2016.",
    "tagline": "We roast, we serve, we sell",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Soda City Sunrise",
        "notes": "Their signature house blend named after Columbia, SC (\"Soda City\"), a well-balanced blend of Latin and South American coffees with smooth caramel and chocolate flavors and a lemon citric finish.",
        "roastLevel": "medium",
        "origin": "Blend of Latin & South American coffees",
        "kind": "blend"
      },
      {
        "name": "1890 Blend - Irmo SC",
        "notes": "An Organic/Fair Trade light roast celebrating Irmo, SC (founded 1890), with tasting notes of brown sugar, vanilla, mandarin orange and milk chocolate.",
        "roastLevel": "light",
        "origin": "Blend (USDA Organic, Fair Trade)",
        "kind": "blend"
      },
      {
        "name": "Gray Ghost Espresso Blend",
        "notes": "An espresso blend named after their 1966 GMC panel truck, with a balanced body and hints of sweet brown sugar and dark chocolate that shines straight up or in a latte.",
        "kind": "espresso"
      },
      {
        "name": "Guatemala El Cimarron",
        "notes": "A USDA Organic washed light roast with tasting notes of almond, brown sugar, mandarin orange and milk chocolate.",
        "roastLevel": "light",
        "origin": "Acatenango, San Martin, Guatemala (Asproguate; Caturra & Bourbon; washed)",
        "kind": "single-origin"
      },
      {
        "name": "Colombia - Tolima",
        "notes": "An Organic/Fair Trade washed light roast with tasting notes of vanilla, lemon, plum, honey, dulce de leche and orange.",
        "roastLevel": "light",
        "origin": "Tolima, Colombia (Asopap; Caturra, Borbón, Típica, Castillo; fully washed)",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia Worka Sakaro",
        "notes": "An organic anaerobic-natural light roast with tasting notes of blueberry Pop-Tarts and vanilla.",
        "roastLevel": "light",
        "origin": "Worka Sakaro washing station, Gedeo/Yirgacheffe, Ethiopia (heirloom cultivars; anaerobic natural)",
        "kind": "single-origin"
      },
      {
        "name": "Specialty Instant Coffee",
        "notes": "Loveland's specialty-grade coffee freeze-dried into a convenient instant format that dissolves cleanly in hot or cold water for travel or quick brewing.",
        "kind": "other"
      },
      {
        "name": "K-Cups Guatemala Decaf",
        "notes": "Single-serve Swiss Water Process decaf K-Cups featuring their organic Guatemalan coffee, with notes of berry, caramel and orange.",
        "roastLevel": "medium",
        "origin": "Guatemala (USDA Organic, Swiss Water Process)",
        "kind": "decaf"
      }
    ],
    "offers": "Soda City Sunrise coffee subscription sold online (lovelandcoffee.com/product/soda-city-sunrise-subscription/); wholesale accounts via lovelandcoffee.com/wholesale/."
  },
  {
    "name": "Piecewise Coffee Co.",
    "city": "Cayce & Columbia, SC",
    "region": "sc",
    "website": "https://piecewisecoffee.com/",
    "summary": "Intentionally local coffee shop with locations in Cayce (State Street) and on Devine Street in Columbia, serving South Carolina roasters and neighborhood-baked goods.",
    "roastsOwn": false,
    "beans": [
      {
        "name": "The Daily Driver (Piecewise Blend)",
        "notes": "A smooth, balanced house blend co-created exclusively with Greenville roaster Methodical Coffee and found only at Piecewise.",
        "roastLevel": "medium",
        "kind": "blend"
      }
    ],
    "offers": "Mobile coffee bar catering and coffee delivery in and around Cayce and Columbia, SC (catering bar includes espresso, cold brew, house-made syrups, alternative milks, and chai); mobile order-ahead via the Piecewise Coffee App on iOS/Android (powered by the joe coffee platform) with a loyalty program (50% off after 6th purchase)."
  },
  {
    "name": "Rock Hill Coffee Roasters",
    "city": "Rock Hill, SC",
    "region": "sc",
    "website": "https://www.rockhill.coffee/",
    "summary": "Specialty roaster and community-focused cafe in downtown Rock Hill (with a Fort Mill location), roasting signature blends and single origins in-house alongside seasonal drinks and house-made syrups.",
    "roastsOwn": true,
    "beans": [
      {
        "name": "The House Blend (1852)",
        "notes": "A smooth, balanced blend marrying the bright sweetness of Peruvian coffee with the rich depth of Colombian beans.",
        "roastLevel": "medium",
        "origin": "Peru & Colombia",
        "kind": "blend"
      },
      {
        "name": "The Espresso Blend (Black Street Espresso)",
        "notes": "A medium-dark espresso blend with notes of dried cherry and chocolate.",
        "roastLevel": "medium-dark",
        "kind": "espresso"
      },
      {
        "name": "Ebenezer",
        "notes": "A bold dark-roast single origin with rich dark chocolate and cherry undertones.",
        "roastLevel": "dark",
        "kind": "single-origin"
      },
      {
        "name": "Spark",
        "notes": "A washed-process single origin with notes of milk chocolate, granola and green apple.",
        "roastLevel": "medium",
        "kind": "single-origin"
      },
      {
        "name": "Ethiopia",
        "notes": "A light-roast washed Yirgacheffe with notes of vanilla, floral and chamomile.",
        "roastLevel": "light",
        "origin": "Ethiopia (Yirgacheffe)",
        "kind": "single-origin"
      },
      {
        "name": "Ucumari",
        "notes": "A washed Colombian single origin with notes of hazelnut, nectarine and milk chocolate.",
        "roastLevel": "medium",
        "origin": "Colombia",
        "kind": "single-origin"
      },
      {
        "name": "Rudy",
        "notes": "A washed-and-natural Colombia and Bolivia blend with notes of caramel, honey and red fruit.",
        "roastLevel": "medium",
        "origin": "Colombia & Bolivia",
        "kind": "blend"
      }
    ],
    "offers": "Online bean shop (Shop / Shop Coffee pages) with online ordering at rockhill.coffee/s/order, plus a Stockists page listing local retailers. Indexed site copy also advertises a coffee subscription (\"never need to remember to order coffee again\"), contradicting the researcher's note that no subscription was found. Note: bean details and offers were confirmed from search-indexed snippets of the site's own pages, since the site returns 403 to automated fetchers."
  },
  {
    "name": "Birchin Lane Coffee Company",
    "city": "Myrtle Beach, SC",
    "region": "sc",
    "website": "https://www.birchinlanecoffee.com/",
    "summary": "Award-winning small-batch roaster with a full-service espresso bar on N Kings Hwy in Myrtle Beach, offering signature blends, single origins, and flavored beans.",
    "tagline": "Award-winning small-batch roaster & espresso bar",
    "roastsOwn": true,
    "beans": [
      {
        "name": "Birchin Lane Blend",
        "notes": "Their award-winning signature roast — their lightest, with a smooth mouth feel and low acidity.",
        "roastLevel": "light",
        "kind": "blend"
      },
      {
        "name": "Beach Beans",
        "notes": "A well-balanced, complex medium-dark roast blended for wherever the salt life takes you.",
        "roastLevel": "medium-dark",
        "kind": "blend"
      },
      {
        "name": "Tall Dark & Handsome",
        "notes": "Roasted to dark perfection — dark and bold, but never bitter.",
        "roastLevel": "dark",
        "kind": "blend"
      },
      {
        "name": "Real Men Wear Kilts",
        "notes": "An old-world combination of caramel, butterscotch and hazelnut with a smooth hint of Irish whiskey.",
        "kind": "other"
      },
      {
        "name": "Coconut Rummy",
        "notes": "An intoxicating flavored blend of coconut and rum.",
        "kind": "other"
      },
      {
        "name": "Butter Pecan Bourbon",
        "notes": "A flavored bean pairing buttery toasted pecan with a bourbon twist.",
        "kind": "other"
      },
      {
        "name": "Peach Cobbler",
        "notes": "Flavors of ripe juicy peaches, brown sugar, butter and cinnamon.",
        "kind": "other"
      },
      {
        "name": "Beach Bark",
        "notes": "A classic holiday pairing of white chocolate and peppermint with a coco-nutty south-coast twist (seasonal).",
        "kind": "other"
      },
      {
        "name": "Holidays are a Beach",
        "notes": "A decadent seasonal blend of caramel, pecan, coconut and warm spices.",
        "kind": "other"
      },
      {
        "name": "Decaf Colombia Sugar Cane",
        "notes": "Colombian beans decaffeinated via the natural sugar-cane (EA) process.",
        "origin": "Colombia",
        "kind": "decaf"
      },
      {
        "name": "Single Origin Reserve - Uganda",
        "notes": "A Ugandan reserve offering from their single-origin program.",
        "origin": "Uganda",
        "kind": "single-origin"
      }
    ],
    "offers": "\"Three and Slap Your Knee\" coffee subscription: pick any 3 of their coffees, shipped once a month, $45.95 (product page on birchinlanecoffee.com)."
  }
];
