# 2026 US House Elections Candidate Data Research Guide

**Database Status**: 139 seats classified into 7 electoral categories with incumbents identified. Now backfilling candidate-level financial and endorsement data.

---

## 📊 Current Database Structure

**File**: `2026_house_candidate_research_template.csv`

**Seats to Complete**: 139 total
- **Safe Democrat**: 76 seats (lower priority)
- **Safe Republican**: 34 seats (lower priority)
- **Tossup**: 4 seats (HIGH PRIORITY)
- **Likely Democrat**: 9 seats (HIGH PRIORITY)
- **Likely Republican**: 6 seats (HIGH PRIORITY)
- **Tilt Democrat**: 2 seats (HIGH PRIORITY)
- **Tilt Republican**: 3 seats (HIGH PRIORITY)
- **Lean Democrat**: 3 seats (MEDIUM PRIORITY)
- **Lean Republican**: 2 seats (MEDIUM PRIORITY)

**Total Priority Seats**: 29 seats (backfill first for fastest insight)

---

## 🔍 Data Fields to Collect (Per Candidate)

### 1. **2024 Fundraising** (from FEC.gov)
- Total raised
- Total from individuals
- Total from PACs
- Cash on hand
- Small-donor % (<$200 contributions)

**Source**: https://www.fec.gov/ → Search by candidate name and office

### 2. **2026 YTD Fundraising** (Q1 & Q2 reports filed by June 30)
- Total raised YTD
- Q2 ending cash (from Form 3)
- Early month-to-month trends

**Source**: Same FEC.gov portal, look for 2026 Form 3 filings

### 3. **Top 5 Corporate PAC Donors (2024)**
- PAC name, amount, industry code
- Identify company/association behind PAC
- Track repeat PACs across cycles

**Source**: 
- https://www.opensecrets.org → Search candidate by name/state
- **Note**: OpenSecrets aggregates employer/PAC data; look for "Top Donors" section
- Cross-verify with FEC "Itemized Contributions"

### 4. **AIPAC Money & Endorsements**
- Direct AIPAC contributions (2024 & 2026)
- AIPAC Super PAC support ("Libra PAC" and successor funds)
- Any public endorsements from AIPAC or affiliated groups
- Amount and date of contribution

**Source**: 
- https://www.trackpac.org/ (Track AIPAC - tracks pro-Israel PAC spending)
- https://www.opensecrets.org → Search "AIPAC" or filter by pro-Israel PACs
- Look for "pro-Israel," "Libra PAC," "NORPAC," "J Street" (counterexample, pro-Palestinian)

### 5. **Stock Trading Activity** (Incumbents only, 2024-2026)
- Date, asset description, trading action (buy/sell)
- Amount range (required by law; often reported as ranges like "$15,001–50,000")
- Any controversial timing (traded before major announcement, etc.)
- Identify patterns (tech, healthcare, defense sector tilts)

**Source**:
- House Clerk Stock Trading Disclosures: https://house.gov/stocks-etfs
  - Search by name in the database
  - Note: Transactions must be reported within 45 days; check quarterly
- Form 278-2 (Personal Financial Disclosure) archived: https://ethics.house.gov

### 6. **Endorsements & Political Alignment** (All candidates)
- Major labor unions (AFL-CIO, IBEW, etc.)
- Industry groups (U.S. Chamber, NAM, environmental PACs)
- Activist groups (MoveOn, Club for Growth, etc.)
- Political figures (party leaders, statewide politicians)
- Issue-focused groups (gun control, abortion, immigration)
- **For Republicans**: Trump endorsement status (2024 primary, 2026 primary) + any Trump ally primary losers

**Source**:
- Wikipedia election pages (e.g., https://en.wikipedia.org/wiki/2026_United_States_House_of_Representatives_elections_in_Texas)
  - Each district page lists candidate endorsements
- Candidate official websites → "Endorsements" page
- Ballotpedia.org → Candidate profiles (right-wing/left-wing endorsements listed)
- Local news outlets (often summarize major endorsements)

---

## ⚡ Quick Start: Priority Seats Research

### **26 Competitive Seats (Finish First)**

**Texas (5)**: TX-15, TX-23, TX-28, TX-34, TX-35  
**California (3)**: CA-1, CA-6, CA-13, CA-22  
**Colorado (2)**: CO-8  
**New York (4)**: NY-3, NY-17  
**Massachusetts (1)**: MA-1, MA-3, MA-9  
**Alabama (1)**: AL-1–AL-6

**Recommended Research Time Per Seat**: 30–45 minutes
- 5 minutes: Collect 2024 FEC fundraising totals
- 10 minutes: OpenSecrets top 5 corporate PAC donors
- 10 minutes: Track AIPAC and pro-Israel PAC money
- 10 minutes: Wikipedia/local news for endorsements
- 5–10 minutes: House Clerk stock trades (incumbents only)

---

## 📋 Research Workflow (Recommended)

**Phase 1: Setup (5 min)**
1. Open the template CSV in Excel or Google Sheets
2. Print/bookmark research sources above
3. Assign 5–10 competitive seats per researcher

**Phase 2: Per-Candidate Research (30–45 min)**
1. **FEC.gov search**: Enter candidate name + state + "House 2026"
   - Copy 2024 total raised, individual %, PAC %
   - Find Q1 & Q2 2026 Form 3 filing → copy year-to-date total
   - Copy cash on hand (end of Q2)

2. **OpenSecrets search**: Enter candidate name
   - Scroll to "Top Donors" section
   - List top 5 PACs by amount (2024 cycle)
   - Note industry codes if listed

3. **Track AIPAC** (trackpac.org)
   - Search candidate name
   - Copy any "pro-Israel PAC" contributions listed
   - Note dates

4. **Wikipedia election page**
   - Find state House elections page (2026 elections in [State])
   - Find your district section
   - Copy candidate endorsements listed
   - Special flag: Trump endorsement (for Republicans)

5. **House Clerk Stocks** (incumbents only)
   - Go to https://house.gov/stocks-etfs
   - Search candidate name
   - List any 2024–2026 trades (date, asset, buy/sell, amount range)

6. **Fill the CSV** with data collected

**Phase 3: Quality Check (10 min per 5 seats)**
- Verify totals match across FEC and OpenSecrets
- Cross-check PAC names (often abbreviated differently)
- Flag any missing data or errors

---

## 💾 Submission Format

**For Manual Data Collection** (if not using shared spreadsheet):
- **One row per candidate** (incumbent or major challenger)
- If races have multiple challengers, include top-funded challengers only
- Use "[INSERT]" placeholder if data unavailable
- Note data source in comments column if unusual or behind paywall

**Expected Deliverables**:
1. Completed CSV (all 26 competitive seats)
2. Brief notes on any data quality issues or conflicts
3. Links to any sources beyond those listed (if needed)

---

## 🛠️ Common Data Source Issues & Workarounds

**Problem**: "Candidate not found" on FEC.gov
- **Solution**: Try searching by last name only, or check district spelling (e.g., "TX-15" vs "TX-15th")
- **Alternative**: Go to candidate's official website → links to FEC profile there

**Problem**: OpenSecrets redirects or page won't load
- **Solution**: Use Wayback Machine (https://archive.org) to access cached version of page dated Aug 2026
- **Alternative**: Manually count individual contributions from FEC itemized data export

**Problem**: Stock trading data not showing up for representative
- **Solution**: Try full name vs. shortened name; check House Clerk database directly
- **Alternative**: Search "Representative [NAME] stock trading 2026" on Google News

**Problem**: AIPAC money not listed on Track AIPAC
- **Solution**: Search OpenSecrets for "NORPAC" "Libra PAC" and similar pro-Israel PAC names
- **Alternative**: Some AIPAC support is bundled; check if candidate received super PAC support from pro-Israel groups

---

## 📅 Timeline & Milestones

- **Week 1 (Aug 8–14)**: Research 26 competitive seats + submit for validation
- **Week 2 (Aug 15–21)**: Backfill remaining 50 Likely/Lean seats
- **Week 3 (Aug 22–28)**: Spot-check Safe seats (representative sample)
- **Delivery**: Complete 139-seat database by Aug 31, 2026

---

## 🔗 Master Resource Links

| Source | URL | Use Case |
|--------|-----|----------|
| **FEC** | https://www.fec.gov | Fundraising, PAC contributions |
| **OpenSecrets** | https://www.opensecrets.org | Top donors by industry |
| **Track AIPAC** | https://www.trackpac.org | Pro-Israel PAC tracking |
| **House Clerk Stocks** | https://house.gov/stocks-etfs | Incumbent stock trades |
| **Wikipedia 2026 House** | https://en.wikipedia.org/wiki/2026_United_States_House_of_Representatives_elections | Endorsements, district profiles |
| **Ballotpedia** | https://ballotpedia.org | Endorsement aggregation |
| **Wayback Machine** | https://archive.org | Archived candidate data |
| **Official Campaign Sites** | [Candidate websites] | Direct endorsement statements |

---

## ✅ Checklist: Quality Standards

For each row in final CSV:
- [ ] 2024 fundraising total matches FEC report
- [ ] 2026 YTD total from Q2 Form 3 filing
- [ ] Top 5 PACs verified against OpenSecrets or FEC itemized data
- [ ] AIPAC/pro-Israel PAC contributions traced to specific PAC name
- [ ] Endorsements cross-referenced to at least one source (Wikipedia or candidate site)
- [ ] Stock trades (incumbents) dated and asset-identified
- [ ] Trump endorsement status (Republicans) marked as 1=yes, 0=no
- [ ] No "generic" descriptions; specific company/PAC names used

---

## 🎯 Final Database Columns (Once Complete)

```sql
state | district | incumbent | party | category | lead_pct | 
2024_funds_raised | 2026_ytd_funds | top_pac_donors_2024 | 
top_industry_2024 | aipac_endorsement | aipac_money_2024 | 
aipac_money_2026 | stock_trades_2024_2026 | primary_loss_info | 
trump_endorsed | challenger_name | challenger_party | 
challenger_funds_2026 | challenger_endorsements | notes
```

---

**Questions?** Check the Wikipedia pages first—they have the most reliable summaries of candidate backgrounds and endorsements.

**Data Privacy Note**: All information collected is from public FEC filings, House Clerk disclosures, and publicly announced endorsements. No private financial or personal data.
