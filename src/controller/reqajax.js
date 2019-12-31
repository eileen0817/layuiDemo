/**
 @Desc：layuiDemo ajax请求封装模块
 @Author：ye
 */
layui.define(function (exports) {
    var obj = {
        ajaxFun: function (option) {
            var $ = layui.$, admin = layui.admin, view = layui.view , form = layui.form;

            $.ajax({
                type: option.method || 'post'
                , url: layui.setter.dataInterface + option.url || layui.setter.dataInterface
                , headers: {
                    "Authorization":  layui.data(layui.setter.tableName)[layui.setter.request.tokenName],
                }
                , contentType: option.conType||'application/json'
                , data: option.data || null
                , dataType: 'json'
                , success: option.success || function () {
                }
                , error: option.error || function (xhr) {
                    exceptionHandler(xhr)
                }
            });

            /*异常处理*/
            function exceptionHandler(xhr) {
                if (xhr.status == 400) {
                    layer.alert('错误编码：400   <br>错误原因：参数验证失败', {icon: 2, title: '错误'});
                } else if (xhr.status == 401) {
                     if (layui.sessionData(layui.setter.tableName)[layui.setter.request.tokenName] == null) {
                        location.hash ="/login"
                     } else {
                         layer.alert('错误编码：401   <br>错误原因：用户验证已失效', {icon: 2, title: '错误'},function () {
                             admin.popup({
                                title: '用户登录'
                                 , area: ['400px', '280px']
                               , id: 'LAY-popup-user-login'
                               , success: function (layero, index) {
                                      view(this.id).render('common/loginWin', {index: index}).done(function () {
                                          form.render(null, 'form-user-login');
                                     });
                                  }
                             });
                          });
                      }
                } else if (xhr.status == 403) {
                    layer.alert('错误编码：403   <br>错误原因：您无权访问该资源     ', {icon: 2, title: '错误'});
                } else if (xhr.status == 404) {
                    layer.alert('错误编码：404   <br>错误原因：找不到您要访问的资源', {icon: 2, title: '错误'});
                } else {
                    var message = '后台逻辑异常，请联系管理员';
                    if (xhr.responseText) {
                        var oo = $.parseJSON(xhr.responseText);
                        if (oo.message) {
                            message = oo.message;
                        }
                    }
                    layer.alert('错误编码：500   <br>错误原因：' + message, {icon: 2, title: '错误'});
                }

            }


        }
    }
    exports('reqajax', obj);
})
