import paho.mqtt.client as mqtt
from time import sleep
from threading import Thread

class MQTT_Client:
    def on_connect(self, client, userdata, flags, rc):
        print("on_connect(): {}".format(mqtt.connack_string(rc)))

    def start(self, broker, port):
        self.client = mqtt.Client()
        self.client.on_message = self.on_message
        self.client.on_connect = self.on_connect
        print("Connecting to {}:{}".format(broker, port))
        self.client.connect(broker, port)

        self.client.subscribe("g6/*/G6")

        try:
            thread = Thread(target=self.client.loop_forever)
            thread.start()
        except KeyboardInterrupt:
            print("Interrupted")
            self.client.disconnect()

    def on_message(self, client, userdata, msg):
        try:
            message = msg.payload.decode()
            print(f"Received `{message}` from `{msg.topic}` topic")
        except e:
            print(e)

    def send_status(self, unit, group, status):
        try:
            self.client.publish("g6/" + unit + "/" + group, status)
        except e:
            print("error")

