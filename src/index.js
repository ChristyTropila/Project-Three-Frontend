
//get stable elements
let navContainer=document.getElementById('top-container')
let navBarSection=document.getElementById('nav-bar')
let navBarUl=document.getElementById('nav-ul')
let mainContainer=document.getElementById('main-container')

let body=document.querySelector('body')
let mainHeading=document.createElement('h2')
mainHeading.className="side-label"
let leftCard=document.createElement('div')
leftCard.className="card-info"
let mainObj={}
let globalNav=undefined
let itemId={}
let rightSide=document.getElementById('side-bar')
 
let loginPopup=document.getElementsByClassName('login-form-popup')
let signupPopup=document.getElementsByClassName('signup-form-popup')
let loginForm=document.getElementById('login-form')
let signupForm=document.getElementById('signup-form')
let loginBtn=document.getElementById('login-submit')
let signupBtn=document.getElementById('signup-submit')

// // html.append(loginPopup, signupPopup)

// loginPopup.hide()
//  let signUPAction=() => {
//      signupForm.addEventListener("submit", (e) => {
//         e.preventDefault()
//        let getName=e.target.name.value
//        let userName=e.target.username.value
//         fetch('http://localhost:5000/users', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: 'application/json'
//              },
//              body: JSON.stringify({
//                  name: getName,
//                  username:userName
//              })
//         })
//         e.target.reset() 
        
//      })
//  }
//  signUPAction()








//create li for nav bar
//append to container
//create click event
fetch('http://localhost:5000/categories')
.then(resp => resp.json())
.then(categoryArray => {
    
    mainCategory(categoryArray[0])
    mainObj=categoryArray
     categoryArray.forEach((cat)=> {
         renderCategoryList(cat)
     
     })

    })

    let getCollectionNames=() => {
        fetch('http://localhost:5000/collection_boards')
        .then(resp=>resp.json())
        .then(collections => {
                collections.forEach(collect => {
                    
                })
      
        })
    }

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

   
     //display item in main container
 let mainCategory=(category) =>{
    mainContainer.innerHTML=""

    // mainHeading.innerText=category.name
    // mainContainer.append(mainHeading)
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
            url.textContent="Website Link"
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
                            
                    renderForm(item)
             })
            })



            //form to create a new collection_board
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
  
         let submitButton=document.createElement('BUTTON')           
           submitButton.className="btn"
          submitButton.type="submit"
         submitButton.innerText="Create!"
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
                      let sideCard=document.createElement('div')
                      sideCard.id="side-bar"
                      sideCard.className="container"
                      let buttonAndItem=document.createElement('div')
                      buttonAndItem.className="button-and-card"
       
                    
                         mainCategory(mainObj[0])
                         let sideLabel=document.createElement('h2')
                         sideLabel.className="categ-name"
                        
                        sideLabel.innerText=collection.name
                        buttonAndItem.append(sideLabel)
                         rightSide.append(buttonAndItem)
                      
                         item.collection_board_id=collection.id
                      collection.items.forEach(item => {
                        let categName=document.createElement('h5')
                        categName.className="categ-name"
                         
                            categName.innerText=item.name
                            buttonAndItem.append(categName)

                            rightSide.append(buttonAndItem)
                            let deleteButton=document.createElement('BUTTON')
                            deleteButton.type="submit"
                            deleteButton.innerText="REMOVE"
                            buttonAndItem.append(deleteButton)
                            rightSide.append(buttonAndItem)
                          
                           
                            deleteButton.addEventListener('click', (evt) => {
                                 fetch(`http://localhost:5000/collection_boards/${collection.id}`, {
                                    method: 'DELETE'
                                })
                                buttonAndItem.remove()
                           })
                       
                
               })
          })
                        
     })
                     

 }
 }
    
                
            

      
   

  
 

