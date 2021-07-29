/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
 const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.withCredentials = true;

    if (options.method === "GET"){
        let urlFull = options.url + "?";
        for (data in options.data) {
            urlFull += (data + "=" + options.data[data] + "&");
            urlFull = urlFull.subst(0, urlFull.length - 1)
        }
    } else {
        const formData = new FormData();
        for (data in options.data) {
            formData.append( data, options.data[data]);
        }
    }
    try {
        xhr.open( options.method, options.url );
        xhr.send( data );
    }
    catch ( e ) {
        // перехват сетевой ошибки
       callback( e );
    }
    
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === request.DONE && xhr.status === 200){
            options.callback(null, JSON.parse(xhr.responseText));
        } else if (xhr.readyState === request.DONE && xhr.status !== 200) {
            options.callback(JSON.parse(xhr.status), null);
        }
});
};