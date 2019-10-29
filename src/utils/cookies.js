const localStore = function () {
    var test = 'a';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        this.isStorage = true;
    } catch (e) {
        this.isStorage = false;
    }
};
localStore.prototype = {
    set: function (key, value) {
        if (this.isStorage) {
            localStorage.setItem(key, value);
        } else {
            document.cookie = key + "=" + value + "; path=/";
        }
        return true;
    },
    get: function (key) {
        if (this.isStorage) {
            return localStorage.getItem(key);
        } else {
            var keyEquals = key + "=",
                cookies = document.cookie.split(';');
            for (var i = 0, j = cookies.length; i < j; i++) {
                var thisCookie = cookies[i];
                while (thisCookie.charAt(0) == ' ') {
                    thisCookie = thisCookie.substring(1, thisCookie.length);
                }
                if (thisCookie.indexOf(keyEquals) == 0) {
                    return thisCookie.substring(keyEquals.length, thisCookie.length);
                }
            }
            return null;
        }
    },
    remove: function (key) {
        if (this.isStorage) {
            localStorage.removeItem(key);
        } else {
            this.set(key, "");
        }
    },
    clear: function () {
        if (this.isStorage) {
            localStorage.clear();
        } else {
            var cookies = document.cookie.split(';');
            for (var i = 0, j = cookies.length; i < j; i++) {
                var thisCookie = cookies[i];
                var equalsPosition = thisCookie.indexOf("=");
                var name = equalsPosition > -1 ? thisCookie.substr(0, equalsPosition) : thisCookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }

        }
    }
};
export default new localStore;
