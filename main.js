//select element
let title = document.getElementById("titleInp")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit =document.getElementById("submit")
let search = document.getElementById("search")
let titleBtn =document.getElementById("titleBtn")
let categoryBtn =document.getElementById("categoryBtn")
let mode = "create"
let temp;
// //total

function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML =  result;
        total.style.backgroundColor= "green";
    }else{
        total.innerHTML = '';
        total.style.backgroundColor= "#a00d02";
    }
}


//create
let datapro = []

if(localStorage.product != null){
datapro =  JSON.parse(localStorage.product)
}
else{
    datapro = []
}



submit.onclick = function(){
    let data_object={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(title.value != ""&&
        price.value != "" 
        && category.value !="" 
        && count.value<1000){
    if(mode === "create"){
    if(data_object.count > 1){
        for(i=0;i<data_object.count;i++){
            datapro.push(data_object)
            clear()
        }
    }else{
        datapro.push(data_object)
        clear()
    }
    }else{
        datapro[temp] = data_object
        // console.log(datapro[temp])
        clear()
    }
}
    count.style.display= "block"
    submit.innerHTML = 'create'
    localStorage.setItem("product" ,JSON.stringify(datapro))
    
    readData()
    getTotal()
    
}

// airy=[1,2,3,4]
// airy[2] = 4 ;
// console.log(airy)


//clear
let clear = function(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML="";
    count.value = "";
    category.value = "";

};

//read
function readData(){
    let table = ""
    for(i = 0 ; i<datapro.length ; i++){
        table +=  `<tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="update(${i})">update</button></td>
                <td><button onclick="DeleteBtn(${i})">delete</button></td>
            </tr>`
    } 
    document.getElementById("tbody").innerHTML = table
    let deleteAll  =  document.getElementById("deleteAll")
    if(datapro.length > 0){
    deleteAll.innerHTML = `<button onclick="DeleteAll()" >Delete All (${datapro.length})</button>`
    
}
else{
        deleteAll.innerHTML = ""
    }

};
readData()


//Delete

DeleteBtn = function(i){
    datapro.splice(i,1)
    localStorage.product = JSON.stringify(datapro)
    readData()
}
//DeleteAll


    
DeleteAll = function(){
    datapro.splice(0)
    localStorage.clear()
    readData()
}

//update


function update(i){
    mode = "update"
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    ads.value = datapro[i].ads
    discount.value = datapro[i].discount
    category.value = datapro[i].category
    getTotal()
    count.style.display = "none"
    submit.innerHTML = "Update"
    temp = i
    scrollTo({
        top:0,
        behavior:'smooth',
    })

}

//search

let modesearch = 'titleBtn'

function getSearchBy(id){ 

if( id == "titleBtn"){
    search.placeholder = "Search By Title"
    modesearch = "title"
}else{
search.placeholder = "Search By Category"
modesearch = "category"
}
console.log(modesearch)
search.focus()
search.value = ""
readData()
}




function searchTG(value){
    let table = ""
    console.log(modesearch);
    
    if(modesearch=='title'){
        for(i=0; i<datapro.length;i++){
            if(datapro[i].title.includes(value.toLowerCase())){
        table +=  `<tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="update(${i})">update</button></td>
                <td><button onclick="DeleteBtn(${i})">delete</button></td>
            </tr>`
}
}
}
else{
        for(i=0; i<datapro.length;i++){
            if(datapro[i].category.includes(value.toLowerCase())){
        table +=  `<tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="update(${i})">update</button></td>
                <td><button onclick="DeleteBtn(${i})">delete</button></td>
            </tr>`
}
}
    
}
document.getElementById("tbody").innerHTML = table

}



let btnm = getElementById(`modescreanT`)

function btn_mode(){
btnm.classList.add('mode-screan-sun')
}
        // "mode-screan-dark"
        // "mode-screan-sun"
    // this.innerHTML = `<i class="fa-solid fa-sun">`











