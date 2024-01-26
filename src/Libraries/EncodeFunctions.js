/* eslint-disable quotes */
import NewAsyncStorage from "./AsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

class EncodeFunctions {
  constructor() {}

  encode(input) {
    let keyStr =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    var output = [];
    var chr1,
      chr2,
      chr3 = "";
    var enc1,
      enc2,
      enc3,
      enc4 = "";
    var i = 0;

    do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output.push(
        keyStr.charAt(enc1) +
          keyStr.charAt(enc2) +
          keyStr.charAt(enc3) +
          keyStr.charAt(enc4)
      );
      chr1 = chr2 = chr3 = "";
      enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output.join("");
  }

  decode(input) {
    let keyStr =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    var output = "";
    var chr1,
      chr2,
      chr3 = "";
    var enc1,
      enc2,
      enc3,
      enc4 = "";
    var i = 0;

    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
      throw new Error(
        "There were invalid base64 characters in the input text.\n" +
          "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
          "Expect errors in decoding."
      );
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    do {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }

      chr1 = chr2 = chr3 = "";
      enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output;
  }

  xml2json(xml, tab = " ") {
    var X = {
      toObj: function(xml) {
        var o = {};
        if (xml.nodeType == 1) {
          // element node ..
          if (xml.attributes.length) {
            // element with attributes  ..
            for (var i = 0; i < xml.attributes.length; i++) {
              o["@" + xml.attributes[i].nodeName] = (
                xml.attributes[i].nodeValue || ""
              ).toString();
            }
          }
          if (xml.firstChild) {
            // element has child nodes ..
            var textChild = 0,
              cdataChild = 0,
              hasElementChild = false;
            for (var n = xml.firstChild; n; n = n.nextSibling) {
              if (n.nodeType == 1) {
                hasElementChild = true;
              } else if (
                n.nodeType == 3 &&
                n.nodeValue.match(/[^ \f\n\r\t\v]/)
              ) {
                textChild++;
              }
              // non-whitespace text
              else if (n.nodeType == 4) {
                cdataChild++;
              } // cdata section node
            }
            if (hasElementChild) {
              if (textChild < 2 && cdataChild < 2) {
                // structured element with evtl. a single text or/and cdata node ..
                X.removeWhite(xml);
                for (var n = xml.firstChild; n; n = n.nextSibling) {
                  if (n.nodeType == 3) {
                    // text node
                    o["#text"] = X.escape(n.nodeValue);
                  } else if (n.nodeType == 4) {
                    // cdata node
                    o["#cdata"] = X.escape(n.nodeValue);
                  } else if (o[n.nodeName]) {
                    // multiple occurence of element ..
                    if (o[n.nodeName] instanceof Array) {
                      o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                    } else {
                      o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                    }
                  } // first occurence of element..
                  else {
                    o[n.nodeName] = X.toObj(n);
                  }
                }
              } else {
                // mixed content
                if (!xml.attributes.length) {
                  o = X.escape(X.innerXml(xml));
                } else {
                  o["#text"] = X.escape(X.innerXml(xml));
                }
              }
            } else if (textChild) {
              // pure text
              if (!xml.attributes.length) {
                o = X.escape(X.innerXml(xml));
              } else {
                o["#text"] = X.escape(X.innerXml(xml));
              }
            } else if (cdataChild) {
              // cdata
              if (cdataChild > 1) {
                o = X.escape(X.innerXml(xml));
              } else {
                for (var n = xml.firstChild; n; n = n.nextSibling) {
                  o["#cdata"] = X.escape(n.nodeValue);
                }
              }
            }
          }
          if (!xml.attributes.length && !xml.firstChild) {
            o = null;
          }
        } else if (xml.nodeType == 9) {
          // document.node
          o = X.toObj(xml.documentElement);
        } else {
          alert("unhandled node type: " + xml.nodeType);
        }
        return o;
      },
      toJson: function(o, name, ind) {
        var json = name ? '"' + name + '"' : "";
        if (o instanceof Array) {
          for (var i = 0, n = o.length; i < n; i++) {
            o[i] = X.toJson(o[i], "", ind + "\t");
          }
          json +=
            (name ? ":[" : "[") +
            (o.length > 1
              ? "\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind
              : o.join("")) +
            "]";
        } else if (o == null) {
          json += (name && ":") + "null";
        } else if (typeof o === "object") {
          var arr = [];
          for (var m in o) {
            arr[arr.length] = X.toJson(o[m], m, ind + "\t");
          }
          json +=
            (name ? ":{" : "{") +
            (arr.length > 1
              ? "\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind
              : arr.join("")) +
            "}";
        } else if (typeof o === "string") {
          json += (name && ":") + '"' + o.toString() + '"';
        } else {
          json += (name && ":") + o.toString();
        }
        return json;
      },
      innerXml: function(node) {
        var s = "";
        if ("innerHTML" in node) {
          s = node.innerHTML;
        } else {
          var asXml = function(n) {
            var s = "";
            if (n.nodeType == 1) {
              s += "<" + n.nodeName;
              for (var i = 0; i < n.attributes.length; i++) {
                s +=
                  " " +
                  n.attributes[i].nodeName +
                  '="' +
                  (n.attributes[i].nodeValue || "").toString() +
                  '"';
              }
              if (n.firstChild) {
                s += ">";
                for (var c = n.firstChild; c; c = c.nextSibling) {
                  s += asXml(c);
                }
                s += "</" + n.nodeName + ">";
              } else {
                s += "/>";
              }
            } else if (n.nodeType == 3) {
              s += n.nodeValue;
            } else if (n.nodeType == 4) {
              s += "<![CDATA[" + n.nodeValue + "]]>";
            }
            return s;
          };
          for (var c = node.firstChild; c; c = c.nextSibling) {
            s += asXml(c);
          }
        }
        return s;
      },
      escape: function(txt) {
        return txt
          .replace(/[\\]/g, "\\\\")
          .replace(/[\"]/g, '\\"')
          .replace(/[\n]/g, "\\n")
          .replace(/[\r]/g, "\\r");
      },
      removeWhite: function(e) {
        e.normalize();
        for (var n = e.firstChild; n; ) {
          if (n.nodeType == 3) {
            // text node
            if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
              // pure whitespace text node
              var nxt = n.nextSibling;
              e.removeChild(n);
              n = nxt;
            } else {
              n = n.nextSibling;
            }
          } else if (n.nodeType == 1) {
            // element node
            X.removeWhite(n);
            n = n.nextSibling;
          } // any other node
          else {
            n = n.nextSibling;
          }
        }
        return e;
      }
    };
    if (xml.nodeType == 9) {
      // document node
      xml = xml.documentElement;
    }
    var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
    return (
      "{\n" +
      tab +
      (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) +
      "\n}"
    );
  }
}

export default new EncodeFunctions();
