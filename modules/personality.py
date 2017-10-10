# this script takes in the file, queries the API with a POST and returns the text
import pdb
import requests

def show_error():
    print("Error in post request.")

# this function takes a txt file, subtmits it to API and returns the text returned from api
def get_api_answer(file):
    #pdb.set_trace()
    POST_URL = "https://gateway.watsonplatform.net/personality-insights/api/v3/profile?version=2016-10-20"
    headers = {
        'Authorization': "Basic ODVmNDk5YjktMTVlMy00YWEwLTg2ODctZGYwYTAyMzU0NjBmOndQUm4xRVdvV0dLSQ==",
        'Content-type': "text/plain;charset=utf-8",
        'raw_score': "true"
    }
    querystring = {
        "version": "2016-10-20",
        "consumption_preferences": "true",
        "raw_scores": "true"
    }
    files = file

    try:

        r = requests.post(POST_URL, data=files, headers=headers, params=querystring)
        if r.status_code == 200: #success
            print("success")
            return r.text
        else:
            print("R status code:")
            print(r.status_code)
            print(r.reason)

    except requests.exceptions.RequestException as e:
        print("Error raised by API post:")
        print(e)
        show_error()




