# Handoff: Matsuri — Photo Showcase (東京夏祭りフォトショーケース)

## Overview

写真の見せ方の違いを一つのページ内で体験できる、**編集メディア向けフォトショーケース**のデザインリファレンスです。テーマは「東京の夏祭りを取材したフォトストーリー」。1ページ完結で13種の演出パターン(#01〜#13)を並べ、閲覧者が「同じ写真でも見せ方で印象が変わる」ことを体感的に理解できることを目的としています。

想定用途:
- 通常記事 / 特集記事 / フォトエッセイのレイアウトパターン集
- 編集チーム内での見せ方合意形成
- CMSテンプレート / 記事コンポーネント設計の起点

---

## About the Design Files

このバンドルに含まれる `index.html` / `styles.css` / `script.js` は、**HTMLで作成されたデザインリファレンス(プロトタイプ)** です。最終的な見た目と挙動を提示することが目的であり、**そのままプロダクションコードにコピーする前提のコードではありません**。

実装者は、これらのHTMLデザインを **ターゲットコードベースの既存環境**(React / Vue / Astro / Next.js / Nuxt / Rails+ViewComponents / SwiftUI / Flutter / ネイティブ等)の慣習・コンポーネント基盤・パターンに沿って **再実装**してください。既存環境がまだない場合は、要件(SEOと初回表示速度が最重要 → Astro / Next.js SSG推奨)に応じて最適なフレームワークを選択してください。

CSS/JSはコピペではなく、下記「Design Tokens」「Interactions & Behavior」に基づいて設計システム / コンポーネントに **再構築**することを推奨します。

---

## Fidelity

**High-fidelity (hifi)** — 完成イメージに近いピクセル単位のモックです。色・タイポグラフィ・余白・アニメーションのすべてを最終形として扱ってください。ただし、写真素材は **AI生成のダミー**(本番では実撮影素材に置き換え)である点にご注意ください。

---

## Screens / Views

このデザインは **単一の縦長スクロールページ(1 route)** です。以下、上から順に13のセクションを列挙します。各セクションは「表示パターン名」でもあり、単独でCMSブロックコンポーネントとして再利用できるよう設計しています。

各セクションは `<section data-idx="N" data-name="…">` でマークされ、右下の固定カウンターと連動します。

---

### `#01 Hero` — 全画面ヒーロー

- **Purpose**: 特集の入口。写真の圧で「これは写真主役の記事だ」と伝える。
- **Layout**:
  - `height: 100svh; min-height: 600px;`
  - 背景写真 + 上下グラデーション暗幕 (vignette) + 上下2段のコンテンツ(左上=マーク / 右上=メタ / 左下=大見出し・サブ・スクロール誘導 / 右下=メタ)
  - 内側パディング: `clamp(24px, 6vw, 56px)` × `--gutter`
- **Components**:
  - **Background image**: `assets/01_hero_lanterns.jpg`, `object-fit: cover; background-position: center`。パララックス:スクロール量に応じ `translate3d(0, y*60px, 0) scale(1 + y*0.04)`(1画面分まで)。
  - **Vignette**: `linear-gradient(180deg, rgba(13,10,8,.55) 0%, rgba(13,10,8,.15) 30%, rgba(13,10,8,.1) 60%, rgba(13,10,8,.8) 100%)`
  - **Mark (左上)**: `font-family: Noto Serif JP; font-size: 14px; letter-spacing: .3em;` 内容: `祭  MATSURI`
  - **Meta (右上・右下)**: `font-family: JetBrains Mono; font-size: 10.5px; letter-spacing: .2em; text-transform: uppercase; opacity: .75; line-height: 1.9;`
  - **Hero title**: `font-family: Noto Serif JP; font-weight: 500; font-size: clamp(38px, 7vw, 84px); line-height: 1.15; max-width: 14ch;` 内容: 「写真が主役になる<br>Webメディア。」(2行目 `.thin` = 300 weight, opacity .85)
  - **Hero sub**: `font-size: 14px; letter-spacing: .05em; color: #e6dfd1; max-width: 44ch; line-height: 1.9;`
  - **Scroll indicator**: モノスペース10.5px + 縦2.2秒ループする 1px×32px の白線(`scaleY` を top→bottom で走らせる)
- **Color/text**: 前景色すべて `#f5f1ea` (ivory) 系。背景写真の暗部で読ませる。

---

### `#02 Intro` — 導入テキスト

- **Purpose**: 「このページの主張」を短く宣言する編集者ノート。
- **Layout**: `.wrap-narrow` (`max-width: 720px`) 中央寄せ。上下パディング `clamp(100px, 14vw, 180px)`。
- **Components**:
  - **Kicker**: モノスペース10.5px、`letter-spacing: .25em; text-transform: uppercase; color: var(--ink-2);`。内容: `Editor's note — このページについて`
  - **Body**: `font-family: Noto Serif JP; font-size: clamp(20px, 2.6vw, 26px); line-height: 1.9;`。`p + p` に `margin-top: 1.6em`。
  - **強調 (`em`)**: 下線ではなく、下62%位置から `rgba(201,152,106,.35)` の背景色でマーカー風にハイライト(`linear-gradient(180deg, transparent 62%, ...)`)。
  - **Foot metaデータ**: 3項目を `flex; gap: 32px;` で。モノスペース10.5px、`color: var(--mute)`。

---

### `#03 Full-bleed` — 全幅写真

- **Purpose**: 画面幅いっぱいで空気感・迫力を伝える章切り替え。
- **Layout**: `padding: 0;` 画像は `width: 100%; height: min(90svh, 820px); object-fit: cover;`
- **Foot**: 画像直下に `grid-template-columns: auto 1fr auto` で「パターンタグ / キャプション(明朝15px) / フレーム番号」を3カラム配置。720px以下では縦積み。

---

### `#04 Whitespace / 展示型`

- **Purpose**: 写真展のように「1枚ずつゆっくり鑑賞」させる。
- **Layout**: 背景 `--paper (#faf7f1)`。3行のグリッド、行ごとに左寄せ / 右寄せ / 左寄せ を交互。各画像枠 `max-width: min(52vw, 520px)`(右寄せは `48vw / 460px`)。
- **Components**:
  - **Frame**: 画像下に「メタ(左) / 種別(右)」の2列モノスペースメタ + 明朝14.5pxのキャプション。
  - すべて `data-lb` を持ちクリックでライトボックスへ。

---

### `#05 Editorial / 2カラム`

- **Purpose**: 特集記事・インタビュー風の読み物感。
- **Layout**: `grid-template-columns: 1fr 1fr; gap: clamp(32px, 6vw, 80px);` 左カラムを `position: sticky; top: 60px;`。820px以下で1カラムに。
- **Components**:
  - **Sticky image**: aspect-ratio 2:3、下にキャプション(モノスペース + 明朝)。
  - **Body**:
    - h3: `Noto Serif JP; 22px; 500; line-height: 1.5;` 隣接h3の前は `margin-top: 56px`。
    - p: `font-size: 15px; line-height: 2; color: var(--ink);`、最初のpに **drop cap**(`:first-letter` を明朝3.2em、`float: left`)。
    - Inset image: 段落間に挟む横写真 + キャプション。

---

### `#06 Photo Story / モンタージュ`

- **Purpose**: 文字ほぼゼロで、写真の連続で物語を運ぶ。
- **Layout**: **背景 `--sumi (#1a1614)`**、前景 ivory。縦のstripに `gap: clamp(56px, 8vw, 100px)` で4枚を配置。
  - Frame 01: `--sm` (max 520px, 右寄せ, `padding-left: 32px`)
  - Frame 02: `--md` (max 760px, 中央)
  - Frame 03: `--left` (max 600px, 左寄せ)
  - Frame 04: `--lg` (100%)
- **Components**:
  - 各フレーム左上に `.story__num` (モノスペース10.5px, `#7a7166`)。
  - キャプションは **明朝15px、`color: #d8cfc0`、`max-width: 44ch`**(一言のみ)。
- **カウンターの色**: このセクションでは右下カウンターが `.on-dark` に切り替わり、背景が墨黒半透明、文字がアイボリーに。

---

### `#07 Grid Gallery` (+ `#08 Lightbox`)

- **Purpose**: ディテール写真を、意図的なサイズ差でまとめて見せる。
- **Layout**: `grid-template-columns: repeat(6, 1fr); gap: clamp(10px, 1.4vw, 18px);`
- **Cell size classes**:
  - `.g-a`, `.g-b`: `span 3 / aspect-ratio 3/2`
  - `.g-c`: `span 2 / 1/1`
  - `.g-d`: `span 4 / 2/1`
  - `.g-e`, `.g-f`, `.g-g`: `span 2 / 3/4`
- **Hover state**: 画像 `transform: scale(1.03)` (0.8sイージング)、左上に `data-num` (例: `D-01`) がフェードイン(半透明黒背景、モノスペース9.5px)。
- **Cursor**: `cursor: zoom-in`。

#### `#08 Lightbox` (グローバル)

固定モーダル。`[data-lb][data-cap]` を持つ全要素で共通。
- **Layout**: `position: fixed; inset: 0; background: rgba(10,8,7,.94);` 中央フレックス、`padding: 24px`。
- **Stage**: `max-width: min(1280px, 96vw); max-height: 88vh;`
- **Image**: `max-height: 78vh; object-fit: contain; background: #0a0807;`
- **Foot**: 左にキャプション(明朝14px, `#e6dfd1`)、右にカウンター(`01 / 08` 形式, モノスペース11px)。
- **Controls**:
  - CLOSE ×: 右上外側 (top: -40px)
  - ‹ ›: 左右外側 (`--prev { left: -64px }`, `--next { right: -64px }`)、720px以下では画面内へ (`left: 0` / `right: 0`)。
  - キーボード: `Esc` → 閉じる / `←` → prev / `→` → next
- **Transitions**: `opacity .3s`, フォーカス時 `color: #fff`
- **Body scroll lock**: 開いている間 `document.body.style.overflow = 'hidden'`

---

### `#09 Before / After`

- **Purpose**: 同じ場所の2枚を左右比較する。祭りの「準備 → 本番」。
- **Layout**: `aspect-ratio: 16/9; overflow: hidden; cursor: ew-resize;`
- **Components**:
  - Before画像(`assets/09_street_day.jpg`)を絶対配置で敷き、上に After画像(`assets/10_street_night.jpg`) を `.ba__after` (`clip-path: inset(0 0 0 50%)`) で重ねる。
  - **Handle**: 縦2px の ivory バー、`box-shadow: 0 0 0 1px rgba(0,0,0,.2)`。
  - **Grip**: 44×44px の丸、中央に左右三角(6px)を before/after で。ドロップシャドウ `0 4px 24px rgba(0,0,0,.4)`。
  - **Labels**: 左「17 : 24」 / 右「20 : 41」。モノスペース10.5px、半透明黒バックの blur。
- **Interaction**: マウス / タッチどちらでも `mousedown/touchstart` で dragging=true、`window` の move で位置更新、`up/touchend` で解除。位置は 2%〜98% にクランプ。初期50%。

---

### `#10 Hotspots`

- **Purpose**: 一枚の写真に複数の「読み口」を置く。
- **Layout**: 820px以上で `grid-template-columns: 1fr 1fr; gap: 60px;`(左=写真、右=解説パネル)。それ未満で1カラム。
- **Stage**: `aspect-ratio: 3/4; max-width: 640px;` 内側 `object-fit: cover` で写真、その上に絶対配置のボタン(`.hotspot__pt`)を5個。
- **Point button**:
  - 28×28px、`translate(-50%, -50%)`(top/leftで位置指定)。
  - `::before`(内側白丸、scale .32 → hover/active で .55)
  - `::after`(外側白リング、`animation: pulse 2.4s ease-out infinite`, `.32` → `1.2` scale、opacity 0.6 → 0)
- **Panel (右カラム)**:
  - h3: 明朝24px, 500, ivory
  - p: `#c8bfb2`, 14.5px, line-height 1.9, max 44ch
  - hint: モノスペース10.5px, `#8a8177`, 「Detail — A of 5」
- **State**: クリックで `.is-active` を単一トグル、下記5データを差し替え。

#### Hotspot data
```json
{
  "a": {"title": "提灯", "body": "この祭りの空気を最も強く支配しているのは、頭上に連なる提灯の温かい光です。夜が近づくにつれて内側から灯りが漏れ、和紙の繊維までもがオレンジに透ける。"},
  "b": {"title": "法被", "body": "揃いの法被と鉢巻きは、担ぎ手や踊り手にとって「役割」を示す衣装です。背中の紋、襟元の色、袖の折り方に、その町会ごとの誇りが宿ります。"},
  "c": {"title": "手の形", "body": "盆踊りの所作では、指先の角度、手のひらの向き、肘の高さで意味が変わります。カメラを引くと集団の統一に、寄ると一人の指先の物語になる。"},
  "d": {"title": "足元",  "body": "下駄が石畳を打つ音、浴衣の裾のわずかな揺れ。祭りの音は上からではなく、いつも足元からやってきます。"},
  "e": {"title": "屋台",  "body": "湯気と油、金魚の水槽の光、綿飴の白。屋台は視覚だけでなく嗅覚と記憶を呼び覚ますディテールです。"}
}
```

#### Hotspot positions (画像内%)
| ID | top | left | label |
|---|---|---|---|
| a | 14% | 52% | 提灯 |
| b | 44% | 38% | 法被 |
| c | 32% | 70% | 手の形 |
| d | 82% | 44% | 足元 |
| e | 66% | 22% | 屋台 |

---

### `#11 Horizontal Scroll`

- **Purpose**: 縦スクロールを一度、横に折る。スマホ最適化。
- **Layout**:
  - Head部分は `.wrap` 内、トラックは全幅で `padding: 0 var(--gutter) 20px`。
  - `overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;`
  - スクロールバー非表示(`::-webkit-scrollbar { display: none }`, `scrollbar-width: none`)
- **Card**: `flex: 0 0 auto; width: clamp(240px, 58vw, 340px); scroll-snap-align: start;`
  - 画像 `aspect-ratio: 2/3; object-fit: cover;`
  - キャプション: モノスペース12.5px, `color: var(--ink-2)`

---

### `#12 Exhibition View` — オンライン写真展

- **Purpose**: Webを壁面に見立て、疑似写真展を作る。
- **Layout**:
  - `.wall`: 背景 `#e8e2d4`
  - `.wall__scene`: 「壁+床」の見立て、背景 `linear-gradient(180deg, #ddd5c5 0%, #cec4b0 55%, #b7ac96 55%, #a99e88 100%)` に上部内向きシャドウ `inset 0 40px 60px -20px rgba(0,0,0,.08)`
  - `.wall__grid`: `grid-template-columns: repeat(12, 1fr); gap: clamp(20px, 3vw, 40px); align-items: end; max-width: 1200px;`
- **Piece**:
  - `wall--a` = `grid-column: 1/span 5` (大)
  - `wall--b` = `6/span 3` (小・下寄せ)
  - `wall--c` = `9/span 4` (中)
- **画像**: `box-shadow: 0 24px 48px -18px rgba(0,0,0,.35), 0 4px 12px -4px rgba(0,0,0,.15);`(壁面に浮く額縁の陰)
- **Plaque (額縁下)**:
  - モノスペース10px大文字、色 `#6b6259`
  - タイトル `b` = 明朝13px, `#3a332d`, 500

---

### `#13 Recap` — 記事末

- **Purpose**: 試したパターンを一覧化し、記事タイプへの応用可能性を示す。
- **Layout**: `.close__list` は `border-top: 1px solid rgba(26,22,20,.15)` から始まる縦リスト。
- **Item**: `grid-template-columns: 70px 1fr auto; gap: 24px; padding: 22px 0; border-bottom: 1px solid rgba(26,22,20,.1);`
  - `close__num`: モノスペース11px, `letter-spacing: .2em`, `#a29a8f`
  - `close__name`: Noto Serif JP 17px, `#1a1614`, line-height 1.5
  - `close__use`: モノスペース10.5px大文字, `#6b6259`, 右寄せ
  - 640px以下で `1fr` × 2列 → useが下段に折り返し。
- **End**: 「祭 MATSURI / © 2026 Editorial Demo / End of story」を3カラムのフッターに。

---

## Interactions & Behavior

### Scroll-driven
1. **Progress bar**: 画面最上部 `2px` の固定バー。`scrollTop / (scrollHeight - clientHeight) * 100%` を `width` に。`transition: width .12s linear;` `dark` セクションでは白に切替。
2. **Section counter**: 右下固定ピル。`section[data-idx]` を全走査し、`getBoundingClientRect().top <= innerHeight * 0.4` を満たす最後のsectionを「カレント」とする。dataから `data-idx` (2桁ゼロパディング) と `data-name` を表示。`.dark` セクションに入ったら `.on-dark` クラスを付与し配色反転。
3. **Reveal-on-scroll**: `.reveal` を `IntersectionObserver({threshold: 0.12, rootMargin: '0px 0px -40px 0px'})` で監視、入ったら `.is-in` を付けて `opacity 0→1 / translateY 24px→0`、`transition: 1.2s cubic-bezier(.2,.6,.2,1)`。一度きり。`prefers-reduced-motion: reduce` で無効化。
4. **Hero parallax**: 上記 #01 参照。`translate3d(0, y*60px, 0) scale(1 + y*0.04)` (y = min(scrollY/vh, 1))。

すべての scroll ハンドラは 1つの `requestAnimationFrame` ループにまとめる(過剰レンダリング抑制)。

### Click-driven
- **Lightbox**: `[data-lb][data-cap]` を持つ画像 / セル / figure すべて。開閉時は `body { overflow: hidden }`。
- **Before/After slider**: マウス+タッチで水平ドラッグ。位置は px→% に変換、2〜98% にクランプ、`clip-path` と handle/grip の `left` を同期。
- **Hotspot**: 5個の点を単一選択トグル。パネル(h3 / p / hint)を差し替え。

### Keyboard
- Lightbox open時のみ:
  - `Esc` → 閉じる
  - `←` / `→` → prev / next(循環)

### Responsive breakpoints
- `820px`: Editorial 2カラム→1カラム、Hotspot 2カラム→1カラム、Grid 6col→4col、Wall 12col→2col
- `720px`: Fullwidth foot 3col→1col、Lightbox nav が画面内へ
- `640px`: Recap item 3col→2col

### Animation curves
- 標準イージング: `cubic-bezier(.2, .6, .2, 1)` (`ease-out`寄り)
- Reveal: `1.2s`
- Grid hover: `0.8s`
- Progress bar: `0.12s linear`
- Lightbox: `0.3s`
- Hero scroll indicator: `2.2s ease-in-out infinite`
- Hotspot pulse: `2.4s ease-out infinite`

---

## State Management

シングルページ、状態はすべてローカル(必要最小限)。フレームワーク実装時は下記のみで足ります。

- `scrollY` (derived) → progress width / current section index / hero transform
- `lbIndex: number` / `lbIsOpen: boolean` / `lbItems: {src, cap}[]` — Lightbox
- `baPositions: {[sliderId]: number}` — Before/After ハンドルの%位置(セクション複数化する場合)
- `activeHotspotId: 'a'|'b'|'c'|'d'|'e'` — Hotspot 選択中
- **データ取得は不要**(すべて静的コンテンツ)。将来的にCMS化する場合は、各セクション(#01〜#13)を1つのブロックコンポーネント + Payload(画像URL/キャプション/レイアウト種別)として設計。

---

## Design Tokens

### Colors
```css
--ivory:       #f5f1ea;   /* 主背景 (生成り) */
--ivory-2:     #ece5d7;   /* サブ背景 */
--paper:       #faf7f1;   /* Exhibit/BA 背景 */
--sumi:        #1a1614;   /* 主前景 / 暗背景 (墨黒) */
--sumi-2:      #2a2420;
--ink:         #3a332d;   /* 本文 */
--ink-2:       #6b6259;   /* サブテキスト */
--mute:        #a29a8f;   /* 説明・ラベル */
--lantern:     #c9986a;   /* アクセント (提灯色) */
--lantern-deep:#a67849;
```

Dark section 上のテキスト:
- Primary: `#f5f1ea` (ivory)
- Secondary body: `#c8bfb2`
- Caption: `#a89f92`
- Mono label: `#7a7166`

### Typography
```css
--serif: "Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif;   /* 見出し・キャプション */
--sans:  "Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif;      /* 本文 */
--mono:  "JetBrains Mono", "SF Mono", ui-monospace, monospace;          /* ラベル・数字 */
```

Weights: Noto Serif JP `300, 400, 500, 600` / Noto Sans JP `300, 400, 500, 600` / JetBrains Mono `400, 500`

Type scale (実測):
| 用途 | Family | Size | Weight | LH | Tracking |
|---|---|---|---|---|---|
| Hero title | serif | `clamp(38, 7vw, 84)px` | 500 | 1.15 | .01em |
| Hero sub | sans | 14px | 400 | 1.9 | .05em |
| Hero mark | serif | 14px | 400 | — | .3em |
| Section title | serif | `clamp(24, 3.2vw, 34)px` | 500 | 1.4 | .02em |
| Section lead | sans | 15px | 400 | 1.9 | — |
| Intro body | serif | `clamp(20, 2.6vw, 26)px` | 400 | 1.9 | .02em |
| Editorial h3 | serif | 22px | 500 | 1.5 | .02em |
| Editorial body | sans | 15px | 400 | 2.0 | — |
| Body drop cap | serif | 3.2em (first-letter) | — | .9 | — |
| Caption | sans | 12.5px | 400 | 1.7 | .02em |
| Story cap | serif | 15px | 400 | 1.7 | — |
| Pattern tag | mono | 10.5px | 500 | — | .2em, uppercase |
| Meta / Kicker | mono | 10.5px | 400 | 1.9 | .2〜.25em, uppercase |
| Counter | mono | 11px | 500 | — | .15em |

### Spacing
```css
--gutter: clamp(20px, 5vw, 64px);
--max:    1240px;              /* .wrap max-width */
                               /* .wrap-narrow max-width: 720px */
```
Section vertical padding: `clamp(80px, 12vw, 140px)` (通常) / `clamp(100px, 14vw, 180px)` (intro / close 増量)。

Section-header 下余白: `clamp(40px, 6vw, 72px)`
Pattern-tag 下余白: `28px`

### Radius / Shadow / Border
- ほとんどのカードは **radius 0**(額縁感)。Counter・Lightbox stage も角丸なし。
- ハンドル(BA grip): `border-radius: 50%; box-shadow: 0 4px 24px rgba(0,0,0,.4);`
- Wall piece 額縁: `box-shadow: 0 24px 48px -18px rgba(0,0,0,.35), 0 4px 12px -4px rgba(0,0,0,.15);`
- Counter枠: `border: 1px solid rgba(26,22,20,.08); backdrop-filter: blur(8px);`
- 区切り線 (Recap list): `1px solid rgba(26,22,20, .1〜.15)`

### Ratios
| 用途 | ratio |
|---|---|
| Hero | 100svh (min 600px) |
| Full-bleed | height `min(90svh, 820px)` |
| BA slider | 16/9 |
| Hotspot stage | 3/4 |
| Grid cells | 3/2 / 1/1 / 2/1 / 3/4 の組み合わせ |
| Hscroll card | 2/3 |
| Sticky editorial image | 2/3 |
| Editorial inset image | 3/2 |

---

## Assets

すべて **AI生成のダミー写真**(fal-ai/bytedance/seedream/v5/pro, 2K, 昭和ノスタルジック・彩度低め・フィルム調で統一プロンプト)です。**本番では実撮影に置き換える前提**でお願いします。ライセンス・肖像権の観点で必ず差し替えてください。

| ファイル | 用途 | 比率 |
|---|---|---|
| `assets/01_hero_lanterns.jpg` | #01 Hero | 16:9 |
| `assets/02_bonodori_wide.jpg` | #03 Full-bleed | 16:9 |
| `assets/03_yukata_portrait.jpg` | #04 Exhibit Ⅰ / #11 Hscroll / #12 Wall-b | 2:3 |
| `assets/04_yatai_steam.jpg` | #05 Editorial inset | 3:2 |
| `assets/05_geta_feet.jpg` | #07 Grid D-02 | 1:1 |
| `assets/06_uchiwa_hand.jpg` | #07 Grid D-01 | 1:1 |
| `assets/07_lantern_single.jpg` | #04 Exhibit Ⅱ / #07 Grid D-05 / #12 Wall-c | 3:4 |
| `assets/08_obi_detail.jpg` | #07 Grid D-03 | 1:1 |
| `assets/09_street_day.jpg` | #09 Before | 16:9 |
| `assets/10_street_night.jpg` | #09 After | 16:9 |
| `assets/11_taiko_drummer.jpg` | #05 Editorial sticky / #10 Hotspot / #11 Hscroll | 3:4 |
| `assets/12_elder_woman.jpg` | #06 Story 01 / #11 Hscroll | 2:3 |
| `assets/13_child_candy.jpg` | #06 Story 03 / #11 Hscroll | 2:3 |
| `assets/14_mikoshi.jpg` | #06 Story 02 | 3:2 |
| `assets/15_couple_back.jpg` | #06 Story 04 | 3:2 |
| `assets/16_goldfish.jpg` | #07 Grid D-04 | 3:2 |
| `assets/17_fireworks.jpg` | #12 Wall-a | 16:9 |
| `assets/18_bridge_silhouette.jpg` | #04 Exhibit Ⅲ / #07 Grid D-07 / #11 Hscroll | 2:3 |
| `assets/19_flute_player.jpg` | #07 Grid D-06 / #11 Hscroll | 2:3 |

### External resources
- Google Fonts: `Noto Sans JP` / `Noto Serif JP` / `JetBrains Mono` — Preconnect付きで `<head>` に読み込み済み。
- アイコン類なし(すべてUnicodeまたは inline SVG < 10 lines)。

---

## Files

このバンドル内:

- `README.md` — 本ドキュメント
- `index.html` — マークアップ(全13セクション + Lightbox)
- `styles.css` — 全スタイル(セクション別コメント付き)
- `script.js` — インタラクション(Progress / Reveal / Parallax / Lightbox / BA / Hotspot)

### 実装時の推奨コンポーネント分割 (React例)

```
<PhotoShowcase>
  ├─ <ProgressBar />                    // scrollY購読
  ├─ <SectionCounter items={sections}/>  // IntersectionObserver
  ├─ <HeroSection />
  ├─ <IntroSection />
  ├─ <FullBleedSection />
  ├─ <ExhibitSection items={[]} />       // whitespaceのカードリスト
  ├─ <EditorialSection stickyImg body />
  ├─ <PhotoStorySection frames={[]}/>    // dark theme
  ├─ <GridGallerySection cells={[]} />   // + Lightboxトリガ
  ├─ <BeforeAfterSection before after labels />
  ├─ <HotspotsSection img points={[]} data={{}}/>
  ├─ <HorizontalScrollSection cards={[]}/>
  ├─ <ExhibitionWallSection pieces={[]}/>
  ├─ <RecapSection items={[]}/>
  └─ <Lightbox portal />                 // グローバル、data-lb をイベント委譲で拾う
```

`<Lightbox>` は Portal + Context で提供し、下位コンポーネントが `useLightbox().open(src, cap)` で呼び出す設計を推奨。

### アクセシビリティ・チェックリスト
- [ ] `<img alt>` はすべて意味のあるテキストで(装飾なら空文字)
- [ ] Lightbox: `role="dialog" aria-modal="true"`、開いた時に focus trap、閉じたら opener に focus 復帰
- [ ] Hotspot ボタン: `aria-label` + `aria-pressed`(現状は `.is-active` のみ)
- [ ] Before/After スライダー: `role="slider" aria-valuenow/min/max` + キーボード操作(←→で1%移動)
- [ ] Reveal-on-scroll: `prefers-reduced-motion: reduce` 対応済み(継承推奨)
- [ ] コントラスト: 暗背景上の `#c8bfb2` は本文サイズでAA通過、`#7a7166` はラベル(large / 補助)専用

### パフォーマンス・ノート
- 画像19枚 × 2K → 実本番では responsive `<img srcset>` + WebP/AVIFで **各300KB以下**を目安に。
- Hero・全幅・Wall・Editorial sticky に `loading="eager"`、それ以外は `loading="lazy" decoding="async"`。
- スクロールハンドラは1つの rAF ループにマージ(実装済みパターン踏襲)。
- Google Fonts は preconnect + `display=swap`。CLS回避のため `font-size-adjust` の適用も検討。
