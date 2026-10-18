const image = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

export const COUPLE = {
  him: "张迪钊",
  her: "薛婉莹",
  himTag: "体育场上的少年",
  herTag: "美丽动人的姑娘",
  school: "上海市莘松中学",
  schoolEn: "SHANGHAI XINSONG MIDDLE SCHOOL",
  // 婚礼：2026.06.02 09:09 —— 取「长长久久」之意
  weddingISO: "2026-06-02T09:09:00+08:00",
  weddingText: "二〇二六年六月二日",
};

export interface TimelineItem {
  index: string;
  dateLabel: string;
  title: string;
  text: string;
  accent?: boolean;
  image?: string;
}

export const TIMELINE: TimelineItem[] = [
  {
    index: "壹",
    dateLabel: "初二 · 那年初见",
    title: "一见钟情",
    text: "莘松中学的教学楼里，走廊尽头的光落在她身上。他只是多看了一眼，往后的故事便再也收不住。所谓一眼万年，大抵如此。",
  },
  {
    index: "贰",
    dateLabel: "操场 · 体育课的下课铃",
    title: "少年与他望着的方向",
    text: "他是跑起来带风的体育生，冲过终点线时，目光却总比秒表先一步，落向看台边那个身影。",
  },
  {
    index: "叁",
    dateLabel: "课间 · 教学楼的窗",
    title: "美丽动人的她",
    text: "她抱着作业本从办公室出来，笑声比风铃轻。同学们都说，薛婉莹走过的地方，连夕阳都会多停留一会儿。",
  },
  {
    index: "肆",
    dateLabel: "放学 · 被镜头记住的楼道",
    title: "两人的路",
    text: "同学随手一按，拍下了晚霞染粉的楼道里相行的两个人。照片有些糊，却成了两个人最舍不得删的那一张。",
    image: image("corridor.jpg"),
  },
  {
    index: "伍",
    dateLabel: "2026.06.02 · 上午九点零九分",
    title: "我们结婚了",
    text: "从初二教室里的惊鸿一瞥，到红本本上手写体的两个名字。长长久久的时刻，写着「我愿意」。",
    accent: true,
  },
];

export const LETTERS = {
  toHer: {
    title: "致婉莹",
    sign: "—— 迪钊",
    lines: [
      "初二的那个下午，",
      "你从我眼前走过，",
      "我就提前交卷了——",
      "把余生，",
      "都写上了你的名字。",
    ],
  },
  toHim: {
    title: "致迪钊",
    sign: "—— 婉莹",
    lines: [
      "你在田径场上奔跑，",
      "跑过春夏秋冬，",
      "最后一场比赛的终点，",
      "原来是我的身边。",
      "往后余生，请多指教。",
    ],
  },
};

export const PHOTOS = [
  {
    src: image("corridor.jpg"),
    label: "No.01 · 放学后的楼道",
    caption: "莘松中学的走廊 · 那次回头，成了珍藏", 
    note: "照片有点糊，心动很清晰。",
  },
  {
    src: image("corridor-art.jpg"),
    label: "No.02 · 画里画外",
    caption: "把我们走成了画里的样子",
    note: "光是来晚的，我们没有。",
  },
];
