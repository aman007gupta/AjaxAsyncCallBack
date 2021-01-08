let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + 'hr:' + date.getMinutes() + 'min:' + date.getSeconds() + 'sec:';
}

function makePromiseCall(methodType, url, callback, async = true, data = null) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log("State Change called a: " + showTime() + " Ready State: " +
                xhr.readyState + " Status: " + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
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
    });
}

const getURL = "http://127.0.0.1:3000/employees/1";
makePromiseCall("GET", getURL, true)
        .then(responseText => {
            console.log("Get User Data at:" + showTime() + " data:" + responseText)
        })
        .catch(error => console.log("GET Error Status: " + JSON.stringify(error)));
console.log("Made GET AJAX Call to server at " + showTime());


const deleteURL = "http://localhost:3000/employees/7"
makePromiseCall("DELETE", deleteURL, true)
        .then(responseText => {
            console.log("DELETE User Data at:" + showTime() + " data:" + responseText)
        })
        .catch(error => console.log("GET Error Status: " + JSON.stringify(error)));
console.log("Made DELETE AJAX Call to server at " + showTime());

const postURL = "http://localhost:3000/employees/";
const empData = {"name": "Harry", "salary": "5000"};
makePromiseCall("POST", postURL, empData)
        .then(responseText => {
            console.log("Add User Data at:" + showTime() + " data:" + responseText)
        })
        .catch(error => console.log("GET Error Status: " + JSON.stringify(error)));
console.log("Made DELETE AJAX Call to server at " + showTime());
