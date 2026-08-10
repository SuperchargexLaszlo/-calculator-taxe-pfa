import { useState, useMemo } from 'react';

// DATE FISCALE 2026
const SALARIU_MINIM = 4050;
const PLAFON_6 = SALARIU_MINIM * 6;   // 24300
const PLAFON_24 = SALARIU_MINIM * 24; // 97200
const PLAFON_72 = SALARIU_MINIM * 72; // 291600 (plafon maxim CASS 2026)
const CAS_RATA = 0.25;
const CASS_RATA = 0.10;
const IMPOZIT_RATA = 0.10;

// DATE FISCALE SRL 2026
const MICRO_1_RATA = 0.01;   // microîntreprindere cu angajat
const MICRO_3_RATA = 0.03;   // microîntreprindere fără angajat
const DIVIDENDE_RATA = 0.08; // impozit dividende 8%
const CAM_RATA = 0.0225;     // contribuție asiguratorie muncă (angajator)
const ADMIN_BRUT_ANUAL = SALARIU_MINIM * 12; // 48600 RON salar minim admin

function fmt(n: number) {
  return new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n)) + ' RON';
}

function calcPFA(venit: number, pensionar: boolean, cheltuieli: number = 0) {
  const venitNet = venit - cheltuieli;
  let cas = 0;
  if (!pensionar && venitNet >= PLAFON_6) {
    cas = Math.min(venitNet, PLAFON_24) * CAS_RATA;
  }
  let cass: number;
  if (venitNet < PLAFON_6) {
    cass = PLAFON_6 * CASS_RATA;
  } else {
    cass = Math.min(venitNet, PLAFON_72) * CASS_RATA;
  }
  const bazaImpozit = Math.max(0, venitNet - cas - cass);
  const impozit = bazaImpozit * IMPOZIT_RATA;
  const totalTaxe = cas + cass + impozit;
  return {
    cas, cass, impozit, totalTaxe,
    venitNet: venit - totalTaxe,
    procent: venit > 0 ? (totalTaxe / venit) * 100 : 0,
  };
}

function calcSRL1(venit: number) {
  // SRL microîntreprindere 1% — administrator angajat cu salar minim
  const microTax = venit * MICRO_1_RATA;

  // Cost angajator cu admin la salar minim
  const costAngajator = ADMIN_BRUT_ANUAL * (1 + CAM_RATA); // 48600 * 1.0225 ≈ 49,693.5

  // Net salariu admin
  const casSalariat = ADMIN_BRUT_ANUAL * CAS_RATA;           // 12,150
  const cassSalariat = ADMIN_BRUT_ANUAL * CASS_RATA;          // 4,860
  const bazaImpozitSalar = ADMIN_BRUT_ANUAL - casSalariat - cassSalariat;
  const impozitSalar = bazaImpozitSalar * IMPOZIT_RATA;
  const netSalar = ADMIN_BRUT_ANUAL - casSalariat - cassSalariat - impozitSalar;

  // Profit disponibil dividende = venit - microTax - costAngajator
  const profitBrut = Math.max(0, venit - microTax - costAngajator);

  // CASS pe dividende: dacă dividendele > 6 salarii, se plătește CASS 10% plafonat la 72 salarii
  let cassDividende = 0;
  if (profitBrut >= PLAFON_6) {
    cassDividende = Math.min(profitBrut, PLAFON_72) * CASS_RATA;
  } else if (profitBrut > 0) {
    cassDividende = PLAFON_6 * CASS_RATA;
  }

  const dividendeNete = Math.max(0, profitBrut - cassDividende) * (1 - DIVIDENDE_RATA);
  const totalNet = netSalar + dividendeNete;
  const totalTaxe = venit - totalNet;

  return {
    microTax, costAngajator, netSalar, cassDividende,
    dividendeNete, totalNet, totalTaxe,
    procent: venit > 0 ? (totalTaxe / venit) * 100 : 0,
  };
}

function calcSRL3(venit: number) {
  // SRL microîntreprindere 3% — fără angajat
  const microTax = venit * MICRO_3_RATA;
  const profitBrut = Math.max(0, venit - microTax);

  // CASS pe dividende
  let cassDividende = 0;
  if (profitBrut >= PLAFON_6) {
    cassDividende = Math.min(profitBrut, PLAFON_72) * CASS_RATA;
  } else if (profitBrut > 0) {
    cassDividende = PLAFON_6 * CASS_RATA;
  }

  // CAS: dacă nu are altă sursă, asociatul unic trebuie să plătească CAS
  // (simplificat: CAS ca PFA dacă venit > 6 salarii)
  let cas = 0;
  if (profitBrut >= PLAFON_6) {
    cas = Math.min(profitBrut, PLAFON_24) * CAS_RATA;
  }

  const dividendeNete = Math.max(0, profitBrut - cassDividende - cas) * (1 - DIVIDENDE_RATA);
  const totalNet = dividendeNete;
  const totalTaxe = venit - totalNet;

  return {
    microTax, cassDividende, cas, dividendeNete, totalNet, totalTaxe,
    procent: venit > 0 ? (totalTaxe / venit) * 100 : 0,
  };
}

const VENITURI_TABEL = [30000, 48000, 60000, 80000, 100000, 150000, 200000, 300000];

export default function ComparatorPFAvsSRL() {
  const [venit, setVenit] = useState<string>('100000');
  const [pensionar, setPensionar] = useState(false);
  const [cheltuieli, setCheltuieli] = useState<string>('0');

  const venitNum = parseFloat(venit) || 0;
  const cheltuieliNum = parseFloat(cheltuieli) || 0;

  const pfa = useMemo(() => calcPFA(venitNum, pensionar, cheltuieliNum), [venitNum, pensionar, cheltuieliNum]);
  const srl1 = useMemo(() => calcSRL1(venitNum), [venitNum]);
  const srl3 = useMemo(() => calcSRL3(venitNum), [venitNum]);

  const castigator = pfa.venitNet >= srl1.totalNet && pfa.venitNet >= srl3.totalNet
    ? 'PFA' : srl1.totalNet >= srl3.totalNet ? 'SRL 1%' : 'SRL 3%';

  return (
    <div>
      {/* Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="form-group">
          <label>Venit anual brut (RON)</label>
          <input
            type="number" value={venit}
            onChange={e => setVenit(e.target.value)}
            min="0" step="5000" placeholder="ex: 100000"
          />
        </div>
        <div className="form-group">
          <label>Cheltuieli deductibile PFA (RON)</label>
          <input
            type="number" value={cheltuieli}
            onChange={e => setCheltuieli(e.target.value)}
            min="0" step="1000" placeholder="ex: 5000"
          />
        </div>
        <div className="form-group" style={{ justifyContent: 'flex-end' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 400 }}>
            <input type="checkbox" checked={pensionar} onChange={e => setPensionar(e.target.checked)} style={{ width: 'auto' }} />
            Pensionar (scutit CAS la PFA)
          </label>
        </div>
      </div>

      {/* Castigator banner */}
      {venitNum > 0 && (
        <div style={{ background: '#d1fae5', border: '1px solid #059669', borderRadius: '8px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🏆</span>
          <div>
            <strong style={{ color: '#065f46' }}>Avantajos pentru {fmt(venitNum)}: {castigator}</strong>
            <div style={{ fontSize: '0.875rem', color: '#047857', marginTop: '0.25rem' }}>
              PFA net: <strong>{fmt(pfa.venitNet)}</strong> &nbsp;|&nbsp;
              SRL 1%: <strong>{fmt(srl1.totalNet)}</strong> &nbsp;|&nbsp;
              SRL 3%: <strong>{fmt(srl3.totalNet)}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Comparatie side by side */}
      {venitNum > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>

          {/* PFA */}
          <div className="card" style={{ borderTop: '3px solid #1a56db' }}>
            <h3 style={{ color: '#1a56db', marginTop: 0 }}>PFA — Sistem Real</h3>
            <div className="result-row"><span className="result-label">Venit brut</span><span>{fmt(venitNum)}</span></div>
            {cheltuieliNum > 0 && <div className="result-row"><span className="result-label">Cheltuieli deductibile</span><span style={{ color: '#dc2626' }}>- {fmt(cheltuieliNum)}</span></div>}
            <div className="result-row"><span className="result-label">CAS (25%)</span><span style={{ color: '#dc2626' }}>- {fmt(pfa.cas)}</span></div>
            <div className="result-row"><span className="result-label">CASS (10%)</span><span style={{ color: '#dc2626' }}>- {fmt(pfa.cass)}</span></div>
            <div className="result-row"><span className="result-label">Impozit venit (10%)</span><span style={{ color: '#dc2626' }}>- {fmt(pfa.impozit)}</span></div>
            <div className="result-row" style={{ fontWeight: 700, borderTop: '2px solid #1a56db', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
              <span>💰 Venit NET</span><span style={{ color: '#059669' }}>{fmt(pfa.venitNet)}</span>
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
              Taxe totale: {pfa.procent.toFixed(1)}%
            </div>
          </div>

          {/* SRL 1% */}
          <div className="card" style={{ borderTop: '3px solid #059669' }}>
            <h3 style={{ color: '#059669', marginTop: 0 }}>SRL Micro 1% <small style={{ fontWeight: 400, fontSize: '0.8rem' }}>(cu angajat)</small></h3>
            <div className="result-row"><span className="result-label">Venit brut</span><span>{fmt(venitNum)}</span></div>
            <div className="result-row"><span className="result-label">Tax microîntreprindere 1%</span><span style={{ color: '#dc2626' }}>- {fmt(srl1.microTax)}</span></div>
            <div className="result-row"><span className="result-label">Cost salar admin (min.)</span><span style={{ color: '#dc2626' }}>- {fmt(srl1.costAngajator)}</span></div>
            <div className="result-row"><span className="result-label">CASS pe dividende</span><span style={{ color: '#dc2626' }}>- {fmt(srl1.cassDividende)}</span></div>
            <div className="result-row"><span className="result-label">Impozit dividende (8%)</span><span style={{ color: '#dc2626' }}>- {fmt((Math.max(0, venitNum - srl1.microTax - srl1.costAngajator - srl1.cassDividende)) * DIVIDENDE_RATA)}</span></div>
            <div className="result-row" style={{ fontWeight: 700, borderTop: '2px solid #059669', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
              <span>💰 Total NET</span><span style={{ color: '#059669' }}>{fmt(srl1.totalNet)}</span>
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
              (salar net {fmt(srl1.netSalar)} + dividende {fmt(srl1.dividendeNete)}) · {srl1.procent.toFixed(1)}%
            </div>
          </div>

          {/* SRL 3% */}
          <div className="card" style={{ borderTop: '3px solid #d97706' }}>
            <h3 style={{ color: '#d97706', marginTop: 0 }}>SRL Micro 3% <small style={{ fontWeight: 400, fontSize: '0.8rem' }}>(fără angajat)</small></h3>
            <div className="result-row"><span className="result-label">Venit brut</span><span>{fmt(venitNum)}</span></div>
            <div className="result-row"><span className="result-label">Tax microîntreprindere 3%</span><span style={{ color: '#dc2626' }}>- {fmt(srl3.microTax)}</span></div>
            <div className="result-row"><span className="result-label">CAS asociat unic</span><span style={{ color: '#dc2626' }}>- {fmt(srl3.cas)}</span></div>
            <div className="result-row"><span className="result-label">CASS pe dividende</span><span style={{ color: '#dc2626' }}>- {fmt(srl3.cassDividende)}</span></div>
            <div className="result-row"><span className="result-label">Impozit dividende (8%)</span><span style={{ color: '#dc2626' }}>- {fmt((Math.max(0, venitNum - srl3.microTax - srl3.cassDividende - srl3.cas)) * DIVIDENDE_RATA)}</span></div>
            <div className="result-row" style={{ fontWeight: 700, borderTop: '2px solid #d97706', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
              <span>💰 Total NET</span><span style={{ color: '#059669' }}>{fmt(srl3.totalNet)}</span>
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
              Taxe totale: {srl3.procent.toFixed(1)}%
            </div>
          </div>
        </div>
      )}

      {/* Tabel comparativ venituri */}
      <h3>Tabel comparativ PFA vs SRL — 2026</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Venit brut</th>
              <th>PFA net</th>
              <th>% taxe PFA</th>
              <th>SRL 1% net</th>
              <th>% taxe SRL 1%</th>
              <th>SRL 3% net</th>
              <th>% taxe SRL 3%</th>
              <th>Avantajos</th>
            </tr>
          </thead>
          <tbody>
            {VENITURI_TABEL.map(v => {
              const p = calcPFA(v, false, 0);
              const s1 = calcSRL1(v);
              const s3 = calcSRL3(v);
              const maxNet = Math.max(p.venitNet, s1.totalNet, s3.totalNet);
              const winner = maxNet === p.venitNet ? 'PFA' : maxNet === s1.totalNet ? 'SRL 1%' : 'SRL 3%';
              return (
                <tr key={v} style={venitNum === v ? { background: '#e8effd' } : {}}>
                  <td style={{ fontWeight: 600 }}>{fmt(v)}</td>
                  <td style={{ color: winner === 'PFA' ? '#059669' : 'inherit', fontWeight: winner === 'PFA' ? 700 : 400 }}>{fmt(p.venitNet)}</td>
                  <td>{p.procent.toFixed(1)}%</td>
                  <td style={{ color: winner === 'SRL 1%' ? '#059669' : 'inherit', fontWeight: winner === 'SRL 1%' ? 700 : 400 }}>{fmt(s1.totalNet)}</td>
                  <td>{s1.procent.toFixed(1)}%</td>
                  <td style={{ color: winner === 'SRL 3%' ? '#059669' : 'inherit', fontWeight: winner === 'SRL 3%' ? 700 : 400 }}>{fmt(s3.totalNet)}</td>
                  <td>{s3.procent.toFixed(1)}%</td>
                  <td><span className={`badge ${winner === 'PFA' ? 'badge-blue' : 'badge-green'}`}>{winner}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
        * PFA sistem real, fără cheltuieli, nepensoinar. SRL 1%: admin la salar minim (4.050 RON/lună). SRL 3%: fără angajat, asociat unic. Datele au caracter orientativ — consultați un contabil.
      </p>
    </div>
  );
}
