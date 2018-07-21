import React, {Component} from 'react';
import {Form, Input, Message, Button} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
class ContributeForm extends Component {
  state = {
    value : '',
    errorMessage : '',
    loading : false
  };
  onSubmit = async event => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    this.setState({ loading : true, errorMessage : ''});
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from : accounts[0],
        value : web3.utils.toWei(this.state.value, 'ether')
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage : err.message});
    }
    this.setState({ loading : false, value : '' });
  };
  render () {
    return (
      <Form onSubmit = {this.onSubmit} error= {!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            onChange = {event => this.setState({value : event.target.value})}
            value = {this.state.value}
            label = "ether"
            labelPosition = "right"
          />
          <Message error header = "Ops!" content = {this.state.errorMessage} />
          <Button primary loading = {this.state.loading}>Contribute!</Button>
        </Form.Field>
      </Form>
    );
  }
}


export default ContributeForm;
