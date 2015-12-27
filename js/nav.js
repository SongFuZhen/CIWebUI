/**
 * Created by zero on 2015/12/24.
 */

window.onload = function () {

    var Li = document.getElementsByClassName('topNav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
    Li[0].onclick = function () {
        //GetMyKPIPage('MyKPI/MyKPI.html');
        //window.location.href = 'MyKPI/MyKPI.html';
    };

    Li[1].onclick = function () {
    };

    Li[2].onclick = function () {
        //GetMyKPIPage('MyTasks/MyTasks.html');
        //window.location.href = 'MyTasks/MyTasks.html';
    };

    var Nickname = document.getElementsByClassName('nickname')[0].getElementsByTagName('h4')[0];
    Nickname.onclick = function () {
        $(document).ready(function () {
            $('.shownickname').slideToggle(500);
        })
    };

    var NicknameContent = document.getElementsByClassName('nicknamecontent')[0];
    NicknameContent.onclick = function () {
        $(document).ready(function () {
            $('.shownickname').slideUp(600);
        })
    };

    var Icons = document.getElementsByClassName('icons')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
    Icons[0].onclick = function () {
        $(document).ready(function () {
            $('.NavTaskShow').slideToggle(600);
        })
    };

    Icons[1].onclick = function () {
        $(document).ready(function () {
            $('.NavSystemShow').slideToggle(600);
        })
    };

    Icons[2].onclick = function () {
        $(document).ready(function () {
            $('.NavAbnormalShow').slideToggle(600);
        })
    };
    /*   var Li = document.getElementsByClassName('topNav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
     for (var i = 0; i < Li.length; i++) {
     Li[i].onclick = (function (i) {
     return function () {
     var ATag = Li[i].getElementsByTagName('a')[0];
     ATag.setAttribute('class', 'ClickLi')
     };
     }(i));
     }*/
//旋转图片
    var img = document.getElementsByClassName('topNav')[0].getElementsByTagName('img')[0];
    img.onmousemove = function () {
        img.style.transform = 'rotate(90deg)';
    };
    img.onmouseout = function () {
        img.style.transform = 'rotate(360deg)';
    }
};