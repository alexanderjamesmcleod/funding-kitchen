import { useState } from 'react';

const ORG_TYPES = [
  'Incorporated Society',
  'Registered Charitable Trust',
  'Nonprofit (unincorporated group)',
  'Club/Team',
  'School',
  'Local Body',
  'Social Enterprise',
  'Maori Land Trust'
];

const NZ_REGIONS = [
  'Northland', 'Auckland', 'Waikato', 'Bay of Plenty', 'Gisborne',
  'Hawke\'s Bay', 'Taranaki', 'Manawatū-Whanganui', 'Wellington',
  'Tasman', 'Nelson', 'Marlborough', 'West Coast', 'Canterbury',
  'Otago', 'Southland', 'Nationwide'
];

export default function StepOrganization({ data, updateProfile, onNext }) {
  const org = data.organization;
  const contact = data.contact;
  const legal = data.legal;

  const handleOrgChange = (field, value) => {
    updateProfile('organization', { ...org, [field]: value });
  };

  const handleContactChange = (field, value) => {
    updateProfile('contact', { ...contact, [field]: value });
  };

  const handleLegalChange = (field, value) => {
    updateProfile('legal', { ...legal, [field]: value });
  };

  const isValid = org.name && org.type && org.region && contact.name && contact.email;

  return (
    <div className="form-step">
      <h2>🏢 Tell us about your organization</h2>

      <div className="form-group">
        <label>Organization Name *</label>
        <input
          type="text"
          value={org.name}
          onChange={(e) => handleOrgChange('name', e.target.value)}
          placeholder="e.g., Taranaki Youth Rugby Trust"
        />
      </div>

      <div className="form-group">
        <label>Trading As (if different)</label>
        <input
          type="text"
          value={org.trading_as}
          onChange={(e) => handleOrgChange('trading_as', e.target.value)}
          placeholder="e.g., Taranaki Junior Rugby"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Organization Type *</label>
          <select
            value={org.type}
            onChange={(e) => handleOrgChange('type', e.target.value)}
          >
            <option value="">Select type...</option>
            {ORG_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Region *</label>
          <select
            value={org.region}
            onChange={(e) => handleOrgChange('region', e.target.value)}
          >
            <option value="">Select region...</option>
            {NZ_REGIONS.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Year Established</label>
          <input
            type="number"
            value={org.year_established}
            onChange={(e) => handleOrgChange('year_established', e.target.value)}
            placeholder="e.g., 2012"
            min="1800"
            max={new Date().getFullYear()}
          />
        </div>

        <div className="form-group">
          <label>Number of Members</label>
          <input
            type="number"
            value={org.member_count}
            onChange={(e) => handleOrgChange('member_count', e.target.value)}
            placeholder="e.g., 200"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Paid Staff</label>
          <input
            type="number"
            value={org.staff_count}
            onChange={(e) => handleOrgChange('staff_count', e.target.value)}
            placeholder="0 if volunteer-only"
          />
        </div>

        <div className="form-group">
          <label>Active Volunteers</label>
          <input
            type="number"
            value={org.volunteer_count}
            onChange={(e) => handleOrgChange('volunteer_count', e.target.value)}
            placeholder="e.g., 25"
          />
        </div>
      </div>

      <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>📋 Legal Details</h3>

      <div className="form-row">
        <div className="form-group">
          <label>Charities Registration Number</label>
          <input
            type="text"
            value={legal.charities_number}
            onChange={(e) => handleLegalChange('charities_number', e.target.value)}
            placeholder="e.g., CC12345"
          />
          <span className="hint">If registered with Charities Services</span>
        </div>

        <div className="form-group">
          <label>Incorporated Societies Number</label>
          <input
            type="text"
            value={legal.incorporated_number}
            onChange={(e) => handleLegalChange('incorporated_number', e.target.value)}
            placeholder="If applicable"
          />
        </div>
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <label
            className={`checkbox-item ${legal.has_constitution ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              checked={legal.has_constitution}
              onChange={(e) => handleLegalChange('has_constitution', e.target.checked)}
            />
            ✓ Has Constitution/Rules
          </label>
          <label
            className={`checkbox-item ${legal.has_gaming_machines ? 'selected' : ''}`}
            style={{ background: legal.has_gaming_machines ? '#f44336' : undefined }}
          >
            <input
              type="checkbox"
              checked={legal.has_gaming_machines}
              onChange={(e) => handleLegalChange('has_gaming_machines', e.target.checked)}
            />
            🎰 Operates Gaming Machines
          </label>
        </div>
        {legal.has_gaming_machines && (
          <span className="hint" style={{ color: '#f44336' }}>
            Note: Many gaming trusts won't fund organizations that operate gaming machines
          </span>
        )}
      </div>

      <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>👤 Primary Contact</h3>

      <div className="form-row">
        <div className="form-group">
          <label>Contact Name *</label>
          <input
            type="text"
            value={contact.name}
            onChange={(e) => handleContactChange('name', e.target.value)}
            placeholder="e.g., Sarah Mitchell"
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            value={contact.role}
            onChange={(e) => handleContactChange('role', e.target.value)}
            placeholder="e.g., Secretary, Treasurer"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            placeholder="e.g., contact@yourorg.org.nz"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={contact.phone}
            onChange={(e) => handleContactChange('phone', e.target.value)}
            placeholder="e.g., 027 555 1234"
          />
        </div>
      </div>

      <div className="form-actions">
        <div></div>
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={!isValid}
        >
          Next: Mission & Impact →
        </button>
      </div>
    </div>
  );
}
