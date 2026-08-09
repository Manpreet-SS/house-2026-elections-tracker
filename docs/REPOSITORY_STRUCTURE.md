# Repository Structure: House 2026 Elections Tracker

This document describes the organization and contents of the House 2026 Elections Tracker repository.

## Directory Layout

```
house-2026-elections-tracker/
├── README.md                          # Main documentation and feature overview
├── CONTRIBUTING.md                    # Contributing guidelines for collaboration
├── LICENSE                            # Dual license (CC-BY-4.0 data + MIT code)
├── REPOSITORY_STRUCTURE.md            # This file
├── .gitignore                         # Git exclusion rules
│
├── database/
│   ├── schema.sql                     # SQL table definitions for SQLite/PostgreSQL
│   ├── race_seats.csv                 # 435 House seats with electoral classifications
│   └── race_candidates.csv            # 668+ candidates (81% complete)
│
├── docs/
│   ├── METHODOLOGY.md                 # Electoral classification system and data collection approach
│   ├── DATA_SOURCES.md                # Comprehensive source documentation with links
│   └── CONTRIBUTING.md                # (link to main CONTRIBUTING.md)
│
└── analysis/
    ├── sample_queries.sql             # 20 ready-to-use SQL analysis queries
    ├── competitive_races.py           # (Placeholder for Python analysis script)
    └── visualizations/                # (Placeholder for charts and dashboards)
```

## File Descriptions

### Root Files

**README.md** (8.4 KB)
- Main repository documentation
- Feature list and dataset overview
- Electoral classification table
- Data structure explanation
- How to use examples
- Limitations and known issues
- Roadmap for future development

**CONTRIBUTING.md** (6.0 KB)
- Ways to contribute (data verification, backfill, analysis)
- Submission guidelines and pull request process
- Data quality checklist
- Priority tasks for contributors

**LICENSE** (2.8 KB)
- Dual licensing: CC-BY-4.0 (data) + MIT (code)
- Attribution requirements
- Full license text and summaries

**.gitignore** (675 B)
- Excludes database files, Python cache, IDEs, temporary files
- Protects sensitive research artifacts

### Database Files (`/database/`)

**schema.sql** (44 lines)
- Complete SQL table definitions:
  - `race_seats`: 435 rows (all House districts)
  - `race_candidates`: 668+ rows (incumbents + challengers)
- Column definitions, primary keys, foreign keys
- Index definitions for fast queries

**race_seats.csv** (To be generated)
- 435 House seats across 50 states
- Columns: state, district, incumbent, party, category, notes
- Electoral categories: Safe D/R, Likely D/R, Lean D/R, Tilt D/R, Tossup
- Ready for import into Excel, Tableau, or analysis tools

**race_candidates.csv** (To be generated)
- 668+ candidate records (81% complete; 156 TBD)
- Columns: state, district, candidate, party, role, endorsements, funds, trump_endorsed, primary_lost, URLs, PAC money, AIPAC, stock trading, additional_info
- Covers 389 incumbents (100%) + 324 challengers (81.8%)

### Documentation Files (`/docs/`)

**METHODOLOGY.md** (2,000+ lines)
- Electoral classification thresholds (Safe >±12.5%, Likely ±8-12.5%, Lean ±5-8%, Tilt ±2.5-5%, Tossup <±2.5%)
- Decimal precision importance (why CO-5 at 2.3% = Tossup)
- Data collection methodology:
  - Incumbent data sources (House.gov, FEC, OpenSecrets)
  - Challenger data sources (Wikipedia, AP, state elections)
  - Endorsement tracking (party backing, Trump endorsements, Super PAC)
  - Campaign finance collection (FEC, OpenSecrets, Track AIPAC)
  - Stock trading data (House Clerk disclosures)
- Known data gaps and quality assurance checklist
- Reproducibility guide

**DATA_SOURCES.md** (1,500+ lines)
- Comprehensive source listing:
  - Electoral projections (Race to WH, Kalshi, polling aggregators)
  - Primary results (Wikipedia, AP, state databases)
  - Campaign finance (FEC.gov, OpenSecrets, Track AIPAC)
  - Incumbent info (House.gov, House Clerk stock disclosures)
  - Endorsements (DCCC, NRCC, Trump, Super PACs)
- Access notes and attribution requirements
- Data update schedule
- Terms of use for each source

### Analysis Files (`/analysis/`)

**sample_queries.sql** (400+ lines)
- 20 ready-to-run SQL queries for common analyses:
  1. National summary (seats by category)
  2. State-by-state breakdown
  3. Competitive races query
  4. Competitive seats per state
  5. Trump-endorsed GOP candidates in competitive races
  6. Republican incumbents who lost primaries
  7. Competitive races missing data
  8. California same-party matchups
  9. Incumbent vs. challenger fundraising
  10. Data completeness report
  11-20. Additional district research, trend analysis, endorsement analysis, quality checks

**competitive_races.py** (Placeholder)
- Intended for Python analysis of Tossup/Lean races
- Planned: Data visualization, statistical analysis, comparison with 2022

**visualizations/** (Placeholder)
- Directory for charts, maps, dashboards
- Planned: Electoral maps, PAC influence heatmaps, funding comparisons

## Data Status Summary

### Completion Rate (August 9, 2026)

| Component | Status | Count | Percentage |
|-----------|--------|-------|-----------|
| House seats classified | ✅ Complete | 435/435 | 100% |
| Incumbent data | ✅ Complete | 389/389 | 100% |
| Challenger names | 🔄 In Progress | 324/433 | 74.8% |
| Total candidates named | 🔄 In Progress | 668/824 | 81.1% |
| PAC donor data | 📋 Planned | — | 0% |
| AIPAC contributions | 📋 Planned | — | 0% |
| Stock trading data | 📋 Planned | — | 0% |
| Detailed endorsements | 📋 Planned | — | 0% |

### Known Data Gaps

**156 Challenger Names TBD (18.9%)**
- Primarily in safe seats (lower research priority)
- Florida 15 GOP nominees pending Aug 18 primary
- Will be backfilled post-primary

**PAC/AIPAC Money Backfill**
- Framework structure ready
- Requires manual extraction from OpenSecrets, FEC, Track AIPAC
- 126 competitive seats prioritized first

**Stock Trading Data**
- House Clerk raw data requires scraping
- Skeleton structure ready for 389 incumbents
- Estimated 2-3 days for full population

## How to Use This Repository

### For Researchers / Data Analysts
1. Clone the repository
2. Import `/database/schema.sql` into SQLite or PostgreSQL
3. Load CSV files into respective tables
4. Use queries from `/analysis/sample_queries.sql`

### For Journalists / Campaign Analysts
1. Review README.md for overview
2. Export competitive races (Tossup/Lean) via SQL query
3. Research individual races using candidate profiles
4. Reference DATA_SOURCES.md for original sources

### For Contributors
1. Read CONTRIBUTING.md for guidelines
2. Select a contribution task (candidate names, PAC data, etc.)
3. Fork repository, make changes, submit pull request
4. Follow data quality checklist before submitting

## Technology Stack

- **Database**: SQLite (portable, no server required)
- **Data Format**: CSV (accessible), JSON (planned)
- **Analysis**: SQL, Python (pandas, matplotlib)
- **Documentation**: Markdown
- **Version Control**: Git + GitHub
- **License**: CC-BY-4.0 (data) + MIT (code)

## Next Steps (Roadmap)

### Immediate (Days 1-3)
- ✅ Complete repository structure
- 📋 Export database to CSV files
- 📋 Initialize Git repository
- 📋 Create first GitHub release with README

### Short-term (Days 4-7)
- 📋 PAC donor backfill (126 competitive seats)
- 📋 Trump endorsement verification
- 📋 Detailed endorsements for competitive races

### Medium-term (Weeks 2-4)
- 📋 Complete remaining 156 challenger names
- 📋 Stock trading analysis (incumbents)
- 📋 Python analysis scripts

### Long-term (Ongoing)
- 📋 Automated FEC data updates
- 📋 Post-election 2026 results integration
- 📋  2028 cycle preparation
- 📋 Historical comparison (2022 vs. 2026)

## Questions & Support

- **Technical issues**: Open GitHub issue
- **Data questions**: Check DATA_SOURCES.md or METHODOLOGY.md
- **Contributing questions**: See CONTRIBUTING.md
- **License questions**: See LICENSE file

---

**Repository Created**: August 9, 2026  
**Data Current As Of**: August 8, 2026  
**Methodology Version**: 1.0  
**Database Version**: 1.0
