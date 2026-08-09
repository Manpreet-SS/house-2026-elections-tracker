# 2026 House Race Campaign Finance Research Guide
## 11 Competitive Candidates - Data Collection Framework

---

## CANDIDATES ROSTER (12 total)

### Texas Races (6 candidates)
- **TX-15**: Monica de la Cruz (R, incumbent)
- **TX-23**: Tony Gonzales (R, retiring incumbent)
- **TX-28**: Henry Cuellar (D, incumbent)
- **TX-34**: Vicente Gonzalez (D, incumbent)
- **TX-35**: Greg Casar (D, retiring incumbent)

### California Races (4 candidates)
- **CA-1**: Doris Matsui (D, incumbent) + Kevin Kiley (R, challenger)
- **CA-13**: John Duarte (R, incumbent)
- **CA-22**: Jim Costa (D, incumbent)

### New York Races (2 candidates)
- **NY-3**: George Latimer (D, incumbent)
- **NY-17**: Mike Lawler (R, incumbent)

---

## DATA POINTS TO COLLECT (Per Candidate)

### 1. TOP 5 CORPORATE PAC DONORS (2024 Cycle + 2026 YTD)

**Primary Source: OpenSecrets.org**
- URL Pattern: `https://www.opensecrets.org/political-action-committees-pacs/top-recipients?top_n=100`
- OR Search by candidate: Go to OpenSecrets homepage → Search candidate name → Click "Donor Search"
- Click "View by contribution level" or "Top PAC Donors"

**Data to Record:**
```
Rank | PAC Name | Amount | Industry Code | 2024/2026 YTD
-----|----------|--------|----------------|-------------
  1. | [PAC]    | $XXX   | [Code]        | [Cycle]
  2. | [PAC]    | $XXX   | [Code]        | [Cycle]
  3. | [PAC]    | $XXX   | [Code]        | [Cycle]
  4. | [PAC]    | $XXX   | [Code]        | [Cycle]
  5. | [PAC]    | $XXX   | [Code]        | [Cycle]
```

**Backup Source (FEC):**
- URL: `https://www.fec.gov/data/receipts/?data_type=processed&committee_id=[COMMITTEE_ID]&two_year_transaction_period=2026`
- Find Committee ID: https://www.fec.gov/data/committees/
- Look for PAC contributions with amounts >$500

---

### 2. AIPAC MONEY & ENDORSEMENTS

**Primary Source: Track AIPAC (trackpac.org)**
- URL: `https://trackpac.org/` or `https://trackerpac.com/`
- Search feature for candidate name → View contributions and endorsement status

**Data to Record:**
```
AIPAC Contributions (2024): $XXX
AIPAC Super PAC Support (2024): Yes/No | Amount: $XXX
Official AIPAC Endorsement (2024): Yes/No
Vote Grade on Pro-Israel Issues: [Letter Grade]
```

**Secondary Sources:**
- AIPAC Official: `https://www.aipac.org/` → Search endorsements/contributions
- Citizens Against AIPAC Corruption: Check their candidate ratings
- House member votes on Israel-related resolutions: `https://clerk.house.gov/evs/` (search bills)

---

### 3. STOCK TRADING ACTIVITY (Incumbents Only)

**Primary Source: House Clerk Financial Disclosures**
- URL: `https://clerk.house.gov/publications/financial-disclosure/`
- Alternative: `https://disclosures-clerk.house.gov/public_disc/financial-search.aspx`
- Search for member name → Download most recent FORM 278 (Personal Financial Disclosure)

**Data to Record:**
```
Trade Date | Asset Name | Type (Stock/ETF/Fund) | Amount Range | Transaction Type
-----------|-----------|----------------------|---------------|------------------
[Date]     | [Asset]   | [Type]               | [Range]       | Buy/Sell/Exchange

Flag any trades in:
- Defense contractors (Raytheon, Lockheed, General Dynamics)
- Healthcare companies before/after relevant legislation
- Financial institutions
- Energy companies
- Tech firms related to regulation
```

**Supplementary Source: House Stock Watcher Database**
- URL: `https://housestockwatcher.com/` (if accessible)
- Alternative: `https://insider.fintweets.com/` (tracks member trades)
- Search member name for 2024-2026 transaction history

---

### 4. 2024 FUNDRAISING BREAKDOWN

**Primary Source: OpenSecrets**
- Candidate page → "2024 Election Summary" tab
- Record the following metrics:

```
Total Raised (2024):           $XXX,XXX
Cash on Hand (End of 2024):    $XXX,XXX
Total Spent:                   $XXX,XXX
Remaining Debt:                $XXX,XXX

FUNDING SOURCE BREAKDOWN:
├─ Individual Contributions:    $XXX,XXX (XX%)
├─ PAC Contributions:           $XXX,XXX (XX%)
├─ Self-Funding:                $XXX,XXX (XX%)
├─ Transfers from Other Cmtees: $XXX,XXX (XX%)
└─ Other:                       $XXX,XXX (XX%)

INDIVIDUAL DONOR BREAKDOWN:
├─ Small Donors (<$200):        $XXX,XXX (XX% of individual funds)
├─ Large Donors (>$200):        $XXX,XXX (XX% of individual funds)
└─ Mega Donors (>$10,000):      [COUNT] donors, $XXX,XXX total
```

**Secondary Source: FEC Itemized Receipts**
- URL: `https://www.fec.gov/data/receipts/`
- Filter: Candidate Name + 2-year period: 2023-2024
- Download CSV for detailed breakdown
- Sort by contribution amount to identify top individual donors

---

### 5. 2026 FUNDRAISING YTD (If Available)

**Primary Source: FEC - Most Recent Quarterly Reports**
- URL: `https://www.fec.gov/data/candidates/`
- Search candidate name → Click on candidate ID
- Look for most recent FEC Form 3 filing (updated quarterly)

**Data to Record:**
```
Latest Quarter (Q[X] 202X):
├─ Total Raised (QTD):          $XXX,XXX
├─ Total Raised (YTD):          $XXX,XXX
├─ Cash on Hand (end of Q):     $XXX,XXX
├─ New PAC Contributions:       $XXX,XXX
├─ New Individual Contributions:$XXX,XXX
└─ Last Updated:                [Filing Date]

COMPARISON TO 2024 SAME QUARTER:
├─ Pace vs 2024 same period:    [Faster/Slower] by X%
└─ Cash position vs 2024:       $XXX,XXX [Better/Worse]
```

**Filing Schedule:**
- Q1 2026: Due April 15, 2026
- Q2 2026: Due July 15, 2026
- Special Elections: File 12 days before election

---

## RESEARCH WORKFLOW

### Step 1: Establish Baseline (30 min per candidate)
1. Go to `opensecrets.org` → Search candidate name
2. Screenshot candidate overview page
3. Record: Total raised (2024), Top PACs, Top industries
4. Note any obvious red flags or major donors

### Step 2: Deep Dive PAC Analysis (45 min)
1. On OpenSecrets candidate page → Click "Donor Search"
2. Filter for "PACs" → Sort by amount
3. Copy top 5 PACs with amounts
4. For each PAC, note the industry code (shown on OpenSecrets)
5. Cross-check on FEC database: `https://www.fec.gov/data/pac-lookup/`

### Step 3: AIPAC Research (20 min)
1. Visit `trackpac.org` → Use search function
2. Look for candidate in database
3. Note: Endorsements, contributions, grades
4. Check House voting record on Israel-related bills

### Step 4: Stock Trading (15 min - Incumbents Only)
1. Go to `https://clerk.house.gov/publications/financial-disclosure/`
2. Search member name → Download latest Form 278
3. Scan recent trades (2024-2026)
4. Note dates, asset names, transaction types
5. Flag controversial trades

### Step 5: Fundraising Details (30 min)
1. OpenSecrets: Record 2024 total, breakdown by source
2. FEC: `https://www.fec.gov/data/receipts/` → Filter by candidate
3. Download 2024 itemized receipts (CSV)
4. Analyze: small donor %, mega donors, individual vs PAC ratio

### Step 6: 2026 YTD (15 min - When Available)
1. FEC candidate search → Most recent Form 3
2. Record YTD totals
3. Compare to 2024 same quarter
4. Note: Some candidates may not have filed 2026 reports yet

---

## OPENSECRETS NAVIGATION GUIDE

**Home**: `https://www.opensecrets.org/`

**Finding Candidates:**
1. Top menu → "Elections" → Select State → Select Office (House)
2. OR Use search box → Enter name

**Candidate Page Structure:**
- Overview (top donors, total raised, cash on hand)
- 2024 Election Summary (detailed breakdown)
- Donor Search (by individual, by PAC)
- Industries (top contributing sectors)
- Voting Record (if applicable)
- Personal Financial Disclosures (if available)

**Key Reports:**
- "Top PAC Recipients" sorted by industry
- "2024 Cycle Summary" with pie charts
- "Top Donors" section with donor profiles
- "Industries" showing sector breakdown

---

## FEC NAVIGATION GUIDE

**Home**: `https://www.fec.gov/`

**Direct Candidate Search**: `https://www.fec.gov/data/candidates/`

**To Find 2024 Receipts:**
1. Search candidate name
2. Click on correct candidate ID
3. Under "Contributions" → Click "Receipts"
4. Filter: Date range, contribution type
5. Export as CSV for analysis

**Committee ID Format:**
- House candidates usually have IDs like: H2TX12345 (H = House, 2 = 2-year cycle, etc.)

**Form Types:**
- Form 3: Report of Receipts and Disbursements (filed quarterly)
- Form 3A: Amended version
- Itemized Receipts: Individual contribution details (>$200)

---

## TRACK AIPAC NAVIGATION GUIDE

**Home**: `https://trackpac.org/` (or `https://trackerpac.com/`)

**Search Features:**
- Candidate search by name
- District/state filter
- Campaign cycle selection
- Contribution amount filter

**Data Available:**
- AIPAC contributions (direct)
- Super PAC support (indirect)
- Endorsement status
- Vote ratings on pro-Israel issues
- Historical comparison across cycles

**Alternative AIPAC Data:**
- AIPAC official: `https://www.aipac.org/` → Action Center
- FEC database: Search for "AIPAC Super PAC" or "NORPAC"
- Ballotpedia: Search candidate name + "AIPAC"

---

## HOUSE STOCK TRADING DISCLOSURE GUIDE

**Official Disclosures**: `https://clerk.house.gov/publications/financial-disclosure/`

**Advanced Search**: `https://disclosures-clerk.house.gov/public_disc/financial-search.aspx`

**Document Type:**
- Form 278: Annual Financial Disclosure
- Transactions section shows:
  - Trade date
  - Asset name
  - Transaction type (Buy/Sell/Exchange)
  - Value range (no exact amounts required)

**Finding Recent Trades:**
1. Search member name
2. Download most recent disclosure form
3. Look for "Transactions" section
4. Record trades from 2024-2026

**Red Flags to Note:**
- Trades right before legislation affects that sector
- Large positions in companies with government contracts
- Sales during market downturns
- Purchases before major announcements

---

## DATA COLLECTION TEMPLATE

### Individual Candidate Spreadsheet

```
CANDIDATE: [Name]
DISTRICT: [State-#]
PARTY: [R/D]
INCUMBENT: [Yes/No]
STATUS: [Running/Retiring]

═══════════════════════════════════════════════════════════

1. TOP 5 PAC DONORS (2024 CYCLE)
   Rank | PAC Name | Amount | Industry | URL
   -----|----------|--------|----------|----
    1.  | [PAC]    | $XXX   | [Code]   | [OpenSecrets link]
    2.  | [PAC]    | $XXX   | [Code]   | [OpenSecrets link]
    3.  | [PAC]    | $XXX   | [Code]   | [OpenSecrets link]
    4.  | [PAC]    | $XXX   | [Code]   | [OpenSecrets link]
    5.  | [PAC]    | $XXX   | [Code]   | [OpenSecrets link]

2. TOP 5 PAC DONORS (2026 YTD - If Available)
   [Same structure as above]

3. AIPAC INFORMATION
   Organization: AIPAC / Super PAC
   Contributions (2024): $XXX
   Endorsement Status: [Yes/No/Unclear]
   Support Level: [Strong/Moderate/None]
   Notes: [Any special status or ratings]
   
   Data Source URL: [trackpac.org link]

4. STOCK TRADING (If Incumbent)
   Total Trades 2024-2026: [#]
   
   Recent Trades:
   Date       | Asset | Type | Value Range | Transaction
   -----------|-------|------|-------------|-------------
   [Date]     | [Name]| Stock| $[Range]    | Buy/Sell
   [Date]     | [Name]| ETF  | $[Range]    | Buy/Sell
   
   Red Flags: [Any notable timing or patterns]
   Disclosure URL: [clerk.house.gov link]

5. 2024 FUNDRAISING BREAKDOWN
   Total Raised: $XXX,XXX
   Cash on Hand (12/31/24): $XXX,XXX
   Total Spent: $XXX,XXX
   
   Source Breakdown:
   ├─ Individual Contributions: $XXX,XXX (XX%)
   ├─ PAC Contributions: $XXX,XXX (XX%)
   ├─ Self-Funding: $XXX,XXX (XX%)
   ├─ Transfers: $XXX,XXX (XX%)
   └─ Other: $XXX,XXX (XX%)
   
   Individual Donor Breakdown:
   ├─ Small Donors (<$200): $XXX,XXX (XX%)
   ├─ Large Donors ($200-$10k): $XXX,XXX (XX%)
   └─ Mega Donors (>$10k): [#] donors / $XXX,XXX total
   
   OpenSecrets Summary URL: [direct link]

6. 2026 FUNDRAISING YTD
   Latest Reporting Period: Q[#] 2026
   Total Raised YTD: $XXX,XXX
   Cash on Hand: $XXX,XXX
   
   YTD Breakdown:
   ├─ Individual Contributions: $XXX,XXX
   ├─ PAC Contributions: $XXX,XXX
   └─ Other: $XXX,XXX
   
   Comparison to 2024 Same Period:
   ├─ Dollar Pace: [X% Faster/Slower]
   └─ Cash Position: [Better/Worse]
   
   FEC Form 3 URL: [direct link]

═══════════════════════════════════════════════════════════
NOTES & OBSERVATIONS:
[Key findings, unusual patterns, notable donors, etc.]

═══════════════════════════════════════════════════════════
DATA SOURCES CONSULTED:
☐ OpenSecrets (2024)
☐ OpenSecrets (2026 YTD)
☐ FEC Database
☐ Track AIPAC
☐ House Stock Trading
☐ Other: [specify]

Last Updated: [Date]
Researcher: [Name]
```

---

## KEY RESEARCH TIPS

### Time Estimates
- **Per Candidate Total**: 2-3 hours (for complete data)
- **11 Candidates Total**: 22-33 hours (or 4-5 days full-time)
- **Expedited (2024 cycle only)**: 10-15 hours total

### Cross-Checking Data
- **OpenSecrets vs FEC**: Discrepancies = OpenSecrets may be lagging
- **FEC is authoritative** for official campaign finance data
- **Track AIPAC** specializes in AIPAC data (may be more current)
- **House Clerk** is authoritative for stock trading

### Potential Data Gaps
- **2026 YTD data**: Limited before April 15, 2026 (Q1 deadline)
- **Stock trading**: Retiring members may not file 2026 disclosures
- **AIPAC endorsements**: Often only announced closer to election
- **House stock trades**: Filed annually (January) + updated quarterly on transactions

### Download & Save Strategy
1. Screenshot candidate overview pages
2. Download CSV files from FEC
3. Save PDF forms (financial disclosures)
4. Create spreadsheet with all candidate data for comparison

---

## ANALYSIS QUESTIONS TO ANSWER

After collecting data, consider these analytical questions:

**PAC Analysis:**
- Which industries/sectors fund each candidate most heavily?
- Are there differences between R and D candidates by sector?
- How do retiring members' PAC funding compare to those running again?
- Do CA, TX, or NY candidates have different PAC profiles?

**AIPAC Analysis:**
- Who received AIPAC support in 2024?
- How does AIPAC support correlate with party/district?
- Are there any candidates AIPAC avoided or opposed?

**Stock Trading Analysis:**
- Do members trade before relevant legislation?
- Who has the most trading activity?
- Are there controversial timing patterns?

**Fundraising Analysis:**
- Who has the strongest small-donor base?
- Which candidates self-funded significantly?
- How does 2026 YTD pace compare to 2024?
- Who has the largest cash advantages?

**2026 Outlook:**
- Based on 2026 YTD data (when available), who's ahead in fundraising?
- Which candidates might face funding challenges?
- Are any candidates' funding patterns changing significantly from 2024?

---

## CONTACT & ATTRIBUTION

**Source Citations Format:**
```
- OpenSecrets.org - Campaign Finance for [Candidate Name]
  URL: https://www.opensecrets.org/[candidate-path]
  Accessed: [Date]
  
- Federal Election Commission (FEC) - [Candidate Name] 
  URL: https://www.fec.gov/data/candidates/
  Form 3 Filing Date: [Date]
  
- Track AIPAC - Campaign Finance Database
  URL: https://trackpac.org/
  Accessed: [Date]
  
- House Clerk - Financial Disclosures of Members of Congress
  URL: https://clerk.house.gov/publications/financial-disclosure/
  Form 278 Date: [Date]
```

---

## STATUS TRACKING

As you complete research on each candidate, mark below:

```
TX-15: Monica de la Cruz
├─ PACs (2024): ☐ Complete ☐ In Progress
├─ PACs (2026): ☐ Complete ☐ In Progress
├─ AIPAC: ☐ Complete ☐ In Progress
├─ Stock Trading: ☐ Complete ☐ In Progress
├─ Fundraising 2024: ☐ Complete ☐ In Progress
└─ Fundraising 2026: ☐ Complete ☐ In Progress

[Repeat for all 11 candidates]
```

---

**Total Candidates**: 12 (including Doris Matsui + Kevin Kiley in CA-1)  
**Data Categories**: 5 per candidate  
**Estimated Completion**: 20-30 hours with systematic approach  
**Best Approach**: Use a team (2-3 researchers) for parallel research
