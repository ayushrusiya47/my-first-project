const urlParams =new URLSearchParams(window.location.search);
const noteID=urlParams.get('noteID');

const updateNoteButton = document.querySelector(".update-note-button");
const apiUrl = "http://localhost:8000";
const token = localStorage.getItem("jwt");

updateNoteButton.addEventListener("click", () => {
  const content = document.querySelector(".update-note-input").value;
  const heading = document.querySelector(".update-note-heading").value;
  if (token) {
    fetch(`${apiUrl}/note/updateNote/${noteID}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ content, heading }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          location.href = "../dashboard/index.html";
        }
      })
      .catch((err) => {
        alert("Error while updating cards");
        console.log(err);
      });
  } else {
    console.log("Error while updating cards");
  }
});
