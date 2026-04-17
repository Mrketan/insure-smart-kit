export interface Plan {
  id: number;
  name: string;
  insurer: string;
  price: number;
  coverageAmount: number; // numeric for comparison
  coverage: string;
  benefits: string[];
  badge?: "Best Value" | "Cheapest" | "Recommended" | "Most Popular";
  rating: number;
  bought: number;
  roomRent: string;
  restore: string;
  maternity: string;
  opd: string;
  cashless: string;
  claimRatio: string;
}

export const plans: Plan[] = [
  {
    id: 1,
    name: "Health Protect Gold",
    insurer: "Star Health",
    price: 599,
    coverageAmount: 1000000,
    coverage: "₹10 Lakh",
    benefits: [
      "Cashless at 10,000+ hospitals",
      "No room rent limit",
      "Free health checkup",
      "OPD cover included",
    ],
    badge: "Best Value",
    rating: 4.8,
    bought: 47,
    roomRent: "No limit",
    restore: "Yes",
    maternity: "No",
    opd: "Yes",
    cashless: "10,000+",
    claimRatio: "98.5%",
  },
  {
    id: 2,
    name: "Optima Secure",
    insurer: "HDFC Ergo",
    price: 449,
    coverageAmount: 500000,
    coverage: "₹5 Lakh",
    benefits: [
      "Cashless at 8,000+ hospitals",
      "Day 1 coverage",
      "Maternity benefit",
      "Restore benefit",
    ],
    badge: "Cheapest",
    rating: 4.6,
    bought: 32,
    roomRent: "₹5,000/day",
    restore: "Yes",
    maternity: "Yes",
    opd: "No",
    cashless: "8,000+",
    claimRatio: "97.2%",
  },
  {
    id: 3,
    name: "Health Companion",
    insurer: "ICICI Lombard",
    price: 799,
    coverageAmount: 2500000,
    coverage: "₹25 Lakh",
    benefits: [
      "Unlimited restore",
      "Global coverage",
      "Personal health coach",
      "Doctor + OPD bundle",
    ],
    badge: "Recommended",
    rating: 4.9,
    bought: 58,
    roomRent: "No limit",
    restore: "Unlimited",
    maternity: "Yes",
    opd: "Yes",
    cashless: "12,000+",
    claimRatio: "99.1%",
  },
  {
    id: 4,
    name: "Arogya Sanjeevani",
    insurer: "Niva Bupa",
    price: 349,
    coverageAmount: 300000,
    coverage: "₹3 Lakh",
    benefits: [
      "Standard IRDAI plan",
      "Cashless available",
      "Cataract coverage",
      "Ambulance cover",
    ],
    rating: 4.3,
    bought: 19,
    roomRent: "1% of SI",
    restore: "No",
    maternity: "No",
    opd: "No",
    cashless: "6,500+",
    claimRatio: "95.8%",
  },
  {
    id: 5,
    name: "Super Top-Up Plan",
    insurer: "Care Health",
    price: 299,
    coverageAmount: 5000000,
    coverage: "₹50 Lakh",
    benefits: [
      "Top-up on existing plan",
      "Very low premium",
      "No sub-limits",
      "Tax benefit u/s 80D",
    ],
    badge: "Most Popular",
    rating: 4.5,
    bought: 25,
    roomRent: "No limit",
    restore: "Yes",
    maternity: "No",
    opd: "No",
    cashless: "9,000+",
    claimRatio: "96.4%",
  },
];
