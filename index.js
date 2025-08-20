const input = document.getElementById("searchInput");

document.getElementById("searchButton").addEventListener("click",async function(){
    console.log("Searching...");
    const input = document.getElementById("searchInput").value;
    
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${input}&hasImages=true`);
    const data = await response.json();

    console.log(data)
    
    const objectIDs = data.objectIDs;
    console.log("Object IDs:", objectIDs);


    if(!Array.isArray(objectIDs) || objectIDs.length === 0){
        console.log("no results found (objectIDs is missing or empty).")
        return;
    }

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    const firstTenIDs = objectIDs.slice(0, 10); //get the first 10

    for(let id of firstTenIDs){
        const detailResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        const detailData = await detailResponse.json();

        //Skip if no image
        if(!detailData.primaryImageSmall) continue;

        const card = document.createElement("div");
        card.className = "w-60 bg-neutral-800 text-white p-4 rounded";
      
        card.innerHTML = `
          <img src="${detailData.primaryImageSmall}" alt="${detailData.title}" class="w-full rounded mb-2">
          <h3 class="text-lg font-bold mb-1">${detailData.title}</h3>
          <p class="text-sm text-neutral-300">${detailData.artistDisplayName || "Unknown artist"}</p>
        `;
      
        resultsDiv.appendChild(card);
    };



});