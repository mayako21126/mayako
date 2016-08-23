export function getViewport () {
  let viewPortWidth
  let viewPortHeight
  if (typeof window.innerWidth !== 'undefined') {
    viewPortWidth = window.innerWidth
    viewPortHeight = window.innerHeight
  } else if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
    viewPortWidth = document.documentElement.clientWidth
    viewPortHeight = document.documentElement.clientHeight
  } else {
    viewPortWidth = document.getElementsByTagName('body')[0].clientWidth
    viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
  }
  return [viewPortWidth, viewPortHeight]
}

export var apis = 'http://139.129.207.62:8080/'

export function getQueryString (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}
export function statInputNum (textArea, numItem) {
  var max = numItem.text()
  var curLength
  textArea[0].setAttribute("maxlength", max);
  curLength = textArea.val().length;
  numItem.text(max - curLength);
  textArea.on('input propertychange', function () {
    var _value = $(this).val().replace(/\n/gi, "");
    numItem.text(max - _value.length);
  });
}
