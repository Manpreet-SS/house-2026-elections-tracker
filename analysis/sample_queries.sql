-- House 2026 Elections Tracker - Sample SQL Queries
-- Use these queries to analyze the 2026 House elections dataset

-- ============================================================================
-- DISTRIBUTION & SUMMARY QUERIES
-- ============================================================================

-- 1. National summary: How many seats in each electoral category?
SELECT 
  category,
  COUNT(*) as seat_count,
  ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM race_seats), 2) as percentage
FROM race_seats
GROUP BY category
ORDER BY 
  CASE category
    WHEN 'Safe Democrat' THEN 1
    WHEN 'Likely Democrat' THEN 2
    WHEN 'Lean Democrat' THEN 3
    WHEN 'Tilt Democrat' THEN 4
    WHEN 'Tossup' THEN 5
    WHEN 'Tilt Republican' THEN 6
    WHEN 'Lean Republican' THEN 7
    WHEN 'Likely Republican' THEN 8
    WHEN 'Safe Republican' THEN 9
  END;

-- 2. State-by-state breakdown: Electoral categories per state
SELECT 
  state,
  category,
  COUNT(*) as count
FROM race_seats
GROUP BY state, category
ORDER BY state, 
  CASE category
    WHEN 'Safe Democrat' THEN 1
    WHEN 'Likely Democrat' THEN 2
    WHEN 'Lean Democrat' THEN 3
    WHEN 'Tilt Democrat' THEN 4
    WHEN 'Tossup' THEN 5
    WHEN 'Tilt Republican' THEN 6
    WHEN 'Lean Republican' THEN 7
    WHEN 'Likely Republican' THEN 8
    WHEN 'Safe Republican' THEN 9
  END;

-- 3. Competitive races: All Tossup, Tilt, and Lean seats
SELECT 
  state, 
  district, 
  incumbent,
  party,
  category
FROM race_seats
WHERE category IN ('Tossup', 'Tilt Democrat', 'Tilt Republican', 'Lean Democrat', 'Lean Republican')
ORDER BY state, CAST(district AS INTEGER);

-- 4. Count of competitive seats by state (Tossup + Lean/Tilt)
SELECT 
  state,
  COUNT(*) as competitive_seats,
  SUM(CASE WHEN category = 'Tossup' THEN 1 ELSE 0 END) as tossups,
  SUM(CASE WHEN category LIKE 'Tilt%' THEN 1 ELSE 0 END) as tilts,
  SUM(CASE WHEN category LIKE 'Lean%' THEN 1 ELSE 0 END) as leans
FROM race_seats
WHERE category IN ('Tossup', 'Tilt Democrat', 'Tilt Republican', 'Lean Democrat', 'Lean Republican')
GROUP BY state
ORDER BY competitive_seats DESC;

-- ============================================================================
-- CANDIDATE QUERIES
-- ============================================================================

-- 5. Find all Trump-endorsed Republican candidates in competitive races
SELECT 
  c.state,
  c.district,
  c.candidate,
  c.party,
  s.category,
  c.trump_endorsed,
  c.endorsements
FROM race_candidates c
JOIN race_seats s ON c.state = s.state AND c.district = s.district
WHERE c.party = 'Republican'
  AND c.trump_endorsed = 1
  AND s.category IN ('Tossup', 'Tilt Republican', 'Lean Republican')
  AND c.role = 'candidate'
ORDER BY c.state, CAST(c.district AS INTEGER);

-- 6. Identify Republican incumbents who lost primaries (primary_lost = 1)
SELECT 
  c.state,
  c.district,
  c.candidate,
  c.primary_lost,
  s.category,
  c.endorsements,
  c.additional_info
FROM race_candidates c
JOIN race_seats s ON c.state = s.state AND c.district = s.district
WHERE c.role = 'incumbent'
  AND c.party = 'Republican'
  AND c.primary_lost = 1
ORDER BY c.state, CAST(c.district AS INTEGER);

-- 7. Competitive races missing candidate data
SELECT 
  s.state,
  s.district,
  s.incumbent,
  s.party,
  s.category,
  COUNT(c.candidate) as candidates_recorded,
  GROUP_CONCAT(c.candidate, ' | ') as candidate_list
FROM race_seats s
LEFT JOIN race_candidates c ON s.state = c.state AND s.district = c.district
WHERE s.category IN ('Tossup', 'Tilt Democrat', 'Tilt Republican', 'Lean Democrat', 'Lean Republican')
GROUP BY s.state, s.district
HAVING candidates_recorded < 2
ORDER BY s.state, CAST(s.district AS INTEGER);

-- 8. Find seats where both candidates are Democrats (California top-two system)
SELECT 
  s.state,
  s.district,
  s.category,
  GROUP_CONCAT(c.candidate || ' (' || c.role || ')', ' vs. ') as matchup
FROM race_seats s
LEFT JOIN race_candidates c ON s.state = c.state AND s.district = c.district
WHERE s.party = 'Democrat'
  AND s.category = 'Safe Democrat'
GROUP BY s.state, s.district
HAVING COUNT(DISTINCT CASE WHEN c.party = 'Democrat' THEN 1 ELSE NULL END) >= 2;

-- ============================================================================
-- FINANCIAL ANALYSIS (When PAC data is populated)
-- ============================================================================

-- 9. Compare fundraising between incumbents and challengers in competitive races
SELECT 
  s.state,
  s.district,
  MAX(CASE WHEN c.role = 'incumbent' THEN c.candidate END) as incumbent,
  MAX(CASE WHEN c.role = 'candidate' THEN c.candidate END) as challenger,
  s.category
FROM race_candidates c
JOIN race_seats s ON c.state = s.state AND c.district = s.district
WHERE s.category IN ('Tossup', 'Tilt Democrat', 'Tilt Republican', 'Lean Democrat', 'Lean Republican')
GROUP BY s.state, s.district
ORDER BY s.state, CAST(s.district AS INTEGER);

-- 10. Identify seats where data is incomplete (ready for backfill)
SELECT 
  'Corporate PAC' as data_type,
  COUNT(*) as records_missing
FROM race_candidates
WHERE corporate_pac_money IS NULL OR corporate_pac_money = ''
UNION ALL
SELECT 
  'AIPAC/Pro-Israel PAC',
  COUNT(*)
FROM race_candidates
WHERE aipac_money IS NULL OR aipac_money = ''
UNION ALL
SELECT 
  'Stock Trading',
  COUNT(*)
FROM race_candidates
WHERE stock_trading_notes IS NULL OR stock_trading_notes = '';

-- ============================================================================
-- DISTRICT RESEARCH QUERIES
-- ============================================================================

-- 11. Get all details for a specific district (example: CA-5)
SELECT 
  c.*,
  s.category
FROM race_candidates c
JOIN race_seats s ON c.state = s.state AND c.district = s.district
WHERE c.state = 'CA' AND c.district = '5'
ORDER BY 
  CASE c.role WHEN 'incumbent' THEN 1 ELSE 2 END;

-- 12. Open seats (where incumbent is retiring or running for other office)
SELECT 
  s.state,
  s.district,
  s.incumbent,
  s.party,
  s.category,
  s.notes
FROM race_seats s
WHERE s.incumbent LIKE '%retired%' 
  OR s.incumbent LIKE '%running%'
  OR s.notes LIKE '%open%'
ORDER BY s.state, CAST(s.district AS INTEGER);

-- ============================================================================
-- TREND ANALYSIS (Requires 2022 comparison data)
-- ============================================================================

-- 13. Most competitive races: Tossups only (highest uncertainty)
SELECT 
  s.state,
  s.district,
  s.incumbent,
  s.category,
  s.notes as projection_notes,
  COUNT(DISTINCT c.candidate) as candidates
FROM race_seats s
LEFT JOIN race_candidates c ON s.state = c.state AND s.district = c.district
WHERE s.category = 'Tossup'
GROUP BY s.state, s.district
ORDER BY s.state, CAST(s.district AS INTEGER);

-- 14. Safe D seats (Democratic supermajorities): All 185
SELECT 
  state,
  district,
  incumbent,
  category
FROM race_seats
WHERE category = 'Safe Democrat'
ORDER BY state, CAST(district AS INTEGER);

-- 15. Safe R seats (Republican supermajorities): All 145
SELECT 
  state,
  district,
  incumbent,
  category
FROM race_seats
WHERE category = 'Safe Republican'
ORDER BY state, CAST(district AS INTEGER);

-- ============================================================================
-- ENDORSEMENT ANALYSIS (When endorsement data is expanded)
-- ============================================================================

-- 16. All DCCC-backed candidates in competitive races
SELECT 
  c.state,
  c.district,
  c.candidate,
  c.party,
  c.endorsements,
  s.category
FROM race_candidates c
JOIN race_seats s ON c.state = s.state AND c.district = s.district
WHERE c.endorsements LIKE '%DCCC%'
  AND s.category IN ('Tossup', 'Tilt Democrat', 'Lean Democrat')
ORDER BY c.state, CAST(c.district AS INTEGER);

-- 17. All NRCC-backed candidates in competitive races
SELECT 
  c.state,
  c.district,
  c.candidate,
  c.party,
  c.endorsements,
  s.category
FROM race_candidates c
JOIN race_seats s ON c.state = c.state AND c.district = c.district
WHERE c.endorsements LIKE '%NRCC%'
  AND s.category IN ('Tossup', 'Tilt Republican', 'Lean Republican')
ORDER BY c.state, CAST(c.district AS INTEGER);

-- ============================================================================
-- DATA QUALITY QUERIES
-- ============================================================================

-- 18. Seats missing challenger data
SELECT 
  s.state,
  s.district,
  s.incumbent,
  s.category,
  COUNT(c.candidate) as candidates_named
FROM race_seats s
LEFT JOIN race_candidates c ON s.state = c.state AND s.district = c.district
GROUP BY s.state, s.district
HAVING candidates_named < 2
ORDER BY s.state, CAST(s.district AS INTEGER)
LIMIT 20;

-- 19. Data completeness report
SELECT 
  'Races with incumbent name' as metric,
  COUNT(*) as total
FROM race_seats
WHERE incumbent IS NOT NULL AND incumbent != ''
UNION ALL
SELECT 'Races with electoral category',
  COUNT(*) FROM race_seats WHERE category IS NOT NULL
UNION ALL
SELECT 'Candidates with names',
  COUNT(*) FROM race_candidates WHERE candidate IS NOT NULL AND candidate != 'Challenger TBD'
UNION ALL
SELECT 'Candidates with endorsements data',
  COUNT(*) FROM race_candidates WHERE endorsements IS NOT NULL AND endorsements != '';

-- 20. Export candidates for a state (example: TX)
SELECT 
  state,
  district,
  candidate,
  party,
  role,
  endorsements,
  funds,
  trump_endorsed,
  primary_lost,
  open_secrets_url,
  fec_url
FROM race_candidates
WHERE state = 'TX'
ORDER BY CAST(district AS INTEGER), CASE role WHEN 'incumbent' THEN 1 ELSE 2 END;
