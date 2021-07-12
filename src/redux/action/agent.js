import { AgentActions } from '../action';

export const storeAgentInfo = (agentInfo) => {
    return {
        type: AgentActions.STORE_INFO,
        payload: agentInfo
    }
}