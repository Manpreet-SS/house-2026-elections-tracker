# Methodology: Electoral Classification & Data Collection

## Electoral Classification System

### Threshold-Based Classification

All 435 House seats are classified into 7 categories based on **projected lead percentage** from Race to WH projections:

| Category | Lead Threshold | Interpretation |
|----------|----------------|-----------------|
| **Safe Democrat** | > +12.5% | Democrats expected to win comfortably |
| **Likely Democrat** | +8% to +12.5% | Democrats favored but margins within reach |
| **Lean Democrat** | +5% to +8.5% | Slight Democratic advantage |
| **Tilt Democrat** | +2.5% to +5% | Very competitive; small Democratic edge |
| **Tossup** | < +2.5% (< ±2.5%) | Genuinely competitive; margin of error |
| **Tilt Republican** | +2.5% to +5% | Very competitive; small Republican edge |
| **Lean Republican** | +5% to +8.5% | Slight Republican advantage |
| **Likely Republican** | +8% to +12.5% | Republicans favored but margins within reach |
| **Safe Republican** | > +12.5% | Republicans expected to win comfortably |

### Key Principles

1. **Decimal Precision is Critical**
   - Example: CO-5 at 2.3% lead = Tossup (not Tilt), because 2.3% < 2.5%
   - All thresholds are applied with precision to avoid misclassification

2. **Primary Data Source: Race to WH**
   - Race to WH projects general-election matchups for each district
   - These projections account for redistricting, incumbent retirements, and polling trends
   - Projections current as of July 25 - August 8, 2026

3. **Secondary Sources**
   - Kalshi prediction market prices (real-money bets on individual races)
   - Polling aggregators: A+, A, A-, B+ rated (FiveThirtyEight, etc.)
   - Used to validate and cross-check Race to WH classifications

4. **Open Seat Modeling**
   - For districts with retiring incumbents, Race to WH projects hypothetical matchup outcomes
   - These projections are treated as reliable (not speculative)
   - Example: MI-1 (open), PA-7 (open), FL-2 (open GOP)

5. **Same-Party General Elections** (California Special Case)
   - California's top-two primary system occasionally produces all-Democratic general elections
   - Examples: CA-7 (Doris Matsui D vs. Mai Vang D), CA-11, CA-12, CA-14, CA-40
   - These seats are classified as **Safe Democrat** based on party dominance, ignoring the projected hypothetical margin against a Republican
   - The projected lead (e.g., D +1.6% vs. a hypothetical Republican) is noted but not used for categorization

## Data Collection Methodology

### Incumbent Data

**Sources:**
- House.gov official member directory
- Race to WH incumbent profiles
- FEC campaign finance records
- OpenSecrets incumbent profiles

**Verification:**
- Cross-checked against multiple sources
- Party affiliation verified from official House records
- Incumbent status confirmed (running for reelection, retiring, running for higher office)

**Data Included:**
- Full name
- State and district
- Party affiliation
- Committee affiliation (party backing)
- Electoral category (automatically derived from race_seats)

### Challenger/Candidate Data

**Sources:**
- Wikipedia 2026 House elections pages (state-by-state)
- Associated Press election results
- Official state election authority databases
- Candidate campaign websites

**Verification Process:**
1. Primary results extracted from Wikipedia "Advanced to general" sections
2. General election matchups verified against official filing databases
3. Party affiliation confirmed from FEC filing documents
4. Nominee status cross-checked (unopposed candidates, independents, etc.)

**Primary Timeline:**
- **Completed**: March 3 (Texas primary + May 26 runoff), March 17 (Illinois), May 19 (Georgia) + June 16 runoff
- **Completed**: June 2-4 (California, New York, other states)
- **Pending**: August 18, 2026 (Florida GOP primary)

### Endorsement Data

**Collection Sources:**
- Party committee endorsement lists (DCCC/NRCC)
- Individual candidate campaign websites
- Wikipedia candidate pages
- FEC contribution records (Super PAC support)
- News archives and press releases

**Categorization:**
- Party committee backing (DCCC/NRCC)
- Outside interest group endorsements (unions, environmental, business, etc.)
- Specific politician/activist endorsements
- Super PAC support

### Trump Endorsement Tracking

**Methodology:**
- Endorsements verified from Trump's social media (Truth Social, rallies)
- Cross-checked against news reports of official Trump endorsements
- Flag set to 1 (trumped_endorsed) for all verified endorsed candidates
- Includes candidates endorsed at rallies, in statements, or via media

**Special Tracking:**
- Primary losses: Republican incumbents or Trump allies who lost primaries are flagged (primary_lost = 1)
- Primary winners backed by Trump are flagged (trump_endorsed = 1)
- Examples: Dan Crenshaw (TX-2, lost primary to Steve Toth), Max Miller (OH-7, Trump aide in losing race)

### Campaign Finance Data

**Primary Sources:**
- [FEC.gov](https://www.fec.gov) Form C filings (Candidate Committee Reports)
- [OpenSecrets.org](https://www.opensecrets.org) PAC donor aggregations
- [Track AIPAC](https://www.trackaipac.org) pro-Israel PAC tracking

**Data Included:**
- Total fundraised (2024 full cycle + 2026 YTD)
- Top 5 corporate PAC donors per candidate
- Industry breakdown (Finance, Real Estate, Healthcare, Tech, Unions, Agriculture, etc.)
- AIPAC and pro-Israel PAC contributions (from Track AIPAC)

**Timeline:**
- 2024 data: Complete (full cycle)
- 2026 data: Partial (through June 30, 2026)
- Updates pending: Post-FEC reporting deadlines (typically after July 15, October 15)

### Stock Trading Data (Incumbents Only)

**Source:**
- [House Clerk Stock Trading Disclosures](https://disclosures-clerk.house.gov)

**Collection Process:**
1. Identify all incumbents with disclosable stock portfolios
2. Pull transaction records (2024-2026)
3. Flag unusual trading patterns (timing around major legislation, etc.)
4. Note industry concentration and sector trends

**Data Format:**
- Individual transaction dates and securities
- Summary: Total trades, value ranges, top holdings
- Red flags: Insider trading investigation status (if applicable)

## Data Quality Assurance

### Verification Checklist

- [ ] All 435 seats have incumbent name and party
- [ ] All seats have electoral category assignment
- [ ] Tossup seats (< 2.5% lead) visually verified for accuracy
- [ ] California same-party general elections classified correctly
- [ ] Challenger names verified from Wikipedia or official primary results
- [ ] Trump endorsement flags cross-checked with official sources
- [ ] Primary loss flags confirmed for applicable candidates
- [ ] FEC URLs point to valid campaign committee pages
- [ ] OpenSecrets URLs point to valid candidate profiles

### Known Data Gaps

1. **156 Challenger Names TBD (18.9%)**
   - Mostly in safe seats (MD, MA, WI, LA safe D/R)
   - Lower research priority (not competitive)
   - FL Aug 18 GOP primary will update 15 GOP nominees
   - Will be backfilled post-primary

2. **PAC/AIPAC Data In Progress**
   - Framework structure in place
   - Backfill scheduled post-FEC filing deadlines
   - 2026 YTD data incomplete; will stabilize after Labor Day

3. **Stock Trading Data Pending**
   - House Clerk raw data scraping required
   - Available for manual lookup via House Clerk website
   - Automated extraction would require custom scraper

## Reproducibility

### How to Reproduce This Dataset

1. **Clone the repository** and install dependencies
2. **Create database**: Run `schema.sql` in SQLite or PostgreSQL
3. **Import data**: Load CSV files into respective tables
4. **Verify thresholds**: Cross-check electoral categories against Race to WH source
5. **Validate candidates**: Spot-check challenger names against Wikipedia election pages
6. **Audit endorsements**: Verify sample of Trump endorsements against official sources

### Version Control

- Database exports (CSV) tracked in `/database/` directory
- Dated versions available in release archives
- Change log maintained for all data updates

---

**Last Updated**: August 9, 2026
**Methodology Version**: 1.0
