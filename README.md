In this challenge, you are required to build a REST API service using Node.js express.js framework to manipulate the Stock data for trades. Each trade is a JSON entry with the following keys:

_id_: This is the trade unique ID.
_type_: This is the trade type, buy or sell.
_user_: The user responsible for the trade. The user itself is a JSON entry consisting of following fields:
_id_: This is the user unique ID.
_name_: This is the user name.
_stock_symbol_: This is the stock symbol.
_stock_quantity_: This is the total number of stocks traded. The traded stock quantity is between 10 and 30 inclusive.
_stock_price_: This is the stock price for one stock (upto two places of decimal) at the time of the trade. The stock price is between 130.42 and 195.65inclusive.
_trade_timestamp_: This is the timestamp for the trade creation given in the format yyyy-MM-dd HH:mm:ss. The timezone is EST (UTC -4).

For example, consider the following event JSON:

```Trade JSON
{
  "id":1000344,
  "type":"buy",
  "user":{
    "id":1619820,
    "name":"David"
  },
  "stock_symbol":"AC",
  "stock_quantity":28,
  "stock_price":162.17,
  "trade_timestamp":"2014-06-14 13:13:13"
}
```
The REST service should implement the following functionalities:

**Erasing all the trades**: The service should be able to erase all the trades by the DELETE request at `/erase`. The HTTP response code should be 200.
**Adding new trades**: The service should be able to add a new trade by the POST request at `/trades`. The event JSON is sent in the request body. If a trade with the same id already exists then the HTTP response code should be 400, otherwise, the response code should be 201.
**Returning all the trades**: The service should be able to return the JSON array of all the trades by the `GET` request at `/trades`. The HTTP response code should be 200. The JSON array should be sorted in ascending order by trade ID.
**Returning the trade records filtered by the user ID**: The service should be able to return the JSON array of all the trades which are performed by the user ID by the `GET` request at `/trades/users/{userID}`. If the requested user does not exist then the HTTP response code should be 404, otherwise, the response code should be 200. The JSON array should be sorted in ascending order by trade ID.
**Returning the trade records filtered by the stock symbol and trade type in the given date range**: The service should be able to return the JSON array of all the trades which are associated with the stock symbol and the given trade type, i.e., either buy or sell, in the given date range specified by start date and end date inclusive, by the GET request at `/stocks/{stockSymbol}/trades?type={tradeType}&start={startDate}&end={endDate}`. If the requested stock symbol does not exist then the HTTP response code should be 404, otherwise, the response code should be 200 irrespective of whether or not there are trades associated with the stock symbol in the given date range. The JSON array should be sorted in ascending order by trade ID.
**Returning the highest and lowest price for the stock symbol in the given date range**: The service should be able to return the JSON object describing the information of highest and lowest price in the given date range specified by start date and end date inclusive, by the `GET` request at `/stocks/{stockSymbol}/price?start={startDate}&end={endDate}`. If the requested stock symbol does not exist then the HTTP response code should be 404, otherwise, the response code should be 200 irrespective of whether or not there are trades associated with the stock symbol in the given date range. The response JSON should consist of the following three fields:
*symbol*: This is the requested stock symbol.
*highest_price*: This field describes the value of the highest price for the request stock symbol in the given date range.
*lowest_price*: This field describes the value of lowest price for the request stock symbol in the given date range.
If there are no trades for the requested stock symbol, then the response JSON should be:
```{
  "message":"There are no trades in the given date range"
}
```
The incomplete project is generated using express-generator and has  provided with the following components:

The **app.js** file which is the starting point of the application and any route that is used should be defined here.
The **routes** folder where the REST API routes have to be created.
The **models** folder where all the models related to the application should be created.
The **controllers** folder where all the controllers related to the application should be created consists of two files:
The **trades.js** file where the functions related to the trades are to be completed.
The **stocks.js** file where the functions related to the trades are to be completed.
You should complete the given project so that it passes all the test cases when running against the provided mocha unit tests. The project by default supports the use sqlite3 database, but you can make use of any database to store the events data by specifying the dependency in the **package.json** file.

## Sample Requests Examples

Consider the following requests performed in the given order:

POST Requests `/trades`
Consider the following POST requests (these are performed in the ascending order of trade id):
```{
  "id":1000344,
  "type":"buy",
  "user":{
    "id":1619820,
    "name":"David"
  },
  "stock_symbol":"AC",
  "stock_quantity":28,
  "stock_price":162.17,
  "trade_timestamp":"2014-06-14 13:13:13"
}{
  "id":1338585,
  "type":"buy",
  "user":{
    "id":1619820,
    "name":"David"
  },
  "stock_symbol":"ABR",
  "stock_quantity":12,
  "stock_price":137.39,
  "trade_timestamp":"2014-06-25 13:44:13"
}{
  "id":1335088,
  "type":"buy",
  "user":{
    "id":4058680,
    "name":"Brandon"
  },
  "stock_symbol":"ACC",
  "stock_quantity":25,
  "stock_price":146.09,
  "trade_timestamp":"2014-06-25 13:40:13"
}{
  "id":1396897,
  "type":"buy",
  "user":{
    "id":4058680,
    "name":"Brandon"
  },
  "stock_symbol":"AC",
  "stock_quantity":15,
  "stock_price":161.35,
  "trade_timestamp":"2014-06-26 13:15:18"
}{
  "id":1336843,
  "type":"buy",
  "user":{
    "id":3679913,
    "name":"Omar"
  },
  "stock_symbol":"AEG",
  "stock_quantity":13,
  "stock_price":146.09,
  "trade_timestamp":"2014-06-25 13:40:13"
}{
  "id":1397181,
  "type":"sell",
  "user":{
    "id":4058680,
    "name":"Brandon"
  },
  "stock_symbol":"AC",
  "stock_quantity":10,
  "stock_price":162.37,
  "trade_timestamp":"2014-06-26 15:15:18"
}
```

GET Request `/trades/users/1619820`
The response of the GET request is the following JSON array with the HTTP response code 200:
```[
  {
    "id":1000344,
    "type":"buy",
    "user":{
      "id":1619820,
      "name":"David"
    },
    "stock_symbol":"AC",
    "stock_quantity":28,
    "stock_price":162.17,
    "trade_timestamp":"2014-06-14 13:13:13"
  },
  {
    "id":1338585,
    "type":"buy",
    "user":{
      "id":1619820,
      "name":"David"
    },
    "stock_symbol":"ABR",
    "stock_quantity":12,
    "stock_price":137.39,
    "trade_timestamp":"2014-06-25 13:44:13"
  }
]
```

GET Request `/trades/users/2919559`
As the requested user does not exist, so the HTTP response code is 404.
GET Request /stocks/AC/trades?type=buy&start=2014-06-14&end=2014-06-26
The response of the GET request is the following JSON array with the HTTP response code 200:
```[
  {
    "id":1000344,
    "type":"buy",
    "user":{
      "id":1619820,
      "name":"David"
    },
    "stock_symbol":"AC",
    "stock_quantity":28,
    "stock_price":162.17,
    "trade_timestamp":"2014-06-14 13:13:13"
  },
  {
    "id":1396897,
    "type":"buy",
    "user":{
      "id":4058680,
      "name":"Brandon"
    },
    "stock_symbol":"AC",
    "stock_quantity":15,
    "stock_price":161.35,
    "trade_timestamp":"2014-06-26 13:15:18"
  }
]
```

GET Request `/stocks/AC/trades?type=sell&start=2014-06-27&end=2014-06-27`
As there are no trades for the stock in the given date range, so the response is an empty JSON array with the HTTP response code 200.
GET Request /stocks/ACC/price?start=2014-06-25&end=2014-06-26
The response of the GET request is the following JSON with the HTTP response code 200:
```{
  "symbol":"ACC",
  "highest_price":146.09,
  "lowest_price":146.09
}
```

GET Request `/stocks/ACC/price?start=2014-06-26&end=2014-06-26`
The response of the GET request is the following JSON with the HTTP response code 200:
```{
  "message":"There are no trades in the given date range"
}
```

GET Request `/stocks/A/price?start=2014-06-26&end=2014-06-26`
As the requested stock symbol does not exist, so the HTTP response code is 404.
DELETE Request `/erase`
All the stock trades data is erased from the database.
GET Request `/trades`
The response is an empty JSON array with the HTTP response code 200.
