/**
 * Created by zero on 2015/12/25.
 */

window.onload = function () {
    AjaxGetTopNavHtml('NavDemo.html', 'GET');
    SetPosition();
    InitParams();

    var RightContent = document.getElementsByClassName('RightContent')[0];
    /*When Load Show All KPI*/
    //LoadAllKpis();
    LeftNavFun();

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
                document.getElementsByClassName('AddDimensions')[0].getElementsByTagName('input')[0].style.border = '2px solid darkred';
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', 'Dimension Name cannot Empty', '#DC143C');
                SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                //Delete AddDepartment Dialog
                //删除掉MsgDialog
                setTimeout(function () {
                    RemoveDialog('ShowMsgDialog');
                }, 3000);
            } else {
                document.getElementsByClassName('AddDimensions')[0].getElementsByTagName('input')[0].style.border = '1px solid #ccc';
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

    /*footer button*/
    var PreStepBtn = CreateKPIBtn[0];
    var NextStepBtn = CreateKPIBtn[1];
    var FinishBtn = CreateKPIBtn[2];

    /*step control*/
    PreStepBtn.onclick = function () {
        if (AssignTo.getAttribute('isopen') == 'yes') {
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

            $('.AssignUserList').fadeOut(400);
        } else if (Viewable.getAttribute('isopen') === 'yes') {
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

            $('.ChooseNav').fadeOut(400);
        }
    };

    NextStepBtn.onclick = function () {
        if (BasicInfo.getAttribute('isopen') == 'yes') {
            FinishBtn.removeAttribute('disabled');

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

            /*Display AddDimensions Dialog*/
            $('.AddDimensions').fadeOut(400);
        } else if (Viewable.getAttribute('isopen') == 'yes') {
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

            $('.AssignUserList').fadeOut(400);
            $('.ChooseNav').fadeOut(400);
        }
    };

    /*此处为点击user 图标*/
    var AssignToWhoIcon = document.getElementsByClassName('AssignToWho')[0].getElementsByClassName('col-md-1')[0].getElementsByTagName('i')[0];
    var AssignToWho = document.getElementsByClassName('AssignToWho')[0].getElementsByClassName('col-md-7')[0].getElementsByTagName('input')[0];
    AssignToWhoIcon.onclick = function () {
        $('.AssignUserList').fadeIn(400);
        $('.AssignUserList').animate({right: ((ClientWidth - 600) / 2 - 180) + 'px'});
        /*删除列表中的所有li*/
        $('.List ul li').remove();

        GetAllAssignUserList();
        /*获取到单选按钮点击事件*/
        $("[name=AllUsersList]").click(function () {
            AssignToWho.value = $(this).val();
            AssignToWho.setAttribute('title', $(this).attr("title"));
            AssignToWho.setAttribute('value', $(this).val());
            AssignToWho.setAttribute('data-toggle', 'tooltip');
            AssignToWho.setAttribute('data-placement', 'bottom');
            AssignToWho.setAttribute('data-original-title', $(this).attr('title'));
            $('[data-toggle="tooltip"]').tooltip();
        });
    };
    FinishBtn.onclick = function () {
        var Basic_Info = document.getElementsByClassName('basic-info')[0];
        var Row = Basic_Info.getElementsByClassName('row');
        var Kpi_Name = Row[0].getElementsByClassName('col-md-6')[0].getElementsByTagName('input')[0].value;
        var Default_Frequency = $('#DefaultFrequency').val();
        var Kpi_Description = Row[1].getElementsByClassName('col-md-6')[0].getElementsByTagName('textarea')[0].value;
        var uom = $('#uom').val();
        var TargetMin = Row[3].getElementsByClassName('col-md-6')[0].getElementsByTagName('input')[0].value;
        var TargetMax = Row[4].getElementsByClassName('col-md-6')[0].getElementsByTagName('input')[0].value;
        var CalculateMethod = $('#calculatemethod').val();

        //var Kpi_Dimension = $('#Dimensions').tagEditor('getTags')[0].tags;
        var GetDimensions = document.getElementsByClassName('GetDimensions')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
        var Attributes = new Array();

        if (GetDimensions.length > 1) {
            for (var i = 1; i < GetDimensions.length; i++) {
                var AttributeName = GetDimensions[i].getElementsByClassName('tag-editor-tag')[0].innerHTML;
                var AttributeType = GetDimensions[i].getElementsByClassName('tag-editor-tag')[0].getAttribute('data-original-title');
                var AttributesDate = {
                    attribute_name: AttributeName,
                    attribute_type: AttributeType
                };
                Attributes = Attributes.concat(AttributesDate);
            }
        } else {
            Attributes = [];
        }

        var viewable_code = 0;
        var ViewType = document.getElementsByName('ViewType');
        for (var i = 0; i < ViewType.length; i++) {
            if (ViewType[i].checked) {
                viewable_code = ViewType[i].value;
            }
        }

        var Viewable = {
            viewable_code: viewable_code,
            user_group_id: ""
        };

        var AssignDepartment = $('#AssignDepartment').val();
        var Frequency = $('#Frequency').val();
        var InputTime = document.getElementsByClassName('InputTime')[0].value;
        var AutoNotificationFlag = document.getElementsByClassName('assign-to')[0].getElementsByClassName('row')[3].getElementsByClassName('col-md-3')[0].getElementsByTagName('input')[0];
        var AutoNotification = false;
        if (AutoNotificationFlag.checked) {
            AutoNotification = true;
        }

        /*分配给一个人*/
        var assignments = new Array();
        if (!AssignToWho.getAttribute('data-original-title') == "") {
            var usersdate = AssignToWho.getAttribute('data-original-title');
            Frequency = parseInt(Frequency);
            var AssignmentsDate = {
                "user": usersdate,
                "department_id": AssignDepartment,
                "time": InputTime,
                "frequency": Frequency,
                "auto_notification": AutoNotification
            };
            assignments = assignments.concat(AssignmentsDate);
        } else {
            assignments = [];
        }

        Default_Frequency = parseInt(Default_Frequency);
        CalculateMethod = parseInt(CalculateMethod);
        var kpis = {
            "kpi_name": Kpi_Name,
            "description": Kpi_Description,
            "target_min": TargetMin,
            "target_max": TargetMax,
            "uom": uom,
            "frequency": Default_Frequency,
            "calculate_method": CalculateMethod,
            "viewable": Viewable,
            "attributes": Attributes
        };

        console.log(kpis);
        console.log(assignments);

        var url = 'kpis';
        var Token = $.cookie('token');

        var mykpi = {
            "kpi_name": Kpi_Name,
            "description": Kpi_Description,
            "target_min": TargetMin,
            "target_max": TargetMax,
            "uom": uom,
            "frequency": Default_Frequency,
            "calculate_method": CalculateMethod,
            "viewable": Viewable,
            "attributes": Attributes
        };
        console.log(mykpi);
        //AjaxCreateKpis(url, 'POST', kpis, assignments, Token);
        AjaxCreateKpis(url, 'POST', mykpi, Token);
    };

    /*four viewable style*/
    var ViewMsgShow = document.getElementsByClassName('ViewMsgShow');
    var Public = ViewMsgShow[0].getElementsByTagName('span')[0].getElementsByTagName('input')[0];
    var Private = ViewMsgShow[1].getElementsByTagName('span')[0].getElementsByTagName('input')[0];
    var PartialPublic = ViewMsgShow[2].getElementsByTagName('span')[0].getElementsByTagName('input')[0];
    var BlockSpecific = ViewMsgShow[3].getElementsByTagName('span')[0].getElementsByTagName('input')[0];

    Public.onclick = function () {
        RemoveAttr();
        $('.GroupUserList').fadeOut(400);
        $('.NewGroup').fadeOut(400);
        $('.ChooseNav').fadeOut(400);
    };

    Private.onclick = function () {
        RemoveAttr();
        $('.GroupUserList').fadeOut(400);
        $('.NewGroup').fadeOut(400);
        $('.ChooseNav').fadeOut(400);
    };

    PartialPublic.onclick = function () {
        $('.ChooseNav').fadeIn(400);
        RemoveAttr();
        GetAllGroupList();

        var CloseCheckBox = document.getElementsByClassName('CloseCheckBox')[0].getElementsByTagName('i')[0];
        CloseCheckBox.onclick = function () {
            $('.ChooseNav').fadeOut(400);
        };

        ClickGroup('ShowChoosedGroup');
    };

    BlockSpecific.onclick = function () {
        $('.ChooseNav').fadeIn(400);
        RemoveAttr();
        GetAllGroupList();
        var CloseCheckBox = document.getElementsByClassName('CloseCheckBox')[0].getElementsByTagName('i')[0];
        CloseCheckBox.onclick = function () {
            $('.ChooseNav').fadeOut(400);
        };
        ClickGroup('ShowNotChoosedGroup');
    };

    var CloseAssignUserList = document.getElementsByClassName('CloseAssignUserList')[0].getElementsByTagName('i')[0];
    CloseAssignUserList.onclick = function () {
        $('.AssignUserList').fadeOut(400);
    };

    /* var CloseGroupUserList = document.getElementsByClassName('CloseGroupUserList')[0].getElementsByTagName('i')[0];
     CloseGroupUserList.onclick = function () {
     $('.GroupUserList').fadeOut(400);
     };*/

};

function LoadAllKpis() {
    var accessesurl = 'kpis/users/accesses';
    var Token = $.cookie('token');
    var Accesses = AjaxGetList(accessesurl, 'GET', Token);

    LoadKpis(Accesses, Token);
}

function LoadCreatedKpis() {
    var accessesurl = 'kpis/users/created';
    var Token = $.cookie('token');
    var CreatedKpis = AjaxGetList(accessesurl, 'GET', Token);
    LoadKpis(CreatedKpis, Token);
}

function LoadFollowedKpis() {
    var accessesurl = 'kpis/users/followed';
    var Token = $.cookie('token');
    var FollowedKpis = AjaxGetList(accessesurl, 'GET', Token);
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

function InitParams() {
    $('[data-toggle="tooltip"]').tooltip();

    $('#Dimensions').tagEditor({
        forceLowercase: false
    });

    $('#UpdateGroupUsers').tagEditor3parments({
        forceLowercase: false,
        beforeTagDelete: function (field, editor, tags, val) {
            $('li', editor).each(function (index) {
                var li = $(this);
                if (li.find('.tag-editor-tag').html() == val) {
                    //console.log(li.find('.tag-editor-tag')[0].attributes);
                    var title = li.find('.tag-editor-tag')[0].attributes[1].value;
                    var id = li.find('.tag-editor-tag')[0].attributes[4].value;
                    var value = li.find('.tag-editor-tag')[0].attributes[5].value;

                    $('<li><div class="CheckBox" groupuserlist style="margin-left: -20px"><input type="checkbox" name="AllGroupUsersList" title="' + title + '" value="' + value + '" id="' + id + '"/>' +
                        '<label for="' + id + '"></label>' +
                        '<p data-toggle="tooltip" data-original-title="' + title + '" data-placement="bottom" title="' + title + '">' + value + '</p></div></li>').appendTo('.GroupList>ul').ready(function () {
                    });

                    $('[data-toggle="tooltip"]').tooltip();
                    ChooseGroupUserList('UpdateGroupUsers');
                }
            });
        }
    });
    $('#ChoosedGroupUsers').tagEditor3parments({
        forceLowercase: false,
        beforeTagDelete: function (field, editor, tags, val) {
            $('li', editor).each(function (index) {
                var li = $(this);
                if (li.find('.tag-editor-tag').html() == val) {
                    //console.log(li.find('.tag-editor-tag')[0].attributes);
                    var title = li.find('.tag-editor-tag')[0].attributes[1].value;
                    var id = li.find('.tag-editor-tag')[0].attributes[4].value;
                    var value = li.find('.tag-editor-tag')[0].attributes[5].value;

                    $('<li><div class="CheckBox" groupuserlist style="margin-left: -20px"><input type="checkbox" name="AllGroupUsersList" title="' + title + '" value="' + value + '" id="' + id + '"/>' +
                        '<label for="' + id + '"></label>' +
                        '<p data-toggle="tooltip" data-original-title="' + title + '" data-placement="bottom" title="' + title + '">' + value + '</p></div></li>').appendTo('.GroupList>ul').ready(function () {
                    });

                    $('[data-toggle="tooltip"]').tooltip();
                    ChooseGroupUserList('ChoosedGroupUsers');
                }
            });
        }
    });
    /*Set UOM Calculate_Method  timing_frequencies*/
    var uomurl = 'kpis/unit_of_measurements';
    var calculateurl = 'kpis/calculate_methods';
    var frequencyurl = 'kpis/timing_frequencies';
    var Token = $.cookie('token');

    var UOMList = AjaxGetList(uomurl, 'GET', Token);
    var CalculateList = AjaxGetList(calculateurl, 'GET', Token);
    var FrequencyList = AjaxGetList(frequencyurl, 'GET', Token);

    GetListWithFor(UOMList, 'uom');
    GetListWithFor(CalculateList, 'calculatemethod');
    GetListWithFor(FrequencyList, 'DefaultFrequency');
    GetListWithFor(FrequencyList, 'Frequency');

    GetAllDepartmentList();
}

function SetPosition() {
    /*Position Start*/
    var LeftNav = document.getElementsByClassName('LeftNav')[0];
    LeftNav.style.height = (ClientHeight - 60) + 'px';

    var CreateGroupModal = document.getElementById('CreateGroup');
    CreateGroupModal.style.top = (ClientHeight - 600) / 2 + 'px';

    var UpdateGroupModal = document.getElementById('UpdateGroup');
    UpdateGroupModal.style.top = (ClientHeight - 600) / 2 + 'px';

    var CreateKpiModal = document.getElementById('CreateKpi');
    CreateKpiModal.style.top = (ClientHeight - 600) / 2 + 'px';

    var AddDimensionsPosition = document.getElementsByClassName('AddDimensions')[0];
    AddDimensionsPosition.style.right = ((ClientWidth - 600) / 2 - 205) + 'px';

    var ChooseNavPosition = document.getElementsByClassName('ChooseNav')[0];
    ChooseNavPosition.style.right = ((ClientWidth - 600) / 2 - 205) + 'px';

    var NewGroupPosition = document.getElementsByClassName('NewGroup')[0];
    NewGroupPosition.style.right = ((ClientWidth - 600) / 2 - 205) + 'px';

    var AssignUserListPosition = document.getElementsByClassName('AssignUserList')[0];
    AssignUserListPosition.style.right = ((ClientWidth - 600) / 2 - 405) + 'px';
    /*Position End*/
}

function LeftNavFun() {
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

    LeftNavLi[3].onclick = function () {
        RemoveLi();
        $(this).addClass('IsClick');

        var RightContent = document.getElementsByClassName('RightContent')[0];
        RightContent.style.width = (ClientWidth - 200) + 'px';
        RightContent.getElementsByTagName('ul')[0].style.marginTop = '65px';

        $('<div class="NewGroupBtn" style="position: absolute;top: 0;left: 60px;height: 65px;">' +
            '<button class="BtnSubmit" style="width: 200px;"><i class="glyphicon glyphicon-plus" style="margin-right: 20px;"></i>' +
            '<span>New Group</span></button></div>').appendTo('.RightContent').ready(function () {
        });

        var url = 'user_groups/for_kpis';
        var Token = $.cookie('token');
        var Groups = AjaxGetList(url, 'GET', Token);

        for (var i = 0; i < Groups.length; i++) {
            var GroupName = Groups[i].user_group.name;
            var GroupId = Groups[i].user_group.id;
            var GroupMember = Groups[i].user_group.members;

            $('<div class="col-md-5 GroupListStyle"><div class="col-md-2 GroupNameStyle" id="' + GroupId + '"><h2>' + GroupName + '</h2></div>' +
                '<div class="col-md-7 GroupMembersStyle" data-toggle="tooltip" data-placement="bottom" title="' + GroupMember + '">' + GroupMember + '</div>' +
                '<div class="col-md-3"><button class="BtnSubmit ChangeBtn"><i class="glyphicon glyphicon-edit"></i><span>Edit</span> </button></div></div>').appendTo('.RightContent>ul').ready(function () {
            });
        }
        $('[data-toggle="tooltip"]').tooltip();

        CreateGroup();

        EditGroup();
    };
}

function RemoveLi() {
    $('.RightContent ul').empty();
    $('.LeftNav li').removeClass('IsClick');
    $('.NewGroupBtn').remove();
}

function GetListWithFor(data, id) {
    for (var i = 0; i < data.length; i++) {
        $('<option value="' + data[i].id + '">' + data[i].name + '</option>').appendTo('#' + id).ready(function () {
        });
    }
    /* console.log(data)*/
}

/*Get All Department*/
function GetAllDepartmentList() {
    /*获取所有的值*/
    var getalldeprtmenturl = 'users/departments';
    var Token = $.cookie('token');
    var GetAllDepartments = AjaxGetAllDepartment(getalldeprtmenturl, 'GET', Token);

    /**
     *解析数组，将之放置在一个数组中
     * 但是数组中套着数组
     * @type {Array}
     */
    var AllDepartment = new Array();
    var UniqueDepartmentJSON;
    for (var i = 0; i < GetAllDepartments.length; i++) {
        UniqueDepartmentJSON = $.parseJSON(GetAllDepartments[i]);
        for (var j = 0; j < UniqueDepartmentJSON.length; j++) {
            var AllID = UniqueDepartmentJSON[j].department.id;
            var AllName = UniqueDepartmentJSON[j].department.name;
            AllDepartment.push({ID: AllID, Name: AllName});
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

    /*No Repeat*/
    var NoRepeatDepartment = ArrayIsRepeat(GetAllDepartment);
    /* console.log(NoRepeatDepartment);*/

    for (var i = 0; i < NoRepeatDepartment.length; i++) {
        var NoRepeatDepartmentJSON = eval("(" + NoRepeatDepartment[i] + ")");
        var NoRepeatDepartmentID = NoRepeatDepartmentJSON.ID;
        var NoRepeatDepartmentName = NoRepeatDepartmentJSON.Name;
        $('<option value="' + NoRepeatDepartmentID + '">' + NoRepeatDepartmentName + '</option>').appendTo('#AssignDepartment').ready(function () {
        });
    }
}

/*Get All Users List*/
function GetAllAssignUserList() {
    /*获取所有的用户列表*/
    var url = 'users/brief_infos';
    var Token = $.cookie('token');
    var AllDepartmentJSON = AjaxGetList(url, 'GET', Token);
    for (var i = 0; i < AllDepartmentJSON.length; i++) {
        $('<li><div class="CheckBox" userlist style="margin-left: -20px"><input type="radio" name="AllUsersList" title="' + AllDepartmentJSON[i].email + '" value="' + AllDepartmentJSON[i].nick_name + '" id="' + AllDepartmentJSON[i].id + '"/>' +
            '<label for="' + AllDepartmentJSON[i].id + '"></label>' +
            '<p data-toggle="tooltip" data-placement="bottom" title="' + AllDepartmentJSON[i].email + '">' + AllDepartmentJSON[i].nick_name + '</p></div></li>').appendTo('.List>ul').ready(function () {
        });
    }
    $('[data-toggle="tooltip"]').tooltip();
}

/*Get All Group List*/
function GetAllGroupList() {
    /*Clear All*/
    $('.ShowGroup').empty();
    var grouplisturl = 'user_groups/for_kpis';
    var Token = $.cookie('token');
    var GetAllGroupListData = AjaxGetList(grouplisturl, 'GET', Token);

    /*将GroupList添加到HTML中*/
    for (var i = 0; i < GetAllGroupListData.length; i++) {
        $('<div class="CheckBox"><input type="radio" grouplist  name="GroupList" title="' + GetAllGroupListData[i].user_group.members + '" value="' + GetAllGroupListData[i].user_group.name + '" id="' + GetAllGroupListData[i].user_group.id + '"/>' +
            '<label for="' + GetAllGroupListData[i].user_group.id + '"></label>' +
            '<p data-toggle="tooltip" data-placement="bottom" title="' + GetAllGroupListData[i].user_group.members + '">' + GetAllGroupListData[i].user_group.name + '</p>' +
            '</div><hr>').appendTo('.ShowGroup').ready(function () {
        });
    }
    $('[data-toggle="tooltip"]').tooltip();
}

function ClickGroup(selector) {
    /*获取到单选按钮点击事件 -然并卵-*/
    $("[grouplist]").click(function () {
        $('.' + selector).html($(this).val());
        $('.' + selector).attr('value', $(this).val());
        $('.' + selector).attr('id', $(this).attr("id"));
        $('.' + selector).attr('title', $(this).attr("title"));
        $('.' + selector).attr('data-toggle', 'tooltip');
        $('.' + selector).attr('data-original-title', $(this).attr("title"));
        $('[data-toggle="tooltip"]').tooltip();
    });
}

function RemoveAttr() {
    /*删除部分可见元素属性*/
    $('.ShowChoosedGroup').html('');
    $('.ShowChoosedGroup').html('');
    $('.ShowChoosedGroup').removeAttr('value');
    $('.ShowChoosedGroup').removeAttr('id');
    $('.ShowChoosedGroup').removeAttr('title');
    $('.ShowChoosedGroup').removeAttr('data-toggle');
    $('.ShowChoosedGroup').removeAttr('data-original-title');

    /*删除部分不可见元素属性*/
    $('.ShowNotChoosedGroup').html('');
    $('.ShowNotChoosedGroup').removeAttr('value');
    $('.ShowNotChoosedGroup').removeAttr('id');
    $('.ShowNotChoosedGroup').removeAttr('title');
    $('.ShowNotChoosedGroup').removeAttr('data-toggle');
    $('.ShowNotChoosedGroup').removeAttr('data-original-title');

}

function GetAllGroupUserList() {
    $('.GroupList>ul>li').remove();
    /*获取所有的用户列表*/
    var url = 'users/brief_infos';
    var Token = $.cookie('token');
    var AllDepartmentJSON = AjaxGetList(url, 'GET', Token);

    for (var i = 0; i < AllDepartmentJSON.length; i++) {
        $('<li><div class="CheckBox" groupuserlist style="margin-left: -20px"><input type="checkbox" name="AllGroupUsersList" title="' + AllDepartmentJSON[i].email + '" value="' + AllDepartmentJSON[i].nick_name + '" id="' + AllDepartmentJSON[i].id + '"/>' +
            '<label for="' + AllDepartmentJSON[i].id + '"></label>' +
            '<p data-toggle="tooltip" data-placement="bottom" title="' + AllDepartmentJSON[i].email + '">' + AllDepartmentJSON[i].nick_name + '</p></div></li>').appendTo('.GroupList>ul').ready(function () {
        });
    }
    $('[data-toggle="tooltip"]').tooltip();
}

function ChooseGroupUserList(ID) {
    $("[groupuserlist]").click(function () {
        var title = $(this).children('input').attr("title");
        var id = $(this).children('input').attr("id");
        var value = $(this).children('input').val();

        $('#' + ID).tagEditor3parments('addTag', value, title, id);

        $('[data-toggle="tooltip"]').tooltip();
        $(this).parent().remove();
    });
}

function CreateGroup() {
    $('.GroupUserList').fadeIn(400);
    setTimeout(function () {
        $('.GroupUserList').animate({right: ((ClientWidth - 600) / 2) - 180 + 'px'});
    }, 1400);

    $('.NewGroupBtn').children('button').click(function () {
        $('#CreateGroup').modal('show');
        $('#CreateGroup').on('shown.bs.modal', function () {
            GetAllGroupUserList();
            ChooseGroupUserList('ChoosedGroupUsers');

            var CreateGroupBtn = document.getElementsByClassName('CreateGroupBtn')[0];
            CreateGroupBtn.onclick = function () {
                ChangeGroup('ChoosedGroupUsers', 'CreateGroupName', 'POST');
            };
        });
    });
}

function EditGroup() {
    var GroupListStyle = document.getElementsByClassName('GroupListStyle');
    $('.GroupListStyle').each(function (index) {
        $(this).children('div').children('button').click(function () {
            /*Request All Data*/
            var url = 'users/brief_infos';
            var Token = $.cookie('token');
            var AllUserListDate = AjaxGetList(url, 'GET', Token);
            var MembersArray = new Array();

            /*显示modal*/
            $('#UpdateGroup').modal('show');
            $('#UpdateGroup').on('shown.bs.modal', function () {
                GetEditUserList();
                $('.UpdateGroupBtn').click(function () {
                    var GroupUsersID = new Array();
                    var ChoosedGroupEditor = $('#UpdateGroupUsers').tagEditor3parments('getTags')[0].editor;
                    var GroupName = document.getElementsByClassName('UpdateGroupName')[0];
                    if (GroupName.value == "") {
                        GroupName.style.border = '2px solid darkred';
                        console.log("Group Name is Null");
                    } else {
                        GroupName.style.border = '1px solid #ccc';
                        $('li', ChoosedGroupEditor).each(function (index) {
                            var li = $(this);
                            var Length = (li.find('.tag-editor-tag')).length;
                            if (Length > 0) {
                                var id = (li.find('.tag-editor-tag'))[0].getAttribute('id');
                                var title = (li.find('.tag-editor-tag'))[0].getAttribute('data-original-title');
                                var value = (li.find('.tag-editor-tag'))[0].getAttribute('value');
                                GroupUsersID.push(id);
                            }
                        });

                        if (GroupUsersID.length == 0) {
                            /*没有填写用户列表怎么处理*/
                            console.log("Group Users ID is Null");
                        } else {
                            var url = 'user_groups';
                            var Token = $.cookie('token');
                            var ID = $('.UpdateGroupName').attr('id');
                            var CreateUsersGroups = {
                                id: ID,
                                name: GroupName.value,
                                users: GroupUsersID
                            };

                            console.log(CreateUsersGroups);
                            AjaxCreateGroups(url, 'PUT', CreateUsersGroups, Token);
                        }
                    }
                });
            });

            function GetEditUserList() {
                var ID = GroupListStyle[index].getElementsByClassName('GroupNameStyle')[0].getAttribute('id');
                var Name = GroupListStyle[index].getElementsByClassName('GroupNameStyle')[0].getElementsByTagName('h2')[0].innerHTML;
                var Members = GroupListStyle[index].getElementsByClassName('GroupMembersStyle')[0].innerHTML;

                MembersArray = Members.split(',');
                $('.UpdateGroupName').val(Name);
                $('.UpdateGroupName').attr('id', ID);

                RemoveAllTags('UpdateGroupUsers');

                /*如果相同，删除*/
                for (var i = 0; i < MembersArray.length; i++) {
                    for (var j = 0; j < AllUserListDate.length; j++) {
                        if (MembersArray[i] == AllUserListDate[j].nick_name) {
                            $('#UpdateGroupUsers').tagEditor3parments('addTag', AllUserListDate[j].nick_name, AllUserListDate[j].email, AllUserListDate[j].id);
                            /*去掉相同的。*/
                            AllUserListDate.splice(j, 1);
                            break;
                        } else {
                            $('.GroupList ul li').remove();

                            $('<li><div class="CheckBox" groupuserlist style="margin-left: -20px"><input type="checkbox" name="AllGroupUsersList" title="' + AllUserListDate[j].email + '" value="' + AllUserListDate[j].nick_name + '" id="' + AllUserListDate[j].id + '"/>' +
                                '<label for="' + AllUserListDate[j].id + '"></label>' +
                                '<p data-toggle="tooltip" data-placement="bottom" title="' + AllUserListDate[j].email + '">' + AllUserListDate[j].nick_name + '</p></div></li>').appendTo('.GroupList>ul').ready(function () {
                            });
                        }
                        ChooseGroupUserList('UpdateGroupUsers');
                    }
                }
            }
        });
    });
}

function RemoveAllTags(ID) {
    var tags = $('#' + ID).tagEditor3parments('getTags')[0].tags;
    for (var i = 0; i < tags.length; i++) {
        $('#' + ID).tagEditor3parments('removeTag', tags[i]);
    }
}

function ChangeGroup(ID, NameClass, type) {
    var GroupUsersID = new Array();
    var ChoosedGroupEditor = $('#' + ID).tagEditor3parments('getTags')[0].editor;
    var GroupName = document.getElementsByClassName(NameClass)[0];
    if (GroupName.value == "") {
        GroupName.style.border = '2px solid darkred';
    } else {
        GroupName.style.border = '1px solid #ccc';
        $('li', ChoosedGroupEditor).each(function (index) {
            var li = $(this);
            var Length = (li.find('.tag-editor-tag')).length;
            if (Length > 0) {
                var id = (li.find('.tag-editor-tag'))[0].getAttribute('id');
                var title = (li.find('.tag-editor-tag'))[0].getAttribute('data-original-title');
                var value = (li.find('.tag-editor-tag'))[0].getAttribute('value');
                GroupUsersID.push(id);
            }
        });
        if (GroupUsersID.length == 0) {
            /*没有填写用户列表怎么处理*/

        } else {
            var url = 'user_groups';
            var Token = $.cookie('token');
            var CreateUsersGroups = {
                name: GroupName.value,
                users: GroupUsersID
            };
            AjaxCreateGroups(url, type, CreateUsersGroups, Token);
        }
    }
}