# 东方风味手记 · 图片素材

本次使用内置 `image_gen` 工具生成场景素材，未使用 API/CLI。生成的 PNG 已转为 WebP 并存入本项目。图片只承担场景与器具示意；标题、导航、参数、图鉴内容和互动控件均为真实 HTML，地球仍由 Globe.GL 实时绘制。

## 文件清单

| 文件（相对项目根目录） | 内容 |
| --- | --- |
| `public/images/brew-pour-over.webp` | 青瓷滤杯、滤纸、玻璃分享壶与注水细流 |
| `public/images/brew-french-press.webp` | 玻璃法压壶 |
| `public/images/brew-moka.webp` | 八角金属摩卡壶 |
| `public/images/brew-aeropress.webp` | 置于杯上的活塞式咖啡冲煮器 |
| `public/images/brew-cold-brew.webp` | 玻璃冷萃器具与咖啡 |
| `public/images/brew-espresso.webp` | 意式浓缩器具场景 |
| `public/images/studio.webp` | 空的石材台面、柔光窗景与远山，用于地球背景 |

保存目录：项目内的 `public/images/`。

## 器具场景共用提示词

参考图仅用作色调与摄影风格参考，生成任务为独立素材，不是网页截图。以下共用提示词末尾分别接入上表对应器具描述。

```text
Use case: photorealistic-natural / website asset. Generate a standalone photographic HERO BACKGROUND ASSET, not a UI mockup. Landscape 1536x1024-like aspect ratio. The supplied reference is ONLY a photographic style and color reference. Remove ALL UI, text, numbers, navigation, logos, labels and watermarks. Output a beautiful unbranded photographic still life of the specified coffee equipment. Maintain an accurate recognizable functional object. Editorial studio photography inspired by refined Chinese ceramics and quiet coffee craftsmanship: warm porcelain-ivory #f3f1e9 and pale celadon green, dark clear amber coffee, subtly honed creamy limestone counter, soft natural morning light from upper right, a pale plaster wall and very faint misty distant mountains seen through a softly defocused window to the right. Photorealistic glass refraction, subtle condensation where appropriate, real rich material detail. Place the entire subject in the RIGHT HALF, object occupying x=55–90% and y=15–82%, with the base fully inside the image. Keep the LEFT 45% almost entirely empty warm ivory blank wall with no distracting shadows, leaves or objects, because real HTML text will overlay there. The bottom 18% is a quiet horizontal pale stone surface. Palette must match all other photographs in this series. No extra props, no hands, no foliage, no tea equipment, no historical Chinese ornaments, no flowers, no coffee beans scattered around, no typography of ANY kind. NO embedded website or screenshot. Subject:
```

各张图的主体要求：

- 手冲：青瓷锥形滤杯、滤纸与玻璃分享壶，细流注水，保持真实器具结构。
- 法压：透明玻璃法压壶、压杆与金属滤网，深琥珀色咖啡。
- 摩卡：可辨识的八角金属摩卡壶，保留上下壶结构、壶嘴与手柄。
- 爱乐压：无品牌活塞式圆筒冲煮器，垂直置于陶瓷杯上。
- 冷萃：玻璃冷萃器具与深色咖啡，安静的自然晨光。
- 意式：意式浓缩咖啡器具、浓缩与青瓷材质，延续相同的摄影环境。

## 空场景提示词

```text
Use case: photorealistic-natural / website asset. Generate a standalone empty studio background, not a UI mockup. Pale creamy limestone counter occupying the bottom 23%, warm ivory plaster wall on the left 45%, soft natural light, a softly blurred window with very faint misty distant mountains on the right. Refined celadon and porcelain-ivory palette matching the coffee equipment photographs. No coffee equipment, no globe, no objects, no people, no text, no logos, no UI. Keep the left area quiet and empty for real HTML content and the right area suitable for a live 3D globe overlay.
```
