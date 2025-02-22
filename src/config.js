export default {
  version: '4.0.2-PTU.9546856',
  scuContainerSizes: [1, 2, 4, 8, 16, 24, 32],
  rewards: [
    {
      id: 'display',
      name: 'Pyro Resupply Commermorative Display',
      points: 630,
      image: null,
    },
    {
      id: 'ravanger-212-outcast',
      name: 'Ravanger-212 “Outcast” Twin-Shotgun',
      points: 1050,
      image: null,
    },
    {
      id: 'liveries',
      name: 'Vulture & Prospector Ship Liveries',
      points: 1470,
      image: 'reward-liveries.png',
    },
  ],
  commodity: [
    {
      id: 'rmc',
      name: 'Recycled Material Composite',
      nameShort: 'RMC',
      priceRangePerScu: {
        min: 9000,
        max: 9775,
      },
    },
    {
      id: 'cm',
      name: 'Construction Materials',
      nameShort: 'CM',
      priceRangePerScu: {
        min: 1700,
        max: 1980,
      },
    },
    {
      id: 'tin',
      name: 'Tin',
      nameShort: 'Tin',
      priceRangePerScu: {
        min: 286,
        max: 286,
      },
    },
    {
      id: 'ice',
      name: 'Pressurized Ice',
      nameShort: 'Ice',
      priceRangePerScu: {
        min: 581,
        max: 696,
      },
    },
    {
      id: 'detatrine',
      name: 'Detatrine',
      nameShort: 'Det',
      priceRangePerScu: {
        min: 7200,
        max: 7200,
      },
    },
  ],
  missionCategory: [
    {
      id: 'low-risk',
      name: 'Low Risk',
    },
    {
      id: 'high-risk',
      name: 'High Risk',
    },
  ],
  missionTableFields: [
    {
      name: 'name',
      title: 'Mission',
      classSuffix: 'name',
    },
    {
      name: 'nameShort',
      title: '',
      classSuffix: 'name',
    },
    {
      name: 'reward.points',
      title: 'Points',
      classSuffix: 'points',
    },
    {
      name: 'paymentFormatted',
      title: 'Pay (aUEC)',
      classSuffix: 'payment',
    },
    {
      name: 'commoditiesFormatted',
      title: 'Commodities',
      classSuffix: 'commodities',
    },
    {
      name: 'scuPerMissionFormatted',
      title: 'SCU',
      classSuffix: 'scu',
    },
    {
      name: 'minContainerCount',
      title: 'min Containers',
      classSuffix: 'containers',
    },
    {
      name: 'investmentFormatted',
      title: 'Investment (aUEC)',
      classSuffix: 'investment',
    },
    {
      name: 'profitFormatted',
      title: 'Profit (aUEC)',
      classSuffix: 'profit',
    },
    {
      name: 'profitPerScuFormatted',
      title: 'Profit per SCU (aUEC)',
      classSuffix: 'profit-per-scu',
    },
    {
      name: 'profitPerContainerFormatted',
      title: 'Profit per Container (aUEC)',
      classSuffix: 'profit-per-container',
    },
    {
      name: 'pointsPerScuFormatted',
      title: 'Points per SCU',
      classSuffix: 'points-per-scu',
    },
    {
      name: 'pointsPerContainer',
      title: 'Points per Container',
      classSuffix: 'points-per-container',
    },
    {
      name: 'missionsNeededForHighestReward',
      title: 'All Rewards (Hand-Ins)',
      classSuffix: 'missions-needed',
    },
    {
      name: 'profitAllNeededMissionsFormatted',
      title: 'Profit all Rewards (aUEC)',
      classSuffix: 'profit-per-scu',
    },
  ],
  missions: [
    {
      id: 'salvage-small',
      name: 'Salvage Small',
      nameShort: 'Small',
      missionCategory_id: 'low-risk',
      reward: {
        payment: 195000,
        points: 49,
      },
      commodities: [
        {
          commodity_id: 'rmc',
          scu: 7,
        },
        {
          commodity_id: 'cm',
          scu: 14,
        },
      ],
    },
    {
      id: 'salvage-medium',
      name: 'Salvage Medium',
      nameShort: 'Medium',
      missionCategory_id: 'low-risk',
      reward: {
        payment: 2000000,
        points: 73,
      },
      commodities: [
        {
          commodity_id: 'rmc',
          scu: 56,
        },
        {
          commodity_id: 'cm',
          scu: 105,
        },
      ],
    },
    {
      id: 'salvage-large',
      name: 'Salvage Large',
      nameShort: 'Large',
      missionCategory_id: 'low-risk',
      reward: {
        payment: 5000000,
        points: 140,
      },
      commodities: [
        {
          commodity_id: 'rmc',
          scu: 200,
        },
        {
          commodity_id: 'cm',
          scu: 400,
        },
      ],
    },
    {
      id: 'mining-small',
      name: 'Mining Small',
      nameShort: 'Small',
      missionCategory_id: 'low-risk',
      reward: {
        payment: 195000,
        points: 49,
      },
      commodities: [
        {
          commodity_id: 'tin',
          scu: 14,
        },
        {
          commodity_id: 'ice',
          scu: 2,
        },
      ],
    },
    {
      id: 'mining-medium',
      name: 'Mining Medium',
      nameShort: 'Medium',
      missionCategory_id: 'low-risk',
      reward: {
        payment: 2000000,
        points: 73,
      },
      commodities: [
        {
          commodity_id: 'tin',
          scu: 94,
        },
        {
          commodity_id: 'ice',
          scu: 94,
        },
      ],
    },
    {
      id: 'mining-large',
      name: 'Mining Large',
      nameShort: 'Large',
      missionCategory_id: 'low-risk',
      reward: {
        payment: 5000000,
        points: 140,
      },
      commodities: [
        {
          commodity_id: 'tin',
          scu: 357,
        },
        {
          commodity_id: 'ice',
          scu: 357,
        },
      ],
    },
    {
      id: 'detatrine-small',
      name: 'Detatrine Small',
      nameShort: 'Small',
      missionCategory_id: 'high-risk',
      reward: {
        payment: 633600,
        points: 49,
      },
      commodities: [
        {
          commodity_id: 'detatrine',
          scu: 62,
        },
      ],
    },
    {
      id: 'detatrine-medium',
      name: 'Detatrine Medium',
      nameShort: 'Medium',
      missionCategory_id: 'high-risk',
      reward: {
        payment: 5000000,
        points: 72,
      },
      commodities: [
        {
          commodity_id: 'detatrine',
          scu: 550,
        },
      ],
    },
    {
      id: 'detatrine-large',
      name: 'Detatrine Large',
      nameShort: 'Large',
      missionCategory_id: 'high-risk',
      reward: {
        payment: 24000000,
        points: 134,
      },
      commodities: [
        {
          commodity_id: 'detatrine',
          scu: 2500,
        },
      ],
    },
  ],
}
