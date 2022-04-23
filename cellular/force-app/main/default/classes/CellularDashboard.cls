public class CellularDashboard {
    

  

    
      public List<Map<String, Object>> callDRExtract(){
        try{
            String dRName = 'Cellular_Dashboard_1'; //'Cellular_SelectProviderDR'; 
            /* Populate the input JSON */
            Map<String, Object> myTransformData = new Map<String, Object>{'cpSearchElement'=>'at'}; 
            /* Call the DataRaptor */
            vlocity_ins.DRProcessResult result = vlocity_ins.DRGlobal.process(myTransformData, dRName,null); 

            
            /* Deserialize the DataRaptor output for processing in Apex */ 
            List<Map<String, Object>> myTransformResult = (List<Map<String, Object>>)result.toJsonList(); 

            System.debug(myTransformResult);
            return myTransformResult;
        }catch(Exception e){
            Map<String,Object> m = new  Map<String,Object>();
            m.put('error', e);
            List<Map<String, Object>> l = new List<Map<String, Object>>();
            l.add(m);
                 return l;
        }
           
    }

    
     public Map<String, Object> callDRLoad(){
        try{
            String dRName = 'Cellular_SelectProviderDR'; 
            String dataJson = '{"accountName":"Vlocity", "contractCode":"SKS9181"}';
            vlocity_ins.DRProcessResult result = vlocity_ins.DRGlobal.processObjectsJSON(dataJson, 'Create Contracts');
            Map<String, Object> resultMap = result.convertToMap();
            System.debug(JSON.serialize(resultMap));
            /* 
            Process the results of the load: these methods return details about objects affected by the DataRaptor load, plus any errors that occured 
            */
            Map<String, Object> createdObjectsByType = (Map<String, Object>)resultMap.get('createdObjectsByType'); 
            Map<String, Object> createdObjectsByTypeForBundle = (Map<String, Object>)createdObjectsByType.get('Create Contracts');
            Map<String, Object> createdObjectsByOrder = (Map<String, Object>)resultMap.get('createdObjectsByOrder');
            Map<String, Object> errors = (Map<String, Object>)resultMap.get('errors');
            Map<String, Object> errorsByField = (Map<String, Object>)resultMap.get('errorsByField');
            Map<String, Object> errorsAsJson = (Map<String, Object>)resultMap.get('errorsAsJson'); // Returns input JSON plus per-node errors

            return resultMap;
        }catch(Exception e){
            Map<String,Object> m = new  Map<String,Object>();
            m.put('error', e);
            
                 return m;
        }
           
    }
}
