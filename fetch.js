let javoblar = [], ball = 0, fanName;
let i = 0;
setTimeout(() => {
     
     $(document).ready(() => {
     // vaqt buyicha cheklovlar
          $(".letStart").click(function() {
     
               // Scroll animatsiyasi kodlari
               let widthScroll = 101;
               setInterval(() => {
                    widthScroll -= 0.1;
                    if(widthScroll <= 0) {
                         i = 10;
                    }
               }, 100);
          })
     // fan tanlangan vaqtda hos API ni olish
     $('.fanName').click(function() {
          fanName = $(this).text();
          $('.fanlarMenyusi').addClass('d-none');
          $('.Mname').addClass('d-none');
          $('.Text').removeClass('d-none');
          $('html, body').css('overflow', 'hidden');
          $('.isWrapp').css("height", "100vh");
          
          
          fetch(`http://localhost:5000/yangisi/${fanName}/`)
          .then(res => res.json())
          .then(quiz => {
               
          $('.quizSavol').text(quiz[0].savol);
          $('#variant1 p').text(quiz[0].javob);
          $('#variant2 p').text(quiz[0].variant1);
          $('#variant3 p').text(quiz[0].variant2);
          $('#variant4 p').text(quiz[0].variant3);

          // javoblarni olish qiyin yulda
          $('.variant').click(function() {
               javoblar.push($(this).text());
          })
          
          $('.variant').click(function() {
               // variantlarni random qilish
               
               let massiv = [];
               let vaqtincha = Math.floor(Math.random() * 4 + 0), boolian = true;
               let nimadir = ['javob', 'variant1', 'variant2', 'variant3'];
               for(let i = 0; 4 > i; i ++) {
                    boolian = true;
                    while (boolian) {
                         if(massiv.includes(nimadir[vaqtincha])) {
                              vaqtincha = Math.floor(Math.random() * 4 + 0);
                         }
                         else {
                              massiv[i] = nimadir[vaqtincha];
                              boolian = false;
                         }
                    }   
               }
               // savollar animatsiyasi
               
               setTimeout(() => {
                    $('.quizSavol').css({'transform': 'translateY(-75%)', 'opacity': '0'});
               }, 200);
               
               setTimeout(() => {
                    $('.quizSavol').css({'transform': 'translateY(-10%)', 'opacity': '1'});
                    $('.quizSavol').text(quiz[i].savol);
               }, 500);
               // buttonlar animatsiyasi
               setTimeout(() => {
                    $(`#variant1 p`).css({'transform': 'translateY(-100%)', 'opacity': '0'});
                    $(`#variant2 p`).css({'transform': 'translateY(-100%)', 'opacity': '0'});
                    $(`#variant3 p`).css({'transform': 'translateY(-100%)', 'opacity': '0'});
                    $(`#variant4 p`).css({'transform': 'translateY(-100%)', 'opacity': '0'});
               }, 200);
               
               setTimeout(() => {
                    $(`#variant1 p`).css({'transform': 'translateY(-10%)', 'opacity': '1'});
                    $(`#variant1 p`).text(quiz[i][massiv[0]]);

                    $(`#variant2 p`).css({'transform': 'translateY(-10%)', 'opacity': '1'});
                    $(`#variant2 p`).text(quiz[i][massiv[1]]);

                    $(`#variant3 p`).css({'transform': 'translateY(-10%)', 'opacity': '1'});
                    $(`#variant3 p`).text(quiz[i][massiv[2]]);

                    $(`#variant4 p`).css({'transform': 'translateY(-10%)', 'opacity': '1'});
                    $(`#variant4 p`).text(quiz[i][massiv[3]]);
               }, 500);
               
               if (i >= quiz.length - 1) {
                    $(".isWrapp").addClass("d-none");
                    $("#javobTahlil").removeClass("d-none");
                    $("body, html").css("overflow-y", "visible");
                    let colorcha = 200;
                    for(let j = 0; quiz.length > j; j++) {
                         $(".javobTablo").append(`
                         <div class="card" style="background-color: rgb(169, 24, ${colorcha}, 0.5);">
                         <p>${j + 1} question: ${quiz[j].savol}</p>
                         <p class="javob${j}">Your answeer: ${javoblar[j]}</p>
                         <p>True answeer: ${quiz[j].javob}</p>
                         </div>
                         `);
                         if(quiz[j].javob == javoblar[j]) {
                              ball ++;
                              $(`.javob${j}`).addClass('tugriJavob');
                         } else {
                              $(`.javob${j}`).addClass('hatoJavob');
                         }
                         colorcha -= 6;
                    }
                    $('.resultat').text(`Your result ${ball}`);
                    return;
               }
               
               i ++;
          })
     })
     // })
     
})

})
}, 1000);