# Travel Buddy

## Project contributors
Group 2, Tutorial 8, CPSC 481
- Muhammad Adil (muhammad.adil3@ucalgary.ca)
- Ahmed Iqbal (ahmed.iqbal1@ucalgary.ca)
- Khushi Choksi (khushi.choksi@ucalgary.ca)
- Mark Canuel (mlcanuel@ucalgary.ca)
- Syed Haider (syed.haider4@ucalgary.ca)


## Information
* The design is created to run on an iPhone 14 Pro Max, which has the dimensions 430 x 932. Any other size will not accurately display our design.
* During our development, we primarily used Google Chrome for testing our application.
  * Due to this, please use Google Chrome to view our application.    
* Please note that the events in the itinerary are hard-coded as we do not have a backend to connect the itinerary page with the other pages. The main purpose of this design was to display the frontend design, so we did not focus on the backend that much as we are still able to show all of our tasks without one. 
<br/><br/>
* Some example code is used for account and trip, located in TripContext and AccountContext.
  * If you do not wish to create an account, this information is hardcoded for example usage:
    * user: example@ucalgary.ca
    * password: password


<br/><br/>
## How to run this code locally
This is created using the Next.js framework (version 15.0.3 of Next.js & version 18.3.1 of React),. To be able to run it, you will need Node.js (v22.11.0) installed.

Here is the link to install Node.js if you do not have it: https://nodejs.org/en. You can verify that you have the version mentioned earlier installed by running `node -v` in the terminal. The command `npm -v` should also work. 

Once you have verified all of that, run the following commands in the terminal. 
1. `cd travel-app`              (navigate to the travel-app directory)
2. `npm install`
3. `npm run dev`                (after this, open http://localhost:3000/ on your browser)

If the third command does not work, please refer to the "Libraries/installs" section. 


<br/><br/>
## Instructions for using the app, on Google Chrome

1. First, run the code using the steps above, or use the deployed website link (https://travel-buddy-sandy.vercel.app).
2. (If you are running the code locally, open the link "http://localhost:3000/" on your browser. This is where it should appear.)
3. Once the page is loaded (should be a login screen), right-click and select "Inspect".
4. Click "Dimensions" on the top left and select "iPhone 14 Pro Max" for the size.


<br/><br/>
## How to navigate through the application design

1. Enter the email and password for the account you wish to use. You can also create one by clicking the "Create Account" button. You may also just use the example account that we have hardcoded to log in (see the "Information" section).
2. For new accounts you will need to enter your trip details. The arrival date is a mandatory field. The departure date is optional, to consider for users who have recently moved to the city.
3. Once complete you will be directed to the home page.
4. You can choose which trip you will be updating the itinerary for by clicking on the trip name at the top center of the screen.
5. Once you have the right trip to work on, you can proceed by using the navigation bar at the bottom of the screen to switch between different pages. (Each page has an icon and label to let you know what page you are on.)
6. To explore sights and places to visit in Calgary, you can go to the explore page. You can filter sights and places by category here, or search for one.
7. To add hotel reservations, you go to the hotel page and after selecting the dates of your stay, you will be able to add a hotel from the list.
8. Restaurant reservations can be made on the restaurant page. You can filter restaurants by categories, or search for one. 
9. All added plans can be viewed on the itinerary page. You can edit your itinerary by clicking the "Edit" button below it, which will allow you to remove events from the itinerary.
10. For changes to your account, you can open your profile using the icon on the top right of the screen.
11. To add or manage your trips, you can open these settings by clicking on the trip dropdown at the top center of the screen.



<br/><br/>
## Libraries/installs
These are just the libraries that we have used in our application. `npm run dev` may not work the first time you use it. If this problem occurs, please try installing these libraries first and then running the code.
### react-icons are installed into this project.

<p>
 
`npm install react-icons --save`
 
to access the library of icons, refer to this link: https://react-icons.github.io/react-icons/
</p>

### other installs:

<p>

`npm install react-calendar`

`npm install react-time-picker`

`npm install react-big-calendar`

</p>

### full calendar installs

<p>
 
`npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid`

`npm install @fullcalendar/react@latest @fullcalendar/core@latest @fullcalendar/daygrid@latest @fullcalendar/timegrid@latest`

`npm install --save \
 @fullcalendar/core \
 @fullcalendar/bootstrap5`

`npm install --save bootstrap bootstrap-icons`

`npm install --save \
 @fullcalendar/core \
 @fullcalendar/bootstrap`

`npm install --save bootstrap@4 @fortawesome/fontawesome-free`

`npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/interaction`

</p>

### tailwind css documentation

<p>https://tailwindcss.com/docs/installation</p>
