# Data Sources

This document lists all primary and secondary data sources used in the House 2026 Elections Tracker.

## Electoral Projections & Classification

### Primary Sources

**1. Race to WH** (https://www.racetothewh.com/house)
- District-level electoral projections for all 435 House seats
- Projected lead percentages used for Safe/Likely/Lean/Tilt/Tossup classification
- Data current as of July 25 - August 8, 2026
- Methodology: Combines polling, fundamentals, and expert consensus
- Provides both incumbent-vs-challenger matchups and open seat projections

**2. 270toWin Kalshi Prediction Market** (https://www.270towin.com/2026-house-election/kalshi-2026-house-prediction-market-prices)
- Real-money prediction market prices for individual races
- Used as secondary validation of electoral competitiveness
- Market-based probability estimates (calibrated to actual outcomes)
- Updated continuously; snapshot taken Aug 8, 2026

**3. Polling Aggregators** (Reference-only; not primary classification source)
- A+, A, A-, B+ rated polls per FiveThirtyEight methodology
- Used to validate polling data underlying Race to WH projections
- Includes generic ballot, head-to-head matchups, and approval ratings

## Primary Results & Candidate Information

### Primary Results

**1. Wikipedia 2026 House Elections Pages**
- Comprehensive state-by-state primary results (March-June 2026)
- URL pattern: `https://en.wikipedia.org/wiki/2026_United_States_House_of_Representatives_elections_in_[STATE_NAME]`
- Data included:
  - All primary candidates and vote totals
  - Runoff results (where applicable)
  - "Advanced to general" section showing general election matchups
  - Campaign finance summaries per candidate

**Examples:**
- https://en.wikipedia.org/wiki/2026_United_States_House_of_Representatives_elections_in_California
- https://en.wikipedia.org/wiki/2026_United_States_House_of_Representatives_elections_in_Texas
- https://en.wikipedia.org/wiki/2026_United_States_House_of_Representatives_elections_in_Florida

**2. Associated Press / NBC Election Results**
- Official primary election results certified by state authorities
- Used to cross-check Wikipedia nominee data
- Available through AP Elections API (partner sources)

**3. State Election Authority Databases**
- Official filings per state (FEC database for federal candidates)
- Candidate committee registrations
- Ballot status and certification dates

## Campaign Finance Data

### Primary Sources

**1. FEC.gov** (https://www.fec.gov)
- Official candidate committee financial reports (Form C)
- Total receipts and expenditures (2024 full cycle + 2026 YTD)
- Individual contribution data
- **Data currency**: Through June 30, 2026 (most recent FEC deadline; July 15 deadline will add ~2 weeks more)

**2. OpenSecrets.org** (https://www.opensecrets.org)
- Aggregated PAC donor data for all candidates
- Industry breakdown (Top 20 industries per candidate)
- Top corporate PAC donors (ranked by contribution amount)
- Historical comparison (2024 vs. 2026 YTD)
- **Features**:
  - Candidate profiles: `/candidates/[ID]/`
  - PAC contributions: Sorted by amount and donor type
  - Industry analysis: Healthcare, Finance, Real Estate, etc.

**3. Track AIPAC** (https://www.trackaipac.org)
- Comprehensive pro-Israel PAC tracking
- Direct AIPAC contributions (PAC funds)
- Super PAC support (AIPAC-aligned Super PACs)
- Candidate-by-candidate breakdowns
- Lists all candidates receiving support, opposition, or no engagement

## Incumbent Information

### House Official Sources

**1. House.gov Member Directory** (https://www.house.gov/representatives/find-your-representative)
- Official member profiles (name, state, district, party)
- Committee assignments
- Contact information and websites
- Office locations

**2. House Clerk Stock Trading Disclosures** (https://disclosures-clerk.house.gov)
- Periodic Transaction Reports (PTRs) for House members
- Individual stock trades and portfolio holdings
- Dates, securities, transaction types (buy/sell/exempt)
- Enables identification of trading patterns and timing correlations
- Public database maintained by House Clerk

**3. FEC Candidate Committee Filings**
- Incumbent campaign finance reports (Form C)
- Fundraising totals and PAC support
- Detailed contribution records
- Available at https://www.fec.gov/data/

## Endorsements & Political Alignment

### Party Committee Endorsements

**1. Democratic Congressional Campaign Committee (DCCC)**
- https://www.dccc.org/
- Official DCCC endorsement lists
- Early endorsements typically released in spring
- Updated throughout cycle

**2. National Republican Congressional Committee (NRCC)**
- https://www.nrcc.org/
- Official NRCC endorsement lists
- Incumbent support and challenger endorsements
- Updated throughout cycle

**3. Individual Politician Endorsements**
- News reports and campaign announcements
- Wikipedia candidate pages (collated endorsements)
- Social media verification (when applicable)

### Trump Endorsements

**1. Truth Social & Public Statements**
- Donald Trump's official Truth Social account
- Rally speeches and press releases
- Verified Trump endorsements for 2026 House candidates
- Cross-checked against news reports

**2. News Archives**
- CNN, New York Times, Wall Street Journal coverage of Trump endorsements
- Associated Press election coverage
- State-specific news outlets for regional endorsements

## Interest Group & Super PAC Support

### Data Sources for PAC Contributions

**1. OpenSecrets PAC Tracker**
- All Super PACs and their contributions
- Ideology classification (Progressive, Conservative, Ideological, etc.)
- Candidate-specific receipts

**2. FEC Super PAC Filings**
- Official Form 24 (24-Hour Notices) for large contributions
- Super PAC support for individual candidates (uncoordinated)
- Can infer candidate support/opposition from contribution patterns

## Data Update Schedule

| Data Type | Source | Frequency | Last Updated |
|-----------|--------|-----------|--------------|
| Electoral Projections | Race to WH | Daily | Aug 8, 2026 |
| Prediction Markets | Kalshi | Continuous | Aug 8, 2026 |
| Polling | FiveThirtyEight | Daily | Aug 8, 2026 |
| Primary Results | Wikipedia | As certified | June 30, 2026 |
| Campaign Finance | FEC/OpenSecrets | Monthly | June 30, 2026 |
| AIPAC Contributions | Track AIPAC | Updated | July 2026 |
| Stock Trades | House Clerk | Quarterly | May 31, 2026 |
| Endorsements | Live tracking | Ongoing | Aug 8, 2026 |

## Access & Attribution

All data sources are publicly accessible. No commercial licenses required.

### Citation Format

When using this dataset:

```
House 2026 Elections Tracker
Data sources: Race to WH, Wikipedia, FEC.gov, OpenSecrets, Track AIPAC, House Clerk
Accessed: August 9, 2026
GitHub: https://github.com/[username]/house-2026-elections-tracker
```

### Terms of Use

- **Race to WH**: Personal use, research, journalism (verify their terms)
- **FEC Data**: Public domain; no restrictions
- **OpenSecrets**: CC-BY-NC 3.0 (non-commercial use)
- **Wikipedia**: CC-BY-SA 3.0 (share-alike)
- **House Clerk**: Public domain (federal records)
- **Track AIPAC**: Verify terms; generally open for research

---

**Last Updated**: August 9, 2026
**Data as of**: August 8, 2026 (electoral), June 30, 2026 (campaign finance)
