//create var to access dom elements
const inpFile = document.getElementById("inpFile");
const btnUpload = document.getElementById("btnUpload");
const resultText = document.getElementById("resultText");
const resumeCardTemplate = document.querySelector("[data-resume-template]");
const resumeCardContainer = document.querySelector(
  "[data-user-resume-container]"
);
const searchInput = document.querySelector("[data-search]");
console.log(resumeCardContainer);
//handle upload event
btnUpload.addEventListener("click", () => {
  //build the data
  const formData = new FormData();
  //ref file resume inputs
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

//handle code for resume search bar
let resumes = [];

searchInput.addEventListener("input", (e) => {
  console.log(resumes);
  //use tolowercase to remove case sensitivity for search bar
  const value = e.target.value.toLowerCase();
  resumes.forEach((resume) => {
    const isVisible = resume.body.toLowerCase().includes(value);
    // hide resume if it doesnt contain key word
    resume.element.classList.toggle("hide", !isVisible);
  });
});

// get data back from server append to page
fetch("/search", {
  method: "get",
})
  .then((res) => res.json())
  .then((data) => {
    resumes = data.map((resume) => {
      const card = resumeCardTemplate.content.cloneNode(true).children[0];
      const body = card.querySelector("[data-body]");
      body.textContent = resume.text.type;
      resumeCardContainer.append(card);
      return { body: resume.text.type, element: card };
    });
  });
