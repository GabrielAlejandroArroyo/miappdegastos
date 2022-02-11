const form = document.getElementById("transactionForm");
form.addEventListener("submit",function(event){
/*             console.log(event);
    alert("Se detecto un envio del formulario"); */
    event.preventDefault();
    
    // console.log("No se envio" + event);
    let transactioFormdata = new FormData(form);
    let transactionObj = converFormDataToTansactionObj(transactioFormdata);
    console.log(transactionObj);
    saveTransactionObj(transactionObj);
    insertRowInTransactiontable(transactionObj);
    form.reset();

/*             let transactionTableRef = document.getElementById("tansactionTable");
    let newTransactionRowRef = transactionTableRef.insertRow(-1); */

/*             let newTypeCellRef = newTransactionRowRef.insertCell(0);
    newTypeCellRef.textContent = transactioFormdata.get("transactioType");

    newTypeCellRef = newTransactionRowRef.insertCell(1);
    newTypeCellRef.textContent = transactioFormdata.get("descriptionType");

    newTypeCellRef = newTransactionRowRef.insertCell(2);
    newTypeCellRef.textContent = transactioFormdata.get("amountType");

    newTypeCellRef = newTransactionRowRef.insertCell(3);
    newTypeCellRef.textContent = transactioFormdata.get("categoryType");
*/
/*             transactioFormdata.get("descriptionType");
    transactioFormdata.get("amountType");
    transactioFormdata.get("categoryType");
    transactioFormdata.get("transactioType"); */

})

document.addEventListener("DOMContentLoaded", function(event) {
    draw_category();
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData")) || [];
    transactionObjArr.forEach(
        function(arrayElement){
            console.log(arrayElement);
            insertRowInTransactiontable(arrayElement);
        }
    );
/*             insertRowInTransactiontable(transactionObjArr[0]);
    insertRowInTransactiontable(transactionObjArr[1]); */
})


function insertRowInTransactiontable(transactionObj){
    let transactionTableRef = document.getElementById("tansactionTable");


    let newTransactionRowRef = transactionTableRef.insertRow(-1);
    newTransactionRowRef.setAttribute("data-transaction-id", transactionObj["transactioId"]);

    let newTypeCellRef = newTransactionRowRef.insertCell(0);
    newTypeCellRef.textContent =transactionObj["transactionType"];

    newTypeCellRef = newTransactionRowRef.insertCell(1);
    newTypeCellRef.textContent = transactionObj["descriptionType"];

    newTypeCellRef = newTransactionRowRef.insertCell(2);
    newTypeCellRef.textContent = transactionObj["amountType"];

    newTypeCellRef = newTransactionRowRef.insertCell(3);
    newTypeCellRef.textContent = transactionObj["categoryType"];            

    newDeleteCell = newTransactionRowRef.insertCell(4);
    let deleteButton = document.createElement("button");
    deleteButton.textContent="Eliminar";
    newDeleteCell.appendChild(deleteButton);
    //newDeleteCell.textContent = transactionObj["categoryType"];  

    // Evento de click en boton eliminar menos L-Gante
    deleteButton.addEventListener("click", (event) => {
        let transactionRow = event.target.parentNode.parentNode
        let transactionId = transactionRow.getAttribute("data-transaction-id");
        //console.log(transactionRow.getAttribute("data-transaction-id"));
        
        //console.log(event);
        //console.log(event.target.parentNode.parentNode.remove());
        
        
        //event.target.parentNode.parentNode.remove()
        transactionRow.remove();
        
        //alert("Se presiono eliminar");
        deleteTransactionObj(transactionId);
    });



}

function getNewTransactionId(){
    let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
    let newTransactionId = JSON.parse(lastTransactionId) + 1 ;
    localStorage.setItem("lastTransactionId",JSON.stringify(newTransactionId));
    return newTransactionId;

}

function converFormDataToTansactionObj (transactioFormdata){
    let transactionType = transactioFormdata.get("transactionType");
    let descriptionType =transactioFormdata.get("descriptionType");
    let amountType =transactioFormdata.get("amountType");
    let categoryType =transactioFormdata.get("categoryType");
    let transactioId = 1; 
    return{
        "transactionType":transactionType ,
        "descriptionType": descriptionType,
        "amountType": amountType,
        "categoryType": categoryType,
        "transactioId" :  getNewTransactionId()
    }  
}

function saveTransactionObj(transactionObj){
    // Si en el local storage no hay datos o sea es null , inicializo el array con || []
    let mytransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
    mytransactionArray.push(transactionObj);
    //Convierto mi array de transaccion a JSON
    let transactionArrayJSON = JSON.stringify(mytransactionArray);
    //Guardo mi array de transaccion en formato JSON en el local storage
    localStorage.setItem("transactionData", transactionArrayJSON);
}


function deleteTransactionObj(transactionId){
    //debugger
    //Obtengo las transacciones de mi base de datos (Desconvierto de JSON a Obj)
    let transactionObjArray = JSON.parse(localStorage.getItem("transactionData"));
    // Busco el indice / poicion de la transaccion que quiero eliminar 
    let transactionIndexInArray = transactionObjArray
        .findIndex(element => element.transactioId == transactionId );  
    // Elimino el elemento de la posicio
    transactionObjArray.splice(transactionIndexInArray, 1 );
    // Convierto nuevamente a JSON
    let transactionArrayJSON = JSON.stringify(transactionObjArray);
     //Guardo mi array de transaccion en formato JSON en el local storage
    localStorage.setItem("transactionData", transactionArrayJSON);
}

function insertCategory(categoryName){
    const selectElement = document.getElementById("categoryType");
    let htmlToInsert = `<option> ${categoryName} <option>`;
    selectElement.insertAdjacentHTML("beforeend",htmlToInsert);
}


function cargarCategorias(){

}
