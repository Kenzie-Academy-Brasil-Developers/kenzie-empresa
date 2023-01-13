export function toast(text, color) {
  Toastify({
  text: text,
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", 
  position: "center", 
  stopOnFocus: true, 
  style: {
    background: color,
  },
  onClick: function(){} 
}).showToast();
}

