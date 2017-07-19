from flask import Flask, render_template, request, redirect, url_for
from werkzeug.datastructures import ImmutableMultiDict
from werkzeug import secure_filename
from jsonToData import jsonToData
from personality import get_api_answer

app = Flask(__name__)

@app.route('/')
def root():
    return redirect(url_for('home'))

@app.route('/home')
def home():
    return render_template("home.html")

@app.route('/personality', methods = ['GET', 'POST'])
def personality():

    if request.method == 'POST':
        print("post received")

        # store paragraph text into the variable data: {'paragraph_text': ''}
        data = request.form.to_dict()

        # if there is text being sent, turn that text in a file. otherwise, just get the file sent.
        if data["paragraph_text"] != '':
            f = open("testfile.txt", "w")
            f.write(data["paragraph_text"])
        else:
            f = request.files['file']

        api_output = get_api_answer(f)
        print("api output received:")
        print(api_output)
        dataFile = jsonToData(api_output)
        print("dataFile compiled")
        print(dataFile)
        return render_template("personality.html", dataFile = dataFile)
    else:
        return render_template("personality.html", dataFile = "none")

if __name__ == '__main__':
   app.run(debug = True)