import { LightningElement } from 'lwc';
import {
    OmniscriptBaseMixin
} from 'vlocity_ins/omniscriptBaseMixin';

export default class CellularLoginRegistrationParent extends OmniscriptBaseMixin(LightningElement) {
    
    loginregistrationSwitchText = 'Not Registered? '
    isRegistraionInit = false;
    connectedCallback(){
        this.isRegistraionInit = false;
        this.loginregistrationtextSwitcher();
    }

    isRegistrationChecked(){
        
        this.isRegistraionInit = !this.isRegistraionInit;
        this.loginregistrationtextSwitcher();
    }

    loginregistrationtextSwitcher(){
        if(this.isRegistraionInit){
            this.loginregistrationSwitchText = 'Login?';
        }else{
            this.loginregistrationSwitchText = 'Not Registered?';
        }
    }



}