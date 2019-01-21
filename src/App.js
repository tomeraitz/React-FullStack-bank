import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Transactions from './components/Transactions';
import Operations from './components/Operations';
import Pie from './components/Pie';

class App extends Component {
  constructor(){
    super()
    this.state = {
      transaction : [],
      balance : 0
    }
  }

  balanceClass(){
    if(this.state.balance >= 0){
      return <span className="green">balance : {this.state.balance}</span> 
    }
    else{
      return <span className="red">balance : {this.state.balance}</span> 
    }
  }

  checkBalance = (transaction) =>{
    let sum = 0;
    transaction.forEach(i => {
      sum +=i.amount
    })
    return sum
  }

  async  getTransactions(){
   let transaction =await axios.get('http://localhost:8000/transcations')
   let sum = this.checkBalance(transaction.data)
   await this.setState({transaction : transaction.data, balance : sum})
  }

    addTransactions = async (transactionValue) =>{
    await axios.post('http://localhost:8000/transcation' , transactionValue)
    await this.getTransactions()
   }

  async componentDidMount() {
    await this.getTransactions()
  }
  
  render() {
    
    return (
      <div id="app">
      <div className="border" id="header">
          {this.balanceClass()}
          <Operations addTransactions={this.addTransactions}/>
        </div>
        <div className="border">
        <h1>your Expenses: </h1> 
        <Pie transaction={this.state.transaction}/>
        </div>
        <Transactions transaction={this.state.transaction}/> 
        
        
      </div>
    );
  }
}


export default App;
