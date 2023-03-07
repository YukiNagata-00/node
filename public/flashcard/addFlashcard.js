let addBtn = document.getElementById('okay')
let foodnameError = document.getElementById('foodMessage')
let imageError = document.getElementById('imageMessage')
let carboError = document.getElementById('carboMessage')

function clearAll(){
    foodnameError.innerHTML = ''
    imageError.innerHTML = ''
    carboError.innerHTML = ''
}


addBtn.addEventListener('click', async function (e){
    clearAll()
    

    let imageinput = document.querySelector("#imageinput")

    //addimageに関するコードデフォルトの挙動が起きないように
    e.preventDefault();
    //inputに入ったファイルを取得
    const file = await imageinput.files[0];
    //サーバーエンドに送信するための形式が
    const formData = new FormData();
    formData.append("image",file)

    let name = document.getElementById('foodname')
    let carbo =document.getElementById('carbCount')

  
    
  
    name = name.value;
    let  image = await imageinput.files[0].name;
    carbo = carbo.value;
    console.log(name);

    try{
        const res = await fetch('/game/flashcard/addcard2', {
            method: 'POST',
            body :JSON.stringify({
                name,
                image,
                carbo

            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log(res);
        const addcardimage =
            await fetch('/game/flashcard/addImage', {
                method :'POST',
                body: formData
    
    
            });

        
        if(res.ok){
            const data = await res.json();
            console.log('Registration successful', data);
            alert("追加しました");
           
        }else{

            
            if (carbo.match(/^[^\x01-\x7E\xA1-\xDF]+$/)){
                carboError.innerHTML =  'カーボ数は半角数字で入力してね'
            }


        }
    }catch (error) {
        console.log(error);
    }


})

let back = document.getElementById("back")
back.addEventListener('click', function () {
    window.location.href = '/game/flashcard/start';

})