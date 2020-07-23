var getJSON = function(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            return JSON.parse(this.responseText);
            //(myArr);
        }
    }
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    //return myArr;
}

export default getJSON;


