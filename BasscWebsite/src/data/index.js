/**
 * BASSC 速滑俱乐部 - 数据结构定义
 * 所有数据将由后端 API 提供，此处为前端 mock 数据
 */

// 主页轮播图数据结构 homePagePic
export const homePagePic = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    title: '追逐冰上的极限速度',
    description: '在专业冰道上体验速度滑冰的激情与魅力，感受风在耳边呼啸的快感',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1920&q=80',
    title: '专业教练 悉心指导',
    description: '国家级教练团队，从零基础到竞技水平，因材施教科学训练',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1920&q=80',
    title: '冠军摇篮 梦想启航',
    description: '培养多名省市级冠军选手，这里是速度与梦想交织的舞台',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1920&q=80',
    title: '冰上绽放 青春飞扬',
    description: '加入我们，在冰面上书写属于你的速度传奇',
  },
];

// 主要介绍板块数据结构 Board（横向4个）
export const boards = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    title: '专业课程',
    description: '分年龄段、分水平开设系统化课程，从启蒙到竞技全覆盖',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400&q=80',
    title: '场地设施',
    description: '国际标准室内冰场，全年恒温，配备专业训练设备',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400&q=80',
    title: '教练团队',
    description: '国家级、省级专业教练，具备丰富执教与竞技经验',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&q=80',
    title: '赛事成绩',
    description: '多次在省市及全国赛事中摘金夺银，成绩斐然',
  },
];

// 介绍文章走马灯数据结构 introduction
export const introductions = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    title: '关于 BASSC 速滑俱乐部',
    text: 'BASSC 速滑俱乐部成立于2015年，是本市首家专注于速度滑冰培训与推广的专业俱乐部。我们拥有国际标准室内冰场，配备完善的安全保障与训练设施。俱乐部致力于普及速滑运动、培养后备人才，已向省队、国家队输送多名优秀运动员。无论您是零基础爱好者还是 aspiring 竞技选手，这里都是您实现冰上梦想的起点。',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80',
    title: '我们的训练理念',
    text: '我们坚持以「科学训练、快乐成长」为核心，将国际先进训练方法与本土实际相结合。课程体系涵盖基础滑行、技术进阶、体能强化、战术运用等模块，循序渐进。教练团队定期参加国内外交流学习，确保教学理念与水平与时俱进。我们相信，每一个孩子都能在冰面上找到自信与快乐。',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&q=80',
    title: '加入我们的理由',
    text: '专业的教练团队、一流的场地设施、系统的课程体系、丰富的赛事机会——这些都是 BASSC 速滑俱乐部的独特优势。我们每年举办多场内部选拔赛和对外交流赛，让学员在实践中检验水平、积累经验。俱乐部还设有奖学金制度，对表现优异的学员给予支持。期待您的加入，与我们一同在冰上驰骋！',
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
    title: '2025年春季速滑等级赛圆满落幕',
    intro: '4月15日至16日，本市春季速度滑冰等级赛在我俱乐部冰场举行，来自全市12支队伍的180余名选手参赛。',
    content: '4月15日至16日，本市春季速度滑冰等级赛在我俱乐部冰场举行，来自全市12支队伍的180余名选手参赛。经过两天的激烈角逐，我俱乐部学员在多个组别中取得优异成绩，其中少儿组共获得3金5银4铜，青少年组获得2金3银2铜。本次比赛不仅检验了学员们的训练成果，也为即将到来的省级选拔赛积累了宝贵经验。俱乐部总教练张指导表示，将针对比赛中暴露的问题进行针对性强化训练，力争在省赛中再创佳绩。',
  },
  {
    id: 2,
    primPic: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200&q=80',
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&q=80',
    ],
    title: '暑期集训营开始报名啦！',
    intro: 'BASSC 速滑俱乐部2025年暑期集训营将于7月1日正式开营，为期四周，现开放报名。',
    content: 'BASSC 速滑俱乐部2025年暑期集训营将于7月1日正式开营，为期四周，现开放报名。本次集训营面向6-16岁学员，分为启蒙班、进阶班和竞技班三个层次，由俱乐部金牌教练团队全程执教。集训内容包括陆地体能、冰上技术、战术演练及模拟比赛等模块，旨在利用暑期集中提升学员的综合水平。名额有限，报满即止。详情请致电俱乐部或关注微信公众号。',
  },
  {
    id: 3,
    primPic: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    ],
    title: '俱乐部学员入选省青年队',
    intro: '热烈祝贺我俱乐部学员李明、王芳成功入选省速度滑冰青年队，将于下月赴省队报到。',
    content: '热烈祝贺我俱乐部学员李明、王芳成功入选省速度滑冰青年队，将于下月赴省队报到。两名学员自2019年加入俱乐部以来，在教练的悉心指导下刻苦训练，在近年省市级赛事中表现突出。李明曾获2024年省青少年速滑锦标赛男子500米冠军，王芳则在女子1000米项目中多次站上领奖台。俱乐部全体同仁为他们感到骄傲，祝愿他们在更高的舞台上续写辉煌！',
  },
  {
    id: 4,
    primPic: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&q=80',
    ],
    title: '新一期周末体验课开放预约',
    intro: '零基础也能体验速滑乐趣！本周末体验课现接受预约，专业教练一对一指导，装备全包。',
    content: '零基础也能体验速滑乐趣！本周末体验课现接受预约，专业教练一对一指导，装备全包。体验课时长90分钟，包含安全讲解、基础站立、简单滑行等内容，适合5岁以上儿童及成人。名额每场限15人，先到先得。预约热线：400-XXX-XXXX，或扫描下方二维码在线预约。期待在冰场见到您！',
  },
];

// Nav (placeholder links; labels in English)
export const navItems = [
  { id: 'class', label: 'Courses', path: '/class' },
  { id: 'event', label: 'Events', path: '/event' },
  { id: 'athlete', label: 'Athletes', path: '/athlete' },
  { id: 'coach', label: 'Coach', path: '/coach' },
  { id: 'award', label: 'Awards', path: '/award' },
  { id: 'news', label: 'News', path: '/news' },
  { id: 'micro', label: 'Micro Class', path: '/micro' },
  { id: 'peripheral', label: 'Merchandise', path: '/peripheral' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];

/** 默认主页数据：当 API 某分类为空或请求失败时使用，并提示 using default homepage */
export const defaultHomepage = {
  homePagePic,
  boards,
  introductions,
  newsList,
  navItems,
};
