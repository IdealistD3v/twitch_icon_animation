window.onload = function () {
  window.AudioContext = (window.AudioContext ||
                         window.webkitAudioContext);
  navigator.getUserMedia = (navigator.getUserMedia || 
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia);
  navigator.getUserMedia({
      video : false,
      audio : true
  }, function (stream) {
      var audioContext = new AudioContext();
      var mediaStreamSource = audioContext.createMediaStreamSource(stream);
      var processor = audioContext.createScriptProcessor(2048, 1, 1);

      //mediaStreamSource.connect(audioContext.destination);
      mediaStreamSource.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = function (e) {
          var inputData = e.inputBuffer.getChannelData(0);
          var inputDataLength = inputData.length;
          var total = 0;

          for (var i = 0; i < inputDataLength; i++) {
              total += Math.abs(inputData[i++]);
          }
          
          var rms = Math.sqrt(total / inputDataLength);
          var volume = rms * 100;
          var img = document.getElementById("image")

          if (volume > 10){
            img.className = "talked"
            console.log("Talking")
          }else{
            img.className = ""
            console.log("Not talking")
          }
          
      };
  }, function (err) {
      console.log(err)
  });
}