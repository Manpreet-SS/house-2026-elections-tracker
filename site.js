const data = window.HOUSE_DATA || { seats: [], candidates: [] };
const candidateData = window.HOUSE_CANDIDATES || {};
const sourceData = window.HOUSE_SOURCES || {};
const seats = data.seats || [];
const candidates = data.candidates || [];
const byState = new Map();
const view = document.getElementById('view');
const stateGrid = document.getElementById('stateGrid');
const backBtn = document.getElementById('backBtn');
const legend = document.getElementById('legend');

const categoryClass = (c) => ({
  'Safe Democrat': 'safe-d',
  'Likely Democrat': 'likely-d',
  'Lean Democrat': 'lean-d',
  'Lean/Tilt Democrat': 'lean-d',
  'Tossup': 'tossup',
  'Lean/Tilt Republican': 'lean-r',
  'Lean Republican': 'lean-r',
  'Likely Republican': 'likely-r',
  'Safe Republican': 'safe-r',
  'Tilt Democrat': 'lean-d',
  'Tilt Republican': 'lean-r',
}[c] || 'tossup');

const partyLabel = (party) => {
  if (!party) return 'Independent';
  if (party === 'D' || party === 'DEM' || party === 'Democratic') return 'Democrat';
  if (party === 'R' || party === 'GOP' || party === 'Republican') return 'Republican';
  return party;
};

const partyClass = (party) => {
  if (party === 'D' || party === 'DEM' || party === 'Democratic') return 'party-D';
  if (party === 'R' || party === 'GOP' || party === 'Republican') return 'party-R';
  return 'party-I';
};

const STATE_NAMES = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado',
  CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho',
  IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
  MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
  OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
  TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
  WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming'
};
const fullStateName = (s) => STATE_NAMES[s] || s;
const fmt = (d) => String(d).padStart(2, '0');
const seatId = (s, d) => `${s}-${fmt(d)}`;
const key = (s, d) => `${s}|${String(d)}`;

const seatCandidates = new Map();
const candidateNamesBySeat = new Map();
for (const [seatKey, list] of Object.entries(candidateData)) {
  const norm = seatKey.replace('|', '-');
  seatCandidates.set(seatKey, list);
  candidateNamesBySeat.set(seatKey, list.map(c => c.candidate).filter(Boolean));
}
for (const c of candidates) {
  const k = key(c.state, c.district);
  if (!candidateNamesBySeat.has(k)) candidateNamesBySeat.set(k, []);
  if (c.candidate && !candidateNamesBySeat.get(k).includes(c.candidate)) candidateNamesBySeat.get(k).push(c.candidate);
}
const candidateBySeatParty = seatCandidates;
const concludedPrimaryStates = new Set(['AZ','CO','FL','IA','KS','KY','LA','MD','ME','MI','MN','MO','MT','NC','NE','NH','NJ','NV','OH','PA','SC','TN','VA','WA','WI']);
const winnersByState = {};

const normalizeCategory = (category, party) => {
  if (category === 'Lean Democrat') return 'Lean/Tilt Democrat';
  if (category === 'Lean Republican') return 'Lean/Tilt Republican';
  if (category === 'Tilt Democrat') return 'Lean/Tilt Democrat';
  if (category === 'Tilt Republican') return 'Lean/Tilt Republican';
  return category;
};
const safeForSameParty = (seat, candidatesForSeat) => {
  if (!seat || !candidatesForSeat || candidatesForSeat.length < 2) return null;
  const parties = candidatesForSeat.map(c => c.party).filter(Boolean);
  if (parties.length < 2) return null;
  const first = parties[0];
  if (parties.every(p => p === first)) return first === 'DEM' || first === 'D' ? 'Safe Democrat' : 'Safe Republican';
  return null;
};
const categoryLead = (category) => {
  switch (normalizeCategory(category)) {
    case 'Safe Democrat':
    case 'Safe Republican':
      return '> 12.5%';
    case 'Likely Democrat':
    case 'Likely Republican':
      return '8% - 12.5%';
    case 'Lean Democrat':
    case 'Lean Republican':
      return '5% - 8.5%';
    case 'Tilt Democrat':
      return '2.5% - 5%';
    case 'Tilt Republican':
      return '2.5% - 5%';
    default:
      return 'Tossup';
  }
};
const leadPercent = (category) => {
  switch (normalizeCategory(category)) {
    case 'Safe Democrat':
    case 'Safe Republican':
      return '12.5%+';
    case 'Likely Democrat':
    case 'Likely Republican':
      return '8.0%-12.5%';
    case 'Lean Democrat':
    case 'Lean Republican':
      return '5.0%-8.5%';
    case 'Tilt Democrat':
    case 'Tilt Republican':
      return '2.5%-5.0%';
    default:
      return 'Tossup';
  }
};
const exactLead = (seat) => seat && seat.lead_percent ? `${seat.lead_percent}%` : null;
const categoryLeadText = (seat) => exactLead(seat) || leadPercent(seat?.category);
const isIncumbent = (seat, candidate) => candidate.role === 'incumbent' || (seat && seat.incumbent && candidate.candidate && seat.incumbent === candidate.candidate);

const arizonaCandidates = {
  1: [
    { candidate: 'A. Shah', party: 'D', votes: 29002, pct: 39.4, winner: true },
    { candidate: 'J. Feely', party: 'R', votes: 25267, pct: 34.4 }
  ],
  2: [{ candidate: 'J. Nez', party: 'D', votes: 0, pct: 0.0, winner: true }],
  3: [{ candidate: 'Y. Ansari', party: 'D', votes: 0, pct: 0.0, winner: true }],
  4: [
    { candidate: 'G. Stanton', party: 'D', votes: 35551, pct: 62.3, winner: true },
    { candidate: 'K. Newkirk', party: 'R', votes: 21544, pct: 37.7 }
  ],
  5: [
    { candidate: 'E. Lee', party: 'D', votes: 30857, pct: 66.0, winner: true },
    { candidate: 'C. James', party: 'R', votes: 9703, pct: 20.8 }
  ],
  6: [{ candidate: 'J. Mendoza', party: 'D', votes: 0, pct: 0.0, winner: true }],
  7: [{ candidate: 'A. Grijalva', party: 'D', votes: 0, pct: 0.0, winner: true }],
  8: [
    { candidate: 'B. Greene-Placentia', party: 'D', votes: 31312, pct: 65.7, winner: true },
    { candidate: 'R. Keeler', party: 'R', votes: 16324, pct: 34.3 }
  ],
  9: [{ candidate: 'D. Sterbinsky', party: 'D', votes: 0, pct: 0.0, winner: true }]
};
for (const seat of seats) {
  const k = key(seat.state, seat.district);
  if (!byState.has(seat.state)) byState.set(seat.state, []);
  byState.get(seat.state).push(seat);
}
byState.forEach(list => list.sort((a, b) => a.district - b.district));

legend.innerHTML = ['Safe Democrat','Likely Democrat','Lean Democrat','Tossup','Lean/Tilt Republican','Likely Republican','Safe Republican'].map(c => `<span class="badge ${categoryClass(c)}">${c}</span>`).join('');

function candidateCard(c, seat) {
  const star = isIncumbent(seat, c) ? '<span class="star">★</span> ' : '';
  const aipac = c.aipac_money || c.aipac_endorsed || c.aipac_superpack_support ? 'AIPAC: yes' : 'AIPAC: no';
  const sourceTag = c.source || 'bundle';
  return `<a class="candidate" href="#${seatId(c.state,c.district)}/${encodeURIComponent(c.candidate)}"><strong class="${partyClass(c.party)}">${star}${c.candidate}</strong></a>
    <div class="muted">${partyLabel(c.party)} · ${aipac}${c.trump_endorsed && c.primary_lost ? ' · Trump-endorsed primary loss' : ''} · ${sourceTag}</div>`;
}

function renderHome() {
  backBtn.hidden = true;
  view.innerHTML = `<h2>Choose a state</h2><p class="muted">Browse all 50 states and open districts one by one.</p>`;
}

function renderState(state) {
  backBtn.hidden = false;
  const seatsForState = seats.filter(s => s.state === state).sort((a,b)=>a.district-b.district);
  view.innerHTML = `<h2>${fullStateName(state)} (${state})</h2>${seatsForState.map(seat => {
    const candidatesForSeat = (concludedPrimaryStates.has(state) ? candidateBySeatParty.get(key(seat.state, seat.district)) : seatCandidates.get(key(seat.state, seat.district))) || [];
    const displayed = state === 'AZ'
      ? (arizonaCandidates[seat.district] || []).filter(c => c.winner || c.party === 'D' || c.party === 'R').slice(0, 2)
      : candidatesForSeat.filter(Boolean).filter((c, i, arr) => arr.findIndex(x => x.candidate === c.candidate && x.party === c.party) === i).slice(0, 2);
    const displayCategory = safeForSameParty(seat, displayed) || normalizeCategory(seat.category);
    return `<div class="seat-row">
      <div class="seat-head">
        <div><span class="badge ${categoryClass(displayCategory)}">${seatId(seat.state, seat.district)}</span> <strong>${displayCategory}</strong> <span class="muted">Lead ${categoryLeadText(seat)}</span></div>
        <div class="muted">${seat.notes || ''}</div>
      </div>
      <div class="candidate-list">${displayed.map(c => `
        <div class="candidate">
          <div><strong class="${partyClass(c.party)}">${isIncumbent(seat, c) ? '<span class="star">★</span> ' : ''}${c.candidate}</strong></div>
          <div class="muted">${partyLabel(c.party)}${c.aipac_money || c.aipac_endorsed ? ' · AIPAC funded/endorsed' : ''}${c.trump_endorsed && c.primary_lost ? ' · Trump-endorsed candidate lost primary' : ''}</div>
          <div><a href="#${seatId(c.state,c.district)}/${encodeURIComponent(c.candidate)}">Open candidate details</a></div>
        </div>`).join('') || '<div class="muted">No candidate rows available.</div>'}</div>
      <div class="muted">Candidates on file: ${(candidateNamesBySeat.get(key(seat.state, seat.district)) || []).join(', ') || 'none'}</div>
    </div>`;
  }).join('')}`;
}

function renderCandidate(state, district, name) {
  const c = candidates.find(x => x.state === state && String(x.district) === String(district) && x.candidate === name);
  const seat = seats.find(s => s.state === state && String(s.district) === String(district));
  if (!c || !seat) return renderState(state);
  backBtn.hidden = false;
  view.innerHTML = `<h2>${seatId(state,district)} · ${c.candidate}</h2>
    <div class="seat-row">
      <div class="seat-head">
        <div>
          <div class="candidate-title">
            ${isIncumbent(seat, c) ? '<span class="star">★</span> ' : ''}<strong class="${partyClass(c.party)}">${c.candidate}</strong>
          </div>
          <div><span class="badge ${partyClass(c.party)}">${partyLabel(c.party)}</span> <span class="badge ${categoryClass(seat.category)}">${seat.category}</span></div>
        </div>
        <div>${c.aipac_money || c.aipac_endorsed ? '<span class="badge aipac">AIPAC funded/endorsed</span>' : '<span class="badge no-aipac">Not AIPAC backed</span>'}</div>
      </div>
      <p class="muted">${c.additional_info || c.notes || ''}</p>
      ${c.trump_endorsed && c.primary_lost ? '<p><strong>Note:</strong> Trump-endorsed candidate lost the primary.</p>' : ''}
      <div class="detail-box">
        <h3>Endorsement</h3>
        <p>${c.endorsements || 'No endorsement data loaded yet.'}</p>
      </div>
      <div class="detail-box">
        <h3>Money & coverage</h3>
        <p>${c.corporate_pac_money || 'Top 5 corporate donors not loaded yet.'}</p>
        <p>${c.funds || 'Fundraising details not loaded yet.'}</p>
        <p>${c.stock_trading_notes || 'No stock-trading notes loaded.'}</p>
      </div>
    </div>`;
}

function renderStateGrid() {
  const states = [...new Set(seats.map(s => s.state))].sort();
  stateGrid.innerHTML = states.map(state => `<a class="state-card" href="#${state}"><strong>${state}</strong><div class="muted">${fullStateName(state)}</div></a>`).join('');
}

function route() {
  const hash = location.hash.replace(/^#/, '');
  if (!hash) return renderHome();
  const [left, right] = hash.split('/');
  if (right) {
    const [state, district] = left.split('-');
    return renderCandidate(state, district, decodeURIComponent(right));
  }
  renderState(left);
}

backBtn.addEventListener('click', () => { location.hash = ''; });
window.addEventListener('hashchange', route);
renderStateGrid();
route();
