import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI, {
    size: 'mini',
    zIndex: 3000
});

//设置__webpack_public_path__
const $path = document.querySelector('meta[name="AppPublic"]');

// eslint-disable-next-line
__webpack_public_path__ = $path ? $path.getAttribute('content') : '/';
