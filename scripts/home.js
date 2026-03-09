const createElement = (arr) => {
  const htmlElements = arr.map(
    (el) =>
      `<span class="btn btn-soft btn-secondary border-2 text-[10px] border-pink-300 rounded-full">${el}</span>`,
  );
  return htmlElements.join(" ");
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".issue-btn");
  lessonButtons.forEach((btn) => {
    btn.classList.remove("btn-active");
  });
};

const loadIssues = (tab = "all") => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`issue-btn-${tab}`);
      if (clickBtn) {
        clickBtn.classList.add("btn-active");
      }

      let issues = data.data;

      if (tab === "open") {
        issues = issues.filter((issue) => issue.status === "open");
      } else if (tab === "closed") {
        issues = issues.filter((issue) => issue.status === "closed");
      }

      document.getElementById("issue-count").innerText = issues.length;

      displayIssues(issues);
    });
};

const displayIssues = (issues) => {
  const issueContainer = document.getElementById("issue-container");
  issueContainer.innerHTML = "";

  issues.forEach((issue) => {
    let statusImage;
    let borderColor;

    if (issue.status === "open") {
      statusImage = "./assets/Open-Status.png";
      borderColor = "border-t-[#00A96E]";
    } else {
      statusImage = "./assets/Closed-Status.png";
      borderColor = "border-t-[#A855F7]";
    }

    const card = document.createElement("div");
    card.innerHTML = `
        <div
          class="bg-white rounded-lg shadow-sm text-start border-t-4 ${borderColor} py-10 px-5 w-[280px] h-[100%]"
        >
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <img src="${statusImage}" alt="" />
              <button class="btn btn-soft btn-secondary border-1 border-pink-100 rounded-full w-[100px] uppercase">
                ${issue.priority}
              </button>
            </div>

            <h2 class="font-semibold">${issue.title}</h2>
            <p class="text-[#64748B] text-sm">
              ${issue.description}
            </p>

            <div>${createElement(issue.labels)}</div>

            <hr class="-mx-5 mt-10 mb-5 border-gray-300" />
            <p class="text-[#64748B] text-sm">${issue.author}</p>
            <p class="text-[#64748B] text-sm">${issue.createdAt}</p>
          </div>
        </div>
        `;
    issueContainer.appendChild(card);
  });
};

loadIssues();
