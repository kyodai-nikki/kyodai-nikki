// =========================================================
// Episodes ページのデータ
// ---------------------------------------------------------
// URL 規則：/episodes/season{N}/{slug}/
//   - N は 1〜4（シーズン番号）
//   - slug は通常 "00", "01" のような2桁数字（＝シーズン内エピソード番号）
//   - 別史エピソードは通算番号を持たないので、任意の半角英数スラッグを付ける
//     （例： "negai"、"shi-no-teigi"）
//
// 画像ファイル：public/images/episodes/ 以下に配置
//   - summaryImage : 一覧カードの右側に薄く敷く概要画像（透過 PNG or 白背景 JPG）
//   - detailImage  : 右パネルに大きく表示するメイン画像
//
// フラグ：
//   - isAlternate : 「別史」扱い（通算番号を出さず、黒ベースのカード）
//   - smallText   : タイトルが長くて収まらない場合に ON。一覧カードのタイトルが小さくなる
// =========================================================

export interface EpisodeEntry {
  /** シーズンをまたいだ通し番号。タイムライン並び替えに使う */
  overallNumber: number;
  /** シーズン番号 */
  season: 1 | 2 | 3 | 4;
  /** シーズン内エピソード番号。別史エピソードは undefined（カードでは "—" 表記） */
  seasonEpisodeNumber?: number;
  /** URL 用スラッグ（半角英数ハイフンのみ）。通常は seasonEpisodeNumber と同じ文字列 */
  slug: string;
  /** タイトル */
  title: string;
  /** 一覧カード右側の概要画像 */
  summaryImage: string;
  /** 詳細パネルの大きい画像 */
  detailImage: string;
  /** 詳細パネル本文（\n 改行可） */
  description: string;
  /** 右下バッジ（例："R-18"）。空なら非表示 */
  badge?: string;
  /** 「読む」ボタンのリンク先。空 or undefined ならボタン非表示 */
  readHref?: string;
  /** 別史フラグ */
  isAlternate?: boolean;
  /** 文字縮小フラグ（タイトルが長い時 ON） */
  smallText?: boolean;
  /** タイムライン用：作中日付（"2021.10.02" 形式推奨） */
  date?: string;
  /** タイムライン用：登場キャラと年齢などを 1 行で（例 "千秋 (15歳) 千冬 (18歳) (専門学校)"） */
  cast?: string;
}

export interface SeasonInfo {
  number: 1 | 2 | 3 | 4;
  label: string;
  slug: string;
}

export const seasons: readonly SeasonInfo[] = [
  { number: 1, label: "1st season", slug: "season1" },
  { number: 2, label: "2nd season", slug: "season2" },
  { number: 3, label: "3rd season", slug: "season3" },
  { number: 4, label: "4th season", slug: "season4" },
] as const;

// 画像パスを短く書くためのプレフィックス
const IMG = "/images/episodes";

export const episodes: EpisodeEntry[] = [
  // ===================== 1st season =====================
  {
    overallNumber: 0,
    season: 1,
    seasonEpisodeNumber: 0,
    slug: "00",
    title: "「」なんてね",
    summaryImage: `${IMG}/s1-00-summary.jpg`,
    detailImage: `${IMG}/s1-00-detail.jpg`,
    description:
      "母親を交通事故で失ったのは1年前のこと。\n父親は、生まれた頃にはいなかった。\n高校生の染谷千秋は、兄である染谷千冬と支え合って生きている。\n普通の高校生と変わらない日常を過ごす彼には、とある秘密があった。\n──千秋は「血縁者である兄」に「恋情」を抱いている。\n\nある日、千秋は悪夢を見た。\nそれは、大切なものが消えゆくような、そんな夢だった。",
    badge: "R-18",
    date: "2021.10.02",
    cast: "千秋 (15歳・高校生) 千冬 (18歳・専門学校)",
  },
  {
    overallNumber: 1,
    season: 1,
    seasonEpisodeNumber: 1,
    slug: "01",
    title: "傘に臨界",
    summaryImage: `${IMG}/s1-01-summary.jpg`,
    detailImage: `${IMG}/s1-01-detail.jpg`,
    description:
      "りん、と鼓膜を刺し貫く音で目が覚めた。\n開け放たれた向こう側では雨が降っていた。\n自身の意識を掬い上げた風鈴は、すっかり息を潜めてそこに吊られている。切れかけの電気が、まるで影の落ちた世界に抗うように繰り返し瞬いていた。\n「──だから、」\n雨の音がした。雨の音だけが鼓膜を揺らした。\n｢──────俺と地獄に落ちてよ｣",
    date: "2021.08.15",
    cast: "千秋 (15歳・高校生) 千冬 (18歳・専門学校)",
  },
  {
    overallNumber: 2,
    season: 1,
    seasonEpisodeNumber: 2,
    slug: "02",
    title: "対談、鼎談、座談",
    summaryImage: `${IMG}/s1-02-summary.jpg`,
    detailImage: `${IMG}/s1-02-detail.jpg`,
    description:
      "「対談、鼎談、座談」\n向かい合って話し合うこと。\nまた、ある事柄について話し合うこと。対話。\n\n──真っ暗な視界、閉じた瞼の裏側が白む感覚。\n重い瞼を持ち上げ先ず視界に飛び込んだのは、四方を壁に囲まれた真っ白な部屋だった。\n『全ての対談が終わり次第、元の世界に戻る事が出来ます』",
    date: "2021.11.19",
    cast: "千秋 (15歳・高校生) 千冬 (18歳・専門学校)",
  },
  {
    overallNumber: 3,
    season: 1,
    seasonEpisodeNumber: 3,
    slug: "03",
    title: "奇想翻弄",
    summaryImage: `${IMG}/s1-03-summary.jpg`,
    detailImage: `${IMG}/s1-03-detail.jpg`,
    description:
      "今日も仕事を終え、電車に乗って家路に着く貴方。\n運良く空いた席に座り、少しの間目を閉じる。\nそうして、取り留めもなく思索を巡らせ始めて気付くのだ。\n\n……そういえば自分は、どの駅で降りるんだったっけ？\n\n奇想は常に貴方達を翻弄する。\n冬の冷たい呼吸がじくりと喉を焼くように。",
    date: "2022.01.22",
    cast: "千秋 (15歳・高校生) 千冬 (18歳・専門学校)",
  },
  {
    // 別史エピソード：03 と 04 の間に配置
    overallNumber: 3.5,
    season: 1,
    slug: "negai",
    title: "君を願う",
    summaryImage: `${IMG}/s1-negai-summary.jpg`,
    detailImage: `${IMG}/s1-negai-detail.jpg`,
    description:
      "廃人と化した「大切な人」。\n千冬は今日も、精神病棟を訪れる。\n\n「正気と人間性が回復しました」\n「そこでです」\n「貴方には選んでほしいのです」\n\n※本シナリオは、IF世界の出来事である。",
    isAlternate: true,
    date: "2023.03.15",
    cast: "千秋 (高校生) 千冬 (18歳・専門学校)",
  },
  {
    overallNumber: 4,
    season: 1,
    seasonEpisodeNumber: 4,
    slug: "04",
    title: "Multi*Dead*Ending",
    smallText: true,
    summaryImage: `${IMG}/s1-04-summary.jpg`,
    detailImage: `${IMG}/s1-04-detail.jpg`,
    description:
      "「目が覚める。　殺される。」\n道を歩く。　殺される。　目が覚める。\n食事をする。　殺される。　目が覚める。\n殺される。　目が覚める。　殺される。　目が覚めた。\nもう殺されない。\n\n……目が覚める。",
    date: "2022.02.20",
    cast: "千秋 (16歳・高校生) 千冬 (18歳・専門学校)",
  },
  {
    overallNumber: 5,
    season: 1,
    seasonEpisodeNumber: 5,
    slug: "05",
    title: "探索者に猫耳生えるだけ",
    smallText: true,
    summaryImage: `${IMG}/s1-05-summary.jpg`,
    detailImage: `${IMG}/s1-05-detail.jpg`,
    description:
      "ある日の朝、いつも通り目を覚ます千冬。\n頭に違和感を覚えた千冬がふわふわとしたそれに触れると、耳を撫でた時のような感覚があった。\n洗面台の鏡に映る猫耳としっぽ。\n混乱した千冬が千秋の部屋に向かうと、脳内に謎の声が語りかけてくる。\n\n『お前に猫耳としっぽを授けてやった』\n『身に余る光栄だろう。感謝したまえ』",
    date: "2022.03.12",
    cast: "千秋 (16歳・高校生) 千冬 (18歳・専門学校)",
  },
  {
    overallNumber: 6,
    season: 1,
    seasonEpisodeNumber: 6,
    slug: "06",
    title: "君の胴",
    summaryImage: `${IMG}/s1-06-summary.jpg`,
    detailImage: `${IMG}/s1-06-detail.jpg`,
    description: "君が横たわっている。廊下は暗い。",
    date: "2022.04.26",
    cast: "千秋 (16歳・高校生) 千冬 (18歳・専門学校)",
  },
  {
    overallNumber: 6.5,
    season: 1,
    slug: "shi-no-teigi",
    title: "問：死の定義を教えてください",
    smallText: true,
    summaryImage: `${IMG}/s1-shi-summary.jpg`,
    detailImage: `${IMG}/s1-shi-detail.jpg`,
    description:
      "[お知らせです。██ ██さん、██ ███さんがお待ちでした。]\n\nそれでは、探索者の自己紹介をお願い致します。\n設定を全て読み上げ、認知しましょう。\n\n※本シナリオは、IF世界の出来事である。",
    isAlternate: true,
    date: "2022.10.15",
    cast: "千秋 (高校生) 千冬 (専門学校)",
  },
  {
    overallNumber: 7,
    season: 1,
    seasonEpisodeNumber: 7,
    slug: "07",
    title: "死にたがり電車",
    summaryImage: `${IMG}/s1-07-summary.jpg`,
    detailImage: `${IMG}/s1-07-detail.jpg`,
    description:
      "ホームで電車を待っていた千秋。\n――背後から、声が聞こえた。\n\n「命は粗末にするものではありませんよ」",
    date: "2022.10.24",
    cast: "千秋 (16歳・高校生) 千冬 (18歳・専門学校)",
  },
  {
    overallNumber: 8,
    season: 1,
    seasonEpisodeNumber: 8,
    slug: "08",
    title: "Mess up with Desire !",
    smallText: true,
    summaryImage: `${IMG}/s1-08-summary.jpg`,
    detailImage: `${IMG}/s1-08-detail.jpg`,
    description:
      "本能が囁く。\n「欲望に忠実であれ」「理性なんて捨てて」\n「あるがままに生きろ」と。",
    date: "2022.11.26",
    cast: "千秋 (16歳・高校生) 千冬 (18歳・専門学校)",
  },
];

// =========================================================
// ヘルパー関数
// =========================================================

/** 指定シーズンのエピソードを通算番号順に取得 */
export const episodesBySeason = (n: number): EpisodeEntry[] =>
  episodes
    .filter((e) => e.season === n)
    .sort((a, b) => a.overallNumber - b.overallNumber);

/** シーズン番号 + slug から 1 件取得（無ければ undefined） */
export const findEpisode = (
  season: number,
  slug: string
): EpisodeEntry | undefined =>
  episodes.find((e) => e.season === season && e.slug === slug);

/** 指定シーズンの先頭エピソード（通算番号最小） */
export const firstEpisodeOfSeason = (n: number): EpisodeEntry | undefined =>
  episodesBySeason(n)[0];

/** 全エピソードを通算番号順で返す（タイムライン用） */
export const episodesTimeline = (): EpisodeEntry[] =>
  [...episodes].sort((a, b) => a.overallNumber - b.overallNumber);

/** URL スラッグ（"season1" など）から SeasonInfo を取得 */
export const seasonFromSlug = (slug: string): SeasonInfo | undefined =>
  seasons.find((s) => s.slug === slug);
