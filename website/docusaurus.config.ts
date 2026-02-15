import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MonoPlay Documentation',
  tagline: 'Build, publish, and play games on the decentralized web',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://docs.monoplay.xyz',
  baseUrl: '/',

  organizationName: 'monoplay-xyz',
  projectName: 'docs-monoplay',

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    ['@easyops-cn/docusaurus-search-local', {
      hashed: true,
      indexBlog: false,
      docsRouteBasePath: '/',
    }],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/og-image.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    navbar: {
      title: 'MonoPlay',
      logo: {
        alt: 'MonoPlay Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'platformSidebar',
          position: 'left',
          label: 'Platform',
        },
        {
          type: 'docSidebar',
          sidebarId: 'forgeSidebar',
          position: 'left',
          label: 'Forge',
        },
        {
          type: 'docSidebar',
          sidebarId: 'sdkSidebar',
          position: 'left',
          label: 'SDK',
        },
        {
          type: 'docSidebar',
          sidebarId: 'publishingSidebar',
          position: 'left',
          label: 'Publishing',
        },
        {
          type: 'docSidebar',
          sidebarId: 'gridSidebar',
          position: 'left',
          label: 'GRID',
        },
        {
          type: 'docSidebar',
          sidebarId: 'developersSidebar',
          position: 'left',
          label: 'Developers',
        },
        {
          href: 'https://monoplay.xyz',
          label: 'Game Store',
          position: 'right',
        },
        {
          href: 'https://github.com/monoplay-xyz',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Platform',
          items: [
            { label: 'Game Store', href: 'https://monoplay.xyz' },
            { label: 'Download Launcher', href: 'https://monoplay.xyz/download' },
            { label: 'Developer Console', href: 'https://dev.monoplay.xyz' },
          ],
        },
        {
          title: 'Build',
          items: [
            { label: 'MonoPlay Forge', href: 'https://forge.monoplay.xyz' },
            { label: 'SDK Documentation', to: '/sdk/overview' },
            { label: 'Templates', to: '/forge/templates' },
          ],
        },
        {
          title: 'Network',
          items: [
            { label: 'GRID Nodes', to: '/grid/overview' },
            { label: 'Run a Node', to: '/grid/getting-started' },
            { label: 'Node Dashboard', href: 'https://grid.monoplay.xyz' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Twitter', href: 'https://twitter.com/monoplay_xyz' },
            { label: 'Discord', href: 'https://discord.gg/monoplay' },
            { label: 'GitHub', href: 'https://github.com/monoplay-xyz' },
          ],
        },
      ],
      copyright: `Copyright \u00A9 ${new Date().getFullYear()} MonoPlay. Built on Monolythium.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'toml', 'yaml', 'rust', 'solidity'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
