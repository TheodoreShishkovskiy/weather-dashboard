var owmAPI = "dda279cb1f7efed58ec2990eb5510e89";
var currentCity = "";
var lastCity = "";

var handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
