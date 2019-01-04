"strict mode"
let Name = "";
let NameList = [];
let List= [];
let save = {};
loadList();
function readList()
{
    let htmlOut = "<ol style=\"padding-left: 40px;\">";
    List.forEach(function(element,index){htmlOut += "<li class=\"item__load\">" + element + "<button class=\"item__load_btn_remove\" onclick=\"removeList("+index+")\">&#10008</button>"+"</li><hr>";});
    htmlOut += "</ol>";
    document.getElementById("list").innerHTML = htmlOut;
}
function writeList()
{
    if (Name){
    let message = document.getElementById("text").value;
    if (message){
    List.push(message);
    readList();
    }
    }
}
function removeList(index)
{
    List.splice(index,1);
    readList();
}
function clearText()
{
    document.getElementById("text").value = "";
}
function saveList()
{
    save[Name] = List;
    localStorage.setItem("headquarter.herokuapp.comSAVES",JSON.stringify(save));
    showMessage("Сохранено!");
}
function loadList(atr)
{
    let SAVE = localStorage.getItem("headquarter.herokuapp.comSAVES");
    if(!SAVE){
        List = [];
        showMessage("Сохранений нет");
    }
    else {
        save = JSON.parse(SAVE);
        List = [];
        SaveNamesToHTML();
    if(!atr & save){
    showMessage("Сохранение загружено!");
    }
    }
}
function clearList()
{
    let SAVE = "";
    List = [];
    readList();
    delete save[Name];
    SAVE = JSON.stringify(save);
    localStorage.setItem("headquarter.herokuapp.comSAVES", SAVE);
    SaveNamesToHTML();
    Name = "";
    showMessage("Удалено!");

}
function ASK(text) {
    document.getElementById("asking").innerText = text;
    document.getElementById("ask").classList.remove("hidden");
}
function closeASK() {
    document.getElementById("ask").classList.add("hidden");
}
function createNewSave() {
    let name = document.getElementById("SaveNameIn").value;
    if (name.length >= 4 & name[0] != " "){
    save[name] = [];
    List = [];
    setName(name);
    closeCreateSave();
    SaveNamesToHTML();
    showMessage("Сохранение создано!");
    }
    else if(name[0] == " "){showMessage("Название не может начинаться с пробела")}
    else { showMessage("Введите имя минимум из 4 символов!") }
}
function SaveNamesToHTML() {
    let Names = [];
    for (let key in save){
        Names.push(key);
    }
    NameList = Names;
    document.getElementById("SAVES").innerHTML = writeSaveNames(Names);
}
function writeSaveNames(Names) {
    let htmlOut = "";
    Names.forEach((element,index) => htmlOut+="<li id='Name"+index+"' onclick=\"setColor('"+index+"'),setName('"+ element +"')\">" + element + "</li>");
    return htmlOut;
}
function setName(name) {
    Name = name;
    List = save[name];
    readList();
}
function setColor(ID) {
    NameList.forEach((e,index)=>document.getElementById("Name"+index).classList.remove("selected"));
    document.getElementById("Name"+ID).classList.add("selected");
}
function closeCreateSave() {
    document.getElementById("createSave").classList.add("hidden");
    document.getElementById("SaveNameIn").value = "";
}
function openCreateSave() {
    document.getElementById("createSave").classList.remove("hidden");
}
function showMessage(message){
    let element = document.getElementById("message");
    element.innerText = message;
    element.classList.add("showMessage");
    setTimeout(() => element.classList.remove("showMessage"),2000);
}
function deleteAtIndex(index) {
    let storage = localStorage.getItem("headquarter.herokuapp.comSAVES");
    delete storage[index];
    localStorage.setItem("headquarter.herokuapp.comSAVES", storage);
}
function hilight(index) {

}
function loadOldSaves() {
    showMessage("Дебаг функция!!!!!");
    save.First = localStorage.getItem("First");
    SaveNamesToHTML();
}