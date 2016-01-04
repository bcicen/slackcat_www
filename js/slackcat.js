function getParameters() {
  var prmstr = window.location.search.substr(1);
  return prmstr != null && prmstr != "" ? paramToArray(prmstr) : {};
}

function paramToArray(prmstr) {
  var params = {};
  var prmarr = prmstr.split("&");
  for ( var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
  }
  return params;
}

function failed(msg) {
    var h = document.createElement('h1');
		h.innerHTML = msg;
		$('#token-box').append(h);
}

$(document).ready(function() {
  var params = getParameters();
	if (jQuery.isEmptyObject(params)) {
		failed('something broke');
	} else if ("error" in params) {
		failed('Slack authentication error: ' + params.error);
	} else {
    $.ajax("http://api.vektor.nyc/slackcat", {
      method: "POST",
      data: params,
      error: function(xhr, status) {
        console.log(xhr.status);
				failed();
      }
    })
			.done(function(token) {
        var t1 = document.createElement('h2')
            t2 = document.createElement('h1')
				t1.innerHTML = 'use the below token to complete Slackcat setup:'
				t2.innerHTML = token
				$('#token-box').append(t1);
				$('#token-box').append(t2);
			});
	}
	console.log(params);
});
