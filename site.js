const data = window.HOUSE_DATA || { seats: [], candidates: [] };
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
}[c] || 'tossup');

const stateName = new Intl.DisplayNames(['en'], { type: 'region' });
const fullStateName = (s) => stateName.of(s);
const fmt = (d) => String(d).padStart(2, '0');
const seatId = (s, d) => `${s}-${fmt(d)}`;
const key = (s, d) => `${s}|${String(d)}`;

const candidateIndex = new Map(candidates.map(c => [key(c.state, c.district) + '|' + c.candidate, c]));
for (const c of candidates) {
  const k = key(c.state, c.district);
  if (!byState.has(c.state)) byState.set(c.state, []);
  if (!byState.get(c.state).some(x => x.state === c.state && x.district === c.district)) {
    byState.get(c.state).push(seats.find(s => s.state === c.state && String(s.district) === String(c.district)) || { state: c.state, district: c.district });
  }
}
byState.forEach(list => list.sort((a,b)=>a.district-b.district));

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
    const seatCandidates = candidates.filter(c => c.state === seat.state && String(c.district) === String(seat.district));
    return `<div class="seat-row">
      <div class="seat-head">
        <div><span class="badge ${categoryClass(seat.category)}">${seatId(seat.state, seat.district)}</span> <strong>${seat.category}</strong></div>
        <div class="muted">${seat.notes || ''}</div>
      </div>
      <div class="candidate-list">${seatCandidates.map(c => `
        <div class="candidate">
          <div><strong>${c.role === 'incumbent' ? '<span class="star">★</span> ' : ''}${c.candidate}</strong></div>
          <div class="muted">${c.party || ''}${c.aipac_money || c.aipac_endorsed ? ' · AIPAC funded/endorsed' : ''}${c.trump_endorsed && c.primary_lost ? ' · Trump-endorsed candidate lost primary' : ''}</div>
          <div><a href="#${seatId(c.state,c.district)}/${encodeURIComponent(c.candidate)}">Open candidate details</a></div>
        </div>`).join('') || '<div class="muted">No candidate rows available.</div>'}</div>
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
