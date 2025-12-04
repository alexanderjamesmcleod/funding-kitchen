const CATEGORIES = [
  'Sport', 'Arts & Culture', 'Education', 'Health', 'Youth',
  'Community', 'Environment', 'Heritage', 'Welfare', 'Disability',
  'Elderly', 'Māori', 'Pacific', 'Rural', 'Women', 'LGBTQI+',
  'Housing', 'Employment', 'Research', 'Emergency Services'
];

const TARGET_POPULATIONS = [
  'Children (0-12)', 'Youth (13-24)', 'Adults', 'Elderly',
  'Family', 'Māori', 'Pacific Peoples', 'Migrants/Refugees',
  'Disabled', 'LGBTQI+', 'Women', 'Rural communities',
  'Low income', 'General community'
];

export default function StepMission({ data, updateProfile, onNext, onBack }) {
  const handleChange = (field, value) => {
    updateProfile({ [field]: value });
  };

  const toggleArrayItem = (field, item) => {
    const current = data[field] || [];
    const updated = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    updateProfile({ [field]: updated });
  };

  const handleActivityChange = (value) => {
    const activities = value.split('\n').filter(a => a.trim());
    updateProfile({ activities });
  };

  const isValid = data.purpose && data.categories.length > 0 && data.target_population.length > 0;

  return (
    <div className="form-step">
      <h2>🎯 Mission & Impact</h2>

      <div className="form-group">
        <label>What is your organization's purpose? *</label>
        <textarea
          value={data.purpose}
          onChange={(e) => handleChange('purpose', e.target.value)}
          placeholder="Describe your organization's mission and what you aim to achieve in 2-3 sentences..."
        />
        <span className="hint">{data.purpose.length}/1000 characters</span>
      </div>

      <div className="form-group">
        <label>Key Activities</label>
        <textarea
          value={(data.activities || []).join('\n')}
          onChange={(e) => handleActivityChange(e.target.value)}
          placeholder="List your main activities (one per line)
e.g.,
Weekly coaching sessions
Holiday programmes
Equipment lending scheme"
          style={{ minHeight: '100px' }}
        />
      </div>

      <div className="form-group">
        <label>Categories that match your work * (select all that apply)</label>
        <div className="checkbox-group">
          {CATEGORIES.map(cat => (
            <label
              key={cat}
              className={`checkbox-item ${data.categories.includes(cat) ? 'selected' : ''}`}
            >
              <input
                type="checkbox"
                checked={data.categories.includes(cat)}
                onChange={() => toggleArrayItem('categories', cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Who do you primarily serve? * (select all that apply)</label>
        <div className="checkbox-group">
          {TARGET_POPULATIONS.map(pop => (
            <label
              key={pop}
              className={`checkbox-item ${data.target_population.includes(pop) ? 'selected' : ''}`}
            >
              <input
                type="checkbox"
                checked={data.target_population.includes(pop)}
                onChange={() => toggleArrayItem('target_population', pop)}
              />
              {pop}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Impact Statement</label>
        <textarea
          value={data.impact_statement}
          onChange={(e) => handleChange('impact_statement', e.target.value)}
          placeholder="Share a brief statement about the impact you've achieved. Include numbers if possible.
e.g., 'Last year we provided rugby opportunities to 450 young people, with 60% from low-income families receiving subsidized fees.'"
          style={{ minHeight: '100px' }}
        />
        <span className="hint">This helps funders understand your track record</span>
      </div>

      <div className="form-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={!isValid}
        >
          Next: Financials →
        </button>
      </div>
    </div>
  );
}
