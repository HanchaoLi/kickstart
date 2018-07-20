import React, {Component} from 'react';
import Layout from '../../components/Layout';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage : '',
    loading : false
  };
  onSubmit = async (event) => {
    event.preventDefault();
    //when loading page again, error message is gone
    this.setState({ loading : true, errorMessage : ''});
    try{
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(this.state.minimumContribution).send({
        from : accounts[0]
      });
    } catch (err) {
      this.setState({ errorMessage : err.message});
    }
    this.setState(false);
  };
  render () {
    return (
      <Layout>
        <h3>Create a campaign</h3>
        //set error message and turn to boolean by !!
        <Form onSubmit = {this.onSubmit} error = {!!this.state.errorMessage}>
          <Form.Field>
            <label>Minium Contribution </label>
            <Input
            label = "wei"
            labelPosition = "right"
            value = {this.state.minimumContribution}
            onChange = {event => this.setState({minimumContribution : event.target.value})}
            />
          </Form.Field>
          //showing the error message
          <Message error header = "Ops!" content = {this.state.errorMessage} />
          <Button loading = {this.state.loading} primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
