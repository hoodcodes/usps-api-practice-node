# USPS API Practice - for Node

### Notes

- this api will accept a json address object, which i will parse, creating xml for the uspa post request to do address validation

- i will send it back as json as well, including:
  - if error occurred - error information
  - if any data changed - pass back a dirty / changed flag
