from sense_hat import SenseHat
from time import sleep

sense = SenseHat()
group = "G6"
white = (255, 255, 255)
green = (0, 255, 0)
orange = (255, 165, 0)
red = (255, 0, 0)
difficulty = [green, orange, red]

unit_5 = ["Q1", "Q2", "Q3", "Q4"]
unit_5_diff = [0, 0, 0, 0]

count = 0
difficulty = [green, orange, red]

while True:
    for event in sense.stick.get_events():
        if event.action == "pressed":

            if event.direction == "middle":
                sense.show_message("REQ SOS ", text_colour=white)

            if event.direction == "left":
                count = count - 1
            elif event.direction == "right":
                count = count + 1

            if event.direction == "up" and unit_5_diff[count] < len(difficulty) - 1:
                unit_5_diff[count] = unit_5_diff[count] + 1
            elif event.direction == "down" and unit_5_diff[count] > 0:

                unit_5_diff[count] = unit_5_diff[count] - 1

            if count > len(unit_5) - 1:
                count = 0
            elif count < 0:
                count = len(unit_5) - 1

    sense.show_message(group + ":" + unit_5[count], text_colour=difficulty[unit_5_diff[count]])
    sense.clear()
