window.onload = () => {
  $("#sendbutton").click(() => {
    imagebox = $("#imagebox");
    link = $("#link");
    input = $("#imageinput")[0];
    if (input.files && input.files[0]) {
      let formData = new FormData();
      formData.append("video", input.files[0]);
      $.ajax({
        url: "/detect", // fix this to your liking
        type: "POST",
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        error: function (data) {
          console.log("upload error", data);
          console.log(data.getAllResponseHeaders());
        },
        success: function (data) {
          console.log(data);
          // bytestring = data["status"];
          // image = bytestring.split("'")[1];
          Swal.fire({
            title: 'Berhasil',
            text: "File berhasil dideteksi",
            type: 'success',
          }).then((result) => {
              if (result.value) {
                return false;
              }
          });
          
          $("#link").css("visibility", "visible");
          $("#download").attr("href", "static/" + data);
          $("#download").click(function() {
            location.reload();
          });
          console.log(data);
        },
      });
    }
  });
};

function readUrl(input) {
  
  imagebox = $("#imagebox");
  console.log(imagebox);
  console.log("evoked readUrl");
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      console.log(e.target);

      imagebox.attr("src", e.target.result);
      //   imagebox.height(500);
      //   imagebox.width(800);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function validasiFile(){
  var inputFile = document.getElementById('imageinput');
  var pathFile = inputFile.value;
  var ekstensiOk = /(\.jpg|\.jpeg|\.png|\.gif|\.mp4|\.avi|\.mov|\.mkv)$/i;
  if(!ekstensiOk.exec(pathFile)){
    Swal.fire({
      title: 'Error',
      text: "Silakan upload file foto atau video saja",
      type: 'error',
    }).then((result) => {
        if (result.value) {
          location.reload();
        }
    });
    return false;
    
  }else{
      //Pratinjau gambar
      if (inputFile.files && inputFile.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
              document.getElementById('pratinjauGambar').innerHTML = '<img src="'+e.target.result+'" width="40%" />';
          };
          reader.readAsDataURL(inputFile.files[0]);
      }
  }
}