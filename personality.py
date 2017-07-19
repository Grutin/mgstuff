# this script takes in

import requests

def show_error():
    print("Error in post request.")

# this function takes a txt file, subtmits it to API and returns the text returned from api
def get_api_answer(file):
    #if isinstance(file, str):

    POST_URL = "https://gateway.watsonplatform.net/personality-insights/api/v3/profile?version=2016-10-20&consumption_preferences=true&raw_scores=true"
    headers = {
        'Authorization': "Basic ODVmNDk5YjktMTVlMy00YWEwLTg2ODctZGYwYTAyMzU0NjBmOndQUm4xRVdvV0dLSQ==",
        'Content-type': "text/plain",
        'raw_score': "true"
    }

    try:
        r = requests.post(POST_URL, data = file, headers = headers)
        if r.status_code == 200: #success
            print("success")
            return r.text

    except requests.exceptions.RequestException as e:
        show_error()




