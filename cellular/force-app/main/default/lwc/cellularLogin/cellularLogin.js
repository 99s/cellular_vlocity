import { LightningElement } from 'lwc';
import {
    OmniscriptBaseMixin
} from 'vlocity_ins/omniscriptBaseMixin';

import VerifyLogin from '@salesforce/apex/CellularLoginClass.VerifyLogin';
// import {
//     getDataHandler
// } from 'vlocity_ins/utility';

class LoginData{
    constructor(username, password){
        this.loginUsername = username;
        this.loginPassword = password;
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

    onclickLogin(){
        try{
            let un = this.template.querySelector('[data-id="username"]').value;
            let pa = this.template.querySelector('[data-id="password"]').value;
    
            let loginData = new LoginData(un,pa);
            console.log('loginData-->', loginData);
            this.textShow = JSON.stringify(loginData);
            let returnData = VerifyLogin(loginData);
            console.log('returnData-->', returnData);
        }catch(e){
            console.log('CellularLogin onclickLogin error : ', e);
            this.textShow = e.message;
        }
        
    }



}