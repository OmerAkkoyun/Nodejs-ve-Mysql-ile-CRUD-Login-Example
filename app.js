var express = require("express"); //html sayfa işlemleri için
var app = express();
var path = require("path");//klasör yolu gösterirken gerekli.
var controller = require("../PERSONEL/controller/personelController"); //kontroller nesnesi
var mysql = require("mysql");

var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var app = express();
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());


var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts); // Şablonu aktif ettik.
app.set('view engine', 'ejs'); //görüntü motorun ejs olacağını belirledik.
app.set('views', (__dirname, './views')); //görüntülerin(ejs) olduğu klasörün yolunu söyledik.

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false})); //Form elemanları Post verileri için kullanılıcak
app.use(bodyParser.json()); //Json objeleri Post verileri için kullanılıcak

app.use('/public', express.static(path.join(__dirname, 'public'))); //public klasörünündekileri okuyabiliriz.

/////////////////////////////////////////////////////////////////////////////////////////////////


//Anasayfa
app.get('/', controller.index); 

//Personel Tablosu
app.get("/personeller",controller.personeller);

//personel düzenle GET ve POST yönlendirme
app.get("/personelDuzenle",controller.personelDuzenle);
app.post("/personelDuzenle",controller.personelDuzenlePOST);

// kayit get ve post yönlendirme 
app.get('/kayit', controller.kayit);
app.post('/kayit', controller.kayitPOST);


//giris get ve post yönlendirme 
app.get('/giris',controller.giris);
app.post('/giris',controller.girisPOST);

//personel silGET ve POST yönlendirme
app.get('/personelSil',controller.personelSil);
app.post('/personelSil',controller.personelSil);

//çıkış yönlendirme
app.get('/cikis',controller.cikisYap);


app.listen(5000)