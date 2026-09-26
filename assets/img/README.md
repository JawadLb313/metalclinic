# Photos

## In use

| File | Where | Source |
|---|---|---|
| `logo.webp` | Header, footer | Cut out of the red Instagram graphic, AI-upscaled 4× for clean edges |
| — | Hero | **Empty on purpose** until the bench-press shot arrives. The hip-thrust photo was taken out of the hero; it stays in the small-group section. |
| `alain-before.webp` / `alain-after.webp` | About section; "100 lb" stat card | Instagram before/after graphic |
| `smallgroup.webp` | Small-group programme | Same upscaled hip-thrust photo, tighter crop |
| `client-1…4-before/after.webp` | Results section; client 1 also in the Transformation programme | Client collage |

All photos were graded to one look (slightly lower saturation, a touch more
contrast). The hero and logo were AI-upscaled. **The before/after photos were
deliberately not AI-enhanced** — they're proof of results, so they stay exactly
as the camera took them, only resized. Most came from Instagram screenshots, so
**originals straight from the phone will look noticeably sharper** — send them
and they drop in under the same filenames.

## Still placeholders

| Slot | CSS hook | Wanted |
|---|---|---|
| ~~One-to-one programme~~ | — | Filled: `coach-alan.webp` (caption cropped off, AI-upscaled) |
| Nutrition programme | `.ph--p3` | Real food — a plate or a meal-prep box |
| Online programme | `.ph--p4` | A phone showing a workout, gym blurred behind |
| "Why people stay" | `.ph--room` | The gym, empty, wide shot |
| Stat card "one coach" | `.ph--stat1` | Alan watching a client's rep |
| Stat card "re-measured" | `.ph--stat2` | Tape measure / assessment moment |

To fill one: drop the file here, then in `index.html` replace the placeholder
`<div class="ph …"></div>` with
`<div class="photo"><img src="/assets/img/FILE.webp" alt="…"></div>`
(or uncomment the matching line in section 16 of `assets/css/main.css`).
