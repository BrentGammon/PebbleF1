/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */
var ajax = require('ajax');
var UI = require('ui');
var menuItems = [
  {
    title:"Drivers"
  },
  {
    title:"Constructors"
  }
];
var menu = new UI.Menu({
  sections: [{
    title: 'Formula 1 Championship',
    items: menuItems
  }]
});
menu.show();

menu.on('select',function(event){

  if(menuItems[event.itemIndex].title=="Drivers"){
    drivers(event);
  }else{
    constructors(event);
  }


});

function drivers(event){
  ajax(
  {
    url:'http://ergast.com/api/f1/current/driverStandings.json',
    type:'json'
  },
  function(data){
  var x = data.MRData.StandingsTable.StandingsLists;
	var  y = x[0].DriverStandings;


  console.log("size",y.length);

   var page = new UI.Card({
    scrollable: true
   });
   page.title("Championship");
    var content="";
   for(var i=0;i<y.length;i++){
     content+=i+1+": "+y[i].Driver.familyName+"\n"+"Points: "+y[i].points+"\n";
  }
  page.body(content);
  page.show();


  },
  function(data){
    var page = new UI.Card({
  title: 'Error',
  body:'getting data'
  });

  page.show();
  }

  );
}










function constructors(event){
   ajax(
  {
    url:'http://ergast.com/api/f1/current/constructorStandings.json',
    type:'json'
  },
  function(data){
  var x = data.MRData.StandingsTable.StandingsLists;
	var  y = x[0].ConstructorStandings;


  console.log("size",y.length);

   var page = new UI.Card({
    scrollable: true
   });
   page.title("Constructors");
    var content="";
   for(var i=0;i<y.length;i++){
     content+=i+1+": "+y[i].Constructor.name+"\n"+"Points: "+y[i].points+"\n";
  }
  page.body(content);
  page.show();


  },
  function(data){
    var page = new UI.Card({
  title: 'Error',
  body:'getting data'
  });

  page.show();
  }

  );

}
