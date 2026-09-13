## Area / Biomeの方向性

Wayfaringでは、現実世界の地理情報をそのまま表示するのではなく、**現実世界の構造をゲーム世界へ翻訳する**ことを基本方針とする。

Area / Biomeは、単なる見た目やBGM差分ではなく、

- 探索
- Loot
- 敵
- イベント
- Skill Tree
- Area Progression

などに影響する、ゲーム世界の基盤として扱いたい。

---

## 1. AreaとBiomeは別概念として扱う

### Area
「どこにいるか」を表す地理的な単位。

OpenStreetMap等のフリー地図情報を利用し、

- 行政境界
- place境界
- town / suburb / quarter / neighbourhood
- その他、利用可能な区域情報

などから定義する。

Areaは基本的に、

**現実世界に存在する“名前のある地域”**

を表す。

例：

- 清原
- ゆいの杜
- ○○町
- ○○地区

など。

ただし、OSM上ですべての地域に明確なpolygon境界が存在するとは限らないため、

- 明示的なboundaryがある場合はそれを利用
- ない場合は上位行政区域を利用
- place nodeしかない場合は必要に応じてゲーム側で補完

など、フォールバック可能な設計にする。

---

### Biome
「そのAreaがゲーム上どのような性格を持つか」を表す。

BiomeはOSMの土地利用・自然・POI等から推定する。

利用候補としては、

- `landuse=residential`
- `landuse=industrial`
- `landuse=commercial`
- `landuse=retail`
- `landuse=farmland`
- `natural=wood`
- `natural=water`
- `natural=wetland`
- `waterway=river`
- `leisure=park`
- その他周辺POI

など。

例：

- Residential
- Industrial
- Commercial
- Rural
- Forest
- Riverside
- Coastal
- Green / Park

など。

Biomeは現実の地理分類を厳密に再現することを目的とせず、

**ゲーム用の意味付けを行うための推定値**

として扱う。

---

## 2. Biomeは単一カテゴリではなくProfileとして持てるようにする

Areaを必ず1つのBiomeだけに分類する必要はない。

内部的には、

- Industrial 0.55
- Riverside 0.30
- Residential 0.20

のような複数属性を持つBiome Profileとして扱えるようにする。

UI上ではPrimary Biomeのみ表示してもよい。

例：

`KIYOHARA — INDUSTRIAL`

ただしLoot・Enemy・Event等の抽選には、Secondary属性も反映できるようにする。

これにより、

「工業地帯だが川沿いでもある」

といった現実世界の複雑さを、そのままゲーム上の個性として利用できる。

---

## 3. Area / Biomeはゲームシステムへ影響させる

Area / BiomeはBGM変更だけで終わらせない。

少なくとも将来的には、

- Loot Table
- Enemy Type
- Event
- Signal / 気配
- Skill Nodeの傾向
- コンテナカテゴリ

などに影響する設計としたい。

例：

Industrial Area
- Machine系Enemyが多い
- Circuit / Metal系Lootが出やすい
- Scanner / Cargo系Skill Nodeが出やすい

Riverside Area
- Water系Loot
- 特殊Signal
- Scenic Event
- 特定Rare Item

Forest Area
- 情報精度が低い
- Rare Encounter率が高い
- 生物系Loot

など。

ただし、Stake倍率やBUST率等の既存コアループまで強くArea依存にするとルールが複雑になるため、慎重に扱う。

---

## 4. Area境界を越えること自体をゲームイベントにする

新しいAreaへ初めて入った瞬間は、

**探索上の明確な成果**

として扱いたい。

例えば、

`NEW AREA DISCOVERED`

などの演出を入れる。

初発見時には、

- Skill Point
- Point Reward
- Area Codex解放
- Biome情報解放
- BGM登録
- Area固有Loot Table解放

などを付与できる。

つまり、

**未知のAreaへ入ること自体が報酬になる**

構造を作る。

これによって、プレイヤーが既知エリアだけを周回するのではなく、新しい方向へ進む動機を作る。

---

## 5. Area単位のProgressionを持たせる

Areaは単に「発見済み / 未発見」だけでなく、

探索度やSkill Tree進行度を持たせたい。

例えば以下のような段階を検討する。

### DISCOVERED
初めてAreaへ進入。

### SURVEYED / EXPLORED
Area内の一定割合の道路を探索。

### DEVELOPED
Area内のSkill Nodeを一定割合解放。

### MASTERED
探索とSkill Treeの両方で高い進行度を達成。

各段階に、

- Skill Point
- Loot Bonus
- Signal精度向上
- Area Passive
- 特殊コンテナ
- BGM変化
- Rare Event

などを紐づけられる。

これによって、

「新しいAreaを次々発見するプレイ」

と、

「好きなAreaを徹底的に育てるプレイ」

の両方を成立させたい。

---

## 6. 100%探索を要求しない

OSMには細街路・サービス道路・袋小路等が大量に存在するため、

「Area内の全道路を100%走破」

を必須条件にすると、探索体験が作業化する可能性が高い。

そのため、

- ゲーム対象Linkを選別
- 走破距離ベースで算出
- 20% / 50% / 80%等の段階評価
- 80%程度で実質コンプリート

などを検討する。

目的は、

**地図を塗りつぶす作業**

ではなく、

**その地域を十分に探索した感覚**

を与えること。

---

## 7. 現実世界をそのまま表示するのではなく、ゲーム世界へ翻訳する

重要な思想として、

**地理的事実は現実世界に従い、その意味付けはゲーム世界が行う。**

例えば現実世界で、

- 工業団地
- 川
- 森
- 神社
- 商店街
- 山間部

などが存在する場合、その事実自体はゲームへ反映する。

ただしゲーム上では、

「工業団地です」

とそのまま表現する必要はない。

世界観に応じて、

Industrial
→ Machine Sector / Foundry Zone

Riverside
→ Blue Current / Water Sector

Forest
→ Bio Zone / Overgrown Region

Shrine
→ Ancient Signal / Relic Site

などへ翻訳する。

つまり、

**現実世界の構造を素材にしながら、ゲーム世界として再解釈する。**

---

## 8. Reality LayerとGame World Layerを分離する

今の段階では世界観を固定しない。

そのため内部設計として、

### Reality Layer
- Road
- Intersection
- OSM Landuse
- POI
- Boundary

### Game Geography Layer
- Link
- Node
- Area
- Biome Profile

### Game World Layer
- Sector / Region名称
- Enemy
- Loot
- BGM
- Event
- World-specific表現

という形で分離する。

例えば内部Biomeが、

`industrial`

でも、

宇宙世界なら
`Foundry Sector`

ファンタジーなら
`Iron Dominion`

ポストアポカリプスなら
`Factory Ruins`

と翻訳できるようにする。

これにより、Biome判定ロジックを先に実装しても、後から世界観を変更可能にする。

---

## 最重要の設計原則

Area / Biomeは、

**現実世界を忠実にコピーするための仕組みではない。**

現実世界の地理・土地利用・自然・施設を材料にして、

**「この場所だから、このゲーム体験になる」**

という意味を作るための仕組みとする。

最終的には、

現実のAreaへ入る  
→ ゲーム上のRegionとして発見  
→ BiomeによってBGM・Loot・Enemy・Eventが変化  
→ Mapping / Skill Treeが進行  
→ Areaをさらに探索・Masteryしたくなる

という循環を作ることを目指す。