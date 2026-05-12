import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'whitepaper',
      label: '🚀 Introduction',
    },
    {
      type: 'category',
      label: '🏗️ Architecture',
      items: ['architecture/engine'],
    },
    {
      type: 'category',
      label: '💎 Protocol Layers',
      items: ['layers/intelligence', 'layers/execution'],
    },
  ],
};

export default sidebars;
