// обмін контентом між блоками 1 і 6
function swapHeaderFooterContent()
{
    let temporary = document.querySelector(".header").innerHTML;
    document.querySelector(".header").innerHTML =  document.querySelector(".footer").innerHTML;
    document.querySelector(".footer").innerHTML = temporary;
}
document.getElementById("button__swap").addEventListener("click", swapHeaderFooterContent);

// сума значень зі змінних в кінці блоку 4
let firstNumber = 20, secondNumber = 30;
let area = document.querySelector("#areaResult");
area.textContent = "First side: " + firstNumber 
    + ", second side: " + secondNumber 
    + ". Area of a rectangle: " 
    + (firstNumber * secondNumber);

// найменше значення серед 10 вказаних у формі
let allInputs = document.querySelectorAll("input[type=number]");
function getMinValue() 
{
    let minimum;
    for(i = 0; i < 10; i++)
    {
        let current = allInputs[i].value;
        if (current != "" && isNaN(minimum))
            minimum = Number(current);
        if (current != "" && Number(current) < minimum)
        {
            minimum = Number(current);
        }
    }
    if (isNaN(minimum))
    {
        alert("Please enter at least one number in form!");
        return;
    }
    document.cookie = "minimum=" + minimum;
    alert("Minimum value: " + minimum + "\nThe value has been saved in cookie!");
}
document.getElementById("button__min").addEventListener("click", getMinValue);

document.addEventListener("DOMContentLoaded", function()
{
    if (document.cookie != "")
    {
        if (confirm("Saved data: " + document.cookie + "\nUse this data?"))
        {
            let minimumFromCookie = document.cookie;
            minimumFromCookie = minimumFromCookie.substring(minimumFromCookie.indexOf("="), minimumFromCookie.indexOf(";"));
            document.querySelector(".main__form").innerHTML = "Minimum value (stored in cookie): " + minimumFromCookie;
        }
        else
        {
            document.cookie = "";
        }
    }
});

// жирний текст при події focus
window.addEventListener("focusin", function(){
    if (this.document.querySelector("#checkbox__bold").checked == true)
    {
        document.querySelector(".main__right").classList.add("bold");
        this.localStorage.setItem("isBold", "1");
    }
});
    // виставлення "жирності" при оновленні сторінки відповідно до значення в localStorage 
function setInitialBold()
{
    if (localStorage.getItem("isBold") === "1")
    {
        document.querySelector(".main__right").classList.add("bold");
    }
}
document.addEventListener("DOMContentLoaded", setInitialBold);
    // кнопка для прибирання "жирності"
document.querySelector("#button__clearbold").addEventListener("click", function()
{
    document.querySelector(".main__right").classList.remove("bold");
    localStorage.setItem("isBold", "0");
});

// генерація одностовпчикової таблиці
let tableRows = [];
let perviousContent = document.querySelector(".main__left").innerHTML;

    // при завантаженні сторінки чіпляються усі необхідні обробники подій 
    // в залежності від того, чи була таблиця збережена в localStorage
document.addEventListener("DOMContentLoaded", loadTableFromLocalStorage);

function createTable()
{
    document.querySelector(".main__left").innerHTML = 
        "<label id=\"label__addToTable\">Enter some value to appear in the table: </label>\n" +
        "<input type=\"text\" id=\"inputTable\"><br>\n" +
        "<button id=\"button__addToTable\">Add to table</button><br>\n" +
        "<table id=\"scriptTable\" cellpadding=\"0\" cellspacing=\"2px\"></table><br>\n" +
        "<button id=\"button__removeTable\">Remove table</button>"
    document.querySelector("#button__addToTable").addEventListener("click", addValueToTable);
    document.querySelector("#button__removeTable").addEventListener("click", removeTable);
        // додавання рядка натисканням Enter для зручності
    document.querySelector("#inputTable").addEventListener("keydown", (e) =>
    {
        if (e.key === "Enter")
        {
            addValueToTable();
        }
    });
        // для localStorage
    localStorage.setItem("isTableCreated", "1");
}
function addValueToTable()
{
    let row = document.createElement("tr");
    let data = document.createElement("td");
    let input = document.querySelector("#inputTable");
    let textData = input.value == "" ? "Not set" : input.value;
    data.innerHTML = textData;
    row.appendChild(data);
    document.querySelector("#scriptTable").appendChild(row);
    //для localStorage
    tableRows.push(textData);
    localStorage.setItem("tableRows", JSON.stringify(tableRows));

    input.value = "";
    input.focus();
}
function removeTable()
{
    localStorage.setItem("isTableCreated", "0");
    localStorage.removeItem("tableRows");
    document.querySelector(".main__left").innerHTML = perviousContent;
    document.querySelector(".tableImage").addEventListener("mouseover", createTable);
}
function loadTableFromLocalStorage()
{
    if (localStorage.getItem("isTableCreated") === "1") // таблиця зберігається в localStorage
    {
        tableRows = JSON.parse(localStorage.getItem("tableRows"));
        createTable();
            // якщо таблиця була пустою - без жодного рядка
        if (!Array.isArray(tableRows))
        {
            tableRows = [];
            return;
        }
            // заповнюємо таблицю
        for (i = 0; i < tableRows.length; i++)
        {
            let row = document.createElement("tr");
            let data = document.createElement("td");
            data.innerHTML = tableRows[i];
            row.appendChild(data);
            document.querySelector("#scriptTable").appendChild(row);
        }
    }
    else // таблиця не була створена (або була видалена)
    {
        document.querySelector(".tableImage").addEventListener("mouseover", createTable);
    }
}