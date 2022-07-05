/*
    @Author : Roshan Dash
    @BuiltDate : 1st May 2022
    @Description :
*/

public with sharing class TransactionLogHandler{

    public static void doHandleException(System.Exception ex , String processName){
        Transaction_Log__c transactionLog = new Transaction_Log__c(
            Error_Log__c = ex.getStackTraceString() +'<br/>' + ex.getMessage() + '<br/>' + ex.getCause() +' <br/>'+ ex.getTypeName(),
            Exception_Time__c = System.Now(),
            Process_Name__c = processName,
            Class_Name__c = processName
        );
        if(Schema.sObjectType.Transaction_Log__c.isCreateable()){
            insert transactionLog;
        }
        
    }

}