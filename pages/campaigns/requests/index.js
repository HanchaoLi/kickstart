import React,{Component} from 'react';
import Layout from '../../../components/Layout';
import {Button, Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Campaign from '../../../ethereum/campaign';

class RequestIndex extends Component {

static async getInitialProps(props) {
  const {address} = props.query;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount)).fill().map((element, index) => {
      return campaign.methods.requests(index).call()
    })
  );


  return {address, requests, requestCount};
}


  render () {
    const {Header, Row, HeaderCell, Boday} = Table;
    return (
      <Layout>
        <h3>Requests</h3>
          <Link route = {`/campaigns/${this.props.address}/requests/new`}>
            <a>
              <Button primary>Add request</Button>
            </a>
          </Link>
          <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests.</div>
      </Layout>
    );
  }
}

export default RequestIndex;
