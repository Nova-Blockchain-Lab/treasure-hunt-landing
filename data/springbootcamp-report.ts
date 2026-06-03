// Spring Bootcamp — Teams Treasure Hunt Report — 2026-04-07
// Contract: 0xe39815326fcad14d2f860b4b5262d5a69647a7ac
// Chain: Nova Cidade Chain (testnet)
// Token: Spring Bootcamp (SB)
// Sources: Blockscout Explorer API (on-chain events) + Supabase (tags, teams, users)
// Generated: 2026-04-07T17:06:10.181Z

export const TOKEN_NAME = "Spring Bootcamp"
export const TOKEN_SYMBOL = "SB"
export const CONTRACT_ADDRESS = "0xe39815326fcad14d2f860b4b5262d5a69647a7ac"
export const EXPLORER_URL = "https://testnet.explorer.novaims.unl.pt"
export const EVENT_DATE = "2026-04-07"

export const ACTIVITY = [
  {
    "date": "2026-04-07",
    "label": "4/7",
    "count": 239
  }
]

export const MINTING = [
  {
    "date": "2026-04-07",
    "label": "4/7",
    "amount": 45650
  }
]

export const BREAKDOWN = {
  "found": 220,
  "social": 19
}

export const TOTAL_CLAIMS = 239

export const TOP10 = [
  {
    "label": "leonorlcabrita",
    "balance": 8550
  },
  {
    "label": "TiagoCardoso",
    "balance": 6400
  },
  {
    "label": "nabil",
    "balance": 5550
  },
  {
    "label": "madalenag",
    "balance": 5500
  },
  {
    "label": "Rodrigo",
    "balance": 5000
  },
  {
    "label": "Madalena",
    "balance": 4000
  },
  {
    "label": "Luis",
    "balance": 2550
  },
  {
    "label": "DaviAraujo",
    "balance": 2400
  },
  {
    "label": "MartimEsteves",
    "balance": 1600
  },
  {
    "label": "Vicente",
    "balance": 800
  }
]

export const TEAM_LEADERBOARD = [
  {
    "rank": 1,
    "name": "Data Ninjas",
    "color": "#FF006E",
    "icon": "",
    "mvp": 8900,
    "found": 42,
    "members": 3
  },
  {
    "rank": 2,
    "name": "Byte Squad",
    "color": "#00FFFF",
    "icon": "",
    "mvp": 8650,
    "found": 39,
    "members": 3
  },
  {
    "rank": 3,
    "name": "Data Explorers",
    "color": "#9FD356",
    "icon": "",
    "mvp": 8100,
    "found": 39,
    "members": 4
  },
  {
    "rank": 4,
    "name": "Block Busters",
    "color": "#00FFFF",
    "icon": "",
    "mvp": 6400,
    "found": 32,
    "members": 3
  },
  {
    "rank": 5,
    "name": "AI Crew",
    "color": "#FF6B35",
    "icon": "",
    "mvp": 5200,
    "found": 25,
    "members": 3
  },
  {
    "rank": 6,
    "name": "NFTrouble",
    "color": "#FFD700",
    "icon": "",
    "mvp": 4800,
    "found": 24,
    "members": 3
  },
  {
    "rank": 7,
    "name": "Token Titans",
    "color": "#FF4444",
    "icon": "",
    "mvp": 3400,
    "found": 17,
    "members": 4
  }
]

export const TEAM_RACE = [
  {
    "name": "Data Ninjas",
    "color": "#FF006E",
    "eligible": 42,
    "found": 42,
    "progress": 100
  },
  {
    "name": "Byte Squad",
    "color": "#00FFFF",
    "eligible": 42,
    "found": 39,
    "progress": 93
  },
  {
    "name": "Data Explorers",
    "color": "#9FD356",
    "eligible": 42,
    "found": 39,
    "progress": 93
  },
  {
    "name": "Block Busters",
    "color": "#00FFFF",
    "eligible": 42,
    "found": 32,
    "progress": 76
  },
  {
    "name": "AI Crew",
    "color": "#FF6B35",
    "eligible": 42,
    "found": 25,
    "progress": 60
  },
  {
    "name": "NFTrouble",
    "color": "#FFD700",
    "eligible": 42,
    "found": 24,
    "progress": 57
  },
  {
    "name": "Token Titans",
    "color": "#FF4444",
    "eligible": 42,
    "found": 17,
    "progress": 40
  }
]

function fmtHour(h: number) {
  if (h === 0) return '12 AM'
  if (h === 12) return '12 PM'
  return h < 12 ? `${h} AM` : `${h - 12} PM`
}

export const HOURLY = [
  {
    "hour": 0,
    "label": "12 AM",
    "count": 0
  },
  {
    "hour": 1,
    "label": "1 AM",
    "count": 0
  },
  {
    "hour": 2,
    "label": "2 AM",
    "count": 0
  },
  {
    "hour": 3,
    "label": "3 AM",
    "count": 0
  },
  {
    "hour": 4,
    "label": "4 AM",
    "count": 0
  },
  {
    "hour": 5,
    "label": "5 AM",
    "count": 0
  },
  {
    "hour": 6,
    "label": "6 AM",
    "count": 0
  },
  {
    "hour": 7,
    "label": "7 AM",
    "count": 0
  },
  {
    "hour": 8,
    "label": "8 AM",
    "count": 0
  },
  {
    "hour": 9,
    "label": "9 AM",
    "count": 0
  },
  {
    "hour": 10,
    "label": "10 AM",
    "count": 0
  },
  {
    "hour": 11,
    "label": "11 AM",
    "count": 0
  },
  {
    "hour": 12,
    "label": "12 PM",
    "count": 0
  },
  {
    "hour": 13,
    "label": "1 PM",
    "count": 1
  },
  {
    "hour": 14,
    "label": "2 PM",
    "count": 131
  },
  {
    "hour": 15,
    "label": "3 PM",
    "count": 107
  },
  {
    "hour": 16,
    "label": "4 PM",
    "count": 0
  },
  {
    "hour": 17,
    "label": "5 PM",
    "count": 0
  },
  {
    "hour": 18,
    "label": "6 PM",
    "count": 0
  },
  {
    "hour": 19,
    "label": "7 PM",
    "count": 0
  },
  {
    "hour": 20,
    "label": "8 PM",
    "count": 0
  },
  {
    "hour": 21,
    "label": "9 PM",
    "count": 0
  },
  {
    "hour": 22,
    "label": "10 PM",
    "count": 0
  },
  {
    "hour": 23,
    "label": "11 PM",
    "count": 0
  }
]

export const TREASURE_POPULARITY = [
  {
    "rank": 1,
    "name": "Perto do café do can",
    "finds": 7,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 2,
    "name": "Piso 0-1",
    "finds": 7,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 3,
    "name": "Reading is cool 🤓",
    "finds": 7,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 4,
    "name": "Que sede!",
    "finds": 7,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 5,
    "name": "Up and down",
    "finds": 7,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 6,
    "name": "Placa patio",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 7,
    "name": "YOU SHALL NOT PASS!!",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 8,
    "name": "Bridge room",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 9,
    "name": "Salao nobre",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 10,
    "name": "Não precisas do elevador",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 11,
    "name": "Elevador can",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 12,
    "name": "Piso 1 salas de aulas",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 13,
    "name": "Anexos blue point",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 14,
    "name": "Refresca-te!",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 15,
    "name": "Rececão",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 16,
    "name": "Main stairs",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 17,
    "name": "Biblioteca",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 18,
    "name": "Fonte da vida",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 19,
    "name": "Montra Rececão",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 20,
    "name": "Sala de estudo 24",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 21,
    "name": "Officer 2",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 22,
    "name": "Aulas",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 23,
    "name": "Wc",
    "finds": 6,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 24,
    "name": "Entra na Nova IMS por aqui!",
    "finds": 5,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 25,
    "name": "Cartel do bombeiros",
    "finds": 5,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 26,
    "name": "Hogwarts Staircase",
    "finds": 5,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 27,
    "name": "Bebedouro",
    "finds": 5,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 28,
    "name": "Banco",
    "finds": 5,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 29,
    "name": "Onde deixas os guarda chuvas?",
    "finds": 5,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 30,
    "name": "In case of fire 🔥",
    "finds": 4,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 31,
    "name": "Entrada",
    "finds": 4,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 32,
    "name": "Impressora can",
    "finds": 4,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 33,
    "name": "Água vai",
    "finds": 4,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 34,
    "name": "Mesa",
    "finds": 4,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 35,
    "name": "Light tag",
    "finds": 4,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 36,
    "name": "Classes and exams here",
    "finds": 4,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 37,
    "name": "Green tag",
    "finds": 4,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 38,
    "name": "Bluepoint",
    "finds": 3,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 39,
    "name": "Bar",
    "finds": 3,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 40,
    "name": "Can (antiga Su facho)",
    "finds": 3,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 41,
    "name": "Blockchain lab",
    "finds": 3,
    "hiddenBy": "Venue",
    "reward": 200
  },
  {
    "rank": 42,
    "name": "Blue point",
    "finds": 2,
    "hiddenBy": "Venue",
    "reward": 200
  }
]

export const FUN_FACTS = [
  {
    "label": "First Claim",
    "value": "Apr 7, 2:57 PM",
    "sub": "ObjectClaimed event",
    "color": "#58A6FF"
  },
  {
    "label": "Last Claim",
    "value": "Apr 7, 4:46 PM",
    "sub": "Social claim",
    "color": "#F0605D"
  },
  {
    "label": "Most Active Hunter",
    "value": "leonorlcabrita",
    "sub": "8,550 SB earned",
    "color": "#56D364"
  },
  {
    "label": "Avg SB per Hunter",
    "value": "2,283",
    "sub": "45,650 ÷ 20",
    "color": "#FF9A76"
  },
  {
    "label": "Most Popular Treasure",
    "value": "Perto do café do can",
    "sub": "7 finds",
    "color": "#58A6FF"
  },
  {
    "label": "Peak Hour",
    "value": "2 PM UTC",
    "sub": "131 transactions",
    "color": "#F0605D"
  },
  {
    "label": "Leading Team",
    "value": "Data Ninjas",
    "sub": "8,900 SB",
    "color": "#56D364"
  },
  {
    "label": "Total Teams",
    "value": "7",
    "sub": "23 players",
    "color": "#FF9A76"
  }
]

export const HERO_STATS = [
  {
    "value": 7,
    "label": "Teams",
    "color": "#56D364"
  },
  {
    "value": 42,
    "label": "Total Treasures",
    "color": "#58A6FF"
  },
  {
    "value": 45650,
    "label": "SB Minted",
    "color": "#F0605D"
  },
  {
    "value": 20,
    "label": "Unique Hunters",
    "color": "#FF9A76"
  },
  {
    "value": 220,
    "label": "Treasures Found",
    "color": "#56D364"
  },
  {
    "value": 239,
    "label": "Total Transactions",
    "color": "#58A6FF"
  }
]
