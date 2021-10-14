$(document).ready(function () {
    $(document).on('click','body *',function(){
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let audioElement = document.getElementById('audioElement');
        let audioSrc = audioCtx.createMediaElementSource(audioElement);
        let analyser = audioCtx.createAnalyser();

        // Bind our analyser to the media element source.
        audioSrc.connect(analyser);
        audioSrc.connect(audioCtx.destination);

        //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
        let frequencyData = new Uint8Array(200);
        audioElement.play();

        function renderChart() {
            requestAnimationFrame(renderChart);

            // Copy frequency data to frequencyData array.
            analyser.getByteFrequencyData(frequencyData);

            // Update d3 chart with new data.
            let img = document.getElementById('toffel');
            let sum = 0;
            let k = frequencyData.length;
            for(let i = 0; i < frequencyData.length;i++){
                sum += frequencyData[i]*k/frequencyData.length;
                k = k - 1;

            }
            let avg = sum/frequencyData.length;
            img.style.width = String(avg*7) + "px";

        }

        // Run the loop
        renderChart();
    });
})
