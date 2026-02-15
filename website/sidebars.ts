import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  platformSidebar: [
    'index',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/overview',
        'getting-started/create-account',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Platform',
      items: [
        'platform/storefront',
        'platform/launcher',
        'platform/licenses',
        'platform/payments',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/supported-platforms',
        'reference/system-requirements',
        'reference/faq',
        'reference/glossary',
      ],
    },
  ],

  forgeSidebar: [
    'forge/overview',
    'forge/getting-started',
    'forge/prompting-guide',
    'forge/templates',
    'forge/github-integration',
    'forge/publishing',
    'forge/updating-games',
    'forge/plans',
  ],

  sdkSidebar: [
    'sdk/overview',
    'sdk/installation',
    'sdk/core',
    'sdk/input',
    'sdk/physics',
    'sdk/ui',
    'sdk/audio',
    'sdk/multiplayer',
    'sdk/mono',
    'sdk/world',
  ],

  publishingSidebar: [
    'publishing/overview',
    'publishing/registration',
    'publishing/submission-process',
    'publishing/security-scanning',
    'publishing/code-signing',
    'publishing/content-guidelines',
  ],

  gridSidebar: [
    'grid/overview',
    'grid/getting-started',
    'grid/requirements',
    'grid/raspberry-pi',
    'grid/docker',
    'grid/rewards',
    'grid/dashboard',
    'grid/faq',
  ],

  developersSidebar: [
    'developers/overview',
    'developers/dev-console',
    'developers/api-reference',
    'developers/smart-contracts',
  ],
};

export default sidebars;
