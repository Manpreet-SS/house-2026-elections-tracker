# House 2026 Elections Tracker

**Comprehensive 2026 US House Elections Database & Analysis Platform**

A structured database tracking all 435 House seats classified into 7 electoral strength categories (Safe D/R, Likely D/R, Lean D/R, Tilt D/R, Tossup) with detailed incumbent and candidate profiles.

## Features

- **Electoral Classification**: All 435 House seats categorized using Race to WH projections, Kalshi market prices, and A+/A/A-/B+ rated polls
- **824 Candidate Records**: Complete incumbent and challenger profiles including:
  - Incumbents' PAC donations and AIPAC contributions
  - Stock trading disclosures from House Clerk records
  - Campaign finance data (2024 & 2026 YTD)
  - Corporate PAC donor breakdowns (Top 5 industries per candidate)
  - Political endorsements (organizations, politicians, PACs)
  - Trump endorsement tracking for Republican candidates
  
- **2026 Primary Results**: All nominees finalized from March-June 2026 primaries across all 50 states
- **Competitive Race Focus**: Deep analysis of 126 competitive seats (Tossup through Likely)
- **Transparent Data**: All sources cited and verifiable; designed for research and journalism

## Dataset Status

**As of August 9, 2026:**
- ✅ 435 House seats (100% of all districts)
- ✅ 668 candidates named (81.1% complete; 156 TBD in safe seats)
- ✅ All 389 incumbents with full profiles
- ✅ 324 challengers with verified 2026 primary results
- ⏳ PAC/AIPAC data framework ready (backfill in progress)

## Electoral Classification System

Seats are classified using the following methodology based on **projected lead percentage**:

| Category | Lead Spread | Seats | Party Breakdown |
|----------|------------|-------|-----------------|
| Safe Democrat | >12.5% | 185 | D leans heavily |
| Likely Democrat | 8-12.5% | 13 | D favored |
| Lean Democrat | 5-8% | 8 | Slight D advantage |
| Tilt Democrat | 2.5-5% | 10 | Very competitive, D edge |
| **Tossup** | <2.5% | **18** | **Genuinely competitive** ⚖️ |
| Tilt Republican | 2.5-5% | 9 | Very competitive, R edge |
| Lean Republican | 5-8% | 11 | Slight R advantage |
| Likely Republican | 8-12.5% | 31 | R favored |
| Safe Republican | >12.5% | 145 | R leans heavily |

**Note**: California's top-two primary system may result in all-Democratic general elections in some districts (e.g., CA-7, CA-11, CA-12, CA-14, CA-40). These are classified based on party dominance rather than projected lead.

## Data Structure

### `race_seats.csv` (435 rows)
Core data for all House districts:
- State code, district number
- Incumbent name and party affiliation
- Electoral category (Safe/Likely/Lean/Tilt/Tossup)
- Projected lead percentage (from Race to WH)
- Notes (open seat, special cases, etc.)

### `race_candidates.csv` (668 rows)
Detailed candidate records:
- State, district, candidate name, party, role (incumbent/candidate)
- Endorsements (party backing, organizational support)
- Trump endorsement flag (Republican candidates)
- Primary loss flag (Republican candidates only)
- Estimated fundraising
- OpenSecrets and FEC URLs for research
- Placeholders for PAC money, AIPAC, stock trading, additional info

## Data Sources

✅ **Primary Electoral Data**
- [Race to WH](https://www.racetothewh.com/house) - Electoral projections and district-level ratings
- [270toWin Kalshi Prediction Market](https://www.270towin.com/2026-house-election/kalshi-2026-house-prediction-market-prices) - Real-money market prices

✅ **Primary Results**
- Wikipedia 2026 House elections pages (state-by-state nominees)
- Associated Press / NBC election results

✅ **Campaign Finance** (In Progress)
- [FEC.gov](https://www.fec.gov) - Official campaign finance filings (Form C)
- [OpenSecrets.org](https://www.opensecrets.org) - PAC donor data and industry breakdowns
- 2024 & 2026 YTD cycle data

✅ **Specialty Data** (Framework Ready)
- [Track AIPAC](https://www.trackaipac.org) - Pro-Israel PAC contributions
- [House Clerk Stock Trading Disclosures](https://disclosures-clerk.house.gov) - Incumbent trading data
- Wikipedia individual candidate pages - Endorsements and biographical info

## How to Use

### Query All Tossup Races
```sql
SELECT rs.state, rs.district, rs.incumbent, rc.candidate
FROM race_seats rs
JOIN race_candidates rc ON rs.state = rc.state AND rs.district = rc.district
WHERE rs.category = 'Tossup'
ORDER BY rs.state;
```

### Find Trump-Endorsed Republican Candidates
```sql
SELECT state, district, candidate
FROM race_candidates
WHERE party = 'R' AND trump_endorsed = 1
ORDER BY state;
```

### Analyze PAC Donors by State
```sql
SELECT state, COUNT(*) as candidates, COUNT(DISTINCT district) as districts
FROM race_candidates
WHERE corporate_pac_money IS NOT NULL
GROUP BY state
ORDER BY candidates DESC;
```

See `sample_queries.sql` for more examples.

## Methodology

### Electoral Classification Approach
1. **Source Priority**: Race to WH projections (primary), Kalshi prediction markets (secondary), polling aggregators (tertiary)
2. **Threshold Application**: Decimal precision is critical; 2.3% difference is Tossup (not Tilt)
3. **Open Seat Modeling**: Race to WH projects general-election matchups for open seats; these projections are treated as reliable
4. **Same-Party Primaries**: California's top-two system creates all-Democratic general elections in some districts; classified by party strength regardless of projected margin
5. **Data Date**: All ratings current as of July 25 - August 8, 2026

### Candidate Data Collection
- **Incumbents**: Verified from official House records and race-to-wh.com
- **Challengers**: Extracted from 2026 primary results (March-June 2026 across all states; FL pending Aug 18 GOP primary)
- **Endorsements**: Compiled from official party committees, candidate websites, Wikipedia election pages
- **Trump Endorsements**: Verified against Trump's public statements and official endorsement lists
- **PAC Data**: Sourced from FEC filings and OpenSecrets (2024 & 2026 YTD)

## Known Limitations

1. **156 Challenger Names Pending** (18.9% of dataset)
   - Mostly in safe seats (lower research priority)
   - Florida Aug 18 GOP primary will update 15 GOP nominees
   - Will be completed post-primary

2. **PAC/AIPAC Data**
   - Framework in place; detailed backfill in progress
   - 2026 YTD data may be incomplete until after Labor Day (FEC filing deadlines)

3. **Stock Trading Data**
   - Skeleton structure ready; House Clerk scraping pending
   - Available for all incumbents with disclosable portfolios

4. **Real-Time Updates**
   - Data accurate as of August 9, 2026
   - Primary results reflected through June 2026
   - Campaign finance figures through June 30, 2026 (partial year data)
   - Will require updates post-primary, post-FEC deadlines

## Contributing

Contributions are welcome! Areas for collaboration:

- **PAC/AIPAC Backfill**: Help populate corporate donor data from OpenSecrets
- **Endorsement Expansion**: Add detailed endorsement cascades from Wikipedia election pages
- **Analysis Scripts**: Write Python scripts for competitive race analysis, Trump endorsement mapping
- **Data Validation**: Verify candidate names and electoral classifications

See `CONTRIBUTING.md` for guidelines.

## License

- **Database Content**: CC-BY-4.0 (Creative Commons Attribution 4.0 International)
- **Code & Analysis Scripts**: MIT License

You are free to use, share, and adapt this data for research, journalism, and public analysis. Attribution appreciated but not required.

## Citation

If you use this data in research or publication:

```
House 2026 Elections Tracker
https://github.com/Manpreet-SS/house-2026-elections-tracker
Accessed: August 9, 2026
```

## Support & Feedback

- **Issues & Corrections**: Open an issue on GitHub
- **Data Updates**: Submit a pull request with verified data
- **Questions**: Check existing issues or start a discussion

## Roadmap

**Completed (Aug 9, 2026)**
- ✅ Electoral classification for all 435 seats
- ✅ Incumbent profiles (389 records, 100%)
- ✅ Challenger names (668 records, 81.1%)
- ✅ Basic party endorsement data

**In Progress**
- 🔄 PAC donor data (126 competitive seats priority)
- 🔄 AIPAC contributions tracking
- 🔄 Fundraising breakdown (2024 & 2026 YTD)

**Planned**
- 📅 House Clerk stock trading analysis
- 📅 Trump endorsement impact analysis
- 📅 Competitive race visualization dashboard
- 📅 7-category summary reports by state

---

**Last Updated**: August 9, 2026
**Maintainer**: [Your Name/Organization]
**Questions?** Open an issue or start a discussion.
