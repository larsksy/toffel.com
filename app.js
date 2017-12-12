$(document).ready(function () {

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById('audioElement');
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);

  //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  var frequencyData = new Uint8Array(200);
  audioElement.play();

  function renderChart() {
     requestAnimationFrame(renderChart);

     // Copy frequency data to frequencyData array.
     analyser.getByteFrequencyData(frequencyData);

     // Update d3 chart with new data.
     var img = document.getElementById('toffel');
     var sum = 0;
     var k = frequencyData.length;
     for(var i = 0; i < frequencyData.length;i++){
       sum += frequencyData[i]*k/frequencyData.length;
       k = k - 1;

     }
     var avg = sum/frequencyData.length;
     img.style.width = String(avg*0.9+350) + "px";

  }

  // Run the loop
  renderChart();

})
