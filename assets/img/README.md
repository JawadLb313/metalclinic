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
| ~~One-to-one programme~~ | — | Filled: `coach-alain.webp` — full photo, caption removed with LaMa inpainting, AI-upscaled 4× |
| ~~Nutrition program~~ | — | Filled: `nutrition.webp` — from their carbs post; the text box removed by undoing its dimming and inpainting the lettering |
| ~~Online program~~ | — | Filled: `online.webp` — side-profile check-in photo, AI-upscaled |
| ~~"Why people stay"~~ | — | Filled: gym tour video card (Instagram CqWFWyYgtWt), cover `gym.webp` cut from the small-group photo with no one in frame |
| Stat card "4 certifications" | `.ph--stat1` | Alain coaching a client, or his certificates on the wall |
| Stat card "$12.50 per session" | `.ph--stat2` | A small-group session in progress |

To fill one: drop the file here, then in `index.html` replace the placeholder
`<div class="ph …"></div>` with
`<div class="photo"><img src="/assets/img/FILE.webp" alt="…"></div>`
(or uncomment the matching line in section 16 of `assets/css/main.css`).
