import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'introduction',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Core Architecture',
      items: [
        'architecture/ai-oracle',
        'architecture/smart-contracts',
        'architecture/trading-engine'
      ],
    },
    {
      type: 'category',
      label: 'Network Deployments',
      items: [
        'deployments/sepolia',
        'deployments/mainnet-strategy'
      ],
    },
    {
      type: 'category',
      label: 'API References',
      items: [
        'apis/sosovalue',
        'apis/gemini',
        'apis/sodex'
      ],
    },
  ],
};

export default sidebars;
