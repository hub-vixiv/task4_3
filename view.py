import eel
from pandas.core import series
import desktop
import posregi
import pandas as pd

app_name="html"
end_point="index.html"
size=(800,700)

miniregi = posregi.PosRegi()

#master_df→tableタグ 変換して返す（jsでdivへ書き込み）
@eel.expose
def master_table_create():
    master_table = miniregi.master_table_create()
    return master_table

#商品コードから商品名と単価を取得
@eel.expose
def get_iteminfo(itemcode):
    return miniregi.get_iteminfo(itemcode)

# 表示する注文内容を取得
@eel.expose
def accept_order(itemcode, quantity):
    return miniregi.accept_order(itemcode, quantity)

# 注文合計を計算
@eel.expose
def cal_total():
    return miniregi.cal_total()

# お釣りを計算
@eel.expose
def cal_change(diposit):
    return miniregi.cal_change(diposit)

# レシート出力
@eel.expose
def order_df_to_csv():
    miniregi.order_df_to_csv()


desktop.start(app_name,end_point,size)
#desktop.start(size=size,appName=app_name,endPoint=end_point)