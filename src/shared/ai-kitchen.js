/**
 * AI Kitchen Client
 * Connects FundingKitchen to AI Kitchen platform services
 */

const AI_KITCHEN_URL = import.meta?.env?.VITE_AI_KITCHEN_URL || 'http://localhost:8081';
const AI_KITCHEN_TOKEN = import.meta?.env?.VITE_AI_KITCHEN_TOKEN || 'dev-token-12345';

export const aiKitchen = {
  /**
   * Search funding opportunities in RAG
   */
  async searchFunders(query, limit = 10) {
    const res = await fetch(`${AI_KITCHEN_URL}/api/rag/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_KITCHEN_TOKEN}`
      },
      body: JSON.stringify({
        query,
        collection: 'funding_opportunities',
        limit
      })
    });
    return res.json();
  },

  /**
   * Match an org profile to funders
   */
  async matchFunders(profile) {
    // Build search query from profile
    const queryParts = [];

    if (profile.organization?.type) {
      queryParts.push(profile.organization.type);
    }
    if (profile.organization?.region) {
      queryParts.push(`in ${profile.organization.region}`);
    }
    if (profile.mission?.categories) {
      queryParts.push(profile.mission.categories.join(' '));
    }
    if (profile.mission?.target_population) {
      queryParts.push(profile.mission.target_population.join(' '));
    }
    if (profile.current_funding_request?.purpose_categories) {
      queryParts.push(profile.current_funding_request.purpose_categories.join(' '));
    }
    if (profile.current_funding_request?.description) {
      queryParts.push(profile.current_funding_request.description.slice(0, 200));
    }

    const query = queryParts.join(' ');
    return this.searchFunders(query, 15);
  },

  /**
   * Get RAG stats
   */
  async getStats() {
    const res = await fetch(`${AI_KITCHEN_URL}/api/rag/stats?token=${AI_KITCHEN_TOKEN}`);
    return res.json();
  },

  /**
   * Health check
   */
  async healthCheck() {
    try {
      const res = await fetch(`${AI_KITCHEN_URL}/api/rag/health`);
      return res.ok;
    } catch {
      return false;
    }
  }
};

export default aiKitchen;
