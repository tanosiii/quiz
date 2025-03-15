const img  = document.getElementById("image");
const option1 = document.getElementById("option-1");
const option2 = document.getElementById("option-2");
const qnum = document.getElementById("q-num");
const tbl = document.getElementById("table");
const resultBtn = document.getElementById("resultBtn");
const finishText = document.getElementById("finishText");
const btnAudio = document.getElementById("btn-audio");
const message = document.getElementById("message");
const img2 = document.getElementById("image2");

//今何問目？
let quizNumber = 1;

//問題の画像
const images = ["./hamabe1.jpg","./gakki3.jpg","./gakki1.jpeg"
    ,"./gakki2.jpeg","./aoi1.webp","./gakki4.jpeg"
    ,"./ayase1.jpeg","./nagasawa1.jpg","./gakki5.jpeg"
    ,"./gakki6.jpg"
]

//答え
const answer = ["no","yes","yes"
    ,"yes","no","yes",
    "no","no","yes",
    "yes"
]

//自分の回答
let myAns = [];

//正誤の記録
let record = [];

//押された時
option1.addEventListener('click',()=>{
    
    //記録
    record[quizNumber-1] = answer[quizNumber-1] == "yes" ? true : false;
    myAns[quizNumber-1] = "ガッキー";

    //効果音
    btnAudio.play();

    //最後じゃなかったら次
    if(quizNumber < 10)
        nextQuestion();

    //最後なら結果につながるボタンを表示する
    else if(quizNumber==10)
        prepareForResult();
  });

option2.onclick = function(){

    //記録
    record[quizNumber-1] = answer[quizNumber-1] == "no" ? true : false;
    myAns[quizNumber-1] = "ガッキーじゃない";

    //効果音
    btnAudio.play();

     //最後じゃなかったら次
    if(quizNumber < 10)
         nextQuestion();

    //最後なら結果につながるボタンを表示する
     else if(quizNumber==10)
         prepareForResult();
};

//”結果を見る”ボタンが押された時
resultBtn.onclick = function(){
   　tbl.style.display = "block";
    resultBtn.style.display = "none";
    message.style.visibility="hidden";
    img2.style.display = "block";

     //効果音
     btnAudio.play();
};

//次の問題へ
function nextQuestion(){
    //n+1問目
    quizNumber++;

    //n問目表示
    qnum.textContent = quizNumber + "/10問";

    //画像変更
    img.src = images[quizNumber-1];

}

//結果を表示する準備をする
function prepareForResult(){
    resultBtn.style.display = "block";
    img.style.display = "none";
    option1.style.display = "none";
    option2.style.display = "none";
    finishText.style.visibility = "visible";
    message.style.display = "block";

     // テーブルの作成
     for (var i = 0; i < 10; i++) {
        // tr要素を生成
        var tr = document.createElement('tr');

        // th・td部分のループ
        for (var j = 0; j < 3; j++) {
        
              // td要素を生成
              var td = document.createElement('td');
              // td要素内にテキストを追加
              if(j==0)
              {
                td.textContent = i+1;
                td.index = i;
                td.onclick = click;
                td.style.color = "blue";
                td.style.textDecoration = "underline";
              }
              else if(j==1)
                td.textContent = myAns[i];
              else if(j==2)
                    td.textContent = record[i]==true　?　"⭕️": "✖️";
                
              // td要素をtr要素の子要素に追加
              tr.appendChild(td);
            
        }
        // tr要素をtable要素の子要素に追加
        tbl.appendChild(tr);
    }
}

//結果発表後、数字に応じて画像を表示
function click(e){
    let elm = e.target;
    img2.src = images[elm.index];
    btnAudio.play(); 
}
