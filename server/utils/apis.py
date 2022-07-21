import time
import json
from bleak import BleakScanner, BleakClient
from translator import GattCharacteristics as GattChar
import binascii


class HeartMonitorAPI:
  def __init__(self):
    self.HEART_MONITOR_ADDRESS =  "28:FF:B2:41:3D:B4"
    self.bp_found = False
    self.dat = dict() 

  def bp_callback(self, sender, data):
    print("### DATA RECEIVED ###")

    # bytes 0: control byte
    # bytes 1 and 2: systolic
    # bytes 3 and 4: diastolic 
    # bytes 11 and 12: time stamp 
    # bytes 14 and 15: pulse


    print(f"{sender}: {data}")
    print(f"Systolic: {data[1]}.{data[2]} mmHg")
    print(f"Diastolic: {data[3]}.{data[4]} mmHg")
    print(f"Time: {data[11]}:{data[12]}:{data[13]}")
    print(f"Pulse: {data[14]}.{data[15]} bpm")

    self.bp_found = True
    self.dat = json.dumps({"Systolic": str(data[1])+"."+str(data[2])+" mmHg","Diastolic": str(data[3])+"."+str(data[4])+" mmHg","Time": str(data[11])+":"+str(data[12])+":"+str(data[13]),"Pulse": str(data[14])+"."+str(data[15])+" bpm"}) 


  async def run(self):
    print('*** STARTING SCAN ***')

    HMA = False
    devices = await BleakScanner.discover()
    for d in devices:
      check = str(d).split(' ')[0][:-1]
      if(check == self.HEART_MONITOR_ADDRESS):
        HMA = True

    if (HMA):
      print('HEART MONITOR     IN devices')

      async with BleakClient(self.HEART_MONITOR_ADDRESS) as client:
        print(f"Connected: {client.is_connected} at address {self.HEART_MONITOR_ADDRESS}")
        paired = await client.pair(protection_level=2)
        print(f"Paired: {paired}")
        assert paired

        try:
          # 00002902-0000-1000-8000-00805f9b34fb (Handle: 2066)
          data = (512).to_bytes(2, byteorder='big')
          await client.write_gatt_descriptor(2066, data)


          await client.start_notify(GattChar["Blood Pressure Measurement"], self.bp_callback)

          time.sleep(5)

          unpaired = await client.unpair()
          print(f"Unpaired: {unpaired}")
          assert unpaired

        except Exception as e:
          print('ERROR', e)

          unpaired = await client.unpair()
          print(f"Unpaired: {unpaired}")

    else:
      print('HEART MONITOR NOT in devices')


    return self.bp_found, self.dat



class WeightAPI:
  def __init__(self):
    #self.SCALE_ADDRESS = "EC:21:E5:12:24:D0"
    self.SCALE_ADDRESS = "0C:95:41:D3:F0:A8" 
    self.w_found= False
    self.dat = dict() 


  def w_callback(self, sender, data):
    print("### DATA RECEIVED ###")
    print(f"{sender}: {data}")

    # bytes 0 and 1: control bytes
    # bytes 2 and 3: year
    # byte 4: month
    # byte 5: day
    # byte 6: hours
    # byte 7: minutes
    # byte 8: seconds
    # bytes 9 and 10: impedance
    # bytes 11 and 12: weight (*100 for pounds and catty, *200 for kilograms)

    # Transforming into hex
    # Year, Impedance and Weight are in Little Endian
    d_hex = binascii.hexlify(data).decode()
    year = int(d_hex[6]+d_hex[7]+d_hex[4]+d_hex[5], 16)
    weight = int(d_hex[24]+d_hex[25]+d_hex[22]+d_hex[23], 16) /200

    print(f'Day-Month-Year: {data[5]}-{data[4]}-{year}')
    print(f'Hour-Minute-Second: {data[6]}-{data[7]}-{data[8]}')

    print(f'Weight: {weight} kg')
    self.w_found = True
    self.dat = json.dumps({"Weight": str(weight)+" kg"}) 

  async def run(self):
    print('*** STARTING SCAN ***')

    SA = False
    devices = await BleakScanner.discover()
    for d in devices:
      check = str(d).split(' ')[0][:-1]
      if(check == self.SCALE_ADDRESS):
        SA = True


    if (SA):
      print('SCALE             IN devices')

      async with BleakClient(self.SCALE_ADDRESS) as client:
        print(f"Connected: {client.is_connected} at address {self.SCALE_ADDRESS}")
        paired = await client.pair()
        print(f"Paired: {paired}")
        assert paired

        try:
          # 00002902-0000-1000-8000-00805f9b34fb (Handle: 30) (XIAOMI)
          data = (512).to_bytes(2, byteorder='big')
          await client.write_gatt_descriptor(30, data)


          await client.start_notify(GattChar["Body Composition Measurement"], self.w_callback)

          time.sleep(5)

          unpaired = await client.unpair()
          print(f"Unpaired: {unpaired}")
          assert unpaired

        except Exception as e:
          print('ERROR', e)

          unpaired = await client.unpair()
          print(f"Unpaired: {unpaired}")

    else:
      print('SCALE         NOT in devices')

    return self.w_found, self.dat
