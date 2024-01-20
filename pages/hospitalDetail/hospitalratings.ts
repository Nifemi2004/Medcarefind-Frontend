const hospitalrating = [
    {
        name: 'Appendectomy',
        complication: [
            {
                procedureName: 'Appendectomy',
                inHouse: {
                  star: 5,
                  comment: 'As expected'
              }
            }
        ],
        mortality: []
    },

    {
        name: 'Cardiac',
        complication: [
            {
                procedureName: 'Defibrillator Procedures',
                inHouse: {
                    star: 3,
                    comment: 'As expected'
                }
            },
            {
                procedureName: 'Pacemaker Procedures',
                inHouse: {
                    star: 3,
                    comment: 'As expected'
                }
            }
        ],
        mortality: [
            {
                procedureName: 'Coronary Artery Bypass Graft (CABG) Surgery',
                inHouse:{
                  star: 5,
                  comment: 'Better than Expected'
                },
                thirtyDays:{
                    star: 5,
                    comment: 'Better than Expected'
                }
            },
            {
                procedureName: 'Coronary Interventional Procedures (Inpatient)',
                inHouse:{
                  star: 5,
                  comment: 'Better than Expected'
                },
                thirtyDays:{
                    star: 5,
                    comment: 'Better than Expected'
                }
            },
            {
                procedureName: 'Heart Attack',
                inHouse:{
                  star: 5,
                  comment: 'Better than Expected'
                },
                thirtyDays:{
                    star: 5,
                    comment: 'Better than Expected'
                }
            },
            {
                procedureName: 'Heart Failure',
                inHouse:{
                  star: 5,
                  comment: 'Better than Expected'
                },
                thirtyDays:{
                    star: 5,
                    comment: 'Better than Expected'
                }
            },
            {
                procedureName: 'Valve Surgery',
                inHouse:{
                  star: 3,
                  comment: 'As Expected'
                },
                thirtyDays:{
                    star: 3,
                    comment: 'As Expected'
                }
            },
        ]
    },
    {
        name: 'Labor and Delivery',
        complication: [
            {
                procedureName: 'C-Section Delivery',
                inHouse: {
                  star: 1,
                  comment: 'Worse than expected'
              },
            },
            {
                procedureName: 'Vaginal Delivery',
                inHouse: {
                  star: 1,
                  comment: 'Worse than expected'
              },
            }
        ],
        mortality: []
    },
    {
        name: 'Orthopedic',
        complication: [
            {
                procedureName: 'Hip Fracture Treatment',
                inHouse: {
                  star: 1,
                  comment: 'Worse than expected'
              },
            },
            {
                procedureName: 'Hip Replacement',
                inHouse: {
                  star: 3,
                  comment: 'As Expected'
              },
            },
            {
                procedureName: 'Total Knee Replacement',
                inHouse: {
                  star: 3,
                  comment: 'As Expected'
              },
            },
        ],
        mortality: []
    },
];

export default hospitalrating