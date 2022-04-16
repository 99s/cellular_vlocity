import { api, LightningElement } from 'lwc';
//import chartjs from '@salesforce/resourceUrl/chartjs_273'; 
import {
    OmniscriptBaseMixin
} from 'vlocity_ins/omniscriptBaseMixin';

export default class CellularDashboard extends OmniscriptBaseMixin(LightningElement) {
    @api cellularUser;
    @api cellularPhoneModel;
    @api cellularProvider;
    @api cellularRateplan;
    

}