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

var imageSRC = document.getElementById('#image');

function startScan() {
   Quagga.init({
      inputStream : {
        name : "Live",
        type : "ImageStream",
        target: imageSRC //document.querySelector('#image')    // Or '#yourElement' (optional)
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
      decoder: {
          readers: ["code_128_reader",
          "ean_reader",
          "ean_8_reader",
          "code_39_reader",
          "code_39_vin_reader",
          "codabar_reader",
          "upc_reader",
          "upc_e_reader",
          "i2of5_reader",
          "20f5_reader",
          "code_93_reader"] // List of active readers
      },
      locate: true, // try to locate the barcode in the image
      src: imageSRC //'/test/fixtures/code_128/image-001.jpg' // or 'data:image/jpg;base64,' + data
  }, function(result){
      if(result.codeResult) {
          console.log("result", result.codeResult.code);
      } else {
          console.log("not detected");
      }
  });

};


var scan = document.getElementById('scanStart');

scan.addEventListener("click", function() {
   event.preventDefault();
   startScan();
});

