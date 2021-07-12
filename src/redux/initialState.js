const initialState = {
    agent: {},
    contact: {
        current: {},
        list: []
    },
    queues: {
        list: [],
        queueDataState: 'NOT_FOUND'
    },
    metrics: {
        historic: [],
        realtime: {},
        report: [],
        agents: [],
        agentStatus:{},
        attributeReport: {
            dateRange: [],
            data: []
        },
        consolidatedAttrs: [],
        historicDataState: 'NOT_FOUND',
        realtimeDataState: 'NOT_FOUND',
        reportDataState: 'NOT_FOUND',
        agentsState: 'NOT_FOUND',
        agentStatusState: 'NOT_FOUND',
        ctrDataState: 'NOT_FOUND'
    },
    contactFlows: {
        list: [],
        listState: 'NOT_FOUND',
        promptList: [],
        promptListState: 'NOT_FOUND'
    },
    connectPrompts: {
        list: [],
        listState: 'NOT_FOUND'
    },
    metadata: {
        historicReport: {
            metricCategory: {
                'Queue': ['Agent', 'Contact'],
                'Agent': ['Performance']
            }
        },
        agentMeta: [
            {
                field: 'userName',
                label: 'User Name'
            },
            {
                field: 'fullName',
                label: 'Full Name'
            },
            {
                field: 'lowestHierarchyLevel',
                label: 'Hierarchy Level'
            },
            {
                field: 'status',
                label: 'Status'
            },
            {
                field: 'lastUpdatedAt',
                label: 'Last Updated'
            }
        ],
        contactFlows: {
            blockTypeLabel: {
                getCustomerInput: 'Get Customer Input',
                playPrompt: 'Play Prompt',
                storeCustomerInput: 'Store Customer Input'
            }
        },

        // User Defined Configuration
        attributeTracing: [],
        api: {},
        connect: {
            instance: {}
        }
    }
}

export default initialState;