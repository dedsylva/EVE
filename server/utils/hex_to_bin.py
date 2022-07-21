import binascii
from bitstring import BitArray

def hex_to_bin(data):
  bdata = data.split('-')
  for b in bdata:
    print('(hex) '+b+' --> '+'(bin) '+BitArray(binascii.unhexlify(b)).bin)