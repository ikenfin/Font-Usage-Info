/*
  Font usage info
  scriptlet to determine fonts usage on webpage
*/
(function() {

  var isInspectOpen = false;

  /*
    check if inspect is opened
    https://stackoverflow.com/a/30638226/2240244
  */
  var element = new Image();
  Object.defineProperty(element, 'id', {
    get: function () {
      isInspectOpen = true;
    }
  });
  console.log('%c', element);

  var fontUsageInfo = function() {

    var fontStack = {};

    document.querySelectorAll('body *').forEach(function(elem, i) {

      var computedStyle = window.getComputedStyle(elem),
          _font = computedStyle.getPropertyValue('font-family');
      
      if (_font.length > 0) {
        var _font_splitted = _font.split(', ');
        if (_font_splitted.length > 0) {

          var fontName = _font_splitted[0].toUpperCase();

          if (!fontStack.hasOwnProperty(fontName)) {
            fontStack[fontName] = {}
          }

          var weight = computedStyle.getPropertyValue('font-weight');

          if (!fontStack[fontName].hasOwnProperty(weight)) {
            fontStack[fontName][weight] = 1;
          } else {
            fontStack[fontName][weight]++;
          }
        }
      }
    });

    var msg = 'Font usage info:\n';
    for (var fontname in fontStack) {
        msg += fontname;
        msg += '\n';
        for (var weight in fontStack[fontname]) {
            msg += '[ ' + weight + ' : ' + fontStack[fontname][weight] + ' ] ';
        }
        msg += '\n\n';
    }

    if(isInspectOpen) {
      console.log(msg);
    }
    else {
      alert(msg)
    }
  };

  document.readyState == 'complete' ? fontUsageInfo() : document.addEventListener('DOMContentLoaded', fontUsageInfo);
}());

/* Prevent browser to load js as url */
void(0);