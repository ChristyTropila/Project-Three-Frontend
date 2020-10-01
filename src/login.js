

let giantItemsArray=[]
let collectionFormLogin=()=>{
  mainContainer.innerHTML=""

    fetch('http://localhost:5000/users')
    .then(resp=>resp.json())
    .then(userArray => {

    let collBoards;
      userArray.forEach((user) => {
          if(user.id===currentUser.id){
           collBoards=user.collection_boards
          }
      })

      collBoards.forEach((board)=> {
          console.log(board)
      
          userCollections.push(board)
        let sideCard=document.createElement('div')
            sideCard.id="side-bar"
            sideCard.className="container"
            let buttonAndItem=document.createElement('div')
            buttonAndItem.className="button-and-card"
       
            let sweater3=document.createElement('img')
            sweater3.src="styles/images/sweater3.png"
            sweater3.id="sweater3"
            buttonAndItem.append(sweater3)
            rightSide.append(buttonAndItem)
            let sideLabel=document.createElement('h2')
            sideLabel.className="categ-name"
            
            sideLabel.innerText=board.name
            buttonAndItem.append(sideLabel)
            rightSide.append(buttonAndItem)

            let deleteButton=document.createElement('BUTTON')
deleteButton.type="submit"
deleteButton.innerText="Remove"
deleteButton.className="deleteButton"
buttonAndItem.append(deleteButton)
rightSide.append(buttonAndItem)


let updateButton=document.createElement("BUTTON")
updateButton.type="submit"
updateButton.className="submitButton"
updateButton.innerHTML="Update Name"
buttonAndItem.append(updateButton)
rightSide.append(buttonAndItem)
let getCard=document.getElementsByClassName('card')
mainContainer.id="main-container-2"
rightSide.style.display="block"
getCard.className="card-2"
            

 
            findItemsInCollectionBoard(board.id)
     
             let delayed=()=>{
                for(let i=0; i<giantItemsArray.length; i++){
                    
                    let categName=document.createElement('h5')
                     categName.className="categ-name"
                     categName.innerHTML=giantItemsArray[i]
                     buttonAndItem.append(categName)
                     console.log("hello")
                    rightSide.append(buttonAndItem)
             }
            }

            setTimeout(delayed,100)
      

         
      })


let buttonsDelay=()=>{

let deleteButton=document.createElement('BUTTON')
deleteButton.type="submit"
deleteButton.innerText="Remove"
deleteButton.className="deleteButton"
buttonAndItem.append(deleteButton)
rightSide.append(buttonAndItem)


let updateButton=document.createElement("BUTTON")
updateButton.type="submit"
updateButton.className="submitButton"
updateButton.innerHTML="Update Name"
buttonAndItem.append(updateButton)
rightSide.append(buttonAndItem)
let getCard=document.getElementsByClassName('card')
mainContainer.id="main-container-2"
rightSide.style.display="block"
getCard.className="card-2"
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
}


      

setTimeout(buttonsDelay,300)
    })

    rightSide.style.display="block"
    mainContainer.id='main-container-2'
    body.className="main"
    startMainPage()
}


let findItemsInCollectionBoard=(id)=> {
    fetch(`http://localhost:5000/collection_boards/${id}`)
    .then(resp=>resp.json())
    .then((items)=> {
  
    giantItemsArray.push(items.items[0]["name"])
    return giantItemsArray

    })
  


}



     

        

    
            
        