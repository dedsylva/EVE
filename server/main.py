from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
  return jsonify({"status": "ok"})

# @app.route('/set_model', methods=['GET'])
# def set_model():

@app.route('/model', methods=['GET', 'POST'])
def model():
  import sys

  import numpy as np
  import pathlib
  from PIL import Image
  import numpy as np
  # https://github.com/Masdevallia/3rd-place-kaggle-siim-isic-melanoma-classification

  if request.method == 'POST':
    IMG_SIZE =370

    img_data = request.files['inference']

    _type = img_data.content_type
    assert str(_type) == "image/jpg", f"YOU DID NOT SEND IMAGE, You SENT {_type} with type: {type(_type)}"

    # Current path
    filename= os.path.abspath(os.getcwd()) + '/images' + img_data.filename
    img_data.save(filename)

    img = Image.open(filename)
    img = img.resize((IMG_SIZE, IMG_SIZE))

    input_img = (np.array(img)/255).reshape(1,IMG_SIZE, IMG_SIZE, 3)

    assert input_img.shape == (1, IMG_SIZE, IMG_SIZE, 3), f"Wrong Shape for Model. Should be ({IMG_SIZE}, {IMG_SIZE}, 3) but got {input_img.shape} instead"

    # Makes inference
    result= model.predict(input_img)
    print(result[0][0])


    # results= []
    # for i in range(10):
    #   results.append(model.predict(input_img))

    # print("Melanoma Predictions")
    # print(results)
    return jsonify({'prob': str(result[0][0])})


    return jsonify({
    'class': str(classes[_ind]),
    'prob': str(scores[_ind])
    })

  else:
    return jsonify({'exit': -1})


@app.route('/usb', methods=['GET'])
def usb():
  from ppadb.client import Client as AdbClient
  script = 'monkey -p com.google.android.youtube -c android.intent.category.LAUNCHER 1'

  client = AdbClient(host="192.168.0.5", port=5555) # Default is "127.0.0.1" and 5037
  print('client')

  devices = client.devices()

  if len(devices) == 0:
      print('No devices')
      return(jsonify({'Device': 'No devices'}))

  else:
    device = devices[0]

    print(f'Connected to {device}')
    device.shell(script)
    return(jsonify({'Device': 'Connected'}))


@app.route('/heart', methods=['GET'])
def heart():

  import time
  import asyncio
  from utils.apis import HeartMonitorAPI 

  bp = HeartMonitorAPI()
  bp_found = False
  dat = dict() 
  NUMBER_OF_TRIES = 20

  # Timing for people get in to the scale
  time.sleep(10)

  return {
  "Diastolic": "68.0 mmHg",
  "Pulse": "88.0 bpm",
  "Systolic": "97.0 mmHg",
  "Time": "18:3:23",
}

  for _ in range(NUMBER_OF_TRIES):

    try:
      bp_found, dat = asyncio.run(bp.run())
    except Exception as e:
      print('ERROR:', e)

    time.sleep(1)
    if (bp_found):
      break

  if bp_found:
    return dat 
  else:
    return "Data not Found. Please Try Again" , 400



@app.route('/weight', methods=['GET'])

def weight():
  import time
  import asyncio
  from utils.apis import WeightAPI 

  w = WeightAPI()
  w_found = False
  dat = dict() 
  NUMBER_OF_TRIES = 8

  # Timing for people start the blood pressure monitor 
  time.sleep(3)

  for _ in range(NUMBER_OF_TRIES):

    try:
      w_found, dat = asyncio.run(w.run())
    except Exception as e:
      print('ERROR:', e)

    time.sleep(1)
    if (w_found):
      break

  if w_found:
    return dat 
  else:
    return "Data not Found. Please Try Again" , 400



if __name__ == '__main__':

  import efficientnet.tfkeras as efn
  import keras
  import os

  # Loads Model
  path = os.path.abspath(os.getcwd()) + r'/utils/best_model.h5'
  model = keras.models.load_model(path) 

  app.run(host='0.0.0.0', port=81, debug=True)