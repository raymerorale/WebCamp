
(function() {
    'use strict';
    window.addEventListener('load', function() {
      var forms = document.getElementsByClassName('needs-validation');
     
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
        var password = $("#password").val();
        var confirmpassword = $("#confirm_password").val();
            if(password === confirmpassword){ 
                $("#validate").removeClass("error");
                form.classList.add('was-validated');
                $("#confirm_password").removeClass("error-text");
                $("#validate").html("password matched"); 
            }
            else{
                form.classList.add('was-validated');
                $("#validate").html("password should match");
                $("#validate").addClass("error");
                $("#confirm_password").addClass("error-text");
                event.preventDefault();
                event.stopPropagation();   

            }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();
window.addEventListener('load', function() {
    if($("#password").val() === '')
        $("#confirm_password").prop('disabled', true);
});
$("#password").change(function() {
    if($("#password").val() !== '')
        $("#confirm_password").prop('disabled', false);
    else
        $("#confirm_password").prop('disabled', true);

});

$("#star1").click(function(){
    $(star1).addClass('fas');
    $(star2).removeClass('fas');
    $(star3).removeClass('fas');
    $(star4).removeClass('fas');
    $(star5).removeClass('fas');
    $(starId).val(1);
})
$("#star2").click(function(){
    $(star1).addClass('fas');
    $(star2).addClass('fas');
    $(star3).removeClass('fas');
    $(star4).removeClass('fas');
    $(star5).removeClass('fas');
    $(starId).val(2);
})
$("#star3").click(function(){
    $(star1).addClass('fas');
    $(star2).addClass('fas');
    $(star3).addClass('fas');
    $(star4).removeClass('fas');
    $(star5).removeClass('fas');
    $(starId).val(3);
})
$("#star4").click(function(){
    $(star1).addClass('fas');
    $(star2).addClass('fas');
    $(star3).addClass('fas');
    $(star4).addClass('fas');
    $(star5).removeClass('fas');
    $(starId).val(4);
})
$("#star5").click(function(){
    $(star1).addClass('fas');
    $(star2).addClass('fas');
    $(star3).addClass('fas');
    $(star4).addClass('fas');
    $(star5).addClass('fas');
    $(starId).val(5);
})
$("#Reset").click(function(){
    $(star1).removeClass('fas');
    $(star2).removeClass('fas');
    $(star3).removeClass('fas');
    $(star4).removeClass('fas');
    $(star5).removeClass('fas');
    $(starId).val(0);
    $(comment).val('');
})

$("#Estar1").click(function(){
    $(Estar1).addClass('fas');
    $(Estar2).removeClass('fas');
    $(Estar3).removeClass('fas');
    $(Estar4).removeClass('fas');
    $(Estar5).removeClass('fas');
    $(EstarId).val(1);
})
$("#Estar2").click(function(){
    $(Estar1).addClass('fas');
    $(Estar2).addClass('fas');
    $(Estar3).removeClass('fas');
    $(Estar4).removeClass('fas');
    $(Estar5).removeClass('fas');
    $(EstarId).val(2);
})
$("#Estar3").click(function(){
    $(Estar1).addClass('fas');
    $(Estar2).addClass('fas');
    $(Estar3).addClass('fas');
    $(Estar4).removeClass('fas');
    $(Estar5).removeClass('fas');
    $(EstarId).val(3);
})
$("#Estar4").click(function(){
    $(Estar1).addClass('fas');
    $(Estar2).addClass('fas');
    $(Estar3).addClass('fas');
    $(Estar4).addClass('fas');
    $(Estar5).removeClass('fas');
    $(EstarId).val(4);
})
$("#Estar5").click(function(){
    $(Estar1).addClass('fas');
    $(Estar2).addClass('fas');
    $(Estar3).addClass('fas');
    $(Estar4).addClass('fas');
    $(Estar5).addClass('fas');
    $(EstarId).val(5);
})
$("#EditReset").click(function(){
    $(Estar1).removeClass('fas');
    $(Estar2).removeClass('fas');
    $(Estar3).removeClass('fas');
    $(Estar4).removeClass('fas');
    $(Estar5).removeClass('fas');
    $(EstarId).val(0);
    $(Ecomment).val('');
})
$(HighestRated).click(function(){
    $(sortby).val('Highest Rated');
})
$(MostReviewed).click(function(){
    $(sortby).val('Most Reviewed');
})
$(LowestPrice).click(function(){
    $(sortby).val('Lowest Price');
})
$(HighestPrice).click(function(){
    $(sortby).val('Highest Price');
})
// mybutton = document.getElementById("myBtn");

// // When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

// // When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//   currentYOffset = self.pageYOffset;
//   initYOffset = currentYOffset;

//   var intervalId = setInterval(function(){
//   currentYOffset -= initYOffset*0.05; 
//   document.body.scrollTop = currentYOffset ;
//   document.documentElement.scrollTop = currentYOffset;

//     if(self.pageYOffset == 0){
//       clearInterval(intervalId);
//     }
//   }, 20);

// } 


