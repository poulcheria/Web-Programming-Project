from bs4 import BeautifulSoup
from selenium import webdriver
import time
import json
 
 
 
 
#base product URL
URL = "https://e-katanalotis.gov.gr/product/"
 
 
#creates a list [min_id...max_id-1]
productids = [7,
13,
19,
26,
27,
28,
29,
39,
40,
61,
71,
79,
95,
102,
134,
141,
148,
154,
156,
194,
222,
229,
251,
255,
288,
298,
311,
316,
342,
350,
352,
353,
388,
392,
394,
470,
488,
713,
1017,
1205]
#final JSON
results = {}
results['fetch_date']=int(time.time())
results['data']=[]
 
 
#get product information
for productid in productids:
    print(productid)
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    # executable_path param is where the Chrome driver is installed
    print("1")
    browser = webdriver.Chrome(options=options, executable_path='C:\\chromedriver.exe')
    browser.get(URL+str(productid))
    print("moon")
    #get dates from price chart
    date_data = browser.execute_script('return Highcharts.charts[0].series[0].data.map(x => x.category)')
    #append year to date labels
    date_data = [s +'/2022' for s in date_data]
 
 
    #get prices from price chart
    price_data = browser.execute_script('return Highcharts.charts[0].series[0].data.map(x => x.y)')
 
 
    #find product name
    html = browser.page_source
    soup = BeautifulSoup(html, features="html.parser")
 
 
    #test html rendering
    #print(soup.prettify())
 
 
    pname = soup.find('p', attrs={'class':'product-name'}).text
    browser.quit()
 
 
    #transform dates
 
 
    for i in range(len(date_data)-1):
        dparts = date_data[i].split("/")
        newd = '2022-'+dparts[1]+'-'+dparts[0]
        date_data[i]=newd
 
    #create a result object
    result = {}
    result['id']=productid
    result['name']=pname
    result['prices']=[]
    for i in range(len(date_data)-1):
        result['prices'].append({'date':date_data[i], 'price':price_data[i]})
 
    #append it to the list
    results['data'].append(result)
 
 
print('Done')
 
 
json_object = json.dumps(results, indent = 2, ensure_ascii=False).encode('unicode-escape')
# print(json_object)
print(json_object.decode())
 
 
with open("output_"+str(productids[0])+"_"+str(productids[len(productids)-1])+"_"+str(results['fetch_date'])+".json", "w", encoding='utf-8') as outfile:
    json.dump(results, outfile, ensure_ascii=False ,indent=2)
