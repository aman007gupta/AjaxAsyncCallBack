let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + 'hr:' + date.getMinutes() + 'min:' + date.getSeconds() + 'sec:';
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log("State Change called a: " + showTime() + " Ready State: " +
            xhr.readyState + " Status: " + xhr.status);
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 client error or 500 server error");
            }
        }
    }

    xhr.open(methodType, url, async);
    if (data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + "request sent to server at: " + showTime())

}
const getURL = "http://127.0.0.1:3000/employees/1";

function getUserDetails(data) {
    console.log("Get User Data at: " + showTime() + " data: " + data)
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX Call to server at " + showTime());

const deleteURL = "http://localhost:3000/employees/5";
function userDelete(data) {
    console.log("User Delete at: "  + showTime() + " data: " + data);
}
makeAJAXCall("DELETE", deleteURL, userDelete, false);
console.log("Made DELETE AJAX Call to server at " + showTime());



const postURL = "http://localhost:3000/employees/";
const empData = {"name": "Harry", "salary": "5000"};
function userAdd(data) {
    console.log("User Added at: " + showTime() + " data: " + data)
}
makeAJAXCall("POST", postURL, userAdd, true, empData);
console.log("Made POST AJAX Call to server at " + showTime());
