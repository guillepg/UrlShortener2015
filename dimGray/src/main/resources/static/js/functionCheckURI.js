//http://stackoverflow.com/questions/3915634/checking-if-a-url-is-broken-in-javascript

function UrlExists(url, cb){
    jQuery.ajax({
        url:      url,
        dataType: 'text',
        type:     'GET',
        complete:  function(xhr){
            if(typeof cb === 'function')
                cb.apply(this, [xhr.status]);
        }
    });
}