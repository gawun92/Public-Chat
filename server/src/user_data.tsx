

var curr_user: string = ""

export function save_curr_user(name: string) {
  curr_user = name
}
export function whoiam() {
  return (curr_user)
}

export function getTime() {
  var currentTimeInSeconds = new Date()
  return (currentTimeInSeconds)
}




