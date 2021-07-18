let cardContainer = document.querySelector(".card-container");
let logout = document.querySelector(".logout");
const apiUrl = "http://localhost:8000";

logout.addEventListener("click", () => {
  localStorage.removeItem("jwt");
  location.href = "../first page/indexx.html";
});


const token = localStorage.getItem("jwt");

// let cardData = [
//   { heading: "heading2", content: "dhananjay", noteID: 2 },
//   { heading: "heading3", content: "dhananjay", noteID: 3 },
//   { heading: "heading4", content: "dhananjay", noteID: 4 },
//   { heading: "heading5", content: "dhananjay", noteID: 5 },
//   { heading: "heading6", content: "dhananjay", noteID: 6 },
// ];

let createNotes = (array) => {
  cardContainer.innerHTML="";
  array.forEach((element) => {
    let { heading, content, noteID } = element;
    let card = document.createElement("div");
    card.classList.add("card");
    card.id = noteID;
    let insideHtml = `<div class="card-header">
        <div class="card-heading">${heading}</div>
        <a href="../updatepage/indexx.html?noteID=${noteID}" >
        <div class="edit-note">
          <img src="edit-note.svg" />
        </div>
      </a>
      </div>
      <div class="card-content">
       ${content}
      </div>`;
    card.innerHTML = insideHtml;
    cardContainer.appendChild(card);
  });
};


if (token) {
  fetch(`${apiUrl}/note/getAllNotes`, {
    method: "POST",
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
        let cardData=data.data;
        createNotes(cardData);
    })
    .catch((err) => {
      alert("Error while fetching cards");
      console.log(err);
    });
}
else
{
  console.log("notoken found");
}

let addnote = document.querySelector(".new-note");
addnote.addEventListener("click", () => {
  location.href = "../createnote/indexx.html";
})


