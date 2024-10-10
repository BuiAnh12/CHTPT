:: Testing 2 user call register the same time -> 1 will response with status 200 another is 409
@echo off
:: First curl command (user1)
start "" curl -X POST http://localhost:3000/api/flight/flight_id_12345/seat/register/seat_1A -H "Content-Type: application/json" -d "{\"userId\": \"user_01\"}"

:: Second curl command (user2)
start "" curl -X POST http://localhost:3000/api/flight/flight_id_12345/seat/register/seat_1A -H "Content-Type: application/json" -d "{\"userId\": \"user_567\"}"

pause
