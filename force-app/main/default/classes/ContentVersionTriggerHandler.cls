public class ContentVersionTriggerHandler implements TriggerInterface {
    public void BeforeInsert(List<SObject> newItems) {

//PathOnClient
    for(ContentVersion doc : (List<ContentVersion>)newItems){
            system.debug('file name'+doc.PathOnClient);
        if(!doc.PathOnClient.contains('.pdf')){
           doc.addError('File having this extension could not be attached,Please try some other extension.');
            doc.isValidFIle__c = true;
        }
       }
        
    }
    
    public void BeforeUpdate(Map<Id, SObject> newItems, Map<Id, SObject> oldItems) {}
    
    public void BeforeDelete(List<sObject> oldRecordsList , Map<Id, SObject> oldItems) {}
    
    public void AfterInsert(List<sObject> newRecordsList , Map<Id, SObject> newItems) {
        
        for(ContentVersion doc : (List<ContentVersion>)newRecordsList){
            system.debug('file type'+doc.FileType);
            system.debug('FileExtension'+doc.FileExtension);
            
            if(doc.FileType != null && (doc.FileType !='WORD_X' && doc.FileType !='PDF')){
                //doc.addError('File having this extension could not be attached,Please try some other extension.');
                //doc.isValidFIle__c = true;
            }
            
        }
    }
    
    public void AfterUpdate(Map<Id, SObject> newItems, Map<Id, SObject> oldItems) {}
    
    public void AfterDelete(Map<Id, SObject> oldItems) {}
    
    public void AfterUndelete(List<sObject> newRecordsList , Map<Id, sObject> newItems) {}
}