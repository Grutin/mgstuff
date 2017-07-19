from flask import Flask, render_template, request, redirect, url_for
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
        f = request.files['file']
        #f.save(secure_filename(f.filename))
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