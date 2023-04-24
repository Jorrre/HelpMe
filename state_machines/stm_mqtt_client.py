import paho.mqtt.client as mqtt
from threading import Thread

broker, port= "mqtt20.item.ntnu.no", 1883

class MQTTClientSTM:
  def __init__(self):
    self.client = mqtt.Client()
  def start(self):
    self.client.on_connect = self.on_connect
    self.client.on_message = self.on_message
    print("Connecting to {}:{}...".format(broker, port))
    self.client.connect(broker, port)

    try:
      thread = Thread(target=self.client.loop_forever)
      thread.start()
    except KeyboardInterrupt:
      print("Interrupted")
      self.client.disconnect()

  def on_connect(self, client, userdata, flags, rc):
    print("on_connect(): {}".format(mqtt.connack_string(rc)))

  def on_message(self, client, userdata, msg):
    try:
      print(msg.payload)
    except e:
      print(e)

  def subscribe(self, topic):
    self.client.subscribe(topic)
  
  def publish(self, topic, msg):
    self.client.publish(topic, msg)