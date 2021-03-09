  function stripDecimals(n) {
    return n | 0;
  }

  function customSessionRequest(toPage){

    var city =    localStorage.getItem('city');
    var country = localStorage.getItem('country');
    var battery = localStorage.getItem('battery');
    var screen =  localStorage.getItem('screen');
    var page =  localStorage.getItem('page');
    var ip =  localStorage.getItem('ip');

    $.ajax({
      async: true,
      type: "POST",
      dataType: "json",
      url: "/"+toPage,
      data: {"info":'vsession', "city":city, "country": country, "screen_size": screen, "page": page, "battery": battery,"ip":ip},
      success: function (){

      }


    }).done(function(rdata){

      //console.log(rdata);

    });

  }

  function MoneyFormat(amount){

      if (typeof amount == "number"){
        //console.log(amount+' is number');

      }else if (typeof amount =="string"){

        //console.log(amount+' is string..so converting to int');
        amount=parseInt(amount,10);
        //console.log(amount);
      }

      var namount=amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      //namount=namount.substring(namount,0,namount.length-2);
      return namount

  }

  function updateCart(rows)
  {
    var count=rows.length;
    var cart_item=$('.cart-dropdown');

    $('.count-label').text(count);

    var div="";
    var total=0;
    for(var i=0; i<rows.length; i++)
    {

            //console.log(rows[i]["doc_name"]);
            var product_name=rows[i]["product_name"];
            var product_image=rows[i]["product_image"];
            var doc_number=rows[i]["doc_number"];
            var product_id=rows[i]["product_id"];
            var quantity=rows[i]["quantity"];
            //var rate=rows[i]["rate"];

            var payable_amount=rows[i]["payable_amount"];
            var trxid=rows[i]["trxid"];
            //var price=Number(quantity)*Number(rate);

            var arate=Number(payable_amount)/Number(quantity);
            total+=Number(payable_amount);

            var frate=MoneyFormat(arate);

            div +=`<div class="entry">`
                +`<div class="entry-thumb"><a href="#"><img src="${product_image}" alt="Product"></a></div>`
                +`<div class="entry-content">`
                +`<h4 class="entry-title"><a href="#">${product_name}</a></h4><span class="entry-meta">${quantity} x ৳${frate}</span>`
                +`</div>`
                +`<div class="entry-delete" data-tid="${trxid}" data-doc="${doc_number}" data-item="${product_id}"><i class="icon-x"></i></div>`
                +`</div>\n\n`

    }

    var sub_total=MoneyFormat(total);
    div+=`<div class="text-right">`
        +`<p class="text-gray-dark py-2 mb-0"><span class='text-muted'>Subtotal:</span> &nbsp;৳${sub_total}</p>`
        +`</div>`

    div+=`<div class="d-flex">`
        +`<div class="pr-2 w-50"><a class="btn btn-secondary btn-sm btn-block mb-0" href="/cart">Expand Cart</a></div>`
        +`<div class="pl-2 w-50"><a class="btn btn-primary btn-sm btn-block mb-0" href="/checkout">Checkout</a></div>`
        +`</div>`

    //console.log(div);
    cart_item.empty().append(div);

  }

  function clearData(){
      localStorage.clear();
  }

  function screenWidthHeight(){

    var height=window.screen.height;
    var width=window.screen.width;

    var screen=`${width}x${height}`;
    localStorage.setItem('screen', screen);
  
    return screen;
  }

  function currentUrl(){

    var currentLocation = window.location;
    //console.log('current url');
    //console.log(currentLocation);
    //console.log(currentLocation.href);
    //console.log(currentLocation.pathname);
    var page=currentLocation.pathname;
    localStorage.setItem('page',page);

    return page;
  }

  function checkIfEmpty(){

    var city = localStorage.getItem('city');
    var ip = localStorage.getItem('ip');
    var country = localStorage.getItem('country');

    //const promiseA = new Promise(getLocation);

    try {

        if (city.length == 0 || ip.length==0){
            //console.log('get data..');
            getBatteryStatus();
            screenWidthHeight();
            currentUrl();
            getLocation();

        }else{
            //console.log(city);
            //console.log(country);
            sessionRequest();
        }

      }catch(err) {
        //console.log("error..."+err);
        getBatteryStatus();
        screenWidthHeight();
        currentUrl();
        getLocation();

      }



  }


  function getBatteryStatus(){

      var battery=false;
      if(navigator.getBattery) {
          battery=true;
          navigator.getBattery().then(function(battery) {
          //console.warn("Battery charging: ", battery.charging);
          //console.warn("Initial battery level: ", battery.level);
        });
      }
      localStorage.setItem('battery', battery);

      return battery

  }


  function getLocation(){

    $.ajax({

      url: "https://geolocation-db.com/jsonp",
      jsonpCallback: "callback",
      dataType: "jsonp",
      success: function( location ) {
      }
    }).done(function(data){

      city=data.city;
      country_name=data.country_name;
      //console.log(data);
      localStorage.setItem('city', city);
      localStorage.setItem('country', country_name);

      localStorage.setItem('lat', data.latitude);
      localStorage.setItem('long', data.longitude);
      localStorage.setItem('ip', data.IPv4);
      sessionRequest();
      
    });	

  }


  function sessionRequest(){

    screenWidthHeight();
    var city =    localStorage.getItem('city');
    var country = localStorage.getItem('country');
    var battery = localStorage.getItem('battery');
    var screen =  localStorage.getItem('screen');
    var page =  localStorage.getItem('page');
    var ip =  localStorage.getItem('ip');

    $.ajax({
      async: true,
      type: "POST",
      dataType: "json",
      url: "/vsapi",
      data: {"info":'vsession', "city":city, "country": country, "screen_size": screen, "page": page, "battery": battery,"ip":ip},
      success: function (){

      }


    }).done(function(rdata){

      //console.log(rdata);

    });

  }

  function geoData(){

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, options);

    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }

  }

  function success(pos) {

    var crd = pos.coords;
    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
    localStorage.setItem('latitude', crd.latitude);
    localStorage.setItem('longitude', crd.longitude);

  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }