// Chart data extracted from recap.html
export const ACTIVITY = [
  { date: '2026-02-18', label: '2/18', count: 800 },
  { date: '2026-02-19', label: '2/19', count: 1050 },
  { date: '2026-02-20', label: '2/20', count: 1423 },
  { date: '2026-02-21', label: '2/21', count: 67 },
]

export const MINTING = [
  { date: '2026-02-18', label: '2/18', amount: 116505 },
  { date: '2026-02-19', label: '2/19', amount: 144550 },
  { date: '2026-02-20', label: '2/20', amount: 194600 },
  { date: '2026-02-21', label: '2/21', amount: 6600 },
]

export const BREAKDOWN = {
  found: 992,
  hidden: 33,
  social: 357,
  qr: 17,
  merch: 137,
}

export const TOTAL_CLAIMS = 1536

export const TOP10 = [
  { label: 'zkprof', balance: 10100 },
  { label: 'kingdabtech', balance: 9500 },
  { label: 'samanthatseng', balance: 7900 },
  { label: 'blueblue', balance: 7800 },
  { label: 'bitfiend', balance: 7400 },
  { label: 'arbargar', balance: 7350 },
  { label: 'hyeonjj', balance: 7300 },
  { label: 'harpoon', balance: 7300 },
  { label: 'andreachello', balance: 6900 },
  { label: 'rudi', balance: 6750 },
]

function fmtHour(h: number) {
  if (h === 0) return '12 AM'
  if (h === 12) return '12 PM'
  return h < 12 ? `${h} AM` : `${h - 12} PM`
}

export const HOURLY = [
  { hour: 0, label: fmtHour(0), count: 0 },
  { hour: 1, label: fmtHour(1), count: 0 },
  { hour: 2, label: fmtHour(2), count: 1 },
  { hour: 3, label: fmtHour(3), count: 0 },
  { hour: 4, label: fmtHour(4), count: 0 },
  { hour: 5, label: fmtHour(5), count: 0 },
  { hour: 6, label: fmtHour(6), count: 0 },
  { hour: 7, label: fmtHour(7), count: 1 },
  { hour: 8, label: fmtHour(8), count: 22 },
  { hour: 9, label: fmtHour(9), count: 95 },
  { hour: 10, label: fmtHour(10), count: 239 },
  { hour: 11, label: fmtHour(11), count: 239 },
  { hour: 12, label: fmtHour(12), count: 349 },
  { hour: 13, label: fmtHour(13), count: 412 },
  { hour: 14, label: fmtHour(14), count: 447 },
  { hour: 15, label: fmtHour(15), count: 458 },
  { hour: 16, label: fmtHour(16), count: 419 },
  { hour: 17, label: fmtHour(17), count: 500 },
  { hour: 18, label: fmtHour(18), count: 143 },
  { hour: 19, label: fmtHour(19), count: 3 },
  { hour: 20, label: fmtHour(20), count: 1 },
  { hour: 21, label: fmtHour(21), count: 0 },
  { hour: 22, label: fmtHour(22), count: 1 },
  { hour: 23, label: fmtHour(23), count: 10 },
]

// Treasure popularity (excluding UUID-named and 0-find treasures)
export const TREASURE_POPULARITY = [
  { rank: 1, name: 'Merch Night Market', finds: 62, hiddenBy: 'Venue' },
  { rank: 2, name: 'BUIDLHub Mentor Desk', finds: 47, hiddenBy: 'Venue' },
  { rank: 3, name: 'New France Village', finds: 44, hiddenBy: 'Venue' },
  { rank: 4, name: 'Art Gallery', finds: 44, hiddenBy: 'Venue' },
  { rank: 5, name: 'Futurllama', finds: 41, hiddenBy: 'Venue' },
  { rank: 6, name: 'Vibez Lounge', finds: 41, hiddenBy: 'Venue' },
  { rank: 7, name: 'Media Lounge', finds: 40, hiddenBy: 'Venue' },
  { rank: 8, name: 'Blockchain Arcade', finds: 38, hiddenBy: 'Venue' },
  { rank: 9, name: 'Prosperia', finds: 37, hiddenBy: 'Venue' },
  { rank: 10, name: 'Devtopia', finds: 36, hiddenBy: 'Venue' },
  { rank: 11, name: 'SporkWhale Lounge', finds: 35, hiddenBy: 'Venue' },
  { rank: 12, name: 'Main Stage Entrance', finds: 35, hiddenBy: 'Venue' },
  { rank: 13, name: '#BUIDL Garage', finds: 33, hiddenBy: 'Venue' },
  { rank: 14, name: 'Museum of Ethereum', finds: 31, hiddenBy: 'Venue' },
  { rank: 15, name: 'Etherspace', finds: 30, hiddenBy: 'Venue' },
  { rank: 16, name: 'Zen Zone', finds: 30, hiddenBy: 'Venue' },
  { rank: 17, name: 'Networking Lounge', finds: 29, hiddenBy: 'Venue' },
  { rank: 18, name: 'InfraredTrading.com', finds: 28, hiddenBy: 'aktary' },
  { rank: 19, name: 'Starbuffs Coffee Bar', finds: 28, hiddenBy: 'Venue' },
  { rank: 20, name: '404 Den', finds: 27, hiddenBy: 'Venue' },
  { rank: 21, name: 'MakerSpace', finds: 27, hiddenBy: 'Venue' },
  { rank: 22, name: 'Main Stage', finds: 26, hiddenBy: 'Venue' },
  { rank: 23, name: 'Stand With Crypto Lounge', finds: 25, hiddenBy: 'Venue' },
  { rank: 24, name: 'New BUIDL City Entrance', finds: 24, hiddenBy: 'Venue' },
  { rank: 25, name: 'Meet the devs - @Avataris12', finds: 23, hiddenBy: 'Venue' },
  { rank: 26, name: 'BUILDHub Mentor Stage', finds: 20, hiddenBy: 'Venue' },
  { rank: 27, name: 'matcha.xyz Matcha Garden', finds: 17, hiddenBy: 'Venue' },
  { rank: 28, name: 'Xao', finds: 17, hiddenBy: 'btree' },
  { rank: 29, name: 'Meet the devs - 0xChefMike', finds: 16, hiddenBy: 'Venue' },
  { rank: 30, name: 'Kal', finds: 13, hiddenBy: 'cephers' },
  { rank: 31, name: 'Bathroom Time', finds: 11, hiddenBy: 'arbargar' },
  { rank: 32, name: 'Floating Tag', finds: 10, hiddenBy: 'djamg' },
  { rank: 33, name: 'sharoninavolvodrinkingcoffee', finds: 8, hiddenBy: 'sharoninavolvodrinkingcoffee' },
  { rank: 34, name: 'Unicorn Magic', finds: 6, hiddenBy: 'beemeeupnow' },
  { rank: 35, name: 'Hopi Customs', finds: 5, hiddenBy: 'hopi' },
  { rank: 36, name: 'Buffi backrow', finds: 2, hiddenBy: 'zkprof' },
  { rank: 37, name: 'Rhinocat', finds: 2, hiddenBy: 'rhinocat' },
]

// Merch store (excluding "Deleted Item" rows)
export const MERCH_ITEMS = [
  { rank: 1, name: 'Night Market Claw Play', price: 1000, sold: 78, burned: 78000 },
  { rank: 2, name: 'Nova Blockchain Lab T-shirt', price: 1500, sold: 15, burned: 22500 },
  { rank: 3, name: 'Nova Blockchain Lab Socks', price: 700, sold: 10, burned: 7300 },
  { rank: 4, name: '2026 ETHDenver T-Shirt', price: 5000, sold: 8, burned: 41680 },
  { rank: 5, name: 'Nova Blockchain Lab Pink Hat', price: 1500, sold: 4, burned: 6000 },
  { rank: 6, name: 'Nova Blockchain Lab Black Hat', price: 1500, sold: 2, burned: 3000 },
]

// Fun facts
export const FUN_FACTS = [
  { label: 'firstClaim', value: 'Feb 18, 8:55 AM MST', sub: '', color: '#22D1EE' },
  { label: 'lastClaim', value: 'Feb 21, 4:22 PM MST', sub: '', color: '#FF57B1' },
  { label: 'mostActiveHunter', value: 'zkprof', sub: '67 mint events', color: '#FFE739' },
  { label: 'biggestSingleReward', value: '1,000 BUFFI', sub: 'harpoon', color: '#6245EB' },
  { label: 'avgBuffiPerHunter', value: '2,233', sub: '', color: '#22D1EE' },
  { label: 'topHider', value: 'arbargar', sub: '2 tags hidden', color: '#FF57B1' },
  { label: 'mostPopularTreasure', value: 'Merch Night Market', sub: '62 finds', color: '#FFE739' },
  { label: 'hottestMerch', value: 'Night Market Claw Play', sub: '78 purchased', color: '#6245EB' },
  { label: 'uniqueHidersLabel', value: '29', sub: '33 tags hidden', color: '#22D1EE' },
]

// Hero stats
export const HERO_STATS = [
  { value: 59, label: 'totalTreasures', color: '#FFE739' },
  { value: 462255, label: 'buffiMinted', color: '#22D1EE' },
  { value: 207, label: 'uniqueHunters', color: '#FF57B1' },
  { value: 992, label: 'treasuresFound', color: '#6245EB' },
  { value: 33, label: 'treasuresHidden', color: '#FFE739' },
  { value: 137, label: 'merchPurchased', color: '#22D1EE' },
]
