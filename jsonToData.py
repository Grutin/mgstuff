import json

# jsonToData takes in the API JSON response and converts it to a JavaScript dict that can then get displayed in personality.html

def jsonToData(json_data):

    json_data = json.loads(json_data)
    data_dict = dict()

    big_five = json_data["personality"]
    needs = json_data["needs"]
    values = json_data["values"]


    # start by getting data for big_five, needs, values. structure is [root]/[personality]/[each big five]/[sub big five]
    for majorkey, subdict in json_data.items():
            # major key is at personality level

            if majorkey in ["needs","values"]:
                raw_score_data = []
                percentile_data = []

                for subkey in json_data[majorkey]:
                    raw_score_data.append(subkey["raw_score"])
                    percentile_data.append(subkey["percentile"])

                data_dict[majorkey] = [raw_score_data,percentile_data]

            elif majorkey == "personality":

                raw_score_data = []
                percentile_data = []

                # subkey is at each big five level, value is at sub big five level

                for subkey in json_data[majorkey]:
                    raw_score_data.append(subkey["raw_score"])
                    percentile_data.append(subkey["percentile"])

                data_dict[majorkey] = [raw_score_data,percentile_data]

                raw_score_data = []
                percentile_data = []

                # this calculates the scores for the sub categories within big 5
                for subkey in json_data[majorkey]:
                    raw_score_data = []
                    percentile_data = []
                    for subsubkey in subkey["children"]:
                        raw_score_data.append(subsubkey["raw_score"])
                        percentile_data.append(subsubkey["percentile"])
                    data_dict[subkey['name'].replace(" ", "_")] = [raw_score_data,percentile_data]


    print(data_dict)
    return data_dict


""" example output:
{'needs': [
[0.7093095762637447, 0.7752946047800341, 0.8350195402480738, 0.6640374715299717, 0.7829733092666639, 0.674097148233525, 0.7344531061341595, 0.7569616708308408, 0.723058771107716, 0.6819925763103428, 0.7111123598232363, 0.6899309668551958],
[0.3081412688350388, 0.34199508010344093, 0.7573950988154783, 0.39493761105717495, 0.223268625298575, 0.3606087960860668, 0.4780892229519251, 0.4049801109101848, 0.41363290952011833, 0.5798707519455004, 0.23184805572496447, 0.41026066893406693]], 'Agreeableness': [[0.6891047320145851, 0.5468357277411399, 0.4611694083364976, 0.60742314373046, 0.6732936627625761, 0.5359781052663843], [0.3243183848498975, 0.29448609991935637, 0.5957873605584003, 0.34837819069024994, 0.6014315557595595, 0.11325559833530746]], 'personality': [[0.7194363106523182, 0.5958186043047283, 0.5320692971226123, 0.7158522064566875, 0.44755670812454257], [0.18007582840183417, 0.2447587093851793, 0.3356484869384128, 0.2537542594797494, 0.3626437861017825]], 'Conscientiousness': [[0.6513305816813595, 0.4775870162693194, 0.6302490138530057, 0.49838461993729005, 0.5328041080969069, 0.7301461964963326], [0.24192385003029732, 0.40678379948411114, 0.12101263993542216, 0.5513589910703905, 0.21343782062821381, 0.25698189913692593]], 'Openness': [[0.48674318042257053, 0.6793128682717151, 0.6445904540214973, 0.7509186384389711, 0.6394923031695006, 0.5610072534719978], [0.3056592190395405, 0.6088478869438446, 0.4647730202864512, 0.6267772959444563, 0.7569848969967916, 0.8130099744261277]], 'values': [[0.6267153017085156, 0.780741684916929, 0.7415925759233637, 0.6919109561139792, 0.8118327081948782], [0.19494757011569275, 0.46356700939008516, 0.5212081764443313, 0.37119950725822304, 0.09730631028960307]], 'Emotional range': [[0.5544264560941612, 0.6427998432211209, 0.5060706704141342, 0.49040335110203337, 0.5941956562763602, 0.5243221135497049], [0.6338823955292101, 0.7623648808714258, 0.8185644116638058, 0.3954674493493786, 0.8165643839654326, 0.8132555606826939]], 'Extraversion': [[0.5225789980369611, 0.5963719301667121, 0.5933469719030592, 0.6348414888905369, 0.5302078521033703, 0.43148417420741564], [0.36396770958886343, 0.1700614258617661, 0.23003357285031556, 0.7693548467867899, 0.27300912045992043, 0.33534867692081405]]}
"""