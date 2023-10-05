interface Booking {
    fullname: string;
    id: number;
    orderdate: string;
    checkin: string;
    checkout: string;
    specialrequest: string;
    roominfo: string;
    roomtype: string;
    status: string;
    price: string;
    photo: string;
  }
  
  // Define los datos del archivo JSON y tipa el arreglo
export const bookingData: Booking[] = [
    {
      fullname: 'Pauline Johnson',
      id: 1,
      orderdate: "2023-01-27",
      checkin: "2022-11-28",
      checkout: "2023-05-03",
      specialrequest: "velit deserunt consequat amet excepteur sunt duis",
      roominfo: "1",
      roomtype: "Delux - Single Bed",
      status: "in progress",
      price: "105 /night",
      photo: "https://cache.marriott.com/content/dam/marriott-renditions/JAXAM/jaxam-deluxe-guestroom-4873-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*"
    },
    {
        fullname: "Vernon Mitchell",
        id: 2,
        orderdate: "2023-01-06",
        checkin: "2023-02-01",
        checkout: "2023-03-29",
        specialrequest: "eiusmod et laborum cillum reprehenderit cillum Lorem fugiat",
        roominfo: "1",
        roomtype: "Delux - Single Bed",
        status: "check in",
        price: "130 /night",
        photo: "https://cache.marriott.com/content/dam/marriott-renditions/JAXAM/jaxam-deluxe-guestroom-4873-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*"
    },
    {
        fullname: "Dwayne Flatley",
        id: 3,
        orderdate: "2023-08-05",
        checkin: "2023-07-16",
        checkout: "2023-07-03",
        specialrequest: "laboris ex et id excepteur exercitation ea cupidatat",
        roominfo: "1",
        roomtype: "Delux - Double Bed",
        status: "check out",
        price: "110 /night",
        photo: "https://cache.marriott.com/content/dam/marriott-renditions/JAXAM/jaxam-deluxe-guestroom-4873-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*"
    },
    {
        fullname: "Charlotte Steuber",
        id: 4,
        orderdate: "2022-12-09",
        checkin: "2022-11-05",
        checkout: "2023-04-04",
        specialrequest: "ipsum dolore est ut laboris incididunt ut",
        roominfo: "1",
        roomtype: "Delux - Single Bed",
        status: "check in",
        price: "105 /night",
        photo: "https://cache.marriott.com/content/dam/marriott-renditions/JAXAM/jaxam-deluxe-guestroom-4873-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*"
    },
    {
        fullname: "Kenneth Koch",
        id: 5,
        orderdate: "2022-09-29",
        checkin: "2022-12-07",
        checkout: "2022-12-03",
        specialrequest: "id et culpa velit minim eiusmod eiusmod",
        roominfo: "1",
        roomtype: "Delux - Double Bed",
        status: "in progress",
        price: "130 /night",
        photo: "https://cache.marriott.com/content/dam/marriott-renditions/JAXAM/jaxam-deluxe-guestroom-4873-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*"
    },
    {
        fullname: "Oliver Spencer",
        id: 6,
        orderdate: "2023-03-11",
        checkin: "2023-05-29",
        checkout: "2023-08-19",
        specialrequest: "eiusmod elit dolor veniam et",
        roominfo: "1",
        roomtype: "Delux - Single Bed",
        status: "check out",
        price: "105 /night",
        photo: "https://cache.marriott.com/content/dam/marriott-renditions/JAXAM/jaxam-deluxe-guestroom-4873-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*"
    },
    {
        fullname: "Delia Predovic",
        id: 7,
        orderdate: "2023-08-14",
        checkin: "2023-08-12",
        checkout: "2023-04-27",
        specialrequest: "quis sit",
        roominfo: "1",
        roomtype: "Delux - Double Bed",
        status: "check in",
        price: "150 /night",
        photo: "https://cache.marriott.com/content/dam/marriott-renditions/JAXAM/jaxam-deluxe-guestroom-4873-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*"
    },
    {
        fullname: "Jeffery Walter",
        id: 8,
        orderdate: "2023-07-15",
        checkin: "2023-06-05",
        checkout: "2023-05-19",
        specialrequest: "ullamco est reprehenderit do",
        roominfo: "1",
        roomtype: "Delux - Single Bed",
        status: "in progress",
        price: "105 /night",
        photo: "https://cache.marriott.com/content/dam/marriott-renditions/JAXAM/jaxam-deluxe-guestroom-4873-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*"
    },
    {
        fullname: "Bethany Anderson",
        id: 9,
        orderdate: "2023-03-21",
        checkin: "2022-12-23",
        checkout: "2023-08-25",
        specialrequest: "ex nisi enim ullamco",
        roominfo: "1",
        roomtype: "Delux - Double Bed",
        status: "in progress",
        price: "150 /night",
        photo: "https://cache.marriott.com/content/dam/marriott-renditions/JAXAM/jaxam-deluxe-guestroom-4873-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*"
    },
    {
        fullname: "Ethel Bernier",
        id: 123,
        orderdate: "2023-08-25",
        checkin: "2023-05-25",
        checkout: "2023-08-14",
        specialrequest: "elit ad esse ipsum esse magna",
        roominfo: "1",
        roomtype: "Delux - Single Bed",
        status: "check in",
        price: "105 /night",
        photo: "https://cache.marriott.com/content/dam/marriott-renditions/JAXAM/jaxam-deluxe-guestroom-4873-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*"
    }
]