This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## List of extensions used in this project:

- Shadcn/ui: this is used to install all the components we are going to use in this projects
  shadcn/ui link: ('https://ui.shadcn.com/docs/components/button')
  list of shadcn/ui components used in this projects are: [Button]
  Remember, all this components are saved inside the components folder located in the directory when installed, read from the website on how to use all the components

- Clerk: this is use to add authentication into the app
  clerk link: ('https://clerk.com/')

- lucide: for icons.
  lucide link: ('https://lucide.dev/icons/search')

- react-responsive-carousel: this is used to create the carousel on the homepage.
  NOTE: the code was paste on chartgpt which translated the code to next js format
  react-responsive-carousel: ('https://react-responsive-carousel.js.org/')

- Neon: used to host backend database
  link: ('https://console.neon.tech/app/projects')
  NOTE: any time changes is made in the prisma schema this command line should be run:

  1. npx prisma generate = this will generate the new change into the neon database
  2. npx prisma migrate dev = this will also migrate new changes into the neon database

- zod and react hook form: is used to create the hotel form for the hotel creation
  link is the same as shancn, just write 'form' on the search bar

- uploadthing: is used to upload our images
  link: ('https://v6.docs.uploadthing.com/getting-started/appdir')

- country-state-city: is a library used to get all the country data
  link: ('https://www.npmjs.com/package/country-state-city')

- zustand: i used for the hotels room booking handle
  Link for documentation: ('https://zustand.docs.pmnd.rs/getting-started/introduction#installation')
  And for better clear understand of the code of the zustand function, here is the few documentation for it : ==== This code is an advanced version of the zustand state management store. It incorporates persistent state storage using the zustand/middleware library. Here's a detailed explanation broken down for you as a junior developer:

1. Import Statements
   typescript
   Copy code
   import { Room } from "@prisma/client";
   import { create } from "zustand";
   import { persist } from "zustand/middleware";
   Room: Represents a model from the Prisma ORM, defining the shape of a room object from the database.
   create: A function from the zustand library, used to initialize a custom state store.
   persist: A middleware function from zustand that allows the store's state to be saved to local storage (or another storage mechanism). This ensures the state is remembered even after a page reload.
2. The Interface: BookRoomStore
   typescript
   Copy code
   interface BookRoomStore {
   bookingRoomData: RoomDataType | null;
   paymentIntent: string | null;
   clientSecret: string | undefined;

setRoomData: (data: RoomDataType) => void;
setPaymentIntent: (paymentIntent: string) => void;
setClientSecret: (clientSecret: string) => void;
resetBookRoom: () => void;
}
Purpose: This interface defines the structure of the state store and the functions that modify the state.

State Properties:

bookingRoomData: Stores details of the room booking. It can be of type RoomDataType or null.
paymentIntent: A unique string identifier for a payment, typically used with payment gateways (e.g., Stripe).
clientSecret: A string used to complete secure payment transactions. It starts as undefined.
Actions (Functions):

setRoomData: Updates the room booking details.
setPaymentIntent: Updates the payment intent value.
setClientSecret: Updates the client secret for the payment.
resetBookRoom: Resets all state properties to their initial values. 3. The RoomDataType Type
typescript
Copy code
type RoomDataType = {
room: Room;
totalPrice: number;
breakFastIncluded: boolean;
startDate: Date;
endDate: Date;
};
Purpose: Defines the shape of the bookingRoomData object.

Properties:

room: An object of type Room, containing all the details of a room from the database (e.g., room type, amenities, etc.).
totalPrice: The total cost of the booking.
breakFastIncluded: A boolean indicating whether breakfast is included in the booking.
startDate: The start date of the booking.
endDate: The end date of the booking. 4. The State Store: useBookRoom
typescript
Copy code
const useBookRoom = create<BookRoomStore>()(
persist(
(set) => ({
bookingRoomData: null,
paymentIntent: null,
clientSecret: undefined,

      setRoomData: (data: RoomDataType) => {
        set({ bookingRoomData: data });
      },

      setPaymentIntent: (paymentIntent: string) => {
        set({ paymentIntent });
      },

      setClientSecret: (clientSecret: string) => {
        set({ clientSecret });
      },

      resetBookRoom: () => {
        set({
          bookingRoomData: null,
          paymentIntent: null,
          clientSecret: undefined,
        });
      },
    }),
    { name: "BookRoom" }

)
);
Breaking it Down:
create<BookRoomStore>():

Initializes the store using the BookRoomStore interface as its type. This ensures TypeScript knows the structure of the state and its actions.
persist Middleware:

Wraps the store definition, enabling persistent storage of the state.
The state is saved under the name "BookRoom" in the browser's localStorage.
Initial State:

typescript
Copy code
bookingRoomData: null,
paymentIntent: null,
clientSecret: undefined,
The store starts with no booking data, no payment intent, and no client secret.
Actions:

setRoomData:

typescript
Copy code
setRoomData: (data: RoomDataType) => {
set({ bookingRoomData: data });
},
Updates the bookingRoomData with the provided RoomDataType object.

setPaymentIntent:

typescript
Copy code
setPaymentIntent: (paymentIntent: string) => {
set({ paymentIntent });
},
Updates the paymentIntent state with the provided string.

setClientSecret:

typescript
Copy code
setClientSecret: (clientSecret: string) => {
set({ clientSecret });
},
Updates the clientSecret state with the provided string.

resetBookRoom:

typescript
Copy code
resetBookRoom: () => {
set({
bookingRoomData: null,
paymentIntent: null,
clientSecret: undefined,
});
},
Resets all states to their initial values.

Persistence Configuration:

typescript
Copy code
{ name: "BookRoom" }
The state is saved under the key "BookRoom" in localStorage. 5. Exporting the Store
typescript
Copy code
export default useBookRoom;
This allows the store to be imported and used in other components.

6. How to Use This Store in a Component
   Here’s an example of how this store might be used:

tsx
Copy code
import React from "react";
import useBookRoom from "./path-to-store";

const BookingComponent = () => {
const {
bookingRoomData,
setRoomData,
setPaymentIntent,
resetBookRoom,
} = useBookRoom();

const handleBooking = () => {
const newBooking = {
room: { id: "1", title: "Deluxe Suite", ... }, // Example room data
totalPrice: 300,
breakFastIncluded: true,
startDate: new Date(),
endDate: new Date(),
};
setRoomData(newBooking);
};

return (

<div>
<h1>Booking Details</h1>
{bookingRoomData ? (
<div>
<p>Room: {bookingRoomData.room.title}</p>
<p>Total Price: {bookingRoomData.totalPrice}</p>
</div>
) : (
<p>No booking data.</p>
)}
<button onClick={handleBooking}>Book Room</button>
<button onClick={resetBookRoom}>Reset</button>
</div>
);
};

export default BookingComponent;
Key Features to Understand
State Persistence:

The state is saved in localStorage, so even if the user reloads the page, the booking information remains.
Zustand’s Simplicity:

Unlike other state management libraries (e.g., Redux), zustand is lightweight and doesn't require reducers or boilerplate code.
Modular Design:

The store is independent and reusable in any component.
Let me know if you have any questions! 😊

To explain more about what persist middleware do : ===

The persist middleware in Zustand is a powerful tool that allows you to save and restore the state of your store between page reloads or browser sessions. Here's an in-depth explanation tailored for a junior developer:

What Does persist Do?
The persist middleware:

Saves the State:

When your application updates the store's state, persist saves it to a persistent storage mechanism like localStorage, sessionStorage, or even custom storage (like a database or a secure cookie).
Restores the State:

When your application starts (e.g., after a page reload), persist checks the storage to see if there’s previously saved state. If it finds it, it restores that state to your Zustand store.
Provides Config Options:

You can customize how and where the state is stored. For example, you can:
Set a unique name for the storage key.
Specify which storage to use (localStorage, sessionStorage, etc.).
Choose which parts of the state to persist or exclude.
Provide logic to transform the state before saving or after restoring.
How It Works in Your Code
Here's how persist works in the code example you provided:

Code Overview
typescript
Copy code
const useBookRoom = create<BookRoomStore>()(
persist(
(set) => ({
bookingRoomData: null,
paymentIntent: null,
clientSecret: undefined,

      setRoomData: (data: RoomDataType) => {
        set({ bookingRoomData: data });
      },

      setPaymentIntent: (paymentIntent: string) => {
        set({ paymentIntent });
      },

      setClientSecret: (clientSecret: string) => {
        set({ clientSecret });
      },

      resetBookRoom: () => {
        set({
          bookingRoomData: null,
          paymentIntent: null,
          clientSecret: undefined,
        });
      },
    }),
    { name: "BookRoom" }

)
);
Detailed Breakdown

1. Where Is the State Saved?
   The configuration object { name: "BookRoom" } specifies that the state will be saved to localStorage under the key "BookRoom".
   You can confirm this by opening the browser's developer tools:
   Go to Application > Storage > Local Storage.
   Look for a key named "BookRoom".
   You’ll see your stored state as a JSON object.
2. What Happens During State Updates?
   When you update the state using actions like setRoomData, persist intercepts the change and saves the updated state to localStorage.
3. What Happens on a Page Reload?
   When the page reloads, Zustand initializes the store.
   The persist middleware checks if "BookRoom" exists in localStorage:
   If it does, it loads the saved state and applies it to the store.
   If it doesn't, the store starts with its initial values (e.g., bookingRoomData: null).
   Advanced Options in persist
   Customizing State Saving and Restoring
   You can customize how the state is saved or restored using the persist options:

Partial Persistence: Save only specific parts of the state.

typescript
Copy code
persist(
(set) => ({
bookingRoomData: null,
paymentIntent: null,
clientSecret: undefined,
}),
{
name: "BookRoom",
partialize: (state) => ({ bookingRoomData: state.bookingRoomData }),
}
);
Here, only bookingRoomData will be saved to localStorage.
State Transformation: Transform the state before saving or after restoring.

typescript
Copy code
persist(
(set) => ({
bookingRoomData: null,
paymentIntent: null,
clientSecret: undefined,
}),
{
name: "BookRoom",
serialize: (state) => JSON.stringify(state), // Convert to JSON before saving
deserialize: (str) => JSON.parse(str), // Parse JSON when restoring
}
);
Custom Storage: Use a storage mechanism other than localStorage, like sessionStorage or a custom backend.

typescript
Copy code
persist(
(set) => ({
bookingRoomData: null,
paymentIntent: null,
clientSecret: undefined,
}),
{
name: "BookRoom",
storage: sessionStorage, // Use sessionStorage instead of localStorage
}
);
Excluding Keys: Prevent certain keys from being persisted.

typescript
Copy code
persist(
(set) => ({
bookingRoomData: null,
paymentIntent: null,
clientSecret: undefined,
}),
{
name: "BookRoom",
partialize: (state) => {
const { clientSecret, ...rest } = state;
return rest;
},
}
);
Here, clientSecret is excluded from persistence.
Why Use persist?
Improved User Experience:

If a user refreshes the page or closes the tab, their booking data (or other app state) remains intact.
Saves API Calls:

You don’t need to re-fetch data or reinitialize certain parts of the app since the state persists.
Flexibility:

You can configure what to persist, where to persist it, and how to handle it.
Seamless State Management:

Zustand + persist combines minimal boilerplate with powerful persistence capabilities, making it suitable for modern applications.
How to Debug Persistent State?
Check localStorage: Open the browser dev tools and inspect the localStorage or sessionStorage to see if the state is being saved properly.

Log State Changes: Add console.log statements in your actions (e.g., setRoomData) to monitor when and how the state updates.

Clear Stored State: If something goes wrong, you can clear the stored state manually in dev tools or programmatically:

typescript
Copy code
localStorage.removeItem("BookRoom");
Final Notes
The persist middleware is highly customizable. It ensures that your application's state survives reloads and even browser restarts.
For sensitive data (e.g., clientSecret), be cautious when persisting. Use secure storage mechanisms when needed.
