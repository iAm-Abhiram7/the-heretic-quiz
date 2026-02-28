export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export const questionsVersion = "2026-02-28";

export const questions: Question[] = [
  {
    id: 1,
    question: "What specific reason do the sisters give for initially refusing to enter Mr. Reed's house?",
    options: [
      "They are not allowed to enter a home unless a woman is present",
      "They are forbidden from entering the homes of unmarried men",
      "They must have their bikes visible from the window at all times",
      "Their mission president must approve every house visit"
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 2,
    question: "How does Mr. Reed convince the sisters that his wife is actually in the kitchen?",
    options: [
      "He plays a recording of a woman's voice",
      "He lights a blueberry pie scented candle",
      "He shows them a freshly set table for three",
      "He points to a pair of women's shoes by the door"
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 3,
    question: "What does Sister Paxton reveal she wants to be reincarnated as?",
    options: ["A bird", "A butterfly", "A cat", "A tree"],
    correctAnswerIndex: 1,
  },
  {
    id: 4,
    question: "Which board game does Mr. Reed compare to Christianity in his 'iteration' analogy?",
    options: ["The Landlord's Game", "Monopoly", "The Game of Life", "Clue"],
    correctAnswerIndex: 1,
  },
  {
    id: 5,
    question: "What discovery leads Sister Barnes to realize the 'wife' is a deception?",
    options: [
      "She finds a blueberry-scented candle",
      "She sees an ID in a trash can",
      "She notices the kitchen door is a painted wall",
      "She hears a timer go off without a response"
    ],
    correctAnswerIndex: 0,
  },
 {
    id: 6,
    question: "When the sisters find the front door locked, what does Mr. Reed claim is the reason they cannot leave?",
    options: [
      "The door is on a time lock that won't open until morning",
      "The door can only be opened from the outside",
      "A massive snowdrift has blocked the exit",
      "He has hidden the only physical key in the basement"
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 7,
    question: "What are the labels on the two doors Reed forces the sisters to choose between?",
    options: ["Heaven and Hell", "Belief and Disbelief", "Truth and Lies", "Life and Death"],
    correctAnswerIndex: 1,
  },
  {
    id: 8,
    question: "What is the truth behind the choice between the two doors?",
    options: [
      "They both lead to the same basement",
      "One leads to the kitchen, one to the cellar",
      "The 'Belief' door is the only one that opens",
      "The 'Disbelief' door leads directly outside"
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 9,
    question: "What 'miracle' does the elderly woman in the basement perform?",
    options: [
      "She walks through a solid wall",
      "She seemingly returns to life after eating poisoned pie",
      "She recites a prayer in an unknown language",
      "She heals a physical wound"
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 10,
    question: "How does Sister Paxton prove the 'resurrection' was a staged trick?",
    options: [
      "She finds a hidden twin sister",
      "She discovers a trapdoor used for a body-swap",
      "She notices the woman has a different eye color",
      "The body disappears when touched"
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 11,
    question: "What does Reed claim to find in Barnes' arm to prove they are in a simulation?",
    options: ["A tracking device", "A microchip", "Holy shrapnel", "A hidden camera"],
    correctAnswerIndex: 1,
  },
  {
    id: 12,
    question: "What is the object in Sister Barnes' arm actually revealed to be?",
    options: ["A piece of lead", "A contraceptive implant", "A surgical pin", "A shard of glass"],
    correctAnswerIndex: 1,
  },
  {
    id: 13,
    question: "What does Mr. Reed conclude is the 'One True Religion'?",
    options: ["Chaos", "Control", "Fear", "Iteration"],
    correctAnswerIndex: 1,
  },
  {
    id: 14,
    question: "What happens when Sister Paxton checks her phone signal outside at the end?",
    options: [
      "It has no signal, despite being outside",
      "She immediately reaches emergency services",
      "The battery dies instantly",
      "The screen is cracked and unreadable"
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 15,
    question: "How does Sister Barnes ultimately stop Mr. Reed?",
    options: [
      "She pushes him down a laundry chute",
      "She hits him with a board full of protruding nails",
      "She locks him in a cage",
      "She uses a silver letter opener"
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 16,
    question: "What did the 'prophet' whisper that disrupted Reed's script?",
    options: ["'I'm still hungry'", "'It is not real'", "'Save me'", "'He is lying'"],
    correctAnswerIndex: 1,
  },
  {
    id: 17,
    question: "What object is used as a stabbing weapon by Sister Paxton?",
    options: ["A kitchen knife", "A silver letter opener", "A crucifix", "A metal pen"],
    correctAnswerIndex: 1,
  },
  {
    id: 18,
    question: "Which Daoist thought experiment does Reed use to argue about reality?",
    options: ["The Cave Allegory", "The Butterfly Dream", "The Cat in the Box", "The Lotus Eater"],
    correctAnswerIndex: 1,
  },
  {
    id: 19,
    question: "What act of kindness does Paxton perform for the caged women?",
    options: [
      "She gives one of them her coat",
      "She shares her water bottle",
      "She promises to send the police",
      "She tells them a prayer"
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 20,
    question: "What is the very last visual symbol shown before the cut to black?",
    options: [
      "Sister Paxton's face in the snow",
      "A butterfly landing on a finger and vanishing",
      "Police sirens in the distance",
      "The front door of the house"
    ],
    correctAnswerIndex: 1,
  },
];