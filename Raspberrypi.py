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

unit_5 = ["Help", "Q1", "Q2", "Q3", "Q4"]

unit = "unit6"
group = "G6"

status = 1
difficulty = [green, orange, red]

myclient = MQTT_Client()
myclient.start(broker, port)

while True:
    for event in sense.stick.get_events():
        if event.action == "pressed":

            if event.direction == "left" and status > 1:
                status = status - 1
            elif event.direction == "right" and status < len(unit_5) - 2:
                status = status + 1

            if status > len(unit_5) - 1:
                status = 1
            elif status < 1:
                status = len(unit_5) - 1

            if event.direction == "middle":
                sense.show_message("REQ SOS", text_colour=white)

            myclient.send_status(unit, group, unit_5[status])

    sense.show_message(group + ":" + unit_5[status])
    sense.clear()
