public class TestApexForPoc {

    
    @AuraEnabled(cacheable=true)
    public static wrapperClass getData(){
        wrapperClass obj = new wrapperClass();
        
        list<Opportunity> oppClosedToday       = [select id, StageName from Opportunity where StageName = 'Closed Won' and CloseDate=Today];
        list<Opportunity> oppClosedYesterday   = [select id, StageName from Opportunity where StageName = 'Closed Won' and CloseDate=Yesterday];
        list<Opportunity> oppOpenToday         = [select id, StageName from Opportunity where CreatedDate=Today];
        list<Opportunity> oppOpenYesterday     = [select id, StageName from Opportunity where CreatedDate=Yesterday];
        
        obj.closedToday = oppClosedToday.size();
        obj.closedYesterday = oppClosedYesterday.size();
        obj.openToday = oppOpenToday.size();
        obj.openYesterday = oppOpenYesterday.size();
        //obj.closedPercentage = (oppClosedToday.size() / oppClosedYesterday.size()) * 100;
        Double x = oppClosedToday.size();
        Double y = oppClosedYesterday.size();
        Double z = 0.0;
        if(x == 0 && y == 0){
          z = 0.0;  
        }else if(y != 0){
         z = (x / y);   
        }else {
          z = 1;
        }
        
        Decimal a = z * 100;
        obj.closedPercentage = a.setScale(2);
        return obj;
        
    }
    
    
    public class wrapperClass {
        @AuraEnabled
        public integer closedToday {get;set;}
        @AuraEnabled
        public integer openToday  {get;set;}
        @AuraEnabled
        public integer openYesterday  {get;set;}
        @AuraEnabled
        public integer closedYesterday  {get;set;}
        @AuraEnabled
        public decimal closedPercentage  {get;set;}
        
    }
    
    
}