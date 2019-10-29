<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "home",
    data() {
        return {
            msg: 'ssssssssssss'
        }
    },
    components: {
        HelloWorld
    },
    mounted() {
        console.log(this);
        let list = [
            { id: 3, name: "部门C", parentId: 1 },
            { id: 4, name: "部门D", parentId: 1 },
            { id: 1, name: "部门A", parentId: 0 },
            { id: 2, name: "部门B", parentId: 0 },
            { id: 5, name: "部门E", parentId: 2 },
            { id: 6, name: "部门F", parentId: 3 },
            { id: 7, name: "部门G", parentId: 2 },
            { id: 8, name: "部门H", parentId: 4 }
        ];

        function convert(list) {
            const res = [];
            const map = list.reduce((res, v) => ((res[v.id] = v), res), {});
            for (const item of list) {
                if (item.parentId === 0) {
                    res.push(item);
                    continue;
                }
                if (item.parentId in map) {
                    const parent = map[item.parentId];
                    parent.children = parent.children || [];
                    parent.children.push(item);
                }
            }
            return res;
        }
        // console.log(convert(list));

        function _convert(list) {
            let m = new Map();
            list.forEach(item => {
                m.set(item.id, item);
            });
            return list.reduce((pre, cur) => {
                let parent = m.get(cur.parentId);
                if (parent) {
                    (parent.children || (parent.children = [])).push(cur);
                    return pre;
                }
                return [...pre, cur];
            }, []);
        }
        console.log(_convert(list));

        let arr = [{ name: "zhangsan", id: 10 }];
        let mapObj = new Map();
        for (const item of arr) {
            mapObj.set(item.id, item);
        }
        let item = mapObj.get(10);
        item.age = 18;
        console.log(arr[0]);

        // 发布订阅者模式

        let name = 'zhangsan';
        class Dep {
            constructor() {

            }
        }
    }
};
</script>
