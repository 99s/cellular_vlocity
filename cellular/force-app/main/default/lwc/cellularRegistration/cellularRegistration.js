import { LightningElement } from 'lwc';
import {
    OmniscriptBaseMixin
} from 'vlocity_ins/omniscriptBaseMixin';
// import {
//     getDataHandler
// } from 'vlocity_ins/utility';



export default class CellularRegistration extends OmniscriptBaseMixin(LightningElement) {
    textDisplay = '';
    connectedCallback(){
        this.textDisplay = '';
        this.handleInputReset();
    }
    handleInputSuccess(){
        console.log('CellularRegistration handleInputSuccess');
        this.textDisplay = 'added record!';
        this.handleInputReset();
    }

    handleProviderChange(){
        console.log('CellularRegistration handleProviderChange');
    }

    handleInputReset(){
        this.template.querySelectorAll('lightning-input-field[data-id="reset"]').forEach(element => {
            element.value = null;
          });
        

    }
}