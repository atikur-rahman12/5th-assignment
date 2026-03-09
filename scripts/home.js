const createElement = (arr) => {
  const htmlElements = arr.map(
    (el) =>
      `<span class="bg-[#FDE68A] text-[#D97706] font-bold border-1 px-3 py-2 text-[10px] border-pink-300 rounded-full uppercase">${el}</span>`,
  );
  return htmlElements.join(" ");
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".issue-btn");
  lessonButtons.forEach((btn) => {
    btn.classList.remove("btn-active");
  });
};

const loadIssueDetail = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();

  displayIssueDetails(details.data);
};

// "id": 33,
// "title": "Add bulk operations support",
// "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
// "status": "open",
// "labels": [
// "enhancement"
// ],
// "priority": "low",
// "author": "bulk_barry",
// "assignee": "",
// "createdAt": "2024-02-02T10:00:00Z",
// "updatedAt": "2024-02-02T10:00:00Z"

const displayIssueDetails = (issue) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
          <div class="space-y-5">
            <h2 class="text-2xl font-bold">${issue.title}</h2>
            <div class="flex items-center gap-3">
              <span class="bg-[#00A96E] font-medium text-sm text-white px-4 py-1 rounded-full">${issue.status}</span>
              <span class="text-[#64748B] text-sm">•</span>
              <p class="text-[#64748B] text-sm">Opened by ${issue.author}</p>
              <span class="text-[#64748B] text-sm">•</span>
              <p class="text-[#64748B] text-sm">${issue.createdAt}</p>
            </div>

            <div>
              ${createElement(issue.labels)}
            </div>

            <p class="text-[#64748B]">${issue.description}</p>

            <div class="bg-gray-50 grid grid-cols-2 p-4">
              <div>
                <h3 class="text-[#64748B]">Assignee :</h3>
                <p class="font-semibold">${issue.assignee}</p>
              </div>

              <div>
                <h3 class="text-[#64748B]">Priority :</h3>
                <span class="bg-[#EF4444] text-white font-medium text-sm rounded-full px-4 py-1 uppercase">${issue.priority}</span>
              </div>
            </div>
          </div>
  `;
  document.getElementById("my_modal_5").showModal();
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
    let priorityBtn;

    // priority er style
    if (issue.priority === "high") {
      priorityBtn = "bg-[#FEECEC] text-[#EF4444] border-pink-200";
    } else if (issue.priority == "medium") {
      priorityBtn = "bg-[#FFF6D1] text-[#F59E0B] border-yellow-200";
    } else {
      priorityBtn = "bg-[#EEEFF2] text-[#9CA3AF] border-gray-200";
    }

    // status
    if (issue.status === "open") {
      statusImage = "./assets/Open-Status.png";
      borderColor = "border-t-[#00A96E]";
    } else {
      statusImage = "./assets/Closed-Status.png";
      borderColor = "border-t-[#A855F7]";
    }

    const card = document.createElement("div");
    card.innerHTML = `
        <div onclick="loadIssueDetail(${issue.id})"
          class="bg-white rounded-lg shadow-sm text-start border-t-4 ${borderColor} py-10 px-5 w-[280px] h-[100%]"
        >
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <img src="${statusImage}" alt="" />
              <button class="${priorityBtn} font-medium text-sm border-1 px-3 py-1 rounded-full w-[100px] uppercase">
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
