const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function StepFinancials({ data, updateProfile, onNext, onBack }) {
  const handleChange = (field, value) => {
    updateProfile({ [field]: value });
  };

  const handleSourcesChange = (value) => {
    const sources = value.split('\n').filter(s => s.trim());
    updateProfile({ other_funding_sources: sources });
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="form-step">
      <h2>💰 Financial Information</h2>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        This information helps funders assess your organization's financial health.
        Most funders require recent financial accounts.
      </p>

      <div className="form-row">
        <div className="form-group">
          <label>Annual Revenue/Income</label>
          <input
            type="number"
            value={data.annual_revenue}
            onChange={(e) => handleChange('annual_revenue', e.target.value)}
            placeholder="e.g., 85000"
          />
          {data.annual_revenue && (
            <span className="hint">{formatCurrency(data.annual_revenue)}</span>
          )}
        </div>

        <div className="form-group">
          <label>Annual Expenses</label>
          <input
            type="number"
            value={data.annual_expenses}
            onChange={(e) => handleChange('annual_expenses', e.target.value)}
            placeholder="e.g., 78000"
          />
          {data.annual_expenses && (
            <span className="hint">{formatCurrency(data.annual_expenses)}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Cash Reserves/Savings</label>
          <input
            type="number"
            value={data.reserves}
            onChange={(e) => handleChange('reserves', e.target.value)}
            placeholder="e.g., 22000"
          />
          {data.reserves && (
            <span className="hint">{formatCurrency(data.reserves)}</span>
          )}
        </div>

        <div className="form-group">
          <label>Financial Year End</label>
          <select
            value={data.financial_year_end}
            onChange={(e) => handleChange('financial_year_end', e.target.value)}
          >
            <option value="">Select month...</option>
            {MONTHS.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <label
            className={`checkbox-item ${data.has_audited_accounts ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              checked={data.has_audited_accounts}
              onChange={(e) => handleChange('has_audited_accounts', e.target.checked)}
            />
            ✓ Accounts are Audited/Reviewed
          </label>
        </div>
        <span className="hint">
          Having audited accounts can strengthen your applications
        </span>
      </div>

      <div className="form-group">
        <label>Other Funding Sources</label>
        <textarea
          value={(data.other_funding_sources || []).join('\n')}
          onChange={(e) => handleSourcesChange(e.target.value)}
          placeholder="List your other funding sources (one per line)
e.g.,
Member subscriptions ($35,000)
Fundraising events ($15,000)
Previous grants from Pub Charity ($12,000)"
          style={{ minHeight: '100px' }}
        />
        <span className="hint">
          Shows funders you have diverse income streams
        </span>
      </div>

      {data.annual_revenue && data.annual_expenses && (
        <div style={{
          background: data.annual_revenue >= data.annual_expenses ? '#e8f5e9' : '#ffebee',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
          <strong>
            {data.annual_revenue >= data.annual_expenses ? '✅ ' : '⚠️ '}
            Financial Summary:
          </strong>
          <br />
          Surplus/Deficit: {formatCurrency(data.annual_revenue - data.annual_expenses)}
          {data.reserves && (
            <>
              <br />
              Reserves: {formatCurrency(data.reserves)} ({Math.round((data.reserves / data.annual_expenses) * 12)} months operating)
            </>
          )}
        </div>
      )}

      <div className="form-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Next: Funding Request →
        </button>
      </div>
    </div>
  );
}
