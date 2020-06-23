      var reload_time = 1800; // second
      $( function(){
          $("body").css({"background-color": "tan"});
          $("#clock").css({"float" : "right", "background-color": "azure", "padding": "0 5px"});
          $("#submit").on("click", rssload );
          $("#wait_time").text(reload_time)
          setInterval(rssload, reload_time * 1000);
          setInterval(get_clienttime, 1000);
          setInterval(function(){$("#wait_time").html( $("#wait_time").html() -1 )}, 1000);
      } );
      
      var rssload = function () {
          $("#submit").prop({"disabled": true, "value": "Loading"});
          $.ajax({
              url: "/data/feed",
              type:'GET',
              dataType: 'json',
              timeout:300000,
          }).done(function(data) {
              $("#rss_space").empty().append('<div id="list"></div>');
              $("#list").css({"columns":"3"});
              data.forEach(function(ele, index, array){
                  var time = new Date(ele.date);
                  $("#list").append( '<h3>' + ele.title +' ('
                                     + time.toLocaleTimeString() + ')</h3><div>'+ ele.rss +' [<a href="'
                                     + ele.link +'">link</a>]<p>'
                                     + ele.summary + '</p></div>');
              });
              $("#list").accordion({"active" : false, "collapsible" : true, heightStyle: "content"});

              $('#submit').prop({"disabled": false, "value": "RSS Load"});
              $("#wait_time").text(reload_time);
          }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
              alert("error");
              cononsole.log("XMLHttpRequest : " + XMLHttpRequest.status);
              consnsole.log("textStatus     : " + textStatus);
              consolele.log("errorThrown    : " + errorThrown.message);
              $('#submit').prop({"disabled": false,"value":"Retry"});
          });
      };

      var get_clienttime = function () {
          var now = new Date();
          $('#clock').html( now.toLocaleDateString() + " " + now.toLocaleTimeString() );
      }
