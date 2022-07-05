({  
     /*US 26055 Narain  Start*/
    financeAccountnumberList : function (component, event, helper){
              var action = component.get("c.getFinanceAccountnumberList"); 
              action.setParams({userId:component.get("v.userId")});
      		  action.setCallback(this, function(response) {
 			   var state = response.getState();
           	    if(state === "SUCCESS"){
                var result = response.getReturnValue();
                  
                    if(result !="" && result != undefined && result !=null)
                    {        		   
                        component.get("c.openModelFA").run();

                        var FinanceAccountMap = [];                   	
                         for(var key in result)
                         {
                            FinanceAccountMap.push({key: key, value: result[key]});
                         }
                            component.set("v.FinanceAccountMap", FinanceAccountMap);
               
                    } 
                  
                    else
                    {      
                                component.set("v.isOpenFA", false);
                               

                    }
                
                }
                  
            else if(state === "ERROR") {
                var errors = response.getError();
                if(errors){
                    if(errors[0] && errors[0].message){
                        
                    }
                }
                else{
                    console.log("Unknown Error");
                }
            }
        });

        
              $A.enqueueAction(action);
               },
                              
             /*US 26055 Narain  end*/
                      
	helperMethod : function() {
		
	},
  getStates : function(component, event, helper) {
        var action = component.get("c.getStates");
        action.setParams({ "selectedCountry" : component.get("v.selectedCountry"),
                          "objectAPIName" : component.get("v.objectAPIName"),
                          "countryPicklistAPIName" : component.get("v.countryPicklistAPIName"),
                          "statePicklistAPIName" : component.get("v.statePicklistAPIName")
                         });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var stateList = response.getReturnValue();
                component.set("v.states", stateList);
            }
            else if (state === "ERROR") {
                console.error("Error calling action: "+ response.getState());
            }
        });
        $A.enqueueAction(action);
    },
     countryProvinceMap: {
        US: [
            {'label': 'California', 'value': 'CA'},
            {'label': 'Texas', 'value': 'TX'},
            {'label': 'Washington', 'value': 'WA'}
        ],
        CN: [
            {'label': 'GuangDong', 'value': 'GD'},
            {'label': 'GuangXi', 'value': 'GX'},
            {'label': 'Sichuan', 'value': 'SC'}
        ],
        VA: []
    },
    countryOptions: [
        {'label': 'United States', 'value': 'US'},
        {'label': 'China', 'value': 'CN'},
        {'label': 'Vatican', 'value': 'VA'}
    ],
    getProvinceOptions: function(country) {
        return this.countryProvinceMap[country];
    },
    getCountryOptions: function() {
        return this.countryOptions;
    },
})