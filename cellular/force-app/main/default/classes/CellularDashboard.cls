public with sharing class CellularDashboard {
    public CellularDashboard() {
         
    }

    @AuraEnabled(Cacheable = true)
    public static List<Map<String, Object>> CallDR(){
        try{
            String DRName = 'Cellular_SelectProviderDR'; 
            /* Populate the input JSON */
            Map<String, Object> myTransformData = new Map<String, Object>{'MyTestKey'=>'MyTestValue'}; 
            /* Call the DataRaptor */
            vlocity_ins.DRProcessResult result = vlocity_ins.DRGlobal.process(myTransformData, DRName); 

            
            /* Deserialize the DataRaptor output for processing in Apex */ 
            List<Map<String, Object>> myTransformResult = (List<Map<String, Object>>)result.toJsonList(); 

            return myTransformResult;
        }catch(Exception e){
            Map<String,Object> m = new  Map<String,Object>();
            m.put('error', e);
            List<Map<String, Object>> l = new List<Map<String, Object>>();
            l.add(m);
                 return l;
        }
           
    }
}
