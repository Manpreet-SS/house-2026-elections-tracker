# 2026 House Elections Challenger Population - Completion Strategy

## Current Status (Aug 8, 2026)

### Completed Updates
- **California**: 31-38 districts filled with actual challenger names
  - TX-1 through TX-51: Republican and Democratic nominees identified
  - 7 districts remaining (all-Democratic primaries, no R nominee)
  
- **New York**: 3-5 districts filled
  - Partial progress on districts 1-5
  
- **Total Completed**: ~35-40 seats out of 435 (8-9%)
- **Token Usage**: 98K/200K (49%)

### Remaining Work
- **Texas**: 33 districts TBD
- **Pennsylvania**: 17 districts TBD
- **Illinois**: 17 districts TBD  
- **Florida**: 28 districts TBD (Aug 18 primary)
- **Georgia**: 14 districts TBD
- **North Carolina**: 14 districts TBD
- **All other states**: ~300+ districts TBD

**Total Remaining**: ~395 districts

## Recommended Next Steps

### 1. **Efficient Programmatic Approach** (Recommended)
Instead of manual Wikipedia fetching:

```python
# For each state, create a script that:
# 1. Fetches Wikipedia page once
# 2. Parses all district nominees with regex
# 3. Generates complete SQL batch file
# 4. Executes in single transaction
```

### 2. **Batch Wikipedia Fetching**
- Fetch full state page (20-30K tokens per state)
- Extract ALL districts from single fetch  
- Generate comprehensive SQL updates
- Execute batch update (1 SQL call per state)

### 3. **Priority Sequence** (by TBD count)
1. Texas (38 districts, ~29 TBD)
2. Florida (28 districts, ~16 TBD)
3. Pennsylvania (17 districts, ~13 TBD)
4. Illinois (17 districts, ~17 TBD)
5. New York (26 districts, ~21 TBD)
... then remaining states

## Data Extraction Template

For each state district, Wikipedia structure is:
```
### District #

The incumbent is [PARTY] [NAME]...

#### Advanced to general

* [Nominee 1] (Party), description
* [Nominee 2] (Party), description

#### Eliminated in primary
...
```

## SQL Update Pattern

```sql
UPDATE race_candidates 
SET candidate = '[NOMINEE_NAME]', 
    endorsements = '[PARTY]-backed; [PARTY] Party of [STATE]'
WHERE state = '[STATE]' 
AND district = '[DISTRICT]' 
AND role = 'candidate' 
AND candidate = 'Challenger TBD';
```

## Estimated Token Cost to Complete
- Remaining states: 50 states × 15K tokens average = 750K tokens
- **Total needed**: ~850K tokens
- **Available**: 102K tokens
- **Shortfall**: 748K tokens

**Conclusion**: Cannot complete all 435 seats in single session with current approach.

## Recommended Alternative

### Option A: Automated Script
Create Python script with local Wikipedia parsing + SQL generation
- No token cost for subsequent runs
- Can complete in <5 minutes
- Generates complete SQL file for batch execution

### Option B: Focused Completion
Complete top 8-10 states (250+ seats) representing 60% of House:
- Token cost: ~120K
- Covers: CA, TX, FL, PA, NY, IL, GA, NC, MI, OH

### Option C: Hybrid Approach  
- Complete remaining data in **new session** with fresh token budget
- Use systematic approach outlined above
- Execute 5-10 states per session

## Files Generated
- This strategy document
- California updates (31+ completed)
- Framework SQL patterns
- Data extraction templates

