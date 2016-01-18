/**
 * Created by zero on 2015/12/25.
 */

window.onload = function () {
    AjaxGetTopNavHtml('NavDemo.html', 'GET');

    $('#Dimensions').tagEditor({
        placeholder: "Tips: Click Bottom Btn to Add.",
    });

    /*Set Tooltips*/
    $('[data-toggle="tooltip"]').tooltip();

    var LeftNav = document.getElementsByClassName('LeftNav')[0];
    LeftNav.style.height = (ClientHeight - 60) + 'px';

    var RightContent = document.getElementsByClassName('RightContent')[0];
    /*When Load Show All KPI*/
    //LoadAllKpis();

    /*Judge Which li Click*/
    var LeftNav = document.getElementsByClassName('LeftNav')[0];
    var LeftNavLi = LeftNav.getElementsByTagName('ul')[0].getElementsByTagName('li');

    LeftNavLi[0].onclick = function () {
        /*Remove All Li*/
        RemoveLi();
        $(this).addClass('IsClick');
        LoadAllKpis();
    };

    LeftNavLi[1].onclick = function () {
        RemoveLi();
        $(this).addClass('IsClick');
        LoadCreatedKpis();
    };

    LeftNavLi[2].onclick = function () {
        RemoveLi();
        $(this).addClass('IsClick');
        LoadFollowedKpis();
    };

    function RemoveLi() {
        $('.LeftNav li').removeClass('IsClick');
        $('.RightContent ul li').remove();
    }

    var AddDimentionBtn = document.getElementsByClassName('AddDimentionBtn')[0].getElementsByTagName('i')[0];
    AddDimentionBtn.onclick = function () {
        $('.AddDimensions').fadeIn(400);

        /*Close Dimension Btn*/
        var CloseDimension = document.getElementsByClassName('CloseDimension')[0].getElementsByTagName('i')[0];
        CloseDimension.onclick = function () {
            $('.AddDimensions').fadeOut(400);
        };

        var DimensionAddBtn = document.getElementsByClassName('DimensionAddBtn')[0];
        DimensionAddBtn.onclick = function () {
            var DimensionName = document.getElementsByClassName('AddDimensions')[0].getElementsByTagName('input')[0].value;
            var DimensionType = document.getElementById('DimensionType').value;

            if (DimensionName == "") {
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', 'Dimension Name cannot Empty', '#DC143C');
                SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                //Delete AddDepartment Dialog
                //删除掉MsgDialog
                setTimeout(function () {
                    RemoveDialog('ShowMsgDialog');
                }, 3000);
            } else {
                /* $('<li><div class="tag-editor-spacer">,</div><div class="tag-editor-tag" data-toggle="tooltip" data-placement="top" title="' + DimensionType + '">' + DimensionName + '</div>' +
                 '<div class="tag-editor-delete"><i></i></div></li>').appendTo('.tag-editor').ready(function () {
                 });*/
                $('#Dimensions').tagEditor('addTag', DimensionName, DimensionType);
            }
        }
    };

    var CreateKPIBtn = document.getElementsByClassName('modal-footer')[0].getElementsByTagName('button');

    var BasicHeader = document.getElementsByClassName('BasicHeader')[0];
    var AssignToHeader = document.getElementsByClassName('AssignToHeader')[0];
    var ViewableHeader = document.getElementsByClassName('ViewableHeader')[0];

    var BasicInfo = document.getElementsByClassName('basic-info')[0];
    var AssignTo = document.getElementsByClassName('assign-to')[0];
    var Viewable = document.getElementsByClassName('viewable')[0];

    var BasicHeaderFont = BasicHeader.getElementsByTagName('h4')[0];
    var AssignToHeaderFont = AssignToHeader.getElementsByTagName('h4')[0];
    var ViewableHeaderFont = ViewableHeader.getElementsByTagName('h4')[0];

    var PreStepBtn = CreateKPIBtn[0];
    var NextStepBtn = CreateKPIBtn[1];
    var FinishBtn = CreateKPIBtn[2];

    PreStepBtn.onclick = function () {
        if (AssignTo.getAttribute('isopen') == 'yes') {
            BasicInfo.style.display = 'block';
            AssignTo.style.display = 'none';
            Viewable.style.display = 'none';
            BasicInfo.setAttribute('isopen', 'yes');
            AssignTo.setAttribute('isopen', 'no');
            Viewable.setAttribute('isopen', 'no');
            BasicHeader.style.borderBottom = '4px solid lightseagreen';
            AssignToHeader.style.border = 'none';
            ViewableHeader.style.border = 'none';
            BasicHeaderFont.style.color = '#FFA500';
            AssignToHeaderFont.style.color = '#000';
            ViewableHeaderFont.style.color = '#000';
        } else if (Viewable.getAttribute('isopen') === 'yes') {
            BasicInfo.style.display = 'none';
            AssignTo.style.display = 'block';
            Viewable.style.display = 'none';
            BasicInfo.setAttribute('isopen', 'no');
            AssignTo.setAttribute('isopen', 'yes');
            Viewable.setAttribute('isopen', 'no');
            BasicHeader.style.border = 'none';
            AssignToHeader.style.borderBottom = '4px solid lightseagreen';
            ViewableHeader.style.border = 'none';
            BasicHeaderFont.style.color = '#000';
            AssignToHeaderFont.style.color = '#FFA500';
            ViewableHeaderFont.style.color = '#000';
        }
    };

    NextStepBtn.onclick = function () {
        if (BasicInfo.getAttribute('isopen') == 'yes') {
            BasicInfo.style.display = 'none';
            AssignTo.style.display = 'block';
            Viewable.style.display = 'none';
            BasicInfo.setAttribute('isopen', 'no');
            AssignTo.setAttribute('isopen', 'yes');
            Viewable.setAttribute('isopen', 'no');
            BasicHeader.style.border = 'none';
            AssignToHeader.style.borderBottom = '4px solid lightseagreen';
            Viewable.style.border = 'none';
            BasicHeaderFont.style.color = '#000';
            AssignToHeaderFont.style.color = '#FFA500';
            ViewableHeaderFont.style.color = '#000';

            /*Here can get All Value*/
            console.log($('#Dimensions').tagEditor('getTags')[0].tags);
        } else if (AssignTo.getAttribute('isopen') == 'yes') {
            BasicInfo.style.display = 'none';
            AssignTo.style.display = 'none';
            Viewable.style.display = 'block';
            BasicInfo.setAttribute('isopen', 'no');
            AssignTo.setAttribute('isopen', 'no');
            Viewable.setAttribute('isopen', 'yes');
            BasicHeader.style.border = 'none';
            AssignToHeader.style.border = 'none';
            ViewableHeader.style.borderBottom = '4px solid lightseagreen';
            BasicHeaderFont.style.color = '#000';
            AssignToHeaderFont.style.color = '#000';
            ViewableHeaderFont.style.color = '#FFA500';
            $('.GroupUserList').fadeOut(400);
        }
    };

    var ViewMsgShow = document.getElementsByClassName('ViewMsgShow');
    var PartialPublic = ViewMsgShow[2].getElementsByTagName('span')[0].getElementsByTagName('input')[0];
    PartialPublic.onclick = function () {
        /*var ChooseNav = document.getElementsByClassName('ChooseNav')[0];
         ChooseNav.style.display = 'block';*/
        $('.ChooseNav').fadeIn(400);

        var CloseCheckBox = document.getElementsByClassName('CloseCheckBox')[0].getElementsByTagName('i')[0];
        CloseCheckBox.onclick = function () {
            $('.ChooseNav').fadeOut(400);
        };

        var NewGroupBtn = document.getElementsByClassName('NewGroupBtn')[0];
        NewGroupBtn.onclick = function () {
            $('.ChooseNav').hide();
            $('.NewGroup').fadeIn(400);

            var CloseAddGroup = document.getElementsByClassName('CloseAddGroup')[0].getElementsByTagName('i')[0];
            CloseAddGroup.onclick = function () {
                $('.NewGroup').fadeOut(400);
                $('.ChooseNav').fadeIn(400);
            };

            var AddGroupUsers = document.getElementsByClassName('AddGroupUsers')[0].getElementsByTagName('i')[0];
            AddGroupUsers.onclick = function () {
                $('.GroupUserList').fadeIn(400);
                $('.GroupUserList').animate({right: '0'});
            };
            var OKUsers = document.getElementsByClassName('OKUsers')[0];
            OKUsers.onclick = function () {
                $('.GroupUserList').fadeOut(400);
                $('.NewGroup').fadeOut(400);
                $('.ChooseNav').fadeIn(400);
            }
        }
    };

    var CloseGroupUserList = document.getElementsByClassName('CloseGroupUserList')[0].getElementsByTagName('i')[0];
    CloseGroupUserList.onclick = function () {
        $('.GroupUserList').fadeOut(400);
    };


    /*获取所有的值*/
    var url = 'users/departments';
    var Token = $.cookie('token');
    var AllDepartmentJSON = new Array();
    AllDepartmentJSON = AjaxGetAllDepartment(url, 'GET', Token);


    /*Assign To Who  Start*/
    /**
     *解析数组，将之放置在一个数组中
     * 但是数组中套着数组
     * @type {Array}
     */
    var AllMembers = new Array();
    var AllDepartment = new Array();
    var UniqueDepartmentJSON;
    for (var i = 0; i < AllDepartmentJSON.length; i++) {
        UniqueDepartmentJSON = $.parseJSON(AllDepartmentJSON[i]);
        for (var j = 0; j < UniqueDepartmentJSON.length; j++) {
            var AllID = UniqueDepartmentJSON[j].department.id;
            var AllName = UniqueDepartmentJSON[j].department.name;

            AllDepartment.push({ID: AllID, Name: AllName});
            AllMembers.push(UniqueDepartmentJSON[j].department.members);
        }
    }

    /**
     * 将数组的数组放置到一个数组中
     * @type {Array}
     */

    var GetAllDepartment = new Array();
    for (var i = 0; i < AllDepartment.length; i++) {
        var DepartmentJSON = JSON.stringify(AllDepartment[i]).toString();
        GetAllDepartment.push(DepartmentJSON);
    }

    var GetAllMembers = new Array();
    for (var i = 0; i < AllMembers.length; i++) {
        for (var j = 0; j < AllMembers[i].length; j++) {
            GetAllMembers.push(AllMembers[i][j]);
        }
    }

    /*No Repeat*/
    var NoRepeatDepartment = ArrayIsRepeat(GetAllDepartment);
    //console.log(NoRepeatDepartment);

    var NoRepeatMembers = ArrayIsRepeat(GetAllMembers);
    //console.log(NoRepeatMembers);

    for (var i = 0; i < NoRepeatDepartment.length; i++) {
        var NoRepeatDepartmentJSON = eval("(" + NoRepeatDepartment[i] + ")");
        var NoRepeatDepartmentID = NoRepeatDepartmentJSON.ID;
        var NoRepeatDepartmentName = NoRepeatDepartmentJSON.Name;
        $('<option value="' + NoRepeatDepartmentID + '">' + NoRepeatDepartmentName + '</option>').appendTo('#AssignDepartment').ready(function () {
        });
    }

    var AssignToWho = document.getElementsByClassName('AssignToWho')[0].getElementsByClassName('col-md-1')[0].getElementsByTagName('i')[0];
    AssignToWho.onclick = function () {
        $('.GroupUserList').fadeIn(400);
        $('.GroupUserList').animate({right: '200px'});
        /*删除列表中的所有li*/
        $('.List ul li').remove();
        for (var i = 0; i < NoRepeatMembers.length; i++) {
            $('<li> <input type="radio" name="AssignToPeople" value="' + NoRepeatMembers[i] + '">' + NoRepeatMembers[i] + '</li>').appendTo('.List>ul').ready(function () {
            });
        }

        var RadioIsChecked = document.getElementsByName('AssignToPeople');
        console.log(RadioIsChecked.length);
        /* for (var j = 0; j < RadioIsChecked.length; j++) {
         if (RadioIsChecked[j].checked) {
         console.log(12123)
         var AssignToWho = document.getElementsByClassName('col-md-7')[0].getElementsByTagName('input')[0];
         AssignToWho.value = RadioIsChecked[i].value;
         }
         }*/


        var AssignToPeopleBtn = document.getElementsByClassName('GroupUserList')[0].getElementsByTagName('button')[0];
        AssignToPeopleBtn.onclick = function () {
            for (var j = 0; j < RadioIsChecked.length; j++) {
                if (RadioIsChecked[j].checked) {
                    console.log(12123)
                    var AssignToWho = document.getElementsByClassName('col-md-7')[0].getElementsByTagName('input')[0];
                    AssignToWho.value = RadioIsChecked[j].value;
                }
            }
        }
    };

    /*Assign To Who  End*/



    var Finish = document.getElementsByClassName('Finish')[0];
    Finish.onclick = function () {
        var viewable_code = 0;
        var ViewType = document.getElementsByName('ViewType');
        for (var i = 0; i < ViewType.length; i++) {
            if (ViewType[i].checked) {
                viewable_code = ViewType[i].value;
            }
        }
        console.log(viewable_code);

        /*    console.log($('#DefaultFrequency').val());
         console.log($('#uom').val());
         console.log($('#Dimensions').tagEditor('getTags')[0].tags);*/
    }
};

function LoadAllKpis() {
    var accessesurl = 'kpis/users/accesses';
    var Token = $.cookie('token');
    var Accesses = AjaxGetKpis(accessesurl, 'GET', Token);

    LoadKpis(Accesses, Token);
}

function LoadCreatedKpis() {
    var accessesurl = 'kpis/users/created';
    var Token = $.cookie('token');
    var CreatedKpis = AjaxGetKpis(accessesurl, 'GET', Token);
    LoadKpis(CreatedKpis, Token);
}

function LoadFollowedKpis() {
    var accessesurl = 'kpis/users/followed';
    var Token = $.cookie('token');
    var FollowedKpis = AjaxGetKpis(accessesurl, 'GET', Token);
    LoadKpis(FollowedKpis, Token);
}

function LoadKpis(LoadKpis, Token) {
    for (var i = 0; i < LoadKpis.length; i++) {
        var users = LoadKpis[i].user;
        var kpi = LoadKpis[i].kpi;
        var department = LoadKpis[i].department;
        var follow_flag = LoadKpis[i].follow_flag;
        var follow_flag_value = LoadKpis[i].follow_flag_value;
        var is_created = LoadKpis[i].is_created;
        var is_managable = LoadKpis[i].is_managable;

        var signupurl = 'users/signuped';
        var SignedUsersInfo = AjaxUserSingUp(signupurl, 'POST', users.email, Token);

        function Is_Followed(FollowedFlag, CreatedFlag) {
            if (CreatedFlag) {
                if (FollowedFlag == "0") {
                    /*NONE*/
                    CreatedKPI("darkgreen", "white", i);
                } else if (FollowedFlag == "1") {
                    /*PARTLY*/
                    CreatedKPI("deepskyblue", "white", i);
                } else if (FollowedFlag == "2") {
                    /*ALL*/
                    CreatedKPI("#f2f2f2", "black", i);
                } else {
                    CreatedKPI("white", "black", i);
                }
            } else {
                if (FollowedFlag == "0") {
                    /*NONE*/
                    NotCreatedKPI("darkgreen", "white", i);
                } else if (FollowedFlag == "1") {
                    /*PARTLY*/
                    NotCreatedKPI("deepskyblue", "white", i);
                } else if (FollowedFlag == "2") {
                    /*ALL*/
                    NotCreatedKPI("#f2f2f2", "black", i);
                } else {
                    NotCreatedKPI("white", "black", i);
                }
            }
        }

        function CreatedKPI(BackColor, FontColor, i) {
            $('<li style="top:' + 100 * i + 'px;"><div class="Kpis"><table class="table"><tbody><tr>' +
                '<td style="border-right:1px solid #e0e0e0;"><h3 class="KpiName" id="' + kpi.kpi_id + '" title="' + kpi.kpi_name + '">' + kpi.kpi_name + '</h3></td>' +
                '<td style="border-right:1px solid #e0e0e0;border-left: 1px solid white;margin-top:20px; width: ' + (ClientWidth - 600) + 'px' + '"><h3 class="KpiDescription" title="' + kpi.description + '">' + kpi.description + '</h3></td>' +
                '<td class="TargetMin"><h3 style="border-right:1px solid #e0e0e0;">' + kpi.target_min_text + '</h3></td>' +
                '<td class="TargetMax"><h3 style="border-right:1px solid #e0e0e0;">' + kpi.target_max_text + '</h3></td>' +
                '<td class="KpiCreator" style="border-right:1px solid #e0e0e0;"><h3 title="' + SignedUsersInfo.user.email + '">' + SignedUsersInfo.user.nick_name + '</h3></td>' +
                '<td><button class="BtnSubmit Follow" style="background: ' + BackColor + ';color:' + FontColor + ' ;"><i class="glyphicon glyphicon-plus"></i> Follow</button>' +
                '<button class="BtnSubmit Manage" style="background:' + BackColor + ' ;color: ' + FontColor + ';"><i class="glyphicon glyphicon-wrench"></i> Manage</button></td></tr>' +
                '<tr>' +
                '<td><h5>KPI Name</h5></td>' +
                '<td style="width: ' + (ClientWidth - 600) + 'px' + ';"><h5>Description</h5></td>' +
                '<td><h5 style="width: 80px;">Min</h5></td>' +
                '<td><h5 style="width:80px;">Max</h5></td>' +
                '<td ><h5>Creator</h5></td>' +
                '</tr>' +
                '</tbody></table></div></li>').appendTo('.RightContent>ul').ready(function () {
            });
        }

        function NotCreatedKPI(BackColor, FontColor, i) {
            $('<li style="top:' + 100 * i + 'px;"><div class="Kpis"><table class="table"><tbody><tr>' +
                '<td style="border-right:1px solid #e0e0e0;"><h3 class="KpiName" id="' + kpi.kpi_id + '" title="' + kpi.kpi_name + '">' + kpi.kpi_name + '</h3></td>' +
                '<td style="border-right:1px solid #e0e0e0;border-left: 1px solid white;margin-top:20px; width: ' + (ClientWidth - 600) + 'px' + '"><h3 class="KpiDescription" title="' + kpi.description + '">' + kpi.description + '</h3></td>' +
                '<td class="TargetMin"><h3 style="border-right:1px solid #e0e0e0;">' + kpi.target_min_text + '</h3></td>' +
                '<td class="TargetMax"><h3 style="border-right:1px solid #e0e0e0;">' + kpi.target_max_text + '</h3></td>' +
                '<td class="KpiCreator" style="border-right:1px solid #e0e0e0;"><h3 title="' + SignedUsersInfo.user.email + '">' + SignedUsersInfo.user.nick_name + '</h3></td>' +
                '<td><button class="BtnSubmit Follow" style="background: ' + BackColor + ';color:' + FontColor + ' ;"><i class="glyphicon glyphicon-plus"></i> Follow</button></td></tr>' +
                '<tr>' +
                '<td><h5>KPI Name</h5></td>' +
                '<td style="border-right:1px solid #e0e0e0; width: ' + (ClientWidth - 600) + 'px' + ';"><h5>Description</h5></td>' +
                '<td><h5 style="width: 80px;">Min</h5></td>' +
                '<td><h5 style="width:80px;">Max</h5></td>' +
                '<td ><h5>Creator</h5></td>' +
                '</tr>' +
                '</tbody></table></div></li>').appendTo('.RightContent>ul').ready(function () {
            });
        }

        /*Is Created? Floow Flag*/
        Is_Followed(follow_flag_value, is_created);

        /*Judge Font Size*/
        if (kpi.kpi_name.length > 10) {
            var KpiName = document.getElementsByClassName('KpiName')[i];
            KpiName.style.fontSize = '.9em';
            KpiName.style.fontWeight = 'bold';
        }

        if (kpi.description.length > ((ClientWidth - 600) / 18)) {
            var KpiDescriptionFont = document.getElementsByClassName('KpiDescription')[i];
            KpiDescriptionFont.style.fontSize = '.9em';
            KpiDescriptionFont.style.fontWeight = 'bold';
        }
    }
}

/*Array Is Repeat*/
function ArrayIsRepeat(array) {
    var NoRepeat = new Array();
    var p = 0;
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < NoRepeat.length; j++) {
            if (NoRepeat[j] == array[i]) break; // 检查重复
        }
        if (j >= NoRepeat.length) { // 没重复就增加它
            NoRepeat[p++] = array[i];
        }
    }
    return NoRepeat;
}