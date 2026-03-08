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


const allIssuesApi = async () => {

  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  const dataShow = await res.json()
  displayAllIssues(dataShow.data)


}

const displayAllIssues = (card) => {
  const cardSection = document.getElementById("cardSection");
  cardSection.innerHTML = ""

  card.forEach(element => {
    const divElement = document.createElement("div")
    divElement.innerHTML = `
    
      <div
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

    cardSection.appendChild(divElement)

  });

}

allIssuesApi()