const http = new EasyHTTP;
http.get("some api url")
    .then(data => console.log(data))
    .then(err => console.log(err));