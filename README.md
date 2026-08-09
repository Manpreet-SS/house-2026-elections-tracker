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
| `race_data.db` | SQLite database with `race_seats` and `race_candidates` |
| `Candidate_Data_Template.csv` | Research template |
| `all_candidates_complete.json` | Full candidate dataset |
| `all_candidates_by_state.json` | State-grouped candidate dataset |
| `final_tbd_candidates.json` | Completion artifact |
| `ALL_TBD_UPDATES.sql` | Candidate update script |
| `ALL_TBD_UPDATES_COMPREHENSIVE.sql` | Full update script |
| `analysis/sample_queries.sql` | Analysis queries |
| `database/schema.sql` | Schema definition |

## Classification buckets

- Safe Democrat
- Likely Democrat
- Lean Democrat
- Tilt Democrat
- Tossup
- Tilt Republican
- Lean Republican
- Likely Republican
- Safe Republican

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
sqlite3 race_data.db
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
- Endorsements: party committees, candidate sites, election pages
- PAC data: FEC and OpenSecrets

## Notes

- Unknown research fields were left blank rather than guessed.
- Some category labels in the underlying data are split more finely than the 7 headline buckets.
- The repository also includes supporting documentation and batch SQL files used during completion.

## Roadmap

- PAC/AIPAC backfill for competitive seats
- Stock trading analysis for incumbents
- Optional website/dashboard layer on top of the CSV/SQLite data

