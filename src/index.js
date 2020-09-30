
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

let rightSide=document.getElementById('side-bar')
rightSide.style.display="none";


let mainObj={}
let mainCatg={}
let globalNav=undefined
let itemId={}
let globalCollectionId={}
let currentUser={}
let userCollections=[]


 let signUPAction=() => {
     mainContainer.id="main-container-3"
     body.className="login"
   let signUpPopup=document.createElement('div')
   signUpPopup.className="signup-form-popup"
   let signupForm=document.createElement('form')
   signupForm.className="form-container"
   signupForm.id="signup-form"
   let label=document.createElement('h2')
   label.innerText="Signup"
   let nameInput=document.createElement('input')
   nameInput.placeholder="Name"
   nameInput.name="name"
   nameInput.type="text"
   let usernameInput=document.createElement('input')
   usernameInput.placeholder="User Name"
   usernameInput.name="username"
   usernameInput.type="text"
   let createAcct=document.createElement("BUTTON")
   createAcct.type="submit"
   createAcct.class="btn"
   createAcct.innerText="Create Account!"
   
   signupForm.append(label, nameInput, usernameInput, createAcct)
   signUpPopup.append(signupForm)
   mainContainer.append(signUpPopup)


   signupForm.addEventListener("submit", (e) => {
        e.preventDefault()
       let getName=e.target.name.value
       let userName=e.target.username.value
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
             },
             body: JSON.stringify({
                 name: getName,
                 username:userName
             })
        })
        .then(resp=>resp.json())
        .then(response => {
           currentUser=response  
            if(response.id){
              startMainPage()
            }
        })
        
     })
 }
 signUPAction()



// when called, signup disappears and main page is rendered
 function startMainPage(){

    mainContainer.innerHTML=""
    

     body.className="main"
    mainContainer.id="main-container"
    //this will hide the collection board when the user first enters page
    let checkToSeeIfCollectionExist=()=>{
    fetch('http://localhost:5000/collection_boards')
    .then(resp=> resp.json())
    .then(collectionBoards => {
        if (collectionBoards.length===0) {
            rightSide.style.display="none"
        }else{
           rightSide.style.display="block"
        }

        displayCollection(collectionBoards)
    })

}    
checkToSeeIfCollectionExist()
}

   

//fetches the categories
let displayCollection=()=> {
     fetch('http://localhost:5000/categories')
    .then(resp => resp.json())
    .then(categoryArray => {
        
        //display the first category on the main section
        mainCategory(categoryArray[0])
        mainObj=categoryArray
        mainCatg= categoryArray[0]
        categoryArray.forEach((cat)=> {
            renderCategoryList(cat)
        
        })
        
        let sweater3=document.createElement('img')
        sweater3.src="styles/images/sweater1.png"
        sweater3.className="sweater-2"
        let sweaters=document.createElement('img')
        sweaters.src="styles/images/sweater2.png"
        let sweater2=document.createElement('img')
        sweater2.className="sweater"
        sweater2.src="styles/images/sweater3.png"
        navBarUl.append(sweaters, sweater2, sweater3)
        navBarSection(navBarUl)
        })

    //display categories in nav bar
    let renderCategoryList= (cat) => {
        mainCatg=cat
        navButton=document.createElement('li')
        navButton.innerText=cat.name
        navBarUl.append(navButton)
        navBarSection.append(navBarUl)
        globalNav=navButton
        navBarSection.append(navBarUl)
        navButton.addEventListener("click",(evt) => {
         mainCategory(cat)
         
         })
     }
    }
   
 //display items in main container
 let mainCategory=(category) =>{
  
        mainContainer.innerHTML=""
        title=document.createElement("h2")
            category.items.forEach(item => {
                itemId=item.id
                mainContainer.HTML=""
                let cardDiv=document.createElement('div')
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
                       seeIfCollectionIsEmpty(item)
               
             })
             
          })
     }

        //helper method to check if the user has any existing collections
        //fetch users
        //check to see if they have any collection boards
        //if they do create a form that that has a select options with each collection board

        let checkForExistingCollection=() => {
            fetch(`http://localhost:5000/users/${currentUser.id}`)
            .then(resp => resp.json())
            .then(userArray => {
               userArray.collection_boards.forEach((board)=> {
                 userCollections.push(board)
             let unique =userCollections.filter(function(item, pos){
                return userCollections.indexOf(item)===pos;
              } )
                return unique
                  
               })
        })
      
    }


    //toggles different forms 
    let seeIfCollectionIsEmpty=(item)=>{
        if(userCollections.length===0){
            renderForm(item)
        }else{
          renderSelectForm(item)
        }
    }




    //this form contains the select drop down and also option to create new name
    let renderSelectForm=(item) =>{
      //  itemId=item.id
        mainContainer.innerHTML=""
        let form=document.createElement('form')
        form.className="form-container"

        let heading=document.createElement('h3')
        heading.innerText="Choose A Collection"
        let submitButton=document.createElement('BUTTON')           
        submitButton.className="btn"
        submitButton.type="submit"
       submitButton.innerText="Create!"

        let newNameBtn=document.createElement('SPAN')
     
        newNameBtn.innerText="Create New Name!"

       let formSelect=document.createElement('SELECT')
    

       for(let i=0; i<userCollections.length; i++){
           let options=document.createElement('option')
          options.setAttribute("value",userCollections[i]["name"])
          value=document.createTextNode(userCollections[i]["name"])
          options.append(value)
          formSelect.insertBefore(options, formSelect.lastChild)
    
       
       }


       form.append( heading, formSelect, submitButton,newNameBtn)
       mainContainer.append(form)

       //new name button 
    newNameBtn.addEventListener("click", (evt) => {
        evt.preventDefault()
        itemId=item.id
        mainContainer.innerHTML=""
           renderForm(item)
            })

            //for submit
            form.addEventListener("submit", (evt) => {
             evt.preventDefault()

            let selectElement=document.querySelector('select')
            let name= selectElement.options[selectElement.selectedIndex].value

                fetch('http://localhost:5000/collection_boards', {
                    method:'POST',
                    headers: {
                       'Content-Type': 'application/json',
                       Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        item_id: itemId,
                        user_id: currentUser.id
                    })
                    })
                    .then(resp => resp.json())
                    .then(collection => {
                    
                        //place selected item in corresponding div
                 let newp=document.createElement('h5.categ-name')
                 newp.className="categ-name"
                let tags=document.querySelectorAll('h2.categ-name')
              
                    let searchText=name;
                    let found; 
                
                    console.log(searchText)
                    for(let i=0; i< tags.length; i++){
                        if(tags[i].textContent==searchText){
                            found=tags[i]
                      let selectedCard=found.parentNode
                      newp.innerText=item.name
                        selectedCard.append(newp)
                            break;
                        }
                    }
 
                
                   mainCategory(mainCatg)
            })
          
        })
         

        }







 //form to create a new collection_board
     let renderForm=(item)=> {
       mainContainer.innerHTML=""
    
      itemid=item
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
     
              
          //create collection board form
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
                         user_id: currentUser.id
                     })
                     })
                     .then(resp => resp.json())
                     .then(collection => {

                     if(collection.id){
                        userCollections.push(collection)
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
                            deleteButton.innerText="Remove"
                            buttonAndItem.append(deleteButton)
                            rightSide.append(buttonAndItem)

                            let updateButton=document.createElement("BUTTON")
                             updateButton.type="submit"
                             updateButton.innerHTML="Update Name"
                             buttonAndItem.append(updateButton)
                             rightSide.append(buttonAndItem)


                             let getCard=document.getElementsByClassName('card')
                              mainContainer.id="main-container-2"
                              rightSide.style.display="block"
                              getCard.className="card-2"

                               //delete collection baord
                            deleteButton.addEventListener('click', (evt) => {
                                 fetch(`http://localhost:5000/collection_boards/${collection.id}`, {
                                    method: 'DELETE'
                                })
                                buttonAndItem.remove()
                                userCollections.pop(collection)
                            
                           })

                    
//update collection name form 
    updateButton.addEventListener("click", (evt) => {
        evt.preventDefault()
        userCollections.pop(collection)
        globalCollectionId=collection.id
        mainContainer.innerHTML=""
        let updateform=document.createElement('form')
        
        updateform.className="form-container"
        let heading=document.createElement('h3')
        heading.innerText="Update Collection Name!"
        let inputField=document.createElement('input')
        inputField.placeholder="Update Collection Name"
        inputField.type="text"
                      
        let updateButton=document.createElement('BUTTON')           
        updateButton.className="btn"
        updateButton.type="submit"
        updateButton.innerText="Update!"
        updateform.append(heading, inputField, updateButton)
        mainContainer.append(updateform)
                             
        updateform.addEventListener("submit", (evt) => {
            evt.preventDefault()
            let newName=document.querySelector('input').value
            console.log(newName)
            fetch(`http://localhost:5000/collection_boards/${collection.id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
                },
                body: JSON.stringify({
                    name: newName,
                    id: collection.id,
                    item_id: renderItemId(collection)
                
        
            })

        })
                .then(resp => resp.json())
                .then(collection => {
                   userCollections.push(collection)
                mainCategory(mainObj[0])
                    sideLabel.innerText=collection.name
                })
    
              })

            })
          })
                        
     }
    })

})
                     
// }else{
    //renderSelectForm(item)


// }
     }

          //helper method to get item_id
            let renderItemId=(collection)=> {
                collection.items.forEach (item => {
                    item.id
                })



            }

 
                
    

      
   

  
 

