# 无杯壁成分造型与场景背景

生成方式：内置 image_gen。日期：2026-11-02。

用户随后撤回悬浮成分方向，选择保留实体杯与剖面展示，另做杯型候选样片。本文件保留探索记录；网页未接入这些参考图作为模型。

## 背景

文件：`public/images/studio/celadon-limestone.jpg`

用于经典咖啡及 DIY 成品展示；二维降级也沿用图片背景。来自生成 PNG 的 JPEG 格式转换。

提示词：

Use case: photorealistic-natural.
Asset type: empty scene background for a coffee education web site's interactive 3D ingredient display; landscape 3:2, 1536x1024.
Primary request: an exquisitely tactile quiet still-life studio backdrop with NO foreground object. Warm pale limestone tabletop across the lower 45 percent, finely textured muted celadon limewash plaster wall behind it. Gentle seamless meeting of table and wall, softly out of focus. Natural warm window light from upper left and faint diffuse foliage shadows confined to far upper right and far left edges. Broad EMPTY central 70 percent for a dynamic object composited later. Surface very fine mineral grain, subtle tonal variation, sophisticated Chinese contemporary gallery calm. Soft realistic material photography, warm ivory/oat/chalk and desaturated sage, balanced low contrast, natural light, restrained luxury. Camera looks slightly down onto tabletop, no dramatic perspective or horizon line. Bottom center evenly lit with space for a contact shadow. No cups, no coffee, no beans, no ceramics, no plants in frame, no wood furniture, no books, no text, no icons, no decorative frames, no vignette, no strong diagonal shadows through center. This image is an EMPTY BACKGROUND PLATE, not a finished illustration.

## 圆弧杯形成分参考（按用户指定的顶部青瓷杯图片修订）

文件：`docs/design/rounded-ingredient-reference.png`。参考图片：`public/images/journal/celadon-cup.jpg`。

提示词：

Create a corrected concept reference. Image 1 is the user's exact desired CUP SHAPE reference: use the rounded side profile of this low, wide celadon coffee cup (ignore its handle and saucer). Image 2 is the ingredient concept to correct, preserving its quiet celadon wall and limestone background, lighting, typography and labels.
The key correction: the three ingredient layers MUST join into ONE seamless rounded coffee-cup silhouette if the small vertical air gaps are closed. Do not make three separate bowls. Milk's bottom radius must equal espresso's top radius; milk's top radius must equal foam's bottom radius. Espresso is the bottom rounded cap with a small flat base. Milk is a solid open-ended curved slice above that cap, NOT a whole bowl with its own rounded bottom. Foam is a thin flat circular cap, not a peaked meringue. The outer profile matches image 1: broad round opening, sides gently curve inward down toward a narrow rounded base. Total joined silhouette height about 70% of mouth diameter.
Render coffee, milk and foam as the actual exposed ingredient surfaces. NO container of any kind, NO glass shell or glass rims, NO ceramic cup wall, NO handle or saucer. Show only three solid-looking fluid volumes separated vertically by tiny 8mm air gaps, with naturally glossy espresso and satin ivory milk, microfoam detail. Labels on right exactly “奶泡”, “牛奶”, “浓缩咖啡”, caption “配方结构示意”. Large specimen left-center. Landscape 3:2, polished high-end editorial 3D educational concept.
