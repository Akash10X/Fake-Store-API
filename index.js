let show = document.getElementById('show-products');
let searchContainer = document.getElementById('search-container');
let productContainer = document.getElementById('product-container');
let suggest = document.querySelectorAll(".suggest")

let timeout
var i

function searchbar(searchbarID) {
  var searchBar = document.getElementById(searchbarID);
  var searchString = searchBar.value;
  searchProducts(searchString)
}

const apiURL = 'https://fakestoreapi.com/products';


async function getdata(){
  try{
    const res = await fetch(apiURL);
      const data = await res.json();
      displayProducts(data,show)
  }
  catch(err){
    console.log(err);
  }
}


async function searchProducts(searchString){
  let suggestContainer = document.getElementById('suggest-container');
  suggestContainer.style.display="none"
  const res = await fetch(apiURL);
  const data = await res.json();  
  const filterItems = data.filter((item) =>{
    return item.title.toLowerCase().includes(searchString.toLowerCase());
  });
  productContainer.remove()
  if(!filterItems.length){
    searchContainer.innerHTML=`
    <h3 class="title text-center d-none d-md-block" style="margin-top: 102px;">No Products Found!</h3>
    <h3 class="title text-center d-md-none" style="margin-top: 158px;">No Products Found!</h3>
    `
    return;
  }
  searchContainer.innerHTML=`
          <h3 class="title text-center" style="margin-top: 102px;">${searchString?`Showing Results For : ${searchString}`:"Random Products"}</h3>
          <div class="row mt-5 d-flex justify-content-center" id="searched-products"></div>`
  let search = document.getElementById('searched-products');
  displayProducts(filterItems,search)
}
      
      const displayProducts = (data,container) => {
        data.forEach((product) => {
          let { id, title, price, image } = product;
          container.innerHTML += `
          <section class="col-10 mx-3 col-md-6 mb-4 col-lg-3 border" role="button">
          
        <div class="d-none d-md-block container-fluid p-3 p-lg-4" id="product-id-${id}">
        <img src="${image}" alt="" width="250px" height="250px" class="w-100"/>
        </div>

        <div class="d-md-none container-fluid p-3 p-lg-4" id="product-id-${id}">
        <img src="${image}" alt="" height="350px" class="w-100"/>
        </div>
      
        <h6 class="text-capitalize text-center my-2 text-secondary">${title}</h6>
      <h6 class="text-center">
              <span class="">&#8377;${price}</span>
            </h6>
          </section>`
    })
}


function suggestProducts(searchString){

  if(timeout){
    clearTimeout(timeout);
  }


  if(searchString.id=="searchbarOne"){
    i = 0
  }
  else{
    i = 1
  }

  timeout = setTimeout(async ()=>{
  const res = await fetch(apiURL);
  const data = await res.json();  
  const filterItems = data.filter((item) =>{
    return item.title.toLowerCase().includes(searchString.value.toLowerCase());
  });

  suggest[i].innerHTML=`
  <div class="bg-dark" style="position:absolute; top:38px; left:0px; width:93%" id="suggest-container">
  <div class="list-group search-list"></div>
  </div>`

  
  let searchList = document.querySelectorAll('.search-list');

  filterItems.slice(0,5).forEach((item)=>{
    if(!searchList[i]){
      i=0
    }
    searchList[i].innerHTML+=`
    <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between list-group-item-light">${item.title}
    <img src="${item.image}" width="60px" height="60px" /></a>
    `
  })

},1000)
}



window.addEventListener('resize', ()=>{
  if(screen.width>766){
    show.click();
    suggest[1].style.display="none"
  }
  else{
    suggest[1].style.display="block"
  }
},false);


window.addEventListener("click",()=>{
  let suggestContainer = document.getElementById('suggest-container');
  if(suggestContainer){
    suggestContainer.style.display="none"
  }
})


document.addEventListener("DOMContentLoaded",()=>{
    getdata();
})
