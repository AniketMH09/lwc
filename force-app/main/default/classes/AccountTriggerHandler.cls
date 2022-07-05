/*
    @Author : Roshan Dash
    @BuiltDate : 1st May 2022
    @Description :
*/
public class AccountTriggerHandler implements TriggerInterface{
 
    public void BeforeInsert(List<SObject> newItems) {
        /*  the Account name before account inserted into Salesorce */
        System.Debug('Trigger Handler -- Before Insert');
        for(Account acc : (List<Account>)newItems){
            acc.Name = 'Trigger FrameWork -- Before Insert' +acc.Name;
        }      	
    }
 
    public void BeforeUpdate(Map<Id, SObject> newItems, Map<Id, SObject> oldItems) {
    	System.Debug('Trigger Handler -- Before Update');
        for(Account acc : (List<Account>)newItems.values()){
            acc.Name = 'Trigger FrameWork -- Before Update' +acc.Name;
        }       
    }
 
    public void BeforeDelete(List<sObject> oldRecordsList , Map<Id, SObject> oldItems) {}
 
    public void AfterInsert(List<sObject> newRecordsList , Map<Id, SObject> newItems) {
        Try{
        }Catch(System.Exception ex){
            /* Call the TransactionLogHandler class method to create a log 
               parameters need to pass in the method are System.Exception and the Handler ClassName
            */
            TransactionLogHandler.doHandleException(ex , 'AccountTriggerHandler');
        }
    }
 
    public void AfterUpdate(Map<Id, SObject> newItems, Map<Id, SObject> oldItems) {
        /* Update the AccountNumber */
        List<Account> accountToUpdateList = new List<Account>();
        Try{
           for(Account acc : [Select Id, Name, AccountNumber From Account Where Id =: newItems.keySet()]){
               acc.AccountNumber = '123345543625';
               accountToUpdateList.add(acc);
           }
           /* Update Account and Test if the Recursion is Being prevented */
           update accountToUpdateList;
           
        }Catch(System.Exception ex){
            /* Call the TransactionLogHandler class method to create a log 
               parameters need to pass in the method are System.Exception and the Handler ClassName
            */
            
            TransactionLogHandler.doHandleException(ex , 'AccountTriggerHandler');
        }
    }
 
    public void AfterDelete(Map<Id, SObject> oldItems) {}
 
    public void AfterUndelete(List<sObject> newRecordsList , Map<Id, sObject> newItems) {}
    
}