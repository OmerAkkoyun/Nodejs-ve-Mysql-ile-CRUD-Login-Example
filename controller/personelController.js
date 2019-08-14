//00000000000000000000000000000000000  -importlar-  0000000000000000000000000000000000000000000000000
var express = require('express');
var app = express();


var mysql = require("mysql"); //mysql dahil ettik
var config = require("../public/dbConfig"); //veritabani özellikleri, public içinde.


var session = require('express-session');
app.use(session({
    'secret': "nodejsDersler"
}));


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
})); //Form elemanları Post verileri için kullanılıcak
app.use(bodyParser.json()); //Json objeleri Post verileri için kullanılıcak
//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000


//index GET
module.exports.index = function (req, res) {
    res.render(__dirname + "../../views/index.ejs")
};


//giris GET 
module.exports.giris = function (req, res) {


    if (req.session.admin) { //eğer admin oluşmuşsa post giris ile
        res.render(__dirname + "../../views/cikisyap.ejs")
    } else {
        res.render(__dirname + "../../views/giris.ejs")
    }

};


//giris POST 
module.exports.girisPOST = function (req, res) {
    const k_adi = req.body.k_adi;
    const sifre = req.body.sifre;

    var baglanti = mysql.createConnection(config.VeriTabaniAyarlar); //ayarlara göre bağlantı değişkeni.
    baglanti.connect(function (hata) {
        if (!hata) {
            console.log("Giriş Post için Veri tabanına başarıyla bağlandı!");
        } else {
            console.log(" Giriş Post için Veri tabanına Bağlanamadı !");
        }
    }); // bağlan


    sorgu = "select * from admins where (k_adi='" + k_adi + "') and (parola='" + sifre + "')";
    baglanti.query(sorgu, function (hata, sonuc) {

        if (hata) {
            console.log("\n\n\n Hata Oluştu! \n\n\n");
            console.log(hata);
            res.render(__dirname + "../../views/vterror.ejs")


        } else {

            if (sonuc==0) // sonuç yoksa yanlış k_adi ve şifre girmiştir.
            {
                req.flash('yanlisgiris', 'Yanlış kullanıcı adı veya şifre');
                res.locals.message = req.flash();
                res.render(__dirname + "../../views/giris.ejs")
            } else {

                req.session.admin = k_adi;
                res.redirect("/personeller");
            }
        }
    });
};


//Çıkış
module.exports.cikisYap = function (req, res) {

    delete req.session.admin;
    res.redirect("/giris");
};


//Personel Listele GET
module.exports.personeller = function (req, res) {
    if (req.session.admin) {

        var baglanti = mysql.createConnection(config.VeriTabaniAyarlar); //ayarlara göre bağlantı değişkeni.
        baglanti.connect(function (hata) {
            if (!hata) {
                console.log("Personelleri Listelemek için Veri tabanına başarıyla bağlandı!");
            } else {
                console.log(" Personelleri Listelemek için Veri tabanına Bağlanamadı !");
            }
        }); // bağlan

        sorgu = "select * from personels"; // --> tabloadını girdik ,tüm verileri çek.
        baglanti.query(sorgu, function (hata, sonuc, detay) {
            if (hata) {
                console.log("\n\n\n Hata Oluştu! \n\n\n");
                console.log(hata);
                res.render(__dirname + "../../views/vterror.ejs")
            } else {
                console.log("Personel Listeleme Başarılı");
                res.render(__dirname + "../../views/personeller.ejs", {
                    sonuclar: sonuc
                });
            }
        });
        baglanti.end(); // kapat


    } else {

        req.flash('giris', 'Önce Giriş Yapmalısın!');
        res.locals.message = req.flash();
        res.render(__dirname + "../../views/giris.ejs");

    }

};


//Personel  Kayit GET
module.exports.kayit = function (req, res) {

    if (req.session.admin) {
        res.render(__dirname + "../../views/kayit.ejs");
    } else {
        req.flash('giris', 'Önce Giriş Yapmalısın!');
        res.locals.message = req.flash();
        res.render(__dirname + "../../views/giris.ejs");
    }
};


//Personel Yeni Kayıt POST 
module.exports.kayitPOST = function (req, res) {
    var baglanti = mysql.createConnection(config.VeriTabaniAyarlar);
    baglanti.connect(function (hata) {
        if (!hata) {
            console.log("PERSONEL KAYDI için Veri tabanına başarıyla bağlandı!");
        } else {
            console.log(" PERSONEL KAYDI için Veri tabanına Bağlanamadı !");
        }
    }); // bağlan

    var isim = req.body.isim;
    var soyisim = req.body.soyisim;
    var yas = req.body.yas;
    var meslek = req.body.meslek;
    var k_adi = req.body.k_adi;
    var sifre = req.body.sifre;
    var sorgu = "INSERT INTO personels (isim,soyisim,yas,meslek,k_adi,parola) VALUES('" + isim + "','" + soyisim + "','" + yas + "','" + meslek + "','" + k_adi + "','" + sifre + "')"; // --> kaydedilecek personel
    baglanti.query(sorgu, function (hata) {
        if (hata) {
            console.log("\n\n\nKayıt Oluşturulurken Hata Meydana Geldi! \n\n\n");
            console.log(hata);
            res.render(__dirname + "../../views/vterror.ejs")
        } else {
            console.log("Yeni Kayıt Başarılıyla Eklendi ...\n\n ");

            req.flash('success', 'Veritabanına Eklendi.');
            res.locals.message = req.flash();

            res.render(__dirname + "../../views/kayit.ejs", {});
        }
    });
    baglanti.end(); // kapat
};


//Personel Güncelle GET /Düzenleme Butonu 
module.exports.personelDuzenle = function (req, res) {


    if (req.session.admin) {

        var id = parseInt(req.param("id"));
        var baglanti = mysql.createConnection(config.VeriTabaniAyarlar);
        baglanti.connect(function (hata) {
            if (!hata) {
                console.log("Personel düzenlemek için Veri tabanına başarıyla bağlandı!");
            } else {
                console.log("Personel düzenlemek için  Veri tabanına Bağlanamadı !");
            }
        });

        sorgu = "select * from personels where id='" + id + "' "; // --> tabloadını girdik ,tüm verileri çek.
        baglanti.query(sorgu, function (hata, sonuc, detay) {
            if (hata) {
                console.log("\n\n\n Personel düzenlemek için Sorgu Esnasında Hata Oluştu! \n\n\n" + hata);
                res.render(__dirname + "../../views/vterror.ejs")
            } else {
                console.log("Personel düzenleme: Başarılı");

                if (id === parseInt(id, 10)) { //girilen id integer değilse..

                    res.render(__dirname + "../../views/personelDuzenle.ejs", {
                        sonuclar: sonuc,

                    });
                } else {
                    res.send("Böyle bir kullanıcı bulunamadı!(int)");
                }
            }
        });
        baglanti.end(); // kapat


    } else {


        req.flash('giris', 'Önce Giriş Yapmalısın!');
        res.locals.message = req.flash();
        res.render(__dirname + "../../views/giris.ejs");
    }



};

//Personel Güncelleme POST 
module.exports.personelDuzenlePOST = function (req, res) {

    var id = parseInt(req.param("id"));
    var baglanti = mysql.createConnection(config.VeriTabaniAyarlar);
    baglanti.connect(function (hata) {
        if (!hata) {
            console.log("Personel Güncelleme için Veri tabanına başarıyla bağlandı!");
        } else {
            console.log(" Personel Güncelleme için Veri tabanına Bağlanamadı !");
        }
    }); // bağlan

    var isim = req.body.isim;
    var soyisim = req.body.soyisim;
    var yas = req.body.yas;
    var meslek = req.body.meslek;
    var k_adi = req.body.k_adi;
    var sifre = req.body.sifre;


    var sorgu = "UPDATE personels SET isim='" + isim + "',soyisim='" + soyisim + "',yas='" + yas + "',meslek='" + meslek + "',k_adi='" + k_adi + "',parola='" + sifre + "' WHERE id= '" + id + "'"; // --> kaydedilecek personel
    baglanti.query(sorgu, function (hata) {
        if (hata) {
            console.log("\n\n\nKayıt Oluşturulurken Hata Meydana Geldi! \n\n\n");
            console.log(hata);
            res.render(__dirname + "../../views/vterror.ejs")
        } else {
            console.log("Güncelleme Başarılı oldu..\n\n ");

            res.redirect("/personeller");

        }
    });
    baglanti.end(); // kapat
};

//Personel Sil 
module.exports.personelSil = function (req, res) {


    if (req.session.admin) {

        var id = parseInt(req.param("id"));
        var baglanti = mysql.createConnection(config.VeriTabaniAyarlar);
        baglanti.connect(function (hata) {
            if (!hata) {
                console.log("PERSONEL Silmek için Veri tabanına başarıyla bağlandı!");
            } else {
                console.log(" PERSONEL Silmek için Veri tabanına Bağlanamadı !");
            }
        }); // bağlan
        var sorgu = " Delete from personels WHERE id =" + id; // --> silinecek personel;
        baglanti.query(sorgu, function (hata) {
            if (hata) {
                console.log("\n\n\nPersonel Silinirken Hata Meydana Geldi! \n\n\n");
                console.log(hata);
                res.render(__dirname + "../../views/vterror.ejs")
            } else {
                console.log("Silme Başarılı..\n\n ");
                res.redirect("/personeller"); // personel tablosuna yönlendirdik.

            }
        });
        baglanti.end(); // kapat


    } else {

        req.flash('giris', 'Önce Giriş Yapmalısın !');
        res.locals.message = req.flash();
        res.render(__dirname + "../../views/giris.ejs");

    }



};