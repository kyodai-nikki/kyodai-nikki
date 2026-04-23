// =========================================================
// Characters ページのキャラクター情報
// ---------------------------------------------------------
//   - slug:        URL 用スラッグ（/characters/<slug>/）。半角英数。
//   - name:        表示名（漢字）
//   - furigana:    名前カナ（カタカナまたはひらがな）
//   - portrait:    一覧用の縦長サムネイル画像（public/images/characters/ 配下）
//   - standing:    詳細ページの立ち絵（透過PNG推奨）
//   - quote:       詳細の左に縦書きで出るキャラの台詞
//   - description: 紹介文（複数行可、\n で改行）
//   - age / gender / height / weight / birthday: ステータス表示用
//   - externalLink: 外部サイト（いあきゃら等）への URL。空なら非表示。
// 画像本体は public/images/characters/ に配置：
//   public/images/characters/chiaki-portrait.jpg   ← 一覧サムネ
//   public/images/characters/chiaki-standing.png   ← 立ち絵
// =========================================================

export interface Character {
  slug: string;
  name: string;
  furigana: string;
  portrait: string;
  standing: string;
  quote: string;
  description: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  birthday: string;
  externalLink?: string;
}

export const characters: Character[] = [
  {
    slug: "chiaki",
    name: "染谷千秋",
    furigana: "そめや ちあき",
    portrait: "/images/characters/chiaki-portrait.jpg",
    standing:  "/images/characters/chiaki-standing.png",
    quote:
      "「好きだよ。\n千冬のためなら何でもできる。\n…これが俺の本音〜」",
    description:
      "染谷千冬の弟。高校三年。\n一見温厚そうだが、千冬以外のものに興味がないだけ。\n怒ると容赦がない。自分の目的のためには手段を選ばない非情な性格。\n普段は猫を被っている。人・物に限らず観察する癖がある。\n兄に敵対する人間を潰すうちに裏番長になっていた。",
    age: "17歳",
    gender: "男",
    height: "175cm",
    weight: "56.5kg",
    birthday: "11月14日",
    externalLink: "https://iachara.com/view/5597389",
  },
  {
    slug: "chifuyu",
    name: "染谷千冬",
    furigana: "そめや ちふゆ",
    portrait: "/images/characters/chifuyu-portrait.jpg",
    standing:  "/images/characters/chifuyu-standing.png",
    quote:
      "「俺も、千秋を信じるから。\nだから千秋も、俺を信じてくれ」",
    description:
      "染谷千秋の兄。建築専門学校の一年。\n穏やかで心優しい性格。平和主義。\nしかし口下手かつ目つきが悪いため、いつも無愛想に見える。\nそのせいで人から怖がられることや避けられること、もしくは敵意を向けられることが多い。\n趣味は読書やテレビを見ること、ふらりと出かけること。",
    age: "18歳",
    gender: "男",
    height: "177cm",
    weight: "65kg",
    birthday: "12月13日",
    externalLink: "https://iachara.com/view/5394952",
  },
  {
    slug: "akito",
    name: "深山彰人",
    furigana: "みやま あきと",
    portrait: "/images/characters/akito-portrait.jpg",
    standing:  "/images/characters/akito-standing.png",
    quote: "",
    description:
      "建築専門学校の一年。千冬のクラスメイト。\nネット上で音楽活動をしている。",
    age: "18歳",
    gender: "男",
    height: "183cm",
    weight: "57kg",
    birthday: "—",
    externalLink: "",
  },
  {
    slug: "kujo",
    name: "九条",
    furigana: "くじょう",
    portrait: "/images/characters/kujo-portrait.jpg",
    standing:  "/images/characters/kujo-standing.png",
    quote: "",
    description:
      "千秋の裏バイトの同僚。\nDV彼氏と最近別れた。",
    age: "—",
    gender: "女",
    height: "—",
    weight: "—",
    birthday: "—",
    externalLink: "",
  },
];

/** slug をキーにキャラクターを取り出すヘルパー */
export const getCharacter = (slug: string) =>
  characters.find((c) => c.slug === slug);
