import router from './router/router';
import store from './store/store.js';
import vue from 'vue';
import { GetCookies, SetCookies, DelCookies } from './utils/auth';
let whiteList = ['/login', '/logout'];
// 在页面加载时读取sessionStorage里的状态信息同步至vuex中
try {
    let localStoreStore = GetCookies();
    if (localStoreStore && JSON.parse(localStoreStore).userInfo.token) {
        let state = JSON.parse(localStoreStore);
        Object.assign(store.state, state);
    }
} catch (e) {
    console.log(e);
}
// //在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener("beforeunload", () => {
    if (!GetCookies() && store.state.userInfo.token) {
        SetCookies(JSON.stringify(store.state));
    }
});
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
router.beforeEach((to, from, next) => {
    if (token) {
        if (to.path == '/login') {
            next({ path: '/' })
        } else {
            next();
        }
    } else {
        let token = getQueryString('token');
        if (token) {
            store.commit('SET_TOKEN_BROWSER', token);
            
        } else {
            if (whiteList.indexOf(to.path) > -1) {
                next();
            } else {
                next({ path: '/login' });
            }
        }
    }
})
