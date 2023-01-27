//create var to access dom elements
const inpFile = document.getElementById("inpFile");
const btnUpload = document.getElementById("btnUpload");
const resultText = document.getElementById("resultText");

//handle upload event
btnUpload.addEventListener("click", () => {
  //build the data
  const formData = new FormData();
  //ref file user inputs
  formData.append("pdfFile", inpFile.files[0]);
  //send data to server
  fetch("/extract-text", {
    method: "post",
    body: formData,
  })
    .then((response) => {
      //once text comes back from server
      return response.text();
    })
    .then((extractedText) => {
      //place text in text area
      resultText.value = extractedText;
    });
});
