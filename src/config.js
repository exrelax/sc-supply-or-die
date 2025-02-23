export default {
  version: '4.0.2-PTU.9573936',
  scuContainerSizes: [1, 2, 4, 8, 16, 24, 32],
  rewards: [
    {
      id: 'display',
      name: 'Pyro Resupply Commermorative Display',
      points: 800,
      image: null,
    },
    {
      id: 'ravanger-212-outcast',
      name: 'Ravanger-212 “Outcast” Twin-Shotgun',
      points: 1800,
      image: null,
    },
    {
      id: 'liveries',
      name: 'Vulture & Prospector Ship Liveries',
      points: 2800,
      image: 'reward-liveries.png',
    },
  ],
  commodities: [
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
      id: 'det',
      name: 'Detatrine',
      nameShort: 'Det',
      priceRangePerScu: {
        min: 7200,
        max: 7200,
      },
    },
    {
      id: 'cop',
      name: 'Coppper',
      nameShort: 'Cop',
      priceRangePerScu: {
        min: 301,
        max: 329,
      },
    },
    {
      id: 'cor',
      name: 'Corundum',
      nameShort: 'Cor',
      priceRangePerScu: {
        min: 287,
        max: 328,
      },
    },
  ],
  missionCategories: [
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
      id: 'pyro-salvage-small',
      name: 'Salvage Small',
      nameShort: 'Small',
      missionCategory_id: 'low-risk',
      system: 'Pyro',
      reward: {
        payment: 391000,
        points: 200,
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
      id: 'pyro-salvage-medium',
      name: 'Salvage Medium',
      nameShort: 'Medium',
      missionCategory_id: 'low-risk',
      system: 'Pyro',
      reward: {
        payment: 3000000,
        points: 300,
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
      id: 'pyro-salvage-large',
      name: 'Salvage Large',
      nameShort: 'Large',
      missionCategory_id: 'low-risk',
      system: 'Pyro',
      reward: {
        payment: 13000000,
        points: 534,
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
      id: 'pyro-mining-small',
      name: 'Mining Small',
      nameShort: 'Small',
      missionCategory_id: 'low-risk',
      system: 'Pyro',
      reward: {
        payment: 790000,
        points: 188,
      },
      commodities: [
        {
          commodity_id: 'tin',
          scu: 6,
        },
        {
          commodity_id: 'ice',
          scu: 6,
        },
      ],
    },
    {
      id: 'pyro-mining-medium',
      name: 'Mining Medium',
      nameShort: 'Medium',
      missionCategory_id: 'low-risk',
      system: 'Pyro',
      reward: {
        payment: 6000000,
        points: 392,
      },
      commodities: [
        {
          commodity_id: 'tin',
          scu: 63,
        },
        {
          commodity_id: 'ice',
          scu: 63,
        },
      ],
    },
    {
      id: 'pyro-mining-large',
      name: 'Mining Large',
      nameShort: 'Large',
      missionCategory_id: 'low-risk',
      system: 'Pyro',
      reward: {
        payment: 26000000,
        points: 715,
      },
      commodities: [
        {
          commodity_id: 'tin',
          scu: 228,
        },
        {
          commodity_id: 'ice',
          scu: 228,
        },
      ],
    },
    {
      id: 'stanton-mining-small',
      name: 'Mining Small',
      nameShort: 'Small',
      missionCategory_id: 'low-risk',
      system: 'Stanton',
      reward: {
        payment: 391000,
        points: 200,
      },
      commodities: [
        {
          commodity_id: 'cop',
          scu: 13,
        },
        {
          commodity_id: 'cor',
          scu: 13,
        },
      ],
    },
    {
      id: 'stanton-mining-medium',
      name: 'Mining Medium',
      nameShort: 'Medium',
      missionCategory_id: 'low-risk',
      system: 'Stanton',
      reward: {
        payment: 3000000,
        points: 300,
      },
      commodities: [
        {
          commodity_id: 'cop',
          scu: 94,
        },
        {
          commodity_id: 'cor',
          scu: 94,
        },
      ],
    },
    {
      id: 'stanton-mining-large',
      name: 'Mining Large',
      nameShort: 'Large',
      missionCategory_id: 'low-risk',
      system: 'Stanton',
      reward: {
        payment: 13000000,
        points: 534,
      },
      commodities: [
        {
          commodity_id: 'cop',
          scu: 334,
        },
        {
          commodity_id: 'cor',
          scu: 334,
        },
      ],
    },
    {
      id: 'pyro-detatrine-small',
      name: 'Detatrine Small',
      nameShort: 'Small',
      missionCategory_id: 'high-risk',
      system: 'Pyro',
      reward: {
        payment: 634000,
        points: 199,
      },
      commodities: [
        {
          commodity_id: 'det',
          scu: 62,
        },
      ],
    },
    {
      id: 'pyro-detatrine-medium',
      name: 'Detatrine Medium',
      nameShort: 'Medium',
      missionCategory_id: 'high-risk',
      system: 'Pyro',
      reward: {
        payment: 5000000,
        points: 292,
      },
      commodities: [
        {
          commodity_id: 'det',
          scu: 550,
        },
      ],
    },
    {
      id: 'pyro-detatrine-large',
      name: 'Detatrine Large',
      nameShort: 'Large',
      missionCategory_id: 'high-risk',
      system: 'Pyro',
      reward: {
        payment: 24000000,
        points: 548,
      },
      commodities: [
        {
          commodity_id: 'det',
          scu: 2500,
        },
      ],
    },
  ],
}
