"strict mode"
/*
let list = [];
let i = 0;
while (true){
    i++;
    let message = prompt("Какие важные дела у вас есть?\nВведите пустую строку чтобы закончить список дел.");
    if(message == 0){
        break;
    }
    list.push(message);
}
i=0;
list.forEach(function(element) {
    i++;
    document.write("<p>"+i+"]"+element+"</p>");
});
*/
let Name = "";
let List=[];

function readList()
{
    let htmlOut = "<ol style=\"margin: 5px; padding-left: 40px;\";>";
    List.forEach(function(element,index){htmlOut += "<li style=\"margin: 4px;\">" + element + "<button onclick=\"removeList("+index+")\">X</button>"+"</li><hr style=\"margin: 0;\">";});
    htmlOut += "</ol>";
    document.getElementById("list").innerHTML=htmlOut;
}
function writeList()
{
    let message = document.getElementById("text").value;
    if (message){
    List.push(message);
    readList();
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
    let ListJoin = List.join("§");
    localStorage.setItem(Name,ListJoin);
    alert("Сохранено!");
}
function clearList()
{
    if (confirm("Удалить сохранение ?")){
    localStorage.removeItem(Name);
    alert("Удалено!");
    }
}
function loadList(atr)
{
    let chars = localStorage.getItem(Name);
    if( !chars){
        List = [];
        alert("Сохранения нет.");
    }
    else {
    List = chars.split("§");
    if(!atr){
    alert("Сохранение загружено!");
    }
    readList();
    }
}
function refresh() {
    loadList(1);
    readList();
}
function setName(name) {
    Name = name;
    refresh();
}
