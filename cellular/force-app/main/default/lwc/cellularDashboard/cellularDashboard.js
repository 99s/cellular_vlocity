import { api, LightningElement } from 'lwc';
//import chartjs from '@salesforce/resourceUrl/chartjs_273'; 
//import Chart from '../chart.js/dist/chart';

import {
    OmniscriptBaseMixin
} from 'vlocity_ins/omniscriptBaseMixin';
import {
    getDataHandler
} from 'vlocity_ins/utility';
import CallDRExtract from '@salesforce/apex/CellularDashboard.CallDRExtract';
class CellularDashboardDataModel{

     constructor(cellularPhoneModelData, cellularRateplanData, cellularProviderData, cellularUserData){
           this.cellularPhoneModel = cellularPhoneModelData;
           this.cellularRateplan = cellularRateplanData;
           this.cellularProvider = cellularProviderData;
           this.cellularUser = cellularUserData;
     }

    
}

export default class CellularDashboard extends OmniscriptBaseMixin(LightningElement) {

     //myChart = require('chart.js');
     @api cellularPhoneModelData;
     @api cellularRateplanData;
     @api cellularProviderData; 
     @api cellularUserData;

     CellularDashboardDataModelList = []; 

    connectedCallback(){
        //this.callDashboardDR();
        this.callOmniJsonData();
        this.callApiData();
    }


//call dr direct, omnijson data,  @api , dr > ip > lwc

  callApiData(){
      try{
        console.log('<==========|cellularPhoneModelData|============> ')
        console.log(JSON.stringify(this.cellularPhoneModelData));
        console.log('<==========|cellularRateplanData|============> ')
        console.log(JSON.stringify(this.cellularRateplanData));
        console.log('<==========|cellularProviderData|============> ')
        console.log(JSON.stringify(this.cellularProviderData));
        console.log('<==========|cellularUserData|============> ')
        console.log(JSON.stringify(this.cellularUserData));
    
        let dataItem = new CellularDashboardDataModel(this.cellularPhoneModelData, this.cellularRateplanData, 
            this.cellularProviderData, this.cellularUserData);
            this.CellularDashboardDataModelList.push(dataItem);
      }catch(e){
          console.logerror('callApiData errer', e);
      }
   
  }

  callOmniJsonData(){
    console.log('<==========||============> ')
    console.log(this.omniJsonData);
      let ojData = this.omniJsonData.cellularPhoneModel;
    console.log('Data from Cellular_Dashboard_1 callOmniJsonData ==>', JSON.stringify(ojData));
  }


    callDashboardDR(){
        
 
        const datasource = JSON.stringify({
            type: 'dataraptor',
            value: {
                bundleName: 'Cellular_Dashboard_1', //This will be dataraptor name
                inputMap: {},
                optionsMap: '{}'
            }
        })
        getDataHandler(datasource).then(data => {
            console.log('Data from Cellular_Dashboard_1 Dataraptor ==>', JSON.parse(JSON.stringify(data)));
            
        }).catch(err => {
            console.error(`Error fetching data ==> ${JSON.stringify(err)}`);
        });
    }
    


    async handledashboardDataClick(event){
      
     try{
        console.log('handledashboardDataClick event:', event);
        const params = {
            input:{}, //JSON.stringify(inputData),
            sClassName: 'vlocity_ins.IntegrationProcedureService',
            sMethodName: 'cellular_dashboard',
            options: '{}',
        };
        console.log('handledashboardDataClick params:', JSON.stringify(params));
        let resp = await this.omniRemoteCall(params);
        if (resp) {
            console.log('cellular/dashboard data:' + JSON.stringify(resp));
        } else {
            console.log('Error while fetching..');
        }
        this.loading = false;
     }catch(e){
        console.log('Error handledashboardDataClick..', e);
     }

    }

    CallApexClass(){
        try{
            let ss = CallDR();
            console.log('');
        }catch(e){
            console.log('');
        }
    }

    // initializeChart(){
    //     const chart = new Chart(ctx, {
    //         type: 'line',
    //         data: data,
    //         options: {
    //           onClick: (e) => {
    //             const canvasPosition = getRelativePosition(e, chart);
          
    //             // Substitute the appropriate scale IDs
    //             const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
    //             const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
    //           }
    //         }
    //       });
    // }
    

}