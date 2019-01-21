import React, { Component } from 'react';
import Transaction from './Transaction';

class Transactions extends Component {
  render() {
    return (<div>
      {this.props.transaction.map(i=>{
          return <Transaction amount={i.amount} 
          vendor={i.vendor} 
          category={i.category} 
          key={i._id} />
      })}
      
      </div>)
  }
}

export default Transactions;
