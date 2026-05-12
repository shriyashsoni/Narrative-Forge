import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data representing what the AI would extract from SoSoValue
  const narratives = [
    {
      id: 'ai-infra',
      theme: 'AI Infrastructure',
      momentum: 94,
      trend: 'up',
      tokens: [
        { symbol: 'FET', name: 'Fetch.ai', price: 2.41, change: 12.4 },
        { symbol: 'RNDR', name: 'Render', price: 10.21, change: 8.1 },
        { symbol: 'AKT', name: 'Akash', price: 5.82, change: -2.1 },
        { symbol: 'TAO', name: 'Bittensor', price: 451.09, change: 15.7 },
        { symbol: 'NEAR', name: 'Near Protocol', price: 7.12, change: 4.3 },
      ],
      stats: {
        vol24h: '$2.4B',
        peakVol: '$3.8B',
      }
    },
    {
      id: 'rwa',
      theme: 'Real World Assets',
      momentum: 62,
      trend: 'stable',
      tokens: [
        { symbol: 'ONDO', name: 'Ondo', price: 0.82, change: 5.1 },
        { symbol: 'MKR', name: 'Maker', price: 2840, change: -1.2 },
      ],
      stats: {
        vol24h: '$0.8B',
        peakVol: '$1.2B',
      }
    },
    {
      id: 'l2-season',
      theme: 'L2 Season',
      momentum: 34,
      trend: 'down',
      tokens: [
        { symbol: 'OP', name: 'Optimism', price: 2.34, change: -4.8 },
        { symbol: 'ARB', name: 'Arbitrum', price: 1.12, change: -3.2 },
      ],
      stats: {
        vol24h: '$1.1B',
        peakVol: '$2.5B',
      }
    }
  ];

  return NextResponse.json(narratives);
}
