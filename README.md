# Nodejs ve Mysql ile Crud,Login işlemleri 
Bu projede Login olma işlemleri ve **nodejs** kullanarak **mysql** veritabanına veri ekleme,veri güncelleme,veri listeleme ve veri silme gibi işlemleri yapıldı.
Login olmadan verileri göremezsiniz,**express-session** sayesinde giriş yapılıp yapılmadığı kontrolünden sonra veri ekleme, silme ,güncelleme ve listeleme özelliklerine erişilebilir.
<hr>

## Ekran Görüntüleri 
#### Giriş ekranı
![giris](https://user-images.githubusercontent.com/33864154/63190647-5450e000-c06f-11e9-88ee-ff54a7d75245.png) <br>

#### Login olmadan personel listesini göremeyiz.
![oncegiris](https://user-images.githubusercontent.com/33864154/63190648-54e97680-c06f-11e9-8588-d87e66d4a25a.png)

#### Login olduktan sonra listeye yönlendirecek.
![liste](https://user-images.githubusercontent.com/33864154/63190650-54e97680-c06f-11e9-8e73-5dbfcf73c495.png)
#### Eğer veritabanı işlemlerinde hata oluşursa..
Buraya daha uygun bir görsel ve açıklama yapabilirsiniz..
![veritabaniHata](https://user-images.githubusercontent.com/33864154/63190649-54e97680-c06f-11e9-9601-4590c9ddf5cd.png)


#### Güncelleme ve personel silme
![guncellesil](https://user-images.githubusercontent.com/33864154/63190651-55820d00-c06f-11e9-835c-748206d85d47.png)

<hr>
<br>

## Dahili

💜 [Bootstrap] (https://getbootstrap.com) - Bootstrap <br>
🔶 [Jquery] (https://jquery.com) - Jquery<br>
📘 [FontAwesome] (https://fontawesome.com) - FontAwesome<br>


### Kurulum
💚Nodejs :https://nodejs.org/en/ 
projede kullanılan version v10.16.0 LTS

uygulama klasörü içindeyken 
cmd <code> npm install</code><br>
package.json içindeki **dependencies** leri node_modules klasörüne indirecektir. <br>

package.json dependenciesler ;<br>
```
"dependencies": {
    "body-parser": "^1.19.0",
    "connect-flash": "^0.1.1",
    "cookie-parser": "^1.4.4",
    "cookieparser": "^0.1.0",
    "ejs": "^2.6.2",<br>
    "express": "^4.17.1",
    "express-ejs-layouts": "^2.5.0",
    "express-flash": "0.0.2",
    "express-session": "^1.16.2",
    "mysql": "^2.17.1",
    "nodemon": "^1.19.1",
    "path": "^0.12.7",
    "popups": "^1.1.3",
    "session": "^0.1.0",
    "utf8": "^3.0.0"
  },
 
```
<hr>

## Test Etme
### 1
Public klasöründe bulunan '**dbConfig.js**' isimli dosyanın içine, sizin local mysql veritabanı özelliklerini girin.<br><br>
Projede bulunan : <br>
//Veritabanına Bağlantı Ayarlarım.<br>
```
var VeriTabaniAyarlar = {<br>
    host: '127.0.0.1',<br>
    user: 'root',<br>
    password: '',<br>
    database: 'dbpersonel',<br>
    port: '3306'<br>
};
module.exports = {VeriTabaniAyarlar: VeriTabaniAyarlar}; <br><br>
```
### 2 
Sorgularda hata almamak için ; <br>
**controller** > içindeki **personelController.js** dosyasının içindeki veritabanı tablo isimlerini, sizin myssql veritabanın tablo isimleri ile değiştirin.<br>

### 3 
```
<code> npm start </code>
```


<hr>




## Teşekkürler

* Eksiklerim olabilir junior developer olarak kendimi geliştirmeye çalışıyorum ,<br> öğrendiklerim ile küçükte olsa projeler yapmaya çalşıyorum.
* İyi Çalışmalar :)



