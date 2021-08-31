console.log("success connection to js");
showNotes();

// user adds a note
let Addbtn = document.getElementById("Addbtn");
Addbtn.addEventListener("click", function (e) {
  let AddTxt = document.getElementById("AddTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(AddTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  AddTxt.value = "";
  console.log(notesObj);
  showNotes();
});

//display notes

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `<div class="card m-2 border-primary notecard" style="width: 18rem;">

    <div class="card-body text-center">
        <h5 class="card-title text-primary"><i class="fa fa-sticky-note" aria-hidden="true"></i> NOTE 
        ${index + 1}</h5>
        <p class="card-text"> ${element}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-danger btn-group-sm">Delete Note</button>
    </div>
</div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

//delete
deleteNote = (index) => {
  console.log("i am delete", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
};

//search
search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();

  console.log("fired input event", inputVal);
  let noteCards = document.getElementsByClassName("notecard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    // console.log(cardTxt);
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
