export type CampaignForm = {
  title: string;
  budget: string;
  startDate: string | null;
  endDate: string | null;

  platforms: string[];
  niches: string[];
  deliverables: string[];
  requirements: string[];
};
