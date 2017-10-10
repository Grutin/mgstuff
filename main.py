from re import match
from flask import Flask, render_template, request, redirect, url_for
from modules.jsonToData import jsonToData
from modules.personality import get_api_answer
from modules.forms import personalityForm

app = Flask(__name__)

@app.route('/')
def root():
    return redirect(url_for('home'))

@app.route('/home')
def home():
    return render_template("home.html")

@app.route('/personality', methods = ['GET', 'POST'])

def personality():
    form = personalityForm(request.form)
    if request.method == 'POST':

        if form.validate() == False: # this means one of the fields has been filled incorrectly

            return render_template("personality.html", form = form, error = "Please enter at least 100 words in the text field, or attach a file.")

        else:

            # store paragraph text into the variable data
            data = request.form.to_dict()
            if data["freeText"]!= '': # if there is text in the field
                encodedText = data["freeText"].encode('utf-8').strip()
                api_output = get_api_answer(encodedText)
                dataFile = jsonToData(api_output)
                return render_template("personalitysuccess.html", dataFile=dataFile, form=form, success = "Please find your results below.")

            # if there is no text: it means there is a file. Take that file and make sure it's a txt
            else:
                f = request.files['fileField']

                # save file as string
                fileText = f.read()
                fileText.decode('utf-8', errors="replace").encode('utf-8')

                #fileText.encode('utf-8').strip()
                if match('^(.*\.txt$)[^.]*$',f.filename) == None:
                    return render_template("personality.html", form=form, error="Please upload a txt file.")
                    # else, file is correctly txt. Check how many words it includes.
                else:
                    # count to make sure there are enough words in the file
                    wordcount = 0
                    f.seek(0) # necessary so that the f.read() cursor reinitializes at the beginning and can read the entire file
                    for word in f.read().split():
                        wordcount += 1
                    if wordcount < 100:
                        return render_template("personality.html", form=form, error="Your txt file should have at least 100 words.")
                    else:
                        # file is correct!
                        api_output = get_api_answer(fileText)
                        dataFile = jsonToData(api_output)
                        return render_template("personalitysuccess.html", dataFile=dataFile, form=form, success = "Please find your results below.")
    else:
        return render_template("personality.html", form = form)

if __name__ == '__main__':
    app.run(debug = True)

