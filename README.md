# 2026 House Elections Tracker

Open `index.html` in a browser to browse states, districts, and candidate detail cards from the exported data.

## Main files

- `index.html`
- `site.css`
- `site.js`
- `site-data.js`

## Notes

- Democratic candidate names use a navy background.
- Republican candidate names use a red background.
- Candidate detail pages show the name, party, endorsement section, and AIPAC status.
- Lean/Tilt categories and exact lead values are rendered from the compiled data.

The site is static and reads from `site-data.js`, so you can later replace that file with generated JSON from `database/race_seats.json` and `database/all_candidates_complete.json`.
