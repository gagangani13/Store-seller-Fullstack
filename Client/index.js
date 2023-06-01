var addhere = document.getElementById('addHere')
var submitbtn = document.getElementById('submit')
submitbtn.addEventListener('click', store)
document.addEventListener('DOMContentLoaded', refresh)
async function refresh() {
    const response=await axios.get(`http://localhost:5000/`)
    const data=await response.data
    try {
        data.forEach(element => {
            createItems(element)    
        });
    } catch (error) {
        document.getElementById('resource').innerHTML += "<h3>Resources are empty!!</h3>"
    }
}
async function store(e) {
    e.preventDefault();
    const itemName = document.getElementById('itemname').value
    const description = document.getElementById('description').value
    const price = document.getElementById('price').value
    const quantity = document.getElementById('quantity').value
    const details = {
        itemName: itemName,
        description: description,
        price: price,
        quantity: quantity
    }
    const response=await axios.post('http://localhost:5000/postItems', details)
    const data=await response.data
    try {
        createItems(data)
        document.getElementById('itemname').value=''
        document.getElementById('description').value=''
        document.getElementById('price').value=''
        document.getElementById('quantity').value=''
        
    } catch (error) {
        alert(error.message)
    }
}
function createItems(data) {
    var li = document.createElement('li')
    li.appendChild(document.createTextNode(data.itemName + '--' + data.description + '--' + 'Rs.' + data.price + '--' + data.quantity))
    li.id = data.id
    addhere.appendChild(li)
    data.quantity>0 && buy1(li)
    data.quantity>1 && buy2(li)
    data.quantity>2 && buy3(li)
}
function buy1(li) {
    var b1 = document.createElement('button')
    b1.appendChild(document.createTextNode('BUY1'))
    b1.className = "btn btn-dark"
    li.appendChild(b1)
    b1.addEventListener('click', (e)=>{
        stock(e,1)
    })
}
function buy2(li) {
    var b2 = document.createElement('button')
    b2.appendChild(document.createTextNode('BUY2'))
    b2.className = "btn btn-dark"
    li.appendChild(b2)
    b2.addEventListener('click', (e)=>{
        stock(e,2)
    })
}
function buy3(li) {
    var b3 = document.createElement('button')
    b3.appendChild(document.createTextNode('BUY3'))
    b3.className = "btn btn-dark"
    li.appendChild(b3)
    b3.addEventListener('click', (e)=>{
        stock(e,3)
    })
}
async function stock(e,params) {
    var locate = e.target.parentElement
    const response=await axios.patch(`http://localhost:5000/removeItems/${locate.id}`,{count:params})
    const data=await response.data
        try {
            if (data.length===0){
                addhere.removeChild(locate)
            }else{
                addhere.removeChild(locate)
                createItems(data)
            }
        } catch (error) {
            document.getElementById('resource').innerHTML += '<h3>Resources are Empty!!</h3>'   
        }
}
