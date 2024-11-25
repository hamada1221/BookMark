var inputName = document.getElementById("Name");
var inputURL = document.getElementById("URL");
var addBtn = document.getElementById("addBtn");
var tablebody = document.getElementById("tablebody");


var bookMarks;
var mainIndex = 0;

if (localStorage.getItem("bookMarks") == null) {
  bookMarks = [];
} else {
  bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
  display(bookMarks);
}

//////////////////// regex ///////////////////////

var regexName = /^[A-Za-z_]{1,}$/
function isNameValid() {
  if (regexName.test(inputName.value)) {
    return true;
  } else {
    return false;
  }
}


var regexUrl = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/

function isUrlValid() {
  if (regexUrl.test(inputURL.value)) {
    return true;
  } else {
    return false;
  }
}


inputName.onkeyup = function () {
  if (isUrlValid() && isNameValid()) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.disabled = "true";
  }
}

inputURL.onkeyup = function () {
  if (isUrlValid() && isNameValid()) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.disabled = "true";
  }
}


addBtn.onclick = function () {
  if (addBtn.innerHTML == "Update") {
    addBtn.innerHTML = "Submit";
    var bookMark = {
      name: inputName.value,
      url: inputURL.value
    };
    bookMarks.splice(mainIndex, 1, bookMark);
  }
  else {

    var bookMark = {
      name: inputName.value,
      url: inputURL.value
    };
    bookMarks.push(bookMark);
  }

  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  display(bookMarks);
  clearData();
}


function display(anyArray) {
  var box = ``;
  for (i = 0; i < anyArray.length; i++) {
    box += `
      <tr>
      <td>${i + 1}</td>
      <td>${anyArray[i].name}</td>
      <td><a href="${anyArray[i].url}"><button class="btn btn-success">Visit</button></a></td>
      <td><button onclick="updateBook(${i})" class="btn btn-warning">Update</button></td>
      <td><button onclick="deleteBook(${i})" class="btn btn-danger">Delete</button></td>
      </tr>
    `
  }
  tablebody.innerHTML = box;
  // clearData();
}


function deleteBook(index) {
  bookMarks.splice(index, 1)
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  display(bookMarks);
}

function clearData() {
  inputName.value = "";
  inputURL.value = "";
}

function updateBook(index) {
  inputName.value = bookMarks[index].name;
  inputURL.value = bookMarks[index].url;
  addBtn.innerHTML = "Update";
  mainIndex = index;
}

function search(row) {
  var wantedBook = [];
  for (var i = 0; i < bookMarks.length; i++) {
    if (bookMarks[i].name.toLowerCase().includes(row)) {
      wantedBook.push(bookMarks[i]);
    }
  }
  display(wantedBook);

}

