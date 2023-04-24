from stmpy import Machine, Driver
import time
from stm_mqtt_client import MQTTClientSTM

topic_prefix = "g6/"

group_num = 6
unit_num = 6

class StudentView:
  def __init__(self, mqtt_client, group_num, unit_num, max_prorgess=5):
    self.mqtt_client = mqtt_client
    self.topic = topic_prefix + f"unit{unit_num}/G{group_num}/update"
    self.mqtt_client.subscribe(self.topic)
    self.progress = 0
    self.max_prorgess = max_prorgess
    self.wait_for_help_stopwatch_start_time = 0
    self.help_stopwatch_start_time = 0

  def help_on(self):
    print("Turning the light on")
    self.mqtt_client.publish(self.topic, '["help_on"]')

  def help_off(self):
    print("Turning the light off")
    self.mqtt_client.publish(self.topic, '["help_off"]')

  def increase_progress(self):
    print("Increasing progress")
    if (self.progress < self.max_prorgess):
      self.progress += 1
    self._update_progress()
      
  def decrease_progress(self):
    print("Decreasing progress")
    if (self.progress > 0):
      self.progress -= 1
    _display_progress()

  def start_wait_for_help_stopwatch(self):
    print("Starting wait for help stopwatch")
    assert(self.wait_for_help_stopwatch_start_time == 0) # Make sure the stopwatch isn't already running
    self.wait_for_help_stopwatch_start_time = time.time()

  def stop_wait_for_help_stopwatch(self):
    print("Stopping wait for help stopwatch: " + t)
    elapsed_time = time.time() - self.wait_for_help_stopwatch_start_time
    print(f"Wait for help stopwatch used {elapsed_time} seconds")
    self.wait_for_help_stopwatch_start_time = 0 # restart stopwatch

  def cancel_wait_for_help_stopwatch(self):
    print("Cancelling waiting for help stopwatch")
    self.wait_for_help_stopwatch_start_time = 0 # restart stopwatch

  def start_help_stopwatch(self):
    print("Starting wait for help stopwatch")
    assert(self.help_stopwatch_start_time == 0) # Make sure the stopwatch isn't already running
    self.help_stopwatch_start_time = time.time()

  def stop_help_stopwatch(self):
    print("Stopping help stopwatch: " + t)
    elapsed_time = time.time() - self.help_stopwatch_start_time
    print(f"Help stopwatch used {elapsed_time} seconds")
    self.help_stopwatch_start_time = 0 # restart stopwatch

  def _update_progress(self):
    print("Current progress: " + str(self.progress))
    self.mqtt_client.publish(self.topic, f'["update_progress", {self.progress}]')


t_init = {
  "source": "initial",
  "target": "no_help",
}

t_press_help = {
  "trigger": "press_help",
  "source": "no_help",
  "target": "need_help"
}

t_cancel_help = {
  "trigger": "cancel_help",
  "source": "need_help",
  "target": "no_help",
  "effect": "cancel_wait_for_help_stopwatch()"
}

t_TA_accepts_to_help = {
  "trigger": "TA_accepts_to_help",
  "source": "need_help",
  "target": "receiving_help",
  "effect": "stop_wait_for_help_stopwatch()",
}

t_TA_finished_help = {
  "trigger": "TA_finished_help",
  "source": "receiving_help",
  "target": "no_help"
}

s_no_help = {
  "name": "no_help",
  "entry": "help_off()",
  "press_forwards": "increase_progress()",
  "press_backwards": "decrease_progress()"
}

s_need_help = {
  "name": "need_help",
  "entry": "help_on()",
  "entry": "start_wait_for_help_stopwatch()",
  "press_forwards": "increase_progress()",
  "press_backwards": "decrease_progress()"
}

s_receiving_help = {
  "name": "receiving_help",
  "entry": "help_off",
  "entry": "start_stopwatch()",
  "exit": "stop_stopwatch()",
  "press_forwards": "increase_progress()",
  "press_backwards": "decrease_progress()"
}

client = MQTTClientSTM()
student_view = StudentView(client, group_num, unit_num)
student_view_machine = Machine(
  name="student_view",
  obj=student_view,
  transitions=[t_init, t_press_help, t_cancel_help, t_TA_accepts_to_help, t_TA_finished_help], 
  states=[s_no_help, s_need_help, s_receiving_help]  
)

driver = Driver()
driver.add_machine(student_view_machine)

client.start()
driver.start()

client.subscribe("g6/unit6/G6")
