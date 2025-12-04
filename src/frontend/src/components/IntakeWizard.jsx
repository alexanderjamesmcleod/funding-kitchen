import { useState } from 'react';
import StepOrganization from './steps/StepOrganization';
import StepMission from './steps/StepMission';
import StepFinancials from './steps/StepFinancials';
import StepFundingRequest from './steps/StepFundingRequest';
import StepReview from './steps/StepReview';
import FunderMatches from './FunderMatches';
import './IntakeWizard.css';

const STEPS = [
  { id: 'organization', title: 'Organization', icon: '🏢' },
  { id: 'mission', title: 'Mission & Impact', icon: '🎯' },
  { id: 'financials', title: 'Financials', icon: '💰' },
  { id: 'funding-request', title: 'Funding Request', icon: '📝' },
  { id: 'review', title: 'Review & Match', icon: '🔍' },
];

const INITIAL_PROFILE = {
  organization: {
    name: '',
    trading_as: '',
    type: '',
    region: '',
    districts: [],
    year_established: '',
    member_count: '',
    staff_count: '',
    volunteer_count: ''
  },
  contact: {
    name: '',
    role: '',
    email: '',
    phone: ''
  },
  legal: {
    charities_number: '',
    incorporated_number: '',
    has_constitution: false,
    has_gaming_machines: false
  },
  mission: {
    purpose: '',
    activities: [],
    target_population: [],
    categories: [],
    impact_statement: ''
  },
  affiliations: [],
  financials: {
    annual_revenue: '',
    annual_expenses: '',
    reserves: '',
    financial_year_end: '',
    has_audited_accounts: false,
    other_funding_sources: []
  },
  current_funding_request: {
    project_name: '',
    description: '',
    amount_requested: '',
    purpose_categories: [],
    timeline: '',
    has_quotes: false,
    other_funding_secured: '',
    own_contribution: ''
  }
};

// Demo data for testing
const DEMO_PROFILE = {
  organization: {
    name: 'Taranaki Youth Rugby Trust',
    trading_as: 'Taranaki Junior Rugby',
    type: 'Registered Charitable Trust',
    region: 'Taranaki',
    districts: ['New Plymouth', 'South Taranaki'],
    year_established: '2012',
    member_count: '450',
    staff_count: '1',
    volunteer_count: '45'
  },
  contact: {
    name: 'Sarah Mitchell',
    role: 'Trust Secretary',
    email: 'sarah@taranakijuniorrugby.org.nz',
    phone: '027 555 1234'
  },
  legal: {
    charities_number: 'CC54321',
    incorporated_number: '',
    has_constitution: true,
    has_gaming_machines: false
  },
  mission: {
    purpose: 'To develop youth rugby in Taranaki by providing coaching, equipment, and competition opportunities for young players aged 5-18, with a focus on making rugby accessible to all families regardless of financial circumstances.',
    activities: ['Weekly coaching sessions', 'Holiday rugby camps', 'Equipment lending scheme', 'Hardship fund for fees'],
    target_population: ['Children (0-12)', 'Youth (13-24)', 'Low income', 'Rural communities'],
    categories: ['Sport', 'Youth', 'Community', 'Health'],
    impact_statement: 'In 2024 we provided rugby opportunities to 450 young people across Taranaki. 35% received subsidized fees through our hardship fund, and 12 of our junior players were selected for Taranaki representative teams.'
  },
  affiliations: [],
  financials: {
    annual_revenue: '85000',
    annual_expenses: '78000',
    reserves: '22000',
    financial_year_end: 'December',
    has_audited_accounts: true,
    other_funding_sources: ['Player registrations ($35,000)', 'Fundraising events ($15,000)', 'Previous grants ($12,000)']
  },
  current_funding_request: {
    project_name: 'Equipment Upgrade and Clubroom Improvements',
    description: 'We are seeking funding for two key projects: (1) Replacement of aging training equipment including tackle bags, hit shields, and training balls that are now 8+ years old. (2) Upgrade of our clubroom facilities to improve accessibility, including a wheelchair ramp and improved lighting for evening sessions.',
    amount_requested: '45000',
    purpose_categories: ['Equipment/Assets', 'Building/Facilities'],
    timeline: 'March - October 2025',
    has_quotes: true,
    other_funding_secured: '8000',
    own_contribution: '7000'
  }
};

export default function IntakeWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [matches, setMatches] = useState(null);
  const [isMatching, setIsMatching] = useState(false);

  const updateProfile = (section, data) => {
    setProfile(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const loadDemoData = () => {
    setProfile(DEMO_PROFILE);
    setCurrentStep(4); // Jump to review step
    setMatches(null);
  };

  const skipToStep = (step) => {
    if (profile.organization.name === '') {
      setProfile(DEMO_PROFILE);
    }
    setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (index) => {
    setCurrentStep(index);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepOrganization
            data={profile}
            updateProfile={updateProfile}
            onNext={nextStep}
          />
        );
      case 1:
        return (
          <StepMission
            data={profile.mission}
            updateProfile={(data) => updateProfile('mission', data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 2:
        return (
          <StepFinancials
            data={profile.financials}
            updateProfile={(data) => updateProfile('financials', data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <StepFundingRequest
            data={profile.current_funding_request}
            updateProfile={(data) => updateProfile('current_funding_request', data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <StepReview
            profile={profile}
            matches={matches}
            isMatching={isMatching}
            setIsMatching={setIsMatching}
            setMatches={setMatches}
            onBack={prevStep}
            goToStep={goToStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="intake-wizard">
      <div className="wizard-header">
        <h1>🍳 FundingKitchen</h1>
        <p>Let's find the perfect funding opportunities for your organization</p>
        <div className="demo-controls">
          <button className="btn-demo" onClick={loadDemoData}>
            🚀 Load Demo Data & Skip to Matching
          </button>
          <span className="demo-hint">or click any step below to jump there</span>
        </div>
      </div>

      <div className="wizard-progress">
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`progress-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            onClick={() => skipToStep(index)}
            style={{ cursor: 'pointer' }}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-title">{step.title}</div>
            {index < STEPS.length - 1 && <div className="step-connector" />}
          </div>
        ))}
      </div>

      <div className="wizard-content">
        {renderStep()}
      </div>

      {matches && currentStep === 4 && (
        <FunderMatches matches={matches} profile={profile} />
      )}
    </div>
  );
}
