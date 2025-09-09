// --- Load or Initialize Topics ---
let topics = JSON.parse(localStorage.getItem("topics")) || {
  "Topic 1": [
    { term: "Cat", definition: "A small domesticated animal" },
    { term: "Dog", definition: "A loyal four-legged pet" },
    { term: "Bird", definition: "An animal with feathers and wings" },
    { term: "Fish", definition: "An animal that lives in water" }
  ],
  "Topic 2": [
    { term: "Sun", definition: "The star at the center of our solar system" },
    { term: "Moon", definition: "Earth’s natural satellite" },
    { term: "Tree", definition: "A tall plant with trunk and leaves" },
    { term: "Rock", definition: "A solid piece of Earth’s crust" }
  ]
};

// --- Globals ---
let currentTopic = "";
let mode = "";
let questions = [];
let current = 0;
let correctAnswer = "";
let correctCount = 0;
let wrongCount = 0;

// --- Save helper ---
function saveTopics() {
  localStorage.setItem("topics", JSON.stringify(topics));
}

// --- Built-in topics (read-only) ---
const builtInTopics = ["Topic 1", "Topic 2"];

// --- Menu Functions ---
function startQuiz(selectedMode) {
  if (!currentTopic) {
    showToast("Please select a topic", "error");
    return;
  }

  mode = selectedMode;
  current = 0;
  questions = topics[currentTopic];
  correctCount = 0;
  wrongCount = 0;

  if (!questions || questions.length < 4) {
    showToast("You need at least 4 terms in this topic", "error");
    return;
  }

  document.getElementById("menu-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";

  showQuestion();
}

function backToMenu() {
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("editor-screen").style.display = "none";
  document.getElementById("menu-screen").style.display = "block";
  loadTopics();
}

// --- Quiz Functions ---
function showQuestion() {
  if (current >= questions.length) {
    // All questions done, show result
    showResult();
    return;
  }

  const container = document.getElementById("quiz-container");
  const q = questions[current];

  let questionText, answers;

  if (mode === "term-to-def") {
    questionText = `What is the definition of "${q.term}"?`;
    correctAnswer = q.definition;

    let pool = questions.map(item => item.definition).filter(def => def !== correctAnswer);
    let wrong = shuffle(pool).slice(0, 3);
    answers = shuffle([correctAnswer, ...wrong]);
  } else {
    questionText = `Which term matches this definition: "${q.definition}"?`;
    correctAnswer = q.term;

    let pool = questions.map(item => item.term).filter(term => term !== correctAnswer);
    let wrong = shuffle(pool).slice(0, 3);
    answers = shuffle([correctAnswer, ...wrong]);
  }

  container.innerHTML = `
    <h2>${questionText}</h2>
    ${answers.map(choice => `<button onclick="checkAnswer('${choice}')">${choice}</button>`).join("<br>")}
    <p>Question ${current + 1} of ${questions.length}</p>
  `;
}

function checkAnswer(selected) {
  if (selected === correctAnswer) {
    correctCount++;
    showToast("✅ Correct!", "success");
  } else {
    wrongCount++;
    showToast(`❌ Wrong! Correct: ${correctAnswer}`, "error");
  }

  current++;
  setTimeout(showQuestion, 1000);
}

function showResult() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = `
    <h2>Results for "${currentTopic}"</h2>
    <p>✅ Correct: ${correctCount}</p>
    <p>❌ Wrong: ${wrongCount}</p>
  `;

  if (wrongCount === 0) {
    container.innerHTML += `
      <p>🎉 Perfect! You answered all questions correctly!</p>
      <input id="emailInput" type="email" placeholder="Enter your email" style="padding:8px; width:80%; margin-top:10px;">
      <br><br>
      <button onclick="sendCompletionEmail()">Send Completion</button>
    `;
  }


}

function sendCompletionEmail() {
  const email = document.getElementById("emailInput").value.trim();
  if (!email) {
    showToast("Please enter a valid email", "error");
    return;
  }

  const subject = encodeURIComponent(`Finished topic "${currentTopic}"`);
  const body = encodeURIComponent(`I have finished the topic "${currentTopic}" successfully!`);

  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  showToast("Email client opened!", "success");
}

// --- Editor Functions ---
function saveMaterial() {
  const term = document.getElementById("termInput").value.trim();
  const def = document.getElementById("defInput").value.trim();

  if (!term || !def) {
    showToast("Please enter both term and definition", "error");
    return;
  }

  topics[currentTopic].push({ term, definition: def });
  saveTopics();

  document.getElementById("termInput").value = "";
  document.getElementById("defInput").value = "";

  showMaterialList();
}

function showMaterialList() {
  const list = document.getElementById("materialList");
  list.innerHTML = "";
  topics[currentTopic].forEach((q, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${q.term} → ${q.definition} 
      <button style="margin-left:10px;" onclick="deleteOne(${index})">❌ Delete</button>`;
    list.appendChild(li);
  });
}

// --- Delete Functions ---
function deleteAll() {
  if (confirm("Delete ALL terms in this topic?")) {
    topics[currentTopic] = [];
    saveTopics();
    showMaterialList();
  }
}

function deleteOne(index) {
  topics[currentTopic].splice(index, 1);
  saveTopics();
  showMaterialList();
}

// --- Toast Function ---
function showToast(message, type="success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "";
  toast.classList.add("show", type);
  setTimeout(() => {
    toast.classList.remove("show", type);
  }, 1500);
}

// --- Helper: Shuffle Array ---
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// --- Topic Functions ---
function loadTopics() {
  const topicSelect = document.getElementById("topicSelect");
  topicSelect.innerHTML = "";

  Object.keys(topics).forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    topicSelect.appendChild(option);
  });

  if (!currentTopic) currentTopic = Object.keys(topics)[0];
  topicSelect.value = currentTopic;
  changeTopic(topicSelect);
}

function changeTopic(select) {
  currentTopic = select.value;
  const editBtn = document.getElementById("editTopicBtn");
  const deleteBtn = document.getElementById("deleteTopicBtn");

  if (builtInTopics.includes(currentTopic)) {
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
  } else {
    editBtn.style.display = "inline-block";
    deleteBtn.style.display = "inline-block";
  }
}

// --- New Topic Modal Functions ---
function createNewTopic() {
  document.getElementById("newTopicInput").value = "";
  document.getElementById("newTopicModal").style.display = "block";
}

function closeNewTopicModal() {
  document.getElementById("newTopicModal").style.display = "none";
}

function confirmNewTopic() {
  const name = document.getElementById("newTopicInput").value.trim();
  if (!name) { showToast("Please enter a topic name", "error"); return; }
  if (topics[name]) { showToast("Topic already exists!", "error"); return; }

  topics[name] = [];
  saveTopics();
  loadTopics();
  currentTopic = name;
  document.getElementById("topicSelect").value = currentTopic;

  closeNewTopicModal();
  document.getElementById("menu-screen").style.display = "none";
  document.getElementById("editor-screen").style.display = "block";
  showMaterialList();
}

// --- Edit / Delete Topics ---
function editTopic() {
  const newName = prompt("Enter new name for this topic:", currentTopic);
  if (!newName) return;
  if (topics[newName]) { showToast("A topic with this name already exists!", "error"); return; }

  topics[newName] = topics[currentTopic];
  delete topics[currentTopic];
  currentTopic = newName;
  saveTopics();
  loadTopics();
  document.getElementById("topicSelect").value = currentTopic;
  changeTopic(document.getElementById("topicSelect"));
}

function deleteTopic() {
  if (!confirm(`Are you sure you want to delete the topic "${currentTopic}"?`)) return;
  delete topics[currentTopic];
  saveTopics();
  loadTopics();
  currentTopic = Object.keys(topics)[0];
  document.getElementById("topicSelect").value = currentTopic;
  changeTopic(document.getElementById("topicSelect"));
}

// --- Initialize ---
window.onload = () => { loadTopics(); };