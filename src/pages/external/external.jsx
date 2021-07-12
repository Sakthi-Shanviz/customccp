import { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import AppHeader from '../../components/app-header/app-header';
import AppFooter from '../../components/app-footer/app-footer';
import AWSCCPComponent from '../../components/aws-ccp/aws-ccp';
import MetricsPage from '../../pages/metrics/metrics';
import HistoricReportPage from '../../pages/historic-report/historic-report';
import AgentsPage from '../../pages/agents/agents';
import CTRReportPage from '../../pages/attribute-report/attribute-report';
import ContactFlowPromptsPage from '../contact-flow-prompts/contact-flow-prompts';

import styles from './external.module.sass';

class ExternalLayout extends Component {

    render() {
        return(
            <div className={styles.page}>
                <div className={styles.ccpWindow}>
                    <div className={styles.routerContainer}>
                        <Switch>
                            <Route exact path="/external/realtime">
                                <MetricsPage agentView={false} />
                            </Route>
                            <Route exact path="/external/realtime/agent">
                                <MetricsPage agentView={true} />
                            </Route>
                            <Route path="/external/report">
                                <HistoricReportPage />
                            </Route>
                            <Route path="/external/agent">
                                <AgentsPage />
                            </Route>
                            <Route path="/external/attributes">
                                <CTRReportPage />
                            </Route>
                            <Route path="/external/contact-flow-prompts">
                                <ContactFlowPromptsPage />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExternalLayout;