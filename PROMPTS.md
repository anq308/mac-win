# Промты для картинок сайта: бумажный пейзаж с параллаксом

Первый экран собран из пяти слоёв, которые при прокрутке и движении мыши едут с разной скоростью. Сейчас там лежат мои временные слои. Сгенерируйте новые по промтам ниже и положите в `assets/paper/` **с теми же именами** — сайт подхватит их сам, ничего править не нужно.

| Файл | Что это | Фон |
|---|---|---|
| `sky.jpg` | небо с солнцем | сплошной |
| `far.png` | дальние горы | прозрачный |
| `mid.png` | средние холмы | прозрачный |
| `near.png` | ближние холмы | прозрачный |
| `front.png` | передний план с елями | прозрачный |

## Как генерировать, чтобы слои сошлись

1. Всё делайте **в одном чате**, по порядку: сначала небо, потом слои от дальнего к ближнему. К каждому следующему запросу прикладывайте предыдущую картинку и пишите «в том же стиле и палитре».
2. Размер — **1536×1024** (горизонтальный). Для слоёв обязательно просите **прозрачный фон, PNG**.
3. Никакого текста, логотипов, людей и зданий: это фон, на нём лежит заголовок.
4. Свет везде **сверху слева**, тень от каждого слоя падает **вниз и чуть вправо**.
5. Если слой получился с фоном, а не прозрачным, — попросите: «Сделай то же самое, но фон полностью прозрачный, сохрани PNG».

### Общий блок стиля — вставляйте в начало каждого промта

```
Style: handcrafted layered paper-cut diorama, real matte watercolor paper with visible fine grain
and slightly uneven hand-cut edges, soft realistic drop shadows between paper layers, gentle depth,
calm and warm mood. Flat colors, no gradients inside a layer except subtle paper texture.
Palette: warm cream #F4E8DC, peach #F3C4AA, dusty rose #DDB8C4, lavender #B48CAA,
muted violet #7A6092, deep plum #463A63. Light from the upper left.
No text, no letters, no logos, no people, no buildings, no birds. Wide 3:2 composition, 1536x1024.
```

### 1. `sky.jpg` — небо

```
[общий блок стиля]
Only the sky layer of the diorama: a smooth sheet of cream paper fading to soft peach toward
the bottom, with a large round paper sun cut from lighter cream paper placed at about 65% from
the left and 35% from the top. The sun casts a soft shadow onto the sky paper. A few very
subtle wisps of paper clouds near the horizon. Keep the upper half calm and empty —
a headline will sit there. Fully opaque background.
```

### 2. `far.png` — дальние горы

```
[общий блок стиля]
Only ONE paper layer on a fully transparent background: a long range of distant mountains cut
from dusty rose paper (#DDB8C4), spanning the full width edge to edge. The ridge line sits
around 45–60% of the image height, gentle and wide peaks. Everything below the ridge is solid
paper down to the bottom edge. Soft drop shadow under the top edge. Transparent PNG.
```

### 3. `mid.png` — средние холмы

```
[общий блок стиля]
Only ONE paper layer on a fully transparent background: rolling hills cut from lavender paper
(#B48CAA), full width edge to edge. The ridge line sits around 58–72% of the image height,
rounder and lower than distant mountains. Solid paper below the ridge down to the bottom edge.
Soft drop shadow along the top edge. Transparent PNG.
```

### 4. `near.png` — ближние холмы

```
[общий блок стиля]
Only ONE paper layer on a fully transparent background: close hills cut from muted violet paper
(#7A6092), full width edge to edge, ridge around 70–82% of the image height, with one gentle
valley slightly left of center. Solid paper below the ridge down to the bottom edge.
Deeper drop shadow along the top edge. Transparent PNG.
```

### 5. `front.png` — передний план

```
[общий блок стиля]
Only ONE paper layer on a fully transparent background: the foreground strip cut from deep plum
paper (#463A63) across the full width, ridge around 85–92% of the image height, with a row of
small hand-cut pine tree silhouettes of different heights standing on the ridge (taller at the
left and right edges, lower in the middle). Solid paper below the ridge to the bottom edge.
Strong soft drop shadow. Transparent PNG.
```

## По желанию: ночная версия

Тот же набор, но ночью — для тёмной темы. Те же пять промтов, в блоке стиля поменяйте палитру и небо:

```
Palette: night navy #141A33, deep indigo #232B52, muted blue-violet #3B3F73, dusk violet #55508A,
dark plum #2A2240. A round paper moon in pale cream #EDE6D6 instead of the sun, and tiny
paper-punched stars in the upper sky.
```

Назовите файлы `sky-night.jpg`, `far-night.png` и так далее. Скажите мне — подключу их к тёмной теме.

## По желанию: рваный край между разделами

```
[общий блок стиля]
A horizontal strip of torn paper edge, 1536x160, cream paper (#FBF7F3) torn along the top edge
with tiny fibers visible, soft shadow above the tear. Everything above the tear is fully
transparent. Transparent PNG.
```

Файл `assets/paper/edge.png` — положу его на стык первого экрана и следующего раздела.

## Проверка перед заменой

- слои **прозрачные** везде, кроме неба;
- хребты идут **от края до края**, без обрывов слева и справа;
- у дальнего слоя гребень выше всех, у переднего — ниже всех;
- в верхней половине неба **пусто**: там заголовок.
