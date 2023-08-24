
const accesKey="wx4noZ6rLJ1j6kQNqMv_ji-XRp4_IxC0gI1_m4d7-38";

let form = document.querySelector("form");

let inputSearch = document.getElementById("search-inp");

let buttonSearch = document.getElementById("btn-search");

let btnShowMore = document.getElementById("show-more");
 let containerResult = document.getElementById("resultContainer")
 let inputDate = "";
 let page = 1;
 if(form){
    async function searchImg(){
        inputDate =inputSearch.value;
        
        const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputDate}&client_id=${accesKey}`;
       let response = await fetch(url);
       let data =await response.json();
       let result=data.results
       console.log(data);
    if(containerResult.innerHTML == " "){
        result.map(ele=>{
            let resultBox= document.createElement('div');
            resultBox.classList.add("result-box")
            let img=document.createElement("img");
            img.src=ele.urls.small;
            resultBox.appendChild(img);
            containerResult.trim()
            containerResult.appendChild(resultBox)
           })
    }
    containerResult.innerHTML = '';
       result.map(ele=>{
        let resultBox= document.createElement('div');
        resultBox.classList.add("result-box")
        let img=document.createElement("img");
        img.src=ele.urls.small;
        resultBox.appendChild(img);
        containerResult.appendChild(resultBox);
        img.addEventListener("click",()=>{
            var url = 'singImg.html?param=' + encodeURIComponent(ele.id);
      
            // Redirect to the other page
            window.location.href = url;
        })
       })
    
       page++;
       if(page>1){
        btnShowMore.style.display="block"
       }
    
    }
    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        searchImg()
    })
    btnShowMore.addEventListener("click",()=>{
        searchImg()
    })
 }


// get single img using api 
let imgId= new URLSearchParams(window.location.search).get('param');
let img=document.getElementById("img");
let userImg=document.getElementById("userImg");
let  Username= document.getElementById("Username");
let views= document.getElementById("view")
console.log(imgId);
let updateAt=document.getElementById("updateAt")
const singleImgUrl=`https://api.unsplash.com/photos/${imgId}?client_id=${accesKey}`;
 async function getImg(){
    let response =await fetch(singleImgUrl);
     let data =await response.json();
     console.log(data);
     img.src=data.urls.small
    let desc= document.getElementById("desc");
    desc.innerHTML=`Decription :   <span class="green">${data.alt_description} </span>`;
    Username.innerHTML = data.user.name;
    userImg.src=data.user.profile_image.small
    views.innerHTML=`Views :  <span class="green">${data.views} </span>`;
    const d = new Date(`${data.updated_at}`);
    console.log(d);
    let year= d.getFullYear();
    let month=d.getMonth();
    let day=d.getDay()
    updateAt.innerHTML=`Update At :  <span class="green">${day}-${month}-${year}</span>`;
 }

 getImg()