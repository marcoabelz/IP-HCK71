# IP-HCK71

# RESTful endpoints

- `POST /register`
- `POST /login`
- `GET /rooms`
- `GET /rooms/:id`
- `GET /bookings`
- `GET /myBookings`
- `POST /bookings/:id`
- `PUT /bookings/:id`
- `PUT /rooms/:id`
- `POST /:id/photos/upload`

## List endpoints

## POST /register

Create new user

<i>Request header:</i>

```json
{
    not needed
}
```

<i>Request Body:</i>

```json
{
  "email": "user@gmail.com",
  "password": "password",
  "fullName": "User",
  "phoneNumber": "081294150023"
}
```

<i>Response (201 - Success Created)</i>

```json
{
  "message": "User created!"
}
```

<i>Response (400 - Validation error)</i>

```json
{
  "message": ["Email is required!"]
}
```

or

```json
{
  "message": ["Full Name is required!"]
}
```

or

```json
{
  "message": ["Phone Number is required!"]
}
```

## POST /login

Login user

<i>Request header:</i>

```json
{
    not needed
}
```

<i>Request body</i>

```json
{
  "email": "user@gmail.com",
  "password": "user"
}
```

<i>Response (200)</i>

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE4MjQ4NzY4fQ.KGx1QLlGb_JkbGT89-QuE8vuGZObFJv3FAtRO11xadY",
  "role": "customer"
}
```

<i>Response (400)</i>

```json
{
  "message": "email / password is required"
}
```

or

```json
{
  "message": "error invalid username / password"
}
```

## GET /rooms

Get all room

<i>Request Header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Response (200)</i>

```json
[
  {
    "id": 1,
    "name": "coba update",
    "price": 12345,
    "description": "ini di update 2x",
    "availability": false,
    "createdAt": "2024-06-12T10:07:28.496Z",
    "updatedAt": "2024-06-12T17:27:57.655Z",
    "Photos": [
      {
        "id": 1,
        "imgUrl": "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mble/tix-hotel/images-web/2020/10/31/96253cca-ae87-4ff4-9a4b-ab412721742e-1604157274016-2807f76a8955240fc9e6be887e853e68.jpg",
        "RoomId": 1,
        "createdAt": "2024-06-12T10:07:28.497Z",
        "updatedAt": "2024-06-12T10:07:28.497Z"
      },
      {
        "id": 10,
        "imgUrl": "https://pix10.agoda.net/hotelImages/29851771/-1/1d0940ada4df521c14d167f0422ea04a.jpg?ca=25&ce=0&s=1024x768",
        "RoomId": 1,
        "createdAt": "2024-06-12T10:07:28.497Z",
        "updatedAt": "2024-06-12T10:07:28.497Z"
      }
    ]
  }
]
```

## GET /rooms/:id

Get room detail

<i>Request Header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Request Params:</i>

```json
{
  "id": 1
}
```

<i>Response (200)</i>

```json
{
  "room": {
    "id": 1,
    "name": "coba update",
    "price": 12345,
    "description": "ini di update 2x",
    "availability": false,
    "createdAt": "2024-06-12T10:07:28.496Z",
    "updatedAt": "2024-06-12T17:27:57.655Z",
    "Photos": [
      {
        "id": 1,
        "imgUrl": "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mble/tix-hotel/images-web/2020/10/31/96253cca-ae87-4ff4-9a4b-ab412721742e-1604157274016-2807f76a8955240fc9e6be887e853e68.jpg",
        "RoomId": 1,
        "createdAt": "2024-06-12T10:07:28.497Z",
        "updatedAt": "2024-06-12T10:07:28.497Z"
      },
      {
        "id": 10,
        "imgUrl": "https://pix10.agoda.net/hotelImages/29851771/-1/1d0940ada4df521c14d167f0422ea04a.jpg?ca=25&ce=0&s=1024x768",
        "RoomId": 1,
        "createdAt": "2024-06-12T10:07:28.497Z",
        "updatedAt": "2024-06-12T10:07:28.497Z"
      }
    ]
  }
}
```

## GET /bookings

Get all booking

<i>Request Header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Response (200)</i>

```json
[
  {
    "id": 3,
    "paid": false,
    "grandTotal": 500000,
    "UserId": 1,
    "RoomId": 2,
    "createdAt": "2024-06-12T15:57:06.262Z",
    "updatedAt": "2024-06-12T15:57:19.802Z",
    "Room": {
      "id": 2,
      "name": "Omah Cilik Bata",
      "price": 500000,
      "description": "Omah cilik dengan konsep batu bata",
      "availability": false,
      "createdAt": "2024-06-12T10:07:28.496Z",
      "updatedAt": "2024-06-12T16:54:30.708Z"
    },
    "User": {
      "id": 1,
      "email": "admin@gmail.com",
      "password": "$2a$10$VKy.iJ/BYMn1vRD3PmmD9OtU441u1I9xYWUJS7bW3tvlm7o/15Kkm",
      "fullName": "admin",
      "role": "admin",
      "phoneNumber": "123-456-7890",
      "createdAt": "2024-06-12T10:07:28.429Z",
      "updatedAt": "2024-06-12T10:07:28.429Z"
    }
  },
  {
    "id": 1,
    "paid": true,
    "grandTotal": 2000000,
    "UserId": 1,
    "RoomId": 8,
    "createdAt": "2024-06-12T10:07:28.496Z",
    "updatedAt": "2024-06-12T16:54:29.026Z",
    "Room": {
      "id": 8,
      "name": "Glamping Mountain",
      "price": 2000000,
      "description": "Glamping dengan view gunung Merapi",
      "availability": false,
      "createdAt": "2024-06-12T10:07:28.496Z",
      "updatedAt": "2024-06-12T16:54:29.028Z"
    },
    "User": {
      "id": 1,
      "email": "admin@gmail.com",
      "password": "$2a$10$VKy.iJ/BYMn1vRD3PmmD9OtU441u1I9xYWUJS7bW3tvlm7o/15Kkm",
      "fullName": "admin",
      "role": "admin",
      "phoneNumber": "123-456-7890",
      "createdAt": "2024-06-12T10:07:28.429Z",
      "updatedAt": "2024-06-12T10:07:28.429Z"
    }
  }
]
```

## GET /myBookings

Get booking data user

<i>Request Header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Response (200)</i>

```json
[
  {
    "id": 1,
    "paid": true,
    "grandTotal": 2000000,
    "UserId": 1,
    "RoomId": 8,
    "createdAt": "2024-06-12T10:07:28.496Z",
    "updatedAt": "2024-06-12T16:54:29.026Z",
    "User": {
      "id": 1,
      "email": "admin@gmail.com",
      "password": "$2a$10$VKy.iJ/BYMn1vRD3PmmD9OtU441u1I9xYWUJS7bW3tvlm7o/15Kkm",
      "fullName": "admin",
      "role": "admin",
      "phoneNumber": "123-456-7890",
      "createdAt": "2024-06-12T10:07:28.429Z",
      "updatedAt": "2024-06-12T10:07:28.429Z"
    },
    "Room": {
      "id": 8,
      "name": "Glamping Mountain",
      "price": 2000000,
      "description": "Glamping dengan view gunung Merapi",
      "availability": false,
      "createdAt": "2024-06-12T10:07:28.496Z",
      "updatedAt": "2024-06-12T16:54:29.028Z"
    }
  }
]
```

## POST /bookings/:id

Create booking

<i>Request Header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Request Params:</i>

```json
{
  "id": 5
}
```

<i>Response (201 - Success Created)</i>

```json
{
  "data": {
    "id": 17,
    "paid": false,
    "grandTotal": 900000,
    "UserId": 1,
    "RoomId": 5,
    "updatedAt": "2024-06-13T03:42:39.991Z",
    "createdAt": "2024-06-13T03:42:39.991Z"
  },
  "roomName": "Mezzanine Batu"
}
```

<i>Response (404)</i>

```json
{
  "message": "Room has been booked"
}
```

## PUT /bookings/:id

Update booking status

<i>Request Header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Request Params:</i>

```json
{
  "id": 5
}
```

<i>Response (200)</i>

```json
{
  "message": "Status has been updated 'Paid'"
}
```

## PUT /rooms/:id

Edit room data

<i>Request Header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Request Params:</i>

```json
{
  "id": 5
}
```

<i>Request Body:</i>

```json
{
  "name": "Suite ucok",
  "price": 3500000,
  "description": "Luxury mezzanine",
  "availability": true
}
```

<i>Response (200)</i>

```json
{
  "name": "Suite ucok",
  "price": 3500000,
  "description": "Luxury mezzanine",
  "availability": true
}
```

## POST /:id/photos/upload

Upload room photos

<i>Request Header:</i>

```json
{
  "Authorization": "Bearer [access_token]",
  "Content-Type": "multipart/form-data"
}
```

<i>Request Params:</i>

```json
{
  "id": 5
}
```

<i>Request Body:</i>

```json
{
"imgUrl": Blob
}
```

<i>Response (200)</i>

```json
{
  "message": "Photos uploaded!"
}
```

## Global.error

<i>Response (401)</i>

```json
{
  "message": "Please Login!"
}
```

<i>Response (403)</i>

```json
{
  "message": "Forbidden access"
}
```

<i>Response (404)</i>

```json
{
  "message": "Error not found"
}
```

<i>Response (500):</i>

```json
{
  "message": "Internal server error"
}
```
