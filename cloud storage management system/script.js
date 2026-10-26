
const nameInput = document.getElementById("fileName");
const typeInput = document.getElementById("fileType");
const addBtn = document.getElementById("addBtn");
const fileList = document.getElementById("fileList");
const total = document.getElementById("total");
const search = document.getElementById("search");
const message = document.getElementById("message");

let files = JSON.parse(
  localStorage.getItem("cloudFiles") || "[]"
);

function saveFiles() {
  localStorage.setItem("cloudFiles", JSON.stringify(files));
}

function displayFiles() {
  fileList.innerHTML = "";

  const query = search.value.toLowerCase();

  const filtered = files.filter(file =>
    (file.name + " " + file.type).toLowerCase().includes(query)
  );

  filtered.forEach(file => {
    const row = document.createElement("div");
    row.className = "file";

    const details = document.createElement("span");
    details.textContent = `📄 ${file.name} (${file.type})`;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      files = files.filter(item => item.id !== file.id);
      saveFiles();
      displayFiles();
      message.textContent = "File record deleted.";
    });

    row.append(details, deleteBtn);
    fileList.appendChild(row);
  });

  total.textContent = files.length;
}

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const type = typeInput.value.trim();

  if (!name || !type) {
    message.textContent = "Please enter both file name and type.";
    return;
  }

  files.push({
    id: Date.now().toString(),
    name,
    type
  });

  saveFiles();
  nameInput.value = "";
  typeInput.value = "";
  message.textContent = "File record added successfully!";
  displayFiles();
});

search.addEventListener("input", displayFiles);

displayFiles();
