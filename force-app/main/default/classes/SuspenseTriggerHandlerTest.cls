@isTest
public class SuspenseTriggerHandlerTest {
    
    public static final String Error_Suspense_Deletion_Message = 'Suspense Item cannot be deleted';
    
    @TestSetup
    public static void setup(){
        
        testDataBuilder();
    }
    
    @isTest
    public static void testSuspenseDeletion(){
        
        Boolean expectedExceptionThrown = false;
        String errorMessage;
        Suspense__c suspenseRecord = [Select id from Suspense__c LIMIT 1];
       
        Try{
            
            Test.startTest();
            delete suspenseRecord;
            Test.stopTest();
        }
        Catch(Exception ex){
            errorMessage = ex.getMessage();
            expectedExceptionThrown = ex.getMessage().contains(Error_Suspense_Deletion_Message) ? true : false;
        }
        
        system.assertEquals(true, expectedExceptionThrown, 'Expected validation - ' + Error_Suspense_Deletion_Message + ' but get ' + errorMessage);
    }
    
    @isTest
    public static void testSuspenseActionUpdate(){
        
        Suspense__c suspenseRecord = [Select id from Suspense__c LIMIT 1];
        
        system.debug('Debug log for suspenseRecord ' + suspenseRecord);
        
        Test.startTest();
        suspenseRecord.Operator_Action_Taken__c = 'Account';
        update suspenseRecord;
        Test.stopTest();
        
        system.assertEquals('Account', suspenseRecord.Operator_Action_Taken__c, 'Operator Action not updating');
    }
    
    @isTest
    public static void testSuspenseActionNullUpdate(){
        
        Suspense__c suspenseRecord = [Select id from Suspense__c WHERE Operator_Action_Taken__c != null LIMIT 1];
        
        Test.startTest();
        suspenseRecord.Operator_Action_Taken__c = null;
        update suspenseRecord;
        Test.stopTest();
        
        system.assertEquals(null , suspenseRecord.Operator_Action_Taken__c, 'Operator Action not updating');
    }
    
    @isTest
    public static void testSuspensePendigStatusUpdate(){
        
        Suspense__c suspenseRecord = [Select id from Suspense__c LIMIT 1];
        
        Test.startTest();
        suspenseRecord.Process_Status__c = 'Ready to Clear';
        suspenseRecord.User__c = UserInfo.getUserId();
        update suspenseRecord;
        Test.stopTest();
        
        system.assertEquals('Ready to Clear', suspenseRecord.Process_Status__c, 'Pending Status not updating');
        
    }
    
    private static void testDataBuilder(){
        
        List<Suspense__c> suspenseRecordList = new List<Suspense__c>();
        
        Suspense__c suspense1 = new Suspense__c();
        suspense1.ACCOUNT_NUMBER__C = '77868873';
        suspense1.ACTION_TAKEN__C = 'ADDED ONLINE';
        suspense1.Tran_Amount__c = 100;
        suspense1.EFFECTIVE_DATE__C = System.today();
        suspenseRecordList.add(suspense1); 
        
        Suspense__c suspense2 = new Suspense__c();
        suspense2.ACCOUNT_NUMBER__C = '99868873';
        suspense2.ACTION_TAKEN__C = 'ADDED ONLINE';
        suspense2.Tran_Amount__c = 120;
        suspense2.EFFECTIVE_DATE__C = System.today();
        suspense2.Operator_Action_Taken__c = 'Account';
        suspenseRecordList.add(suspense2);
        
        insert suspenseRecordList;
    }
}