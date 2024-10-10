const loadBillionaires = async () => {
    const cardContainer = document.getElementById("card-container");

    // Show loading spinner
    cardContainer.innerHTML = `
        <div class="flex justify-center items-center">
            <span class="loading loading-bars loading-lg"></span>
        </div>
    `;

    try {
        const res = await fetch("https://forbes400.onrender.com/api/forbes400?limit=1000");
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await res.json();
        displayBillionaires(data);
    } catch (error) {
        console.error("Error loading billionaires:", error);
        cardContainer.innerHTML = "<p>Error loading data. Please try again later.</p>";
    }
};

const convertToBillions = (worth) => {
    return (worth / 1000).toFixed(2);
};

const showDetails = (position) => {
    const myModal = document.getElementById("my_modal");
    const content = document.getElementById("content");

    // Get the data associated with the clicked button
    const billionaireData = billionairesData.find(billionaire => billionaire.position == position);

    if (billionaireData) {
        content.innerHTML = `
            <img class="w-[200px] rounded-xl" src="${billionaireData.squareImage || "Not available"}" alt="${billionaireData.personName}" />
            <h1>${billionaireData.personName || "Not available"}</h1>
            <p><strong>Position:</strong> ${billionaireData.position || "Not available"}</p>
            <p><strong>Net Worth:</strong> $${convertToBillions(billionaireData.finalWorth)} Billion</p>
            <p class="text-gray-500"><strong class="text-black">Biography:</strong> ${billionaireData.bios || "Not available"}</p>
        `;
    } else {
        content.innerHTML = `<p>Details not available.</p>`;
    }
    
    myModal.showModal();
};

let billionairesData = []; // Declare a variable to store billionaire data globally

const displayBillionaires = (datas) => {
    billionairesData = datas; // Store the data globally
    const cardContainer = document.getElementById("card-container");

    cardContainer.innerHTML = ""; // Clear the container

    datas.forEach(data => {
        const netWorthInBillions = convertToBillions(data.finalWorth);
        const div = document.createElement("div"); 
        div.innerHTML = `
        <div class="card card-compact bg-base-100 w-96 shadow-xl ">
          <figure class="p-5 rounded-xl">
            <img class="rounded-xl w-[250px]" src="${data.squareImage || "Not available"}" alt="${data.personName}" />
          </figure>
          <div class="card-body">
            <h2 class="card-title text-gray-500 font-extrabold">Position: ${data.position}</h2>
            <h2 class="card-title font-extrabold text-2xl">${data.personName}</h2>
            <p class="text-xl text-gray-500 font-extrabold">Net-worth: $${netWorthInBillions} Billion</p>
            <p class="text-xl text-gray-500 font-extrabold">Source: ${data.source || "not available"} </p>
            <p class="text-xl text-gray-500 font-extrabold">Citizenship: ${data.countryOfCitizenship || data.countryOfCitizenship || "not available"} </p>
            <p class="text-xl text-gray-500 font-extrabold">State/City: ${data.state || data.city || "not available"} </p>


            <div class="card-actions justify-end">
              <button class="btn bg-yellow-400 font-extrabold" id="btn-${data.position}" onclick="showDetails('${data.position}')">Details</button>            
            </div>
          </div>
        </div>
        `;
        
        cardContainer.appendChild(div); 
    });
};

loadBillionaires();
