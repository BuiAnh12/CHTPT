
# API Documentation

## User API

- **[POST]** `/api/user/register/[userid]`  
  Registers a new user.

- **[GET]** `/api/user/info/[userid]`  
  Retrieves information about a specific user.

---

## Flight API

- **[GET]** `/api/flight/info/[flightid]`  
  Retrieves information about a specific flight.

---

## Seat API

- **[GET]** `/api/flight/[flightid]/seat/[seatid]`  
  Retrieves information about a specific seat on a flight.

- **[POST]** `/api/flight/[flightid]/seat/register/[seatid]`  
  Registers a seat for a specific flight.

- **[POST]** `/api/flight/[flightid]/seat/purchase/[seatid]`  
  Purchases a seat for a specific flight.
