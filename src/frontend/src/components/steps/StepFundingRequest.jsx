const PURPOSE_CATEGORIES = [
  'Equipment/Assets',
  'Building/Facilities',
  'Programme delivery',
  'Salaries/Staffing',
  'Training/Development',
  'Events',
  'Marketing/Promotion',
  'Research',
  'Feasibility study',
  'Operational costs',
  'Vehicle'
];

export default function StepFundingRequest({ data, updateProfile, onNext, onBack }) {
  const handleChange = (field, value) => {
    updateProfile({ [field]: value });
  };

  const toggleCategory = (cat) => {
    const current = data.purpose_categories || [];
    const updated = current.includes(cat)
      ? current.filter(c => c !== cat)
      : [...current, cat];
    updateProfile({ purpose_categories: updated });
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const totalProject = Number(data.amount_requested || 0);
  const otherFunding = Number(data.other_funding_secured || 0);
  const ownContribution = Number(data.own_contribution || 0);
  const stillNeeded = totalProject - otherFunding - ownContribution;

  const isValid = data.project_name && data.description && data.amount_requested && data.purpose_categories.length > 0;

  return (
    <div className="form-step">
      <h2>📝 What are you seeking funding for?</h2>

      <div className="form-group">
        <label>Project/Request Name *</label>
        <input
          type="text"
          value={data.project_name}
          onChange={(e) => handleChange('project_name', e.target.value)}
          placeholder="e.g., Equipment Upgrade and Clubroom Improvements"
        />
      </div>

      <div className="form-group">
        <label>Describe what you need funding for *</label>
        <textarea
          value={data.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Provide a detailed description of your project or what you need funding for. Be specific about what the money will be used for and why it's needed..."
          style={{ minHeight: '150px' }}
        />
        <span className="hint">{data.description.length}/2000 characters - Be specific!</span>
      </div>

      <div className="form-group">
        <label>Purpose Categories * (select all that apply)</label>
        <div className="checkbox-group">
          {PURPOSE_CATEGORIES.map(cat => (
            <label
              key={cat}
              className={`checkbox-item ${(data.purpose_categories || []).includes(cat) ? 'selected' : ''}`}
            >
              <input
                type="checkbox"
                checked={(data.purpose_categories || []).includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Total Amount Needed *</label>
          <input
            type="number"
            value={data.amount_requested}
            onChange={(e) => handleChange('amount_requested', e.target.value)}
            placeholder="e.g., 45000"
          />
          {data.amount_requested && (
            <span className="hint">{formatCurrency(data.amount_requested)}</span>
          )}
        </div>

        <div className="form-group">
          <label>Timeline</label>
          <input
            type="text"
            value={data.timeline}
            onChange={(e) => handleChange('timeline', e.target.value)}
            placeholder="e.g., March - October 2025"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Other Funding Already Secured</label>
          <input
            type="number"
            value={data.other_funding_secured}
            onChange={(e) => handleChange('other_funding_secured', e.target.value)}
            placeholder="e.g., 8000"
          />
          {data.other_funding_secured && (
            <span className="hint">{formatCurrency(data.other_funding_secured)}</span>
          )}
        </div>

        <div className="form-group">
          <label>Your Own Contribution</label>
          <input
            type="number"
            value={data.own_contribution}
            onChange={(e) => handleChange('own_contribution', e.target.value)}
            placeholder="e.g., 7000"
          />
          {data.own_contribution && (
            <span className="hint">{formatCurrency(data.own_contribution)}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <label
            className={`checkbox-item ${data.has_quotes ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              checked={data.has_quotes}
              onChange={(e) => handleChange('has_quotes', e.target.checked)}
            />
            ✓ I have quotes for items/services
          </label>
        </div>
        <span className="hint">
          Most funders require at least 2 quotes for each item over $500
        </span>
      </div>

      {totalProject > 0 && (
        <div style={{
          background: '#f5f5f5',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
          <strong>💵 Funding Summary:</strong>
          <div style={{ marginTop: '0.5rem', display: 'grid', gap: '0.25rem' }}>
            <div>Total Project Cost: <strong>{formatCurrency(totalProject)}</strong></div>
            {otherFunding > 0 && <div>- Other Funding Secured: {formatCurrency(otherFunding)}</div>}
            {ownContribution > 0 && <div>- Your Contribution: {formatCurrency(ownContribution)}</div>}
            <div style={{ borderTop: '1px solid #ddd', paddingTop: '0.25rem', marginTop: '0.25rem' }}>
              <strong style={{ color: stillNeeded > 0 ? '#ff9800' : '#4caf50' }}>
                = Still Needed: {formatCurrency(Math.max(0, stillNeeded))}
              </strong>
            </div>
          </div>
        </div>
      )}

      <div className="form-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={!isValid}
        >
          Next: Review & Match →
        </button>
      </div>
    </div>
  );
}
