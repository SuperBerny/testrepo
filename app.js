//Image preview
function showImage() {
   if(this.files && this.files[0]) {
     var obj = new FileReader();
     obj.onload = function(data) {
       var image = document.getElementById("image");
       image.src= data.target.result;
       image.style.display = "block";
     }
     obj.readAsDataURL(this.files[0]);
   }
 };


function startScan(event) {
   event.preventDefault();
   Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#yourElement')    // Or '#yourElement' (optional)
      },
      decoder : {
        readers : ["code_128_reader",
        "ean_reader",
        "ean_8_reader",
        "code_39_reader",
        "code_39_vin_reader",
        "codabar_reader",
        "upc_reader",
        "upc_e_reader",
        "i2of5_reader",
        "20f5_reader",
        "code_93_reader"]
      }
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });
   
   
   Quagga.decodeSingle({
       src: "image-abc-123.jpg",
       numOfWorkers: 0,  // Needs to be 0 when used within node
       inputStream: {
           size: 800  // restrict input-size to be 800px in width (long-side)
       },
       decoder: {
           readers: ["code_128_reader"] // List of active readers
       },
   }, function(result) {
       if(result.codeResult) {
           console.log("result", result.codeResult.code);
       } else {
           console.log("not detected");
       }
   });

};


var scan = document.getElementById('scanStart');

scan.addEventListener("click", function() {
   startScan();
});

