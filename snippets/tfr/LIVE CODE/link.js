// Gets vin from remote php file and displays link in #tfr-results div
function getVin() {
      jQuery("#tfr-results").empty();
            jQuery.ajax({
                  type : 'POST',
                  url : 'http://admin.trueframereport.com/link/ajax.link.php',
                  data: {
                      vin : jQuery('#tfr-vin').val(),
                  },
                  success:function (data) {
                          jQuery("#tfr-results").append(data);
              },
      });
}

window.onload = function() {
    if (window.jQuery) { // If jQuery is already included, run getVin function
            getVin();
        } else { // Includes jQuery if it's not included
            (function () {

                  function loadScript(url, callback) {

                      var script = document.createElement("script")
                      script.type = "text/javascript";

                      if (script.readyState) { //IE
                          script.onreadystatechange = function () {
                              if (script.readyState == "loaded" || script.readyState == "complete") {
                                  script.onreadystatechange = null;
                                  callback();
                              }
                          };
                      } else { //Others
                          script.onload = function () {
                              callback();
                          };
                      }

                      script.src = url;
                      document.getElementsByTagName("head")[0].appendChild(script);
                  }

                  loadScript("//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js", function () { //jQuery loaded, run getVin function
                        getVin();
                  });

              })();
        }
}