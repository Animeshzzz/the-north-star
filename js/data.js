/* =====================================================
   THE NORTH STAR — CONTENT
   Edit freely. Nothing here touches engine.js logic.
   ===================================================== */

const KINGDOMS = [
  {
    id: "night",
    name: "Kingdom of Endless Night",
    inspiredBy: "Norway",
    accent: "#6FA8A0",
    hotspot: { x: 210, y: 120 },
    image: "assets/kingdom-night.jpg",
    story: "The explorer had first wanted to come here for the extremes — six months of day, six months of night, a place where time itself seemed to forget its manners. But somewhere along the way, the real reason changed. It wasn't the darkness or the light anymore. It was the aurora — the sky deciding to perform for no one in particular, and the Princess deciding she needed to see it in person, whatever the reason had originally been.",
    marginNote: "she'd complain about the cold for a week straight and go anyway.",
    eggs: ["she once convinced me never to eat pineapple or butterscotch again — simply because she didn't like them", "she has a genuinely terrible memory. it has, on occasion, worked in my favor."]
  },
  {
    id: "stories",
    name: "Hall of Stories",
    inspiredBy: "Paris",
    accent: "#C98A93",
    hotspot: { x: 340, y: 90 },
    image: "assets/kingdom-stories.jpg",
    story: "The Louvre was the whole reason for coming. Halls of paintings that took centuries to finish, kept behind glass like the world had agreed they were worth protecting. The explorer noted something odd: the Princess used to have no patience for books at all. And then, without any clear turning point, she simply became someone who read. Nobody remembers the exact day it happened. It just did.",
    marginNote: "she still recommends shows and books like she's certain you'll like them. she usually is.",
    eggs: ["chai over most things, always", "her gossip sessions were, against all logic, some of the most entertaining conversations I've had"]
  },
  {
    id: "tomorrow",
    name: "City Beyond Tomorrow",
    inspiredBy: "Dubai",
    accent: "#D6B370",
    hotspot: { x: 470, y: 140 },
    image: "assets/kingdom-tomorrow.jpg",
    story: "The Future Museum stood where the explorer expected sand and found architecture instead — a city that built the future rather than waiting politely for it to arrive. The Princess never once asked whether something was possible before deciding to do it. She simply told the future what was going to happen, the same way she tells everyone else.",
    marginNote: "she doesn't ask you to do things. she tells you. and somehow it still works.",
    eggs: ["she is, unapologetically, going to run something someday — management was never a question, only a matter of when", "she has never once compromised what she believes because it happened to be unpopular"]
  },
  {
    id: "rain",
    name: "Garden of Rain",
    inspiredBy: "Singapore",
    accent: "#7FA06E",
    hotspot: { x: 300, y: 240 },
    image: "assets/kingdom-rain.jpg",
    story: "There was no real reason to come here. That was, in a way, the entire reason. The Princess wanted to see it — not because of a museum or a myth or a view, just because it existed and she was curious. The explorer decided that was reason enough, and wrote nothing further about it, because some wants don't need justifying.",
    marginNote: "she'd insist she's not chaotic. she is, completely. it's part of the charm.",
    eggs: ["cats, without exception", "she was, at one point, deeply invested in K-dramas — and in telling you exactly which ones to watch"]
  },
  {
    id: "lake",
    name: "Lake Above the Clouds",
    inspiredBy: "Chandrataal",
    accent: "#9EC6D9",
    hotspot: { x: 400, y: 280 },
    image: "assets/kingdom-lake.jpg",
    story: "The most recent place she ever mentioned wanting to see. A lake high enough that the sky bends down to meet it, still enough to hold the mountains twice over. The explorer didn't write much here either — only that some places are meant to be witnessed, not narrated, and that she'd probably threaten to end someone over the altitude and go anyway.",
    marginNote: "\"bhut marungi\" — said with real affection, somehow.",
    eggs: ["red wine, and soju — she never got the chance to try either, yet", "she'd scold me the moment she found out about a single drink. so, obviously, she'll never find out."]
  }
];

const STARS = [
  "You were always there whenever I actually needed someone.",
  "You never realize how much you talk — and somehow it's always worth hearing.",
  "Your confidence.",
  "Your ambition.",
  "You went from hating books entirely to becoming someone who reads.",
  "You always recommended the right shows and movies, without fail.",
  "Your terrible memory has, more than once, worked out entirely in my favor.",
  "You remember the most oddly specific, random details.",
  "You always changed the subject the moment you sensed I was overthinking.",
  "You always found something to talk about, even when there was nothing to say.",
  "You ask exactly enough questions to actually understand someone.",
  "You never ask me to do something. You simply tell me — and I do it anyway.",
  "You're a genuinely good person, underneath everything else.",
  "You're empathetic, even when you'd deny it outright.",
  "I admire how simple you are, despite being this ambitious.",
  "I love how fast you reject an idea you don't like — no hesitation, ever.",
  "Your gossip sessions were, against all odds, some of the best conversations I've had.",
  "Your curiosity.",
  "You were always a well-wisher, whether or not you said so out loud.",
  "You never once compromised your values for the sake of popularity."
];

const FINAL_LETTER = `Dear Aditi,

I don't know exactly when I started noticing these things about you. It wasn't one moment — it was hundreds of small ones, stacked up over enough years that I stopped being able to pretend I hadn't been paying attention.

I still think about the fact that I failed the NDA, and you were the one who talked me off that ledge and pointed me toward IPMAT instead. I applied because you insisted. You didn't get in. I did. Whatever this has become since — the degree, the college, all of it — exists because you cared enough to argue me into applying anyway.

I think about the six months we didn't talk, and how one text turned into a call, and how you happened to be a few hundred metres away when I called back. I think about Nirala Park, and Delhi, and how easily we've gone quiet and come back to each other more than once now.

This letter isn't asking for anything, and it isn't trying to fix the silences that come and go. I just wanted you to have a record — a real one — of what someone actually noticed about you, on the years you didn't know you were being watched this closely.

Happy twentieth, Princess. I hope this year takes you to at least one of the places you've been talking about for years.`;

const QUOTE_TEXT = "For the Princess who always looked beyond the horizon.";
