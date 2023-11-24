const loadCategory = () => {
    fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    )
        .then((res) => res.json())
        .then((data) => displayData(data.data));
}
const displayData = data => {
    // console.log(data);
    const CategoryContainer = document.getElementById("CategoryContainer");
    data.forEach((cate) => {
        // console.log(cate);
        const catMenu = document.createElement("div");
        catMenu.innerHTML = `
            <li class="nav-item ">
            <a class="nav-link active" href="#" onclick="event.preventDefault(); displayProduct('${cate.category_id}')">${cate.category}</a>
            </li>
        
        `;
        CategoryContainer.appendChild(catMenu);
    })
}
loadCategory()

// product load

const displayProduct = async (id) => {
    // console.log(id);
    try {
        const response = await fetch(
            `https://openapi.programming-hero.com/api/videos/category/${id}`
        );
        const data = await response.json();
        displayProductDetails(data.data);
    } catch {
        (err) => {
            console.log(err);
        };
    }
};

const displayProductDetails = (productList) => {
    // Assuming productList is an array of product data objects
    // console.log(productList);

    const displayContainer = document.getElementById("displayContainer");
    function formatDuration(seconds) {
        const formattedTime = new Date(seconds * 1000).toISOString().substr(11, 8);
        return formattedTime;
    }
    // Loop through each product in the productList
    for (const product of productList) {
        console.log(product);
        const cardHtml = `
        
    <div class="col-md-3 my-2">
        <div class="card h-100 " style="width: 17rem;">
            <img src="${product.thumbnail}" class="card-img-top" style="width: 100%; height: 250px; object-fit: cover;" alt="${product.title}">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <img src="${product.authors[0].profile_picture}" style="width: 100px; height: 100px; padding:10px;" class="rounded-circle" alt="${product.authors[0].profile_name}">
                    
                    <div>
                    <h5 class="card-title">${product.others.posted_date !== '' ? formatDuration(product.others.posted_date) : ''}</h5>
                        <h5 class="card-title">${product.title}</h5>
                        <div class="d-flex>
                            <p class="card-text">${product.authors[0].profile_name}</p>
                            <p>${product.authors[0].verified ? '<i class="fa-solid fa-circle-check" style="color: #0088ff;"></i>' : ''}</p>
                        </div>
                        <p class="card-text">${product.others.views}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

        `;

        // Create a temporary container element to convert the HTML string to DOM elements
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = cardHtml;

        // Append the card to the displayContainer
        displayContainer.appendChild(tempContainer.firstElementChild);
    }
};


// sort function

// const sortByViews = async (id) => {
//     // console.log(id);
//     try {
//         const response = await fetch(
//             `https://openapi.programming-hero.com/api/videos/category/${id}`
//         );
//         const data = await response.json();
//         displayProductDetails(data.data);
//     } catch {
//         (err) => {
//             console.log(err);
//         };
//     }
// };
// function sortByViews() {
    
//     jsonData.data.sort((a, b) => {
//       const viewsA = parseInt(a.others.views.replace('K', '')); // Convert views to a comparable number
//       const viewsB = parseInt(b.others.views.replace('K', ''));

//       return viewsB - viewsA; // Sort in descending order
//     });

//     // Display or manipulate the sorted data as needed
//     console.log(jsonData.data);
//   }

//   // Add an event listener to the "Sort By View" link
//   document.getElementById('sortByViews').addEventListener('click', sortByViews);

//   // Initial display of the unsorted data
//   console.log(jsonData.data);