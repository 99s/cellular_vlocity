import { LightningElement } from 'lwc';
import {
    OmniscriptBaseMixin
} from 'vlocity_ins/omniscriptBaseMixin';

// import VerifyLogin from '@salesforce/apex/CellularLoginClass.VerifyLogin';
// import {
//     getDataHandler
// } from 'vlocity_ins/utility';

class LoginData{
    constructor(uname, pass){
        this.username = uname;
        this.password = pass;
    }
}

export default class CellularLogin extends OmniscriptBaseMixin(LightningElement) {
     textShow = '';
    connectedCallback(){
        this.resetLoginform();
    }

    resetLoginform(){
        try{
            // this.template.getElementsByClassName('loginInput').forEach(element => {
        //     element.value = null;
        //   });
        this.template.querySelectorAll('.login-input').forEach(element => {
            
           
            element.value = null;
          });

          this.textShow = '';

          
          
        }catch(e){
            console.log('CellularLogin resetLoginform error : ', e);
        }

        

    }

    async onclickLogin(){
        try{
            this.textShow = '';
            let un = this.template.querySelector('[data-id="username"]').value;
            let pa = this.template.querySelector('[data-id="password"]').value;
    
            let loginData = new LoginData(un,pa);
            console.log('loginData-->', loginData);
            this.textShow = JSON.stringify(loginData);
            let returnData = await this.cleckLoginIP(JSON.stringify(loginData));
            let returnJson = returnData.result.IPResult.CallLoginClassHttpAction.output; //JSON.stringify(returnData);
            console.log('onclickLogin returnJson-->', returnJson);
            if(returnJson != null){
                 if(returnJson.result === true){
                        this.textShow = 'login success!';
                 }
                 else{
                    this.textShow = 'login failed !';
                    if(returnJson.error === 'none'){
                        this.textShow += ' check your credentials ';
                    }
                    else{
                        this.textShow += returnJson.error;
                    }
                 }
            }
            else{
                this.textShow = 'Didn\'t Receive any response from server!';
            }
            
        }catch(e){
            console.log('CellularLogin onclickLogin error : ', e);
            this.textShow = e.message;
        }
        
    }

    async cleckLoginIP(loginData){
        let resp = null;
        try{
          
            // const inputCredentials = {
            //     "username": uname,
            //     "password": pass
            // }
           const params = {
               input: loginData,//JSON.stringify(inputCredentials),
               sClassName: 'vlocity_ins.IntegrationProcedureService',
               sMethodName: 'cellular_login',
               options: '{}',
           };
           console.log('cleckLoginIP params:', JSON.stringify(params));
            resp = await this.omniRemoteCall(params);
           if (resp) {

               console.log('cleckLoginIP response:' + JSON.stringify(resp));
              
           } else {
               console.log('Error while fetching..');
           }
           
        }catch(e){
           console.log('Error cleckLoginIP..', e);
        }
        return resp;
    }



}