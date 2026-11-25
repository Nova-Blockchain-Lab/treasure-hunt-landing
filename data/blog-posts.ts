export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  /** Last substantive edit, if after `date`. Feeds sitemap lastmod and BlogPosting.dateModified. */
  updated?: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'gamifying-conferences-qr-nfc-scavenger-hunts',
    title: 'How to Run a QR & NFC Scavenger Hunt at a Conference or Expo',
    description:
      'Running a QR or NFC scavenger hunt at a conference or expo: where to put the tags, what one tag does for a stand and when prizes go out. Data from Lisboa Games Week 2026.',
    date: '2026-03-06',
    updated: '2026-11-25',
    content: `At a conference or an expo, most people stay near the entrance, the main stage and the coffee. The stands at the back of the hall get passed by, and the sponsor who paid for one of them watches people walk past.

A scavenger hunt is one of the few things we have seen move people around a venue on purpose. Walking to a particular spot earns points, and the points buy something people want to take home.

We ran one at Lisboa Games Week 2026, in Pavilion 4 at FIL in Lisbon, from 19 to 22 November. Over four days, 2,221 players found tags 52,543 times. Lisboa Games Week is a games fair rather than a conference, but the floor works the same way: stands, stages, a food court and visitors deciding where to walk. This post covers how the format works and what that hall showed us.

## The checkpoint model

You place NFC tags or QR codes at specific spots. Each one is a checkpoint worth points. A player taps the tag with their phone or scans the code, and the points arrive straight away.

The two types suit different places. An NFC tag needs a physical tap, so it works on tables, walls and stand counters, and finding one feels like picking something up. A QR code can be scanned from a distance, which suits signs and banners, and it is cheaper to print in quantity. At Lisboa Games Week we used NFC tags, at 13 exhibitors' stands, at the stages and play areas, and around the hall. Players could also hide tags of their own, and 61 of them did.

## No app to install

Every step between hearing about the game and playing it loses players, and installing an app is the biggest step. We do not have a credible industry figure for how many players an app download costs you, and we are not going to invent one.

Treasure Hunt runs in the phone browser, with no app and no wallet to set up. At Lisboa Games Week, 2,622 people accepted the terms and 2,221 of them went on to earn points.

## How people move through a hall

The order in which each player found tags shows how they moved. In Pavilion 4 it followed a clear pattern.

People started at the front. 30% of days of play began in the entrance zone, which had 14% of all finds. The first tag of the day was a median 25 m from the entrance. By the 20th tag it was 69 m, about where a random order would put it.

They also worked through one area before moving to the next. 60% of moves between two tags stayed in the same zone, against 12% if players had picked tags at random, and the next tag was a median 15 m away. Most of them played in company: in 62% of the days of play with five or more tags, another player found the same tags within the same minute, tag after tag.

We read that as an argument for groups of tags in each zone rather than single tags spread thin, and for more tags at the back than at the front. Each of our tags at the front was found by 53% to 57% of the players in the game. At the main stage end it was 40%, and in the food court 42%.

## What one tag does for a stand

13 exhibitors had a tag at their stand. A stand with one tag was found by a median of 702 players, 37% of everyone who found tags after it went up. Across the seven stands with a single tag, the share ran from 33% to 46%.

A find is not a visit. It tells you how many players came to the tag, not how long they stayed or whether they spoke to anyone, and the report labels it that way.

Timing matters too. The Just Dance tag, tied to that part of the programme, went up on Saturday at 15:03 and was found 65 times in its first hour. The median tag had 24 finds in that hour. Tags added late still work: the Heimdall and Kriativu3d tags went up on Thursday evening and reached 42% and 36% of the players who played after that.

## Let players hide tags

Players could hide a tag of their own somewhere in the hall, and 61 did. Their tags were 5% of finds on Thursday, 27% on Friday, 47% on Saturday and 55% on Sunday. With more tags in the hall, the walk between them got shorter, from 18.6 m between consecutive tags on Thursday to 13.8 m on Sunday.

That is half the game on the last day, and the organiser did not have to plan or place any of it. The cost is control: some player tags changed position during the event, so you do not decide where every tag is.

## The store, and when prizes go out

Points need somewhere to go. Players traded them for prizes in the game and collected each prize at a stand by showing a QR code. At Lisboa Games Week, 728 players collected 1,390 prizes from more than 20 brands, at nine stands.

Finds peaked at 11:00 and 14:00, but prizes went out in the afternoon: 74% were collected between 14:00 and 19:00. Put more staff on the prize desk after lunch.

If a sponsor wants a visit it can count, hand its prizes out at its own stand. Collecting a prize was the only stand visit the game counted: 88 players collected theirs at Maggi's stand and 72 at Heimdall's. Most prizes, 1,120 of them, went out at the Treasure Hunt stand.

## What you can report afterwards

Each exhibitor gets a card with its own numbers and a link to share. No player data goes to exhibitors.

What the data cannot tell you is how many visitors did not play, because we count players, not fair visitors. With the organiser's hourly gate counts, the next report can say what share of visitors played.

Every find is recorded on a blockchain, and we pay the transaction fees, so players never pay anything. On the phone none of this shows. You tap a tag and get points.

## Running one yourself

- Split the floor into zones and put several tags in each, with more at the back and in the food court than at the entrance.
- Offer every exhibitor a tag. At Lisboa Games Week a stand with one tag was found by a median 37% of players.
- Tie some tags to the programme and put them up when a session starts.
- Let players hide their own tags. By the third day they were close to half of all finds.
- Hand sponsors' prizes out at their own stands, and staff the prize desk for the afternoon.
- Ask the organiser for hourly gate counts before the event, so the report can say what share of visitors played.

The full data, with the hall map hour by hour and a card for each stand, is in the [Lisboa Games Week 2026 report](https://lgw.treasurehunt.pt/report). For a conference with sponsor booths, see the [ETHDenver 2026 report](/ethdenver-report). The two checkpoint types are covered in [QR scavenger hunt for events](/qr-scavenger-hunt-events) and [NFC treasure hunt for events](/nfc-treasure-hunt).`,
  },
  {
    slug: 'event-gamification-platform-guide-2026',
    title: 'Event Gamification Platform Guide: Setting Up a Hunt',
    description:
      "How the Treasure Hunt platform works from the organiser's side: placing tags, setting rewards, stocking the store, the live leaderboard and the report.",
    date: '2026-03-06',
    updated: '2026-11-25',
    content: `This post walks through Treasure Hunt from the organiser's side, in the order things happen. It has no event results in it. Those are in the public reports linked near the end, so any claim here can be checked against real data.

## What players see

A player taps an NFC tag with their phone, or scans its QR code, and the game opens in the phone browser. They sign in once with an email address or a social login. After that, every tag they find adds points to their balance, a map shows the tags they haven't found yet, and the leaderboard shows where they stand. Once they have enough points, they buy a prize in the store and collect it at a stand.

There is nothing to install. The points are the event's own token (BUFFI at ETHDenver, FIL at the Smart Cities Summit), and each find and each purchase is a transaction on Nova Cidade, the blockchain the game runs on. Players never deal with any of that. Their account is created from their login, and a paymaster covers every transaction fee, so nobody pays anything to play.

## Deciding where the checkpoints go

Players walk to wherever a tag is, so this is the decision that shapes everything else. Organisers usually put tags at sponsor booths, at stands that need visitors, and in the parts of the venue people skip: the back of a hall, an upper floor, a garden. If you have a floor plan, bring it to the first call.

Each checkpoint is an NFC tag that also carries a QR code, so phones that can't read NFC still play. We design the tags and install them where you want them. Every tag gets a pin on the venue map and, if you want one, a hint that tells players roughly where to look. For how many to use, see [how many checkpoints an event needs](/blog/how-many-checkpoints-event-scavenger-hunt).

## Setting the reward on each tag

Tags don't all have to be worth the same. The reward is set per tag in the admin panel, so a sponsor stand or a hard-to-reach corner can pay more than the tag by the entrance. Of all the settings, this is the easiest way to pull people deeper into the venue.

Points can come from other places too. Players can earn them by following the event's accounts on Instagram, X or LinkedIn, and you can run polls inside the game.

## Letting players hide tags

You can also hand out tags for players to hide. A player claims a tag, names it and puts it somewhere in the venue, and everyone else finds it like any other checkpoint. Whoever hid it can rename it or pause it later. This adds checkpoints you didn't plan, and it gives people who have already found the official tags a reason to keep playing. You give up some control over where tags end up, so tell players where hiding is allowed.

## Stocking the store

The store is where points become something people take home: T-shirts, hats, sponsor giveaways. Each item has a photo, a price in the event's token, a stock count and the stand where it is collected. Sponsors can stock their own prizes and hand them out at their own stand, which brings each buyer back to that stand one more time.

When someone buys an item, the app shows them a QR code. A person at the stand scans it with their own phone, without logging in, and hands the item over. Each code can be redeemed once. Stock can be changed item by item during the event, as boxes run out or more arrive.

Price items against what a player can earn by finding every tag, not against what they cost you. Also expect people to shop at the end of their own visit rather than at closing time. A scarce prize runs out when the last big wave of visitors finishes, and that can be well before the doors close.

## The leaderboard

The leaderboard ranks players by points and updates with every find. Put it on a screen people pass more than once, by the store or near the main stage. If the top players win something, announce it at the start and fix the cut-off time in advance. Handing out a prize while the board is still moving starts arguments.

## During the event

Every package includes a live dashboard. It shows which tags are being found and which are quiet, how many people are playing and what the store has sold. If an area stays empty, you can move a tag there or raise the reward on the tags already in it.

Players can flag a tag that is missing or in the wrong place, with a photo. The flag appears in the admin panel next to the tag's pin on the map, so whoever is on the floor can fix it.

## The report after the event

With the Enterprise package we write a report after the event from the game's own records: finds per tag, activity by day and by hour, what the store sold and the final leaderboard. A find counts once per player per tag, so one person tapping the same tag five times does not inflate a sponsor's number. Only activity on the event's own days is counted, which keeps our setup taps out. Every transaction is on a public chain, so a sponsor can check the figures without asking us.

The reports from past events are public and give the clearest picture of what you get. [Portugal Smart Cities Summit 2026](/smartcities-report) is a three-day trade fair, [Data with Purpose Summit 2026](/datasummit-report) a one-day conference, [Festival da Juventude 2026](/cadaval-report) a town festival in Cadaval, [Future Maker 2026](/futuremaker-report) a university career fair, [Spring Bootcamp 2026](/springbootcamp-report) a hunt played in teams, and [ETHDenver 2026](/ethdenver-report) a four-day conference in Denver.

## Limits worth knowing

The game needs mobile data or Wi-Fi where the tags are. Most recent phones read NFC, and the QR code covers the rest. At family events children often share a parent's phone, so the player count there is really a count of phones. Most people also play on a single day. At a multi-day event, expect each day's players to be mostly new rather than returning.

## Packages and timing

There is no price list. Each event is quoted on its own, in one of three packages. Starter, for up to 100 attendees, uses QR codes and Treasure Hunt branding. Pro, for 100 to 1,000, adds your branding, NFC tags, sponsor placement and our staff on site. Enterprise, for 1,000 and more, adds features built for your event and the post-event report. Setup can be ready in 48 hours once you have decided where the tags go and what the prizes are.

If you are comparing tools, there are side-by-side pages for [Goosechase](/goosechase-alternative), [Scavify](/scavify-alternative), [Actionbound](/actionbound-alternative) and [Loquiz](/loquiz-alternative). The two checkpoint types are covered in more detail in [NFC treasure hunt for events](/nfc-treasure-hunt) and [QR scavenger hunt for events](/qr-scavenger-hunt-events).`,
  },
  {
    slug: 'trade-show-booth-traffic-pscs-2026',
    title: 'Trade Show Booth Traffic: Data from 103 Checkpoints',
    description:
      'Case study: 351 players and 8,123 checkpoint scans over three days at the Portugal Smart Cities Summit 2026. What the data shows about trade fair foot traffic.',
    date: '2026-07-02',
    updated: '2026-09-08',
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
    title: 'Gamification at a One-Day Conference: A 2026 Case Study',
    description:
      'One day, 25 checkpoints, 58 players, 777 treasures found. What the Data with Purpose Summit 2026 shows about a hunt with no day two.',
    date: '2026-07-02',
    updated: '2026-09-08',
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
    title: 'Campus Team Scavenger Hunt: 7 Teams, 220 Finds',
    description:
      'How a team-based scavenger hunt played out at the NOVA IMS Spring Bootcamp 2026: seven teams, 220 treasures found, and a three-find margin at the top.',
    date: '2026-07-02',
    updated: '2026-09-08',
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
  {
    slug: 'how-many-checkpoints-event-scavenger-hunt',
    title: 'How Many Checkpoints Does an Event Need?',
    description:
      'Six deployments, from 20 players to 351. What the ratio of checkpoints to players did to engagement, and the rule of thumb that came out of it.',
    date: '2026-09-21',
    content: `"How many should we put out?" is the first question every organizer asks, and for a long time our answer was a shrug and a guess based on venue size. We now have six finished deployments with full on-chain records, ranging from an afternoon with 20 players to a three-day fair with 351. Enough to stop guessing.

Here is every event we have run, with the two numbers that matter: how many checkpoints went out, and how hard each one worked.

## The six deployments

- **NOVA IMS Spring Bootcamp**, April 7, one afternoon: 42 checkpoints, 20 players, 220 finds. 5.2 finds per checkpoint.
- **ETHDenver**, February 18 to 21, four days: 59 checkpoints, 207 players, 992 finds. 16.8 finds per checkpoint.
- **Future Maker at NOVA IMS**, March 17 to 19, three days: 115 checkpoints, 265 players, 2,591 finds. 22.5 finds per checkpoint.
- **Data with Purpose Summit**, June 25, one day: 25 checkpoints, 58 players, 777 finds. 31.1 finds per checkpoint.
- **Festival do Cadaval**, May 22 to 23, two evenings: 57 checkpoints, 126 players, 2,182 finds. 38.3 finds per checkpoint.
- **Portugal Smart Cities Summit**, May 12 to 14, three days: 103 checkpoints, 351 players, 8,123 finds. 78.9 finds per checkpoint.

## The ratio, not the count

Sort those by checkpoints per player and something falls out. Five of the six land between 0.29 and 0.45 checkpoints per player. ETHDenver and Smart Cities both sit at 0.29, Data Summit and Future Maker at 0.43, Cadaval at 0.45. Different venues, different audiences, different event lengths, same band.

The sixth is Spring Bootcamp at 2.1 checkpoints per player, and it is also the event where each checkpoint worked least: 5.2 finds. 42 tags for 20 people meant most tags were found by a handful of players, and 620 of the 840 possible finds never happened. The tags were not wrong. There were just too many of them for the crowd.

So the useful planning number is not a checkpoint count. It is roughly **one checkpoint for every two to three people you expect to play**, and then a sanity check on whether the venue can physically hold them that far apart.

## Two things that move the number

**Venue density.** ETHDenver had 59 checkpoints and got 4.8 finds per player across four days. Smart Cities had 103 and got 23.1 per player across three. The difference is not the game, it is the walk. ETHDenver sprawled across a large campus with attendees who had panels to get to. Smart Cities was one exhibition hall where every checkpoint was within a few minutes of the last one. A dense floor lets people collect; a spread-out one turns each find into a trip.

**How long people stay.** At Smart Cities, 278 of the 351 players came for one day only, 35 came for two, and 7 for all three. If most of your audience is there for one day, the hunt has to be completable in one day, which caps how many checkpoints are worth deploying no matter how big the venue is.

## What to do with a small crowd

Spring Bootcamp is the case worth learning from, because small events are the ones most likely to over-provision. With 20 players, fewer checkpoints placed closer together would have produced more finds, more collisions between players, and a tighter race. The final margin was three finds, which was good; but it happened despite the layout, not because of it.

If you are running something under 50 people, start nearer 15 to 20 checkpoints and make them dense. You can always hide more mid-event. Recovering from a floor that feels empty is much harder.

## The one number we would check first

If you want a single diagnostic after an event, use finds per checkpoint. Under about 10 and you over-provisioned. Between 20 and 40 is a healthy floor. Above 70, as at Smart Cities, and you probably had room for more checkpoints than you used.

Every figure above comes from published reports: [ETHDenver](/ethdenver-report), [Future Maker](/futuremaker-report), [Portugal Smart Cities Summit](/smartcities-report), [Festival do Cadaval](/cadaval-report), [Data with Purpose Summit](/datasummit-report) and [Spring Bootcamp](/springbootcamp-report). For how a deployment is planned from the organizer side, see [event gamification](/event-gamification).`,
  },
  {
    slug: 'festival-gamification-cadaval-2026',
    title: 'Gamifying a Town Festival: 2,182 Finds Over Two Nights',
    description:
      'Festival do Cadaval 2026: 126 players, 57 checkpoints, 2,182 finds, and an activity curve that peaks at 9 PM. What a public festival changes.',
    date: '2026-09-21',
    content: `Everything else we had published came from conferences, trade fairs and campuses. Those share a shape: a registered audience, a defined venue, daytime hours, and a reason to be there that has nothing to do with the game.

A town festival is none of that. People arrive when they feel like it, wander with family, and the good part of the night starts after dinner. We ran Treasure Hunt at Festival do Cadaval on 22 and 23 May 2026 to find out what that changes.

## The numbers

- **126 players** across two evenings
- **2,182 treasures found** from 57 checkpoints, 38.3 per checkpoint
- **98.4% of players** claimed a reward, our highest rate to date
- **421 merch purchases** from an 18-item store
- **76,775 FCT tokens** distributed on-chain
- **2,618 transactions**, every fee sponsored, so playing cost nothing
- **20 of 126 players** came back on the second night

## The festival runs at night

The hour-by-hour data is the clearest difference. The first scan of the first night landed at 5 PM and then almost nothing moved for three hours. At 8 PM the hour recorded 120 scans, at 9 PM it hit 227, and the game kept running past 11. The second day started slowly in the early afternoon, built through the evening, and peaked at 7 PM with 336 scans, the busiest hour of the whole festival.

Compare that with the Data with Purpose Summit, where the peak was 10 AM and the game was effectively over by 5 PM. Same product, opposite curve. A festival hunt that launches at noon is launching into an empty field.

The practical consequence: staff the game for the evening, put the leaderboard somewhere visible after dark, and do not judge the deployment by what the dashboard looks like at 4 PM.

## Engagement went deeper than at conferences

Players averaged 17.3 finds each, against 4.8 at ETHDenver and 9.8 at Future Maker. The distribution was unusually healthy too: 25 players landed in the 20 to 40 finds band, 22 in the 40 to 70 band, and only 5 players finished under 10 finds.

The reason is probably time rather than motivation. A conference attendee plays between sessions. A festival visitor is there for the evening with nothing scheduled, and the hunt becomes the thing they are doing rather than the thing they are doing between other things.

The reward claim rate says the same. 98.4% of players claimed at least one reward, the highest we have recorded. Eight of the 18 items in the store sold out, including all 57 festival badges and all 46 festival wristbands.

## Players hid their own treasures

Cadaval is the event where the player-hiding mechanic actually took off. Players hid checkpoints of their own for other people to find. The single most-found player-hidden tag was found 56 times, more than half the player base, and the top three player hiders accounted for 143 finds between them.

The hider leaderboard runs to 18 names. This does not happen at a conference. It needs an audience that is relaxed, in a place they know, with people they came with. Where it does happen it solves a real problem for free: the organizer stops being the only source of new content on night two.

## Sponsors and the municipality

Sponsored items were among the best sellers. The Crédito Agrícola cup moved 60 units and the branded lanyard 53, and municipal pens and pencils moved 72 between them. For a sponsor, this is a cheaper way to place branded objects in people's hands than a giveaway table, because the visitor has to earn the item and therefore wants it.

## What we would tell a festival organizer

Weight the checkpoints toward the food stalls, the stages and the routes between them, because that is where the crowd already is. Start the game in the late afternoon and expect the real numbers after 7 PM. Let visitors hide their own treasures from the first night. Keep the reward store stocked with things people would actually carry home, and accept that the good items will sell out on night two.

The full report, with the per-tag table, the hourly grid and the merch sell-through curves, is public: see the [Festival do Cadaval 2026 report](/cadaval-report). For the general format, see [NFC treasure hunts](/nfc-treasure-hunt), and the Portuguese-language page on [caça ao tesouro digital](/pt/caca-ao-tesouro-digital-empresas).`,
  },
  {
    slug: 'university-career-fair-gamification-future-maker-2026',
    title: 'A Career Fair Where Students Had to Visit Every Stand',
    description:
      'Future Maker 2026 at NOVA IMS: 115 checkpoints, 265 students, 2,591 finds. How employer stands turned into checkpoints and what the traffic looked like.',
    date: '2026-09-21',
    content: `The complaint employers make about university career fairs is always the same. They pay for a stand, they send two people for three days, and they talk to the same self-selecting students who would have found them anyway. The rest of the room walks past.

Future Maker 2026 at NOVA IMS ran from 17 to 19 March with employer stands, talks and workshops across the campus. We turned 115 locations into checkpoints, including the employer stands, and let students collect them.

## The numbers

- **265 unique players** across three days
- **2,591 treasures found** from 115 checkpoints
- **1,024,700 FM tokens** minted, 3,867 per student on average
- **424 merch purchases**, burning 813,300 FM back out of circulation
- **7,495 on-chain transactions** in total
- **Peak hour 1 PM**, with 1,619 transactions

## Employer stands got measured traffic

The interesting part of the checkpoint table is the employer section. Philip Morris recorded 40 finds, Accenture 37, DareData 36, CTT 35, and JTA 33. Those are not impressions or estimates. Each one is a student who physically walked to that stand and tapped their phone on it.

For a recruiting team, that number answers the question the fair never usually answers. You stop arguing about whether the stand was in a good position and start looking at a count, next to the counts everyone else got.

The spread between the top employer stand and the fifth is narrow, 40 down to 33. Whatever the usual advantage of a stand near the door is worth, it did not show up as a gap here.

## Day two is the real day

Activity ran 1,936 transactions on day one, 3,736 on day two, and 1,823 on day three. Day two nearly doubled day one.

That pattern has shown up in every multi-day deployment we have run, and it comes from word of mouth. Students who played on day one bring the people they had lunch with on day two. It also means the day one numbers are not the deployment's numbers, which is worth saying out loud to any employer who checks the dashboard on the first afternoon and worries.

The daily peak sat at 1 PM, around the lunch break, when the hall fills with students who have nowhere particular to be.

## Most of the checkpoints were not ours

This is the number that surprised us. Of the 116 tags on the final checkpoint table, 70 were hidden by players rather than placed by us, by 68 different people. Those player-hidden tags accounted for 1,116 finds, about 43% of the total.

They were also competitive with the official ones. "Banana" pulled 31 finds, "Hidden_Behind" 30 and "Secret Point" 28, which puts all three ahead of most employer stands.

A player-hidden tag is content the organizer did not have to produce, placed where students actually go, and named in a way that makes other students want to find it. By day two it was doing a meaningful share of the work of keeping the game alive.

## The reward store did the recruiting the flyers do not

424 items were claimed from a 21-item store. The plain notebook was the runaway winner at 84 units, ahead of mousepads at 50 and the laptop case at 40. The expensive sweatshirts barely moved, in single digits each.

The lesson for anyone stocking one of these: cheap, useful and carryable beats impressive. Students earned their tokens by walking the fair, and they spent them on things they would use the following week.

## Why this works better on a campus than it looks

115 checkpoints is a lot, and it worked because a campus has the density for it. Buildings are close, students already move between them between sessions, and the ratio of 0.43 checkpoints per player landed in the same band as every other event we have measured.

The full report, with the per-checkpoint table, the leaderboard and the hourly curve, is public: see the [Future Maker 2026 report](/futuremaker-report). For the format applied to campuses generally, see [scavenger hunts for universities](/scavenger-hunt-universities), and for the employer side, [trade show booth traffic](/trade-show-booth-traffic).`,
  },
]
