function draw_category(){
    debugger;
    // Datos
    let allCategories =[
        "Alquiler",
        "Comida",
        "Diversion"
    ]
    // Carga Datos
    for (let index=0; index<allCategories.length;index++){
        insertCategory(allCategories[index]);
    }
}