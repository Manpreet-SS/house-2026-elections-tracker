const data = window.HOUSE_DATA || { seats: [], candidates: [] };
const candidateData = window.HOUSE_CANDIDATES || {};
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

const normalizeCategory = (category, party) => {
  if (category === 'Lean/Tilt Republican' || category === 'Lean Republican') return 'Likely Republican';
  if (category === 'Tilt Republican') return 'Tossup';
  if (category === 'Tilt Democrat') return 'Tossup';
  if (category === 'Lean Democrat') return 'Likely Democrat';
  if (category === 'Tilt Democrat') return 'Tossup';
  return category;
};
const categoryLead = (category) => {
  switch (normalizeCategory(category)) {
    case 'Safe Democrat':
    case 'Safe Republican':
      return '> 12.5%';
    case 'Likely Democrat':
    case 'Likely Republican':
      return '8% - 12.5%';
    case 'Lean/Tilt Democrat':
    case 'Lean Democrat':
      return '5% - 8%';
    case 'Lean/Tilt Republican':
    case 'Lean Republican':
      return '5% - 8%';
    case 'Tilt Democrat':
      return '2.5% - 5%';
    case 'Tilt Republican':
      return '2.5% - 5%';
    default:
      return '< 2.5%';
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
      return '5.0%-8.0%';
    case 'Tilt Democrat':
    case 'Tilt Republican':
      return '2.5%-5.0%';
    default:
      return '<2.5%';
  }
};
for (const seat of seats) {
  const k = key(seat.state, seat.district);
  if (!byState.has(seat.state)) byState.set(seat.state, []);
  byState.get(seat.state).push(seat);
}
byState.forEach(list => list.sort((a, b) => a.district - b.district));

legend.innerHTML = ['Safe Democrat','Likely Democrat','Lean Democrat','Tossup','Lean/Tilt Republican','Likely Republican','Safe Republican'].map(c => `<span class="badge ${categoryClass(c)}">${c}</span>`).join('');

function candidateCard(c, seat) {
  const star = c.role === 'incumbent' ? '<span class="star">★</span> ' : '';
  const aipac = c.aipac_money || c.aipac_endorsed || c.aipac_superpack_support ? 'AIPAC: yes' : 'AIPAC: no';
  return `<a class="candidate" href="#${seatId(c.state,c.district)}/${encodeURIComponent(c.candidate)}"><strong>${star}${c.candidate}</strong></a>
    <div class="muted">${c.party || ''} · ${aipac}${c.trump_endorsed && c.primary_lost ? ' · Trump-endorsed primary loss' : ''}</div>`;
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
    const displayed = candidatesForSeat.filter(Boolean).filter((c, i, arr) => arr.findIndex(x => x.candidate === c.candidate && x.party === c.party) === i).slice(0, 2);
    return `<div class="seat-row">
      <div class="seat-head">
        <div><span class="badge ${categoryClass(normalizeCategory(seat.category))}">${seatId(seat.state, seat.district)}</span> <strong>${normalizeCategory(seat.category)}</strong> <span class="muted">Lead ${leadPercent(seat.category)}</span></div>
        <div class="muted">${seat.notes || ''}</div>
      </div>
      <div class="candidate-list">${displayed.map(c => `
        <div class="candidate">
          <div><strong>${c.role === 'incumbent' ? '<span class="star">★</span> ' : ''}${c.candidate}</strong></div>
          <div class="muted">${c.party || ''}${c.aipac_money || c.aipac_endorsed ? ' · AIPAC funded/endorsed' : ''}${c.trump_endorsed && c.primary_lost ? ' · Trump-endorsed candidate lost primary' : ''}</div>
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
        <div><span class="badge ${categoryClass(seat.category)}">${seat.category}</span> <span class="badge party-${c.party || 'I'}">${c.party || ''}</span></div>
        <div>${c.role === 'incumbent' ? '<span class="star">★ Incumbent</span>' : 'Challenger'}</div>
      </div>
      <p class="muted">${c.additional_info || c.notes || ''}</p>
      <p>${c.aipac_money || c.aipac_endorsed ? 'AIPAC funded/endorsed: yes' : 'AIPAC funded/endorsed: no'}</p>
      ${c.trump_endorsed && c.primary_lost ? '<p><strong>Note:</strong> Trump-endorsed candidate lost the primary.</p>' : ''}
      <div class="detail-box">
        <h3>Endorsements</h3>
        <p>${c.endorsements || 'No endorsement data loaded yet.'}</p>
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
