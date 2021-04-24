$(function(){
    
   chrome.storage.sync.get(['total','limit'],function(budget){
       $('#total').text(budget.total);
       $('#limit').text(budget.limit);
   
})
    $('#spendamount').click(function()
    {
       chrome.storage.sync.get(['total','limit'],function(budget)
       {//budget is an object and total is where the chrome api will dump its values into
        var newtotal=0;
        if(budget.total){

        newtotal+=parseInt(budget.total);

        }

       var amount=$('#amount').val();
       if(amount)
       {
           newtotal+=parseInt(amount);
       }
       chrome.storage.sync.set({'total':newtotal},function(){
           if(amount && newtotal>=budget.limit){
               var notifoptions={
                   type:'basic',
                   iconUrl:'icon48.png',
                   title:'Limit reached!',
                   message:"Uh OH!...u have reachd ur limit"
               };
               chrome.notifications.create('limitNotif',notifoptions);
           }
       });
       $('#total').text(newtotal);
       $('#amount').val('');

       });
    });
  });