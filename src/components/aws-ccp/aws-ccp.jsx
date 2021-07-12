import { Component, createRef } from 'react';
import { RingLoader } from 'react-spinners';
import { Button, Typography } from '@material-ui/core';
import { LockOpenOutlined } from '@material-ui/icons';
import { connect } from 'react-redux';

import CCPStates from '../../utilities/ccp-state';
import { storeAgentInfo } from '../../redux/action/agent';
import { addContact } from '../../redux/action/contact';
import styles from './aws-ccp.module.sass';

class AWSCCPComponent extends Component {

    constructor(props) {
        super(props)

        this.ccpStateMessages = {
            [CCPStates.AUTHORIZING]: 'Authorizing Agent',
            [CCPStates.LOGIN_ERROR]: 'Authorization Error',
            [CCPStates.TERMINATED]: 'Agent Logged out'
        }

        this.state = {
            connectInstanceName: 'test-cf-instance',
            ccpState: CCPStates.AUTHORIZING
        }

        this.ccpConfig = {
           // ccpUrl:`https://${this.state.connectInstanceName}.awsapps.com/connect/ccp-v2`,
           ccpUrl:`https://pega-custom-ccp.my.connect.aws/connect/ccp-v2`,
            loginPopup: true,
            loginOptions: {
                autoClose: true,
                height: 600,
                width: 400,
                top: 50,
                left: 300
            },
            loginPopupAutoClose: true,
            softphone: {
                allowFramedSoftphone: true
             },
            pageOptions: {
                enableAudioDeviceSettings: true,
                enablePhoneTypeSettings: true 
            } 
        }

        this.containerRef = createRef();

        this.initializeCCP  = this.initializeCCP.bind(this);
        this.handleAgentLogin = this.handleAgentLogin.bind(this);
        this.handleTermination = this.handleTermination.bind(this);
        this.openLoginPopup = this.openLoginPopup.bind(this);
        this.handleContact = this.handleContact.bind(this);
        this.onCallAccepted = this.onCallAccepted.bind(this);
        this.openLoginPopup = this.openLoginPopup.bind(this);
    }

    initializeCCP() {
        this.setState({
            ccpState: CCPStates.AUTHORIZING
        })
        let ele = this.containerRef.current;
        global.connect.core.initCCP(ele, this.ccpConfig);
        
        global.connect.contact((contact) => {
            console.log("Contact event");
            console.log(contact);
        })

        global.connect.contact((_contact) => {
            console.log("Contact event");
            console.log(_contact);

            _contact.onRefresh(function(contact) { 
                console.log("Contact refreshed");
                console.log(contact)
             });
            
             _contact.onIncoming(function(contact) { 
                console.log("Contact incoming");
                console.log(contact)
             });
            
             _contact.onPending(function(contact) { 
                console.log("Contact pending");
                console.log(contact)
             });
            
             _contact.onConnecting(function(contact) { 
                console.log("Contact connecting");
                console.log(contact)
             });
            
             _contact.onAccepted(function(contact) { 
                console.log("Contact accepted");
                console.log(contact)
             });
            
             _contact.onMissed(function(contact) { 
                console.log("Contact missed");
                console.log(contact)
             });
            
             _contact.onEnded(function(contact) { 
                console.log("Contact ended");
                console.log(contact)
             });
            
             _contact.onDestroy(function(contact) { 
                console.log("Contact destroyed");
                console.log(contact)
             });
            
             _contact.onACW(function(contact) { 
                console.log("Contact ACWW");
                console.log(contact)
             });
            
             _contact.onConnected(function(contact) { 
                console.log("Contact connected");
                console.log(contact)
             });

        })

        global.connect.contact((_agent) => {
            console.log("agent event");
            console.log(_agent);
            
            _agent.onContactPending(function(agent) { 
                console.log("agent contact pending");
                console.log(agent);
             });
            
            _agent.onRefresh(function(agent) { 
                console.log("agent refresh");
                console.log(agent);
             });
            
            _agent.onStateChange(function(agentStateChange) { 
                console.log("agent state change");
                console.log(agentStateChange);
             });
            
            _agent.onRoutable(function(agent) { 
                console.log("agent routable");
                console.log(agent);
             });
            
            _agent.onNotRoutable(function(agent) { 
                console.log("agent non routable");
                console.log(agent);
             });
            
            _agent.onOffline(function(agent) { 
                console.log("agent offline");
                console.log(agent);
             });
            
            _agent.onError(function(agent) { 
                console.log("agent error");
                console.log(agent);
             });
            
            _agent.onAfterCallWork(function(agent) { 
                console.log("agent on ACW");
                console.log(agent);
             });

        })

        global.connect.agent(this.handleAgentLogin);
        global.connect.contact(this.handleContact);
        const eventBus = global.connect.core.getEventBus();
        eventBus.subscribe(global.connect.EventType.TERMINATED, this.handleTermination);
    }

    handleAgentLogin(agent) {
        console.log("agent obj", agent.getConfiguration())
        this.props.storeAgentInfo(agent.getConfiguration());
        this.setState({
            agentConnected: true,
            ccpState: CCPStates.AUHTORIZED
        });
    }

    handleContact(contact) {
        console.log("on", contact)
        contact.onAccepted(this.onCallAccepted);
    }

    onCallAccepted(contact) {
        console.log("accepted contact id", contact.contactId)
        this.props.addContact(contact);
    }

    handleTermination() {
        this.setState({
            agentConnected: false,
            ccpState: CCPStates.TERMINATED
        });
        this.containerRef.current.firstChild.remove();
        const connect = {...global.connect};
        delete global.connect;
        console.log("glb connect", global.connect);
        global.connect = connect;
        console.log("glb", global.connect);
    }

    openLoginPopup() {
        window.localStorage.clear();
        this.initializeCCP();
        // global.connect.core.loginWindow = new global.connect.PopupManager().open(this.ccpConfig.ccpUrl, global.connect.MasterTopics.LOGIN_POPUP, this.ccpConfig.loginOptions)
        // window.location.reload();
    }

    componentDidMount() {
        this.initializeCCP();
    }

    render() {
        return (
            <div className={styles.wrapper}>
                {
                    this.state.ccpState === CCPStates.AUHTORIZED || (<div className={styles.loader}>
                        <RingLoader
                            color="#86bc25"
                            loading={[CCPStates.AUTHORIZING].includes(this.state.ccpState)}
                        />
                        <Typography variant="h6">{this.ccpStateMessages[this.state.ccpState]}</Typography>
                        {
                            [CCPStates.TERMINATED, CCPStates.LOGIN_ERROR].includes(this.state.ccpState) && 
                                <Button
                                    startIcon={<LockOpenOutlined />}
                                    variant="contained"
                                    color="primary"
                                    onClick={this.openLoginPopup}
                                >Login</Button>
                        }
                    </div>)
                }
                <div
                    ref={this.containerRef}
                    className={styles.ccpContainer}
                    style={{opacity: Number(this.state.ccpState === CCPStates.AUHTORIZED)}}
                />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        agentInfo: state.agent,
        contact: state.contact
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeAgentInfo: (agentInfo) => dispatch(storeAgentInfo(agentInfo)),
        addContact: (contactInfo) => dispatch(addContact(contactInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AWSCCPComponent);