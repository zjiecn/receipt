const getQueryParam = function (key) {
    if (!key) {
        return false;
    }

    var value = '';
    var paramStr = window.location.search ? window.location.search.substr(1) : '';

    if (paramStr) {
        paramStr.split('&').forEach(function (param) {
            var arr = param.split('=');
            if (arr[0] == key) {
                value = arr[1];
            }
        });
    }

    return value;
}