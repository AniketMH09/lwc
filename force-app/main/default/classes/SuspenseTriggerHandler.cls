/*
@Author : Parviz Ahmed
@BuiltDate : 6th June 2022
@Description : This class implements the Trigger interface and handles the logic of occuring trigger events
*/

public class SuspenseTriggerHandler implements TriggerInterface{
    
    public void BeforeInsert(List<SObject> newItems) {}
    
    public void BeforeUpdate(Map<Id, SObject> newItems, Map<Id, SObject> oldItems) {
        
        for (Suspense__c suspenseObj : (List<Suspense__c>)newItems.values()) {
            
            Suspense__c OldSuspense = (Suspense__c)oldItems.get(suspenseObj.ID); 
            
            Boolean isOwnerChanged =false;
            Boolean isUserChanged =false;
            Boolean isClearedAction=false;
            
            if(OldSuspense.User__c != suspenseObj.User__c)
            {    
                suspenseObj.OwnerId=suspenseObj.User__c;       
            }
            
            if(OldSuspense.OwnerId!= suspenseObj.OwnerId)
            {    
                suspenseObj.User__c= suspenseObj.OwnerId;    
            }
            
            if(OldSuspense.Process_Status__c!= suspenseObj.Process_Status__c  && suspenseObj.Process_Status__c !='' )
            {    
                suspenseObj.Pending_Date__c=date.today();        
            }  
            
            
            if(OldSuspense.Operator_Action_Taken__c!= suspenseObj.Operator_Action_Taken__c)
                
            {
                if(suspenseObj.Operator_Action_Taken__c == '' || suspenseObj.Operator_Action_Taken__c == null)
                {
                    suspenseObj.Completed_By__c='';
                    suspenseObj.Completed_Date__c=null;
                }
                else
                {
                    suspenseObj.Completed_By__c=UserInfo.getName();
                    suspenseObj.Completed_Date__c=date.today();
                }
            }
            
            if (!system.isBatch())
            {
                SuspenseCallOut.makeHttpCallforSuspense( suspenseObj.ID );  
            }
        }
    }
    
    public void BeforeDelete(List<sObject> oldRecordsList , Map<Id, SObject> oldItems) {
        
        for(Suspense__c suspenseRecord : (List<Suspense__c>)oldRecordsList){
            
            suspenseRecord.adderror('Suspense Item cannot be deleted');
        }
    }
    
    public void AfterInsert(List<sObject> newRecordsList , Map<Id, SObject> newItems) {}
    
    public void AfterUpdate(Map<Id, SObject> newItems, Map<Id, SObject> oldItems) {}
    
    public void AfterDelete(Map<Id, SObject> oldItems) {}
    
    public void AfterUndelete(List<sObject> newRecordsList , Map<Id, sObject> newItems) {}
}