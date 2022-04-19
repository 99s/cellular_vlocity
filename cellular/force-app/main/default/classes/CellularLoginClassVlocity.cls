
@JsonAccess(serializable='always')
global with sharing class CellularLoginClassVlocity implements vlocity_ins.VlocityOpenInterface2 { 
global Object invokeMethod(String methodName, Map<String,Object> input, Map<String,Object> output, Map<String,Object> options) { 
   Boolean returnBool = false;
   try{
      
      if(input.size() > 0){
         String username = input.get('username').toString();
         String password = input.get('password').toString();
         if(String.isBlank(username) || String.isEmpty(username)){
            return output.put('output', new OutputClass('failed', returnBool, 'username can\'t be empty'));
         }
         if(String.isBlank(password) || String.isEmpty(password)){
            return output.put('output', new OutputClass('failed', returnBool, 'password can\'t be empty'));
         }

         CheckUserExist cu = new CheckUserExist();
         returnBool = cu.CheckIfUserExist(username, password);
        

         return output.put('output', new OutputClass('success', returnBool, 'none'));
      }       
      return output.put('output', new OutputClass('failed', returnBool, 'no input found')); 
   }catch(Exception e){
      return output.put('output', new OutputClass('failed', returnBool, 'Exception: '+e.getMessage()));
   }
      
}    
   @JsonAccess(serializable='always')
   global  class OutputClass { 
      global  String message = 'failed';    
      global  Boolean result = false; 
      global  String error = 'error occured';
      OutputClass(String msg, Boolean res, String err){
         message = msg;
         result = res;
         error = err;
      }
       
   }

    @JsonAccess(serializable='always')
   global  class CheckUserExist { 
        //improvement : use dataraptor here
      global Boolean CheckIfUserExist(String username, String password){
	  List<Cellular_User__c> targetuser = [SELECT Id, Name FROM Cellular_User__c 
            WHERE Cellular_User__c.Cellular_User_Email__c =: username 
            AND Cellular_User__c.Cellular_User_Password__c =: password];
  
            if(targetuser.size() > 0){
                return true;
            }
  
            return false;
	  }
   }
}