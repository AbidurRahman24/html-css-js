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
    CategoryContainer.innerHTML = '';
    data.forEach((cate) => {
        // console.log(cate);
        const catMenu = document.createElement("div");
        catMenu.innerHTML = `
            <li class="nav-item btn btn-dark m-2">
            <a class="nav-link text-white" href="#" onclick="displayProduct('${cate.category_id}')">${cate.category}</a>
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
        if (id === '1005' || id != id) {
            display404Data();
        } else {
            displayProductDetails(data.data);
        }
    } catch {
        (err) => {
            console.log(err);
        };
    }
};

displayProduct(1000)
const displayProductDetails = (productList) => {

    const displayContainer = document.getElementById("displayContainer");
    displayContainer.innerHTML = '';

    function formatDuration(seconds) {
        const formattedTime = new Date(seconds * 1000).toISOString().substr(11, 8);
        return formattedTime;
    }
    
    for (const product of productList) {
        // console.log(product);
        const cardHtml = `
                    <div class="col-md-3 col-sm-12 mx-auto my-2">
                        <div class="card h-100 " style="width: 17rem;">
                            <img src="${product.thumbnail}" class="card-img-top" style="width: 100%; height: 250px; object-fit: cover;" alt="${product.title}">
                            <div class="card-body">
                                <div class="d-flex align-items-center">
                                    <img src="${product.authors[0].profile_picture}" style="width: 100px; height: 100px; padding:10px;" class="rounded-circle" alt="${product.authors[0].profile_name}">
                                    <div class="card-img-overlay ">
                                    <div class="d-flex" >
                                        <h5 class="card-title text-white bg-dark" style="display: inline; margin-right: 5px; align-self: flex-end;">${product.others.posted_date !== '' ? formatDuration(product.others.posted_date) : ''}</h5>
                                    </div>
                                    </div>
                                    <div>
                                    
                                        <h5 class="card-title">${product.title}</h5>
                                        <div class="d-flex">
                                            <p class="card-text">${product.authors[0].profile_name}</p>
                                            <p class=" px-3">${product.authors[0].verified ? '<i class="fa-solid fa-circle-check" style="color: #0088ff;"></i>' : ''}</p>
                                        </div>
                                        <p class="card-text">${product.others.views}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = cardHtml;
        displayContainer.appendChild(tempContainer.firstElementChild);
    }
};
// 404 page
const display404Data =(productList) =>{
    console.log(productList);
    const displayContainer = document.getElementById("displayContainer");

    const card = document.createElement("div");
    card.innerHTML = `
            <div class="d-flex align-items-center justify-content-center" style="height: 80vh;">
            <div class="mx-auto text-center" style="width: 10rem;">
                <img src="./static/Icon.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Oops!! Sorry, There is no content here</h5>
                </div>
            </div>
        </div>

    `
    displayContainer.appendChild(card);
};

const sortByViewsLink = document.getElementById('sortByViews');
sortByViewsLink.addEventListener('click', async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`);
    const data = await response.json();
        // console.log(data.data );
        const convertedData = data.data.map(item => {
            // console.log(item);
            const views = parseFloat(item.others.views.replace('k', '')) *1000 ;
            return { ...item, others: { ...item.others, views } };
        });
        const sortedData = convertedData.sort((a, b) => b.others.views - a.others.views);

        displayProductDetails(sortedData);
});