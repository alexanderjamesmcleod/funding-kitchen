import aiKitchen from '../../services/ai-kitchen.js';

export default function StepReview({ profile, matches, isMatching, setIsMatching, setMatches, onBack, goToStep }) {
  const org = profile.organization;
  const contact = profile.contact;
  const mission = profile.mission;
  const financials = profile.financials;
  const request = profile.current_funding_request;

  const formatCurrency = (value) => {
    if (!value) return '-';
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleFindFunders = async () => {
    setIsMatching(true);
    try {
      const results = await aiKitchen.matchFunders(profile);
      setMatches(results);
    } catch (error) {
      console.error('Matching failed:', error);
      alert('Failed to connect to AI Kitchen. Is the server running?');
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="form-step">
      <h2>🔍 Review Your Profile</h2>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        Review your information below, then click "Find Matching Funders" to discover opportunities.
      </p>

      {/* Organization */}
      <div className="review-section">
        <h4>
          🏢 Organization
          <span className="edit-link" onClick={() => goToStep(0)}> Edit</span>
        </h4>
        <div className="review-item">
          <span className="review-label">Name</span>
          <span className="review-value">{org.name || '-'}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Type</span>
          <span className="review-value">{org.type || '-'}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Region</span>
          <span className="review-value">{org.region || '-'}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Contact</span>
          <span className="review-value">{contact.name} ({contact.email})</span>
        </div>
      </div>

      {/* Mission */}
      <div className="review-section">
        <h4>
          🎯 Mission
          <span className="edit-link" onClick={() => goToStep(1)}> Edit</span>
        </h4>
        <div className="review-item">
          <span className="review-label">Purpose</span>
          <span className="review-value" style={{ maxWidth: '60%' }}>
            {mission.purpose?.slice(0, 150) || '-'}...
          </span>
        </div>
        <div className="review-item">
          <span className="review-label">Categories</span>
          <span className="review-value">
            {mission.categories?.join(', ') || '-'}
          </span>
        </div>
        <div className="review-item">
          <span className="review-label">Serves</span>
          <span className="review-value">
            {mission.target_population?.join(', ') || '-'}
          </span>
        </div>
      </div>

      {/* Financials */}
      <div className="review-section">
        <h4>
          💰 Financials
          <span className="edit-link" onClick={() => goToStep(2)}> Edit</span>
        </h4>
        <div className="review-item">
          <span className="review-label">Annual Revenue</span>
          <span className="review-value">{formatCurrency(financials.annual_revenue)}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Annual Expenses</span>
          <span className="review-value">{formatCurrency(financials.annual_expenses)}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Reserves</span>
          <span className="review-value">{formatCurrency(financials.reserves)}</span>
        </div>
      </div>

      {/* Funding Request */}
      <div className="review-section">
        <h4>
          📝 Funding Request
          <span className="edit-link" onClick={() => goToStep(3)}> Edit</span>
        </h4>
        <div className="review-item">
          <span className="review-label">Project</span>
          <span className="review-value">{request.project_name || '-'}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Amount Needed</span>
          <span className="review-value" style={{ color: '#ff9800', fontWeight: 'bold' }}>
            {formatCurrency(request.amount_requested)}
          </span>
        </div>
        <div className="review-item">
          <span className="review-label">Purpose</span>
          <span className="review-value">
            {request.purpose_categories?.join(', ') || '-'}
          </span>
        </div>
        <div className="review-item">
          <span className="review-label">Timeline</span>
          <span className="review-value">{request.timeline || '-'}</span>
        </div>
      </div>

      {/* Match Button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        {isMatching ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>🔍 Searching for matching funders...</p>
          </div>
        ) : matches ? (
          <div>
            <p style={{ color: '#4caf50', fontSize: '1.2rem', marginBottom: '1rem' }}>
              ✅ Found {matches.results?.length || 0} potential matches!
            </p>
            <button className="btn btn-match" onClick={handleFindFunders}>
              🔄 Search Again
            </button>
          </div>
        ) : (
          <button className="btn btn-match" onClick={handleFindFunders}>
            🔍 Find Matching Funders
          </button>
        )}
      </div>

      <div className="form-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <div></div>
      </div>
    </div>
  );
}
