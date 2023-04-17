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
unit_5_diff = [0, 0, 0, 0]

unit = "unit6"
group = "group6"

count = 0
difficulty = [green, orange, red]

myclient = MQTT_Client()
myclient.start(broker, port)

while True:
    for event in sense.stick.get_events():
        if event.action == "pressed":

            if event.direction == "left":
                count = count - 1
            elif event.direction == "right":
                count = count + 1

            if count > len(unit_5) - 1:
                count = 0
            elif count < 0:
                count = len(unit_5) - 1

            if event.direction == "middle":
                sense.show_message("REQ SOS ", text_colour=white)

            myclient.send_status(unit, group, count)

    sense.show_message(group + ":" + unit_5[count], text_colour=difficulty[unit_5_diff[count]])
    sense.clear()
