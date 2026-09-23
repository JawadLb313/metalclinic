# Photos

## In use

| File | Where | Source |
|---|---|---|
| `logo.webp` | Header, footer | Cut out of the red Instagram graphic |
| `coach.webp` | Hero, right side (desktop only) | Still from a talking-to-camera video, caption cropped off. **Replace with the bench-press shot.** |
| `video-thumb.webp` | Hero "Watch" card | Crop of the small-group hip-thrust post |
| `alain-before.webp` / `alain-after.webp` | About section; "100 lb" stat card | Instagram before/after graphic |
| `smallgroup.webp` | Small-group programme | Hip-thrust post, price overlay cropped off |
| `client-1…4-before/after.webp` | Results section; client 1 also in the Transformation programme | Client collage |

All photos were graded to one look (slightly lower saturation, a touch more
contrast) and upscaled with sharpening. Most came from Instagram screenshots, so
**originals straight from the phone will look noticeably sharper** — send them
and they drop in under the same filenames.

## Still placeholders

| Slot | CSS hook | Wanted |
|---|---|---|
| One-to-one programme | `.ph--p2` | Alain spotting or correcting a client's form, close-up |
| Nutrition programme | `.ph--p3` | Real food — a plate or a meal-prep box |
| Online programme | `.ph--p4` | A phone showing a workout, gym blurred behind |
| "Why people stay" | `.ph--room` | The gym, empty, wide shot |
| Stat card "one coach" | `.ph--stat1` | Alain watching a client's rep |
| Stat card "re-measured" | `.ph--stat2` | Tape measure / assessment moment |

To fill one: drop the file here, then in `index.html` replace the placeholder
`<div class="ph …"></div>` with
`<div class="photo"><img src="/assets/img/FILE.webp" alt="…"></div>`
(or uncomment the matching line in section 16 of `assets/css/main.css`).
