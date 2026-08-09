# 2026 House Elections Tracker

Comprehensive 2026 U.S. House elections dataset with seat classifications, candidate records, research artifacts, and source guides.

## Current status

- **435/435 seats classified**
- **824 candidate rows**
- **0 unresolved candidates**
- Research artifacts and database copied into the repository

## Included data

| File | Purpose |
|---|---|
| `database/race_data.db` | SQLite database with `race_seats` and `race_candidates` |
| `database/Candidate_Data_Template.csv` | Research template |
| `database/all_candidates_complete.json` | Full candidate dataset |
| `database/all_candidates_by_state.json` | State-grouped candidate dataset |
| `database/final_tbd_candidates.json` | Completion artifact |
| `database/ALL_TBD_UPDATES.sql` | Candidate update script |
| `database/ALL_TBD_UPDATES_COMPREHENSIVE.sql` | Full update script |
| `database/analysis/sample_queries.sql` | Analysis queries |
| `database/schema.sql` | Schema definition |

## Classification buckets

The site and exported data are normalized to the 7 headline categories:

- Safe Democrat
- Likely Democrat
- Lean/Tilt Democrat
- Tossup
- Lean/Tilt Republican
- Likely Republican
- Safe Republican

The underlying data may still include finer split labels in source exports, but the website displays them in this 7-bucket format.

The site also shows exact lead bands:

- Safe: 12.5%+
- Likely: 8.0%-12.5%
- Lean: 5.0%-8.5%
- Tilt: 2.5%-5.0%
- Tossup: <2.5%

Seat pages also list the candidate names on file for each district.

The site now reads seat-level candidate data from the exported candidate bundle in `site-data.js` so districts stop showing empty candidate rows.

If AP or NBC source rows are added to that bundle, the site will show those source-tagged candidate names and mark incumbents with `★`.

The current bundle keeps the two highest-priority candidate rows per seat from the source exports, preferring NBC/AP data when it is available.

California seats with same-party general elections are shown as safe for that party.

Source labels are hidden next to party names and candidate details on the site.

Candidate party chips now use navy for Democrats and red for Republicans.

Candidate names themselves now carry the party color background.

Candidate detail pages now show the name at the top with party, endorsement details, and an AIPAC-backed badge when applicable.

## What’s in the database

- Seat classifications for all 435 House districts
- Candidate names, parties, roles, and research fields
- Fundraising totals
- Endorsements
- Corporate PAC and AIPAC fields
- Stock-trading notes

## Access

Open the repository folder and use the SQLite database directly:

```bash
cd /Users/manpreetsingh/.copilot/repos/house-2026-elections-tracker
sqlite3 database/race_data.db
```

To inspect tables:

```sql
SELECT COUNT(*) FROM race_seats;
SELECT COUNT(*) FROM race_candidates;
```

See `analysis/sample_queries.sql` for example queries.

## Methodology

### Electoral classification approach
1. Race to WH projections are primary.
2. Kalshi prediction market prices and polling aggregators are secondary support.
3. Decimal precision matters for Lean/Tilt/Tossup boundaries.
4. California top-two races are classified by party dominance where applicable.

### Candidate data collection
- Incumbents: official House records and race-to-wh.com
- Challengers: primary results and nominee reporting
- Endorsements: full Wikipedia-listed endorsements, party committees, candidate sites, election pages
- PAC data: FEC and OpenSecrets

## Notes

- Unknown research fields were left blank rather than guessed.
- Some category labels in the underlying data are split more finely than the 7 headline buckets.
- The repository also includes supporting documentation and batch SQL files used during completion.
- Use `database/endorsement_manual_fill.csv` to manually enter full endorsement lists.

## Roadmap

- PAC/AIPAC backfill for competitive seats
- Stock trading analysis for incumbents
- Optional website/dashboard layer on top of the CSV/SQLite data
