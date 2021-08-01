
// ウィンドウ表示時に商品コードのテキストボックスにフォーカス
item_code.focus();

//画面表示時
//商品マスターを受け取って表示
window.onload = show_master();

function show_master(){
  async function run(){
    var master_table = await eel.master_table_create()();
    master_list.innerHTML = master_table;
  }
  run();
}

// 商品コードと数の両方が入力されたら、注文ボタン有効
function inputcheck(){
    if ((item_code.value.length >= 1) && (quantity.value.length >= 1)){
        btn_order.disabled = false;
    }else{
        btn_order.disabled = true;
    }
}

// 商品コード入力で商品名と単価を表示
item_code.oninput = function(){
    if (item_code.value.length >= 1) {
        var temp_item_code = parseInt(item_code.value);
        async function run(){
            var temp_item_info = await eel.get_iteminfo(temp_item_code)();
            item_name.innerText = temp_item_info[0];
            price.innerText = temp_item_info[1];
        }
        run();
        inputcheck();
    } 
}

//数が入力されたらチェック
quantity.oninput = function(){
    if (quantity.value.length >= 1) {
        inputcheck();
    } 
}

// 注文ボタン押された→注文一覧に追加表示
//合計も表示
function btn_order_click(){
    var temp_item_code = parseInt(item_code.value);
    var temp_quantity = parseInt(quantity.value);
    async function run(){
        var temp_order = await eel.accept_order(temp_item_code, temp_quantity)();
        ordered_textarea.value += temp_order + "\n" ;
        //合計を計算
        temp_total = await eel.cal_total()();
        total.innerText = temp_total;  
    }
    run();
    quantity.value = "";
    item_code.value = "";
    btn_order.disabled = true;
    item_code.focus();
}

// お釣りを計算ボタンで、お釣り表示
function btn_change_click(){
    temp_deposit = parseInt(deposit.value);
    async function run(){
        var temp_change = await eel.cal_change(temp_deposit)();

        if (temp_change < 0 ){
            atention.innerHTML="お金が足りません。";
            deposit.focus();
        }else{
            change.innerHTML=temp_change;
            atention.innerHTML="";
        }
    }
    run();
}

//ボタンクリックでレシートのcsv出力
function btn_receipt_click(){
    eel.order_df_to_csv();
}

