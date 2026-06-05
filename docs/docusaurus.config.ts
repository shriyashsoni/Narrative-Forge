import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'NarrativeForge',
  tagline: 'Autonomous Index Publisher',
  favicon: 'img/favicon.ico',

  url: 'https://narrativeforge.docs',
  baseUrl: '/',

  organizationName: 'NarrativeForge',
  projectName: 'narrative-forge-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // Serve docs at the root
        },
        blog: false, // Disable blog for now
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'NarrativeForge Docs',
      logo: {
        alt: 'NarrativeForge Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'http://localhost:5173',
          label: 'Launch App',
          position: 'right',
        },
        {
          href: 'https://github.com/NarrativeForge',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Introduction',
              to: '/introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.com',
            },
            {
              label: 'X',
              href: 'https://x.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} NarrativeForge Protocol. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
