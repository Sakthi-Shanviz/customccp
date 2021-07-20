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

        this.initializeCCP  = this.initializeCCP.bind(this, this.props.setAwsContactsData);
        this.handleAgentLogin = this.handleAgentLogin.bind(this);
        this.handleTermination = this.handleTermination.bind(this);
        this.openLoginPopup = this.openLoginPopup.bind(this);
        this.handleContact = this.handleContact.bind(this);
        this.onCallAccepted = this.onCallAccepted.bind(this);
        this.openLoginPopup = this.openLoginPopup.bind(this);
    }

    initializeCCP(setAwsContactsData) {
        //var openedWindow;
        this.setState({
            ccpState: CCPStates.AUTHORIZING
        })
        let ele = this.containerRef.current;
        global.connect.core.initCCP(ele, this.ccpConfig);
        
      /*  global.connect.contact((contact) => {
            console.log("Contact event");
            console.log(contact);
        }) */

        global.connect.contact((_contact) => {
            // console.log("Contact event");
            // console.log(_contact);

            // _contact.onRefresh(function(contact) { 
            //     console.log("Contact refreshed");
            //     console.log(contact)
            //  });
            
            //  _contact.onIncoming(function(contact) { 
            //     console.log("Contact incoming");
            //     console.log(contact)
            //  });
            
            //  _contact.onPending(function(contact) { 
            //     console.log("Contact pending");
            //  });

                // _contact.onConnecting(function(contact) { 
                //      console.log("Contact connecting");
                //      const AWSContactAttributes = {};
                //      var attributeMap = contact.getAttributes();
                //      AWSContactAttributes.name = JSON.stringify(attributeMap["callerid"]["value"]);
                //      AWSContactAttributes.phone = JSON.stringify(attributeMap["dnis"]["value"]);
                //      AWSContactAttributes.ani = JSON.stringify(attributeMap["ani"]["value"]);
                //      AWSContactAttributes.callbackMemo = JSON.stringify(attributeMap["callbackMemo"]["value"]);
                //      AWSContactAttributes.hippaVerification = JSON.stringify(attributeMap["hippaVerification"]["value"]);
                //      AWSContactAttributes.beneficiaryId = JSON.stringify(attributeMap["beneficiaryId"]["value"]);
                //      window.alert("name: " + AWSContactAttributes.name + "\nphone #: " + AWSContactAttributes.phone + "\nCustomer's account #: " + AWSContactAttributes.ani);
                //      console.log(AWSContactAttributes);
                //      this.props.SetAWSContactAttributes(AWSContactAttributes);
                // });
            
             _contact.onConnecting(async function(contact) { 
                console.log("Contact connecting");
                console.log(`onConnected(${contact.getContactId()})`);
                var attributeMap = await contact.getAttributes();
                const requireAttributes = ["callerId", "ani", "beneficiaryId", "dnis", "callbackMemo", "hippaVerification"];
                const data = Object.values(attributeMap)
                    .filter((attr) => requireAttributes.indexOf(attr.name) != -1)
                    .reduce((attributes, currentMap) => {
                        attributes[currentMap.name] = currentMap.value;
                        return attributes;
                    }, {});

                    data["contactId"] = contact.getContactId();
                console.log(data);
                setAwsContactsData(data);
                // const query = new URLSearchParams();
                // Object.entries(data).forEach(([name, value]) => {
                //     query.append(name, value);
                // });
                // openedWindow = window.open("https://localhost:3000/#/view?" + query.toString(), "_blank","width=780,height=460,left=50,top=50");                
             });
            
            //  _contact.onAccepted(function(contact) { 
            //     console.log("Contact accepted");
            //     console.log(contact)
            //  });
            
                _contact.onMissed(function(contact) { 
                   console.log("Contact missed");
                   console.log(contact);
                  // window.close(); 
                  // openedWindow.close();                
                });
            
                _contact.onEnded(function(contact) { 
                   console.log("Contact ended");
                   console.log(contact);
                  //window.close();
                 // openedWindow.close();                
               });
            
            //  _contact.onDestroy(function(contact) { 
            //     console.log("Contact destroyed");
            //     console.log(contact)
            //  });
            
            //  _contact.onACW(function(contact) { 
            //     console.log("Contact ACWW");
            //     console.log(contact)
            //  });
            
            //  _contact.onConnected(function(contact) { 
            //     console.log("on connected")
            //     // console.log(`onConnected(${contact.getContactId()})`);
            //     // var attributeMap = contact.getAttributes();
            //     // var caller_id = JSON.stringify(attributeMap["caller_id"]["value"]);
            //     // var ani = JSON.stringify(attributeMap["ani"]["value"]);                
            //     // console.log(caller_id);
            //     // console.log(ani);
            //     // window.alert("Caller ID: " + caller_id + "\nani: " + ani);
            //  });

        })

        // global.connect.agent((_agent) => {
        //     console.log("agent event");
        //     console.log(_agent);
            
        //     _agent.onContactPending(function(agent) { 
        //         console.log("agent contact pending");
        //         console.log(agent);
        //      });
            
        //     _agent.onRefresh(function(agent) { 
        //         console.log("agent refresh");
        //         console.log(agent);
        //      });
            
        //     _agent.onStateChange(function(agentStateChange) { 
        //         console.log("agent state change");
        //         console.log(agentStateChange);
        //      });
            
        //     _agent.onRoutable(function(agent) { 
        //         console.log("agent routable");
        //         console.log(agent);
        //      });
            
        //     _agent.onNotRoutable(function(agent) { 
        //         console.log("agent non routable");
        //         console.log(agent);
        //      });
            
        //     _agent.onOffline(function(agent) { 
        //         console.log("agent offline");
        //         console.log(agent);
        //      });
            
        //     _agent.onError(function(agent) { 
        //         console.log("agent error");
        //         console.log(agent);
        //      });
            
        //     _agent.onAfterCallWork(function(agent) { 
        //         console.log("agent on ACW");
        //         console.log(agent);
        //      });

        // })

        global.connect.agent(this.handleAgentLogin);
        //global.connect.contact(this.handleContact);
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