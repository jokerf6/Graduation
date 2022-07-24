var i = 0;
var txt = 'Accept qualifies you for the job market through tracks in all fields'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */
function typeWriter() {
  if (i < txt.length) {
    document.getElementById("text").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter();
