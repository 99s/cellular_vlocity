
@JsonAccess(serializable='always')
global with sharing class CellularLoginClassVlocity implements vlocity_ins.VlocityOpenInterface2 { 
global Object invokeMethod(String methodName, Map<String,Object> input, Map<String,Object> output, Map<String,Object> options) {        
   return output.put('result', new TestReserialize());    
}    
   @JsonAccess(serializable='always')
   global  class TestReserialize { 
      global  String name = 'Dave Smith';    
   }
}