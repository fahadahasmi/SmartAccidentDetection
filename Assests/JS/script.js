var latitude, longitude;
// check if geolocation is available
if ("geolocation" in navigator) {
    // get current position
    navigator.geolocation.getCurrentPosition(function(position) {
    // access latitude and longitude
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    
    });
} else {
    alert("Geolocation is not available.");
}


const btn = document.getElementById('btn')
const img = document.getElementById('img')
const modal = document.getElementById('id01')
const modalText = document.getElementById('modal-text')
const modalContainer = document.getElementById('modal-cont')
const dropArea = document.querySelector(".drag-area")
const button = document.querySelector("#button")
const filebutton = document.querySelector(".filebutton")
dragText = dropArea.querySelector("header")
input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

filebutton.onclick = (e)=>{
    input.click(); //if user click on the button then the input also clicked
}

btn.onclick = (e)=>{
    modal.style.display = "none";
}

button.onclick = (e)=>{
    console.log("button clicked"); 
    const formdata = new FormData();
    formdata.append("file", file);
    console.log(formdata);

    fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        body: formdata
    }).then(response => response.json())
    .then(result => {
        console.log('Success:', result.Prediction);
        modal.style.display = "flex";
        // alert(result.Prediction);
       
        if(result.Prediction  == "Accident"){
          modalText.innerText = result.Prediction + " has been detected.";
          btn.innerText = "Click Here to see the nearest hospitals.";
          btn.href = "http://127.0.0.1:5500/result.html?lat="+latitude+"&long="+longitude+"&result="+result.Prediction;
        }
        else{
          modalText.innerText = "Accident has not been detected.";
          btn.innerText = "Close";
        }
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});

function showFile(){
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  if(validExtensions.includes(fileType)){ //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; //passing user file source in fileURL variable
        // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
      let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
      dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
      img.src = fileURL;
    }
    fileReader.readAsDataURL(file);
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}


