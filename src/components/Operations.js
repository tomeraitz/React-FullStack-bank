import React, { Component } from 'react';

class Operations extends Component {
  constructor(){
    super()
    this.state = {
      amount : "",
      vendor : "",
      category : ""
    }
  }
  
  handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value});
  }

  handelDeposit=async (event)=>{
    if(this.state.amount !== "" && this.state.vendor !== ""  && this.state.category !== ""){
      await this.props.addTransactions(this.state)
      await this.setState({amount: "" ,vendor : "",  category :""})
    }
  }

  handelWithdraw=async (event)=>{
    if(this.state.amount !== "" && this.state.vendor !== ""  && this.state.category !== ""){
      let negative = this.state.amount
      negative = -Math.abs(negative)
      await this.setState({amount : negative})
      await this.props.addTransactions(this.state)
      await this.setState({amount: "" ,vendor : "",  category :""})
    }
  }

  render() {
    return (
      <div>
        <input type="number" 
                value={this.state.amount} 
                onChange={this.handleChange} 
                name="amount" 
                placeholder="Amount"
          />

        <input type="text" 
                value={this.state.vendor} 
                onChange={this.handleChange} 
                name="vendor" 
                placeholder="Vendor"
          />

        <input type="text" 
               value={this.state.category} 
                onChange={this.handleChange} 
                name="category" 
                placeholder="Category"
          />

        <button onClick={this.handelDeposit}>Deposit</button>
        <button onClick={this.handelWithdraw}>Withdraw</button>
      </div>
    );
  }
}

export default Operations;
