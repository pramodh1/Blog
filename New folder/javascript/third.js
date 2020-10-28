


$(document).ready(function()
{
    $(window).scroll(function()
    {
        if(this.scrollY > 20)
        {
            $('.nav1').addClass("sticky");
        }else{
            $('.nav1').removeClass("sticky");
        }
    });
  

   
});
var typed = new Typed(".type", {
    strings: ["WebDeveloper", "Programmer", "Designer", "Fullstackdevop"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

