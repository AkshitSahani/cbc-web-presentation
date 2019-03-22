export const xmlToJson = (xml) => {
  // Create the return object
  var obj = {};

  if (xml.nodeType === 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj[attribute.nodeName] = attribute.nodeValue;
      }
    }
  }
  else if (xml.nodeType === 3) { // text
    obj = xml.nodeValue;
  }

  // do children
  // If just one text node inside
  if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
		obj = xml.childNodes[0].nodeValue;
	}
  else if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof(obj[nodeName]) === "undefined") {
          obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof(obj[nodeName].push) === "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

export const roundNum = (num) => (num/1).toFixed(1); // divide by 1 so that it becomes number and toFixed can be called on it.


  // prompt(window, pref, message, callback) {
  //   let branch = Components.classes["@mozilla.org/preferences-service;1"]
  //                          .getService(Components.interfaces.nsIPrefBranch);
  //
  //   if (branch.getPrefType(pref) === branch.PREF_STRING) {
  //       switch (branch.getCharPref(pref)) {
  //       case "always":
  //           return callback(true);
  //       case "never":
  //           return callback(false);
  //       }
  //   }
  //
  //   let done = false;
  //
  //   function remember(value, result) {
  //       return function() {
  //           done = true;
  //           branch.setCharPref(pref, value);
  //           callback(result);
  //       }
  //   }
  //
  //   let self = window.PopupNotifications.show(
  //       window.gBrowser.selectedBrowser,
  //       "geolocation",
  //       message,
  //       "geo-notification-icon",
  //       {
  //           label: "Share Location",
  //           accessKey: "S",
  //           callback: function(notification) {
  //               done = true;
  //               callback(true);
  //           }
  //       }, [
  //           {
  //               label: "Always Share",
  //               accessKey: "A",
  //               callback: remember("always", true)
  //           },
  //           {
  //               label: "Never Share",
  //               accessKey: "N",
  //               callback: remember("never", false)
  //           }
  //       ], {
  //           eventCallback: function(event) {
  //               if (event === "dismissed") {
  //                   if (!done) callback(false);
  //                   done = true;
  //                   window.PopupNotifications.remove(self);
  //               }
  //           },
  //           persistWhileVisible: true
  //       });
  //   }
