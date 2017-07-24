# this script takes in
import pdb
import requests

def show_error():
    print("Error in post request.")

# this function takes a txt file, subtmits it to API and returns the text returned from api
def get_api_answer(file):
    #pdb.set_trace()
    POST_URL = "https://gateway.watsonplatform.net/personality-insights/api/v3/profile?version=2016-10-20&consumption_preferences=true&raw_scores=true"
    headers = {
        'Authorization': "Basic ODVmNDk5YjktMTVlMy00YWEwLTg2ODctZGYwYTAyMzU0NjBmOndQUm4xRVdvV0dLSQ==",
        'Content-type': "text/plain",
        'raw_score': "true"
    }

    try:
        with open("testfile.txt","r") as f:
            r = requests.post(POST_URL, data=f, headers=headers)
            if r.error is None and r.status_code == 200: #success
                print("success")
                return r.text
            else:
                print("R error:")
                print(r.error)
                print("R status code:")
                print(r.status_code)
                print(r)

    except requests.exceptions.RequestException as e:
        print("Error raised by API post:")
        print(e)
        show_error()




