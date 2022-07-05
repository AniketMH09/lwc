public class ContentDocumentLinkTriggerHandler implements TriggerInterface {
public void BeforeInsert(List<SObject> newItems) {
         system.debug('inside handler'+newItems);
        for(ContentDocumentLink l:(List<ContentDocumentLink>)newItems) {
        l.Visibility='AllUsers';
        }
    }
 
    public void BeforeUpdate(Map<Id, SObject> newItems, Map<Id, SObject> oldItems) {}
    
    public void BeforeDelete(List<sObject> oldRecordsList , Map<Id, SObject> oldItems) {}
 
    public void AfterInsert(List<sObject> newRecordsList , Map<Id, SObject> newItems) {}
 
    public void AfterUpdate(Map<Id, SObject> newItems, Map<Id, SObject> oldItems) {}
    
    public void AfterDelete(Map<Id, SObject> oldItems) {}
 
    public void AfterUndelete(List<sObject> newRecordsList , Map<Id, sObject> newItems) {}
}