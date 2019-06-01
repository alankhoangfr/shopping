import csv  
import json  
import pandas as pd


csvFilePath = "grocery_sample.csv"
jsonFilePath = "grocery_sampleJSON.json"




Data = pd.read_csv(csvFilePath)

Data["title"]=Data["brand_name"].map(str) 
Data["description"]=Data["metric_qty"].map(str) + Data["metric_uom"]
Data["image"]=Data["images_front_full_url"]
Data["reference"]=Data["brand_name"].map(str) +" "+ Data["metric_qty"].map(str) + Data["metric_uom"]
Data = Data.drop_duplicates(subset='reference', keep='first')
Data.to_csv(r'.\test.csv', index = None, header=True)



# write the data to a json file

Data.to_json('grocery_sampleJSON.json',orient='records')



