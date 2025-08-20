document.getElementById("searchButton").addEventListener("click", async function () {
    console.log("Searching...");
    const loading = document.getElementById("loadingMessage");
    loading.classList.remove("hidden");
  
    try {
      const input = document.getElementById("searchInput").value;
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${input}&hasImages=true`);
      const data = await response.json();
      console.log(data);
  
      const objectIDs = data.objectIDs;
      console.log("Object IDs:", objectIDs);
  
      if (!Array.isArray(objectIDs) || objectIDs.length === 0) {
        console.log("No results found.");
        return;
      }
  
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = "";
  
      const firstTwentyIDs = objectIDs.slice(0, 20);
  
      for (let id of firstTwentyIDs) {
        const detailResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        const detailData = await detailResponse.json();
  
        if (!detailData.primaryImage) continue;
  
        const card = document.createElement("div");
        card.className = "w-96 bg-neutral-800 text-white p-4 rounded";
  
        card.innerHTML = `
          <img src="${detailData.primaryImage}" alt="${detailData.title}" class="object-cover w-60 md:w-80 lg:w-96 rounded mb-2">
          <h3 class="text-lg font-bold mb-1">${detailData.title}</h3>
          <p class="text-sm text-neutral-300">${detailData.artistDisplayName || "Unknown artist"}</p>
        `;
  
        resultsDiv.appendChild(card);
      }
    } finally {
 
      loading.classList.add("hidden");
    }
  });
  