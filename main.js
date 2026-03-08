const setActiveBtn = (active) => {
  const allBtn = ["allBtn", "openBtn", "closedBtn"];
  allBtn.forEach(btn => {
    const btns = document.getElementById(btn);
    if (btn === active) {
      btns.classList.add("btn-primary")
      btns.classList.remove("btn-outline")
    } else {
      btns.classList.remove("btn-primary")
      btns.classList.add("btn-outline")
    }
  })
}

const creatHtmlElement = (arr) => {
  return arr.map(ele => {
    return `
      <div class="py-1 px-4 rounded-full flex items-center gap-2 
      ${ele === "bug"
        ? "bg-red-300 border-2 border-red-600"
        : ele === "enhancement"
          ? "bg-green-400 border-2 border-green-600"
          : "border-2 bg-yellow-200 border-yellow-500"}"> 
          ${ele === "bug" ? '<i class="fa-solid fa-virus-slash"></i>'
        : ele === "enhancement" ? ' <i i class="fa-solid fa-bahai" ></i>'
          : ele === "help wanted" ? '<i class="fa-solid fa-life-ring"></i>'
            : ele === "documentation" ? '<i class="fa-solid fa-file-lines"></i>'
              : ""
      }
        
        <h4 class="text-xs font-bold">${ele}</h4>

      </div>
    `
  }).join("")
}

const lodingSpinar = (status) => {
  const loding = document.getElementById("loding")
  const cardSection = document.getElementById("cardSection");
  if (status === true) {
    loding.classList.remove("hidden");
    cardSection.classList.add("hidden")
  } else {
    loding.classList.add("hidden");
    cardSection.classList.remove("hidden")
  }
}

const allIssuesApi = async () => {
  lodingSpinar(true)
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  const dataShow = await res.json()
  displayAllIssues(dataShow.data)


}

const openAllIssues = () => {
  lodingSpinar(true)
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const openData = data.data.filter(load => load.status === "open");
      displayAllIssues(openData);
    })

}

const closedAllIssues = () => {
  lodingSpinar(true)
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const closedData = data.data.filter(load => load.status === "closed");
      displayAllIssues(closedData);
    })

}

const displayAllIssues = (card) => {
  const cardSection = document.getElementById("cardSection");
  cardSection.innerHTML = ""

  const countNumber = document.getElementById("countNumber");

  countNumber.innerHTML = card.length


  card.forEach(element => {
    const divElement = document.createElement("div")
    divElement.innerHTML = `
    
      <div onclick="modalDataShow(${element.id})"
        class="p-4 bg-white h-full shadow-2xl rounded-xl border-t-2 ${element.priority === "low" ? " border-purple-500" : "border-green-500"} cursor-pointer hover:-translate-y-2 duration-300 space-y-2">

        <div class="flex items-center justify-between ব-">
              <div class="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center"> <img
                src="${element.priority === "low" ? './assets/Closed- Status .png' : './assets/Open-Status.png'}" alt=""></div>
                <div class="py-1 px-4 rounded-full ${element.priority === "high" ? "bg-red-300 border-2 border-red-600 text-red-700" : element.priority === "medium" ? "border-2 border-yellow-500 bg-yellow-200 text-yellow-500" : "bg-gray-200"}" >
                  <h3 class="font-bold">${element.priority}</h3>
                    </div >


                  </div >

          <div class=" space-y-3">
              <h2 class="text-xl font-bold">${element.title}</h2>
              <p class="text-sm text-neutral-500 font-bold line-clamp-2">${element.description}</p>

          <div class="flex items-center gap-3">
        ${creatHtmlElement(element.labels)}
          </div>


            <hr class="mt-4">
            <div>
             <h5 class="text-sm font-bold text-neutral-400"># by ${element.author}</h5>
           <p class="text-sm font-bold text-neutral-400"> ${new Date(element.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

</div >
  `


    cardSection.appendChild(divElement);
    lodingSpinar(false)

  });

}



const modalDataShow = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`

  const res = await fetch(url)
  const data = await res.json()



  modalDisplayData(data.data)

}

const modalDisplayData = (card) => {

  const modal = document.getElementById("my_modal_5")
  const modalContainer = document.getElementById('modalContainer');

  modalContainer.innerHTML = `
  
    <div class="space-y-3">

      <h3 class="text-xl font-bold">${card.title}</h3>

      <div class="flex items-center gap-2">
        <h4 class="px-4 py-1 rounded-full ${card.status === "open" ? "bg-green-500 text-white" : "bg-red-400 text-white"}">
          ${card.status}
        </h4>

        <span class=" text-neutral-500 font-bold">• Opened by ${card.author}</span>
        <span class=" font-semibold text-neutral-600">• ${new Date(card.updatedAt).toLocaleDateString()}</span>
      </div>

      <div class="flex items-center gap-3">
        ${creatHtmlElement(card.labels)}
      </div>

      <p>${card.description}</p>

      <div class="bg-gray-200 flex items-center gap-20 p-4 rounded-lg">

        <div>
          <h5 class="font-bold">Assignee:</h5>
          <h5 class="text-2xl font-bold">${card.author}</h5>
        </div>

        <div>
          <h5 class="font-bold mb-1">Priority</h5>
          <div class="py-1 px-4 text-xl rounded-full 
          ${card.priority === "high"
      ? "bg-red-300 border-2 border-red-600 text-red-700"
      : card.priority === "medium"
        ? "border-2 border-yellow-500 bg-yellow-200 text-yellow-500"
        : "bg-gray-200 border-2 border-black"}">
            ${card.priority}
          </div>
        </div>

      </div>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-primary">Close</button>
        </form>
      </div>

    </div>
  `

  modal.showModal()
}

document.getElementById("allBtn").addEventListener('click', () => {
  setActiveBtn("allBtn")
  allIssuesApi();
});


document.getElementById("openBtn").addEventListener("click", () => {
  setActiveBtn("openBtn");
  openAllIssues();
})

document.getElementById("closedBtn").addEventListener("click", () => {
  setActiveBtn("closedBtn");
  closedAllIssues();
})

allIssuesApi()

setActiveBtn("allBtn")