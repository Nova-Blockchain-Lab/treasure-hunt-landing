export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-treasure-hunt-drove-engagement-ethdenver-2026',
    title: 'How Treasure Hunt Drove 992 Treasure Finds and 462K Rewards at ETHDenver 2026',
    description:
      'Case study: 207 players found 992 treasures and minted 462,255 BUFFI tokens across 59 checkpoints at ETHDenver 2026. Here\'s how gamification transformed conference engagement.',
    date: '2026-03-06',
    content: `ETHDenver 2026 ran for four days across one of the largest crypto conference venues in the world. Thousands of attendees, dozens of sponsors, and a sprawling MakerSpace floor packed with booths competing for attention.

The challenge every conference organizer faces: how do you get people to actually explore the venue? How do you drive foot traffic to sponsors tucked in back corners? How do you keep energy high across multiple days?

We deployed Treasure Hunt across the entire ETHDenver MakerSpace from February 18-21, 2026. Here's what happened.

## The Setup

59 NFC and QR checkpoints were placed strategically throughout the venue. Each checkpoint represented a "treasure" that attendees could find by tapping their phone against an NFC tag or scanning a QR code.

No app download required. Players visited a URL, signed in with one tap through unicorn.eth, and started playing within 30 seconds.

Every scan earned BUFFI tokens, the event's in-game currency. Players could spend BUFFI at a built-in merch store on items like t-shirts, hats, socks, and claw machine plays at the Night Market.

## The Numbers

Over four days, Treasure Hunt generated these results:

- **207 unique players** actively participated
- **992 treasures found** across 59 checkpoints
- **462,255 BUFFI tokens minted** on-chain
- **137 merch store purchases** by 73 unique shoppers
- **213,820 BUFFI burned** through the merch store
- **33 player-hidden treasures** placed by 29 unique hiders

The peak hour hit at 5 PM with 500 transactions in a single hour. Activity consistently ramped up through the afternoon, with the heaviest engagement between noon and 6 PM each day.

## What Drove Engagement

Three mechanics kept players coming back across all four days.

**Checkpoints created a reason to move.** Attendees didn't just walk past booths. They walked *to* them. The most popular checkpoint, Merch Night Market, was found 62 times. BUIDLHub Mentor Desk hit 47 finds. Even smaller areas like Zen Zone and Networking Lounge pulled 29-30 finds each.

**The leaderboard created competition.** The top player, zkprof, accumulated 10,100 BUFFI across 67 individual mint events. The top 10 leaderboard stayed tight, with only 3,350 BUFFI separating first and tenth place. That closeness kept players hunting.

**The merch store gave rewards tangible value.** 137 purchases proved that players didn't just collect points for the sake of it. They spent them. The Night Market Claw Play was the hottest item with 78 purchases. Nova Blockchain Lab T-shirts and the limited 2026 ETHDenver T-Shirt drove significant BUFFI burns at higher price points.

## The Vendor Effect

One result stood out. A custom sneaker vendor had a booth in a back corner of the venue with almost no natural foot traffic. After a Treasure Hunt checkpoint was hidden at his location, attendees started showing up consistently. They'd scan the NFC tag, notice the custom sneakers on display, and start buying.

In his words: "That one checkpoint completely turned my weekend around."

This is the sponsor value proposition in action. Checkpoints don't just drive engagement. They drive foot traffic to specific locations that event organizers and sponsors choose.

## Player-Hidden Treasures

An unexpected dynamic emerged. 29 players hid their own treasures across the venue, creating 33 additional checkpoints. This user-generated content extended the game beyond the official checkpoint map and created an organic discovery layer.

One player hid a treasure called "Bathroom Time." It was found 11 times. The game's most creative moments came from the community itself.

## What the Data Shows

Daily activity followed a clear pattern. Day one (Feb 18) started strong with 800 transactions as players discovered the game. Day two climbed to 1,050. Day three peaked at 1,423 transactions as competition intensified. Day four dropped to 67 as the event wound down.

The minting timeline tells a similar story: 116,505 BUFFI on day one, 144,550 on day two, 194,600 on the peak day three, and 6,600 on the final day.

This pattern suggests that gamification works best when it has time to build. Players who discovered the game on day one brought friends on day two. Word of mouth drove adoption more than any single announcement.

## Key Takeaways for Event Organizers

**Physical placement matters.** The top 10 treasures were all placed at high-visibility venue locations. Strategic checkpoint placement directly correlates with engagement volume.

**Rewards need to feel real.** 137 merch purchases prove that a well-designed reward economy drives deeper participation than points alone.

**Competition sustains engagement across days.** The leaderboard kept the top 10 players active across all four days, not just the first.

**Zero friction is non-negotiable.** No app download, no wallet setup, no gas fees. Players were scanning within 30 seconds of their first interaction. Every barrier you remove multiplies your participation rate.

Every transaction from ETHDenver 2026 is recorded on-chain and publicly verifiable on the Nova Cidade Chain explorer. The data doesn't lie, and organizers can share it with sponsors as proof of engagement.`,
  },
  {
    slug: 'gamifying-conferences-qr-nfc-scavenger-hunts',
    title: 'Gamifying Conferences with QR and NFC Scavenger Hunts: A Practical Guide',
    description:
      'How to run a QR and NFC scavenger hunt at your conference. Learn the checkpoint model, leaderboard psychology, and merch store mechanics with real data from ETHDenver 2026.',
    date: '2026-03-06',
    content: `Conference attendees have a short attention span and a long list of sessions to skip. The booths in the back corner get ignored. The sponsor who paid for premium placement watches people walk past without stopping.

Gamification fixes this. Not the shallow kind where you hand out points for checking in. The kind where attendees actively explore your venue because the game makes it worth their time.

Here's how QR and NFC scavenger hunts work at conferences, what makes them effective, and what we learned deploying one at ETHDenver 2026 with 207 active players.

## The Checkpoint Model

The core mechanic is simple. You place NFC tags or QR codes at specific locations throughout your venue. Each tag is a "checkpoint" worth a reward.

Attendees tap their phone on an NFC tag or scan a QR code. The reward is credited instantly. No delay, no verification step, no friction.

**NFC tags** work with a physical tap. Place them on tables, walls, lanyards, or hidden spots. The tap feels deliberate and satisfying, like collecting a physical object.

**QR codes** work at range. Print them on signage, booth banners, or event badges. They're easier to deploy at scale and work in situations where physical contact isn't practical.

At ETHDenver 2026, we used a mix of both across 59 checkpoints. The venue covered everything from the Main Stage entrance to the Zen Zone to sponsor booths like InfraredTrading.com and matcha.xyz's Matcha Garden.

## No App Download. No Excuses.

The single biggest predictor of participation is friction at the entry point.

Treasure Hunt runs entirely in the phone browser. Attendees visit a URL and sign in through unicorn.eth with one tap. No app store, no account creation form, no wallet setup. The entire onboarding takes under 30 seconds.

At ETHDenver 2026, this zero-friction approach contributed to 207 players participating organically. No one was required to play. The game spread through word of mouth and visible NFC tags across the venue.

If your gamification requires an app download, expect to lose 70-80% of potential players before they start.

## Leaderboard Psychology

A live leaderboard turns casual participation into sustained competition.

At ETHDenver, the top 10 players were separated by just 3,350 points. That narrow gap kept the competition alive across all four days. Players checked the leaderboard, saw they were within striking distance of the next rank, and went hunting for more checkpoints.

The psychology works at every level of engagement:

**Casual players** see the leaderboard and discover checkpoints they missed. "I only found 5 out of 59? Let me go find more."

**Competitive players** check rankings obsessively and plan routes to maximize their score. The top player, zkprof, logged 67 separate mint events across four days.

**Social players** compete with friends. Small groups formed around the venue, racing each other to find hidden treasures.

The leaderboard also creates a visible social proof loop. When other attendees see players actively scanning and competing, they ask "what's that?" and join in.

## The Merch Store: Where Rewards Become Real

Points that can't be spent are points that don't motivate.

Treasure Hunt includes a built-in merch store where players spend their earned tokens on physical items. At ETHDenver, the store offered:

- Night Market Claw Play (1,000 BUFFI) — 78 purchases
- Nova Blockchain Lab T-shirts (1,500 BUFFI) — 15 purchases
- Socks (700 BUFFI) — 10 purchases
- Limited 2026 ETHDenver T-Shirts (5,000 BUFFI) — 8 purchases
- Hats in pink and black (1,500 BUFFI each)

137 total purchases across 73 unique shoppers. That's 35% of all players converting to merch buyers.

The merch store creates a burn mechanism. Players earn tokens, then spend them, which keeps the economy active and gives the rewards tangible value. 213,820 BUFFI were burned through purchases.

## Strategic Placement Drives Sponsor Value

Checkpoint placement is the organizer's most powerful tool. You decide where the checkpoints go, which means you decide where attendees walk.

At ETHDenver, the data showed clear patterns. The most-found treasure (Merch Night Market, 62 finds) was in a high-traffic area. But checkpoints also pulled traffic to less obvious spots. A custom sneaker vendor in a back corner saw consistent foot traffic after a checkpoint was placed at his booth.

For sponsors, this is measurable ROI. You can show exactly how many people visited a specific location, when they visited, and how that compares to other areas of the venue. Every interaction is logged on-chain and verifiable.

## How to Run Your Own Conference Scavenger Hunt

**Step 1: Map your venue.** Identify high-priority locations: sponsor booths, underexplored areas, food stations, main stages. Each becomes a checkpoint.

**Step 2: Set reward tiers.** Not every checkpoint needs to be worth the same amount. Hidden or hard-to-find checkpoints can offer higher rewards to incentivize exploration.

**Step 3: Stock the merch store.** Physical items that attendees want to take home. T-shirts, hats, stickers, and experience-based rewards like claw machine plays all work.

**Step 4: Launch with zero friction.** Browser-based, one-tap sign-in, no app download. The lower the barrier, the higher the participation.

**Step 5: Let the leaderboard do the work.** Display it on screens around the venue. Announce top players during sessions. The competition markets itself.

At ETHDenver, activity peaked at 5 PM daily with up to 500 transactions in a single hour. The game sustained engagement across all four days without any additional push from organizers after launch.

The infrastructure runs on Nova Cidade Chain, a Layer 3 network that records every action transparently. A built-in paymaster covers all transaction fees, so participants never pay anything. The technology stays invisible. Players just play.`,
  },
  {
    slug: 'event-gamification-platform-guide-2026',
    title: 'Event Gamification Platforms in 2026: Why Interactive Beats Passive',
    description:
      'Why event gamification platforms are replacing traditional event apps in 2026. Learn how interactive engagement tools drive sponsor ROI, attendee retention, and real-time analytics.',
    date: '2026-03-06',
    content: `The event industry spent a decade pushing attendees toward event apps. Download this app, create a profile, opt into notifications, check the schedule, maybe scan a badge.

Most attendees never downloaded the app. The ones who did used it once and forgot about it.

In 2026, the shift is clear. Event organizers are moving away from passive information apps and toward interactive engagement tools that give attendees a reason to participate, not just attend.

## Why Traditional Event Apps Fail

Traditional event apps solve an organizer problem, not an attendee problem.

Organizers want a central hub for schedules, maps, speaker bios, and sponsor listings. Reasonable. But attendees already have a schedule in their email, a map in their pocket, and no interest in scrolling through sponsor profiles.

The result: download rates hover between 30-50% for well-promoted event apps. Active usage (more than opening once) drops to 15-25%. That means 75% or more of your attendees never meaningfully engage with your digital event layer.

The core problem: passive tools require attendees to find value on their own. Interactive tools create value that pulls attendees in.

## The Gamification Approach

Event gamification platforms flip the model. Instead of asking attendees to consume information, they ask attendees to do something.

Scan a checkpoint. Earn a reward. Climb the leaderboard. Spend points on merch. Explore areas of the venue you'd otherwise skip.

The shift from passive to interactive changes three things:

**Engagement becomes measurable.** When someone scans a checkpoint, you know exactly who engaged, where, and when. At ETHDenver 2026, Treasure Hunt logged 992 treasure finds and 462,255 token mints across 59 checkpoints in four days. Every interaction was on-chain and verifiable.

**Sponsor value becomes provable.** Traditional sponsorship metrics rely on estimated foot traffic and self-reported surveys. Gamification gives you exact numbers. 62 people found the Merch Night Market checkpoint. 47 visited BUIDLHub Mentor Desk. You can hand sponsors a report showing precisely how many attendees interacted with their activation.

**Retention extends across the full event.** At ETHDenver, daily transaction volume grew from 800 on day one to 1,423 on day three. Players returned each day because the leaderboard competition was ongoing and new checkpoints kept the experience fresh. Traditional event apps see usage drop after day one.

## The Web-Based Advantage

The most important technical decision in event gamification is eliminating the app download.

Every step between "hearing about it" and "playing" costs you participants. An app download is the biggest step. It requires finding the app store, searching, downloading, waiting, opening, creating an account, and granting permissions.

Browser-based gamification removes all of that. Attendees visit a URL, sign in with one tap, and start playing. At ETHDenver, the entire onboarding flow took under 30 seconds using unicorn.eth integration.

The result: 207 players participated organically at ETHDenver without any mandatory sign-up requirement. The game spread through word of mouth and visible NFC tags. Players saw others tapping tags, asked what they were doing, and joined in.

This web-based approach works because smartphones already have everything needed. NFC readers are built into modern phones. Camera-based QR scanning is native. No special hardware, no proprietary technology, no ecosystem lock-in.

## Data-Driven Sponsor Placement

Event gamification generates a dataset that traditional events simply can't produce.

Hourly activity data shows when attendees are most engaged. At ETHDenver, activity ramped up from 8 AM, peaked between noon and 6 PM, with the absolute peak at 5 PM (500 transactions in one hour). This tells organizers when to schedule sponsor activations for maximum impact.

Checkpoint popularity data shows which areas of the venue attract the most traffic. The top 10 checkpoints at ETHDenver each logged 35-62 finds. Bottom-tier checkpoints in less trafficked areas logged under 10. This data informs future venue layout decisions.

Player behavior data shows engagement patterns. The top 10 players at ETHDenver averaged 7,840 BUFFI each. 73 players (35%) spent tokens in the merch store. The average BUFFI per hunter was 2,233. These metrics help organizers calibrate reward economies for future events.

For sponsors, this data package replaces guesswork with evidence. Instead of "we estimate 500 people walked past your booth," you can say "47 people scanned the checkpoint at your booth on day two, with peak traffic at 2 PM."

## Real-Time Analytics for Organizers

Static post-event reports are useful but late. Event gamification platforms provide real-time dashboards that let organizers make decisions during the event.

If a sponsor area is underperforming, add a higher-value checkpoint. If a particular section of the venue is overcrowded, redirect traffic by activating checkpoints elsewhere. If engagement drops after lunch, trigger a limited-time bonus round.

At ETHDenver, the Treasure Hunt dashboard showed live transaction volumes, leaderboard standings, merch store inventory, and checkpoint heat maps. Organizers could see exactly what was happening across the venue at any moment.

This real-time visibility transforms events from static productions into dynamic experiences that adapt to attendee behavior.

## The Infrastructure Question

Event gamification platforms need infrastructure that's fast, transparent, and invisible to participants.

Treasure Hunt runs on Nova Cidade Chain, a dedicated Layer 3 network. Every checkpoint scan, every reward mint, every merch purchase is recorded on-chain and publicly verifiable. A built-in paymaster covers all transaction fees, so participants never pay a cent.

The blockchain layer serves two purposes. First, it provides an immutable record that sponsors and stakeholders can audit independently. Second, it enables the token economy (earning, spending, burning) without requiring participants to understand or interact with any blockchain technology.

From the attendee's perspective, they tap a tag and get a reward. The infrastructure is invisible.

## What to Look for in an Event Gamification Platform

If you're evaluating platforms for your next event, prioritize these capabilities:

**Zero-friction entry.** Browser-based, no app download, minimal sign-up. Every barrier reduces participation.

**Physical-digital integration.** NFC tags and QR codes that connect physical spaces to digital experiences. The game should exist in the venue, not just on a screen.

**Real reward economy.** Points that can be spent on real items. A merch store, raffle entries, or exclusive access. Rewards without redemption value lose their motivational power.

**Live leaderboard.** Visible competition drives sustained engagement. Display it on screens. Announce leaders during sessions.

**Real-time analytics.** Dashboard access during the event, not just a post-event PDF. The ability to adjust checkpoint values and activations in real-time.

**Transparent data.** Verifiable engagement metrics that you can share with sponsors as proof of ROI.

The event industry is moving past the "download our app" era. Attendees want experiences, not utilities. Interactive gamification platforms deliver measurable engagement that passive apps never could.`,
  },
  {
    slug: 'trade-show-booth-traffic-pscs-2026',
    title: 'Trade Show Booth Traffic: Data from 103 Checkpoints at PSCS 2026',
    description:
      'Case study: 351 players and 8,123 checkpoint scans over three days at the Portugal Smart Cities Summit 2026. What the data shows about trade fair foot traffic.',
    date: '2026-07-02',
    content: `Exhibitors at a trade fair all buy the same thing: a stand, and the hope that people walk up to it. Foot traffic decides whether the fair was worth the money, and most of it concentrates along the main aisles.

At the Portugal Smart Cities Summit 2026 (FIL Pavilhão 3, Lisbon, May 12 to 14) we ran Treasure Hunt across the whole floor. 103 checkpoints covered the floor: exhibitor stands, the stages, and the common zones. 351 visitors played over the three days. Here is what the data shows.

## The Setup

Each participating stand had an NFC tag or QR code registered as a checkpoint. Visitors scanned with their phone browser, earned FIL tokens per find, and could spend them at a merch store stocked with 47 different items. No app download, and every transaction fee was covered by the game, so playing cost visitors nothing.

## The Numbers

- **351 players** across three days
- **8,123 treasures found**, an average of 23 per player
- **103 checkpoints** across stands, stages, and common zones
- **91.2% of players** claimed a reward
- **717 merch purchases** from the 47-item store
- **159,000 FIL tokens** distributed on-chain
- **58 social shares** claimed in-game, 29 of them on LinkedIn

## What Booth Traffic Looked Like

The busiest checkpoint logged 245 unique visitors, which is 69.8% of everyone who played. That one was our own stand, where most players onboarded, so treat it as the ceiling rather than a typical result. The more useful signal is the middle of the table: the six tags in the stages zone alone pulled 275 finds from 178 unique players, and the single most-found stage tag was scanned 94 times.

Engagement was also broad rather than concentrated. The distribution of finds across players had a Gini coefficient of 0.39, meaning finds were spread across the player base rather than dominated by a few completionists.

## Most Visitors Come for One Day

278 players played on a single day, 35 came for two days, and only 7 played all three. That matches how people actually attend trade fairs, and it has a design consequence: the hunt has to be completable, and worth completing, within one visit. Multi-day streak mechanics that work at a conference do little at a fair.

Timing matters too. On day one, activity peaked at 11 AM with 408 scans in one hour, and again at 3 PM with 402. Mid-morning and mid-afternoon are when the floor is full, and when a sponsor activation gets the most out of a checkpoint.

## The Merch Store as a Draw

717 purchases over three days made the store one of the busiest spots in the game. Sponsored items work as their own checkpoint: the Lisboa Inteligente wireless charger sold out its 65 units by the final afternoon. A physical reward that people want gives the tokens a concrete value, and gives players a reason to keep scanning.

## What This Means for Exhibitors

A checkpoint at a stand does one simple thing: it gives visitors a reason to walk there that they did not have before. The exhibitor gets a number at the end, unique visitors and when they came, instead of an estimate. At PSCS 2026 that number was auditable, since every find was recorded on-chain.

The full interactive report, with per-stand tables, zone breakdowns and hour-by-hour charts, is public: see the [PSCS 2026 report](/smartcities-report). If you are weighing this for your own fair, the [trade show booth traffic](/trade-show-booth-traffic) page covers how a deployment works from the organizer side.`,
  },
  {
    slug: 'one-day-conference-gamification-data-summit-2026',
    title: 'Gamification at a One-Day Conference: Data with Purpose Summit 2026',
    description:
      'One day, 25 checkpoints, 58 players, 777 treasures found. What the Data with Purpose Summit 2026 shows about running a scavenger hunt when the event has no day two.',
    date: '2026-07-02',
    content: `Most of the engagement data we had published before this event came from multi-day deployments. At ETHDenver 2026, activity grew day over day and peaked on day three, driven largely by word of mouth. A reasonable objection follows: if the game needs days to build, what happens at an event that only has one?

The Data with Purpose Summit 2026 (NOVA IMS at Taguspark, Oeiras, June 25) gave us a clean answer. One day, 25 checkpoints, a professional audience of data practitioners. Here is how it went.

## The Numbers

- **58 players** in a single day
- **777 treasures found** across 25 checkpoints
- **13.4 finds per player** on average
- **89.7% of players** claimed a reward
- **25,900 DATA tokens** distributed
- **39 merch purchases** from a four-item store
- **816 on-chain transactions**, 100% of the fees sponsored

## The Whole Game Lives in Eight Hours

The hourly curve tells the story. 21 scans in the 8 AM hour as doors opened, 144 by 9 AM, and the peak at 10 AM with 173 scans. Activity held through lunch, 152 scans in the noon hour, then fell away through the afternoon and was effectively over by 5 PM.

The practical lesson: at a one-day event the hunt is a morning game. It has to launch when registration opens, not after the opening keynote. Checkpoints near the entrance and the coffee stations do the recruiting that word of mouth would otherwise do on day two.

## Depth Instead of Duration

Players averaged 13.4 finds each, against 4.8 at ETHDenver. The comparison is not controlled, since the venue was smaller and the audience different, but the direction is consistent with what we saw on the floor: with a compact venue and one day, the players who join go deep. The most-found checkpoint, at the Nova Blockchain Lab stand, was scanned by 40 of the 58 players, and three players found all 25 checkpoints.

A small merch catalogue was enough. Four items produced 39 purchases, and the blockchain-themed notebook alone moved 19 units. At this scale the store needs to be simple, not deep.

## What Carried Over From Multi-Day Events

Two things held regardless of event length. First, the claim rate: 89.7% of players who earned tokens claimed a reward, in line with our other deployments. When rewards are real, people collect them, one day or four. Second, zero friction: browser-based play with every transaction fee sponsored meant the onboarding cost stayed under a minute, which matters even more when there is no second day to recover a slow start.

## What We Would Tell a One-Day Organizer

Launch at the doors, weight the checkpoints toward the morning flow, keep the reward store small and physical, and put the leaderboard where the coffee is. The compressed timeline concentrates the game into the hours when the venue is full anyway.

The full data, including the hourly grid and the per-checkpoint table, is in the public [Data with Purpose Summit 2026 report](/datasummit-report). For the general model, see [event gamification](/event-gamification) or [QR scavenger hunts for events](/qr-scavenger-hunt-events).`,
  },
  {
    slug: 'team-scavenger-hunt-campus-spring-bootcamp-2026',
    title: 'Team Scavenger Hunts on Campus: 7 Teams, 220 Finds in One Afternoon',
    description:
      'How a team-based scavenger hunt played out at the NOVA IMS Spring Bootcamp 2026: seven teams, 220 treasures found, and a three-find margin at the top.',
    date: '2026-07-02',
    content: `Everything we had run up to April 2026 scored players as individuals. For the NOVA IMS Spring Bootcamp we switched the model: players joined teams, every find rolled up into a shared team score, and the leaderboard ranked teams instead of people. One campus, one afternoon, 20 hunters across 7 teams.

## The Numbers

- **7 teams**, 20 hunters
- **220 treasures found**, an average of 11 per hunter
- **19 social claims** on top of the physical finds
- **45,650 SB tokens** minted on-chain
- **3 finds** separated first place from second

## The Race Stayed Close

Data Ninjas won with 42 finds. Byte Squad and Data Explorers tied behind them at 39, a final margin of three finds.

Team size did not decide the outcome. The winning team had three members; Data Explorers had four and still finished behind them, and the last-placed team also had four.

## What Team Mode Changes

Scoring by team changes behavior in ways individual leaderboards do not.

**Nobody idles.** On an individual leaderboard, a player who falls behind quietly drops out. On a team, three other people notice. Average finds per hunter came out at 11 in a single afternoon.

**Strategy appears.** Individual play rewards walking fast. Team play rewards planning: who takes which building, who goes back for the missed tag, who handles the social claims.

**The game gets social by default.** Team formation itself works as an icebreaker, useful at an event where participants have just met.

## Where This Fits

The team model is built for groups that arrive together and should leave more connected: student orientations, bootcamps, open days, and corporate offsites. A campus works especially well as a venue because it is large enough to make routing decisions matter, and familiar enough that nobody gets lost.

The complete results, including the team race over the afternoon, are in the [Spring Bootcamp 2026 report](/springbootcamp-report). For the format itself, see [team building scavenger hunts](/team-building-scavenger-hunt) and [scavenger hunts for universities](/scavenger-hunt-universities).`,
  },
]
