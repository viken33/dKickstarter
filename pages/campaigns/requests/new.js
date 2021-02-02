import React, { Component } from "react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import { Form, Input, Message, Button } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

class RequestNew extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }
  state = {
    description: "",
    value: "",
    recipient: "",
    errMessage: "",
    loading: false,
  };

  onSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true, errMessage: "" });
    const { description, value, recipient } = this.state;

    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await new Campaign(this.props.address);
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errMessage: err.message });
    }
    this.setState({ loading: false, value: "" });
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back to Requests</a>
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Value</label>
            <Input
              label="Value in Ether"
              labelPosition="right"
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              label="Address"
              labelPosition="right"
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>
          <Message
            error
            header="Parece que tuvimos un problema"
            content={this.state.errMessage}
          />
          <Button primary loading={this.state.loading}>
            Send Request!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
