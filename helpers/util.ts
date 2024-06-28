export function validateEmail(input: string): boolean {

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return !!input.match(validRegex);

}



export function validCityState(cityState: string) {
  const last = cityState.slice(cityState.length - 5, cityState.length)
  return (last.indexOf(" - ") >= 0 && last.replace(" - ", "").length == 2)
}