import { useState } from 'react';

import AppHeader from '../../components/app-header/app-header';
import AppFooter from '../../components/app-footer/app-footer';
import AWSCCPComponent from '../../components/aws-ccp/aws-ccp';
import AppBody from '../../components/app-body/app-body';

import styles from './layout.module.sass';

function Layout() {
    const [AWSContactAttributes, SetAWSContactAttributes] = useState({});

    const setAwsContactsData = (data) => {
        SetAWSContactAttributes(data);
    }
        return(
            <div className={styles.page}>
                <AppHeader/>
                <div className={styles.ccpWindow}>
                    <div className={styles.ccpContainer}>
                        <AWSCCPComponent setAwsContactsData={setAwsContactsData} />
                    </div>
                    <div className={styles.routerContainer}>                    
                        <AppBody AWSContactAttributes={AWSContactAttributes}/>
                    </div>
                </div>
                <AppFooter />
            </div>
        )
}

export default Layout;