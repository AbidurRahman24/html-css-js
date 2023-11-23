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

    // Loop through each product in the productList
    for (const product of productList) {
        console.log(product.others.views);
        const cardHtml = `
        
    <div class="col-md-4">
        <div class="card" style="width: 18rem;">
            <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <img src="${product.authors[0].profile_picture}" style="width: 50px; height: 50px;" class="rounded-circle" alt="${product.authors[0].profile_name}">
                    <div>
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.authors[0].profile_name}</p>
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
