from stmpy import Machine, Driver
class StudentView:
  def __init__(self):
    self.stm = None

  def display_group_number(self):
    print("Displaying group number")
  
  def light_on(self):
    print("Turning the light on")

  def light_off(self):
    print("Turning the light off")

  def increase_progress(self):
    print("Increasing progress")

  def decrease_progress(self):
    print("Decreasing progress")

  def start_stopwatch(self, t):
    print("Starting timer: " + t)

  def stop_stopwatch(self, t):
    print("Starting timer: " + t)

student_view = StudentView()

t_init = {
  "source": "initial",
  "target": "no_help",
  "effect": "display_group_number()"
}

t_press_help = {
  "trigger": "press_help",
  "source": "no_help",
  "target": "need_help"
}

t_cancel_help = {
  "trigger": "cancel_help",
  "source": "need_help",
  "target": "no_help"
}

t_TA_accepts_to_help = {
  "trigger": "TA_accepts_to_help",
  "source": "need_help",
  "target": "receiving_help"
}

t_TA_finished_help = {
  "trigger": "TA_finished_help",
  "source": "receiving_help",
  "target": "no_help"
}

s_no_help = {
  "name": "no_help",
  "entry": "light_off()",
  "press_forwards": "increase_progress()",
  "press_backwards": "decrease_progress()"
}

s_need_help = {
  "name": "need_help",
  "entry": "light_on()",
  "entry": "start_stopwatch()",
  "exit": "stop_stopwatch()",
  "press_forwards": "increase_progress()",
  "press_backwards": "decrease_progress()"
}

s_receiving_help = {
  "name": "receiving_help",
  "entry": "light_off",
  "entry": "start_stopwatch()",
  "exit": "stop_stopwatch()",
  "press_forwards": "increase_progress()",
  "press_backwards": "decrease_progress()"
}

student_view_machine = Machine(
  name="student_view",
  obj=student_view,
  transitions=[t_init, t_press_help, t_cancel_help, t_TA_accepts_to_help, t_TA_finished_help], 
  states=[s_no_help, s_need_help, s_receiving_help]  
)

student_view.stm = student_view_machine

driver = Driver()
driver.add_machine(student_view_machine)
driver.start()