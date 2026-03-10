/**
 * BASSC speed skating club - data structures
 * In production, all data comes from the backend API; these are English defaults.
 */

// 主页轮播图数据结构 homePagePic
export const homePagePic = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    title: 'Train for world‑class speed',
    description:
      'Feel the rush of speed skating on professional ice, where focus, power, and precision come together.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1920&q=80',
    title: 'Coaching that cares',
    description:
      'Experienced coaches guide skaters from first steps on the ice to advanced racing technique.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1920&q=80',
    title: 'Built for the next generation',
    description:
      'Focused on developing the next generation of speed skating athletes in Silicon Valley.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1920&q=80',
    title: 'Skate with purpose and joy',
    description:
      'Our athletes train with purpose, discipline, and passion—developing skills, resilience, and a lifelong love for the sport.',
  },
];

// Boards: four key highlights on the homepage
export const boards = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    title: 'Programs',
    description: 'Level‑based programs from first‑time skaters to competitive athletes.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400&q=80',
    title: 'Facilities',
    description: 'Indoor rinks and training environments suited for year‑round development.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400&q=80',
    title: 'Coaching',
    description: 'Coaches with elite racing and teaching experience, focused on each athlete.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&q=80',
    title: 'Competition',
    description: 'Race opportunities and performance pathways for motivated skaters.',
  },
];

// 介绍文章走马灯数据结构 introduction
export const introductions = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    title: 'About Bay Area Speed Skating EVD Club',
    text:
      'Bay Area Speed Skating EVD Club was founded to give young skaters in Silicon Valley a home to grow. Focused on developing the next generation of speed skating athletes, we combine structured training, clear goals, and a supportive team culture. Our athletes train with purpose, discipline, and passion—developing not only world‑class skating skills, but also strength, resilience, and a lifelong love for the sport.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80',
    title: 'How we train',
    text:
      'Training blends on‑ice technique, starts and corners, race strategy, and off‑ice strength and mobility. Groups are organized by age and skill so every skater is challenged but never lost. We believe confident, safe skaters are built through repetition, feedback, and a positive environment.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&q=80',
    title: 'Why families choose us',
    text:
      'Families join us for serious speed skating in a friendly club setting: dedicated coaches, clear progression paths, race support, and a community that celebrates effort as much as medals. Whether your goal is stronger fundamentals or international‑level racing, we help skaters take the next step.',
  },
];

// 新闻列表数据结构 news
export const newsList = [
  {
    id: 1,
    primPic: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200&q=80',
      'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1200&q=80',
    ],
    title: 'Spring time trial highlights',
    intro:
      'Our skaters opened the season with a full‑club time trial, testing starts, corners, and race focus after the winter training block.',
    content:
      'Our spring time trial brought together youth skaters from across the club for a full weekend of racing. Athletes skated multiple distances, worked on pacing and passing, and learned how to manage nerves on the start line. Coaches used the results to fine‑tune training plans leading into summer competitions, with an emphasis on strong technique and confidence in race situations.',
  },
  {
    id: 2,
    primPic: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200&q=80',
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&q=80',
    ],
    title: 'Summer speed skating camp',
    intro:
      'Registration is open for our summer speed skating camp for youth skaters in the Bay Area.',
    content:
      'The summer camp is designed for skaters who want a focused block of training while school is out. Groups are organized by age and level, from new skaters learning efficient pushes and basic cornering to experienced racers working on race tactics and dryland strength. Each week blends off‑ice training, on‑ice drills, and games so athletes stay engaged and keep building their love for the sport.',
  },
  {
    id: 3,
    primPic: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    ],
    title: 'Athletes selected for next‑level training',
    intro:
      'Several club skaters have been invited to train with higher‑level programs after strong results in regional races.',
    content:
      'After multiple seasons of consistent work, several Bay Area EVD athletes were invited to join advanced training groups and development teams. Their progress shows what is possible when athletes commit to regular practice and thoughtful coaching. We are proud of their achievements and excited to support the next steps in their speed skating journey.',
  },
  {
    id: 4,
    primPic: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&q=80',
    ],
    title: 'Weekend intro sessions for new skaters',
    intro:
      'Curious about speed skating? Our weekend intro sessions let kids try the sport in a safe, welcoming environment.',
    content:
      'Intro sessions are designed for brand‑new skaters. Coaches cover helmet and gear checks, safe falling, basic balance, and first glides on the ice. All equipment can be provided, and families get a chance to ask questions about next steps in our programs. Spots are limited so each skater gets attention from coaches.',
  },
];

// Nav (placeholder links; labels in English)
export const navItems = [
  { id: 'class', label: 'Courses', path: '/class' },
  { id: 'class_schedule', label: 'Class Schedule', path: '/class-schedule' },
  { id: 'event', label: 'Events', path: '/event' },
  { id: 'athlete', label: 'Athletes', path: '/athlete' },
  { id: 'coach', label: 'Coach', path: '/coach' },
  { id: 'award', label: 'Awards', path: '/award' },
  { id: 'news', label: 'News', path: '/news' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];

/** 默认主页数据：当 API 某分类为空或请求失败时使用，并提示 using default homepage */
export const defaultHomepage = {
  homePagePic,
  boards,
  introductions,
  pathway: null,
  classes: [],
  newsList,
  navItems,
};
