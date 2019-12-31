/**
 @Desc：layuiDemo 公共方法（按需引用该模块）
 @Author：ye
 */
layui.define(function (exports) {
    var obj = {
        //转换树结构并更改选中字段,type=1展开节点但title需修改且无根目录，type=2不展开节点但title不修改且有根目录，type=2不展开节点但title需修改且有根目录
        transData: function (a, idStr, pidStr, chindrenStr, type) {
            var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length,
                noPidArr = [];
            for (; i < len; i++) {
                hash[a[i][id]] = a[i];
                //提取所有子节点的元素id
                if (a[i][pid] && a[i][pid] != "") {
                    if (noPidArr.indexOf(a[i][pid]) < 0) {
                        noPidArr.push(a[i][pid])
                    }
                }
            }
            for (; j < len; j++) {
                var aVal = a[j], hashVP = hash[aVal[pid]];
                aVal.field = '';
                //是否展开节点
                if (type==1) {
                    aVal.spread = true;
                }else{
                    aVal.spread = false;
                }
                //接口字段名称不同
                if(type!=2){
                    aVal.title = aVal.name
                }
                if (aVal.checked == 1 && noPidArr.indexOf(aVal.id) < 0) {
                    aVal.checked = true
                } else {
                    delete aVal.checked
                }
                //是否有父亲及诶单
                if (hashVP) {
                    !hashVP[children] && (hashVP[children] = []);
                    hashVP[children].push(aVal);
                } else {
                    r.push(aVal);
                }
            }

            //增加根目录
            if (type!=1) {
                var rootTree = [{
                    id: 'root',
                    name: '根目录',
                    title: '根目录',
                    sort: 3,
                    type: 0,
                    spread:true,
                    children: r
                }]
                return rootTree;
            }
            return r;
        }
        //判断列表数组内是否存在字段title为某一内容的元素
        ,strIsExit:function(str,list){
            for (var key in list) {
                if (list[key].title === str) {
                    return true
                }
            }
            return false;
        }
        //将选中资源转换成对应json格式并返回选中资源id
        ,transTree:function(treeData) {
        var newData = treeData, dataArr = [];
        for (var j = 0; j < newData.length; j++) {
            if (newData[j]["children"] && (newData[j]["children"] != [])) {
                newData = newData.concat(newData[j]["children"])
                delete newData[j].children
            }
            dataArr.push(newData[j].id)
        }
        return dataArr
    }
    }
    exports('func', obj);
})
