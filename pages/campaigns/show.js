import React, { Component } from "react";
import Layout from "../../components/Layout";
import ContributeForm from "../../components/ContributeForm";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = await Campaign(props.query.address); // es el wildcard que definimos en routes.js

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      balance: summary[0],
      minimumContribution: summary[1],
      requestsAmount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCampaign() {
    const {
      balance,
      minimumContribution,
      requestsAmount,
      approversCount,
      manager,
    } = this.props;

    const items = [
      {
        header: `${web3.utils.fromWei(balance, "ether")} ether`,
        description: ["Amount of money in the campaign"],
        meta: "Campaign Balance",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        description: ["Minimum contribution to enter in the campaign"],
        meta: "Minimum Contribution",
        style: { overflowWrap: "break-word" },
      },
      {
        header: requestsAmount,
        description: ["Amount of requests open in the campaign"],
        meta: "Requests",
        style: { overflowWrap: "break-word" },
      },
      {
        header: approversCount,
        description: ["Amount of approvers in the campaign"],
        meta: "Approvers",
        style: { overflowWrap: "break-word" },
      },
      {
        header: manager,
        description: ["Campaign managers address"],
        meta: "Manager",
        style: { overflowWrap: "break-word" },
      },
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Details</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCampaign()}</Grid.Column>
            <Grid.Column width={5}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>Show Requests</Button>
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
