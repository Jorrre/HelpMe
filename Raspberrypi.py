from sense_hat import SenseHat
from time import sleep
from Raspberrypi_client import MQTT_Client

broker, port = "mqtt20.item.ntnu.no", 1883

sense = SenseHat()
white = (255, 255, 255)
green = (0, 255, 0)
orange = (255, 165, 0)
red = (255, 0, 0)
difficulty = [green, orange, red]

unit_5 = ["Q1", "Q2", "Q3", "Q4"]

unit = "unit6"
group = "G6"
status = 0
helpFlag = False

myclient = MQTT_Client()
myclient.start(broker, port)
myclient.send_status(unit, group, unit_5[status])

def handleMessage(msg):
    print(msg)

while True:
    for event in sense.stick.get_events():
        if event.action == "pressed":

            if event.direction == "left" and status > 1:
                status = status - 1
                myclient.send_status(unit, group, unit_5[status])
            elif event.direction == "right" and status < len(unit_5) - 2:
                status = status + 1
                myclient.send_status(unit, group, unit_5[status])
            elif event.direction == "middle":
                helpFlag = not helpFlag

            if helpFlag:
                myclient.send_status(unit, group, "Help")
                sense.show_message(group + ":" + unit_5[status], text_colour=red)
            else:
                myclient.send_status(unit, group, "no help")
                sense.show_message(group + ":" + unit_5[status], text_colour=white)
    sense.clear()
