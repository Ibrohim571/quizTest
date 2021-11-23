
$(document).ready(() => {
     $('.letStart').click(() => {
          $('.Text').css(`transform`, `rotate(${-18}deg)`);

          setTimeout(() => {
               $('.Text').css('bottom', '-1000px');
               $('.Text').css('transition', '0.15s ease-in');
          }, 1000);
          
          setTimeout(() => {
               $('.Text2').css('bottom', '24%');   
          }, 1200);

          // Scroll animatsiyasi kodlari
          $("#progresscha").removeClass("d-none");
          let widthScroll = 101;
          setInterval(() => {
               $(".progress-bar").css({"width": `${widthScroll}%`});
               widthScroll -= 0.1;
               // if(widthScroll < 0) {
               //      alert("internetdan bog'liq muammo");
               // }
               if(widthScroll <= 50) {
                    $(".progress-bar").removeClass("bg-success");
                    $(".progress-bar").addClass("bg-warning");
               }
               if(widthScroll <= 30) {
                    $(".progress-bar").removeClass("bg-warning");
                    $(".progress-bar").addClass("bg-danger");
               }
          }, 100);
          // tugadi
     })
})