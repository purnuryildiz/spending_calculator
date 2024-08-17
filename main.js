const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const statusCheck = document.querySelector("#status-input");
const formBtn = document.querySelector(".ekle-btn");

const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const selectFilter = document.querySelector("#select-filter");
//
//
//
//İzleme
formBtn.addEventListener("click", addExpense);
liste.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);
statusCheck.addEventListener("click", function () {
  setTimeout(() => {
    this.checked = false;
  }, 1800); // 100 milisaniye sonra checkbox'ı boş hale getirir
});
//Toplam state

let toplam = 0;
function updateToplam(fiyat) {
  //parseInt methoduyla string number a çevrilebilir ya da Number methoduyla.

  toplam += parseInt(fiyat);
  toplamBilgi.innerText = toplam;
}

//Harcama Oluşturma
function addExpense(e) {
  //Bu işlemlerden sonra console da butona tiklandi yazıyor ve sayfa yenileniyor bunun nedeni formun bir özelliğinden kaynaklanıyor . Eğer bir form elemenının içerisindeki elemana tıklanıldıysa ,  sayfayı default olarak yeniliyor .Bunu engellemek için , öncelikle  addExpense methoduna gelen event i (e) almamız gerekir. Daha sonra JavaScript tarafınfan sağlanan sayfa yenileme özelliğini kaldırılması gerekir.
  e.preventDefault();
  //eğer koşulu sağlarsa fonksiyonu durdurmak için kullanılan komut ;return

  if (!fiyatInput.value || !harcamaInput.value) {
    alert("Fill in the blanks.");
    return;
  }

  //Butona tıklandığında bunların value larını almak için

  //div oluşturma ya da herhangi bir HTML elemanı oluşturuken kullanılan komut: document.createElement

  //div oluşturma
  const harcamaDiv = document.createElement("div");
  //class oluşturma
  harcamaDiv.classList.add("harcama");
  if (statusCheck.checked) {
    harcamaDiv.classList.add("payed");
  }

  //içeriğini ayarlama
  //Bunu tanımlarken string ile tanımlama yaptığımızda birden çok satırda tanımlayamıyoruz. Ve içerisine javascript tarafınfan kodlar yazamıyoruz(örneğin javascripteki bir objeyi , değişkeni tanımlayamıyoruz.) . Bu yüzden bunun yerine normal string değil de backtick kullanmamız gerekir.;Literal Template
  harcamaDiv.innerHTML = `
  <h2>${harcamaInput.value}</h2>
  <h2 id="value" >${fiyatInput.value}</h2>
  <div class="buttons">
    <img id="payment" src="/images/payment.png" alt="">
    <img  id="remove" src="/images/delete.png" alt="">
  </div>`;

  //oluşan harcamayı html e gönderme (listeye ekleme)
  liste.appendChild(harcamaDiv);

  updateToplam(fiyatInput.value);

  //formu temizleme
  harcamaInput.value = " ";
  fiyatInput.value = " ";
}

//listeye tıklanma olayını yönetme

function handleClick(e) {
  const element = e.target;
  if (element.id === "remove") {
    //tıklanılan sil butonunun kapsayıcısını alma
    const wrapperElement = element.parentElement.parentElement;
    //silinen elemanının fiyatını alma
    const deletedPrice = wrapperElement.querySelector("#value").innerText;
    Number(deletedPrice);

    //silinenin fiyatını toplamdan çıkarma
    updateToplam(-Number(deletedPrice));

    //kapsayıcyı html den kaldırma
    wrapperElement.remove();
  }
}

//
function handleFilter(e) {
  const items = liste.childNodes;

  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }

        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
