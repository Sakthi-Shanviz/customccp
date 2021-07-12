import { Component } from 'react';

import AppHeader from '../../components/app-header/app-header';
import AppFooter from '../../components/app-footer/app-footer';
import AWSCCPComponent from '../../components/aws-ccp/aws-ccp';
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
                    </div>
                </div>
                <AppFooter />
            </div>
        )
    }
}

export default Layout;