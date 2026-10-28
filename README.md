# LimePointing Works — website

Single-page site for LimePointing Works (traditional lime pointing, Guernsey). Plain HTML + Tailwind CSS v3 (compiled and committed) + a small vanilla JS file. No frameworks, no runtime CDNs.

## Folder layout

```
index.html              ← the whole site, sections separated by big comment banners
thanks.html             ← shown after the quote form is sent (FormSubmit `_next`)
404.html                ← GitHub Pages "not found" page (uses <base href="/limepointing-works/">)
assets/css/styles.css   ← compiled Tailwind – don't edit, rebuild instead
assets/js/main.js       ← menu, header, scroll reveals, services explorer, lightbox, form validation
assets/fonts/           ← Young Serif + Figtree (woff2, self-hosted) with their OFL licences
images/brand/           ← logo.svg (sign-style plate), wordmark.svg, mark.svg (LP square)
images/work/            ← job photos, each as name.webp (~1200px) + name-sm.webp (~640px)
images/illustrations/   ← stonework-lines.svg (hero backdrop), pointing.svg (animated "Why lime" wall)
images/                 ← favicons, og-image.jpg (1200×630 share card), site.webmanifest
src/input.css           ← Tailwind source, @font-face, component classes, animations
tailwind.config.js      ← brand colours, fonts, keyframes
sitemap.xml, robots.txt
_fb-pack/               ← source material from the Facebook page (not published by Pages)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| navy-900 | `#121a38` | Their painted site sign – headings, buttons, dark sections, logo plate |
| navy-950 | `#0a1024` | Footer |
| putty-50 / 100 | `#faf7f1` / `#f3eee3` | Page backgrounds – the colour of cured lime |
| putty-300 / 400 | `#d6cab4` / `#b7ac95` | Lines and borders – sampled from the stone/mortar in the profile photo |
| granite-400 | `#8794a8` | Blue-grey stones in the illustrations |
| sand-400 / 500 | `#d6b77a` / `#bf9a52` | Small accents – headline underline, ticks, step numbers |

- **Fonts:** Young Serif (headings) and Figtree (body), both SIL Open Font License, from @fontsource.
- **Logo:** their only "logo" is the navy sign in their profile photo (720px, photographed at an angle). It has been redrawn as a clean SVG – same two-line "LimePointing / Works" lettering in a bold sans (Arimo Bold, converted to paths), cream on navy. `mark.svg` ("LP" on the navy plate) is used for favicons.

## Editing

- **Text:** everything is in `index.html`. Search for the section banner (e.g. `SERVICES`, `RECENT WORK`).
- **Colours / fonts:** change `tailwind.config.js`, then `npm install` (first time) and `npm run build`. `npm run watch` rebuilds as you edit.
- **Add a work photo:** export `name.webp` (~1200px wide) and `name-sm.webp` (~640px) into `images/work/`, then copy one of the `<button data-lb=…>` blocks in the Recent work gallery. `data-lb` is the large image, `data-caption` is the lightbox caption; set the `<img>` `alt`, `width` and `height`.
- **Services explorer:** each service is a `role="tab"` button plus a matching `role="tabpanel"` (`tab-exterior` ↔ `panel-exterior` etc.). To add one, copy a button and a panel, give both new ids, and add the same name to the form's "Type of work" `<select>` – the panel's `data-quote` value must match that option so "Get a quote" pre-selects it.
- **Before/after:** not used – the pack has no matching before/after pair (the "render stripped" and "finished" gable photos are from different angles), so they're shown side by side in the "A gable wall, start to finish" section instead.

## Before going live — checklist

- [ ] Swap `https://tobygregg.github.io/limepointing-works/` for the real domain: canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD (`url`, `image`, `logo`), `sitemap.xml`, `robots.txt` and the form's `_next`
- [ ] Update (or remove) `<base href="/limepointing-works/">` in `404.html` for the real domain
- [ ] **When the client goes ahead, switch the form from Toby's email to the client's (`limepointingguernsey@gmail.com`?) in the `action` URL and activate FormSubmit** (it emails a confirmation link on the first submission); change the `_subject` too
- [ ] Confirm phone (07781 112490), WhatsApp and email are still current
- [ ] Get the client to sign off the services wording – the "What's involved" lists and "How a job runs" steps describe standard lime pointing practice and what the photos show, not anything they've written
- [ ] Confirm "Mason" is the person customers should ask for (it's on the site sign and in a review)
- [ ] Confirm they're happy with the credit to Bourgaize Builders Ltd for render removal (from their own post)

**Assumptions and things left out**

- Only one post and one written review exist, so there's no testimonials section (needs at least three) and no FAQ (nothing in the pack answers customer questions).
- Their post says "get in touch for any small or medium sized jobs" in the middle of thanking a sandblasting firm – it's unclear who that refers to, so it isn't used.
- The sandblasting company they thanked isn't named, so the site only says "we work alongside local builders and sandblasting teams".
- "Always open" opening hours and the ££ price range are left off the page (price range is in the JSON-LD only).
- The cover image is a phone screenshot of their Facebook feed and isn't used. One photo (img-007) was a duplicate.
- The postcode GY1 1ZB / St Peter Port comes from the page's address field and is only used in the JSON-LD.

## Source

Built from the Facebook pack in `_fb-pack/` (BRIEF.md, data.json, images). The underscore folder isn't published by GitHub Pages.

## Build

```
npm install
npm run build
```
