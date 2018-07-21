import React, {Component} from 'react';
import {Card, Grid, Button} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';
class CampaignShow extends Component {
  static async getInitialProps (props) {
      const campaign = Campaign(props.query.address);

      const summary = await campaign.methods.getSummery().call();
      return {
        address : props.query.address,
        minimumContribution : summary[0],
        balance : summary[1],
        requestsCount : summary[2],
        approversCount : summary[3],
        manager : summary[4]

      };
  }

renderCards() {
  const {
    balance,
    manager,
    minimumContribution,
    requestsCount,
    approversCount
  } = this.props;

  const items = [
    {
      header : manager,
      meta : 'Address of Manager',
      description : 'The manager created this campaign and can create request',
      style : {overflowWrap: 'break-word'}
    },
    {
      header : minimumContribution,
      meta : 'Minimum Contribution (wei)',
      description : 'you must contribute at least this much wei to become contributor'
    },
    {
      header : requestsCount,
      meta : 'Number of request',
      description : 'A request tries to withdraw money from account'
    },
    {
      header : approversCount,
      meta : 'Number of Approvers',
      description : 'Number of people who has already donated to this campaign'
    },
    {
      header : web3.utils.fromWei(balance, 'ether'),
      meta : 'Campaign Balance (ethere)',
      description : 'The balance is how much money this campaign has left for now'
    }
  ];
  return <Card.Group items = {items} />
}

  render () {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
