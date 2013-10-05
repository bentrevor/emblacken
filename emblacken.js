if (typeof emblackenCallCount == 'undefined') {
  emblackenCallCount = 0;
}

function removeThirdPartyElements() {

  removeElementsFrom(self);
  removeElementsFromAllFrames();

  function removeElementsFrom(thisWindow) {
    try {
      var d = thisWindow.document;
      var tagNames = ["object","embed","applet","iframe"];
      var exitStatus = 1;
      var j, i, tagName, elements, oldDiv, newDiv, contentWindow;

      for(j = 0; tagName = tagNames[j]; j++) {
        elements = d.getElementsByTagName(tagName);

        for(i = elements.length - 1; (i + 1) && (oldDiv = elements[i]); --i) {
          if(moreElementsToRemove(tagName, contentWindow, oldDiv)) {
            newDiv = d.createElement("div");
            newDiv.style.width = oldDiv.width;
            newDiv.style.height = oldDiv.height;
            newDiv.innerHTML = "<del>" + (j == 3 ? "third-party " + tagName : tagName) + "</del>";

            oldDiv.parentNode.replaceChild(newDiv, oldDiv);
          }
        }
      }
    } catch(E) {
      exitStatus = 0;
      console.log("something went wrong: " + E);
    }

    return exitStatus;
  }

  function moreElementsToRemove(tagName, contentWindow, oldDiv) {
    return notIframe(tagName) || noMoreThirdPartyElements(contentWindow, oldDiv);
  }

  function noMoreThirdPartyElements(contentWindow, oldDiv) {
    return !removeElementsFrom((contentWindow = oldDiv.contentWindow) ? contentWindow : oldDiv.contentDocument.defaultView);
  }

  function notIframe(tagName) {
    return tagName != "iframe";
  }

  function removeElementsFromAllFrames() {
    var i, frame;
    for(i = 0; frame = frames[i]; i++) {
      removeElementsFrom(frame)
    }
  }
} 

function useBlackTextOnWhiteBackground() {
  var styles = stringStylesheet();

  if(usingIE()) {
    createStyleSheetForIEWith(styles);
  } else {
    createStyleSheetForNonIEWith(styles);
  }
} 

function usingIE() {
  return document.createStyleSheet;
}

function createStyleSheetForIEWith(styles) {
  document.createStyleSheet("javascript:'" + styles + "'");
}

function createStyleSheetForNonIEWith(styles) {
  var newSS = document.createElement('link');
  newSS.rel = 'stylesheet';
  newSS.href = 'data:text/css,' + escape(styles);
  document.getElementsByTagName("head")[0].appendChild(newSS);
}

function stringStylesheet() {
  return "" +
    "* {"                                 + 
    "     background: white !important;"  +
    "     color:      black !important;"  +
    "     text-shadow: none !important;"  +
    "}"                                   +
    ""                                    +
    " :link, :link * {"                   + 
    "     color: #0000EE !important;"     +
    " }"                                  +
    ""                                    +
    ":visited, :visited * {"              +
    "     color: #551A8B !important;"     +
    "}";
}

useBlackTextOnWhiteBackground();

if (emblackenCallCount > 0) {

  removeThirdPartyElements();


  javascript:(function(){var d=document; function K(N,w) { var nn = d.createElement(w), C = N.childNodes, i; for(i=C.length-1;i>=0;--i) nn.insertBefore(C[i],nn.childNodes[0]); N.parentNode.replaceChild(nn,N); } function Z(t,w) { var T = document.getElementsByTagName(t), j; for (j=T.length-1;j>=0;--j) K(T[j],w); } Z("blink", "span"); Z("marquee", "div"); })(); 

  javascript:(function(){var H=["mouseover","mouseout","unload","resize"],o=window.opera; if(document.addEventListener/*MOZ*/&&!o) for(j in H)document.addEventListener(H[j],function(e){e.stopPropagation();},true); else if(window.captureEvents/*NS4*/&&!o) { document.captureEvents(-1/*ALL*/);for(j in H)window["on"+H[j]]=null;} else/*IE*/ {function R(N){var i,x;for(j in H)if(N["on"+H[j]]/*NOT TEXTNODE*/)N["on"+H[j]]=null;for(i=0;x=N.childNodes[i];++i)R(x);}R(document);}})(); 

  javascript:(function() { var c, tID, iID; tID = setTimeout(function(){}, 0); for (c=1; c<1000 && c<=tID; ++c) clearTimeout(tID - c); iID = setInterval(function(){},1000); for (c=0; c<1000 && c<=iID; ++c) clearInterval(iID - c); })();
}



console.log("finished emblackening " + emblackenCallCount++ + " times.");
