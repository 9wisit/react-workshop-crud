import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { fork } from 'child_process';

class App extends Component {

  state = {
    customers: [],
    name: ""
  }

  componentDidMount() {
    this.getCustomers()
  }

  getCustomers() {
    axios.get(`http://localhost:5000/customers/order/desc`)
      .then(res => {
        const customers = res.data;
        this.setState({ customers });
      })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      name: this.state.name
    }
    axios.post(`http://localhost:5000/customers`, body)
      .then((res) => {
        this.getCustomers()
      })
  }

  render() {

    const lists = this.state.customers.map((item) => <li key={item.id}>{item.name}</li>)

    return (
      <div>
        <button onClick={() => this.getCustomers()}>Refresh</button>
        <ul>
          {lists}
        </ul>

        <hr/>

        <form onSubmit={this.handleSubmit}>
          {this.state.name}<br/>
          <input type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
          <button type="submit">Add New Customer</button>
        </form>

      </div>

    );
  }
}

export default App;
