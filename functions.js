function uyeKaydet() {
    var kadi = $("#kadi").val();
    if (kadi != "") {
        const random = Math.random() * 1000000000;
        var userKey = firebase.database().ref("users/").push().random; //Rastgele bir userkey gönderir.
        firebase.database().ref("users/" + userKey).set({
            username: kadi,
            kulid: userKey
        });
        $("#girisEkrani").hide();
        $("#chatEkrani").show();
        //------  EKLEYİNİZ ------- //
        chatYukle();
       // setInterval(function(){ $("#mesajAlani").html(""); chatYukle(); }, 900);
        //------ EKLEYİNİZ ------- //
    } else {
        alert("Kullanıcı adını boş bırakmayınız!");
    }
}

function mesajGonder() {
    var mesaj = $("#mesaj").val();
    var kadi = $("#kadi").val();
    if (kadi != "" && mesaj != "") {
        var tarih = new Date();
        var messageKey = firebase.database().ref("chats/").push().random; //Rastgele bir mesaj keyi gönderir.
        firebase.database().ref("chats/" + messageKey).set({
            message: mesaj,
            from: kadi,
            tarih: tarih.getTime()
        });
        //Otomatik olarak en alt kısma odakanılır
        $("#mesaj").val(''); //Mesaj inputunu temizleyelim
    } else {
        alert("Lütfen boş alan bırakmayınız!");
    }
}

function chatYukle() {
    var query = firebase.database().ref("chats");
    var kadi = $("#kadi").val();
    query.on('value', function (snapshot) {
        $("#mesajAlani").html("");
        snapshot.forEach(function (childSnapshot) {
            var data = childSnapshot.val();
            if (data.from == kadi) {
                //Mesaj bizim tarafımızdan gönderilmişse bu alan çalışacak
                var mesaj = `<div class="d-flex justify-content-end">
                <div class="alert alert-info" role="alert">
                    `+ data.message + ` <b>@` + data.from + `</b>
                      </div>
                 </div>`;
                $("#mesajAlani").append(mesaj);
            } else {
                //Mesaj başkası tarafından gönderilmişse bu alan çalışacak
                var mesaj = `<div class="d-flex">
                                    <div class="alert alert-dark" role="alert">
                                      <b>@`+ data.from + `</b> ` + data.message + `
                                  </div>
                           </div>`;
                $("#mesajAlani").append(mesaj);
            }
            var kulanicigiris = $(`<div class="card-header">`+ "<b>" + kadi + "<b>"+ "Olarak giriş yaptınız. | NinthChat" + `</div>`)
            $("#card-header").text(kullanicigiris);
            $(".card-body").scrollTop($('.card-body')[0].scrollHeight - $('.card-body')[0].clientHeight + 10);
        });
        
    });
}

