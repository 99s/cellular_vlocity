public with sharing class CellularLoginClass {
    public CellularLoginClass() {
          System.debug('---CellularLoginClass---');
    }

    
   
    @AuraEnabled(Cacheable = true)
    public static Boolean VerifyLogin(CellularLoginClass.CellularLoginData logindata){
        try {
            List<Cellular_User__c> targetuser = [SELECT Id, Name FROM Cellular_User__c 
            WHERE Cellular_User__c.Cellular_User_Email__c =: logindata.username 
            AND Cellular_User__c.Cellular_User_Password__c =: logindata.password];
  
            if(targetuser.size() > 0){
                return true;
            }
  
            return false;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
         
    }


    private class CellularLoginData{
        String username;
        String password;
    }
}
