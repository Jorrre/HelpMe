import paho.mqtt.client as mqtt
from threading import Thread

class MQTTClientSTM:
  def start(self, broker, port, topics):
    self.client = mqtt.Client()
    self.client.on_connect = self.on_connect
    self.client.on_message = self.on_message
    print("Connecting to {}:{}".format(broker, port))
    self.client.connect(broker, port)
    for topic in topics:
      self.client.subscribe(topic)


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