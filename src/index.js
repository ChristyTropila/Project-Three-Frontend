
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
let itemId={}

let rightSide=document.createElement('div')
rightSide.id="side-bar"
let sideLabel=document.createElement('h2')
sideLabel.className="side-label"
let categName=document.createElement('h3')
categName.className="categ-name"

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
     navBarSection.append(navBarUl)
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
            itemId=item.id
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
        
        
              let button=document.createElement('span')
              button.innerText="Pin This Item!"
             cardDiv.append(button)
             cardDiv.addEventListener("click", (e) =>{
            //   console.log(button, item)
         renderForm(item)
             })
            })

            let renderForm=(item)=> {
               itemId=item.id
            mainContainer.innerHTML=""
                     let form=document.createElement('form')
                     form.className="form-container"
                     let heading=document.createElement('h3')
                     heading.innerText="Create New Collection"
                     let inputField=document.createElement('input')
                     inputField.placeholder="Name Your Collection"
                     inputField.type="text"
                     inputField.className="input"
                     let submitButton=document.createElement('BUTTON')
                     submitButton.className="btn"
                     submitButton.type="submit"
                     form.append(heading, inputField, submitButton)
                   
                    mainContainer.append(form)
                
             form.addEventListener("submit", (evt) => {
                 evt.preventDefault()
                 let name=document.querySelector('input').value
                
                 fetch('http://localhost:5000/collection_boards', {
                     method:'POST', 
                     headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                     },
                     body: JSON.stringify({
                         name: name,
                
                         item_id: itemId,
                         user_id: 1
                        
                     })
                     })
                     .then(resp => resp.json())
                     .then(collection => {
                         console.log(collection)
                        // let li=document.createElement('li')
                        // li.innerText=collection.name
                        //  rightSide.append(li)
                        //  mainContainer.append(rightSide)
                     })
                     

                 })
                }
                
            }
           

//     let renderForm=(item)=> {
//            mainContainer.innerHTML=""
//          let formDiv=document.createElement('div')
//          formDiv.className="form-popup"
//          let form=document.createElement('form')
//          form.className="form-container"
//          let heading=document.createElement('h3')
//          heading.innerText="Create New Collection"
//          let inputField=document.createElement('input')
//          inputField.placeholder="Name Your Collection"
//          inputField.type="text"
//          let submitButton=document.createElement('button')
//          submitButton.className="btn"
//          submitButton.type="submit"

//          formDiv.append(form)
//          formDiv.append(heading)
//          formDiv.append(inputField)
//          formDiv.append(submitButton)
//          mainContainer.append(formDiv)

//          submitButton.addEventListener("click",  (e) =>{
//            let userAnswer=document.querySelector('input').value
//         console.log(userAnswer)
//          console.log(formDiv, item)
//          console.log(item.id)
//          fetch('http://localhost:5000/collection_boards', {
//                  method: "POST",
//                  headers: {
//                             "Content-Type": "application/json",
//                             Accept: "application/json"
//                         },
//                          body: JSON.stringify({
//                              name: userAnswer,
//                              item_id: item.id
//                          })
//              })
//              .then(resp=>console.log(resp))
//              .then(collection_array => {
//                  mainContainer.innerHTML=""
//                  console.log(collection_array.name)
//                  let sideCard=document.createElement('div')
//                  let boardName=document.createElement('h2')
//                  boardName.innerText=collection_array.name
//                  sideCard.append(boardName)
//                  rightSide.append(sideCard)

//                  console.log(collection_array)
//              })
//             //     headers: {
//             //         "Content-Type": "application/json",
//             //         Accept: "application/json"
//             //     },
//             //     body: JSON.stringify({
//             //         name: userAnswer,
                    
//             //     })
//             //  })

            
//             })
//    }        
//  })
// }  
   
            

         
    //     })
    // })
 


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
      
      
   

  
 

