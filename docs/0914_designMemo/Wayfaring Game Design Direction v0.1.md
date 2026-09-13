# Wayfaring Game Design Direction v0.1

## 0. この文書の目的

この文書は、Wayfaringの現時点におけるゲームデザイン方針を整理したもの。

完成仕様ではなく、

- 何を面白さの中心にするか
- 各ゲームシステムをどう接続したいか
- 実車で遊ぶゲームとして何を優先するか
- 今後何をプロトタイプし、検証するか

を共有することを目的とする。

数値バランスや最終的な世界観はまだ固定しない。

まずは、この方向性に沿って実装・実車検証を進め、触った結果からゲームシステムを磨いていく。

---

# 1. ゲームの基本思想

Wayfaringの中心に置きたいのは、

**「知らない道へ行く理由を、ゲームが作ること」**

である。

一般的なナビゲーションでは、

目的地を決め、
最適な経路を提示し、
その通りに移動する。

Wayfaringでは逆に、

- 何かありそう
- この道は倍率が高い
- 未探索だから行ってみたい
- 新しいSkill Nodeがありそう
- Quest条件を満たせそう
- Rareな気配がある

といったゲーム上の動機によって、

**本来なら選ばなかった道を選びたくなる**

ことを狙う。

その結果、

ゲーム上の選択によって現実世界で知らなかった場所へ到達する、

という体験を作りたい。

---

# 2. 基本ゲームループ

全体としては、

**出発準備**
→ **走行・探索**
→ **帰還・精算**
→ **成長**
→ **次の出発**

というループを基本とする。

## 出発準備

出発前に、

- Trip Mode
- Loadout
- Cargo
- Scanner
- Consumable
- Quest
- 必要に応じてVehicle / Party / Equipment

などを確認・調整する。

Presetを呼び出し、そのまま出発することもできる。

Loadoutに応じてDeployment Costを支払う。

---

## 走行・探索

走行中は、

- 距離によるStake蓄積
- 分岐選択
- Roulette
- Mapping
- Area発見
- Skill Node発見
- Container / Loot取得
- Quest進行
- 将来的なEncounter / Auto Battle

などが進行する。

ただし、運転中に細かな操作を要求しないことを最優先とする。

---

## 帰還・精算

Trip終了後に、

- 獲得Money
- Deployment Cost
- Trip損益
- Mapping成果
- Area進行
- Container
- Haul
- Loot
- Quest
- Skill Point

などをまとめて確認する。

必要に応じて、

- 鑑定
- Cargo整理
- 売却
- 納品
- Craft
- Skill解放
- Base強化

を行う。

---

# 3. Trip Mode

現時点では、以下の3種類を基本候補とする。

## A to B

通勤・通学・送迎・買い物など、

**目的地や経路が現実側ですでに決まっている移動**

にゲームを重ねるモード。

思想としては、

**「ゲームが現実の移動を邪魔しない」**

ことを重視する。

### 基本特徴

- Mappingは有効
- Area Discoveryは有効
- Skill Node Discoveryは有効
- Container / Lootは取得可能
- Quest条件を満たせば普通に進行
- Moneyも獲得可能
- StakeはPassive化
- BUST / Rouletteなど、経路変更を促す強い仕組みは抑制
- Active Encounterは原則行わない候補

A to Bだからといって、ゲーム世界を別物にはしない。

同じ世界を探索しているが、

**ゲーム側がプレイヤーの進路へ介入しないモード**

と考える。

### Money

Moneyは得られる。

ただし、

- 期待値は低い
- 振れ幅も小さい
- 安定収入寄り

とする。

通常の移動でも少しずつ資産が増える一方、

A to Bだけが最高効率にならないようにする。

---

## Expedition

**ゲームを遊ぶこと自体を目的に出発するモード。**

Wayfaringのコアゲームシステムを最も強く体験するモードとする。

### 有効にしたいもの

- Stake
- BUST
- Roulette
- Signal / 気配
- Mapping
- Skill Node探索
- Area探索
- Quest
- Container / Loot
- 高報酬機会
- 将来的なEncounter / Battle

ゲーム側の情報によって、

**実際にどの道へ進むかを変えること**

を積極的に楽しむ。

想定としては数時間単位。

面白ければ半日程度遊び続けられることも許容する。

---

## Road Trip

数日間の旅行・長距離移動を対象とする。

基本GameplayはExpeditionに近い。

Road Tripだけ別ゲームにするのではなく、

**Expeditionを複数日継続可能にする運用モード**

として扱う。

### 特徴

- 数日継続
- 多数のAreaを跨ぐ
- Haulが大量になる
- Homeへ戻らない
- Day 1 / Day 2など日単位で中間整理可能
- Field Extraction等の途中精算手段を利用可能

ホテル等でHaul整理を行っても、

Trip全体としては継続可能にする。

---

# 4. Trip Preset / Loadout

各Modeには標準Presetを持たせる。

例えば、

- A to B Basic
- Scout Expedition
- Gambler Expedition
- Collector Expedition
- Road Trip

など。

Presetには、

- Cargo
- Scanner
- Consumable
- Equipment
- 将来的なParty / Vehicle設定

などを含める。

プレイヤーはPresetをベースに自由に変更できる。

また、自分専用のPresetを保存可能にしたい。

例：

- My Commute
- Weekend Scout
- Long Trip
- Loot Run

---

# 5. Deployment Cost

Trip開始時には、

**装備・機材・Consumable等に応じた運用コスト**

を支払う。

目的は、

「走っていれば必ず資産が増える」

だけの構造から、

**「今回のTripには投資しているので、成果を持ち帰りたい」**

という感覚を生むこと。

## 基本思想

高性能LoadoutほどDeployment Costが高い。

例えば、

- Large Cargo
- 高性能Scanner
- Booster
- Insurance
- Consumable
- 将来的なUnit / Equipment

を多く積むほど出撃コストが上昇する。

ただし、所有している装備そのものを毎回買い直すわけではない。

装備購入価格と、

**Tripごとの運用費**

は分離する。

---

## A to B

A to Bは基本的に安価、またはほぼ無料にする。

日常移動で、

「ゲームを起動すると損をする」

状態は避ける。

---

## Expedition

標準構成であれば長期的には黒字になる設計を基本とする。

ただし高級機材を大量投入すると、

高い成果を得なければ赤字になる。

これにより、

**今日は軽装で行く**
**今日は勝負する**

という出発前判断を作る。

---

## Trip収支

帰還時には、

Deployment Costと獲得成果を比較し、

Trip単位の損益を表示したい。

例：

Deployment Cost  
-2,500

Stake Income  
+3,800

Quest Reward  
+1,500

Loot Sale  
+2,100

Net Profit  
+4,900

「今日は稼げた」
「今日は赤字だった」

という感覚を明確にする。

---

# 6. Money

距離を直接Moneyへ変換するのではなく、

**距離はStakeの原資を生むもの**

として扱う。

実際のMoney獲得量は、

- Bank
- Carry
- Roulette
- BUST
- Quest
- Loot
- その他成果

によって変動する。

つまり、

**走行距離 = 投入時間**

**Money = プレイ結果**

とする。

Moneyは汎用ゲーム内通貨として利用する。

用途候補：

- Base施設強化
- Vehicle / Vehicle Parts
- Equipment
- Consumable
- Craft
- Scanner
- Cargo
- Character Equipment
- その他サービス

---

# 7. Stake

Stakeは現行ゲームの短期的なリスク／リターンの中心。

Expeditionでは、

- 走行距離でStake蓄積
- 安全に精算
- 持ち越して倍率上昇
- Rouletteで上振れ
- BUSTで損失

というPush Your Luckを維持する。

A to Bでは、

- Stakeは裏でPassiveに蓄積
- BUSTなし
- Rouletteなし
- 到着時や一定条件で自動精算

などの方式を基本候補とする。

---

# 8. Loot / Container / Cargo

運転中に、

「拾う / 拾わない」

を細かく判断させない。

そのためContainer / Lootは基本的に自動取得する。

ただし、

Cargo Capacityが埋まったことで、

「これ以上遊べない」

状態は避ける。

## CargoとHaul

概念として、

**Cargo**
と
**Haul / Overflow**

を分ける。

### Cargo

確実に保持できる容量。

### Haul

Trip中に一時的に取得した探索成果。

Cargoが満杯でもHaulには引き続き取得可能。

つまり、

**Cargo Capacityは探索可能距離を制限しない。**

---

## 帰還時

Trip終了後、

Haulを鑑定・整理し、

Cargo Capacity分を正式に確保する。

残りは、

- 素材化
- Money化
- 自動売却
- Quest納品
- その他変換

などを行える。

---

## 自動選別

将来的には、

- Rare優先
- 未取得優先
- 特定カテゴリ優先
- Common重複は素材化

などのCollection Policyも検討する。

---

## 未鑑定Container

走行中に完成アイテムではなく、

- Unknown Container
- Rare Signal
- Industrial Container
- Artifact

等として取得し、

帰還後に鑑定する仕組みも有力。

---

# 9. Lootの用途

Lootは単なるCollectionにしない。

用途候補：

- Equipment
- Craft素材
- Skill強化素材
- Base建設素材
- Quest Item
- 売却
- Scanner / Cargo関連
- Auto Battleを採用する場合はUnit / Equipment

同じRare素材について、

「売るか」
「Baseに使うか」
「Questへ納品するか」

という判断を作れると良い。

---

# 10. Road Graph / Mapping / Skill Graph

この3つは同じものではない。

## Road Graph

現実道路を正しく扱う基盤。

基本的に必要な全交差点・道路を保持する。

---

## Exploration Map

プレイヤーが実際に走った道路を記録する。

細い道路や小交差点も探索履歴として保持する。

ただし内部データと表示密度は分ける。

ズームアウト時には簡略化可能。

---

## Skill Graph

Road Graphから、

**一部の重要地点だけを抽出した疎なゲーム用グラフ**

とする。

すべての交差点をSkill Nodeにはしない。

理由：

- Nodeが多すぎる
- 発見価値が薄れる
- UIが過密になる
- 成長判断が煩雑になる

Skill Node候補は、

- 信号交差点
- 大きな分岐
- 幹線道路交差
- 長いLink終端
- Area境界
- POI
- その他特徴地点

などを用い、

Importance Score的に抽出する方式を検討する。

Node同士の最低距離も必要。

---

# 11. Skill Tree

Skill Treeは最初から完成形を見せない。

**探索によってSkill Treeそのものを発見する**

構造にしたい。

例えば、

未探索  
→ Nodeの存在不明

接近  
→ 「何かある」

到達  
→ Skill Node発見

解析  
→ Scanner / Cargo / Roulette / Mapping等の系統判明

Skill Point投入  
→ Skill取得

という流れ。

Skill Pointは、

同じNodeを何度も周回して稼ぐのではなく、

- 新規Node
- 新規Link
- Area Discovery
- Mapping
- Stake
- Quest
- その他探索実績

などから得るグローバル資源とする方向。

現地へ行くことは、

**Skillを発見・解放可能にする条件**

とする。

---

# 12. Area / Biome

## Area

現実世界の地域単位。

OSM等から、

- 行政境界
- place
- town
- suburb
- neighbourhood
- その他区域情報

を用いて定義する。

---

## Biome

Areaのゲーム上の性格。

OSMの、

- landuse
- natural
- waterway
- leisure
- POI
- その他周辺情報

から推定する。

Biomeは厳密な地理分類ではなく、

**ゲーム用の意味付けのための推定**

とする。

---

## Biome Profile

単一Biomeだけではなく、

複数属性を持てるようにする。

例：

Industrial 0.55  
Riverside 0.30  
Residential 0.20

表示上はPrimaryのみでもよい。

Loot / Enemy / Event等にはSecondaryも反映可能にする。

---

# 13. Area Progression

Areaは、

発見済み / 未発見

だけではなくProgressionを持つ。

例：

DISCOVERED  
→ 初進入

SURVEYED / EXPLORED  
→ Mapping進行

DEVELOPED  
→ Skill Node解放

MASTERED  
→ MappingとSkillの両方で高進行

報酬候補：

- Skill Point
- Loot Bonus
- Signal精度
- Area Passive
- 特殊Container
- BGM変化
- Rare Event

ただし、

Area内道路100%走破

は要求しない。

20% / 50% / 80%等の段階評価を基本候補とする。

---

# 14. 現実世界とゲーム世界の関係

基本思想は、

**地理的事実は現実に従い、その意味付けをゲームが行う。**

例えば、

現実：
工業地帯

内部Biome：
Industrial

ゲーム世界：
Machine Sector / Factory Ruins / Iron Dominion

のように翻訳する。

つまり、

現実世界をそのまま表示するのでも、
完全なランダム世界にするのでもなく、

**現実世界を材料としてゲーム世界へSemantic Translationする。**

これによって、

「この場所だからこのゲーム体験になる」

状態を作りたい。

---

# 15. Quest

QuestはModeごとに完全分離しない。

同じQuest Systemを共有し、

条件の性質によって、

A to B向き
Expedition向き

が自然に分かれる形を目指す。

例：

A to Bでも進行可能：

- 特定Areaへ行く
- 一定距離走る
- Containerを取得
- Mappingを進める

Expedition向き：

- Roulette成功
- 未踏方向へ進む
- 高StakeをBank
- 特定Signalを追う
- 将来的なEncounter

A to BだからQuest無効、

という設計は避ける。

---

# 16. Base

BaseはMoneyとLootを再投資する長期成長の中心候補。

施設例：

Garage  
→ Loadout / Vehicle

Workshop  
→ Craft

Storage  
→ 保管能力

Scanner Room  
→ Signal / Scanner強化

Cartography Room  
→ Mapping関連

Research Lab  
→ Skill Node解析

Trading Post  
→ 売却 / Quest納品

Baseを育てることで、

**次のTripの遊び方が増える**

ようにしたい。

---

# 17. Consumable

ConsumableはTripごとの準備や経済に使う。

候補：

- Scanner Charge
- Field Extraction
- Insurance
- Boost
- Repair
- Container Stabilizer
- Emergency Bank

ただし、

Consumableが切れたことでゲーム自体が遊べなくなる状態は避ける。

基本的には、

- 情報量低下
- ボーナス減少
- リスク増加

等のSoft Failとする。

---

# 18. 帰還 / Extraction

通常は、

**Homeへ戻ること**

をFull Returnとする。

Home Return時に、

- Trip終了
- Haul整理
- Quest
- Skill
- Base
- Money
- Craft

等を利用可能にする。

ただしRoad Tripや長距離移動では、

Homeに戻れないため、

**Field Extraction**

等の救済手段を設ける。

Field Extractionでは、

- Haul整理
- Cargo確定
- 一部Quest処理

などを行える。

Expedition自体は継続可能。

---

# 19. Auto Battle / Encounter

現時点では未決。

Auto Battleには、

- Character
- Party
- Role
- Equipment
- Formation
- Unit育成

など、ゲーム体験を豊かにする大きな可能性がある。

一方で、

運転中に画面を注視できないため、

**Battleが本当に体験として成立するか**

が最大の懸念。

そのため、現時点ではBattle Systemを本実装するのではなく、

まず、

**Link上で時間経過するEncounter Prototype**

を試す。

例：

Link進入  
→ 音声で敵性反応

走行中  
→ 簡単な戦況通知

次交差点付近  
→ 勝敗・Loot通知

これを実車で触り、

冒険感・緊張感が成立するか確認する。

成立しない場合、

Battleを削除するか、
より抽象的なEncounterへ変更する。

---

# 20. 世界観

現段階では固定しない。

SF、宇宙探索、ポストアポカリプス、ファンタジー等、

複数の世界観を適用可能な設計にしておく。

内部ロジックでは、

- Industrial
- Riverside
- Node
- Link
- Area
- Loot
- Scanner

等の世界観非依存概念を使う。

世界観は、

ゲームシステムを実際に触り、

最も自然にそれらを説明できるものを後から選ぶ。

---

# 21. 設計上の重要原則

## 1. 探索を止めない

ゲーム側の資源枯渇によって、

現実のドライブ中に遊べなくなる状態を避ける。

---

## 2. Hard FailよりSoft Fail

失敗した結果、

プレイ不能になるのではなく、

- 情報量が減る
- 効率が落ちる
- ボーナスを逃す
- 別の遊び方になる

方向を重視する。

---

## 3. 「失う」より「取り逃す」

永久資産を頻繁に奪うより、

選ばなかった道に何があったか分からない、

という機会損失をゲーム上の緊張として利用する。

---

## 4. 同じ場所の効率周回を最適解にしない

Wayfaringの中心は未知への探索。

同じ地点を何度も周回する方が効率的、

という設計は極力避ける。

---

## 5. 運転中の操作を増やさない

ゲームシステムが増えても、

交差点での運転者の操作量は増やしすぎない。

追加システムは、

既存の道選択に意味を重ねる方向を優先する。

---

# 22. 現時点のゲーム構造

Wayfaringは、

**現実の道路を探索するゲーム**

を中心に、

### 短期ループ
Stake / Roulette / 分岐判断

### 中期ループ
Trip / Loot / Quest / Money / Deployment Cost

### 長期ループ
Mapping / Skill Tree / Area Progression / Base / Equipment

が重なる構造を目指す。

最終的には、

**現実世界を走る**
→ **新しい世界を発見する**
→ **資産を持ち帰る**
→ **自分の探索能力を育てる**
→ **さらに知らない道へ行きたくなる**

という循環を作る。

---

# 23. 今後の優先検証事項

すべてを一度に完成させるのではなく、

まず触って面白いか確認する。

優先候補：

1. A to B / ExpeditionのMode差
2. Deployment CostとTrip損益
3. Trip開始画面 / Loadout Preset
4. Mapping / Skill Graphの分離
5. Area Discovery / Area Progression
6. Haul / Cargo / 帰還後整理
7. Loot用途
8. Quest
9. Base
10. Encounter Prototype
11. 世界観

特にAuto Battleは、本格実装前に小さなPrototypeで成立性を検証する。

---

# 24. 現時点での未決事項

以下はまだ固定しない。

- 世界観
- Auto Battle採用可否
- Skill Tree具体能力
- Base施設の最終構成
- Equipment能力
- Consumable種類
- Quest生成方式
- Moneyバランス
- Deployment Cost数値
- Area Mastery報酬
- Biomeごとの詳細効果
- Encounter設計
- Character / Party導入可否

これらは、実装して触りながら決めていく。