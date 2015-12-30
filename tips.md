//click others close mask.
<script type="text/javascript">
$(function(){
 $(document).bind("click",function(e){
  var target  = $(e.target);
  if(target.closest(".pop").length == 0){
   $(".pop").hide();
  }
 }) 
})
</script>


//Get click which li
var Li = document.getElementsByClassName('topNav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
     for (var i = 0; i < Li.length; i++) {
     Li[i].onclick = (function (i) {
     return function () {
     var ATag = Li[i].getElementsByTagName('a')[0];
     ATag.setAttribute('class', 'ClickLi')
     };
     }(i));
     }

