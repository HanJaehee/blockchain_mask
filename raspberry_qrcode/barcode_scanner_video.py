from imutils.video import VideoStream
from pyzbar import pyzbar
import argparse
import datetime
import imutils
import time
import cv2

#ap = argparse.ArgumentParser()
#ap.add_argument("-o", "--output", type=str, default="barcodes.csv", help="path to output CSV file containing barcodes")
#args = vars(ap.parse_args())

print("[INFO] starting video stream...")
vs=VideoStream(usePiCamera=True).start()
time.sleep(2.0)

#요기 바꾸면 서버로 전송 씹가능
#csv = open(args["output"], "w")
found = set()

while True:
    frame = vs.read()
    frame = imutils.resize(frame, width=400)

    barcodes = pyzbar.decode(frame)

    for barcode in barcodes:
        (x,y,w,h) = barcode.rect
        cv2.rectangle(frame, (x,y), (x+w, y+h), (0,0,255), 2)
        barcodeData = barcode.data.decode("utf-8")
        barcodeType = barcode.type
        text = "{} ({})".format(barcodeData, barcodeType)
        cv2.putText(frame, text, (x,y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,255), 2)

        if barcodeData not in found:
            print(barcodeData)
            found.add(barcodeData)
    key = cv2.waitKey(1) & 0xFF

    if key == ord("q"):
        break
print("[INFO] cleaning up...")

vs.stop()