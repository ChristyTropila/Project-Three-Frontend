
//get stable elements
navContainer=document.getElementById('top-container')
navBarSection=document.getElementById('nav-bar')
navBarUl=document.getElementById('nav-ul')
mainContainer=document.getElementById('main-container')
mainHeading=document.createElement('h2')
leftCard=document.createElement('div')
leftCard.className="card-info"
let mainObj={}
let globalNav=undefined
let cardDiv=""
let title=""
let descrip=""
let address=""
let url=""
let image =""

//create li for nav bar
//append to container
//create click event
fetch('http://localhost:5000/categories')
.then(resp => resp.json())
.then(categoryArray => {
    mainCategory(categoryArray[0])
    mainOb=categoryArray
     categoryArray.forEach((cat)=> {
         renderCategoryList(cat)
     })

    })

    //create category elements and append
 let renderCategoryList= (cat) => {
     navButton=document.createElement('li')
     navButton.innerText=cat.name
     navBarUl.append(navButton)
     globalNav=navButton
     navButton.addEventListener("click",(evt) => {
         mainCategory(cat)
           
         })
     }

 let mainCategory=(category) =>{
    mainContainer.innerHTML=""
    mainHeading.innerText=category.name
    mainContainer.append(mainHeading)
    title=document.createElement("h2")
          category.items.forEach(item => {
             mainContainer.HTML=""
             cardDiv=document.createElement('div')
            cardDiv.className="card"
             title=document.createElement("h4")
             descrip=document.createElement('p')
             address=document.createElement('p')
             url=document.createElement('a')
            url.setAttribute('href', item.url)
            url.textContent="Link To Source"
            url.target="_blank"
           image=document.createElement('img')
            image.className="image-top"
            image.src=item.image
            image.width=200
            image.height=250
            title.innerText=item.name
            descrip.innerText=item.description
            address.innerText=item.location
              cardDiv.append(image)
              mainContainer.append(cardDiv)
              cardDiv.append(title)
              mainContainer.append(cardDiv)
              cardDiv.append(descrip)
              mainContainer.append(cardDiv)
              cardDiv.append(address)
              mainContainer.append(cardDiv)
              cardDiv.append(url)
              mainContainer.append(cardDiv)

 })
}
 


        //  navButtons.addEventListener("click", (e) => {
        //      clickedItem=mainObj.id
        //      mainHeading.innerHTML=""
        //      mainHeading.innerText=clickedItem.name
        //      mainContainer.append(mainHeading)

        
        //      fetch('http://localhost:5000/items')
        //      .then(resp=>resp.json())
        //      .then(itemsArray=> {
        //         itemsArray.forEach(item => {
        //             if(clickedItem===item.category.id)
        //              itemName=document.createElement('h2')
        //             //  console.log(itemName)
        //              itemName.innerText=item.name
        //             //  console.log(itemName)
        //             })
                 
        //      })
            
        //  })
      
      
   

  
 

