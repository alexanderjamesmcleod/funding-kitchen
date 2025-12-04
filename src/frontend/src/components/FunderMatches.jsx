export default function FunderMatches({ matches, profile }) {
  if (!matches || !matches.results || matches.results.length === 0) {
    return (
      <div className="funder-matches">
        <h3>No matches found</h3>
        <p>Try adjusting your categories or region to find more opportunities.</p>
      </div>
    );
  }

  const formatCurrency = (value) => {
    if (!value || value === 'Check with funder') return value;
    return value;
  };

  // Parse the RAG results
  const funders = matches.results.map((result, index) => {
    // Extract metadata from the document
    const doc = result.document || '';
    const metadata = result.metadata || {};

    // Try to extract fund name from document
    const fundNameMatch = doc.match(/^# (.+)$/m);
    const fundName = fundNameMatch ? fundNameMatch[1] : metadata.fund_name || 'Unknown Fund';

    // Extract funder name
    const funderMatch = doc.match(/\*\*Funder:\*\* (.+)$/m);
    const funderName = funderMatch ? funderMatch[1] : metadata.funder_name || 'Unknown';

    // Extract region
    const regionMatch = doc.match(/\*\*Region:\*\* (.+)$/m);
    const region = regionMatch ? regionMatch[1] : metadata.region || 'Nationwide';

    // Extract funding range
    const fundingMatch = doc.match(/\*\*Funding Range:\*\* (.+)$/m);
    const fundingRange = fundingMatch ? fundingMatch[1] : metadata.funding_range || 'Check with funder';

    // Extract deadline
    const deadlineMatch = doc.match(/\*\*Deadline:\*\* (.+)$/m);
    const deadline = deadlineMatch ? deadlineMatch[1] : metadata.deadline || 'Ongoing';

    // Extract categories
    const categories = metadata.categories?.split(',') || [];

    // Calculate match score (distance to percentage)
    const distance = result.distance || 0;
    const score = Math.max(0, Math.round(100 - (distance * 50)));

    return {
      rank: index + 1,
      fundName,
      funderName,
      region,
      fundingRange,
      deadline,
      categories,
      score,
      document: doc
    };
  });

  return (
    <div className="funder-matches">
      <h3>🎯 Matching Funding Opportunities</h3>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        Based on your profile, here are the best matches for <strong>{profile.organization.name}</strong>
      </p>

      {funders.map((funder) => (
        <div key={funder.rank} className="match-card">
          <div className="match-header">
            <div>
              <div className="match-title">{funder.fundName}</div>
              <div className="match-funder">🏢 {funder.funderName}</div>
            </div>
            <div className="match-score">{funder.score}% match</div>
          </div>

          <div className="match-details">
            <div className="match-detail">
              📍 {funder.region}
            </div>
            <div className="match-detail">
              💰 {funder.fundingRange}
            </div>
            <div className="match-detail">
              📅 {funder.deadline}
            </div>
          </div>

          {funder.categories.length > 0 && (
            <div className="match-categories">
              {funder.categories.slice(0, 5).map((cat, i) => (
                <span key={i} className="category-tag">{cat.trim()}</span>
              ))}
            </div>
          )}

          <div style={{ marginTop: '1rem' }}>
            <button
              className="btn btn-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
              onClick={() => alert(`Generate application for ${funder.fundName}\n\nComing soon!`)}
            >
              📝 Generate Application
            </button>
          </div>
        </div>
      ))}

      <div style={{
        background: '#fff3e0',
        padding: '1.5rem',
        borderRadius: '8px',
        marginTop: '2rem',
        textAlign: 'center'
      }}>
        <h4>🍳 Ready to apply?</h4>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          FundingKitchen can generate complete applications for each funder.
          <br />
          We'll tailor your story to each funder's requirements.
        </p>
        <button
          className="btn btn-match"
          onClick={() => alert('Bulk application generation coming soon!')}
        >
          Generate All Applications
        </button>
      </div>
    </div>
  );
}
