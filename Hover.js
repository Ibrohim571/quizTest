
let pcha = 2;
$(document).ready(function() {
     $('.variant').click(function(event) {
          $('.sanagich p').text(`${pcha} / 10`);
          pcha += 1;
     })
})