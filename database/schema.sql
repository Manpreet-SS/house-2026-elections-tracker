-- 2026 US House Elections Database Schema
-- This schema supports tracking all 435 House seats with detailed incumbent 
-- and challenger candidate information

-- Race Seats Table: Electoral classification for all 435 House districts
CREATE TABLE race_seats (
    state TEXT NOT NULL,                    -- Two-letter state code (CA, TX, etc.)
    district TEXT NOT NULL,                 -- District number (0 for at-large)
    incumbent TEXT,                         -- Current incumbent name
    party TEXT,                             -- Party affiliation (D/R)
    category TEXT,                          -- Electoral category (Safe/Likely/Lean/Tilt/Tossup)
    notes TEXT,                             -- Additional info (open seat, redistricting, etc.)
    PRIMARY KEY (state, district)
);

-- Race Candidates Table: Detailed candidate information for both incumbents and challengers
CREATE TABLE race_candidates (
    state TEXT NOT NULL,                    -- Two-letter state code
    district TEXT NOT NULL,                 -- District number
    candidate TEXT NOT NULL,                -- Candidate name
    party TEXT,                             -- Party (D/R/I)
    role TEXT,                              -- Role: 'incumbent' or 'candidate'
    endorsements TEXT,                      -- Endorsing organizations, politicians, PACs
    trump_endorsed INTEGER,                 -- Flag: 1 if Trump-endorsed (R candidates only)
    primary_lost INTEGER,                   -- Flag: 1 if lost primary (R candidates only)
    funds TEXT,                             -- Fundraising estimate/FEC filing amount
    open_secrets_url TEXT,                  -- Reference URL to OpenSecrets profile
    fec_url TEXT,                           -- Reference URL to FEC filing
    aipac_money TEXT,                       -- AIPAC/pro-Israel PAC contributions
    corporate_pac_money TEXT,               -- Top 5 corporate PAC donors and amounts
    stock_trading_notes TEXT,               -- House Clerk stock trading summary
    additional_info TEXT,                   -- Campaign committee, website, other data
    PRIMARY KEY (state, district, candidate),
    FOREIGN KEY (state, district) REFERENCES race_seats(state, district)
);

-- Index for faster queries
CREATE INDEX idx_race_seats_category ON race_seats(category);
CREATE INDEX idx_race_seats_state ON race_seats(state);
CREATE INDEX idx_race_candidates_party ON race_candidates(party);
CREATE INDEX idx_race_candidates_trump ON race_candidates(trump_endorsed);
