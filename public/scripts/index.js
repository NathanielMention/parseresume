//create var to access dom elements
const inpFile = document.getElementById("inpFile");
const btnUpload = document.getElementById("btnUpload");
const resultText = document.getElementById("resultText");
const resumeCardTemplate = document.querySelector("[data-resume-template]");
const resumeCardContainer = document.querySelector(
  "[data-resume-cards-container]"
);
const searchInput = document.querySelector("[data-search]");

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
  //use tolowercase to remove case sensitivity for search bar
  const value = e.target.value.toLowerCase();
  resumes.forEach((resume) => {
    const isVisible = resume.name.toLowerCase().includes(value);
    // hide resume if it doesnt contain key word
    resume.element.classList.toggle("hide", !isVisible);
  });
});

fetch("/resume", {
  method: "get",
})
  .then((res) => res.text())
  .then((data) => {
    resumes = data.map((resume) => {
      const card = resumeCardTemplate.content.cloneNode(true).children[0];
      const body = card.querySelector("[data-body]");
      body.textContent = resume.text;
      resumeCardContainer.append(card);
      return { body: resume.text, element: card };
    });
  });
