const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();

  const tabContainer = document.getElementById("tab-container");

  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <a onclick = "handleLoadVideos('${category.category_id}')" class="tab btn normal-case text-[#252525B2;]  transition-colors focus:bg-[#FF1F3D] focus:text-white active:bg-[#FF1F3D] active:text-white">${category.category}</a>
      `;
    tabContainer.appendChild(div);
  });
};

const handleLoadVideos = async (categoryId) => {
  const response = await fetch(`
  https://openapi.programming-hero.com/api/videos/category/${categoryId}
  `);
  const data = await response.json();

  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = "";

  if (data.data.length === 0) {
    
    const noDataDiv = document.createElement("div");
    noDataDiv.className = "grid justify-center items-center h-full"; // Center horizontally and vertically
    noDataDiv.innerHTML = `
      <div class="text-center flex flex-col justify-center items-center h-full">
        <img class="mx-auto" src="./images/Icon.png" alt="No Data Found" /> 
        <div class="mt-4">
          <h2 class="text-4xl">Oops!! Sorry, There is no content here</h2>
        </div>
      </div>
    `;
  
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""; 
    cardContainer.appendChild(noDataDiv);
  }
  
   else {
    
    data.data.forEach((videos) => {
      console.log(videos);
      const div = document.createElement("div");
      div.className = "grid justify-center items-center";
      div.innerHTML = `
        <div class="card card-compact w-72 h-80 bg-base-100 shadow-xl mt-3">
          <figure><img class="h-52" src=${videos?.thumbnail} alt="" /></figure>
          <div class="card-body">
            <h2 class="card-title"><img class="w-10 h-10 rounded-full" src="${videos?.authors[0]?.profile_picture}" alt="">${videos?.title}</h2>
            <p class="pl-12 flex">${videos?.authors[0]?.profile_name}
            ${videos?.authors[0]?.verified ? '<img class="w-6 h-6 ml-2" src="./images/verified-icon.png" alt="Verified">' : ''}
            </p>
            <p class="pl-12">${videos?.others?.views}</p>
          </div>
        </div>
      `;
      cardContainer.appendChild(div);
    });
  }
};

handleCategory();

handleLoadVideos(1000);
