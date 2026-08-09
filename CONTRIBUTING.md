# Contributing to House 2026 Elections Tracker

Thank you for your interest in contributing! This project thrives on community input to maintain accuracy and completeness.

## Ways to Contribute

### 1. Data Verification & Corrections

**Report Errors**: Found a candidate name mistake or electoral classification issue?
- Open an issue on GitHub with:
  - Seat identifier (State-District, e.g., CA-7)
  - Specific error (incumbent name, challenger name, category)
  - Corrected information with source link (Wikipedia, FEC, etc.)

**Verify Pending Data**: Help complete the 156 remaining candidates names
- Check `/database/race_candidates.csv` for "Challenger TBD" entries
- Look up Wikipedia 2026 House elections page for your state
- Submit verified names via pull request (see below)

### 2. Data Backfill: PAC/AIPAC/Fundraising

**PAC Donor Extraction**:
- Select candidates from `/database/race_candidates.csv` (focus on competitive seats first)
- Visit OpenSecrets.org candidate profile
- Extract top 5 corporate PAC donors and industry breakdown
- Submit via pull request with format:
  ```
  UPDATE race_candidates 
  SET corporate_pac_money = 'Finance $X | Real Estate $Y | Healthcare $Z | ...'
  WHERE state = 'XX' AND district = 'N' AND candidate = 'Name';
  ```

**AIPAC Contributions**:
- Visit Track AIPAC (trackaipac.org)
- Search candidate name
- Record direct PAC contributions + Super PAC support
- Submit via pull request

**Fundraising Breakdown**:
- Visit FEC.gov and search candidate committee
- Extract Form C data (total receipts, PAC vs. individual contributions, transfers)
- Add to `funds` column with format: "Total: $X | Individual: $Y | PAC: $Z | Self-funded: $W"

### 3. Stock Trading Analysis (Incumbents)

**House Clerk Data Collection**:
- Visit https://disclosures-clerk.house.gov
- Search incumbent name
- Pull 2024-2026 Periodic Transaction Reports (PTRs)
- Summarize trading patterns (top holdings, timing correlations, etc.)
- Submit findings in pull request with source links

### 4. Analysis & Visualization Scripts

**Write Python/SQL Analysis**:
- Competitive race summaries (Tossup + Lean breakdown by state)
- PAC influence analysis (top donors by party, industry concentration)
- Trump endorsement impact analysis (endorsed R candidates' performance)
- Electoral projection confidence intervals

**Visualizations**:
- 7-category seat distribution maps (by state)
- PAC money heatmaps (top donors per district)
- Competitive race dashboard (Tableau, D3.js, etc.)

Submit as Python scripts or Jupyter notebooks in `/analysis/` directory.

### 5. Documentation Improvements

- Clarify existing docs (METHODOLOGY.md, DATA_SOURCES.md)
- Add "How-To" guides for using the dataset
- Improve data dictionary / column explanations
- Add FAQ section

## Submission Guidelines

### Pull Requests

1. **Fork the repository** on GitHub
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/add-pac-data-2026
   git checkout -b fix/co5-candidate-name
   ```

3. **Make changes**:
   - For data corrections: Edit `/database/race_candidates.csv` or insert SQL statements
   - For new analysis: Add Python scripts to `/analysis/`
   - For docs: Edit markdown files in `/docs/`

4. **Commit with clear messages**:
   ```bash
   git commit -m "Add PAC data for CA competitive seats (14 candidates)"
   git commit -m "Fix: TX-2 challenger name (verified via Wikipedia)"
   git commit -m "Add: Trump endorsement analysis script"
   ```

5. **Push and create pull request**:
   ```bash
   git push origin feature/add-pac-data-2026
   ```

6. **PR Description**: Include:
   - What data/changes added
   - Sources (URLs to Wikipedia, FEC, OpenSecrets, etc.)
   - Number of records updated
   - Any caveats or questions

### Data Quality Checklist

Before submitting:

- [ ] Data is from a public, verifiable source
- [ ] Sources are cited (URLs, document links)
- [ ] Candidate names match Wikipedia/FEC exactly
- [ ] District numbers are correct (0 for at-large)
- [ ] Party affiliations match official records (D/R/I)
- [ ] Monetary amounts are in consistent format ($X.XM or exact dollars)
- [ ] No personally identifiable information beyond what's already public
- [ ] All external links are valid and current

## Priorities for Contribution

### High Priority (Core Dataset)
1. ✅ Complete remaining 156 challenger names (safe seats)
2. 🔄 PAC donor data for 126 competitive seats
3. 🔄 AIPAC contributions for candidates with pro-Israel support
4. 🔄 Fundraising breakdown (2024 & 2026) for all candidates

### Medium Priority (Enhanced Analysis)
5. 📅 Stock trading analysis (House Clerk data for incumbents)
6. 📅 Trump endorsement verification and impact scoring
7. 📅 Detailed endorsement cascades (politician-level, activist-level)
8. 📅 Analysis scripts (Python/SQL)

### Lower Priority (Optional/Advanced)
9. 🎯 Visualizations and dashboards
10. 🎯 Historical comparison (2022 vs. 2026 competitiveness)
11. 🎯 Demographic breakdowns per district
12. 🎯 Automated data update pipelines

## Coding Standards

### SQL Data Updates
```sql
-- Include state/district/candidate identifier clearly
UPDATE race_candidates 
SET corporate_pac_money = '[Industry breakdown]'
WHERE state = 'CA' AND district = '5' AND candidate = 'John Smith';

-- Document sources in commit message
```

### Python Analysis Scripts
- Use Python 3.8+
- Include docstrings and comments
- Follow PEP 8 style guidelines
- Add requirements.txt if external packages needed
- Include example output/visualization

### CSV Format
- UTF-8 encoding
- Comma-delimited
- Quote fields containing commas
- No trailing newlines

## Questions & Support

- **Have questions?** Open a discussion on GitHub
- **Found a bug?** File an issue with reproduction steps
- **Want to discuss changes?** Start a discussion before making major changes

## License

By contributing, you agree that your contributions will be licensed under the same CC-BY-4.0 (data) / MIT (code) licenses as this project.

---

**Thank you for contributing!** 🙏 Your help makes this resource more valuable for researchers, journalists, and election analysts.
