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
      </div>

      <div className="wizard-progress">
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`progress-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            onClick={() => index <= currentStep && goToStep(index)}
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
