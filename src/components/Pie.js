import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

class Pie extends Component {
    constructor() {
        super()
        this.state = {
            chart: null,
            data : []
        }
    }

    componentWillReceiveProps(nextProps) {
        const chart = am4core.create("chartdiv", am4charts.PieChart);
        this.createChart(chart , nextProps);
        this.setState(() => ({chart, data: chart.data}))
    }

    createChart = (chart , data) => {
        let arr = this.getExpenses(data.transaction)
        chart.data = arr
        const pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "amount";
        pieSeries.dataFields.category = "category";
        pieSeries.dataFields.vendor = "vendor";
        pieSeries.labels.template.text = "{vendor} : {amount}";
        var colorSet = new am4core.ColorSet();
        colorSet.list = ["#388E3C", "#FBC02D", "#0288d1", "#F44336", "#8E24AA"].map(function(color) {
        return new am4core.color(color);
        });
        pieSeries.colors = colorSet;

    }

    getExpenses(data){
        let arr =[]
        data.forEach(i =>{
            if(i.amount < 0){
               i.amount = Math.abs(i.amount)
                arr.push(i)
            }
        })
        return arr
    }


    breackDown(){
        let arrEx = this.state.data
        console.log(arrEx)
        if(arrEx.length > 0){
        let newObj = { amount : arrEx[0].amount, category : arrEx[0].category}
        let sum = 0
        arrEx.forEach(i => {
        sum +=i.amount
        })

        arrEx.forEach(i => {
            if(!newObj[i.category]){
                newObj[i.category] =  {amount : i.amount, category: i.category, present : Math.round((i.amount/sum)*100)}
            }
            else{
                newObj[i.category].amount += i.amount
                newObj[i.category].present += Math.round((i.amount/sum)*100) 
            }
        });

        let arr = Object.values(newObj)
        arr = arr.filter(i => typeof i  === 'object')
        return arr.map(i =>{
            return( <div>
                        <div className="innerLabel"></div>
                        <span> {i.category} </span>
                        <span> {i.present + "%"}  </span>
                    </div> )
            })
        }
    }

    render() {
        
        return ( <div>
                    <div id = "chartdiv" ></div>
                    <div className="label">
                        {this.breackDown()}
                    </div>
                </div>);
    }
}

export default Pie;