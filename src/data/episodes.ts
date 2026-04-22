// =========================================================
// Episodes ページのデータ
// ---------------------------------------------------------
// データ構造：
//   episodes: Season[]   ← トップレベル配列はシーズンの配列
//   各 Season は自身のメタ情報（番号・ラベル・URL スラッグ）と
//   そのシーズンに属する EpisodeEntry[] を持つ。
//
// URL 規則：
//   一覧/詳細ページ：/episodes/season{N}/{slug}/
//   ログ本文ページ ：/episodes/season{N}/{slug}/log/
//   - N は 1〜4（シーズン番号）
//   - slug は通常 "00", "01" のような2桁数字（＝シーズン内エピソード番号）
//   - 別史エピソードは通算番号を持たないので、任意の半角英数スラッグを付ける
//     （例： "negai"、"shi-no-teigi"）
//
// 画像ファイル：public/images/episodes/ 以下に配置
//   - summaryImage : 一覧カードの背景に敷く概要画像（左から白でフェード）
//   - detailImage  : 右パネルに大きく表示するメイン画像
//
// フラグ：
//   - isAlternate : 「別史」扱い（通算番号を出さず、黒ベースのカード）
//   - smallText   : タイトルが長くて収まらない場合に ON
//   - isR18       : 詳細パネル左下に "R-18" バッジを表示
//   - isR18G      : 詳細パネル左下に "R-18G" バッジを表示
// =========================================================

export interface EpisodeEntry {
  /** シーズンをまたいだ通し番号。タイムライン並び替えに使う */
  overallNumber: number;
  /** シーズン内エピソード番号。別史エピソードは undefined（カードでは "—" 表記） */
  seasonEpisodeNumber?: number;
  /** URL 用スラッグ（半角英数ハイフンのみ）。通常は seasonEpisodeNumber と同じ文字列 */
  slug: string;
  /** タイトル */
  title: string;
  /** 一覧カードの背景画像 */
  summaryImage: string;
  /** 詳細パネルの大きい画像 */
  detailImage: string;
  /** 詳細パネル本文（\n 改行可） */
  description: string;
  /** 別史フラグ */
  isAlternate?: boolean;
  /** 文字縮小フラグ（タイトルが長い時 ON） */
  smallText?: boolean;
  /** タイムライン用：作中日付（"2021.10.02" 形式推奨） */
  date?: string;
  /** タイムライン用：登場キャラと年齢などを 1 行で */
  cast?: string;
  /** R-18 バッジを表示する */
  isR18?: boolean;
  /** R-18G バッジを表示する */
  isR18G?: boolean;
}

/** シーズンの基本メタ情報（番号・表示名・URL スラッグ） */
export interface SeasonInfo {
  number: 1 | 2 | 3 | 4;
  label: string;
  slug: string;
}

/** シーズンメタ情報＋そのシーズンに属するエピソード配列 */
export interface Season extends SeasonInfo {
  episodes: EpisodeEntry[];
}

// 画像パスを短く書くためのプレフィックス
const IMG = "/images/episodes";

// =========================================================
// 全データ（トップレベル＝シーズン配列）
// =========================================================
export const episodes: Season[] = [
  // ===================== 1st season =====================
  {
    number: 1,
    label: "1st season",
    slug: "season1",
    episodes: [
      {
        overallNumber: 0,
        seasonEpisodeNumber: 0,
        slug: "00",
        title: "「」なんてね",
        summaryImage: `${IMG}/s1-00-summary.jpg`,
        detailImage: `${IMG}/s1-00-detail.jpg`,
        description:
          "母親を交通事故で失ったのは1年前のこと。\n父親は、生まれた頃にはいなかった。\n高校生の染谷千秋は、兄である染谷千冬と支え合って生きている。\n普通の高校生と変わらない日常を過ごす彼には、とある秘密があった。\n──千秋は「血縁者である兄」に「恋情」を抱いている。\n\nある日、千秋は悪夢を見た。\nそれは、大切なものが消えゆくような、そんな夢だった。",
        isR18: true,
        date: "2021.10.02",
        cast: "千秋 (15歳・高校生) 千冬 (18歳・専門学校)",
      },
      {
        overallNumber: 1,
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
        seasonEpisodeNumber: 4,
        slug: "04",
        title: "Multi*Dead*Ending",
        summaryImage: `${IMG}/s1-04-summary.jpg`,
        detailImage: `${IMG}/s1-04-detail.jpg`,
        description:
          "「目が覚める。　殺される。」\n道を歩く。　殺される。　目が覚める。\n食事をする。　殺される。　目が覚める。\n殺される。　目が覚める。　殺される。　目が覚めた。\nもう殺されない。\n\n……目が覚める。",
        date: "2022.02.20",
        cast: "千秋 (16歳・高校生) 千冬 (18歳・専門学校)",
      },
      {
        overallNumber: 5,
        seasonEpisodeNumber: 5,
        slug: "05",
        title: "探索者に猫耳生えるだけ",
        summaryImage: `${IMG}/s1-05-summary.jpg`,
        detailImage: `${IMG}/s1-05-detail.jpg`,
        description:
          "ある日の朝、いつも通り目を覚ます千冬。\n頭に違和感を覚えた千冬がふわふわとしたそれに触れると、耳を撫でた時のような感覚があった。\n洗面台の鏡に映る猫耳としっぽ。\n混乱した千冬が千秋の部屋に向かうと、脳内に謎の声が語りかけてくる。\n\n『お前に猫耳としっぽを授けてやった』\n『身に余る光栄だろう。感謝したまえ』",
        date: "2022.03.12",
        cast: "千秋 (16歳・高校生) 千冬 (18歳・専門学校)",
      },
      {
        overallNumber: 6,
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
        slug: "shi-no-teigi",
        title: "問：死の定義を教えてください",
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
        seasonEpisodeNumber: 8,
        slug: "08",
        title: "Mess up with Desire !",
        summaryImage: `${IMG}/s1-08-summary.jpg`,
        detailImage: `${IMG}/s1-08-detail.jpg`,
        description:
          "本能が囁く。\n「欲望に忠実であれ」「理性なんて捨てて」\n「あるがままに生きろ」と。",
        date: "2022.11.26",
        cast: "千秋 (16歳・高校生) 千冬 (18歳・専門学校)",
        isR18: true,
      },
      {
        overallNumber: 9,
        seasonEpisodeNumber: 9,
        slug: "09",
        title: "純愛、故に",
        summaryImage: `${IMG}/s1-09-summary.jpg`,
        detailImage: `${IMG}/s1-09-detail.jpg`,
        description:
          "「これから先、何があろうとも」\n「ずっと、千冬を愛してる」\n\n『愛とは暴力、愛とは加虐、愛とは強欲』\n『純愛、故に人は―――である』\n――――がたんがたん、と電車が近づく音がする。",
        isR18G: true,
      },
      {
        overallNumber: 10,
        seasonEpisodeNumber: 10,
        slug: "10",
        title: "灯路帰譚",
        summaryImage: `${IMG}/s1-10-summary.jpg`,
        detailImage: `${IMG}/s1-10-detail.jpg`,
        description:
          "すべてを飲み込む漆黒の風景で、千秋は身を寝かせて目を覚ました。\nその闇を照らすのは、千冬が握る提灯のひかりのみ。\n\n行きはよいよい、帰りはこわい。\n何も見ないで、聞かないで。\n\n――千冬と共に、ふたりで帰路を歩み出す。",
      },
    ],
  },

  // ===================== 2nd season =====================
  {
    number: 2,
    label: "2nd season",
    slug: "season2",
    episodes: [
      {
        overallNumber: 11,
        seasonEpisodeNumber: 11,
        slug: "11",
        title: "52Hzの救難信号",
        summaryImage: `${IMG}/s2-11-summary.jpg`,
        detailImage: `${IMG}/s2-11-detail.jpg`,
        description:
          "寒さが身に染みる季節。\n千冬と千秋は、冷え込む夜の中帰り道で、古いレンガ造りの建物に貼られているポスターに目を惹かれた。\n深い青色のポスターには、『世界でもっとも孤独な鯨』と書かれていた。\n\n視界が青に包まれる。泡の音に紛れて音が反響する。巨大な影が頭上を覆う。\n――――高い歌声が、聞こえる。",
      },
      {
        overallNumber: 12,
        seasonEpisodeNumber: 12,
        slug: "12",
        title: "世界の終わりを君と見たい",
        summaryImage: `${IMG}/s2-12-summary.jpg`,
        detailImage: `${IMG}/s2-12-detail.jpg`,
        description:
          "がたんごとん。がたんごとん。\n――電車の音で目を覚ます。\n千冬が窓の外に視線を向けると、そこには満天の星空が広がっていた。\n真っ黒なキャンバスを、小さな星たちが散らばり、夜空を明るく彩っている。\n\n「行こうぜ。世界の終わりを見に！」\n幻想的な星空の下、千秋は屈託のない笑顔を浮かべた。",
      },
      {
        overallNumber: 13,
        seasonEpisodeNumber: 13,
        slug: "13",
        title: "おはよう、世界。",
        summaryImage: `${IMG}/s2-13-summary.jpg`,
        detailImage: `${IMG}/s2-13-detail.jpg`,
        description:
          "どこにいても、あいしていたい。\nどこにいたって、あいされたい。\n\n――眠りに落ちる瞬間、「××になってみない？」という声が聞こえた。\n千秋は、××になった。\n\n千秋にとっての世界とは、千冬だ。",
      },
      {
        overallNumber: 14,
        seasonEpisodeNumber: 14,
        slug: "14",
        title: "ブルー・スターズ・セパレート",
        summaryImage: `${IMG}/s2-14-summary.jpg`,
        detailImage: `${IMG}/s2-14-detail.jpg`,
        description:
          "――千冬は今日も水の中にいた。\n指先はピクリとも動かない。後方に向かってゆっくりと沈んでいき、潰されるような水圧で肺からゴボリと空気が抜ける。\n冷たい水に体温を奪われながら、深い水底へと沈んでいく。\n\n……梅雨のある日、千秋と待ち合わせをしていた千冬に通話が届く。\nその内容は、「千秋は預かった。返してほしければ指示に従え」というものだった。",
      },
      {
        overallNumber: 15,
        seasonEpisodeNumber: 15,
        slug: "15",
        title: "真実は無色",
        summaryImage: `${IMG}/s2-15-summary.jpg`,
        detailImage: `${IMG}/s2-15-detail.jpg`,
        description:
          "物の変化とは表面に現れた現象面での変化に過ぎない。万物は絶えざる変化を遂げるが、その実、本質においては何ら変わりの無い。\nしかし貴方が望むのなら、その形を自身の好きな色に彩っても良いだろう。\n真実は無色なのだから。\n\n「勿論、貴方が全ての選択に満足していると言うなら――別世界線を鑑賞するだけにしましょうか」",
      },
      {
        overallNumber: 16,
        seasonEpisodeNumber: 16,
        slug: "16",
        title: "貴方の顔も知らない",
        summaryImage: `${IMG}/s2-16-summary.jpg`,
        detailImage: `${IMG}/s2-16-detail.jpg`,
        description:
          "カツ、カツ、カツ。\n背後から軽やかな足音が聞こえる。\n「なんてね。ただの夢だよ」\n「この先を見たくなかった？　あの日をやり直そうと思った？　運命を変えたいと思った？」\n「あははは。ご冗談を」\n\n「久しぶり。元気にしてたかい」",
      },
      {
        overallNumber: 17,
        seasonEpisodeNumber: 17,
        slug: "17",
        title: "最果てへの逃避行",
        summaryImage: `${IMG}/s2-17-summary.jpg`,
        detailImage: `${IMG}/s2-17-detail.jpg`,
        description:
          "強風の吹き抜けるビルの屋上。曇天の下、騒ぎ立てる人々の声が耳に突き刺さる。\n千冬に銃口を向けているのは、千冬がよく知る唯一無二の存在だった。誰よりも大切なはずのその人は、ゆっくりとその唇を開き、確かな意思を宿した冷たい眼差しを向ける。\n\n「……なぁ、頼むよ」\n「……頼むから、死んでくれ」",
      },
      {
        overallNumber: 18,
        seasonEpisodeNumber: 18,
        slug: "18",
        title: "愛猫の上手な鳴かせ方",
        summaryImage: `${IMG}/s2-18-summary.jpg`,
        detailImage: `${IMG}/s2-18-detail.jpg`,
        description:
          "――ふ、と意識が浮上する。\n休日の朝、目を覚ました千冬。\n重さを感じて目を向ければ、その隣には丸まって眠る千秋がいた。\nしかし、様子がいつもと違う。\n\n動物の耳と尻尾の生えた、それはまるで猫。\n\n「さて、まずは猫ちゃんの可愛い声を聞いてみましょう」",
        isR18: true,
      },
      {
        overallNumber: 18.1,
        slug: "genkai-bed-trip",
        title: "幻界0ベッドトリップ",
        summaryImage: `${IMG}/s2-genkai-bed-trip-summary.jpg`,
        detailImage: `${IMG}/s2-genkai-bed-trip-detail.jpg`,
        description:
          "――千冬と音信不通になってから2週間。\n千秋は行方不明になった千冬を探していた。\n同じく姉を探す女性と出会い、捜査に進展があった日の夜、千秋の元へ一本の着信が入る。表示には千冬の名前が映し出されていた。\n\n半月ぶりに聞いたその声には、苦痛と快楽が滲んでいた――。\n\n※本シナリオは、出来事自体を無いものとする。",
        isAlternate: true,
        isR18: true,
        isR18G: true,
      },
      {
        overallNumber: 18.2,
        slug: "porno-snuff-hallucinate",
        title: "ポルノスナッフハルシネイト",
        summaryImage: `${IMG}/s2-porno-snuff-hallucinate-summary.jpg`,
        detailImage: `${IMG}/s2-porno-snuff-hallucinate-detail.jpg`,
        description:
          "千冬の目的地は、裏路地に建つ古い安ホテルだ。\n路地に張り出したプラスチックの看板は、色褪せてひどくひび割れている。\nロビーに通じる扉は手で押すたびにひどくきしむ。\n路地を挟んですぐそばには浅いどぶ川が流れていて湿気が籠り、お世辞にも過ごしやすい場所とは言えない。\nしかし、今はここだけがふたりの――千冬と千秋の棲処だ。\n\n※本シナリオは、出来事自体を無いものとする。",
        isAlternate: true,
        isR18: true,
        isR18G: true,
      },
      {
        overallNumber: 19,
        seasonEpisodeNumber: 19,
        slug: "19",
        title: "またたくシティライト",
        summaryImage: `${IMG}/s2-19-summary.jpg`,
        detailImage: `${IMG}/s2-19-detail.jpg`,
        description:
          "吐く息が白くなろうという季節。時刻は午後8時過ぎ。\n一日の仕事を終えた千冬は、誕生日ケーキを片手に、千秋の待つ家へと向かっていた。小雨の中帰路につく。暗がりに差し掛かったところで、突如物陰から伸びてきた手が千冬の手をがしりと掴んだ。\n\n「予報だと曇りだったのにな。ついてねー」\n千冬を路地裏に引っ張ったのは、先程まで連絡を取り合っていたはずの千秋だった。",
      },
      {
        overallNumber: 20,
        seasonEpisodeNumber: 20,
        slug: "20",
        title: "命泥棒",
        summaryImage: `${IMG}/s2-20-summary.jpg`,
        detailImage: `${IMG}/s2-20-detail.jpg`,
        description:
          "春の陽光が降り注ぐ暖かい休日。ふたりは水族館へと足を運んでいた。\n\nクラゲがゆらゆらと漂い、光の反射が水槽の壁にきらきらと踊る。生命の神秘が静かなお話を放っていた。\n人混みの中、千冬と千秋は離れてしまわないように身体を近付け、手をしっかりと握り笑い合う。\n\nそんな平和で、幸せな日常を――泥棒に奪われた。",
        isR18: true,
      },
      {
        overallNumber: 21,
        seasonEpisodeNumber: 21,
        slug: "21",
        title: "more than WHITE",
        summaryImage: `${IMG}/s2-21-summary.jpg`,
        detailImage: `${IMG}/s2-21-detail.jpg`,
        description:
          "「千秋。俺の誓いを、聞いてくれないか」\n\n千秋の誘いで、二人はとあるリゾート地に訪れた。その島ではフォトウェディングを行うツアーがあるらしい。\n絵具を塗ったように鮮やかな空の青と、白い船の対比が眩しい。\n地平の向こう側から覗くその島は、まるで天国のようだ。\n統一された白い石の建築物が目立つ島で、二人は永遠の誓いを交わす。\n――不穏な影が忍び寄ることに気付かないまま。",
        isR18: true,
      },
    ],
  },

  // ===================== 3rd season =====================
  {
    number: 3,
    label: "3rd season",
    slug: "season3",
    episodes: [
      {
        overallNumber: 22,
        seasonEpisodeNumber: 22,
        slug: "22",
        title: "Seven-Night, Monochrome Summer",
        summaryImage: `${IMG}/s3-22-summary.jpg`,
        detailImage: `${IMG}/s3-22-detail.jpg`,
        description:
          "蝉時雨と千冬の死体。\n\n部屋は冷房も効いておらず、暑くて仕方がない。\nむわりとむせ返るほどの生臭いにおい。死のにおい。\n蝿が一匹、千冬の瞼に止まっている。\n\n暑い夏が始まった。",
        isR18: true,
        isR18G: true,
      },
      {
        overallNumber: 23,
        seasonEpisodeNumber: 23,
        slug: "23",
        title: "奪取脱出ストラグル",
        summaryImage: `${IMG}/s3-23-summary.jpg`,
        detailImage: `${IMG}/s3-23-detail.jpg`,
        description:
          "奇妙な視線を感じるようになって早3ヶ月。家を出てから帰るまで、千冬は謎の視線にさらされていた。物理的な攻撃や直接的な脅迫はないにせよ、視線に晒され続ける生活にストレスを感じていた頃その事件は起こった。\n\n凄まじいブレーキ音と何か大きな物が衝突したかの様な轟音が耳に届く。\n「オカエリハ　コチラカラ」\n――――一つの狂愛の末路。巻き込まれたふたりの人間。\n果たして、奪われる前に日常への扉をくぐれるのか。",
        isR18: true,
      },
      {
        overallNumber: 24,
        seasonEpisodeNumber: 24,
        slug: "24",
        title: "お前が人を殺すのだ",
        summaryImage: `${IMG}/s3-24-summary.jpg`,
        detailImage: `${IMG}/s3-24-detail.jpg`,
        description:
          "目が覚める。そこは小さな法廷だった。目の前には檻が二つ。その中に人がいる。\n「原告、証言をどうぞ」\n法廷の奥には扉が見える。その扉は開かない。\n「被告、証言をどうぞ」\n覆面をかぶった人間が一人立っていた。それは千秋に向かって口を開く。\n\n「君が罪を裁くのだ。さて、罪人はどちらだ？」",
      },
      {
        overallNumber: 25,
        seasonEpisodeNumber: 25,
        slug: "25",
        title: "ミュージアム・トゥ・ユー",
        summaryImage: `${IMG}/s3-25-summary.jpg`,
        detailImage: `${IMG}/s3-25-detail.jpg`,
        description:
          "「俺が、俺じゃなくなったら、どうする？」\n\n市所有の建物が博物館としてリニューアルオープンするらしい。展示会が開催されるというその広告に、一つの作品が載っていた。千秋の目に止まったそれは、美しい花の絵だった。\n\n直感が警鐘を鳴らす。このミュージアムには何かがある。\n花を千冬と見なければならない。これは眠らせるべきだ。\nそうして千秋は千冬を博物館へと連れ出すのだった。",
      },
      {
        overallNumber: 26,
        seasonEpisodeNumber: 26,
        slug: "26",
        title: "水中密室",
        summaryImage: `${IMG}/s3-26-summary.jpg`,
        detailImage: `${IMG}/s3-26-detail.jpg`,
        description:
          "「奇跡のリアル脱出ショーへようこそ！」\n\n目を覚ますと、そこは10m四方くらいの正方形の部屋だった。\nそこに来た記憶はない。前前の記憶も思い出せない。\n目を覚ましたときにはもうそこにいた。\n\n「貴方に与えられた時間は60分、見事脱出出来たら豪華景品をプレゼントしております」\nそう告げた瞬間、カウントダウンが始まる。",
      },
      {
        overallNumber: 27,
        seasonEpisodeNumber: 27,
        slug: "27",
        title: "喰らわば、日常",
        summaryImage: `${IMG}/s3-27-summary.jpg`,
        detailImage: `${IMG}/s3-27-detail.jpg`,
        description:
          "目が覚めると見知らぬ場所に立っていた。\n隣には千冬がいる。このような経験が初めてであれば驚くかもしれないが、ふたりは揃ってこう思うのだ。\n「ああ、またか」\n\nいつものことだ。いつものことだ。\nこれはふたりにとって日常だ。認めたくはないかもしれないが。\n\n……ああ、それにしても。ここは随分と居心地がいい、気がする。",
      },
      {
        overallNumber: 28,
        seasonEpisodeNumber: 28,
        slug: "28",
        title: "縁々獄々",
        summaryImage: `${IMG}/s3-28-summary.jpg`,
        detailImage: `${IMG}/s3-28-detail.jpg`,
        description:
          "「問一。貴方の目は正常に機能していますか？」\n「問二。貴方の口は正常に機能していますか？」\n\n「問八。貴方の××は正常に機能していますか？」\n\n結ばれる縁は選べない。\n理不尽はいつでもあなたの隣に存在する。",
        isR18G: true,
      },
      {
        overallNumber: 28.1,
        slug: "yasashii-sekai-to-kokyuhou",
        title: "やさしい世界と呼吸法",
        summaryImage: `${IMG}/s3-yasashii-sekai-to-kokyuhou-summary.jpg`,
        detailImage: `${IMG}/s3-yasashii-sekai-to-kokyuhou-detail.jpg`,
        description:
          "さあ、息をしようか。この穏やかな日常を噛み締めながら。\n\n※本シナリオは、出来事自体を無いものとする。",
        isAlternate: true,
      },
      {
        overallNumber: 28.2,
        slug: "jigoku-to-tengoku-wa-kokuji-suru",
        title: "地獄と天国は酷似する",
        summaryImage: `${IMG}/s3-jigoku-to-tengoku-wa-kokuji-suru-summary.jpg`,
        detailImage: `${IMG}/s3-jigoku-to-tengoku-wa-kokuji-suru-detail.jpg`,
        description:
          "「皿とは言わず地獄まで」\n「私に協力してほしい」\n深夜、最愛の顔をした誰かが告げる。\n\n「天国では生きられない」\n目を覚ますと、そこは楽園だった。\nあなただけがいない楽園だ。\n\n※本シナリオは、出来事自体を無いものとする。",
        isAlternate: true,
      },
      {
        overallNumber: 29,
        seasonEpisodeNumber: 29,
        slug: "29",
        title: "ナイトアクアリウムの怪",
        summaryImage: `${IMG}/s3-29-summary.jpg`,
        detailImage: `${IMG}/s3-29-detail.jpg`,
        description:
          "あなた方は都会の喧騒を忘れるような、穏やかな癒しの空間だと話題のナイトアクアリウムを訪れた。\n\n不可思議な旋律に導かれるようにして顔をあげた先で、水槽からぬっと抜け出て宙を優雅に泳ぐものを目にする。\n\nそれは此処にいるはずのない、大きな、大きな一頭のクジラだった。",
        isR18: true,
      },
      {
        overallNumber: 30,
        seasonEpisodeNumber: 30,
        slug: "30",
        title: "ラストオーダーはキミがいい",
        summaryImage: `${IMG}/s3-30-summary.jpg`,
        detailImage: `${IMG}/s3-30-detail.jpg`,
        description:
          "真夏の夜、金曜日の時刻は22時。\n夏のひとしずくが過ぎ去り、暑さがまだ残る中、千冬は一日の労働を終えて車に乗り込んだ。\nその時千秋から連絡が入る。今日は遅くなるらしい。先に寝てほしいという千秋の連絡と、スマホに表示された時刻を見比べた千冬は、ちょうどいいと考え、千秋を迎えに行くことにした。\n\nホテルについた千冬が目にしたのは、大きな真珠をもつ怪しい男と、泥酔した千秋の姿だった。",
        isR18: true,
      },
      {
        overallNumber: 31,
        seasonEpisodeNumber: 31,
        slug: "31",
        title: "LaLuLa",
        summaryImage: `${IMG}/s3-31-summary.jpg`,
        detailImage: `${IMG}/s3-31-detail.jpg`,
        description:
          "ふたりは探索者である。\n神話的事象に遭遇し、辛くも生き延びつつ、束の間の平穏を身近な人々と謳歌している。\n\n街角のはやり歌。\n親しい人との外出。\n他愛もない噂話。\n\n時にふたりは、近頃うまく眠れない。",
        isR18: true,
      },
      {
        overallNumber: 32,
        seasonEpisodeNumber: 32,
        slug: "32",
        title: "深海より",
        summaryImage: `${IMG}/s3-32-summary.jpg`,
        detailImage: `${IMG}/s3-32-detail.jpg`,
        description:
          "千冬は仕事を辞め、これから千秋の配信活動を手伝うことになる。それに合わせて、北海道へ引っ越しをすることにした。\n\n引っ越す前日、二人は近くの海に訪れた。そして海辺のとある神社に足を踏み入れる。\n中を見て回っていたその時、突然景色が歪む。重力が失われる。\nそして眩い光に包まれた後、すぐに暗闇が訪れた。\n視界が光を取り戻した時、目の前には――。",
        isR18: true,
      },
    ],
  },

  // ===================== 4th season =====================
  {
    number: 4,
    label: "4th season",
    slug: "season4",
    episodes: [
      {
        overallNumber: 33,
        seasonEpisodeNumber: 33,
        slug: "33",
        title: "催眠ダーリンLv1",
        summaryImage: `${IMG}/s4-33-summary.jpg`,
        detailImage: `${IMG}/s4-33-detail.jpg`,
        description:
          "千冬と一緒に街へ繰り出した千秋。\nひょんなことから人にぶつかり、落ちた自分のスマホを取り上げた瞬間。\nカシャッ、という音と共に、画面の中央に紙吹雪が舞い、ウィンドウがポップアップされる。\n「おめでとうございます、新しいキャラクターの登録が完了しました！」\nそこに表示されたのは、入れた覚えのない『催眠アプリ』。\nそして、千冬の様子が……！？",
      },
      {
        overallNumber: 34,
        seasonEpisodeNumber: 34,
        slug: "34",
        title: "双離の果実",
        summaryImage: `${IMG}/s4-34-summary.jpg`,
        detailImage: `${IMG}/s4-34-detail.jpg`,
        description:
          "千秋と千冬は、少し硬いベッドで身を起こす。見渡せば、そこは殺風景な見知らぬ部屋だった。\nどちらも頼りない「一枚のガウン」と「赤色のチョーカー」しか身につけていなかった。\n\n――だからこそ、気づいたのだ。\n自分の身体に起きている『異変』に。",
      },
      {
        overallNumber: 35,
        seasonEpisodeNumber: 35,
        slug: "35",
        title: "夜になんか攫われてたまるか",
        summaryImage: `${IMG}/s4-35-summary.jpg`,
        detailImage: `${IMG}/s4-35-detail.jpg`,
        description:
          "「……見られている気がする」\n外出先で視線を感じた千冬。しかし辺りを見回しても、視線の元となる人物はいない。警戒した千秋は、千冬に外出禁止と言い渡した。\nそれから一ヶ月。『外に出たい』という千冬の願いを聞いて、二人は久々に近くのスーパーへと出かけた。その帰りだった。\n\n「ようやく捕まえた。君こそ我が夜に相応しい」",
      },
      {
        overallNumber: 36,
        seasonEpisodeNumber: 36,
        slug: "36",
        title: "蓄壊",
        summaryImage: `${IMG}/s4-36-summary.jpg`,
        detailImage: `${IMG}/s4-36-detail.jpg`,
        description:
          "感じないと思い込んでも\n感じたものは　確かに　そこに\n蓄積されていくだけだ。\n\n目が覚めたら見知らぬ施設、手首には重苦しいバングル。\n「おつきあいいただければ、みのあんぜんは保証しましょう」\n\nさて、従おうか？ 逃げ出そうか？",
        isR18: true,
      },
    ],
  },
];

// =========================================================
// 派生データ・ヘルパー関数
// =========================================================

/** シーズンのメタ情報のみ（番号・ラベル・URL スラッグ） */
export const seasons: readonly SeasonInfo[] = episodes.map(
  ({ number, label, slug }) => ({ number, label, slug }),
);

/** 指定シーズンのエピソードを通算番号順で返す */
export const episodesBySeason = (n: number): EpisodeEntry[] =>
  (episodes.find((s) => s.number === n)?.episodes ?? [])
    .slice()
    .sort((a, b) => a.overallNumber - b.overallNumber);

/** シーズン番号 + slug から 1 件取得（無ければ undefined） */
export const findEpisode = (
  season: number,
  slug: string,
): EpisodeEntry | undefined =>
  episodes
    .find((s) => s.number === season)
    ?.episodes.find((e) => e.slug === slug);

/** 指定シーズンの先頭エピソード（通算番号最小） */
export const firstEpisodeOfSeason = (n: number): EpisodeEntry | undefined =>
  episodesBySeason(n)[0];

/** タイムライン用：全エピソードを通算番号順 + シーズン情報を埋め込む */
export interface TimelineEntry extends EpisodeEntry {
  /** 親シーズン番号 */
  season: 1 | 2 | 3 | 4;
  /** 親シーズン URL スラッグ */
  seasonSlug: string;
  /** 親シーズン表示名 */
  seasonLabel: string;
}
export const episodesTimeline = (): TimelineEntry[] =>
  episodes
    .flatMap((s) =>
      s.episodes.map<TimelineEntry>((e) => ({
        ...e,
        season: s.number,
        seasonSlug: s.slug,
        seasonLabel: s.label,
      })),
    )
    .sort((a, b) => a.overallNumber - b.overallNumber);

/** URL スラッグ（"season1" など）から SeasonInfo を取得 */
export const seasonFromSlug = (slug: string): SeasonInfo | undefined =>
  seasons.find((s) => s.slug === slug);

/** [season]/[slug] ページの getStaticPaths 用 */
export const allEpisodes = (): { season: Season; episode: EpisodeEntry }[] =>
  episodes.flatMap((s) => s.episodes.map((e) => ({ season: s, episode: e })));

/** エピソード詳細ページ URL（末尾スラッシュ込み） */
export const episodeHref = (seasonSlug: string, episodeSlug: string): string =>
  `/episodes/${seasonSlug}/${episodeSlug}/`;

/** ログ本文ページ URL（末尾スラッシュ込み） */
export const episodeLogHref = (
  seasonSlug: string,
  episodeSlug: string,
): string => `/episodes/${seasonSlug}/${episodeSlug}/log/`;
