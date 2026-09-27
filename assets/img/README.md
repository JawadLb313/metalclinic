# Photos

## In use

| File | Where |
|---|---|
| `logo.webp` | Header and footer. Cut out of the red Instagram graphic, AI-upscaled for clean edges. |
| `coach-alain.webp` | One-to-One Personal Training. The "University Discounts" caption was painted out with AI inpainting, then upscaled. |
| `nutrition.webp` | Nutrition Coaching. From the clinic's carbs post, with its text box removed. |
| `online.webp` | Online Coaching. Side-profile check-in photo, upscaled. |
| `hero.webp` | Hero, right side (a banner above the headline on phones). From the clinic's "Built in silence" poster, with the headline, logo and tagline removed by AI inpainting, then upscaled. |
| `smallgroup.webp` | Small-Group Personal Training. The clinic's "Stronger Every Rep — Small Group PT $125/12 sessions" graphic, unchanged apart from upscaling. Shown uncropped. |
| `room.webp` | Cover of the gym-tour card in "Why people stay". The brass "Iron Oak Fitness" plaque (another gym's name) was painted out. |
| `dumbbells-bw.webp` | Background of the closing "Built in silence." banner. |
| `og.jpg` | The preview image shown when the site link is shared (WhatsApp, Instagram, Facebook). |

## Removed on purpose

All before/after photos (Alain's and the clients'), the client results section,
and the hip-thrust photo were taken off the site at the client's request. The
"100 lb" story is now told in type in the About section instead.

## Adding a photo later

The only program without a photo is Transformation. To add one to a program, drop the file in this folder and put this
inside that program's `<div class="body">` in `index.html`, before the text:

    <div class="photo"><img src="/assets/img/FILE.webp" alt="What the photo shows"></div>

and remove `body--text` from that `<div class="body body--text">`.
Aim for about 1000px wide, `.webp` or `.jpg`, under 200 KB.
