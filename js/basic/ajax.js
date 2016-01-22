/**
 * Created by zero on 2015/12/22.
 */
//var urlhead = 'http://112.124.28.10:8001/api/v2/';
var urlhead = 'http://192.168.1.70:3000/api/v2/';
//var urlhead = 'http://192.168.0.104:3000/api/v2/';

function AjaxSignIn(url, type, email, password, LoadHref) {
    $(document).ready(function () {
        $.ajax({
            type: type,
            url: urlhead + url,
            timeout: 4000,
            data: {email: email, password: password},
            dataType: 'json',
            success: function (data) {
                console.log('------------------200 Call SignIn API Success!-------------------');
                var background = '#71C671';
                if (data.result_code.toString() == '1') {
                    //此处添加cookies
                    $.cookie('token', data.token.toString(), {path: '/'});
                    $.cookie('email', data.customized_field.email.toString(), {path: '/'});
                    $.cookie('nickname', data.customized_field.nick_name.toString(), {path: '/'});
                    secure: true;
                    /* if (document.cookie.length > 0) {
                     $.cookie.raw = true;
                     $.removeCookie('token');
                     $.removeCookie('email');

                     $.cookie('token', data.token.toString(), {path: '/'});
                     $.cookie('email', email, {path: '/'});
                     secure: true;
                     } else {
                     $.cookie.raw = true;
                     $.cookie('token', data.token.toString());
                     $.cookie('email', email);
                     secure: true;
                     }*/
                    /*if (document.cookie.length > 0) {
                     //此处是已经存在cookie了
                     document.cookie = "token=" + "; expires=" + (new Date(0)).toUTCString() - 1000;
                     document.cookie = "email=" + "; expires=" + (new Date(0)).toUTCString() - 1000;
                     document.cookie = "token=" + data.token.toString();
                     document.cookie = "email=" + email;
                     } else {
                     document.cookie = "token=" + data.token.toString();
                     document.cookie = "email=" + email;
                     }*/

                    setTimeout(function () {
                        window.location.href = LoadHref;
                    }, 3500);
                    ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                } else {
                    var background = '#DC143C';
                    ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                }
                SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                //删除掉MsgDialog
                setTimeout(function () {
                    RemoveDialog('ShowMsgDialog');
                }, 3000);
            },
            error: function () {
                SimpleDialog("Error !", "Call API Error", 'OK', 'block');
                var DialogBtn = document.getElementsByClassName('DialogBtn');
                DialogBtn[0].onclick = function () {
                    Close();
                };
                console.log('------------------Call SignIn API Error------------------');
            }
        })
    });
}

function AjaxRegister(url, type, email, password, nickname) {
    $(document).ready(function () {
        $.ajax({
            type: type,
            url: urlhead + url,
            timeout: 4000,
            data: {email: email, password: password, nick_name: nickname},
            dataType: 'json',
            success: function (data) {
                console.log('------------------200 Call SignIn API Success!-------------------');

                var background = '#DC143C';
                if (data.result_code.toString() == '1') {
                    background = '#71C671';
                    //成功之后  消失遮罩层和对话框，直接打开登录界面。
                    Close();
                }

                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);

                SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                //删除掉MsgDialog
                setTimeout(function () {
                    RemoveDialog('ShowMsgDialog');
                }, 3000);
            },
            error: function () {
                SimpleDialog("Error !", "Call API Error", 'OK', 'block');
                console.log('------------------Call SignIn API Error------------------');
                var DialogBtn = document.getElementsByClassName('DialogBtn');
                DialogBtn[0].onclick = function () {
                    Close();
                };
            }
        })
    });
}

function AjaxResetPassword(url, type, email, msg) {
    $(document).ready(function () {
        $.ajax({
            type: type,
            url: urlhead + url,
            timeout: 4000,
            data: {email: email},
            dataType: 'json',
            success: function (data) {
                console.log('------------------200 Call SignIn API Success!-------------------')
                var background = '#DC143C';
                if (data.result_code.toString() == '1') {
                    background = '#71C671';
                    ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', msg, background);
                    //    成功之后  消失遮罩层和对话框，直接打开登录界面。
                    Close();
                } else {
                    ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString() + '.Check!', background);
                }

                SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                setTimeout(function () {
                    RemoveDialog('ShowMsgDialog');
                }, 3000);

            },
            error: function () {
                SimpleDialog("Error !", "Call API Error", 'OK', 'block');
                var DialogBtn = document.getElementsByClassName('DialogBtn');
                DialogBtn[0].onclick = function () {
                    Close();
                };
                console.log('------------------Call SignIn API Error------------------');
            }
        })
    });
}

var ProfileFlagForPass = "";
function AjaxSetPassword(url, type, newpassword, AuthToken) {
    $(document).ready(function () {
        $.ajax({
            type: type,
            url: urlhead + url,
            timeout: 4000,
            data: {new_password: newpassword},
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
            },
            dataType: 'json',
            async: false,
            success: function (data) {
                var background = '#DC143C';
                if (data.result_code.toString() == '1') {
                    background = '#71C671';
                    //ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                    //    成功之后  消失遮罩层和对话框，直接打开登录界面。
                    //Close();
                    ProfileFlagForPass = data.result_code.toString();

                    console.info("SetPassword--->" + ProfileFlagForPass);
                } else {
                    //ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                    ProfileFlagForPass = data.result_code.toString();
                    console.log("What the Fuck---->" + ProfileFlagForPass);
                }
                /* SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                 setTimeout(function () {
                 RemoveDialog('ShowMsgDialog');
                 }, 3000);*/
                console.log('------------------Call SignIn API Success------------------');
            },
            error: function () {
                SimpleDialog("Error !", "Call API Error", 'OK', 'block');
                var DialogBtn = document.getElementsByClassName('DialogBtn');
                DialogBtn[0].onclick = function () {
                    Close();
                };
                console.log('------------------Call SignIn API Error------------------');
            }
        });
    });
    return ProfileFlagForPass;
}

var ProfileFlagForInfos = "";
function AjaxPutUserInfos(url, type, nickname, email, AuthToken) {
    $(document).ready(function () {
        $.ajax({
            type: type,
            url: urlhead + url,
            timeout: 4000,
            data: {nick_name: nickname, email: email},
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
            },
            dataType: 'json',
            async: false,
            success: function (data) {
                var background = '#DC143C';
                if (data.result_code.toString() == '1') {
                    background = '#71C671';
                    //ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                    //    成功之后  消失遮罩层和对话框，直接打开登录界面。
                    //Close();
                    ProfileFlagForInfos = data.result_code.toString();
                    console.info("Info--->" + ProfileFlagForInfos);
                } else {
                    ProfileFlagForInfos = data.result_code.toString();
                    console.log('------------------------------------------------')
                    //ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                }

                /*  SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                 setTimeout(function () {
                 RemoveDialog('ShowMsgDialog');
                 }, 3000);*/
                console.log('------------------Call SignIn API Success------------------');
            },
            error: function () {
                SimpleDialog("Error !", "Call API Error", 'OK', 'block');
                var DialogBtn = document.getElementsByClassName('DialogBtn');
                DialogBtn[0].onclick = function () {
                    Close();
                };
                console.log('------------------Call SignIn API Error------------------');
            }
        });
    });
    return ProfileFlagForInfos;
}

function AjaxGetUsersInfos(url, type, AuthToken) {
    $(document).ready(function () {
        $.ajax({
            url: urlhead + url,
            type: type,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
            },
            dataType: 'json',
            success: function (data) {
                console.log(data.brief_user_info.email + ',' + data.brief_user_info.nick_name);
                console.log('------------------Call SignIn API Success------------------');
                var NickName = document.getElementsByClassName('LockContentText')[0].getElementsByTagName('h3')[0];
                NickName.innerHTML = data.brief_user_info.nick_name;

                var NotNickName = document.getElementsByClassName('LockContentText')[0].getElementsByTagName('a')[0];
                NotNickName.innerHTML = "Not " + data.brief_user_info.nick_name + " ?";
            },
            error: function () {
                console.log('------------------Call SignIn API Error------------------');
            }
        })
    })
}

function AjaxGetTopNavHtml(url, type) {
    $.ajax({
        url: url,
        type: type,
        dataType: 'html',
        success: function (data) {
            document.getElementsByClassName('GetTopNavContent')[0].innerHTML = data;
            TopNavOperation();
        },
        error: function () {
            alert('error');
        }
    });
}

var RootJSON = '';
function AjaxGetRootDepartment(url, type, AuthToken) {
    Loading(0, 0, 0, 0, 'block');
    $.ajax({
        url: urlhead + url,
        type: type,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
        },
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var ID = data[i].department.id;
                var Name = data[i].department.name;
                var Description = data[i].department.description;
                var Has_Children = data[i].department.has_children;
                var Members = data[i].department.members;
                $('<ul class="ul' + ID + '"><li class="parent_li Child' + ID + '"><span id="' + ID + '" title="' + Description + '"><i class="glyphicon glyphicon-grain"></i>' + Name
                    + '</span></li></ul>').appendTo($('.tree')).ready(function () {
                });
                var ChildJSON = new Array();
                RootJSON = data;
                var ChildJSON = AjaxGetChildDepartment(url, type, ID, AuthToken);
                ChildJSON.push(JSON.stringify(RootJSON));
            }
            RemoveDialog('Loading');
        },
        error: function () {
            RemoveDialog('Loading');
            alert('error');
        }
    });
    return RootJSON;
}

var ChildJSON = new Array();
function AjaxGetChildDepartment(url, type, ID, AuthToken) {
    $.ajax({
        url: urlhead + url,
        type: 'GET',
        data: {department_id: ID},
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
        },
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var childs = data[i].department;
                if (childs.has_children) {
                    $('<ul class="ul' + childs.id + '"><li class="parent_li Child' + childs.id + '" style="display: none;"> <span id="' + childs.id + '" title="' + childs.description + '"><i class="glyphicon glyphicon-plus-sign"></i>' +
                        childs.name + '</span></li></ul>').appendTo($('.Child' + ID)).ready(function () {
                    });
                    ChildJSON.push(JSON.stringify(data));
                    AjaxGetChildDepartment(url, type, childs.id, AuthToken);
                } else {
                    $('<ul class="ul' + childs.id + '"><li class="parent_li Child' + childs.id + '" style="display:none;"> <span id="' + childs.id + '" title="' + childs.description + '"><i class="glyphicon glyphicon-leaf"></i>' +
                        childs.name + '</span></li></ul>').appendTo($('.Child' + ID)).ready(function () {
                    });
                    ChildJSON.push(JSON.stringify(data));
                }
            }
        },
        error: function () {
            alert('error');
        }
    });
    return ChildJSON;
}

function AjaxAddDepartment(url, type, name, description, id, AuthToken) {
    $.ajax({
        url: urlhead + url,
        type: type,
        async: false,
        data: {name: name, description: description, parent_id: id},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
        },
        success: function (data) {
            var background = '#71C671';
            if (data.result_code.toString() == '1') {
                if (!data.customized_field == 'null') {
                    var CreateDepartment = data.customized_field.department;
                    var CreateDepartmentID = CreateDepartment.id;
                    var CreateDepartmentName = CreateDepartment.name;
                    var CreateDepartmentDescription = CreateDepartment.description;
                    var CreateDepartmentMembers = CreateDepartment.members;

                    //    Here Add Department to Page  ：name  ID  Description
                    $('<ul class="ul' + CreateDepartmentID + '"><li class="parent_li Child' + CreateDepartmentID + '"> <span id="' + CreateDepartmentID + '" title="' + CreateDepartmentDescription + '"><i class="glyphicon glyphicon-leaf"></i>' +
                        CreateDepartmentName + '</span></li></ul>').appendTo($('.Child' + id)).ready(function () {
                    });
                } else {
                    var background = '#DC143C';
                }
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
            } else {
                var background = '#DC143C';
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
            }
            SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
            //Delete AddDepartment Dialog
            RemoveDialog('AddDepartmentDialog');
            //删除掉MsgDialog

            setTimeout(function () {
                RemoveDialog('ShowMsgDialog');
            }, 3000);
        },
        error: function () {
            alert('error');
        }
    })
}

function AjaxChangeDepartment(url, type, name, description, id, AuthToken) {
    $.ajax({
        url: urlhead + url,
        type: type,
        async: false,
        data: {name: name, description: description, id: id},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
        },
        success: function (data) {
            var background = '#71C671';
            if (data.result_code.toString() == '1') {
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);

                //    Set Page Show
                var GetLi = document.getElementsByClassName('Child' + id)[0];
                var GetLiSpan = GetLi.getElementsByTagName('span')[0];
                GetLiSpan.setAttribute('title', description);
                GetLiSpan.innerHTML = name;
            } else {
                var background = '#DC143C';
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
            }
            RemoveDialog('ShowConfirmDialog');
            RemoveDialog('Masked');

            SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
            //删除掉MsgDialog
            setTimeout(function () {
                RemoveDialog('ShowMsgDialog');
            }, 3000);
        },
        error: function () {
            alert('error');
        }
    })
}

function AjaxDeleteDepartment(url, type, id, AuthToken) {
    $.ajax({
        url: urlhead + url,
        type: type,
        async: false,
        data: {id: id},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
        },
        success: function (data) {
            var background = '#71C671';
            if (data.result_code.toString() == '1') {
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                //    Remove li Tag On Page.
                var UlClass = 'ul' + id;
                RemoveDialog(UlClass);
                RemoveDialog('Masked');
                RemoveDialog('ShowConfirmDialog');
            } else {
                var background = '#DC143C';
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
            }
            SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
            //Delete AddDepartment Dialog
            RemoveDialog('AddDepartmentDialog');
            //删除掉MsgDialog

            setTimeout(function () {
                RemoveDialog('ShowMsgDialog');
            }, 3000);
        },
        error: function () {
            alert('error');
        }
    })
}

var AllDepartmentJSON = '';
function AjaxGetAllDepartment(url, type, AuthToken) {
    Loading(0, 0, 0, 0, 'block');
    $.ajax({
        url: urlhead + url,
        type: type,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
        },
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var ID = data[i].department.id;
                var Name = data[i].department.name;
                var Description = data[i].department.description;
                var Has_Children = data[i].department.has_children;
                var Members = data[i].department.members;
                $('<ul class="ul' + ID + '"><li class="parent_li Child' + ID + '"><span id="' + ID + '" title="' + Description + '"><i class="glyphicon glyphicon-grain"></i>' + Name
                    + '</span></li></ul>').appendTo($('.tree')).ready(function () {
                });
                var ChildJSON = new Array();
                ChildJSON = AjaxGetChildDepartment(url, type, ID, AuthToken);
                ChildJSON.push(JSON.stringify(data));
                AllDepartmentJSON = ChildJSON;
            }
            RemoveDialog('Loading');
        },
        error: function () {
            RemoveDialog('Loading');
            alert('error');
        }
    });
    return AllDepartmentJSON;
}
function AjaxRemoveUsers(url, type, id, userid, AuthToken) {
    $.ajax({
        url: urlhead + url,
        type: type,
        data: {id: id, user_id: userid},
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
        },
        success: function (data) {
            var background = '#71C671';
            if (data.result_code.toString() == '1') {
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                //    Set Page Show
                var li = document.getElementById(userid);
                li.parentNode.removeChild(li);
            } else {
                var background = '#DC143C';
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
            }

            SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
            //删除掉MsgDialog
            setTimeout(function () {
                RemoveDialog('ShowMsgDialog');
            }, 3000);
        },
        error: function () {
            alert('error');
        }
    });
}

var AddUsersFlag = 0;
function AjaxAddUsers(url, type, department_id, emails, AuthToken) {
    $.ajax({
        url: urlhead + url,
        type: type,
        async: false,
        data: {id: department_id, emails: emails},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
        },
        success: function (data) {
            var background = '#71C671';
            if (data.result_code.toString() == '1') {
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                AddUsersFlag = 1;
            } else {
                var background = '#DC143C';
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
            }
            SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
            //删除掉MsgDialog
            setTimeout(function () {
                RemoveDialog('ShowMsgDialog');
            }, 3000);
        },
        error: function (data) {
            var background = '#DC143C';
            ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', "emails is missing", background);
            SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
            //删除掉MsgDialog
            setTimeout(function () {
                RemoveDialog('ShowMsgDialog');
            }, 3000);
        }
    });
    return AddUsersFlag;
}

var SignedUsersInfo = "";
function AjaxUserSingUp(url, type, email, AuthToken) {
    $.ajax({
        url: urlhead + url,
        type: type,
        async: false,
        data: {email: email},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
        },
        success: function (data) {
            SignedUsersInfo = data;
        },
        error: function () {
            alert('error');
        }
    });
    return SignedUsersInfo;
}

var SetManagerFlag = 0;
function AjaxSetManager(url, type, id, user_id, AuthToken) {
    $.ajax({
        url: urlhead + url,
        type: type,
        async: false,
        data: {id: id, user_id: user_id},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
        },
        success: function (data) {
            var background = '#71C671';
            if (data.result_code.toString() == '1') {
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                SetManagerFlag = 1;
            } else {
                var background = '#DC143C';
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
            }
            SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
            //Delete AddDepartment Dialog
            //删除掉MsgDialog

            setTimeout(function () {
                RemoveDialog('ShowMsgDialog');
            }, 3000);
        },
        error: function () {
            alert('error');
        }
    });
    return SetManagerFlag;
}

function AjaxRemoveManager(url, type, id, user_id, AuthToken) {
    $.ajax({
        url: urlhead + url,
        type: type,
        async: false,
        data: {id: id, user_id: user_id},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
        },
        success: function (data) {
            var background = '#71C671';
            if (data.result_code.toString() == '1') {
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
            } else {
                var background = '#DC143C';
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
            }
            SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
            //Delete AddDepartment Dialog
            //删除掉MsgDialog

            setTimeout(function () {
                RemoveDialog('ShowMsgDialog');
            }, 3000);
        },
        error: function () {
            alert('error');
        }
    });
}

function AjaxCreateKpis(url, type, kpis, assignments, AuthToken) {
    $.ajax({
        url: urlhead + url,
        type: type,
        async: false,
        data: {kpi: kpis, assignments: assignments},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
        },
        success: function (data) {
            var background = '#71C671';
            if (data.result_code.toString() == '1') {
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
            } else {
                var background = '#DC143C';
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
            }
            SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
            //Delete AddDepartment Dialog
            //删除掉MsgDialog
            setTimeout(function () {
                RemoveDialog('ShowMsgDialog');
            }, 3000);
        },
        error: function () {
            alert("error");
        }
    });
}

function AjaxGetAllMembers(url, type, id, AuthToken) {
    var GetMembers = "";
    $.ajax({
        url: urlhead + url,
        type: type,
        data: {id: id},
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
        },
        success: function (data) {
            GetMembers = data;
        },
        error: function () {
            alert('error');
        }
    });
    return GetMembers;
}

var GetList = "";
function AjaxGetList(url, type, AuthToken) {
    $.ajax({
        url: urlhead + url,
        type: type,
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
        },
        success: function (data) {
            GetList = data;
        },
        error: function () {
            alert('error');
        }
    });
    return GetList;
}

var creategroups = "";
function AjaxCreateGroups(url, type, usergroup, AuthToken) {
    $.ajax({
        url: urlhead + url,
        type: type,
        async: false,
        data: {user_groups: usergroup},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
        },
        success: function (data) {
            creategroups = data;
            var background = '#71C671';
            if (data.result_code.toString() == '1') {
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                $('#CreateGroup').modal('hide');
                $('#UpdateGroup').modal('hide');
            } else {
                var background = '#DC143C';
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
            }
            SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);

            setTimeout(function () {
                RemoveDialog('ShowMsgDialog');
            }, 3000);
        },
        error: function () {
            alert('error');
        }
    });
    return creategroups;
}