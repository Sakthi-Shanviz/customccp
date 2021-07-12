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
import AppBody from '../../components/app-body/app-body';

import styles from './layout.module.sass';

class Layout extends Component {

    render() {
        return(
            <div className={styles.page}>
                <AppHeader/>
                <div className={styles.ccpWindow}>
                    <div className={styles.ccpContainer}>
                        <AWSCCPComponent />
                    </div>
                    <div className={styles.routerContainer}>                    
                        <AppBody/>
                    {/* <Switch>
                            <Route exact path="/app">
                                <MetricsPage />
                            </Route>
                            <Route path="/app/report">
                                <HistoricReportPage />
                            </Route>
                            <Route path="/app/agent">
                                <AgentsPage />
                            </Route>
                            <Route path="/app/attributes">
                                <CTRReportPage />
                            </Route>
                            <Route path="/app/contact-flow-prompts">
                                <ContactFlowPromptsPage />
                            </Route>
                        </Switch> */}
                    </div>
                </div>
                <AppFooter />
            </div>
        )
    }
}

export default Layout;