import { useState, useMemo } from 'react';

// DATE FISCALE 2026
const SALARIU_MINIM = 4050;
const PLAFON_6 = SALARIU_MINIM * 6;   // 24300
const PLAFON_12 = SALARIU_MINIM * 12; // 48600
const PLAFON_24 = SALARIU_MINIM * 24; // 97200
const PLAFON_72 = SALARIU_MINIM * 72; // 291600 (plafon maxim CASS 2026)
const CAS_RATA = 0.25;
const CASS_RATA = 0.10;
const IMPOZIT_RATA = 0.10;

interface CalcResult {
  cas: number;
  cass: number;
  impozit: number;
  totalTaxe: number;
  venitNet: number;
  procentTaxe: number;
  bazaImpozitare: number;
}

function fmt(n: number) {
  return new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n)) + ' RON';
}

function calculeaza(
  venitBrut: number,
  sistem: 'real' | 'norma',
  activitate: 'it' | 'altele',
  pensionar: boolean,
  cheltuieliDeductibile: number = 0
): CalcResult {
  let cas = 0;
  let cass = 0;

  if (sistem === 'real') {
    const venitNet = venitBrut - cheltuieliDeductibile;

    // CAS (Pensie)
    if (!pensionar) {
      if (venitNet >= PLAFON_6) {
        const bazaCAS = Math.min(venitNet, PLAFON_24);
        cas = bazaCAS * CAS_RATA;
      }
    }

    // CASS (Sanatate)
    if (venitNet < PLAFON_6) {
      // Sub 6 salarii: CASS fix pe 6 salarii
      cass = PLAFON_6 * CASS_RATA;
    } else {
      const bazaCASS = Math.min(venitNet, PLAFON_72);
      cass = bazaCASS * CASS_RATA;
    }
    // IT scutire CASS: nu se aplică la PFA (doar salariați IT)

    const bazaImpozit = venitNet - cas - cass;
    const impozit = Math.max(0, bazaImpozit) * IMPOZIT_RATA;
    const totalTaxe = cas + cass + impozit;
    const venitNetFinal = venitBrut - totalTaxe;

    return {
      cas,
      cass,
      impozit,
      totalTaxe,
      venitNet: venitNetFinal,
      procentTaxe: venitBrut > 0 ? (totalTaxe / venitBrut) * 100 : 0,
      bazaImpozitare: Math.max(0, bazaImpozit),
    };
  }

  // Norma de venit (simplificat — norma variază pe județ/activitate)
  const normaApprox = 25000; // valoare aproximativă medie
  const bazaNorma = Math.min(venitBrut, normaApprox);
  cas = pensionar ? 0 : bazaNorma * CAS_RATA;
  cass = bazaNorma * CASS_RATA;
  const impozit = bazaNorma * IMPOZIT_RATA;
  const totalTaxe = cas + cass + impozit;

  return {
    cas,
    cass,
    impozit,
    totalTaxe,
    venitNet: venitBrut - totalTaxe,
    procentTaxe: venitBrut > 0 ? (totalTaxe / venitBrut) * 100 : 0,
    bazaImpozitare: bazaNorma,
  };
}

const TABEL_VENITURI = [24000, 36000, 48000, 60000, 80000, 100000, 150000, 200000, 300000];

export default function CalculatorPFA() {
  const [venit, setVenit] = useState<string>('60000');
  const [sistem, setSistem] = useState<'real' | 'norma'>('real');
  const [activitate, setActivitate] = useState<'altele' | 'it'>('altele');
  const [pensionar, setPensionar] = useState(false);
  const [cheltuieli, setCheltuieli] = useState<string>('0');

  const venitNum = parseFloat(venit) || 0;
  const cheltuieliNum = parseFloat(cheltuieli) || 0;

  const rezultat = useMemo(
    () => calculeaza(venitNum, sistem, activitate, pensionar, cheltuieliNum),
    [venitNum, sistem, activitate, pensionar, cheltuieliNum]
  );

  return (
    <div>
      {/* Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div className="form-group">
          <label>Venit brut anual (RON)</label>
          <input
            type="number"
            value={venit}
            onChange={e => setVenit(e.target.value)}
            min="0"
            step="1000"
            placeholder="ex: 60000"
          />
        </div>

        {sistem === 'real' && (
          <div className="form-group">
            <label>Cheltuieli deductibile anuale (RON)</label>
            <input
              type="number"
              value={cheltuieli}
              onChange={e => setCheltuieli(e.target.value)}
              min="0"
              step="500"
              placeholder="ex: 5000"
            />
          </div>
        )}

        <div className="form-group">
          <label>Sistem de impozitare</label>
          <select value={sistem} onChange={e => setSistem(e.target.value as 'real' | 'norma')}>
            <option value="real">Sistem real</option>
            <option value="norma">Normă de venit</option>
          </select>
        </div>

        <div className="form-group">
          <label>Domeniu activitate</label>
          <select value={activitate} onChange={e => setActivitate(e.target.value as 'altele' | 'it')}>
            <option value="altele">General / Altele</option>
            <option value="it">IT / Programare</option>
          </select>
        </div>

        <div className="form-group" style={{ justifyContent: 'flex-end' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 400 }}>
            <input
              type="checkbox"
              checked={pensionar}
              onChange={e => setPensionar(e.target.checked)}
              style={{ width: 'auto' }}
            />
            Pensionar (scutit CAS)
          </label>
        </div>
      </div>

      {/* Rezultate */}
      {venitNum > 0 && (
        <div className="result-box">
          <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#1a56db' }}>
            Rezultat calcul 2026
          </h3>
          <div className="result-row">
            <span className="result-label">Venit brut anual</span>
            <span className="result-value">{fmt(venitNum)}</span>
          </div>
          {cheltuieliNum > 0 && (
            <div className="result-row">
              <span className="result-label">Cheltuieli deductibile</span>
              <span className="result-value red">- {fmt(cheltuieliNum)}</span>
            </div>
          )}
          <div className="result-row">
            <span className="result-label">CAS — Pensie (25%)</span>
            <span className="result-value red">- {fmt(rezultat.cas)}</span>
          </div>
          <div className="result-row">
            <span className="result-label">CASS — Sănătate (10%)</span>
            <span className="result-value red">- {fmt(rezultat.cass)}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Impozit pe venit (10%)</span>
            <span className="result-value red">- {fmt(rezultat.impozit)}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Total taxe ({rezultat.procentTaxe.toFixed(1)}% din brut)</span>
            <span className="result-value red">- {fmt(rezultat.totalTaxe)}</span>
          </div>
          <div className="result-row" style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '2px solid #1a56db' }}>
            <span className="result-label font-bold" style={{ fontWeight: 700 }}>💰 Venit NET anual</span>
            <span className="result-value green">{fmt(rezultat.venitNet)}</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.75rem', marginBottom: 0 }}>
            ≈ {fmt(rezultat.venitNet / 12)} / lună · Plafon 6 sal: {fmt(PLAFON_6)} · Plafon 24 sal: {fmt(PLAFON_24)}
          </p>
        </div>
      )}

      {/* Tabel comparativ venituri */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Tabel comparativ venituri — 2026</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Venit brut</th>
                <th>CAS</th>
                <th>CASS</th>
                <th>Impozit</th>
                <th>Total taxe</th>
                <th>Venit net</th>
                <th>% taxe</th>
              </tr>
            </thead>
            <tbody>
              {TABEL_VENITURI.map(v => {
                const r = calculeaza(v, sistem, activitate, pensionar, 0);
                return (
                  <tr key={v} style={venitNum === v ? { background: '#e8effd' } : {}}>
                    <td style={{ fontWeight: 600 }}>{fmt(v)}</td>
                    <td>{fmt(r.cas)}</td>
                    <td>{fmt(r.cass)}</td>
                    <td>{fmt(r.impozit)}</td>
                    <td style={{ color: '#dc2626' }}>{fmt(r.totalTaxe)}</td>
                    <td style={{ color: '#059669', fontWeight: 600 }}>{fmt(r.venitNet)}</td>
                    <td>{r.procentTaxe.toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
          * Calcul sistem real, fără cheltuieli deductibile, fără pensionar. Salariu minim 2026: {fmt(SALARIU_MINIM)}.
        </p>
      </div>
    </div>
  );
}
