function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

/* THEME TOGGLE */
function toggleTheme() {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
}

/* Load theme on refresh */
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }
};

/* MODAL DATA */
const projectData = {
  youtube: {
    title: "YouTube Data Analysis Dashboard",
    desc: "Built a Power BI dashboard using SQL + DAX for YouTube analytics data.",
    points: [
      "Processed YouTube API export into relational SQL tables",
      "Created CTR, Engagement Rate, Retention metrics using DAX",
      "Developed interactive visuals for traffic sources and audience insights"
    ]
  },
  healthcare: {
    title: "Healthcare Analytics Dashboard",
    desc: "Power BI dashboard using 55K+ records for hospital and billing analytics.",
    points: [
      "Built KPIs: Total Patients, Total Billing, Avg Stay, Admission Type",
      "Created drillthrough pages for hospital and doctor analysis",
      "Used Power Query ETL for data cleaning and transformations"
    ]
  }
};

/* OPEN MODAL */
function openModal(projectKey) {
  const modal = document.getElementById("projectModal");
  const title = document.getElementById("modalTitle");
  const desc = document.getElementById("modalDesc");
  const list = document.getElementById("modalList");

  title.innerText = projectData[projectKey].title;
  desc.innerText = projectData[projectKey].desc;

  list.innerHTML = "";
  projectData[projectKey].points.forEach(point => {
    const li = document.createElement("li");
    li.innerText = point;
    list.appendChild(li);
  });

  modal.style.display = "block";
}

/* CLOSE MODAL */
function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

/* Close modal on outside click */
window.onclick = function(event) {
  const modal = document.getElementById("projectModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

/* CONTACT FORM -> SQL DATABASE API */
async function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const result = await response.json();

    if (response.ok) {
      alert("Message sent successfully!");
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    } else {
      alert("Error: " + result.error);
    }
  } catch (error) {
    alert("Server error! Please run backend.");
  }
}
